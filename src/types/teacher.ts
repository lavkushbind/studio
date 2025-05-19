
export interface Teacher {
  id: string;
  name: string;
  rating: number; // e.g., 4.5
  experience: number; // Years of experience
  maxStudentsPerSlot: number;
  availableSlots: string[]; // e.g., ["Mon 9-10 AM", "Wed 3-4 PM"]
  preferredStandard: number[]; // e.g., [6, 7, 8] for grades 6, 7, 8
  currentStudents: Record<string, string[]>; // Key: timeslot string, Value: array of student IDs
  // Removed: avatarUrl, bioShort, fullBio, subjectsTaught (as string array),
  // gradeLevelsTaught (as string array), teachingPhilosophy, monthlyFee,
  // qualifications, videoIntroUrl, demoDetails, weeklyAvailability (old format), reviews count.
}

// Filters for finding teachers - simplified for the new model
export interface TeacherFilters {
  search?: string; // Search by name
  standard?: number; // Filter by a specific standard/grade
  minRating?: number; // Filter by minimum rating
  minExperience?: number; // Filter by minimum experience years
}

// The following types were related to the old, more detailed model and are kept for reference
// or if other parts of the app still use them, but they are not the primary Teacher model anymore.
export interface OldTimeSlot {
  time: string;
  type: 'Demo' | 'Class';
}

export interface OldDailyAvailability {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  slots: OldTimeSlot[];
}
