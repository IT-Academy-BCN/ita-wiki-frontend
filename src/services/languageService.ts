// src/services/languageService.ts

export type Language = {
  id: number;
  name: string;
};

const mockLanguages: Language[] = [
  { id: 1, name: "Node" },
  { id: 2, name: "React" },
  { id: 3, name: "Angular" },
  { id: 4, name: "JavaScript" },
  { id: 5, name: "TypeScript" },
  { id: 6, name: "Java" },
  { id: 7, name: "Python" },
  { id: 8, name: "PHP" },
  { id: 9, name: "Data Science" },
  { id: 10, name: "BBDD" },
  { id: 11, name: "SQL" },
];

// Mock version for current sprint
export async function getLanguages(): Promise<Language[]> {
  // simulate a small network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockLanguages), 300);
  });
}
