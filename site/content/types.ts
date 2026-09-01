export type ChallengeKind =
  | "pista"
  | "verdadeiro-ou-falso"
  | "linha-do-tempo"
  | "quem-sou-eu"
  | "conexao"
  | "calculo"
  | "problema"
  | "desafio-mental"
  | "analise-de-texto"
  | "revisao";

export type QuestionOption = {
  id: string;
  text: string;
  feedback: string;
};

export type StudyQuestion = {
  id: string;
  chapter: string;
  topic: string;
  kind: ChallengeKind;
  prompt: string;
  context?: string;
  image?: { src: string; alt: string; credit: string };
  options: QuestionOption[];
  correctOptionId: string;
  correctExplanation: string;
  source: string;
};

export type StudyModule = {
  id: string;
  subject: string;
  subjectId: string;
  collection: string;
  navigationLabel?: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  chapterCount: number;
  coverImage?: string;
  coverAlt?: string;
  questions: StudyQuestion[];
  reviewFacts: string[];
};
