
import type { Teacher } from '@/types/teacher';
import { database } from '@/lib/firebase'; // database can be undefined
import { ref, get, child, DatabaseReference } from 'firebase/database';

/**
 * Fetches all teachers from Firebase Realtime Database.
 * Assumes teachers are stored under a "teachers" node.
 * @returns A promise that resolves to an array of Teacher objects.
 */
export async function getAllTeachers(): Promise<Teacher[]> {
  if (!database) {
    console.error("Firebase Database is not initialized. Cannot fetch teachers. Check Firebase configuration in .env.local and console logs.");
    return [];
  }
  try {
    const dbRef: DatabaseReference = ref(database, 'teachers'); // Provide path directly
    const snapshot = await get(dbRef); // Use dbRef directly
    if (snapshot.exists()) {
      const teachersData = snapshot.val();
      // Convert the object of teachers into an array
      return Object.keys(teachersData).map(key => ({
        id: key,
        ...teachersData[key],
      }));
    } else {
      console.log("No teacher data available in Firebase at the 'teachers' path.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching teachers from Firebase:", error);
    return []; 
  }
}

/**
 * Fetches a single teacher by ID from Firebase Realtime Database.
 * @param id The ID of the teacher to fetch.
 * @returns A promise that resolves to a Teacher object or null if not found.
 */
export async function getTeacherById(id: string): Promise<Teacher | null> {
  if (!database) {
    console.error(`Firebase Database is not initialized. Cannot fetch teacher ${id}. Check Firebase configuration in .env.local and console logs.`);
    return null;
  }
  try {
    const teacherRef: DatabaseReference = ref(database, `teachers/${id}`); // Provide path directly
    const snapshot = await get(teacherRef); // Use teacherRef directly
    if (snapshot.exists()) {
      return { id, ...snapshot.val() } as Teacher;
    } else {
      console.log(`No teacher found with ID: ${id} in Firebase.`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching teacher with ID ${id} from Firebase:`, error);
    return null;
  }
}
