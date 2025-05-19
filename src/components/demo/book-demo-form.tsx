
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Send } from 'lucide-react';

const gradeLevels = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
  'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

const BookDemoSchema = z.object({
  studentName: z.string().min(2, { message: "Student's name must be at least 2 characters." }),
  parentEmail: z.string().email({ message: "Please enter a valid email address." }),
  studentGrade: z.string({ required_error: "Please select the student's grade level." }),
  preferredSubject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  preferredDate: z.date({ required_error: "Please pick a date for the demo." }),
  preferredTime: z.string({ required_error: "Please select a preferred time slot." }),
});

type BookDemoInput = z.infer<typeof BookDemoSchema>;

export default function BookDemoForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<BookDemoInput>({
    resolver: zodResolver(BookDemoSchema),
    defaultValues: {
      studentName: '',
      parentEmail: '',
      preferredSubject: '',
    },
  });

  const onSubmit: SubmitHandler<BookDemoInput> = async (data) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);

    toast({
      title: "Demo Request Submitted!",
      description: `Thank you, ${data.studentName}. We've received your request for a demo in ${data.preferredSubject} on ${format(data.preferredDate, "PPP")} at ${data.preferredTime}. We'll contact you at ${data.parentEmail} shortly.`,
      variant: "default",
    });
    form.reset();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-primary/20">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-semibold">Schedule Your Free Demo</CardTitle>
        <CardDescription>
          Fill out the form below, and we'll help find the perfect teacher for a trial session.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Alex Johnson" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parentEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent's Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="e.g., parent@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="studentGrade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student's Grade Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gradeLevels.map(grade => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredSubject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mathematics, History, Coding" {...field} />
                  </FormControl>
                  <FormDescription>
                    What subject is the student interested in for the demo?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Preferred Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0,0,0,0)) // Disable past dates
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time Slot</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map(slot => (
                          <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full !mt-8" size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Request Free Demo
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

