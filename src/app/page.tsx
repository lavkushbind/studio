import CourseMarketplace from '@/components/course/course-marketplace';
import AiRecommendations from '@/components/ai/ai-recommendations';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to LearnBase</h1>
      <div className="mb-12">
        <AiRecommendations />
      </div>
      <CourseMarketplace />
    </div>
  );
}
