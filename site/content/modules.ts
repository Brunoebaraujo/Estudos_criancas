import { studyModuleRegistry } from "./registry";

export type StudyModuleSummary = {
  id: string;
  subject: string;
  subjectId: string;
  collection: string;
  period: string;
  title: string;
  description: string;
  questionCount: number;
  coverImage?: string;
  coverAlt?: string;
};

export const studyModules: StudyModuleSummary[] = Object.values(studyModuleRegistry).map((module) => ({
  id: module.id,
  subject: module.subject,
  subjectId: module.subjectId,
  collection: module.collection,
  period: module.period,
  title: module.title,
  description: module.description,
  questionCount: module.questions.length,
  coverImage: module.coverImage,
  coverAlt: module.coverAlt,
}));
