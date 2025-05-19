
'use client';

import type { TeacherFilters } from '@/types/teacher';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, X, Star, Briefcase } from 'lucide-react'; // Added Star and Briefcase

interface TeacherFilterProps {
  initialFilters: TeacherFilters;
  onFilterChange: (filters: TeacherFilters) => void;
  subjects: string[];
  gradeLevels: string[];
}

const experienceLevels = ['All', '1+', '3+', '5+', '10+'];
const ratings = ['All', '4+', '3+', '2+'];

export default function TeacherFilter({
  initialFilters,
  onFilterChange,
  subjects,
  gradeLevels,
}: TeacherFilterProps) {
  const [filters, setFilters] = useState<TeacherFilters>(initialFilters);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof TeacherFilters) => (value: string) => {
    if (value === 'All') {
      setFilters((prev) => ({ ...prev, [name]: undefined }));
    } else if (name === 'ratingMin' || name === 'experienceMin') {
      setFilters((prev) => ({ ...prev, [name]: parseInt(value.replace('+', '')) }));
    }
    else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const resetFilters = () => {
    const defaultFilters: TeacherFilters = {
      search: '',
      subject: undefined,
      gradeLevel: undefined,
      experienceMin: undefined,
      ratingMin: undefined,
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  if (!isClient) {
    return null; // Avoid hydration mismatch
  }

  return (
    <Card className="sticky top-4 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          Filter Teachers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="search">Search by Name or Subject</Label>
          <Input
            id="search"
            name="search"
            placeholder="e.g., Alice, Math, History"
            value={filters.search || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="subject">Subject</Label>
          <Select
            value={filters.subject || 'All'}
            onValueChange={handleSelectChange('subject')}
          >
            <SelectTrigger id="subject">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="gradeLevel">Grade Level</Label>
          <Select
            value={filters.gradeLevel || 'All'}
            onValueChange={handleSelectChange('gradeLevel')}
          >
            <SelectTrigger id="gradeLevel">
              <SelectValue placeholder="Select Grade Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Grade Levels</SelectItem>
              {gradeLevels.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="experienceMin" className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" /> Minimum Experience
          </Label>
          <Select
            value={filters.experienceMin ? `${filters.experienceMin}+` : 'All'}
            onValueChange={handleSelectChange('experienceMin')}
          >
            <SelectTrigger id="experienceMin">
              <SelectValue placeholder="Any Experience" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((exp) => (
                <SelectItem key={exp} value={exp}>
                  {exp === 'All' ? 'Any Experience' : `${exp} Years`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="ratingMin" className="flex items-center">
             <Star className="mr-2 h-4 w-4 text-muted-foreground" /> Minimum Rating
          </Label>
          <Select
            value={filters.ratingMin ? `${filters.ratingMin}+` : 'All'}
            onValueChange={handleSelectChange('ratingMin')}
          >
            <SelectTrigger id="ratingMin">
              <SelectValue placeholder="Any Rating" />
            </SelectTrigger>
            <SelectContent>
              {ratings.map((rating) => (
                <SelectItem key={rating} value={rating}>
                  {rating === 'All' ? 'Any Rating' : `${rating} Stars & Up`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={applyFilters} className="flex-1">Apply Filters</Button>
          <Button variant="outline" onClick={resetFilters} className="flex-shrink-0" aria-label="Reset Filters">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
