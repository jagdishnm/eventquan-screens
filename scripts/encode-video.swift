// Encodes timestamped JPEG frames (frames.json) into a constant-30fps H.264 MP4.
// Usage: swift encode-video.swift <framesDir> <out.mp4> [tailSeconds] [bitsPerSecond]
import AVFoundation
import CoreGraphics
import Foundation
import ImageIO

struct Frame: Decodable { let file: String; let t: Double }

let args = CommandLine.arguments
let dir = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])
let tail = args.count > 3 ? Double(args[3])! : 2.0
let bitrate = args.count > 4 ? Int(args[4])! : 6_000_000
let fps = 30.0

let frames = try JSONDecoder().decode([Frame].self, from: Data(contentsOf: dir.appendingPathComponent("frames.json")))
guard let first = frames.first else { fatalError("no frames") }

func load(_ f: Frame) -> CGImage {
  let src = CGImageSourceCreateWithURL(dir.appendingPathComponent(f.file) as CFURL, nil)!
  return CGImageSourceCreateImageAtIndex(src, 0, nil)!
}

let probe = load(first)
let w = probe.width & ~1, h = probe.height & ~1

try? FileManager.default.removeItem(at: outURL)
let writer = try AVAssetWriter(outputURL: outURL, fileType: .mp4)
let input = AVAssetWriterInput(mediaType: .video, outputSettings: [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: w,
  AVVideoHeightKey: h,
  AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: bitrate, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel],
])
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
  kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB,
  kCVPixelBufferWidthKey as String: w,
  kCVPixelBufferHeightKey as String: h,
])
writer.add(input)
writer.startWriting()
writer.startSession(atSourceTime: .zero)

func buffer(_ img: CGImage) -> CVPixelBuffer {
  var pb: CVPixelBuffer?
  CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &pb)
  let b = pb!
  CVPixelBufferLockBaseAddress(b, [])
  let ctx = CGContext(data: CVPixelBufferGetBaseAddress(b), width: w, height: h, bitsPerComponent: 8,
                      bytesPerRow: CVPixelBufferGetBytesPerRow(b), space: CGColorSpaceCreateDeviceRGB(),
                      bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)!
  ctx.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h))
  CVPixelBufferUnlockBaseAddress(b, [])
  return b
}

// Hold each captured frame until the next one arrives (screencast only emits on change).
let duration = frames.last!.t - first.t + tail
let total = Int(duration * fps)
var idx = 0
var current = buffer(probe)
var currentIdx = 0
for n in 0..<total {
  let t = first.t + Double(n) / fps
  while idx + 1 < frames.count && frames[idx + 1].t <= t { idx += 1 }
  if idx != currentIdx { current = buffer(load(frames[idx])); currentIdx = idx }
  while !input.isReadyForMoreMediaData { usleep(2000) }
  adaptor.append(current, withPresentationTime: CMTime(value: CMTimeValue(n), timescale: CMTimeScale(fps)))
}
input.markAsFinished()
let done = DispatchSemaphore(value: 0)
writer.finishWriting { done.signal() }
done.wait()
print("wrote \(outURL.path) · \(w)x\(h) · \(String(format: "%.1f", duration))s · \(total) frames")
