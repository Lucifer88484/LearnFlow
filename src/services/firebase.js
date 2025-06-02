/**
 * Firebase configuration and initialization
 * Provides authentication, Firestore database, and storage services
 */

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Connect to emulators in development mode
// Only attempt to connect to emulators if we're in development and haven't connected yet
let emulatorsConnected = false;

if (import.meta.env.DEV && !emulatorsConnected) {
  try {
    // Check if we should use emulators (optional environment variable)
    const useEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';

    if (useEmulators) {
      // Connect to Auth emulator
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });

      // Connect to Firestore emulator
      connectFirestoreEmulator(db, 'localhost', 8080);

      // Connect to Storage emulator
      connectStorageEmulator(storage, 'localhost', 9199);

      emulatorsConnected = true;
      console.log('🔧 Connected to Firebase emulators');
    } else {
      console.log('🌐 Using production Firebase services');
    }
  } catch (error) {
    // Emulator connection failed - this is expected if emulators aren't running
    console.log('⚠️ Firebase emulators not available, using production services');
    console.log('Error details:', error.message);
  }
} else if (!import.meta.env.DEV) {
  console.log('🚀 Production mode: Using Firebase production services');
}

/**
 * Utility function to check if Firebase services are properly initialized
 * @returns {Object} Status of Firebase services
 */
export const getFirebaseStatus = () => {
  try {
    return {
      app: !!app,
      auth: !!auth,
      firestore: !!db,
      storage: !!storage,
      config: {
        projectId: firebaseConfig.projectId,
        authDomain: firebaseConfig.authDomain,
        hasApiKey: !!firebaseConfig.apiKey,
      },
      environment: import.meta.env.DEV ? 'development' : 'production',
      emulatorsEnabled: emulatorsConnected,
    };
  } catch (error) {
    console.error('Error checking Firebase status:', error);
    return {
      error: error.message,
      app: false,
      auth: false,
      firestore: false,
      storage: false,
    };
  }
};

/**
 * Utility function to validate Firebase configuration
 * @returns {Object} Validation result
 */
export const validateFirebaseConfig = () => {
  const requiredFields = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ];

  const missing = requiredFields.filter(field => !firebaseConfig[field]);
  const isValid = missing.length === 0;

  return {
    isValid,
    missing,
    config: firebaseConfig,
    message: isValid
      ? 'Firebase configuration is valid'
      : `Missing required fields: ${missing.join(', ')}`
  };
};

// Log Firebase initialization status
console.log('🔥 Firebase initialized:', getFirebaseStatus());

// Validate configuration in development
if (import.meta.env.DEV) {
  const validation = validateFirebaseConfig();
  if (!validation.isValid) {
    console.warn('⚠️ Firebase configuration issues:', validation.message);
  }
}

export default app;
