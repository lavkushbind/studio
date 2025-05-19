
import type { Teacher } from '@/types/teacher';

// This sample data is updated to match the new Teacher model.
// It's significantly simpler than the previous version.
export const sampleTeachersData: Teacher[] = [
  {
    id: 'teacher-jane-doe-001',
    name: 'Dr. Jane Doe',
    rating: 4.8,
    experience: 5, // years
    maxStudentsPerSlot: 5,
    availableSlots: ['Mon 09:00-10:00', 'Mon 10:00-11:00', 'Wed 14:00-15:00'],
    preferredStandard: [6, 7, 8], // Prefers grades 6, 7, 8
    currentStudents: {
      'Mon 09:00-10:00': ['studentId1', 'studentId2'],
      'Wed 14:00-15:00': ['studentId3'],
    },
  },
  {
    id: 'teacher-john-smith-002',
    name: 'Mr. John Smith',
    rating: 4.5,
    experience: 10, // years
    maxStudentsPerSlot: 3,
    availableSlots: ['Tue 10:00-11:00', 'Tue 11:00-12:00', 'Thu 15:00-16:00', 'Thu 16:00-17:00'],
    preferredStandard: [9, 10], // Prefers grades 9, 10
    currentStudents: {
      'Tue 10:00-11:00': ['studentId4'],
      'Thu 15:00-16:00': ['studentId5', 'studentId6'],
    },
  },
  {
    id: 'teacher-emily-white-003',
    name: 'Ms. Emily White',
    rating: 4.9,
    experience: 3, // years
    maxStudentsPerSlot: 1, // Focus on 1-on-1
    availableSlots: ['Mon 13:00-14:00', 'Wed 10:00-11:00', 'Fri 09:00-10:00'],
    preferredStandard: [1, 2, 3, 4, 5], // Prefers elementary grades
    currentStudents: {
      'Mon 13:00-14:00': ['studentId7'],
    },
  },
];

// Utility functions to get unique values for filters, adapted for the new model
export const getUniquePreferredStandards = (teachers: Teacher[] = sampleTeachersData): number[] => {
  const allStandards = teachers.flatMap(t => t.preferredStandard || []);
  // Sort numerically
  return [...new Set(allStandards)].sort((a, b) => a - b);
};
