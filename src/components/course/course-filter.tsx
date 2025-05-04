'use client';

import type { CourseFilters } from '@/types/course';
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
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, X } from 'lucide-react';

interface CourseFilterProps {
  initialFilters: CourseFilters;
  onFilterChange: (filters: CourseFilters) => void;
  subjects: string[];
  teachers: string[];
}

const ageGroups = ['All', '3-5', '6-8', '9-12', '13-15', '16+'];
const ratings = ['All', '4+', '3+', '2+', '1+'];

export default function CourseFilter({
  initialFilters,
  onFilterChange,
  subjects,
  teachers,
}: CourseFilterProps) {
  const [filters, setFilters] = useState<CourseFilters>(initialFilters);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setFilters(initialFilters); // Ensure filters sync with parent state on mount/reset
  }, [initialFilters]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof CourseFilters) => (value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value === 'All' ? undefined : value }));
  };

 const handleSliderChange = (name: keyof CourseFilters) => (value: number[]) => {
    // Ensure value is always treated as an array, even if slider returns a single number initially
    const sliderValue = Array.isArray(value) ? value[0] : value;
    setFilters(prev => ({ ...prev, [name]: sliderValue }));
};


  const handleRadioChange = (name: keyof CourseFilters) => (value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value === 'all' ? undefined : value as 'live' | 'recorded' }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const resetFilters = () => {
     const defaultFilters: CourseFilters = {
        search: '',
        subject: undefined,
        teacher: undefined,
        rating: undefined,
        ageGroup: undefined,
        price: [0, 500], // Reset price slider to full range
        type: undefined,
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters); // Notify parent about reset
  };


  if (!isClient) {
    // Render nothing or a placeholder on the server to avoid hydration mismatch
    return null;
  }


  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Courses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search">Search by Keyword</Label>
          <Input
            id="search"
            name="search"
            placeholder="e.g., Python, History"
            value={filters.search || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
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

        <div className="space-y-2">
          <Label htmlFor="teacher">Teacher</Label>
          <Select
            value={filters.teacher || 'All'}
            onValueChange={handleSelectChange('teacher')}
          >
            <SelectTrigger id="teacher">
              <SelectValue placeholder="Select Teacher" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Teachers</SelectItem>
              {teachers.map((teacher) => (
                <SelectItem key={teacher} value={teacher}>
                  {teacher}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Minimum Rating</Label>
          <Select
            value={filters.rating ? `${filters.rating}+` : 'All'}
            onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value === 'All' ? undefined : parseInt(value.charAt(0)) }))}
          >
            <SelectTrigger id="rating">
              <SelectValue placeholder="Select Rating" />
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

        <div className="space-y-2">
          <Label htmlFor="ageGroup">Age Group</Label>
          <Select
            value={filters.ageGroup || 'All'}
            onValueChange={handleSelectChange('ageGroup')}
          >
            <SelectTrigger id="ageGroup">
              <SelectValue placeholder="Select Age Group" />
            </SelectTrigger>
            <SelectContent>
              {ageGroups.map((age) => (
                <SelectItem key={age} value={age}>
                  {age}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Max Price: ${filters.price?.[0] ?? 500}</Label>
           <Slider
              id="price"
              name="price"
              min={0}
              max={500}
              step={10}
              defaultValue={[filters.price?.[0] ?? 500]} // Use defaultValue for initial render
              value={filters.price ? [filters.price[0]] : [500]} // Controlled value
              onValueChange={handleSliderChange('price')} // Update state on change
              className="my-4"
            />
        </div>

        <div className="space-y-2">
          <Label>Course Type</Label>
          <RadioGroup
            defaultValue={filters.type || 'all'}
            value={filters.type || 'all'}
            onValueChange={handleRadioChange('type')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="type-all" />
              <Label htmlFor="type-all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="live" id="type-live" />
              <Label htmlFor="type-live">Live</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="recorded" id="type-recorded" />
              <Label htmlFor="type-recorded">Recorded</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={applyFilters} className="flex-1">Apply Filters</Button>
          <Button variant="outline" onClick={resetFilters} className="flex-shrink-0" aria-label="Reset Filters">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
