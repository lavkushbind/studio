
import type { Teacher } from '@/types/teacher';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Star, BookOpen, Users, Briefcase, Video, DollarSign } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-4 flex-row items-center gap-4">
        <Avatar className="h-20 w-20 border-2 border-primary/50">
          <AvatarImage src={teacher.avatarUrl || `https://placehold.co/80x80.png`} alt={teacher.name} data-ai-hint="teacher portrait" />
          <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <Link href={`/teachers/${teacher.id}`}>
            <CardTitle className="text-xl font-semibold mb-1 hover:text-primary transition-colors">{teacher.name}</CardTitle>
          </Link>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">{teacher.bioShort}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-3">
        <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Teaches:</p>
            <div className="flex flex-wrap gap-1">
            {teacher.subjectsTaught.slice(0, 3).map((subject) => (
                <Badge key={subject} variant="secondary" className="text-xs">{subject}</Badge>
            ))}
            {teacher.subjectsTaught.length > 3 && <Badge variant="secondary" className="text-xs">+{teacher.subjectsTaught.length - 3} more</Badge>}
            </div>
        </div>
         <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Grade Levels:</p>
            <div className="flex flex-wrap gap-1">
            {teacher.gradeLevelsTaught.slice(0, 2).map((grade) => (
                <Badge key={grade} variant="outline" className="text-xs">{grade}</Badge>
            ))}
             {teacher.gradeLevelsTaught.length > 2 && <Badge variant="outline" className="text-xs">+{teacher.gradeLevelsTaught.length - 2} more</Badge>}
            </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {teacher.rating.toFixed(1)} ({teacher.reviews} reviews)
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" /> {teacher.experienceYears} yrs exp.
          </span>
        </div>
         {teacher.demoDetails.offered && (
            <div className="flex items-center gap-1 text-sm text-green-600">
                <Video className="h-4 w-4"/>
                Free Demo Available ({teacher.demoDetails.duration})
            </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row justify-between items-center border-t mt-auto gap-2">
        {teacher.hourlyRate && (
            <div className="flex items-center font-semibold text-lg">
                <DollarSign className="h-5 w-5 mr-1 text-primary"/>
                {teacher.hourlyRate.toFixed(2)}
                <span className="text-xs text-muted-foreground ml-1">/hr</span>
            </div>
        )}
        <Link href={`/teachers/${teacher.id}`} className="w-full sm:w-auto">
          <Button size="sm" className="w-full">View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
