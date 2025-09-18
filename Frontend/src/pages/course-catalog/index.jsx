import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CourseGrid from './components/CourseGrid';

const CourseCatalog = () => {
  const location = useLocation();
  const [userRole] = useState('student'); // This would come from auth context
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;
  
  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    difficulty: [],
    priceRange: 'all',
    duration: 'all',
    rating: 0,
    sortBy: 'popularity'
  });
  
  // Mock enrolled courses for student
  const enrolledCourses = [
    { id: 1, title: "React Development", progress: 65 },
    { id: 3, title: "JavaScript Fundamentals", progress: 90 }
  ];
  
  // Mock courses data
  // Only include variables that should be shown to the frontend
  const allCourses = [
    {
      id: 1,
      title: "Complete React Development Course",
      instructor: "Sarah Johnson",
      description: "Learn React from basics to advanced concepts with hands-on projects and real-world applications. Build modern web applications with confidence.",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      rating: 4.8,
      students: 15420,
      price: 49,
      duration: "42 hours",
      difficulty: "Intermediate",
      category: "programming",
      tags: ["React", "JavaScript", "Web Development"]
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Michael Chen",
      description: "Master the principles of user interface and user experience design. Create beautiful, functional designs that users love.",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      rating: 4.9,
      students: 8930,
      price: 39,
      duration: "28 hours",
      difficulty: "Beginner",
      category: "design",
      tags: ["UI Design", "UX Design", "Figma"]
    },
    {
      id: 3,
      title: "JavaScript ES6+ Complete Guide",
      instructor: "David Rodriguez",
      description: "Deep dive into modern JavaScript features, async programming, and advanced concepts for professional development.",
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
      rating: 4.7,
      students: 22100,
      price: 0,
      duration: "35 hours",
      difficulty: "Intermediate",
      category: "programming",
      tags: ["JavaScript", "ES6", "Programming"]
    },
    {
      id: 4,
      title: "Python Data Science Bootcamp",
      instructor: "Dr. James Liu",
      description: "Learn data analysis, visualization, and machine learning with Python. Perfect for aspiring data scientists.",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      rating: 4.9,
      students: 18500,
      price: 79,
      duration: "48 hours",
      difficulty: "Advanced",
      category: "data-science",
      tags: ["Python", "Data Science", "Machine Learning"]
    },
    {
      id: 5,
      title: "Advanced CSS & Animations",
      instructor: "Tom Wilson",
      description: "Master advanced CSS techniques, animations, and modern layout systems for stunning web interfaces.",
      thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=300&fit=crop",
      rating: 4.8,
      students: 11200,
      price: 42,
      duration: "26 hours",
      difficulty: "Advanced",
      category: "programming",
      tags: ["CSS", "Animations", "Web Design"]
    }
  ];
  
  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = [...allCourses];
    
    
    return filtered;
  }, [filters]);
  
  // Calculate course counts by category
  const courseCounts = useMemo(() => {
    const counts = { all: allCourses?.length };
    allCourses?.forEach(course => {
      counts[course.category] = (counts?.[course?.category] || 0) + 1;
    });
    return counts;
  }, []);
  
  // Pagination
  const totalPages = Math.ceil(filteredCourses?.length / coursesPerPage);
  const paginatedCourses = filteredCourses?.slice(0, currentPage * coursesPerPage);
  const hasMore = currentPage < totalPages;
  
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
    setCurrentPage(1);
  };
  
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setLoading(false);
      }, 1000);
    }
  };
  
  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  // Handle URL search params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams?.get('category');
    const search = searchParams?.get('search');
    
    if (category && category !== filters?.category) {
      setFilters(prev => ({ ...prev, category }));
    }
    
    if (search && search !== filters?.search) {
      setFilters(prev => ({ ...prev, search }));
    }
  }, [location?.search]);
  
  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} userName="John Doe" />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Course Catalog</h1>
            <p className="text-muted-foreground">
              Discover and enroll in courses to advance your skills and knowledge
            </p>
          </div>
          
          {/* Main Content */}
          {/* Main Content - Course Grid fills all columns */}
          <CourseGrid
            courses={paginatedCourses}
            loading={loading}
            userRole={userRole}
            enrolledCourses={enrolledCourses}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </main>
    </div>
  );
};

export default CourseCatalog;