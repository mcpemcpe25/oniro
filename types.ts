
export interface Theme {
  id: number;
  name: string;
  keywords: string[];
}

export interface Option {
  id: string;
  text: string;
  primaryThemeId: number;
  secondaryThemeId: number;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface ResultType {
  themeId: number;
  title: string;
  subtitle: string;
  description: string;
  reflections: string[];
  exercise: string;
  // New fields for static "AI-like" content
  oracleTitle: string;
  oracleText: string;
}
