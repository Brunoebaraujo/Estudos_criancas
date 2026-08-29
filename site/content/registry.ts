import { recHist2Tri26 } from "./rechist2tri26";
import type { StudyModule } from "./types";

export const studyModuleRegistry: Record<string, StudyModule> = {
  [recHist2Tri26.id]: recHist2Tri26,
};
