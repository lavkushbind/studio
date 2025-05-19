
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { recommendTeachers } from '@/ai/flows/teacher-recommendations'; // Updated import
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Wand2, ThumbsUp, ThumbsDown, AlertCircle, UserCheck, ExternalLink } from 'lucide-react';
import { sampleTeachersData } from '@/data/sample-teachers'; // To link to teacher profiles
import Link from 'next/link';


const RecommendationInputSchema = z.object({
  interests: z.string().min(3, { message: 'Please list at least one interest (e.g., math, history, coding).' }),
  age: z.coerce.number().min(5, { message: 'Age must be at least 5 (for Grades 1-10 focus).' }).max(18, { message: 'Age must be 18 or less.' }),
  grade: z.string().min(1, { message: 'Please enter a grade level (e.g., 1st, 7th Grade, Grade 10).' }),
});

type RecommendationInput = z.infer<typeof RecommendationInputSchema>;

interface RecommendedTeacherInfo {
    name: string;
    id?: string; // For linking to profile
}

export default function AiRecommendations() {
  const [recommendedTeachersInfo, setRecommendedTeachersInfo] = useState<RecommendedTeacherInfo[]>([]);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);
  const [isRelevant, setIsRelevant] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

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
    setRecommendedTeachersInfo([]);
    setAiReasoning(null);
    setIsRelevant(null);

    try {
      const interestsArray = data.interests.split(',').map(interest => interest.trim()).filter(Boolean);
      if (interestsArray.length === 0) {
          form.setError("interests", { message: "Please provide at least one interest."});
          setLoading(false);
          return;
      }

      const result = await recommendTeachers({
        interests: interestsArray,
        age: data.age,
        grade: data.grade,
      });
      
      if (result?.recommendedTeacherNames) {
        // Map names to teacher objects to get IDs for linking
        const hydratedTeachers = result.recommendedTeacherNames.map(name => {
            const foundTeacher = sampleTeachersData.find(t => t.name === name);
            return { name, id: foundTeacher?.id };
        });
        setRecommendedTeachersInfo(hydratedTeachers);
        setAiReasoning(result.reasoning);
        setIsRelevant(result.isRelevant ?? null);
        setShowForm(false);
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
      setRecommendedTeachersInfo([]);
      setAiReasoning(null);
      setIsRelevant(null);
      setError(null);
      form.reset();
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl md:text-2xl font-semibold">
          <Wand2 className="h-6 w-6 text-primary" />
          AI Teacher Matchmaker
        </CardTitle>
        <CardDescription>
          {showForm
            ? "Tell us about the student, and our AI will suggest a few teachers."
            : "Based on your input, here are some teacher suggestions:"}
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
                    <FormLabel>Student's Interests (comma-separated)</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., coding, space, creative writing, biology" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Student's Age</FormLabel>
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
                        <FormLabel>Student's Grade Level</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., 5th Grade, Grade 9" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                 {error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <Button type="submit" disabled={loading} className="w-full !mt-6" size="lg">
                {loading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding Teachers...
                    </>
                ) : (
                    'Get AI Recommendations'
                )}
                </Button>
            </form>
            </Form>
        ) : (
           <div className="space-y-4">
             {recommendedTeachersInfo.length > 0 ? (
                <>
                <h3 className="font-semibold text-lg">Recommended Teachers:</h3>
               <ul className="space-y-3">
                 {recommendedTeachersInfo.map((teacher, index) => (
                   <li key={index} className="p-3 border rounded-md shadow-sm bg-card flex justify-between items-center">
                     <span className="font-medium text-card-foreground flex items-center gap-2"><UserCheck className="text-primary h-5 w-5"/> {teacher.name}</span>
                     {teacher.id ? (
                        <Link href={`/teachers/${teacher.id}`} passHref>
                            <Button variant="outline" size="sm">
                                View Profile <ExternalLink className="ml-2 h-3 w-3"/>
                            </Button>
                        </Link>
                     ) : (
                        <span className="text-xs text-muted-foreground">Profile link unavailable</span>
                     )}
                   </li>
                 ))}
               </ul>
                {aiReasoning && (
                    <Alert variant="default" className="bg-secondary/50">
                        <Wand2 className="h-4 w-4"/>
                        <AlertTitle>AI Reasoning</AlertTitle>
                        <AlertDescription>{aiReasoning}</AlertDescription>
                    </Alert>
                )}
               </>
             ) : (
               <p className="text-muted-foreground text-center py-4">No specific teacher recommendations found based on the input. You can try adjusting the details.</p>
             )}

             {isRelevant !== null && (
                <Alert variant={isRelevant ? "default" : "destructive"} className={`mt-4 ${isRelevant ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                 {isRelevant ? <ThumbsUp className="h-4 w-4" /> : <ThumbsDown className="h-4 w-4" />}
                 <AlertTitle>{isRelevant ? "Relevant Suggestions" : "Potentially Mismatched Suggestions"}</AlertTitle>
                 <AlertDescription>
                   {isRelevant
                     ? "The AI determined these teachers are likely a good match for the student's profile."
                     : "The AI indicated these suggestions might not perfectly align with the student's profile. Consider refining the interests or details for a better match, or browse all teachers."}
                 </AlertDescription>
               </Alert>
             )}
              <Button onClick={handleTryAgain} variant="outline" className="w-full !mt-6">
                Get New Recommendations
             </Button>
           </div>
        )}
      </CardContent>
    </Card>
  );
}
