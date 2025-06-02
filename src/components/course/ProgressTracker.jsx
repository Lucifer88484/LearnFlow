/**
 * Progress Tracker Component
 * Displays course progress with visual indicators and achievements
 */

import React from 'react';
import { CheckCircle, Circle, Award, Clock, BookOpen, Target } from 'lucide-react';
import Card from '../ui/Card';

/**
 * Progress tracker component
 * @param {Object} props - Component props
 * @param {Object} props.course - Course data
 * @param {Object} props.progress - User progress data
 * @param {Array} props.achievements - User achievements
 */
const ProgressTracker = ({ course, progress, achievements = [] }) => {
  /**
   * Calculate overall progress percentage
   */
  const calculateOverallProgress = () => {
    if (!progress || !course.modules) return 0;
    
    const totalLessons = course.modules.reduce((total, module) => 
      total + (module.lessons ? module.lessons.length : 0), 0
    );
    
    const completedLessons = progress.completedLessons ? progress.completedLessons.length : 0;
    
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  /**
   * Check if lesson is completed
   * @param {string} lessonId - Lesson ID
   * @returns {boolean} Whether lesson is completed
   */
  const isLessonCompleted = (lessonId) => {
    return progress?.completedLessons?.includes(lessonId) || false;
  };

  /**
   * Calculate module progress
   * @param {Object} module - Module data
   * @returns {number} Module progress percentage
   */
  const getModuleProgress = (module) => {
    if (!module.lessons || module.lessons.length === 0) return 0;
    
    const completedInModule = module.lessons.filter(lesson => 
      isLessonCompleted(lesson.id)
    ).length;
    
    return Math.round((completedInModule / module.lessons.length) * 100);
  };

  /**
   * Get estimated time remaining
   */
  const getTimeRemaining = () => {
    if (!course.modules || !progress) return 'N/A';
    
    const totalMinutes = course.modules.reduce((total, module) => {
      if (!module.lessons) return total;
      return total + module.lessons.reduce((moduleTotal, lesson) => {
        if (isLessonCompleted(lesson.id)) return moduleTotal;
        const duration = parseInt(lesson.estimatedDuration) || 30;
        return moduleTotal + duration;
      }, 0);
    }, 0);
    
    if (totalMinutes < 60) return `${totalMinutes} minutes`;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Course Progress
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Overall Progress</span>
                <span>{overallProgress}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <BookOpen className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {progress?.completedLessons?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Lessons Completed</div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Clock className="h-8 w-8 text-success-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {getTimeRemaining()}
                </div>
                <div className="text-sm text-gray-600">Time Remaining</div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Award className="h-8 w-8 text-warning-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">
                  {achievements.length}
                </div>
                <div className="text-sm text-gray-600">Achievements</div>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Module Progress */}
      <Card>
        <Card.Header>
          <Card.Title>Module Progress</Card.Title>
          <Card.Description>
            Track your progress through each course module
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="space-y-6">
            {course.modules?.map((module, moduleIndex) => {
              const moduleProgress = getModuleProgress(module);
              
              return (
                <div key={module.id || moduleIndex} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{module.title}</h3>
                    <span className="text-sm text-gray-600">{moduleProgress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-success-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${moduleProgress}%` }}
                    />
                  </div>

                  {/* Lessons */}
                  {module.lessons && (
                    <div className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const completed = isLessonCompleted(lesson.id || `${moduleIndex}-${lessonIndex}`);
                        
                        return (
                          <div
                            key={lesson.id || lessonIndex}
                            className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
                          >
                            {completed ? (
                              <CheckCircle className="h-5 w-5 text-success-600 flex-shrink-0" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${
                                completed ? 'text-gray-900' : 'text-gray-600'
                              }`}>
                                {lesson.title}
                              </p>
                              {lesson.estimatedDuration && (
                                <p className="text-xs text-gray-500">
                                  {lesson.estimatedDuration}
                                </p>
                              )}
                            </div>
                            {completed && (
                              <div className="text-xs text-success-600 font-medium">
                                Completed
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card.Content>
      </Card>

      {/* Achievements */}
      {achievements.length > 0 && (
        <Card>
          <Card.Header>
            <Card.Title className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Achievements
            </Card.Title>
            <Card.Description>
              Milestones you've reached in this course
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 border rounded-lg bg-gradient-to-r from-warning-50 to-warning-100"
                >
                  <div className="flex-shrink-0">
                    <Award className="h-8 w-8 text-warning-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-warning-900">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-warning-700">
                      {achievement.description}
                    </p>
                    {achievement.earnedAt && (
                      <p className="text-xs text-warning-600 mt-1">
                        Earned {new Date(achievement.earnedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Next Steps */}
      <Card>
        <Card.Header>
          <Card.Title>Next Steps</Card.Title>
        </Card.Header>
        <Card.Content>
          {overallProgress === 100 ? (
            <div className="text-center py-6">
              <CheckCircle className="h-12 w-12 text-success-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-success-900 mb-2">
                Congratulations!
              </h3>
              <p className="text-success-700">
                You've completed this course. Consider leaving a review or exploring related courses.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="font-medium">Continue Learning:</h4>
              {course.modules?.map((module, moduleIndex) => {
                const nextLesson = module.lessons?.find(lesson => 
                  !isLessonCompleted(lesson.id || `${moduleIndex}-${lesson.title}`)
                );
                
                if (nextLesson) {
                  return (
                    <div
                      key={`next-${moduleIndex}`}
                      className="flex items-center justify-between p-3 border rounded-lg bg-blue-50"
                    >
                      <div>
                        <p className="font-medium text-blue-900">{nextLesson.title}</p>
                        <p className="text-sm text-blue-700">in {module.title}</p>
                      </div>
                      <div className="text-sm text-blue-600">
                        {nextLesson.estimatedDuration}
                      </div>
                    </div>
                  );
                }
                return null;
              }).filter(Boolean).slice(0, 1)}
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default ProgressTracker;
