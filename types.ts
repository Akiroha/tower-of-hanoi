export type DiskElementType = {
  size: number;
  rod: string;
  position: number;
};

export type StepType = {
  stepNumber: number;
  actionTaken: string;
  diskElements: DiskElementType[];
};

export type ApiDataType = {
  steps: StepType[];
  solutionStepCount: number;
  pageCount: number;
};
