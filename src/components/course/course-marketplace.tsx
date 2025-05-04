'use client';

import type { Course, CourseFilters } from '@/types/course';
import { useState, useEffect, useMemo } from 'react';
import CourseFilter from './course-filter';
import CourseList from './course-list';
import { sampleCourses } from '@/data/sample-courses'; // Using sample data for now
import { Skeleton } from '@/components/ui/skeleton';

export default function CourseMarketplace() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filters, setFilters] = useState<CourseFilters>({
    search: '',
    price: [0, 500], // Default price range
  });
  const [loading, setLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    // In a real app, fetch courses from an API
    setCourses(sampleCourses);
    setFilteredCourses(sampleCourses); // Initially show all courses
    setLoading(false);
  }, []);

  const subjects = useMemo(() => [...new Set(sampleCourses.map(c => c.subject))], []);
  const teachers = useMemo(() => [...new Set(sampleCourses.map(c => c.teacher.name))], []);

  const handleFilterChange = (newFilters: CourseFilters) => {
    setFilters(newFilters);
    setLoading(true); // Show loading state while filtering

    // Simulate filtering delay (remove in real app)
    setTimeout(() => {
        const filtered = courses.filter(course => {
        const searchMatch = newFilters.search
            ? course.title.toLowerCase().includes(newFilters.search.toLowerCase()) ||
            course.description.toLowerCase().includes(newFilters.search.toLowerCase()) ||
            course.teacher.name.toLowerCase().includes(newFilters.search.toLowerCase())
            : true;
        const subjectMatch = newFilters.subject ? course.subject === newFilters.subject : true;
        const teacherMatch = newFilters.teacher ? course.teacher.name === newFilters.teacher : true;
        const ratingMatch = newFilters.rating ? course.rating >= newFilters.rating : true;
        const ageGroupMatch = newFilters.ageGroup ? course.ageGroup === newFilters.ageGroup : true;
        // Ensure price filter uses the first element of the array (max price)
        const priceMatch = newFilters.price ? course.price <= newFilters.price[0] : true;
        const typeMatch = newFilters.type ? course.type === newFilters.type : true;

        return searchMatch && subjectMatch && teacherMatch && ratingMatch && ageGroupMatch && priceMatch && typeMatch;
        });
        setFilteredCourses(filtered);
        setLoading(false); // Hide loading state
    }, 300); // Simulate network/processing time
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="md:col-span-1">
        <CourseFilter
          initialFilters={filters}
          onFilterChange={handleFilterChange}
          subjects={subjects}
          teachers={teachers}
        />
      </div>
      <div className="md:col-span-3">
        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {[...Array(6)].map((_, i) => (
               <CardSkeleton key={i} />
             ))}
           </div>
        ) : (
          <CourseList courses={filteredCourses} />
        )}
      </div>
    </div>
  );
}

// Skeleton component for loading state
function CardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden shadow">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
             <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-12 w-full" />
        <div className="flex justify-between items-center pt-2">
             <Skeleton className="h-6 w-1/4" />
             <Skeleton className="h-8 w-1/3" />
        </div>
      </div>
    </div>
  );
}
