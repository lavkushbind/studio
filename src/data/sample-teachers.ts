
import type { Teacher } from '@/types/teacher';

export const sampleTeachersData: Teacher[] = [
  {
    id: 'teacher-alice-001',
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
    hourlyRate: 55,
    qualifications: ['PhD in Applied Mathematics', 'Certified Math Teacher (Grades 6-12)'],
    videoIntroUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Placeholder video
    demoDetails: {
      offered: true,
      duration: '30 minutes',
      description: 'A get-to-know-you session, discuss learning goals, and tackle a sample problem together. See if my teaching style is a good fit!',
      cost: 0, // Free demo
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
    hourlyRate: 45,
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
  {
    id: 'teacher-carla-003',
    name: 'Ms. Carla Rodriguez',
    avatarUrl: 'https://i.pravatar.cc/150?u=carla-rodriguez',
    bioShort: 'Passionate Coding & Robotics Mentor (All Ages)',
    fullBio:
      "Carla is a software engineer with a passion for STEM education. With 10 years in the tech industry and 4 years teaching coding bootcamps and workshops, she enjoys demystifying technology for learners of all ages. Carla specializes in Python, Scratch, and introductory robotics. She believes in project-based learning, allowing students to build tangible creations from their first lesson. Her approach is patient and encouraging, focused on building confidence and fostering problem-solving abilities. Carla is dedicated to preparing students for a tech-driven future by making coding accessible and enjoyable.",
    subjectsTaught: ['Coding (Scratch, Python)', 'Robotics', 'Computer Science Principles'],
    gradeLevelsTaught: ['Elementary (Grades 3-5)', 'Middle School (6-8)', 'High School (9-10+)'],
    experienceYears: 4, // Teaching experience, more in industry
    teachingPhilosophy:
      'Empowering students to become creators with technology through hands-on projects and real-world applications.',
    hourlyRate: 60,
    qualifications: ['B.S. in Computer Science', 'Professional Software Developer'],
    demoDetails: {
      offered: true,
      duration: '40 minutes',
      description: 'Introduction to a simple coding concept (e.g., Scratch block or Python basics), a mini-challenge, and Q&A about coding pathways.',
      cost: 5,
    },
    rating: 4.8,
    reviews: 95,
    weeklyAvailability: [
      { day: 'Monday', slots: [{ time: '05:00 PM - 05:40 PM', type: 'Demo' }] },
      { day: 'Wednesday', slots: [{ time: '06:00 PM - 07:00 PM', type: 'Class' }, { time: '07:00 PM - 07:40 PM', type: 'Demo' }] },
      { day: 'Saturday', slots: [{ time: '10:00 AM - 11:00 AM', type: 'Class' }, {time: '11:00 AM - 11:40 AM', type: 'Demo'}] },
    ],
  },
  {
    id: 'teacher-david-004',
    name: 'Dr. David Lee',
    avatarUrl: 'https://i.pravatar.cc/150?u=david-lee',
    bioShort: 'Expert Biology & Environmental Science Educator (Grades 7-10)',
    fullBio:
      "David is a dedicated biologist with a PhD in Ecology and Evolutionary Biology. He has over 7 years of experience teaching high school and early college-level biology and environmental science. David is passionate about connecting classroom learning to real-world environmental issues and conservation. His teaching style incorporates virtual labs, case studies, and discussions to promote critical thinking and scientific literacy. He strives to make science relevant and engaging, encouraging students to explore the natural world and understand their role within it.",
    subjectsTaught: ['Biology', 'Environmental Science', 'Earth Science'],
    gradeLevelsTaught: ['Middle School (7-8)', 'High School (9-10)'],
    experienceYears: 7,
    teachingPhilosophy:
      'Fostering a deep understanding and appreciation for the natural world through inquiry-based learning and real-world connections.',
    hourlyRate: 50,
    qualifications: ['PhD in Ecology', 'High School Science Teaching Credential'],
    videoIntroUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    demoDetails: {
      offered: true,
      duration: '30 minutes',
      description: "Discuss your student's interest in science, explore a fascinating biological concept, and outline how we can achieve their learning goals.",
      cost: 0,
    },
    rating: 4.9,
    reviews: 110,
    weeklyAvailability: [
      { day: 'Tuesday', slots: [{ time: '03:00 PM - 03:30 PM', type: 'Demo' }, { time: '05:00 PM - 06:00 PM', type: 'Class' }] },
      { day: 'Thursday', slots: [{ time: '03:00 PM - 03:30 PM', type: 'Demo' }] },
      { day: 'Sunday', slots: [{ time: '01:00 PM - 02:00 PM', type: 'Class' }] },
    ],
  },
];

// Utility to get unique values for filters
export const getUniqueSubjects = () => {
  const allSubjects = sampleTeachersData.flatMap(t => t.subjectsTaught);
  return [...new Set(allSubjects)].sort();
}

export const getUniqueGradeLevels = () => {
  const allGradeLevels = sampleTeachersData.flatMap(t => t.gradeLevelsTaught);
  return [...new Set(allGradeLevels)].sort();
}
