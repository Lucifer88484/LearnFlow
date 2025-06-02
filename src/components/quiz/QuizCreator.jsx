/**
 * Quiz Creator Component
 * Interactive quiz builder with AI-powered question generation
 */

import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, Save, Edit3 } from 'lucide-react';
import { generateQuizQuestions } from '../../services/gemini';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';

/**
 * Quiz creator component
 * @param {Object} props - Component props
 * @param {Function} props.onSave - Function to save the quiz
 * @param {Function} props.onCancel - Function to cancel creation
 * @param {string} props.courseTitle - Course title for context
 */
const QuizCreator = ({ onSave, onCancel, courseTitle = '' }) => {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    timeLimit: 30, // minutes
    questions: [],
  });
  const [aiLoading, setAiLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Handle quiz data changes
   * @param {Event} e - Input change event
   */
  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuizData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Add a new blank question
   */
  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
    };
    
    setQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  /**
   * Remove a question
   * @param {number} questionId - Question ID to remove
   */
  const removeQuestion = (questionId) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  /**
   * Update a question
   * @param {number} questionId - Question ID to update
   * @param {Object} updates - Updates to apply
   */
  const updateQuestion = (questionId, updates) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, ...updates } : q
      )
    }));
  };

  /**
   * Update a question option
   * @param {number} questionId - Question ID
   * @param {number} optionIndex - Option index to update
   * @param {string} value - New option value
   */
  const updateOption = (questionId, optionIndex, value) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              options: q.options.map((opt, idx) => idx === optionIndex ? value : opt)
            }
          : q
      )
    }));
  };

  /**
   * Generate questions using AI
   */
  const handleGenerateQuestions = async () => {
    if (!quizData.title) {
      setErrors({ title: 'Quiz title is required for AI generation' });
      return;
    }

    setAiLoading(true);
    try {
      const topic = `${courseTitle ? courseTitle + ': ' : ''}${quizData.title}`;
      const generatedQuestions = await generateQuizQuestions(topic, 5);
      
      setQuizData(prev => ({
        ...prev,
        questions: [...prev.questions, ...generatedQuestions]
      }));
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setAiLoading(false);
    }
  };

  /**
   * Validate quiz data
   * @returns {boolean} Whether quiz is valid
   */
  const validateQuiz = () => {
    const newErrors = {};

    if (!quizData.title.trim()) {
      newErrors.title = 'Quiz title is required';
    }

    if (quizData.questions.length === 0) {
      newErrors.questions = 'At least one question is required';
    }

    // Validate each question
    quizData.questions.forEach((question, index) => {
      if (!question.question.trim()) {
        newErrors[`question_${index}`] = 'Question text is required';
      }
      
      const validOptions = question.options.filter(opt => opt.trim());
      if (validOptions.length < 2) {
        newErrors[`options_${index}`] = 'At least 2 options are required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle quiz submission
   */
  const handleSubmit = async () => {
    if (!validateQuiz()) {
      return;
    }

    try {
      await onSave(quizData);
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  /**
   * Render question editor
   * @param {Object} question - Question data
   * @param {number} index - Question index
   */
  const renderQuestionEditor = (question, index) => (
    <Card key={question.id} className="mb-4">
      <Card.Header className="flex flex-row items-center justify-between">
        <Card.Title className="text-base">Question {index + 1}</Card.Title>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeQuestion(question.id)}
          className="text-error-600 hover:text-error-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </Card.Header>

      <Card.Content>
        <div className="space-y-4">
          {/* Question Text */}
          <div>
            <label className="label">Question</label>
            <textarea
              value={question.question}
              onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
              placeholder="Enter your question here..."
              rows={2}
              className={`textarea ${errors[`question_${index}`] ? 'border-error-500' : ''}`}
            />
            {errors[`question_${index}`] && (
              <p className="text-sm text-error-600 mt-1">{errors[`question_${index}`]}</p>
            )}
          </div>

          {/* Options */}
          <div>
            <label className="label">Answer Options</label>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`correct_${question.id}`}
                    checked={question.correctAnswer === optionIndex}
                    onChange={() => updateQuestion(question.id, { correctAnswer: optionIndex })}
                    className="text-primary-600"
                  />
                  <Input
                    value={option}
                    onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                    placeholder={`Option ${optionIndex + 1}`}
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
            {errors[`options_${index}`] && (
              <p className="text-sm text-error-600 mt-1">{errors[`options_${index}`]}</p>
            )}
          </div>

          {/* Explanation */}
          <div>
            <label className="label">Explanation (optional)</label>
            <textarea
              value={question.explanation}
              onChange={(e) => updateQuestion(question.id, { explanation: e.target.value })}
              placeholder="Explain why this answer is correct..."
              rows={2}
              className="textarea"
            />
          </div>
        </div>
      </Card.Content>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <Card.Header>
          <Card.Title>Create Quiz</Card.Title>
          <Card.Description>
            Build an interactive quiz for your course
          </Card.Description>
        </Card.Header>

        <Card.Content>
          {/* Quiz Settings */}
          <div className="space-y-4 mb-6">
            <Input
              label="Quiz Title"
              name="title"
              value={quizData.title}
              onChange={handleQuizChange}
              error={errors.title}
              placeholder="Enter quiz title"
              required
            />

            <div>
              <label className="label">Description (optional)</label>
              <textarea
                name="description"
                value={quizData.description}
                onChange={handleQuizChange}
                placeholder="Describe what this quiz covers..."
                rows={2}
                className="textarea"
              />
            </div>

            <Input
              label="Time Limit (minutes)"
              name="timeLimit"
              type="number"
              value={quizData.timeLimit}
              onChange={handleQuizChange}
              min="1"
              max="180"
            />
          </div>

          {/* AI Generation */}
          <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 rounded-lg">
            <div>
              <h3 className="font-medium text-blue-900">AI Question Generation</h3>
              <p className="text-sm text-blue-700">
                Generate quiz questions automatically based on your quiz title
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleGenerateQuestions}
              loading={aiLoading}
              disabled={aiLoading || !quizData.title}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Questions
            </Button>
          </div>

          {aiLoading && (
            <div className="mb-6">
              <LoadingSpinner text="AI is generating quiz questions..." />
            </div>
          )}

          {/* Questions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Questions ({quizData.questions.length})</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={addQuestion}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>

            {errors.questions && (
              <p className="text-sm text-error-600">{errors.questions}</p>
            )}

            {quizData.questions.length > 0 ? (
              <div>
                {quizData.questions.map((question, index) => 
                  renderQuestionEditor(question, index)
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Edit3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No questions yet.</p>
                <p className="text-sm">Add questions manually or use AI to generate them.</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={quizData.questions.length === 0}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Quiz
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default QuizCreator;
