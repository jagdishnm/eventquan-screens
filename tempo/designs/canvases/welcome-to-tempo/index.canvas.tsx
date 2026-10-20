import { Canvas, Storyboard } from "tempo-sdk/canvas";
import {
  GenerateWelcome,
  DocsWelcome,
  SourceControlWelcome,
  IssuesWelcome,
  ModelsWelcome,
  NavigationWelcome,
  WelcomeHeading,
} from "./WelcomeStoryboards";

export default function WelcomeCanvas() {
  return (
    <Canvas name="Welcome to Tempo">
      <Storyboard
        id="Plan"
        name="1 · Generate"
        component={GenerateWelcome}
        layout={{ x: 0, y: 0, width: 660, height: 1395 }}
      />
      <Storyboard
        id="Design"
        name="2 · Docs"
        component={DocsWelcome}
        layout={{ x: 690, y: 0, width: 660, height: 1252 }}
      />
      <Storyboard
        id="Build"
        name="3 · Source control"
        component={SourceControlWelcome}
        layout={{ x: 1383, y: 0, width: 660, height: 1221 }}
      />
      <Storyboard
        id="Track"
        name="4 · People + agents"
        component={IssuesWelcome}
        layout={{ x: 2079, y: 0, width: 660, height: 913 }}
      />
      <Storyboard
        id="Models"
        name="6 · Models"
        component={ModelsWelcome}
        layout={{ x: 3470, y: 0, width: 660, height: 614 }}
      />
      <Storyboard
        id="ExploreTabs"
        name="0 · Find your way around"
        component={NavigationWelcome}
        layout={{ x: 2774, y: 0, width: 660, height: 577 }}
      />
      <Storyboard
        id="Storyboard3"
        name="Welcome to Tempo"
        component={WelcomeHeading}
        layout={{ x: 0, y: -179, width: 533, height: 105 }}
      />
    </Canvas>
  );
}
