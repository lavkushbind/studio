export interface Teacher {
  id: string;
  name: string;
  avatarUrl?: string;
  bioShort?: string;
  // Add more teacher details as needed
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  ageGroup: string; // e.g., "6-8", "9-12", "13+"
  description: string;
  shortDescription?: string; // Optional shorter description for cards
  videoIntroUrl?: string;
  schedule?: string; // Could be more structured, e.g., { days: [], time: "" }
  price: number;
  type: 'live' | 'recorded'; // Type of course
  duration: string; // e.g., "4 Weeks", "60 Minutes"
  teacher: Teacher;
  rating: number; // Average rating (e.g., 4.5)
  reviews: number; // Number of reviews
  imageUrl?: string; // Optional specific image URL
  learningObjectives?: string[]; // List of what students will learn
  // Add other relevant fields like prerequisites, materials needed, etc.
}

export interface CourseFilters {
  search?: string;
  subject?: string;
  teacher?: string;
  rating?: number; // Minimum rating
  ageGroup?: string;
  price?: number[]; // slider returns array like [100] for max price 100.
  type?: 'live' | 'recorded';
}
