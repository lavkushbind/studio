
import TeacherMarketplace from '@/components/teacher/teacher-marketplace';
import AiRecommendations from '@/components/ai/ai-recommendations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Lightbulb, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Your Perfect Teacher on <span className="text-primary">Blanklearn</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Personalized 1-on-1 learning for students in grades 1-10. Connect with experienced educators tailored to your child's needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#find-teachers">
            <Button size="lg" className="w-full sm:w-auto">
              <Search className="mr-2 h-5 w-5" />
              Find a Teacher
            </Button>
          </Link>
          <Link href="#ai-recommendations">
             <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Lightbulb className="mr-2 h-5 w-5" />
                Get AI Recommendation
             </Button>
          </Link>
        </div>
      </section>

      <section id="ai-recommendations" className="py-12 md:py-16">
        <AiRecommendations />
      </section>

      <section id="find-teachers" className="py-12 md:py-16">
         <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Educators</h2>
        <TeacherMarketplace />
      </section>
    </div>
  );
}
