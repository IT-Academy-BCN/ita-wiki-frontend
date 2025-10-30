// src/services/languageService.ts

export type Language = {
  id: number;
  code: string;
  name: string;
};

const mockLanguages: Language[] = [
  { id: 1, code: "node", name: "Node" },
  { id: 2, code: "react",name: "React" },
  { id: 3, code: "angular", name: "Angular" },
  { id: 4, code: "javascript", name: "JavaScript" },
  { id: 5, code: "typescript", name: "TypeScript" },
  { id: 6, code: "java", name: "Java" },
  { id: 7, code: "python", name: "Python" },
  { id: 8, code: "php", name: "PHP" },
  { id: 9, code: "datascience", name: "Data Science" },
  { id: 10, code: "bbdd", name: "BBDD" },
  { id: 11, code: "sql", name: "SQL" },
];

// Mock version for current sprint
export async function getLanguages(): Promise<Language[]> {
  // simulate a small network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockLanguages), 300);
  });
}
