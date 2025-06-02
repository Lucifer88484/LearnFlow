/**
 * Dashboard Page
 * Role-based dashboard showing relevant information and actions
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Award,
  Plus,
  Clock,
  CheckCircle,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

/**
 * Dashboard component with role-specific content
 */
const Dashboard = () => {
  const { userProfile, hasRole } = useAuth();
  const [stats, setStats] = useState({
    totalCourses: 0,
    enrolledCourses: 0,
    completedCourses: 0,
    totalStudents: 0,
    totalUsers: 0,
    activeQuizzes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  /**
   * Load dashboard data based on user role
   */
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      
      try {
        // Simulate API calls - replace with actual Firestore queries
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (hasRole('student')) {
          setStats({
            enrolledCourses: 3,
            completedCourses: 1,
            activeQuizzes: 2,
            totalHours: 24,
          });
          
          setRecentActivity([
            { id: 1, type: 'course_completed', title: 'Introduction to React', time: '2 hours ago' },
            { id: 2, type: 'quiz_taken', title: 'JavaScript Fundamentals Quiz', time: '1 day ago' },
            { id: 3, type: 'course_enrolled', title: 'Advanced CSS Techniques', time: '3 days ago' },
          ]);
        } else if (hasRole('instructor')) {
          setStats({
            totalCourses: 5,
            totalStudents: 42,
            activeQuizzes: 8,
            avgRating: 4.7,
          });
          
          setRecentActivity([
            { id: 1, type: 'student_enrolled', title: 'New student enrolled in React Course', time: '1 hour ago' },
            { id: 2, type: 'quiz_submitted', title: 'Quiz completed by 5 students', time: '3 hours ago' },
            { id: 3, type: 'course_updated', title: 'Updated JavaScript Fundamentals', time: '1 day ago' },
          ]);
        } else if (hasRole('admin')) {
          setStats({
            totalUsers: 156,
            totalCourses: 23,
            totalInstructors: 8,
            totalStudents: 148,
          });
          
          setRecentActivity([
            { id: 1, type: 'user_registered', title: 'New instructor registered', time: '30 minutes ago' },
            { id: 2, type: 'course_created', title: 'New course: Python for Beginners', time: '2 hours ago' },
            { id: 3, type: 'system_update', title: 'Platform maintenance completed', time: '1 day ago' },
          ]);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [hasRole]);

  /**
   * Render student dashboard
   */
  const renderStudentDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {userProfile?.name}!</h1>
        <p className="text-primary-100">Continue your learning journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.enrolledCourses}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-success-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedCourses}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-warning-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Quizzes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeQuizzes}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-secondary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hours Learned</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalHours}</p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <Card.Header>
          <Card.Title>Quick Actions</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col">
              <BookOpen className="h-6 w-6 mb-2" />
              Browse Courses
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Award className="h-6 w-6 mb-2" />
              Take Quiz
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <TrendingUp className="h-6 w-6 mb-2" />
              View Progress
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );

  /**
   * Render instructor dashboard
   */
  const renderInstructorDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-success-600 to-success-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Instructor Dashboard</h1>
        <p className="text-success-100">Manage your courses and students</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">My Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-success-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-warning-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Quizzes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeQuizzes}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-secondary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <Card.Header>
          <Card.Title>Quick Actions</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              Create Course
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Award className="h-6 w-6 mb-2" />
              Create Quiz
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              View Analytics
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );

  /**
   * Render admin dashboard
   */
  const renderAdminDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-secondary-100">Platform overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-success-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-warning-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Instructors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalInstructors}</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-secondary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSpinner center text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {hasRole('student') && renderStudentDashboard()}
      {hasRole('instructor') && renderInstructorDashboard()}
      {hasRole('admin') && renderAdminDashboard()}

      {/* Recent Activity */}
      <Card>
        <Card.Header>
          <Card.Title>Recent Activity</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Dashboard;
