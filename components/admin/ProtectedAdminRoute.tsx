import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useIsAdmin } from '../../hooks/use-admin-auth';
import { LoadingSpinner } from '../../shared/ui/LoadingSpinner';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const isAdmin = useIsAdmin();
  const location = useLocation();
  
  // Show loading state while checking authentication
  const token = localStorage.getItem('admin-token');
  
  if (!token) {
    // Redirect to admin login with the current location
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    // If token exists but user is not admin, redirect to login
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// Component for showing loading state during auth check
export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Simulate auth check delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" text="Checking authentication..." />
      </div>
    );
  }
  
  return <ProtectedAdminRoute>{children}</ProtectedAdminRoute>;
}
