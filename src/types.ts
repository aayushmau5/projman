export interface Answer {
  projectName: string;
  path: string;
  editor: string;
}

export interface openProject {
  open: string;
}

export interface Selection {
  selectedProjectName: string;
  selectedEditor: string;
}

export type getKeyFunctionType = (
  projects: Record<string, unknown>,
  projectKeys: string[],
  selection: Selection
) => string[];

export interface ResetConfig {
  remove: boolean;
}
