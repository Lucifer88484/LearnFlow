/**
 * Firebase Configuration Test Utility
 * Use this to verify Firebase is properly configured and working
 */

import { getFirebaseStatus, validateFirebaseConfig } from '../services/firebase';

/**
 * Test Firebase configuration and services
 * @returns {Promise<Object>} Test results
 */
export const testFirebaseConfiguration = async () => {
  console.log('🧪 Testing Firebase Configuration...');
  
  const results = {
    timestamp: new Date().toISOString(),
    tests: [],
    overall: 'pending'
  };

  try {
    // Test 1: Configuration Validation
    console.log('1️⃣ Testing configuration validation...');
    const configValidation = validateFirebaseConfig();
    results.tests.push({
      name: 'Configuration Validation',
      status: configValidation.isValid ? 'pass' : 'fail',
      message: configValidation.message,
      details: configValidation.missing
    });

    // Test 2: Service Initialization
    console.log('2️⃣ Testing service initialization...');
    const firebaseStatus = getFirebaseStatus();
    const servicesWorking = firebaseStatus.app && firebaseStatus.auth && firebaseStatus.firestore;
    results.tests.push({
      name: 'Service Initialization',
      status: servicesWorking ? 'pass' : 'fail',
      message: servicesWorking ? 'All Firebase services initialized' : 'Some services failed to initialize',
      details: firebaseStatus
    });

    // Test 3: Environment Check
    console.log('3️⃣ Testing environment configuration...');
    const envVars = {
      hasApiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
      hasAuthDomain: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      hasProjectId: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
      hasStorageBucket: !!import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      hasMessagingSenderId: !!import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      hasAppId: !!import.meta.env.VITE_FIREBASE_APP_ID,
    };
    
    const envComplete = Object.values(envVars).every(Boolean);
    results.tests.push({
      name: 'Environment Variables',
      status: envComplete ? 'pass' : 'fail',
      message: envComplete ? 'All environment variables present' : 'Missing environment variables',
      details: envVars
    });

    // Test 4: Demo vs Production Check
    console.log('4️⃣ Testing configuration type...');
    const isDemoConfig = import.meta.env.VITE_FIREBASE_API_KEY === 'demo_api_key';
    results.tests.push({
      name: 'Configuration Type',
      status: 'info',
      message: isDemoConfig ? 'Using demo configuration' : 'Using custom configuration',
      details: {
        isDemoConfig,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        environment: import.meta.env.DEV ? 'development' : 'production'
      }
    });

    // Determine overall status
    const failedTests = results.tests.filter(test => test.status === 'fail');
    results.overall = failedTests.length === 0 ? 'pass' : 'fail';

    // Log results
    console.log('📊 Firebase Test Results:', results);
    
    if (results.overall === 'pass') {
      console.log('✅ All Firebase tests passed!');
    } else {
      console.log('❌ Some Firebase tests failed:', failedTests.map(t => t.name));
    }

    return results;

  } catch (error) {
    console.error('🚨 Firebase test error:', error);
    results.tests.push({
      name: 'Test Execution',
      status: 'fail',
      message: 'Error during testing',
      details: error.message
    });
    results.overall = 'fail';
    return results;
  }
};

/**
 * Quick Firebase health check
 * @returns {boolean} Whether Firebase is healthy
 */
export const quickFirebaseHealthCheck = () => {
  try {
    const status = getFirebaseStatus();
    return status.app && status.auth && status.firestore;
  } catch (error) {
    console.error('Firebase health check failed:', error);
    return false;
  }
};

/**
 * Get Firebase configuration summary for debugging
 * @returns {Object} Configuration summary
 */
export const getFirebaseConfigSummary = () => {
  const validation = validateFirebaseConfig();
  const status = getFirebaseStatus();
  
  return {
    isValid: validation.isValid,
    environment: import.meta.env.DEV ? 'development' : 'production',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    servicesInitialized: {
      app: status.app,
      auth: status.auth,
      firestore: status.firestore,
      storage: status.storage
    },
    emulatorsEnabled: status.emulatorsEnabled,
    issues: validation.missing
  };
};
