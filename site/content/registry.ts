import { recHist2Tri26 } from "./rechist2tri26";
import { recMat2Tri26 } from "./recmat2tri26";
import { recPort2Tri26 } from "./recport2tri26";
import { recPortFoco2Tri26 } from "./recportfoco2tri26";
import type { StudyModule } from "./types";

export const studyModuleRegistry: Record<string, StudyModule> = {
  [recHist2Tri26.id]: recHist2Tri26,
  [recMat2Tri26.id]: recMat2Tri26,
  [recPort2Tri26.id]: recPort2Tri26,
  [recPortFoco2Tri26.id]: recPortFoco2Tri26,
};

export function getStudyQuestion(moduleId: string, questionId: string) {
  return studyModuleRegistry[moduleId]?.questions.find((question) => question.id === questionId);
}
