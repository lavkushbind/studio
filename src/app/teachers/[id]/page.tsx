
import type { Teacher } from '@/types/teacher';
import { getTeacherById } from '@/services/teacherService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, Briefcase, Users, Clock, UserCheck, UserX, Edit3 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface TeacherProfilePageProps {
  params: { id: string };
}

// Helper function to get student count for a slot
const getCurrentStudentCount = (teacher: Teacher, slot: string): number => {
  return teacher.currentStudents?.[slot]?.length || 0;
};

export default async function TeacherProfilePage({ params }: TeacherProfilePageProps) {
  let teacher: Teacher | null = null;
  let error: string | null = null;

  try {
    teacher = await getTeacherById(params.id);
  } catch (err) {
    console.error(`Failed to fetch teacher ${params.id}:`, err);
    error = "Failed to load teacher profile. The teacher may not exist or there was a connection issue.";
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold text-destructive">Error</h1>
        <p className="text-muted-foreground mt-2">{error}</p>
        <Link href="/">
          <Button variant="outline" className="mt-4">Back to Teacher Marketplace</Button>
        </Link>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold text-destructive">Teacher Not Found</h1>
        <p className="text-muted-foreground mt-2">The teacher profile you are looking for does not exist.</p>
        <Link href="/">
          <Button variant="outline" className="mt-4">Back to Teacher Marketplace</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Teacher Header */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
             {/* Placeholder for Avatar if it were in the model */}
            <div className="relative h-32 w-32 md:h-40 md:w-40 border-4 border-primary/30 flex-shrink-0 bg-muted rounded-full flex items-center justify-center">
                 <Users className="h-16 w-16 text-muted-foreground" />
                 {/* <Image src="https://placehold.co/160x160.png" alt={teacher.name} layout="fill" objectFit="cover" className="rounded-full" /> */}
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold mb-1">{teacher.name}</h1>
              {/* Bio short removed as not in model */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {teacher.rating?.toFixed(1)}
                 {/* Reviews count removed as not in new model */}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Briefcase className="h-4 w-4" /> {teacher.experience} years of experience
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Users className="h-4 w-4" /> Max {teacher.maxStudentsPerSlot} students per slot
              </div>
              {/* Monthly Fee removed as not in new model */}
            </div>
          </div>

          {/* Preferred Standards */}
          {teacher.preferredStandard && teacher.preferredStandard.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><UserCheck className="text-primary"/> Preferred Standards (Grades)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {teacher.preferredStandard.map(standard => (
                    <Badge key={standard} variant="secondary">Grade {standard}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Available Slots */}
          {teacher.availableSlots && teacher.availableSlots.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="text-primary"/> Available Slots</CardTitle>
                <CardDescription>Current student count / Max students per slot. Select a slot to book.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {teacher.availableSlots.map(slot => {
                  const currentStudentsInSlot = getCurrentStudentCount(teacher, slot);
                  const isSlotFull = currentStudentsInSlot >= teacher.maxStudentsPerSlot;
                  return (
                    <div key={slot} className="p-3 border rounded-md flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-md">{slot}</h4>
                        <p className="text-sm text-muted-foreground">
                          {currentStudentsInSlot} / {teacher.maxStudentsPerSlot} students
                        </p>
                      </div>
                      <Button size="sm" disabled={isSlotFull} variant={isSlotFull ? "secondary" : "default"}>
                        {isSlotFull ? <UserX className="mr-2 h-4 w-4" /> : <Edit3 className="mr-2 h-4 w-4" />}
                        {isSlotFull ? 'Slot Full' : 'Book Demo'}
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* FullBio, TeachingPhilosophy, Qualifications, VideoIntroUrl removed as not in new model */}
        </div>

        {/* Right Column (Sidebar - Simplified) */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 self-start">
            <Card className="shadow-lg border border-primary/20">
                 <CardHeader>
                     <CardTitle className="flex items-center gap-2">Teacher Summary</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {teacher.name}</p>
                    <p><strong>Rating:</strong> {teacher.rating.toFixed(1)} / 5.0</p>
                    <p><strong>Experience:</strong> {teacher.experience} years</p>
                    <p><strong>Max Students/Slot:</strong> {teacher.maxStudentsPerSlot}</p>
                    <p><strong>Preferred Standards:</strong> {teacher.preferredStandard.join(', ') || 'Not specified'}</p>
                 </CardContent>
                 <CardFooter>
                    <Button className="w-full" onClick={() => alert('Contact teacher functionality to be implemented.')}>
                        Message {teacher.name.split(' ')[0]}
                    </Button>
                 </CardFooter>
             </Card>
             {/* DemoDetails and old review display removed as not in new model */}
        </div>
      </div>
    </div>
  );
}
