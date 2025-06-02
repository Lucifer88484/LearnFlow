/**
 * Quiz Taker Component
 * Interactive quiz taking interface with timer and progress tracking
 */

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

/**
 * Quiz taking component
 * @param {Object} props - Component props
 * @param {Object} props.quiz - Quiz data
 * @param {Function} props.onComplete - Function called when quiz is completed
 * @param {Function} props.onExit - Function called when user exits quiz
 */
const QuizTaker = ({ quiz, onComplete, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60); // Convert to seconds
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  /**
   * Timer effect
   */
  useEffect(() => {
    if (timeRemaining > 0 && !quizCompleted) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !quizCompleted) {
      // Time's up - auto submit
      handleSubmitQuiz();
    }
  }, [timeRemaining, quizCompleted]);

  /**
   * Format time remaining
   * @param {number} seconds - Seconds remaining
   * @returns {string} Formatted time string
   */
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  /**
   * Handle answer selection
   * @param {number} questionIndex - Question index
   * @param {number} answerIndex - Selected answer index
   */
  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  /**
   * Navigate to next question
   */
  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  /**
   * Navigate to previous question
   */
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  /**
   * Calculate quiz score
   * @returns {number} Score percentage
   */
  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  /**
   * Submit quiz and show results
   */
  const handleSubmitQuiz = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setQuizCompleted(true);
    setShowResults(true);
    
    // Call completion callback
    onComplete({
      answers,
      score: finalScore,
      timeSpent: (quiz.timeLimit * 60) - timeRemaining,
      completedAt: new Date().toISOString(),
    });
  };

  /**
   * Restart quiz
   */
  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(quiz.timeLimit * 60);
    setQuizCompleted(false);
    setShowResults(false);
    setScore(0);
  };

  /**
   * Get progress percentage
   */
  const getProgress = () => {
    return Math.round(((currentQuestion + 1) / quiz.questions.length) * 100);
  };

  /**
   * Check if all questions are answered
   */
  const allQuestionsAnswered = () => {
    return quiz.questions.every((_, index) => answers.hasOwnProperty(index));
  };

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <Card.Header className="text-center">
            <div className="mb-4">
              {score >= 70 ? (
                <CheckCircle className="h-16 w-16 text-success-600 mx-auto" />
              ) : (
                <XCircle className="h-16 w-16 text-error-600 mx-auto" />
              )}
            </div>
            <Card.Title className="text-2xl">
              {score >= 70 ? 'Congratulations!' : 'Quiz Complete'}
            </Card.Title>
            <Card.Description>
              You scored {score}% on this quiz
            </Card.Description>
          </Card.Header>

          <Card.Content>
            {/* Score Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{score}%</div>
                <div className="text-sm text-gray-600">Final Score</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {Object.values(answers).filter((answer, index) => 
                    answer === quiz.questions[index].correctAnswer
                  ).length}
                </div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {formatTime((quiz.timeLimit * 60) - timeRemaining)}
                </div>
                <div className="text-sm text-gray-600">Time Taken</div>
              </div>
            </div>

            {/* Question Review */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Your Answers</h3>
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <Card key={index} className={`border-l-4 ${
                    isCorrect ? 'border-l-success-500' : 'border-l-error-500'
                  }`}>
                    <Card.Content className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">Question {index + 1}</h4>
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-success-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-error-600" />
                        )}
                      </div>
                      
                      <p className="text-gray-700 mb-3">{question.question}</p>
                      
                      <div className="space-y-1">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded text-sm ${
                              optionIndex === question.correctAnswer
                                ? 'bg-success-100 text-success-800'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'bg-error-100 text-error-800'
                                : 'bg-gray-50 text-gray-700'
                            }`}
                          >
                            {option}
                            {optionIndex === question.correctAnswer && (
                              <span className="ml-2 text-xs font-medium">(Correct)</span>
                            )}
                            {optionIndex === userAnswer && !isCorrect && (
                              <span className="ml-2 text-xs font-medium">(Your answer)</span>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      )}
                    </Card.Content>
                  </Card>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex justify-center space-x-3 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleRestart}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
              <Button onClick={onExit}>
                Continue Learning
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title>{quiz.title}</Card.Title>
              <Card.Description>
                Question {currentQuestion + 1} of {quiz.questions.length}
              </Card.Description>
            </div>
            
            {quiz.timeLimit > 0 && (
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={timeRemaining < 300 ? 'text-error-600 font-medium' : ''}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{getProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>
        </Card.Header>

        <Card.Content>
          {/* Question */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">{question.question}</h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    answers[currentQuestion] === index
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question_${currentQuestion}`}
                    value={index}
                    checked={answers[currentQuestion] === index}
                    onChange={() => handleAnswerSelect(currentQuestion, index)}
                    className="text-primary-600 mr-3"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>

            <div className="flex space-x-2">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                    index === currentQuestion
                      ? 'bg-primary-600 text-white'
                      : answers.hasOwnProperty(index)
                      ? 'bg-success-100 text-success-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === quiz.questions.length - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={!allQuestionsAnswered()}
                className={!allQuestionsAnswered() ? 'opacity-50' : ''}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!answers.hasOwnProperty(currentQuestion)}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Warning for unanswered questions */}
          {currentQuestion === quiz.questions.length - 1 && !allQuestionsAnswered() && (
            <div className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg">
              <p className="text-sm text-warning-800">
                Please answer all questions before submitting the quiz.
              </p>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default QuizTaker;
