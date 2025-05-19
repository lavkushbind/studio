
import { Search, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import BookDemoForm from '@/components/demo/book-demo-form';
import TeacherMarketplace from '@/components/teacher/teacher-marketplace';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Your Perfect Teacher on <span className="text-primary">Blanklearn</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Personalized 1-on-1 learning for students in grades 1-10. Connect with experienced educators tailored to your child&apos;s needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#find-teachers">
            <Button size="lg" className="w-full sm:w-auto">
              <Search className="mr-2 h-5 w-5" />
              Find a Teacher
            </Button>
          </Link>
          <Link href="#book-demo">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <CalendarCheck className="mr-2 h-5 w-5" /> Book a Free Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Book Demo Section */}
      <section id="book-demo" className="py-12 md:py-16 bg-muted/30 rounded-lg">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
                Book Your Free Demo Class
            </h2>
            <BookDemoForm />
        </div>
      </section>


      {/* Teacher Marketplace Section */}
      <section id="find-teachers" className="py-12 md:py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Meet Our Educators
        </h2>
        <TeacherMarketplace />
      </section>
    </div>
  );
}
