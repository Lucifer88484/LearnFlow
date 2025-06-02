/**
 * Course Creation Form Component
 * Multi-step form for creating new courses with AI assistance
 */

import React, { useState } from 'react';
import { Plus, Sparkles, Save, ArrowLeft, ArrowRight } from 'lucide-react';
import { generateCourseOutline, generateLearningObjectives } from '../../services/gemini';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';

/**
 * Course creation form with AI assistance
 * @param {Object} props - Component props
 * @param {Function} props.onSave - Function to save the course
 * @param {Function} props.onCancel - Function to cancel creation
 */
const CourseCreationForm = ({ onSave, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: 'programming',
    level: 'beginner',
    price: 0,
    thumbnailUrl: '',
    learningObjectives: [],
    modules: [],
  });
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'data-science', label: 'Data Science' },
  ];

  const levels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  /**
   * Handle form input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
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
   * Generate learning objectives using AI
   */
  const handleGenerateObjectives = async () => {
    if (!courseData.title || !courseData.description) {
      setErrors({
        title: !courseData.title ? 'Title is required for AI generation' : '',
        description: !courseData.description ? 'Description is required for AI generation' : '',
      });
      return;
    }

    setAiLoading(true);
    try {
      const objectives = await generateLearningObjectives(courseData.title, courseData.description);
      setCourseData(prev => ({
        ...prev,
        learningObjectives: objectives
      }));
    } catch (error) {
      console.error('Error generating objectives:', error);
    } finally {
      setAiLoading(false);
    }
  };

  /**
   * Generate course outline using AI
   */
  const handleGenerateOutline = async () => {
    if (!courseData.title || !courseData.description) {
      setErrors({
        title: !courseData.title ? 'Title is required for AI generation' : '',
        description: !courseData.description ? 'Description is required for AI generation' : '',
      });
      return;
    }

    setAiLoading(true);
    try {
      const modules = await generateCourseOutline(courseData.title, courseData.description);
      setCourseData(prev => ({
        ...prev,
        modules: modules
      }));
    } catch (error) {
      console.error('Error generating outline:', error);
    } finally {
      setAiLoading(false);
    }
  };

  /**
   * Validate current step
   * @returns {boolean} Whether current step is valid
   */
  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!courseData.title.trim()) {
        newErrors.title = 'Course title is required';
      }
      if (!courseData.description.trim()) {
        newErrors.description = 'Course description is required';
      }
      if (courseData.price < 0) {
        newErrors.price = 'Price cannot be negative';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle next step
   */
  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  /**
   * Handle previous step
   */
  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    if (!validateStep()) {
      return;
    }

    setLoading(true);
    try {
      await onSave(courseData);
    } catch (error) {
      console.error('Error saving course:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Render step 1: Basic Information
   */
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Course Information</h3>
        
        <div className="space-y-4">
          <Input
            label="Course Title"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="Enter course title"
            required
          />

          <div>
            <label className="label">Course Description</label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleChange}
              placeholder="Describe what students will learn in this course"
              rows={4}
              className={`textarea ${errors.description ? 'border-error-500' : ''}`}
            />
            {errors.description && (
              <p className="text-sm text-error-600 mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Category</label>
              <select
                name="category"
                value={courseData.category}
                onChange={handleChange}
                className="input"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Difficulty Level</label>
              <select
                name="level"
                value={courseData.level}
                onChange={handleChange}
                className="input"
              >
                {levels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Price ($)"
              name="price"
              type="number"
              value={courseData.price}
              onChange={handleChange}
              error={errors.price}
              placeholder="0"
              min="0"
              step="0.01"
            />

            <Input
              label="Thumbnail URL (optional)"
              name="thumbnailUrl"
              value={courseData.thumbnailUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );

  /**
   * Render step 2: Learning Objectives
   */
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Learning Objectives</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerateObjectives}
          loading={aiLoading}
          disabled={aiLoading}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generate with AI
        </Button>
      </div>

      {courseData.learningObjectives.length > 0 ? (
        <div className="space-y-2">
          {courseData.learningObjectives.map((objective, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm">{objective}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No learning objectives yet.</p>
          <p className="text-sm">Use AI to generate objectives based on your course title and description.</p>
        </div>
      )}
    </div>
  );

  /**
   * Render step 3: Course Outline
   */
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Course Outline</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerateOutline}
          loading={aiLoading}
          disabled={aiLoading}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generate with AI
        </Button>
      </div>

      {courseData.modules.length > 0 ? (
        <div className="space-y-4">
          {courseData.modules.map((module, index) => (
            <Card key={index}>
              <Card.Content className="p-4">
                <h4 className="font-medium mb-2">{module.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                <div className="space-y-1">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-400">•</span>
                      <span>{lesson.title}</span>
                      <span className="text-gray-500">({lesson.estimatedDuration})</span>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No course outline yet.</p>
          <p className="text-sm">Use AI to generate a structured outline with modules and lessons.</p>
        </div>
      )}
    </div>
  );

  const steps = [
    { number: 1, title: 'Basic Info', component: renderStep1 },
    { number: 2, title: 'Objectives', component: renderStep2 },
    { number: 3, title: 'Outline', component: renderStep3 },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <Card.Header>
          <Card.Title>Create New Course</Card.Title>
          <Card.Description>
            Build your course step by step with AI assistance
          </Card.Description>
        </Card.Header>

        <Card.Content>
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step.number
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.number}
                </div>
                <span className={`ml-2 text-sm ${
                  currentStep >= step.number ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {aiLoading && (
              <div className="mb-4">
                <LoadingSpinner text="AI is generating content..." />
              </div>
            )}
            {steps[currentStep - 1].component()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t">
            <div>
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={loading}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>

              {currentStep < steps.length ? (
                <Button
                  onClick={handleNext}
                  disabled={loading}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={loading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Course
                </Button>
              )}
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default CourseCreationForm;
