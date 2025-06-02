/**
 * Demo Page
 * Showcases all LMS features and components
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Award, 
  Sparkles, 
  Play, 
  Edit3,
  BarChart3,
  MessageCircle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import FirebaseStatus from '../components/ui/FirebaseStatus';
import { DemoLogo, FooterLogo } from '../components/ui/Logo';
import CourseCreationForm from '../components/course/CourseCreationForm';
import QuizCreator from '../components/quiz/QuizCreator';
import QuizTaker from '../components/quiz/QuizTaker';
import ProgressTracker from '../components/course/ProgressTracker';

/**
 * Demo page component
 */
const DemoPage = () => {
  const [activeDemo, setActiveDemo] = useState(null);

  // Mock data for demos
  const mockCourse = {
    id: 'demo-course',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React including components, state, and props.',
    modules: [
      {
        id: 'module-1',
        title: 'Getting Started',
        lessons: [
          { id: 'lesson-1', title: 'What is React?', estimatedDuration: '15 minutes' },
          { id: 'lesson-2', title: 'Setting up your environment', estimatedDuration: '20 minutes' },
          { id: 'lesson-3', title: 'Your first component', estimatedDuration: '25 minutes' },
        ]
      },
      {
        id: 'module-2',
        title: 'Core Concepts',
        lessons: [
          { id: 'lesson-4', title: 'JSX Syntax', estimatedDuration: '30 minutes' },
          { id: 'lesson-5', title: 'Props and State', estimatedDuration: '35 minutes' },
          { id: 'lesson-6', title: 'Event Handling', estimatedDuration: '25 minutes' },
        ]
      }
    ]
  };

  const mockProgress = {
    completedLessons: ['lesson-1', 'lesson-2', 'lesson-4'],
    enrolledAt: '2024-01-15T10:00:00Z'
  };

  const mockAchievements = [
    {
      title: 'First Steps',
      description: 'Completed your first lesson',
      earnedAt: '2024-01-15T10:30:00Z'
    },
    {
      title: 'Quick Learner',
      description: 'Completed 3 lessons in one day',
      earnedAt: '2024-01-15T15:00:00Z'
    }
  ];

  const mockQuiz = {
    id: 'demo-quiz',
    title: 'React Fundamentals Quiz',
    description: 'Test your knowledge of React basics',
    timeLimit: 10, // 10 minutes for demo
    questions: [
      {
        id: 'q1',
        question: 'What is JSX?',
        options: [
          'A JavaScript library',
          'A syntax extension for JavaScript',
          'A CSS framework',
          'A database query language'
        ],
        correctAnswer: 1,
        explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.'
      },
      {
        id: 'q2',
        question: 'Which method is used to render a React component?',
        options: [
          'ReactDOM.render()',
          'React.render()',
          'component.render()',
          'render.component()'
        ],
        correctAnswer: 0,
        explanation: 'ReactDOM.render() is the method used to render React components to the DOM.'
      },
      {
        id: 'q3',
        question: 'What are props in React?',
        options: [
          'Properties passed to components',
          'Internal component state',
          'CSS styling properties',
          'Event handlers'
        ],
        correctAnswer: 0,
        explanation: 'Props are properties that are passed to React components from their parent components.'
      }
    ]
  };

  const demoFeatures = [
    {
      id: 'course-creation',
      title: 'Course Creation with AI',
      description: 'Create courses with AI-powered content generation',
      icon: BookOpen,
      color: 'bg-blue-500',
      component: CourseCreationForm
    },
    {
      id: 'quiz-creator',
      title: 'AI Quiz Generator',
      description: 'Build interactive quizzes with AI assistance',
      icon: Edit3,
      color: 'bg-green-500',
      component: QuizCreator
    },
    {
      id: 'quiz-taker',
      title: 'Interactive Quiz Taking',
      description: 'Take quizzes with timer and instant feedback',
      icon: Play,
      color: 'bg-purple-500',
      component: QuizTaker
    },
    {
      id: 'progress-tracking',
      title: 'Progress Tracking',
      description: 'Visual progress tracking with achievements',
      icon: BarChart3,
      color: 'bg-orange-500',
      component: ProgressTracker
    }
  ];

  /**
   * Handle demo selection
   * @param {string} demoId - Demo ID to show
   */
  const handleDemoSelect = (demoId) => {
    setActiveDemo(demoId);
  };

  /**
   * Handle demo close
   */
  const handleDemoClose = () => {
    setActiveDemo(null);
  };

  /**
   * Render active demo component
   */
  const renderActiveDemo = () => {
    const feature = demoFeatures.find(f => f.id === activeDemo);
    if (!feature) return null;

    const Component = feature.component;
    const props = {};

    // Set up props based on demo type
    switch (activeDemo) {
      case 'course-creation':
        props.onSave = (courseData) => {
          console.log('Course saved:', courseData);
          alert('Course created successfully! (Demo mode)');
          handleDemoClose();
        };
        props.onCancel = handleDemoClose;
        break;

      case 'quiz-creator':
        props.onSave = (quizData) => {
          console.log('Quiz saved:', quizData);
          alert('Quiz created successfully! (Demo mode)');
          handleDemoClose();
        };
        props.onCancel = handleDemoClose;
        props.courseTitle = mockCourse.title;
        break;

      case 'quiz-taker':
        props.quiz = mockQuiz;
        props.onComplete = (results) => {
          console.log('Quiz completed:', results);
          alert(`Quiz completed! Score: ${results.score}% (Demo mode)`);
          handleDemoClose();
        };
        props.onExit = handleDemoClose;
        break;

      case 'progress-tracking':
        props.course = mockCourse;
        props.progress = mockProgress;
        props.achievements = mockAchievements;
        break;

      default:
        return null;
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{feature.title} Demo</h2>
            <Button variant="outline" onClick={handleDemoClose}>
              Close Demo
            </Button>
          </div>
          <div className="p-6">
            <Component {...props} />
          </div>
        </div>
      </div>
    );
  };

  if (activeDemo) {
    return renderActiveDemo();
  }

  return (
    <div className="space-y-8">
      {/* Firebase Status (Development Only) */}
      {import.meta.env.DEV && (
        <FirebaseStatus />
      )}

      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <DemoLogo />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          LearnFlow Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience the power of LearnFlow's comprehensive Learning Management System with
          AI-powered features, interactive assessments, and advanced progress tracking.
        </p>
      </div>

      {/* Key Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <Card.Content className="p-6">
            <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">AI-Powered</h3>
            <p className="text-sm text-gray-600">
              Generate courses, quizzes, and content with Gemini 2.0 Flash
            </p>
          </Card.Content>
        </Card>

        <Card className="text-center">
          <Card.Content className="p-6">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Role-Based Access</h3>
            <p className="text-sm text-gray-600">
              Students, Instructors, and Admins with tailored experiences
            </p>
          </Card.Content>
        </Card>

        <Card className="text-center">
          <Card.Content className="p-6">
            <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Progress Tracking</h3>
            <p className="text-sm text-gray-600">
              Visual progress indicators and achievement systems
            </p>
          </Card.Content>
        </Card>

        <Card className="text-center">
          <Card.Content className="p-6">
            <MessageCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Real-time Collaboration</h3>
            <p className="text-sm text-gray-600">
              Discussion forums and instant feedback systems
            </p>
          </Card.Content>
        </Card>
      </div>

      {/* Interactive Demos */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Try Our Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoFeatures.map((feature) => {
            const Icon = feature.icon;
            
            return (
              <Card key={feature.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Card.Content className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${feature.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <Button 
                        onClick={() => handleDemoSelect(feature.id)}
                        size="sm"
                      >
                        Try Demo
                      </Button>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Technology Stack */}
      <Card>
        <Card.Header>
          <Card.Title>Technology Stack</Card.Title>
          <Card.Description>
            Built with modern technologies for performance and scalability
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-900">React 18+</div>
              <div className="text-sm text-blue-700">Frontend Framework</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="font-semibold text-orange-900">Firebase</div>
              <div className="text-sm text-orange-700">Backend & Database</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="font-semibold text-purple-900">Gemini AI</div>
              <div className="text-sm text-purple-700">Content Generation</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-900">Tailwind CSS</div>
              <div className="text-sm text-green-700">Styling & Design</div>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started with LearnFlow?</h2>
        <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
          Deploy your own LearnFlow platform with all these features included.
          Perfect for educational institutions, corporate training, or online course creators.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="bg-white text-primary-600 hover:bg-gray-50">
            View Documentation
          </Button>
          <Button className="bg-primary-800 hover:bg-primary-900">
            Deploy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
