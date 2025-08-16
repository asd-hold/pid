import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../shared/ui/Button';
import { LoadingSpinner } from '../../shared/ui/LoadingSpinner';
import { Package, Eye, EyeOff, Lock, User } from 'lucide-react';

export function AdminLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Check if already logged in (simplified)
  const isLoggedIn = localStorage.getItem('admin-token');
  if (isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple validation (in real app, this would be server-side)
      if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
        // Store token (in real app, would be JWT from server)
        localStorage.setItem('admin-token', 'mock-admin-token');
        localStorage.setItem('admin-user', JSON.stringify({
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin'
        }));
        
        navigate('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl">
              <Package className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            {t('admin.login.title', 'Admin Login')}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('admin.login.subtitle', 'Sign in to your admin account')}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-card border rounded-lg p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Demo Credentials */}
            <div className="bg-muted/50 border rounded-md p-3">
              <p className="text-sm font-medium text-foreground mb-2">Demo Credentials:</p>
              <p className="text-xs text-muted-foreground">Email: admin@example.com</p>
              <p className="text-xs text-muted-foreground">Password: admin123</p>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                {t('admin.login.email', 'Email Address')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-background border rounded-md text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                {t('admin.login.password', 'Password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-background border rounded-md text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                  {t('admin.login.rememberMe', 'Remember me')}
                </label>
              </div>

              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                {t('admin.login.forgotPassword', 'Forgot password?')}
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  {t('admin.login.signingIn', 'Signing in...')}
                </>
              ) : (
                t('admin.login.signIn', 'Sign in')
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            {t('admin.login.footer', 'This is an admin-only area. Unauthorized access is prohibited.')}
          </p>
        </div>
      </div>
    </div>
  );
}
