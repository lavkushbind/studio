
'use client';

import type { TeacherFilters, Teacher } from '@/types/teacher'; // Import Teacher type
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
import { Filter, X, Star, Briefcase, Users } from 'lucide-react';

interface TeacherFilterProps {
  initialFilters: TeacherFilters;
  onFilterChange: (filters: TeacherFilters) => void;
  // Instead of passing subjects/gradeLevels, pass all teachers to derive filter options
  allTeachers: Teacher[];
}

const experienceLevels = [1, 3, 5, 10]; // Min experience years
const ratings = [1, 2, 3, 4]; // Min ratings

export default function TeacherFilter({
  initialFilters,
  onFilterChange,
  allTeachers,
}: TeacherFilterProps) {
  const [filters, setFilters] = useState<TeacherFilters>(initialFilters);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setFilters(initialFilters);
  }, [initialFilters]);

  const uniquePreferredStandards = (): number[] => {
    const allStandards = allTeachers.flatMap(t => t.preferredStandard || []);
    return [...new Set(allStandards)].sort((a, b) => a - b);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof TeacherFilters) => (value: string) => {
    if (value === 'All' || value === '') {
      setFilters((prev) => ({ ...prev, [name]: undefined }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: parseInt(value.replace('+', '')) }));
    }
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const resetFilters = () => {
    const defaultFilters: TeacherFilters = {
      search: '',
      standard: undefined,
      minRating: undefined,
      minExperience: undefined,
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  if (!isClient) {
    return null; // Avoid hydration mismatch
  }

  const availableStandards = uniquePreferredStandards();

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
          <Label htmlFor="search">Search by Name</Label>
          <Input
            id="search"
            name="search"
            placeholder="e.g., Jane Doe"
            value={filters.search || ''}
            onChange={handleInputChange}
          />
        </div>

        {availableStandards.length > 0 && (
          <div className="space-y-1">
            <Label htmlFor="standard" className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" /> Preferred Standard (Grade)
            </Label>
            <Select
              value={filters.standard?.toString() || 'All'}
              onValueChange={handleSelectChange('standard')}
            >
              <SelectTrigger id="standard">
                <SelectValue placeholder="Any Standard" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Standards</SelectItem>
                {availableStandards.map((standard) => (
                  <SelectItem key={standard} value={standard.toString()}>
                    Grade {standard}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="space-y-1">
          <Label htmlFor="minExperience" className="flex items-center">
            <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" /> Minimum Experience
          </Label>
          <Select
            value={filters.minExperience ? `${filters.minExperience}+` : 'All'}
            onValueChange={handleSelectChange('minExperience')}
          >
            <SelectTrigger id="minExperience">
              <SelectValue placeholder="Any Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Any Experience</SelectItem>
              {experienceLevels.map((exp) => (
                <SelectItem key={exp} value={exp.toString()}>
                  {exp}+ Years
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="minRating" className="flex items-center">
             <Star className="mr-2 h-4 w-4 text-muted-foreground" /> Minimum Rating
          </Label>
          <Select
            value={filters.minRating ? `${filters.minRating}+` : 'All'}
            onValueChange={handleSelectChange('minRating')}
          >
            <SelectTrigger id="minRating">
              <SelectValue placeholder="Any Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Any Rating</SelectItem>
              {ratings.map((rating) => (
                <SelectItem key={rating} value={rating.toString()}>
                  {rating}+ Stars
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
