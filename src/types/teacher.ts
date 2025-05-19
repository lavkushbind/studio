
export interface TimeSlot {
  time: string; // e.g., "10:00 AM - 11:00 AM", "02:00 PM - 02:30 PM"
  type: 'Demo' | 'Class'; // Indicates if the slot is for a demo or regular class
}

export interface DailyAvailability {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  slots: TimeSlot[];
}

export interface Teacher {
  id: string;
  name: string;
  avatarUrl?: string;
  bioShort?: string; // Short tagline or specialty
  fullBio: string; // Detailed biography
  subjectsTaught: string[]; // e.g., ["Math", "Science", "English"]
  gradeLevelsTaught: string[]; // e.g., ["Grades 1-3", "Grades 4-6", "Middle School (7-8)", "High School (9-10)"]
  experienceYears: number;
  teachingPhilosophy?: string;
  hourlyRate?: number; // For regular classes
  qualifications?: string[]; // e.g., ["M.Ed. in Curriculum", "B.S. in Physics"]
  videoIntroUrl?: string; // Link to a short video introduction

  // Demo class specific details
  demoDetails: {
    offered: boolean;
    duration: string; // e.g., "30 minutes"
    description?: string; // What to expect in the demo
    cost?: number; // 0 for free demo, or a nominal fee
  };

  // Teacher's overall rating and review count
  rating: number;
  reviews: number;

  weeklyAvailability?: DailyAvailability[]; // Added for displaying general weekly slots
}

// Filters for finding teachers
export interface TeacherFilters {
  search?: string; // Search by name, bio, subjects
  subject?: string;
  gradeLevel?: string;
  experienceMin?: number; // Minimum years of experience
  ratingMin?: number; // Minimum rating (e.g., 4 for 4+ stars)
}
