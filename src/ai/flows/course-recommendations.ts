'use server';
/**
 * @fileOverview Personalized course recommendations flow.
 *
 * This file defines a Genkit flow to provide personalized course recommendations
 * based on a student's profile (interests, age, grade).
 *
 * @requires genkit
 * @requires z
 *
 * @exports recommendCourses - A function that returns personalized course recommendations.
 * @exports CourseRecommendationsInput - The input type for the recommendCourses function.
 * @exports CourseRecommendationsOutput - The return type for the recommendCourses function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

/**
 * Input schema for the course recommendations flow.
 */
const CourseRecommendationsInputSchema = z.object({
  interests: z.array(z.string()).describe('List of student interests.'),
  age: z.number().describe('Student age.'),
  grade: z.string().describe('Student grade level.'),
});
export type CourseRecommendationsInput = z.infer<
  typeof CourseRecommendationsInputSchema
>;

/**
 * Output schema for the course recommendations flow.
 */
const CourseRecommendationsOutputSchema = z.object({
  recommendedCourses: z.array(z.string()).describe('List of recommended course titles.'),
  isRelevant: z.boolean().describe('Whether or not the courses are relevant to the user'),
});
export type CourseRecommendationsOutput = z.infer<
  typeof CourseRecommendationsOutputSchema
>;

/**
 * Wrapper function to trigger the course recommendation flow.
 *
 * @param input - The input parameters for generating course recommendations.
 * @returns A promise that resolves to the course recommendations output.
 */
export async function recommendCourses(
  input: CourseRecommendationsInput
): Promise<CourseRecommendationsOutput> {
  return recommendCoursesFlow(input);
}

const courseRecommendationPrompt = ai.definePrompt({
  name: 'courseRecommendationPrompt',
  input: {
    schema: z.object({
      interests: z.array(z.string()).describe('List of student interests.'),
      age: z.number().describe('Student age.'),
      grade: z.string().describe('Student grade level.'),
    }),
  },
  output: {
    schema: z.object({
      recommendedCourses: z.array(z.string()).describe('List of recommended course titles.'),
      isRelevant: z.boolean().describe('Whether or not the courses are relevant to the user'),
    }),
  },
  prompt: `Based on the student's profile, recommend a list of courses that align with their interests, age, and grade level.\n\nStudent Interests: {{interests}}\nStudent Age: {{age}}\nStudent Grade: {{grade}}\n\nConsider courses suitable for a student with the above profile. Respond with course titles that would be interesting and relevant to the student.\nAlso, indicate in the isRelevant parameter, whether or not this list of courses are indeed relevant to the user.
\nRecommended Courses:`, // Ensure the AI responds with course titles.
});

/**
 * Genkit flow definition for generating personalized course recommendations.
 */
const recommendCoursesFlow = ai.defineFlow<
  typeof CourseRecommendationsInputSchema,
  typeof CourseRecommendationsOutputSchema
>(
  {
    name: 'recommendCoursesFlow',
    inputSchema: CourseRecommendationsInputSchema,
    outputSchema: CourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await courseRecommendationPrompt(input);
    return output!;
  }
);
