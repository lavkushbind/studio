
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';

const {
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
} = process.env;

let app: FirebaseApp | undefined = undefined;
let database: Database | undefined = undefined;

const isLikelyPlaceholder = (value: string | undefined, prefix = 'YOUR_') => !value || value.trim() === '' || value.startsWith(prefix);
const isValidHttpUrl = (value: string | undefined) => value && value.startsWith('https://');

const criticalConfigError = (varName: string, currentValue: string | undefined, expectedFormat: string) => {
  console.error(
    '--------------------------------------------------------------------------------------------------\n' +
    `FIREBASE CONFIGURATION ERROR: \`${varName}\` is missing, a placeholder, or invalid.\n` +
    `Current value: "${currentValue}"\n` +
    `Expected format: ${expectedFormat}\n` +
    'Please check your `.env.local` file and ensure this variable is set correctly.\n' +
    'Firebase will NOT be initialized correctly.\n' +
    '--------------------------------------------------------------------------------------------------'
  );
};

let canInitialize = true;

if (isLikelyPlaceholder(NEXT_PUBLIC_FIREBASE_API_KEY)) {
  criticalConfigError('NEXT_PUBLIC_FIREBASE_API_KEY', NEXT_PUBLIC_FIREBASE_API_KEY, 'Your Firebase API Key');
  canInitialize = false;
}
if (isLikelyPlaceholder(NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)) {
  criticalConfigError('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, '<YOUR-PROJECT-ID>.firebaseapp.com');
  canInitialize = false;
}
if (isLikelyPlaceholder(NEXT_PUBLIC_FIREBASE_PROJECT_ID)) {
  criticalConfigError('NEXT_PUBLIC_FIREBASE_PROJECT_ID', NEXT_PUBLIC_FIREBASE_PROJECT_ID, 'Your Firebase Project ID');
  canInitialize = false;
}

if (isLikelyPlaceholder(NEXT_PUBLIC_FIREBASE_DATABASE_URL) || !isValidHttpUrl(NEXT_PUBLIC_FIREBASE_DATABASE_URL) || !(NEXT_PUBLIC_FIREBASE_DATABASE_URL?.includes('.firebaseio.com') || NEXT_PUBLIC_FIREBASE_DATABASE_URL?.includes('.firebasedatabase.app'))) {
  criticalConfigError('NEXT_PUBLIC_FIREBASE_DATABASE_URL', NEXT_PUBLIC_FIREBASE_DATABASE_URL, 'https://<YOUR-PROJECT-ID>.firebaseio.com or https://<YOUR-PROJECT-ID>-default-rtdb.<REGION>.firebasedatabase.app');
  canInitialize = false;
}

if (canInitialize) {
  const firebaseConfig = {
    apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (e: any) {
      console.error('FIREBASE FATAL ERROR: Firebase app initialization failed.');
      console.error('Error message:', e.message);
      console.error(
        'This usually means your Firebase configuration in .env.local has issues (e.g., incorrect API key, auth domain, or project ID). ' +
        'Please double-check all NEXT_PUBLIC_FIREBASE_* variables.'
      );
      app = undefined; // Ensure app is undefined if init fails
    }
  } else {
    app = getApps()[0];
  }

  if (app) {
    try {
      database = getDatabase(app);
    } catch (e: any) {
      console.error('FIREBASE FATAL ERROR: Failed to get Firebase Database instance.');
      console.error('Error message:', e.message);
      console.error(
        'This typically occurs if the `databaseURL` in your Firebase config (check NEXT_PUBLIC_FIREBASE_DATABASE_URL in .env.local) is incorrect, ' +
        'or if the Realtime Database has not been created/enabled in your Firebase project console for the correct region.'
      );
      database = undefined; // Ensure database is undefined if getDatabase fails
    }
  }
} else {
   console.error('Firebase initialization skipped due to configuration errors. Please check previous error messages.');
}

if (!app) {
  console.warn(
    'Firebase app instance is not available. Most Firebase-dependent features will not work. ' +
    'Check console for configuration errors related to .env.local.'
  );
}
if (!database && app) { // Only warn about database if app was at least attempted/exists
  console.warn(
    'Firebase Realtime Database is not available, but the app instance might be. ' +
    'Database-specific features will not work. Check console for database-related configuration errors.'
  );
}


export { app, database };
