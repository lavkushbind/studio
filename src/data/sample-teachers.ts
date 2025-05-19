
import type { Teacher } from '@/types/teacher';

// This sample data can be used for initial testing or as a fallback.
// For production, you should populate your Firebase Realtime Database.
export const sampleTeachersData: Teacher[] = [
  {
    id: 'teacher-alice-001', // In Firebase, this would be the key
    name: 'Dr. Alice Meridian',
    avatarUrl: 'https://i.pravatar.cc/150?u=alice-meridian',
    bioShort: 'Engaging Math & Science Tutor (Grades 6-10)',
    fullBio:
      "Alice holds a PhD in Applied Mathematics and has a passion for making complex subjects understandable and exciting. With over 8 years of experience tutoring middle and high school students, she excels at building strong foundational knowledge and problem-solving skills. Alice believes in a student-centered approach, tailoring her teaching methods to individual learning styles. She creates a supportive and interactive learning environment where students feel comfortable asking questions and exploring new concepts. Her goal is to not just teach, but to inspire a lifelong love for learning.",
    subjectsTaught: ['Mathematics', 'Physics', 'Chemistry'],
    gradeLevelsTaught: ['Middle School (6-8)', 'High School (9-10)'],
    experienceYears: 8,
    teachingPhilosophy:
      'To make learning an adventure, fostering curiosity and critical thinking through interactive and personalized lessons.',
    monthlyFee: 4500,
    qualifications: ['PhD in Applied Mathematics', 'Certified Math Teacher (Grades 6-12)'],
    videoIntroUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    demoDetails: {
      offered: true,
      duration: '30 minutes',
      description: 'A get-to-know-you session, discuss learning goals, and tackle a sample problem together. See if my teaching style is a good fit!',
      cost: 0,
    },
    rating: 4.9,
    reviews: 120,
    weeklyAvailability: [
      { day: 'Monday', slots: [{ time: '02:00 PM - 02:30 PM', type: 'Demo' }, { time: '04:00 PM - 05:00 PM', type: 'Class' }] },
      { day: 'Wednesday', slots: [{ time: '10:00 AM - 10:30 AM', type: 'Demo' }, { time: '03:00 PM - 04:00 PM', type: 'Class' }] },
      { day: 'Friday', slots: [{ time: '01:00 PM - 01:30 PM', type: 'Demo' }] },
    ],
  },
  {
    id: 'teacher-bob-002',
    name: 'Mr. Bob Roberts',
    avatarUrl: 'https://i.pravatar.cc/150?u=bob-roberts',
    bioShort: 'Creative English & History Explorer (Grades 1-5)',
    fullBio:
      "Bob is an enthusiastic educator with a Master's in Elementary Education and a deep love for storytelling and history. He has 5 years of experience teaching primary grades, focusing on developing strong literacy skills and a curiosity for the past. Bob uses creative writing prompts, historical narratives, and interactive activities to make learning fun and memorable. He is skilled at differentiating instruction to meet the needs of diverse learners and champions a classroom environment built on respect and collaboration. Bob aims to empower young students to become confident communicators and curious historians.",
    subjectsTaught: ['English Language Arts', 'History', 'Social Studies'],
    gradeLevelsTaught: ['Elementary (Grades 1-3)', 'Elementary (Grades 4-5)'],
    experienceYears: 5,
    teachingPhilosophy:
      'Sparking imagination and a love for reading and history through engaging stories and hands-on activities.',
    monthlyFee: 3500,
    qualifications: ["Master's in Elementary Education", 'Reading Specialist Certificate'],
    demoDetails: {
      offered: true,
      duration: '20 minutes',
      description: 'A fun introductory chat, a short storytelling or reading activity, and a chance for parents and students to ask questions.',
      cost: 0,
    },
    rating: 4.7,
    reviews: 85,
    weeklyAvailability: [
      { day: 'Tuesday', slots: [{ time: '09:00 AM - 09:30 AM', type: 'Demo' }, { time: '11:00 AM - 12:00 PM', type: 'Class' }] },
      { day: 'Thursday', slots: [{ time: '01:00 PM - 01:30 PM', type: 'Demo' }, { time: '02:00 PM - 03:00 PM', type: 'Class' }] },
    ],
  },
  // Add more sample teachers if needed for testing
];

// These utility functions are no longer strictly needed here if TeacherMarketplace
// derives them directly from fetched data. Keeping them for reference or if
// sample data is used as a fallback.
export const getUniqueSubjects = (teachers: Teacher[] = sampleTeachersData) => {
  const allSubjects = teachers.flatMap(t => t.subjectsTaught || []);
  return [...new Set(allSubjects)].sort();
}

export const getUniqueGradeLevels = (teachers: Teacher[] = sampleTeachersData) => {
  const allGradeLevels = teachers.flatMap(t => t.gradeLevelsTaught || []);
  return [...new Set(allGradeLevels)].sort();
}
