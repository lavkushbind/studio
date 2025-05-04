import type { Course } from '@/types/course';
import { sampleCourses } from '@/data/sample-courses';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, Clock, Users, BookOpen, DollarSign, Film, CalendarDays, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface CourseDetailsPageProps {
  params: { id: string };
}

// Simulate fetching a single course by ID
async function getCourseById(id: string): Promise<Course | undefined> {
  // In a real app, fetch from an API: const res = await fetch(`/api/courses/${id}`);
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  return sampleCourses.find((course) => course.id === id);
}

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const course = await getCourseById(params.id);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold text-destructive">Course Not Found</h1>
        <p className="text-muted-foreground mt-2">The course you are looking for does not exist or may have been removed.</p>
         <Link href="/">
            <Button variant="outline" className="mt-4">Back to Marketplace</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Header */}
          <div>
             <Badge variant="outline" className="mb-2 capitalize">{course.subject}</Badge>
             <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
             <p className="text-lg text-muted-foreground mb-4">{course.shortDescription || `An engaging ${course.type} course on ${course.subject} for ages ${course.ageGroup}.`}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {course.rating.toFixed(1)} ({course.reviews} reviews)
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" /> Ages {course.ageGroup}
                    </div>
                     <span className="hidden sm:inline">•</span>
                    <div className="flex items-center gap-1">
                        {course.type === 'live' ? <Film className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                        <span className="capitalize">{course.type} Course</span>
                    </div>
                     <span className="hidden sm:inline">•</span>
                     <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {course.duration}
                    </div>
                </div>
          </div>

            {/* Course Image */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
             <Image
                src={`https://picsum.photos/seed/${course.id}/800/400`}
                alt={course.title}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
                priority // Prioritize loading the main image
                data-ai-hint="online class education learning"
            />
          </div>


          {/* Course Description */}
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base whitespace-pre-line">{course.description}</p>
            </CardContent>
          </Card>

           {/* What You'll Learn */}
           {course.learningObjectives && course.learningObjectives.length > 0 && (
            <Card>
                <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                <ul className="space-y-2">
                    {course.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{objective}</span>
                    </li>
                    ))}
                </ul>
                </CardContent>
            </Card>
           )}


          {/* Reviews (Placeholder) */}
          <Card>
             <CardHeader>
               <CardTitle>Student Reviews</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-muted-foreground">Reviews will be displayed here.</p>
               {/* TODO: Implement review display component */}
               <div className="mt-4 space-y-4">
                  <div className="flex gap-2 items-center">
                    {[...Array(5)].map((_, i) => (
                       <Star key={i} className={`h-5 w-5 ${i < Math.round(course.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/50'}`} />
                    ))}
                     <span className='ml-2 text-sm text-muted-foreground'>Based on {course.reviews} reviews</span>
                  </div>
                  {/* Placeholder for individual reviews */}
               </div>
             </CardContent>
           </Card>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 self-start">
            {/* Pricing and Enrollment Card */}
             <Card className="shadow-lg border border-primary/20">
                 <CardHeader className="text-center">
                     <div className="text-4xl font-bold mb-2 flex items-center justify-center">
                         <DollarSign className="h-8 w-8 mr-1 text-primary"/>
                         {course.price.toFixed(2)}
                     </div>
                     <CardDescription>{course.type === 'live' ? 'Per live session' : 'One-time purchase'}</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    <Button className="w-full" size="lg">Enroll Now</Button>
                    <Button variant="outline" className="w-full">Add to Wishlist</Button>
                 </CardContent>
                 <Separator className="my-4" />
                <CardContent className="text-sm text-muted-foreground space-y-2">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4"/>
                        <span>{course.schedule || 'Flexible schedule'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       {course.type === 'live' ? <Film className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                        <span className="capitalize">{course.type} Access</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration} total</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Suitable for ages {course.ageGroup}</span>
                    </div>
                </CardContent>
             </Card>

             {/* Instructor Card */}
             <Card>
                <CardHeader>
                <CardTitle>Instructor</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={course.teacher.avatarUrl || `https://i.pravatar.cc/150?u=${course.teacher.name}`} alt={course.teacher.name} data-ai-hint="teacher instructor avatar"/>
                    <AvatarFallback>{course.teacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold">{course.teacher.name}</h3>
                    <p className="text-sm text-muted-foreground">{course.teacher.bioShort || 'Experienced Educator'}</p>
                    {/* Link to teacher profile page can be added here */}
                </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

// Generate static paths for sample courses if needed (optional, good for performance)
// export async function generateStaticParams() {
//   return sampleCourses.map((course) => ({
//     id: course.id,
//   }));
// }
