
'use server';
/**
 * @fileOverview Personalized teacher recommendations flow.
 *
 * This file defines a Genkit flow to provide personalized teacher recommendations
 * based on a student's profile (interests, age, grade).
 *
 * @exports recommendTeachers - A function that returns personalized teacher recommendations.
 * @exports TeacherRecommendationsInput - The input type for the recommendTeachers function.
 * @exports TeacherRecommendationsOutput - The return type for the recommendTeachers function.
 */

import {ai} from '@/ai/ai-instance'; // Corrected path
import {z} from 'genkit';
import type { Teacher } from '@/types/teacher'; // Assuming Teacher type is needed for detailed recommendations
import { sampleTeachersData } from '@/data/sample-teachers'; // For providing teacher context to AI

/**
 * Input schema for the teacher recommendations flow.
 */
const TeacherRecommendationsInputSchema = z.object({
  interests: z.array(z.string()).describe('List of student interests.'),
  age: z.number().describe('Student age.'),
  grade: z.string().describe('Student grade level (e.g., "5th Grade", "High School Freshman").'),
});
export type TeacherRecommendationsInput = z.infer<
  typeof TeacherRecommendationsInputSchema
>;

/**
 * Output schema for the teacher recommendations flow.
 */
const TeacherRecommendationsOutputSchema = z.object({
  // For simplicity, returning names. Could be teacher IDs or partial Teacher objects.
  recommendedTeacherNames: z.array(z.string()).describe('List of recommended teacher names.'),
  reasoning: z.string().describe('A brief explanation for why these teachers are recommended.'),
  isRelevant: z.boolean().describe('Whether or not the recommended teachers are likely relevant to the user based on the input.'),
});
export type TeacherRecommendationsOutput = z.infer<
  typeof TeacherRecommendationsOutputSchema
>;

/**
 * Wrapper function to trigger the teacher recommendation flow.
 *
 * @param input - The input parameters for generating teacher recommendations.
 * @returns A promise that resolves to the teacher recommendations output.
 */
export async function recommendTeachers(
  input: TeacherRecommendationsInput
): Promise<TeacherRecommendationsOutput> {
  // Provide context of available teachers to the AI.
  // In a real app, this might be fetched from a database based on some pre-filtering.
  const teacherContext = sampleTeachersData.map(t => ({
      name: t.name,
      subjects: t.subjectsTaught.join(', '),
      grades: t.gradeLevelsTaught.join(', '),
      experience: `${t.experienceYears} years`,
      bio: t.bioShort
  }));

  return recommendTeachersFlow({ ...input, availableTeachers: teacherContext });
}

const teacherRecommendationPrompt = ai.definePrompt({
  name: 'teacherRecommendationPrompt',
  input: {
    schema: TeacherRecommendationsInputSchema.extend({
        availableTeachers: z.array(z.object({
            name: z.string(),
            subjects: z.string(),
            grades: z.string(),
            experience: z.string(),
            bio: z.string().optional(),
        })).describe("A list of available teachers with their specializations.")
    }),
  },
  output: { // Ensure output schema matches the flow's output schema
    schema: TeacherRecommendationsOutputSchema,
  },
  prompt: `You are an expert educational consultant for Blanklearn, a platform connecting students (grades 1-10) with teachers.
Your goal is to recommend 2-3 suitable teachers from the provided list based on the student's profile.

Student Profile:
- Interests: {{interests}}
- Age: {{age}}
- Grade Level: {{grade}}

Available Teachers:
{{#each availableTeachers}}
- Name: {{name}}
  Subjects: {{subjects}}
  Grade Levels: {{grades}}
  Experience: {{experience}}
  Bio: {{bio}}
{{/each}}

Based on the student's profile and the list of available teachers, please recommend up to 3 teacher names.
Provide a brief reasoning for your selections.
Indicate if your recommendations are relevant given the student's details.
If no teachers seem like a good fit from the list, please state that and explain why, and set isRelevant to false.
Only recommend teachers from the "Available Teachers" list.
Respond with ONLY the teacher names you recommend in the 'recommendedTeacherNames' array.
`,
});

/**
 * Genkit flow definition for generating personalized teacher recommendations.
 */
const recommendTeachersFlow = ai.defineFlow(
  {
    name: 'recommendTeachersFlow',
    inputSchema: TeacherRecommendationsInputSchema.extend({
         availableTeachers: z.array(z.object({
            name: z.string(),
            subjects: z.string(),
            grades: z.string(),
            experience: z.string(),
            bio: z.string().optional(),
        }))
    }),
    outputSchema: TeacherRecommendationsOutputSchema,
  },
  async (input) => {
    const {output} = await teacherRecommendationPrompt(input);
    if (!output) {
        // Handle cases where the AI might not return a valid structured output
        return {
            recommendedTeacherNames: [],
            reasoning: "The AI could not determine suitable recommendations at this time.",
            isRelevant: false,
        };
    }
    // Ensure the output matches the schema, especially if AI might hallucinate fields
    return {
        recommendedTeacherNames: output.recommendedTeacherNames || [],
        reasoning: output.reasoning || "No specific reasoning provided.",
        isRelevant: output.isRelevant !== undefined ? output.isRelevant : false,
    };
  }
);
