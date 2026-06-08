import { Network, PenLine, Waypoints, Trophy, Folder, type LucideIcon } from "lucide-react";

// Maps the `icon` string stored on each project to a lucide-react component.
const projectIcons: Record<string, LucideIcon> = {
  Network,
  PenLine,
  Waypoints,
  Trophy,
};

export function getProjectIcon(name: string): LucideIcon {
  return projectIcons[name] ?? Folder;
}
