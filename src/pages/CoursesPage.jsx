/**
 * Courses Page
 * Displays courses based on type (browse all, my courses, etc.)
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star,
  Play,
  CheckCircle,
  Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import LoadingSpinner from '../components/ui/LoadingSpinner';

/**
 * Courses page component
 * @param {Object} props - Component props
 * @param {string} props.type - Type of courses to display ('courses', 'my-courses')
 */
const CoursesPage = ({ type }) => {
  const { userProfile, hasRole } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'data-science', label: 'Data Science' },
  ];

  /**
   * Load courses based on type and user role
   */
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      
      try {
        // Simulate API call - replace with actual Firestore queries
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockCourses = [
          {
            id: '1',
            title: 'Introduction to React',
            description: 'Learn the fundamentals of React including components, state, and props.',
            instructor: 'John Doe',
            instructorId: 'instructor1',
            category: 'programming',
            level: 'Beginner',
            duration: '8 hours',
            studentsCount: 1234,
            rating: 4.8,
            price: 49.99,
            thumbnail: 'https://via.placeholder.com/300x200?text=React+Course',
            lessons: 24,
            isEnrolled: false,
            progress: 0,
            createdAt: '2024-01-15',
          },
          {
            id: '2',
            title: 'Advanced JavaScript Concepts',
            description: 'Deep dive into advanced JavaScript topics including closures, prototypes, and async programming.',
            instructor: 'Jane Smith',
            instructorId: 'instructor2',
            category: 'programming',
            level: 'Advanced',
            duration: '12 hours',
            studentsCount: 856,
            rating: 4.9,
            price: 79.99,
            thumbnail: 'https://via.placeholder.com/300x200?text=JavaScript+Course',
            lessons: 36,
            isEnrolled: true,
            progress: 65,
            createdAt: '2024-01-10',
          },
          {
            id: '3',
            title: 'UI/UX Design Fundamentals',
            description: 'Learn the principles of user interface and user experience design.',
            instructor: 'Mike Johnson',
            instructorId: 'instructor3',
            category: 'design',
            level: 'Beginner',
            duration: '6 hours',
            studentsCount: 567,
            rating: 4.7,
            price: 39.99,
            thumbnail: 'https://via.placeholder.com/300x200?text=UI%2FUX+Course',
            lessons: 18,
            isEnrolled: false,
            progress: 0,
            createdAt: '2024-01-20',
          },
          {
            id: '4',
            title: 'Digital Marketing Strategy',
            description: 'Comprehensive guide to digital marketing including SEO, social media, and content marketing.',
            instructor: 'Sarah Wilson',
            instructorId: 'instructor4',
            category: 'marketing',
            level: 'Intermediate',
            duration: '10 hours',
            studentsCount: 923,
            rating: 4.6,
            price: 59.99,
            thumbnail: 'https://via.placeholder.com/300x200?text=Marketing+Course',
            lessons: 30,
            isEnrolled: true,
            progress: 25,
            createdAt: '2024-01-05',
          },
          {
            id: '5',
            title: 'Data Science with Python',
            description: 'Learn data analysis, visualization, and machine learning with Python.',
            instructor: 'David Brown',
            instructorId: 'instructor5',
            category: 'data-science',
            level: 'Intermediate',
            duration: '15 hours',
            studentsCount: 1456,
            rating: 4.9,
            price: 89.99,
            thumbnail: 'https://via.placeholder.com/300x200?text=Data+Science+Course',
            lessons: 45,
            isEnrolled: false,
            progress: 0,
            createdAt: '2024-01-01',
          },
        ];

        // Filter courses based on type
        let filteredCourses = mockCourses;
        
        if (type === 'my-courses') {
          if (hasRole('student')) {
            // Show enrolled courses for students
            filteredCourses = mockCourses.filter(course => course.isEnrolled);
          } else if (hasRole('instructor')) {
            // Show instructor's own courses
            filteredCourses = mockCourses.filter(course => course.instructorId === userProfile?.uid);
          }
        }

        setCourses(filteredCourses);
        
        // Set enrolled courses for quick lookup
        const enrolled = new Set(mockCourses.filter(c => c.isEnrolled).map(c => c.id));
        setEnrolledCourses(enrolled);
        
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [type, hasRole, userProfile]);

  /**
   * Filter courses based on search term and category
   */
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  /**
   * Handle course enrollment
   * @param {string} courseId - Course ID to enroll in
   */
  const handleEnroll = async (courseId) => {
    try {
      // Simulate enrollment API call
      console.log('Enrolling in course:', courseId);
      
      // Update local state
      setEnrolledCourses(prev => new Set([...prev, courseId]));
      
      // Update course in the list
      setCourses(prev => prev.map(course => 
        course.id === courseId 
          ? { ...course, isEnrolled: true, studentsCount: course.studentsCount + 1 }
          : course
      ));
      
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  /**
   * Render course card
   * @param {Object} course - Course data
   */
  const renderCourseCard = (course) => (
    <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-200 relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(course.title)}`;
          }}
        />
        {course.isEnrolled && (
          <div className="absolute top-2 right-2 bg-success-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            Enrolled
          </div>
        )}
        {course.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
            <div className="flex items-center justify-between text-xs">
              <span>Progress: {course.progress}%</span>
              <div className="w-16 bg-gray-300 rounded-full h-1">
                <div 
                  className="bg-success-400 h-1 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Card.Content className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            {course.rating}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="mr-4">By {course.instructor}</span>
          <span className="mr-4 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {course.duration}
          </span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {course.studentsCount}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {course.level}
            </span>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
              {course.lessons} lessons
            </span>
          </div>
          
          {course.isEnrolled ? (
            <Button size="sm" className="flex items-center">
              <Play className="h-4 w-4 mr-1" />
              Continue
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg">${course.price}</span>
              <Button 
                size="sm" 
                onClick={() => handleEnroll(course.id)}
                disabled={hasRole('instructor')}
              >
                Enroll
              </Button>
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  );

  const pageTitle = type === 'my-courses' 
    ? hasRole('student') ? 'My Enrolled Courses' : 'My Created Courses'
    : 'Browse All Courses';

  if (loading) {
    return <LoadingSpinner center text="Loading courses..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
          <p className="text-gray-600 mt-1">
            {type === 'my-courses' 
              ? hasRole('student') 
                ? 'Continue your learning journey'
                : 'Manage your courses and track student progress'
              : 'Discover new skills and advance your career'
            }
          </p>
        </div>
        
        {hasRole('instructor') && type === 'my-courses' && (
          <Button className="mt-4 sm:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Create New Course
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="sm:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredCourses.length} of {courses.length} courses
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(renderCourseCard)}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'No courses available at the moment'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
