import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CourseGrid from './components/CourseGrid';
import { getCourses } from '../../utils/api';

const CourseCatalog = () => {
  const location = useLocation();
  const [userRole] = useState('student'); // This would come from auth context
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;
  const [allCourses, setAllCourses] = useState([]);
  
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
  
  useEffect(() => {
    async function fetchData(){
      const data = await getCourses()
      setAllCourses(data)
    }
    fetchData();
  }, []);


  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = [...allCourses];
    return filtered;
  }, [filters, allCourses]);
  
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