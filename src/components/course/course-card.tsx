import type { Course } from '@/types/course';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Users, BookOpen, DollarSign, Film } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0 relative">
        <Link href={`/courses/${course.id}`} className="block">
          <Image
            src={`https://picsum.photos/seed/${course.id}/400/200`}
            alt={course.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
            data-ai-hint="education online course learning"
          />
        </Link>
        <Badge
          variant={course.type === 'live' ? 'destructive' : 'secondary'}
          className="absolute top-2 right-2 capitalize"
        >
           {course.type === 'live' ? <Film className="mr-1 h-3 w-3" /> : <BookOpen className="mr-1 h-3 w-3" />}
           {course.type}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/courses/${course.id}`}>
           <CardTitle className="text-lg font-semibold mb-1 line-clamp-2 hover:text-primary transition-colors">{course.title}</CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground mb-2">
          By {course.teacher.name}
        </CardDescription>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
           <Badge variant="outline" className="capitalize">{course.subject}</Badge>
           <span className="flex items-center gap-1">
             <Users className="h-4 w-4" /> {course.ageGroup}
           </span>
        </div>
         <CardDescription className="text-sm line-clamp-3 mb-3">{course.description}</CardDescription>
         <div className="flex items-center justify-between text-sm text-muted-foreground">
           <span className="flex items-center gap-1">
             <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {course.rating.toFixed(1)} ({course.reviews} reviews)
           </span>
           <span className="flex items-center gap-1">
             <Clock className="h-4 w-4" /> {course.duration}
           </span>
         </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-auto">
        <div className="flex items-center font-semibold text-lg">
            <DollarSign className="h-5 w-5 mr-1 text-primary"/>
            {course.price.toFixed(2)}
        </div>
        <Link href={`/courses/${course.id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
