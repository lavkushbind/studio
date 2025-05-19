
'use client';

import type { Teacher, TeacherFilters } from '@/types/teacher';
import { useState, useEffect, useMemo } from 'react';
import TeacherFilter from './teacher-filter';
import TeacherList from './teacher-list';
import { getAllTeachers } from '@/services/teacherService'; // Import Firebase service
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';


// Helper function to get unique sorted strings from an array of arrays
const getUniqueSortedValues = (teachers: Teacher[], keySelector: (teacher: Teacher) => string[]): string[] => {
  const allValues = teachers.flatMap(keySelector);
  return [...new Set(allValues)].sort();
};


export default function TeacherMarketplace() {
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [filters, setFilters] = useState<TeacherFilters>({
    search: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        setError(null);
        const teachersFromDb = await getAllTeachers();
        setAllTeachers(teachersFromDb);
        setFilteredTeachers(teachersFromDb);
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
        setError("Failed to load teachers. Please ensure your Firebase setup is correct and data is available.");
        // Fallback to empty array or sample data if preferred
        setAllTeachers([]);
        setFilteredTeachers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const subjects = useMemo(() => getUniqueSortedValues(allTeachers, t => t.subjectsTaught || []), [allTeachers]);
  const gradeLevels = useMemo(() => getUniqueSortedValues(allTeachers, t => t.gradeLevelsTaught || []), [allTeachers]);

  const handleFilterChange = (newFilters: TeacherFilters) => {
    setFilters(newFilters);
    // No need to set loading true here as filtering is synchronous on client-side data
    // If filtering were async, then setLoading(true) would be appropriate

    const filtered = allTeachers.filter(teacher => {
      const searchMatch = newFilters.search
        ? teacher.name.toLowerCase().includes(newFilters.search.toLowerCase()) ||
          teacher.bioShort?.toLowerCase().includes(newFilters.search.toLowerCase()) ||
          (teacher.fullBio && teacher.fullBio.toLowerCase().includes(newFilters.search.toLowerCase())) ||
          (teacher.subjectsTaught && teacher.subjectsTaught.some(s => s.toLowerCase().includes(newFilters.search!.toLowerCase())))
        : true;
      const subjectMatch = newFilters.subject ? (teacher.subjectsTaught && teacher.subjectsTaught.includes(newFilters.subject)) : true;
      const gradeLevelMatch = newFilters.gradeLevel ? (teacher.gradeLevelsTaught && teacher.gradeLevelsTaught.includes(newFilters.gradeLevel)) : true;
      const experienceMatch = newFilters.experienceMin ? teacher.experienceYears >= newFilters.experienceMin : true;
      const ratingMatch = newFilters.ratingMin ? teacher.rating >= newFilters.ratingMin : true;
      
      return searchMatch && subjectMatch && gradeLevelMatch && experienceMatch && ratingMatch;
    });
    setFilteredTeachers(filtered);
  };

  if (error) {
    return (
      <Alert variant="destructive" className="my-8">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error Loading Teachers</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="md:col-span-1">
        <TeacherFilter
          initialFilters={filters}
          onFilterChange={handleFilterChange}
          subjects={subjects}
          gradeLevels={gradeLevels}
        />
      </div>
      <div className="md:col-span-3">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <TeacherCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <TeacherList teachers={filteredTeachers} />
        )}
      </div>
    </div>
  );
}

// Skeleton component for teacher card loading state
function TeacherCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm p-4 space-y-3">
      <div className="flex items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2 flex-grow">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
      <Skeleton className="h-4 w-1/3" />
      <div className="flex flex-wrap gap-1">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
      <Skeleton className="h-4 w-1/3" />
       <div className="flex flex-wrap gap-1">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-28" />
      </div>
       <Skeleton className="h-5 w-1/2" />
      <div className="flex justify-between items-center pt-2 border-t mt-2">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-8 w-1/3" />
      </div>
    </div>
  );
}
