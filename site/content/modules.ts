import { studyModuleRegistry } from "./registry";

export type StudyModuleSummary = {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  coverImage: string;
  coverAlt: string;
};

export const studyModules: StudyModuleSummary[] = Object.values(studyModuleRegistry).map((module) => ({
  id: module.id,
  title: module.title,
  description: module.description,
  questionCount: module.questions.length,
  coverImage: module.coverImage,
  coverAlt: module.coverAlt,
}));
