/**
 * Authentication Context
 * Manages user authentication state and provides auth-related functions
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, getFirebaseStatus } from '../services/firebase';

const AuthContext = createContext();

/**
 * Custom hook to use the auth context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Authentication Provider Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Sign up a new user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} name - User display name
   * @param {string} role - User role (default: 'student')
   * @returns {Promise<Object>} User credential
   */
  const signup = async (email, password, name, role = 'student') => {
    try {
      setError(null);
      setLoading(true);

      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, { displayName: name });

      // Create user document in Firestore
      const userDoc = {
        uid: user.uid,
        email: user.email,
        name: name,
        role: role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        profileComplete: true,
        lastLoginAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', user.uid), userDoc);
      setUserProfile(userDoc);

      return userCredential;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign in an existing user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} User credential
   */
  const signin = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login time
      if (userCredential.user) {
        await updateDoc(doc(db, 'users', userCredential.user.uid), {
          lastLoginAt: new Date().toISOString(),
        });
      }

      return userCredential;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign out the current user
   * @returns {Promise<void>}
   */
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  /**
   * Send password reset email
   * @param {string} email - User email
   * @returns {Promise<void>}
   */
  const resetPassword = async (email) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  /**
   * Update user profile
   * @param {Object} updates - Profile updates
   * @returns {Promise<void>}
   */
  const updateUserProfile = async (updates) => {
    try {
      setError(null);
      
      if (currentUser) {
        // Update Firebase Auth profile if name is being updated
        if (updates.name && updates.name !== currentUser.displayName) {
          await updateProfile(currentUser, { displayName: updates.name });
        }

        // Update Firestore document
        const updatedProfile = {
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        await updateDoc(doc(db, 'users', currentUser.uid), updatedProfile);
        
        // Update local state
        setUserProfile(prev => ({ ...prev, ...updatedProfile }));
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  /**
   * Fetch user profile from Firestore
   * @param {string} uid - User ID
   * @returns {Promise<Object|null>} User profile
   */
  const fetchUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const profile = userDoc.data();
        setUserProfile(profile);
        return profile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  /**
   * Check if user has specific role
   * @param {string} role - Role to check
   * @returns {boolean} Whether user has the role
   */
  const hasRole = (role) => {
    return userProfile?.role === role;
  };

  /**
   * Check if user has any of the specified roles
   * @param {Array<string>} roles - Roles to check
   * @returns {boolean} Whether user has any of the roles
   */
  const hasAnyRole = (roles) => {
    return roles.includes(userProfile?.role);
  };

  // Set up auth state listener
  useEffect(() => {
    // Check Firebase initialization status
    const firebaseStatus = getFirebaseStatus();

    if (!firebaseStatus.auth) {
      console.error('Firebase Auth not properly initialized');
      setError('Authentication service unavailable. Please check your configuration.');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setCurrentUser(user);

        if (user) {
          // Fetch user profile from Firestore
          await fetchUserProfile(user.uid);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setError('Error loading user data. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    signup,
    signin,
    logout,
    resetPassword,
    updateUserProfile,
    fetchUserProfile,
    hasRole,
    hasAnyRole,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
