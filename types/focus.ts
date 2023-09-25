export enum Status {
  Run,
  Stop,
  Pause
}
export enum Step {
  Focus,
  Break
}

export interface Focus {
  seconds: number | null,
  step: Step
  status: Status
  focusId: NodeJS.Timeout | null
}
