import { z } from "zod";
import { technicalTestSchema } from "../validations/technicalTestSchema";

export interface TechnicalTest {
  id: number;
  title: string;
  language: string;
  description: string;
  file_path?: string;
  file_original_name?: string;
  tags: Array<string>;
  bookmark_count?: number;
  like_count?: number;
  created_at: string;
  updated_at: string;
  difficulty_level: string | null;
  duration: number | null;
  exercises: Array<string>;
  state: string;
}

export type TechnicalTestFormData = z.infer<typeof technicalTestSchema>;
