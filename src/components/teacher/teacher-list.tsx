
import type { Teacher } from '@/types/teacher';
import TeacherCard from './teacher-card';

interface TeacherListProps {
  teachers: Teacher[];
}

export default function TeacherList({ teachers }: TeacherListProps) {
  if (teachers.length === 0) {
    return <p className="text-center text-muted-foreground col-span-full py-10">No teachers found matching your criteria. Try adjusting your filters.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  );
}
