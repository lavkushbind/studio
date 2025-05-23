import type { Course } from '@/types/course';

export const sampleTeachers = [
  {
    id: 't1',
    name: 'Alice Wonderland',
    bioShort: 'Creative Coding Expert',
    fullBio: 'Alice has over 10 years of experience in making coding fun and accessible for all ages. She believes in learning by doing and incorporates many hands-on projects in her courses. Her expertise lies in Python, game development, and creative applications of technology.'
  },
  {
    id: 't2',
    name: 'Bob The Builder',
    bioShort: 'History Buff & Storyteller',
    fullBio: "Bob is a passionate historian with a Master's degree in Modern History. He specializes in 20th-century global conflicts and societal changes. Bob's teaching style is engaging and narrative-driven, bringing historical events to life through vivid storytelling and primary source exploration."
  },
  {
    id: 't3',
    name: 'Charlie Chaplin',
    bioShort: 'Physics & Astronomy Guru',
    fullBio: "Charlie, a PhD in Astrophysics, has a knack for explaining complex scientific concepts in an understandable way. He has worked on several space exploration projects and loves to share his passion for the cosmos with young learners. His courses are filled with amazing visuals and interactive simulations."
  },
  {
    id: 't4',
    name: 'Diana Prince',
    bioShort: 'Art & Design Enthusiast',
    fullBio: "Diana is a professional artist and designer with over 15 years of experience in both traditional and digital media. She holds an MFA in Fine Arts and has exhibited her work internationally. Diana is dedicated to helping students unlock their creative potential and develop their unique artistic voice."
  },
];

export const sampleCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Introduction to Python Programming',
    subject: 'Coding',
    ageGroup: '13-15',
    description: 'Learn the fundamentals of Python, one of the most popular programming languages. We will cover variables, loops, functions, and build a simple game. No prior coding experience needed!',
    shortDescription: 'Master Python basics and build your first game.',
    schedule: 'Mon & Wed, 4 PM - 5 PM EST',
    price: 120,
    type: 'live',
    duration: '4 Weeks',
    teacher: sampleTeachers[0],
    rating: 4.8,
    reviews: 150,
    learningObjectives: [
        "Understand basic programming concepts.",
        "Write simple Python scripts.",
        "Use loops and conditional statements.",
        "Define and call functions.",
        "Create a text-based adventure game."
    ],
  },
  {
    id: 'course-2',
    title: 'World War II History Deep Dive',
    subject: 'History',
    ageGroup: '16+',
    description: 'Explore the major events, figures, and consequences of World War II. This recorded course includes lectures, primary source analysis, and quizzes.',
    shortDescription: 'In-depth analysis of World War II events and impacts.',
    price: 75,
    type: 'recorded',
    duration: '8 Hours Content',
    teacher: sampleTeachers[1],
    rating: 4.5,
    reviews: 85,
    learningObjectives: [
        "Identify key causes and triggers of WWII.",
        "Analyze major battles and turning points.",
        "Understand the impact of the war on global politics.",
        "Evaluate primary source documents from the era.",
    ],
  },
  {
    id: 'course-3',
    title: 'Mysteries of the Universe: Astronomy for Kids',
    subject: 'Science',
    ageGroup: '9-12',
    description: 'Blast off into space! Learn about planets, stars, galaxies, black holes, and more in this exciting live class with interactive activities and virtual telescope sessions.',
    shortDescription: 'Explore planets, stars, and galaxies interactively.',
    schedule: 'Tuesdays, 6 PM - 7 PM PST',
    price: 90,
    type: 'live',
    duration: '6 Weeks',
    teacher: sampleTeachers[2],
    rating: 4.9,
    reviews: 210,
     learningObjectives: [
        "Name the planets in our solar system and their key features.",
        "Describe the life cycle of a star.",
        "Explain what galaxies and black holes are.",
        "Use virtual tools to observe celestial objects.",
    ],
  },
  {
    id: 'course-4',
    title: 'Digital Art Fundamentals with Procreate',
    subject: 'Art',
    ageGroup: '13+',
    description: 'Unleash your creativity! Learn the basics of digital painting and illustration using the Procreate app on iPad. Covers layers, brushes, color theory, and creating your own characters.',
    shortDescription: 'Learn digital painting basics using Procreate.',
    price: 150,
    type: 'recorded',
    duration: '10 Hours Content',
    teacher: sampleTeachers[3],
    rating: 4.7,
    reviews: 120,
    learningObjectives: [
        "Navigate the Procreate interface confidently.",
        "Utilize layers and blending modes effectively.",
        "Apply basic color theory principles.",
        "Create simple character illustrations.",
        "Experiment with different brushes and textures."
    ],
  },
  {
    id: 'course-5',
    title: 'Creative Writing Workshop: Fantasy Worlds',
    subject: 'Writing',
    ageGroup: '12-15',
    description: 'Build your own fantasy world! This live workshop focuses on world-building, character creation, plot development, and writing compelling fantasy stories. Share your work and get feedback.',
    shortDescription: 'Craft fantasy worlds, characters, and stories.',
    schedule: 'Thursdays, 5 PM - 6:30 PM CST',
    price: 110,
    type: 'live',
    duration: '5 Weeks',
    teacher: sampleTeachers[0], // Alice also teaches writing
    rating: 4.6,
    reviews: 95,
     learningObjectives: [
        "Develop unique and believable fantasy settings.",
        "Create compelling characters with clear motivations.",
        "Outline and structure a fantasy plot.",
        "Write engaging descriptive passages.",
        "Provide and receive constructive feedback."
    ],
  },
  {
    id: 'course-6',
    title: 'Introduction to Web Development (HTML & CSS)',
    subject: 'Coding',
    ageGroup: '16+',
    description: 'Learn the building blocks of the web! This recorded course teaches you how to structure web pages with HTML and style them with CSS. Build your first personal website.',
    shortDescription: 'Build websites using HTML and CSS fundamentals.',
    price: 60,
    type: 'recorded',
    duration: '6 Hours Content',
    teacher: sampleTeachers[1], // Bob also teaches web dev
    rating: 4.4,
    reviews: 70,
    learningObjectives: [
        "Understand the structure of an HTML document.",
        "Use common HTML tags for text, images, and links.",
        "Apply CSS rules to style web page elements.",
        "Understand basic layout techniques (Flexbox/Grid).",
        "Create and deploy a simple multi-page website."
    ],
  },
    {
    id: 'course-7',
    title: 'Beginner Spanish Conversation Club',
    subject: 'Language',
    ageGroup: '9-12',
    description: '¡Hola! Practice basic Spanish conversation skills in a fun, interactive group setting. Learn greetings, common phrases, and talk about hobbies and family.',
    shortDescription: 'Practice basic Spanish conversation.',
    schedule: 'Fridays, 3 PM - 3:45 PM EST',
    price: 80,
    type: 'live',
    duration: '8 Weeks',
    teacher: sampleTeachers[3], // Diana teaches Spanish
    rating: 4.7,
    reviews: 115,
     learningObjectives: [
        "Use basic Spanish greetings and introductions.",
        "Ask and answer simple questions.",
        "Talk about likes, dislikes, and hobbies.",
        "Describe family members.",
    ],
  },
  {
    id: 'course-8',
    title: 'Physics Fun: Simple Machines & Forces',
    subject: 'Science',
    ageGroup: '6-8',
    description: 'Discover the world of physics through hands-on experiments! Explore levers, pulleys, inclined planes, and learn about forces like gravity and friction.',
    shortDescription: 'Explore simple machines and forces with experiments.',
    schedule: 'Wednesdays, 10 AM - 11 AM PST',
    price: 95,
    type: 'live',
    duration: '6 Weeks',
    teacher: sampleTeachers[2],
    rating: 4.9,
    reviews: 180,
    learningObjectives: [
        "Identify different types of simple machines.",
        "Explain how simple machines make work easier.",
        "Describe the concepts of force, gravity, and friction.",
        "Conduct simple physics experiments safely.",
    ],
  },
];
