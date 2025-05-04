'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { recommendCourses } from '@/ai/flows/course-recommendations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Wand2, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

const RecommendationInputSchema = z.object({
  interests: z.string().min(3, { message: 'Please list at least one interest (comma-separated).' }),
  age: z.coerce.number().min(3, { message: 'Age must be at least 3.' }).max(100, { message: 'Age must be 100 or less.' }),
  grade: z.string().min(1, { message: 'Please enter a grade level (e.g., 3rd, High School).' }),
});

type RecommendationInput = z.infer<typeof RecommendationInputSchema>;

export default function AiRecommendations() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isRelevant, setIsRelevant] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true); // Initially show the form

  const form = useForm<RecommendationInput>({
    resolver: zodResolver(RecommendationInputSchema),
    defaultValues: {
      interests: '',
      age: undefined,
      grade: '',
    },
  });

  const onSubmit: SubmitHandler<RecommendationInput> = async (data) => {
    setLoading(true);
    setError(null);
    setRecommendations([]);
    setIsRelevant(null);

    try {
      // Split interests string into an array
      const interestsArray = data.interests.split(',').map(interest => interest.trim()).filter(Boolean);
      if (interestsArray.length === 0) {
          form.setError("interests", { message: "Please provide at least one interest."});
          setLoading(false);
          return;
      }

      const result = await recommendCourses({
        interests: interestsArray,
        age: data.age,
        grade: data.grade,
      });

      if (result?.recommendedCourses) {
        setRecommendations(result.recommendedCourses);
        setIsRelevant(result.isRelevant ?? null); // Use nullish coalescing
        setShowForm(false); // Hide form on success
      } else {
         setError('Received unexpected response from the AI. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Failed to get recommendations. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
      setShowForm(true);
      setRecommendations([]);
      setIsRelevant(null);
      setError(null);
      form.reset(); // Reset form fields
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <Wand2 className="h-6 w-6 text-primary" />
          Personalized Course Recommendations
        </CardTitle>
        <CardDescription>
          {showForm
            ? "Tell us about the learner, and our AI will suggest relevant courses."
            : "Based on the provided details, here are some course suggestions:"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showForm ? (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Interests (comma-separated)</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., coding, space, drawing" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="e.g., 10" {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Grade Level</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., 5th Grade" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                 {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Recommendations...
                    </>
                ) : (
                    'Get Recommendations'
                )}
                </Button>
            </form>
            </Form>
        ) : (
           <div>
             {recommendations.length > 0 ? (
               <ul className="space-y-2 list-disc list-inside mb-4">
                 {recommendations.map((course, index) => (
                   <li key={index} className="text-base">{course}</li>
                 ))}
               </ul>
             ) : (
               <p className="text-muted-foreground">No specific recommendations found based on the input.</p>
             )}

             {isRelevant !== null && (
                <Alert variant={isRelevant ? "default" : "destructive"} className="mt-4 bg-opacity-10">
                 {isRelevant ? <ThumbsUp className="h-4 w-4" /> : <ThumbsDown className="h-4 w-4" />}
                 <AlertTitle>{isRelevant ? "Relevant Suggestions" : "Potentially Irrelevant Suggestions"}</AlertTitle>
                 <AlertDescription>
                   {isRelevant
                     ? "The AI determined these courses are likely relevant to the learner's profile."
                     : "The AI indicated these suggestions might not perfectly match the learner's profile. Consider refining the interests or details."}
                 </AlertDescription>
               </Alert>
             )}
              <Button onClick={handleTryAgain} variant="outline" className="mt-4 w-full">
                Get New Recommendations
             </Button>
           </div>
        )}
      </CardContent>

    </Card>
  );
}
