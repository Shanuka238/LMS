import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/student-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/course-catalog': { label: 'Course Catalog', icon: 'BookOpen' },
    '/course-details': { label: 'Course Details', icon: 'Info' },
    '/video-player': { label: 'Video Player', icon: 'Play' },
    '/quiz-interface': { label: 'Quiz', icon: 'FileQuestion' },
    '/course-management': { label: 'Course Management', icon: 'Settings' }
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [
      { label: 'Home', path: '/student-dashboard', icon: 'Home' }
    ];

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap?.[currentPath];
      
      if (routeInfo) {
        breadcrumbs?.push({
          label: routeInfo?.label,
          path: currentPath,
          icon: routeInfo?.icon,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs?.length > 1 ? breadcrumbs : [];
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length === 0) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((item, index) => (
          <li key={item?.path} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
            )}
            
            {item?.isLast ? (
              <span className="flex items-center space-x-1 text-foreground font-medium">
                <Icon name={item?.icon} size={14} />
                <span>{item?.label}</span>
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(item?.path)}
                className="flex items-center space-x-1 hover:text-foreground transition-colors duration-300 rounded px-1 py-0.5 hover:bg-muted"
              >
                <Icon name={item?.icon} size={14} />
                <span>{item?.label}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;