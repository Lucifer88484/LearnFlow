/**
 * Profile Page
 * User profile management and settings
 */

import React, { useState } from 'react';
import { User, Mail, Shield, Save, Edit2, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

/**
 * Profile page component
 */
const ProfilePage = () => {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    email: currentUser?.email || '',
    bio: userProfile?.bio || '',
    location: userProfile?.location || '',
    website: userProfile?.website || '',
  });
  const [errors, setErrors] = useState({});

  /**
   * Handle form input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validate form data
   * @returns {boolean} Whether form is valid
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (formData.website && !formData.website.match(/^https?:\/\/.+/)) {
      newErrors.website = 'Website must be a valid URL (include http:// or https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      await updateUserProfile({
        name: formData.name.trim(),
        bio: formData.bio.trim(),
        location: formData.location.trim(),
        website: formData.website.trim(),
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancel editing and reset form
   */
  const handleCancel = () => {
    setFormData({
      name: userProfile?.name || '',
      email: currentUser?.email || '',
      bio: userProfile?.bio || '',
      location: userProfile?.location || '',
      website: userProfile?.website || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <Card.Content className="p-6 text-center">
              {/* Profile Picture */}
              <div className="relative inline-block mb-4">
                <div className="h-24 w-24 rounded-full bg-primary-600 flex items-center justify-center mx-auto">
                  <User className="h-12 w-12 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 h-8 w-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 hover:bg-gray-50">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <h2 className="text-xl font-semibold text-gray-900">{userProfile?.name}</h2>
              <p className="text-gray-600">{currentUser?.email}</p>
              
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  <Shield className="h-4 w-4 mr-1" />
                  {userProfile?.role}
                </span>
              </div>

              {userProfile?.bio && (
                <p className="text-sm text-gray-600 mt-4">{userProfile.bio}</p>
              )}

              <div className="mt-6 space-y-2 text-sm text-gray-600">
                {userProfile?.location && (
                  <div>📍 {userProfile.location}</div>
                )}
                {userProfile?.website && (
                  <div>
                    🌐 <a href={userProfile.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      {userProfile.website}
                    </a>
                  </div>
                )}
                <div>📅 Joined {new Date(userProfile?.createdAt).toLocaleDateString()}</div>
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header className="flex flex-row items-center justify-between">
              <div>
                <Card.Title>Personal Information</Card.Title>
                <Card.Description>Update your personal details and preferences</Card.Description>
              </div>
              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </Card.Header>

            <Card.Content>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    disabled={!isEditing}
                    required
                  />

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled={true}
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <label className="label">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className="textarea"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="City, Country"
                  />

                  <Input
                    label="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    error={errors.website}
                    disabled={!isEditing}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      loading={loading}
                      disabled={loading}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </Card.Content>
          </Card>
        </div>
      </div>

      {/* Account Information */}
      <Card>
        <Card.Header>
          <Card.Title>Account Information</Card.Title>
          <Card.Description>View your account details and security information</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label">User ID</label>
              <div className="input bg-gray-50 font-mono text-sm">
                {currentUser?.uid}
              </div>
            </div>

            <div>
              <label className="label">Account Created</label>
              <div className="input bg-gray-50">
                {new Date(userProfile?.createdAt).toLocaleString()}
              </div>
            </div>

            <div>
              <label className="label">Last Login</label>
              <div className="input bg-gray-50">
                {userProfile?.lastLoginAt ? new Date(userProfile.lastLoginAt).toLocaleString() : 'N/A'}
              </div>
            </div>

            <div>
              <label className="label">Email Verified</label>
              <div className="input bg-gray-50">
                {currentUser?.emailVerified ? (
                  <span className="text-success-600">✓ Verified</span>
                ) : (
                  <span className="text-warning-600">⚠ Not verified</span>
                )}
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Security Settings */}
      <Card>
        <Card.Header>
          <Card.Title>Security Settings</Card.Title>
          <Card.Description>Manage your account security and privacy</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-gray-600">Update your account password</p>
              </div>
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline" size="sm">
                Enable 2FA
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Download Data</h4>
                <p className="text-sm text-gray-600">Download a copy of your account data</p>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg border-error-200">
              <div>
                <h4 className="font-medium text-error-600">Delete Account</h4>
                <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
              </div>
              <Button variant="danger" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ProfilePage;
