
'use client';

import type { Teacher, TeacherFilters } from '@/types/teacher';
import { useState, useEffect, useMemo } from 'react';
import TeacherFilter from './teacher-filter';
import TeacherList from './teacher-list';
import { getAllTeachers } from '@/services/teacherService';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';

export default function TeacherMarketplace() {
  const [allTeachersData, setAllTeachersData] = useState<Teacher[]>([]);
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
        setAllTeachersData(teachersFromDb);
        setFilteredTeachers(teachersFromDb);
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
        setError("Failed to load teachers. Please ensure your Firebase setup is correct and data is available.");
        setAllTeachersData([]);
        setFilteredTeachers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Filters are now derived from allTeachersData within TeacherFilter component

  const handleFilterChange = (newFilters: TeacherFilters) => {
    setFilters(newFilters);

    const filtered = allTeachersData.filter(teacher => {
      const searchMatch = newFilters.search
        ? teacher.name.toLowerCase().includes(newFilters.search.toLowerCase())
        : true;
      
      const standardMatch = newFilters.standard
        ? teacher.preferredStandard?.includes(newFilters.standard)
        : true;
      
      const experienceMatch = newFilters.minExperience
        ? teacher.experience >= newFilters.minExperience
        : true;
      
      const ratingMatch = newFilters.minRating
        ? teacher.rating >= newFilters.minRating
        : true;
      
      return searchMatch && standardMatch && experienceMatch && ratingMatch;
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
          allTeachers={allTeachersData} // Pass all teachers for filter options
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

// Skeleton component for teacher card loading state - simplified
function TeacherCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm p-4 space-y-3">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2 flex-grow">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-1/3 mt-2" /> {/* For preferred standards label */}
      <div className="flex flex-wrap gap-1">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-28" />
      </div>
       <Skeleton className="h-4 w-1/3 mt-2" /> {/* For available slots label */}
        <div className="flex flex-wrap gap-1">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <div className="pt-2 border-t mt-2">
        <Skeleton className="h-8 w-full" /> {/* For View Profile button */}
      </div>
    </div>
  );
}
