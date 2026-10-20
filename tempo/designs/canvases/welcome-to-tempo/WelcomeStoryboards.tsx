import { defineControls } from "tempo-sdk/assets";
import { FileDiff } from "./_ui/icons";
import { DocsHero } from "./DocsHero";
import { DocsToDesignHero } from "./DocsToDesignHero";
import { ContextHero } from "./ContextHero";
import { Strip } from "./Strip";
import { ChatHero } from "./ChatHero";
import { WorkspaceNavSection } from "./WorkspaceNavSection";
import { RunHero } from "./RunHero";
import { BuildHero } from "./BuildHero";
import { ShareHero } from "./ShareHero";
import { IssuesBoardHero, IssueChatHero } from "./IssuesHero";
import { ModelsHero } from "./ModelsHero";
import Storyboard3Component from "./Storyboard3";

/** Original designer-authored Welcome storyboards, shared by the shipped canvas and previews. */
export function GenerateWelcome() {
  return (
    <div className="wtt">
      <Strip
        number="1"
        accent="kiwi"
        title="Generate beautiful designs with Tempo"
        intro="Type up a brief and watch Tempo craft canvases that follow your design systems in seconds. Have the agent generate HTML designs or functional React prototypes, your pick."
        graphics={[
          { node: <ChatHero />, kind: "bare" },
          { node: <ContextHero />, kind: "bare" },
          { node: <RunHero />, kind: "bare" },
        ]}
      />
    </div>
  );
}
defineControls(GenerateWelcome, {});

export function DocsWelcome() {
  return (
    <div className="wtt">
      <Strip
        number="2"
        accent="kiwi"
        title="Write the spec, then turn it into a design"
        intro="Draft PRDs and specs in a clean editor and keep them organized in one place — then collaborate with your team live, editing together in real time."
        graphics={[
          { node: <DocsHero />, kind: "bare" },
          { node: <DocsToDesignHero />, kind: "bare" },
        ]}
      />
    </div>
  );
}
defineControls(DocsWelcome, {});

export function SourceControlWelcome() {
  return (
    <div className="wtt">
      <Strip
        number="3"
        accent="blueberry"
        title="It's all real code in real git"
        intro={
          <>
            Each feature lives in its own workspace, a git branch with multiple
            chats.
            <br />
            Manage them under Chat, click{" "}
            <span className="whitespace-nowrap">
              <FileDiff className="mr-1 inline-block size-[1em] -translate-y-[1.5px] text-text-secondary" />
              Source Control
            </span>{" "}
            to track your file changes.
          </>
        }
        graphics={[
          { node: <BuildHero />, kind: "bare" },
          { node: <ShareHero />, kind: "bare" },
        ]}
      />
    </div>
  );
}
defineControls(SourceControlWelcome, {});

export function IssuesWelcome() {
  return (
    <div className="wtt">
      <Strip
        number="4"
        accent="kiwi"
        title="Organize the work as issues"
        graphics={[
          { node: <IssuesBoardHero />, kind: "bare" },
          { node: <IssueChatHero />, kind: "bare" },
        ]}
      />
    </div>
  );
}
defineControls(IssuesWelcome, {});

export function ModelsWelcome() {
  return (
    <div className="wtt">
      <Strip
        number="6"
        accent="blueberry"
        title="Use any model through OpenCode"
        graphics={[{ node: <ModelsHero />, kind: "bare" }]}
      />
    </div>
  );
}
defineControls(ModelsWelcome, {});

export function NavigationWelcome() {
  return (
    <div className="wtt">
      <WorkspaceNavSection />
    </div>
  );
}
defineControls(NavigationWelcome, {});

export function WelcomeHeading() {
  return (
    <div className="wtt">
      <Storyboard3Component />
    </div>
  );
}
defineControls(WelcomeHeading, {});

export const WELCOME_STORYBOARDS = [
  {
    id: "Plan",
    name: "1 · Generate",
    component: GenerateWelcome,
    layout: { x: 0, y: 0, width: 660, height: 1395 },
  },
  {
    id: "Design",
    name: "2 · Docs",
    component: DocsWelcome,
    layout: { x: 690, y: 0, width: 660, height: 1252 },
  },
  {
    id: "Build",
    name: "3 · Source control",
    component: SourceControlWelcome,
    layout: { x: 1383, y: 0, width: 660, height: 1221 },
  },
  {
    id: "Track",
    name: "4 · People + agents",
    component: IssuesWelcome,
    layout: { x: 2079, y: 0, width: 660, height: 913 },
  },
  {
    id: "Models",
    name: "6 · Models",
    component: ModelsWelcome,
    layout: { x: 3470, y: 0, width: 660, height: 614 },
  },
  {
    id: "ExploreTabs",
    name: "0 · Find your way around",
    component: NavigationWelcome,
    layout: { x: 2774, y: 0, width: 660, height: 577 },
  },
  {
    id: "Storyboard3",
    name: "Storyboard3",
    component: WelcomeHeading,
    layout: { x: 0, y: -179, width: 533, height: 105 },
  },
] as const;
