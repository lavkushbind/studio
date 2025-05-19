
import type { Teacher } from '@/types/teacher';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Star, Briefcase, Users, Layers } from 'lucide-react'; // Changed BookOpen to Layers for standards
import Image from 'next/image'; // Keep for placeholder

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-4 flex-row items-center gap-4 bg-muted/30">
        {/* Placeholder for Avatar - not in new model */}
        <div className="h-16 w-16 border-2 border-primary/50 rounded-full flex items-center justify-center bg-background">
            <Users className="h-8 w-8 text-muted-foreground" />
            {/* <Image src="https://placehold.co/80x80.png" alt={teacher.name} width={80} height={80} className="rounded-full" /> */}
        </div>
        <div className="flex-grow">
          <Link href={`/teachers/${teacher.id}`}>
            <CardTitle className="text-lg font-semibold mb-1 hover:text-primary transition-colors">{teacher.name}</CardTitle>
          </Link>
          {/* BioShort removed as not in new model */}
          <CardDescription className="text-sm text-muted-foreground">ID: {teacher.id}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-3">
        <div className="space-y-1">
            <p className="text-sm font-medium text-foreground flex items-center gap-1"><Layers className="h-4 w-4"/> Preferred Standards (Grades):</p>
            <div className="flex flex-wrap gap-1">
            {teacher.preferredStandard.slice(0, 3).map((standard) => (
                <Badge key={standard} variant="secondary" className="text-xs">Grade {standard}</Badge>
            ))}
            {teacher.preferredStandard.length > 3 && <Badge variant="secondary" className="text-xs">+{teacher.preferredStandard.length - 3} more</Badge>}
            {teacher.preferredStandard.length === 0 && <span className="text-xs text-muted-foreground">Not specified</span>}
            </div>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <span className="flex items-center gap-1 mr-4">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {teacher.rating.toFixed(1)}
          </span>
          <span className="flex items-center gap-1 mr-4">
            <Briefcase className="h-4 w-4" /> {teacher.experience} yrs exp.
          </span>
           <span className="flex items-center gap-1">
            <Users className="h-4 w-4" /> Max {teacher.maxStudentsPerSlot}/slot
          </span>
        </div>

         <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Available Slots:</p>
            {teacher.availableSlots.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                {teacher.availableSlots.slice(0, 2).map((slot) => (
                    <Badge key={slot} variant="outline" className="text-xs">{slot}</Badge>
                ))}
                {teacher.availableSlots.length > 2 && <Badge variant="outline" className="text-xs">+{teacher.availableSlots.length - 2} more</Badge>}
                </div>
            ) : (
                 <p className="text-xs text-muted-foreground">No slots listed.</p>
            )}
        </div>
        {/* Demo details & Monthly Fee removed as not in new model */}
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t mt-auto">
        <Link href={`/teachers/${teacher.id}`} className="w-full">
          <Button size="sm" className="w-full">View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
