
import type { Teacher } from '@/types/teacher';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge'; // Badges removed for simplicity
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users } from 'lucide-react'; // For placeholder avatar
// import Image from 'next/image'; // Image placeholder removed

interface TeacherCardProps { // Added this interface
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-4 flex-row items-center gap-4 bg-muted/30">
        <div className="h-16 w-16 border-2 border-primary/50 rounded-full flex items-center justify-center bg-background" data-ai-hint="teacher avatar placeholder">
            <Users className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex-grow">
          <Link href={`/teachers/${teacher.id}`}>
            <CardTitle className="text-lg font-semibold mb-1 hover:text-primary transition-colors">{teacher.name}</CardTitle>
          </Link>
          <CardDescription className="text-sm text-muted-foreground">ID: {teacher.id}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-3">
        <p className="text-sm text-muted-foreground">
          View profile to see more details and book a demo.
        </p>
        {/* All other details like preferred standards, rating, experience, slots have been removed from card view */}
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t mt-auto">
        <Link href={`/teachers/${teacher.id}`} className="w-full">
          <Button size="sm" className="w-full">View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
