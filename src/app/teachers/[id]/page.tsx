
import type { Teacher } from '@/types/teacher';
import { getTeacherById } from '@/services/teacherService';
// import { Badge } from '@/components/ui/badge'; // No longer needed for this simplified view
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { UserX, AlertTriangle, HomeIcon, Users } from 'lucide-react'; // Users for placeholder avatar
import Link from 'next/link';
// import Image from 'next/image'; // Image placeholder removed as avatar not in new model

interface TeacherProfilePageProps {
  params: { id: string };
}

export default async function TeacherProfilePage({ params }: TeacherProfilePageProps) {
  let teacher: Teacher | null = null;
  let error: string | null = null;

  try {
    teacher = await getTeacherById(params.id);
  } catch (err: any) {
    console.error(`Failed to fetch teacher ${params.id}:`, err);
    error = `Failed to load teacher profile. ${err.message || "There was a connection issue."}`;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-destructive">
                    <AlertTriangle className="h-6 w-6"/> Error Loading Profile
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mt-2">{error}</p>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Link href="/">
                    <Button variant="outline">
                        <HomeIcon className="mr-2 h-4 w-4"/>
                        Back to Homepage
                    </Button>
                </Link>
            </CardFooter>
        </Card>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
         <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                    <UserX className="h-6 w-6 text-muted-foreground"/> Teacher Not Found
                </CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-muted-foreground mt-2">The teacher profile you are looking for (ID: {params.id}) does not exist or may have been removed.</p>
            </CardContent>
            <CardFooter className="flex justify-center">
                 <Link href="/">
                    <Button variant="outline">
                         <HomeIcon className="mr-2 h-4 w-4"/>
                        Back to Teacher Marketplace
                    </Button>
                </Link>
            </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Teacher Header */}
          <div className="flex flex-col sm:flex-row gap-6 items-start p-6 border rounded-lg shadow-sm bg-card">
            <div className="relative h-32 w-32 md:h-40 md:w-40 border-4 border-primary/30 flex-shrink-0 bg-muted rounded-full flex items-center justify-center" data-ai-hint="teacher avatar placeholder">
                 <Users className="h-16 w-16 text-muted-foreground" />
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold mb-1">{teacher.name}</h1>
              {/* Other details like rating, experience, etc. are removed as per request */}
               <CardDescription>Teacher ID: {teacher.id}</CardDescription>
            </div>
          </div>

          {/* Placeholder for other content if needed in future */}
          <Card>
            <CardHeader>
                <CardTitle>About {teacher.name.split(' ')[0]}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">More details about the teacher will be displayed here in the future.</p>
                {/* For example, if a bio field were added back to the model:
                {teacher.bio && <p>{teacher.bio}</p>} */}
            </CardContent>
          </Card>

        </div>

        {/* Right Column (Sidebar - Simplified) */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8 self-start">
            <Card className="shadow-lg border border-primary/20">
                 <CardHeader>
                     <CardTitle className="flex items-center gap-2 text-lg">Teacher Summary</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3 text-sm">
                    <p><strong>Name:</strong> {teacher.name}</p>
                    {/* Other summary details removed */}
                 </CardContent>
                 <CardFooter>
                    <Button className="w-full" onClick={() => alert('Contact teacher functionality to be implemented.')}>
                        Message {teacher.name.split(' ')[0]}
                    </Button>
                 </CardFooter>
             </Card>
        </div>
      </div>
    </div>
  );
}

// Helper to add 'size' prop to Badge if it's not there in shadcn
// This might not be needed anymore if badges are removed from this page.
// declare module '@/components/ui/badge' {
//   interface BadgeProps {
//     size?: 'sm' | 'md' | 'lg'; // example sizes
//   }
// }
