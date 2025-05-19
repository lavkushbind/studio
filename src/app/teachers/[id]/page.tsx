
import type { Teacher } from '@/types/teacher';
import { sampleTeachersData } from '@/data/sample-teachers';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, Users, Briefcase, BookOpen, DollarSign, Video, Mail, MessageSquare, Award, BookCopy, Brain, Edit3, CalendarClock, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface TeacherProfilePageProps {
  params: { id: string };
}

// Simulate fetching a single teacher by ID
async function getTeacherById(id: string): Promise<Teacher | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  return sampleTeachersData.find((teacher) => teacher.id === id);
}

export default async function TeacherProfilePage({ params }: TeacherProfilePageProps) {
  const teacher = await getTeacherById(params.id);

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
            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-primary/30 flex-shrink-0">
              <AvatarImage src={teacher.avatarUrl || `https://placehold.co/160x160.png`} alt={teacher.name} data-ai-hint="teacher portrait professional"/>
              <AvatarFallback className="text-4xl">{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold mb-1">{teacher.name}</h1>
              <p className="text-lg text-primary mb-3">{teacher.bioShort}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {teacher.rating.toFixed(1)} ({teacher.reviews} reviews)
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Briefcase className="h-4 w-4" /> {teacher.experienceYears} years of experience
              </div>
              {teacher.hourlyRate && (
                <div className="flex items-center gap-1 text-lg font-semibold text-foreground mt-2">
                    <DollarSign className="h-5 w-5 text-primary"/>
                    {teacher.hourlyRate.toFixed(2)}
                    <span className="text-xs text-muted-foreground ml-1">/hr (for regular classes)</span>
                </div>
              )}
            </div>
          </div>

          {/* Video Introduction */}
          {teacher.videoIntroUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Video className="text-primary"/> Video Introduction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <video controls className="w-full h-full" src={teacher.videoIntroUrl} poster={`https://placehold.co/600x338.png?text=Video+Intro+for+${teacher.name.replace(/\s+/g, "+")}`} data-ai-hint="teacher introduction video">
                    Your browser does not support the video tag.
                  </video>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Full Biography */}
          <Card>
            <CardHeader>
              <CardTitle>About {teacher.name.split(' ')[0]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base whitespace-pre-line text-foreground/90">{teacher.fullBio}</p>
            </CardContent>
          </Card>

          {/* Teaching Philosophy */}
          {teacher.teachingPhilosophy && (
             <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><Brain className="text-primary"/> Teaching Philosophy</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-base italic text-muted-foreground">&ldquo;{teacher.teachingPhilosophy}&rdquo;</p>
                </CardContent>
            </Card>
          )}
          
          {/* Subjects and Grade Levels */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><BookCopy className="text-primary"/> Subjects Taught</CardTitle></CardHeader>
                <CardContent>
                    <ul className="space-y-1">
                        {teacher.subjectsTaught.map(subject => <li key={subject}><Badge variant="secondary">{subject}</Badge></li>)}
                    </ul>
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Users className="text-primary"/> Grade Levels</CardTitle></CardHeader>
                <CardContent>
                     <ul className="space-y-1">
                        {teacher.gradeLevelsTaught.map(grade => <li key={grade}><Badge variant="outline">{grade}</Badge></li>)}
                    </ul>
                </CardContent>
            </Card>
          </div>

          {/* Weekly Availability */}
          {teacher.weeklyAvailability && teacher.weeklyAvailability.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CalendarClock className="text-primary"/> Weekly Availability</CardTitle>
                <CardDescription>General time slots. Specific availability may vary.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {teacher.weeklyAvailability.map(dailySlots => (
                  <div key={dailySlots.day}>
                    <h4 className="font-semibold text-md mb-1">{dailySlots.day}</h4>
                    {dailySlots.slots.length > 0 ? (
                      <ul className="space-y-1 pl-1">
                        {dailySlots.slots.map(slot => (
                          <li key={slot.time} className="text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>{slot.time}</span>
                            <Badge variant={slot.type === 'Demo' ? 'destructive' : 'outline'} className="text-xs px-1.5 py-0.5">{slot.type}</Badge>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground pl-1">No slots listed for this day.</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}


          {/* Qualifications */}
          {teacher.qualifications && teacher.qualifications.length > 0 && (
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><Award className="text-primary"/> Qualifications</CardTitle>
                </CardHeader>
                <CardContent>
                <ul className="space-y-2 list-disc list-inside">
                    {teacher.qualifications.map((qualification, index) => (
                    <li key={index} className="text-sm text-foreground/90">{qualification}</li>
                    ))}
                </ul>
                </CardContent>
            </Card>
           )}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 self-start">
            {/* Demo Class Card */}
            {teacher.demoDetails.offered && (
             <Card className="shadow-lg border border-primary/20">
                 <CardHeader>
                     <CardTitle className="flex items-center gap-2"><Video className="text-accent h-6 w-6"/> Book a Demo Class</CardTitle>
                     <CardDescription>
                        Duration: {teacher.demoDetails.duration} | Cost: {teacher.demoDetails.cost !== undefined && teacher.demoDetails.cost > 0 ? `$${teacher.demoDetails.cost.toFixed(2)}` : 'Free'}
                     </CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    {teacher.demoDetails.description && <p className="text-sm text-muted-foreground mb-3">{teacher.demoDetails.description}</p>}
                    <Button className="w-full" size="lg">
                        <Edit3 className="mr-2"/>
                        Request Demo Session
                    </Button>
                    {/* Consider linking to a specific booking form for this teacher later */}
                    <Button variant="outline" className="w-full">
                        <Mail className="mr-2"/>
                        Message {teacher.name.split(' ')[0]}
                    </Button>
                 </CardContent>
             </Card>
            )}

             {/* Reviews (Placeholder) */}
            <Card>
                <CardHeader>
                <CardTitle>Student & Parent Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.round(teacher.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/50'}`} />
                    ))}
                    <span className='ml-2 text-sm text-muted-foreground'>{teacher.rating.toFixed(1)} average from {teacher.reviews} reviews</span>
                </div>
                <p className="text-sm text-muted-foreground">Detailed reviews will be displayed here once available.</p>
                {/* TODO: Implement review display component */}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
