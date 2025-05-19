
import type { Teacher } from '@/types/teacher';

// This sample data is updated to match the new Teacher model.
// It's significantly simpler than the previous version.
// Clearing the sample data as per request to rely on Firebase.
export const sampleTeachersData: Teacher[] = [];

// Removing utility function that relied on sample data.
// export const getUniquePreferredStandards = (teachers: Teacher[] = sampleTeachersData): number[] => {
//   const allStandards = teachers.flatMap(t => t.preferredStandard || []);
//   // Sort numerically
//   return [...new Set(allStandards)].sort((a, b) => a - b);
// };
