import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectProducts, selectCategories, fetchCategories } from '../../features/catalog/catalogSlice';
import { LoadingSpinner } from '../../shared/ui/LoadingSpinner';
import { Button } from '../../shared/ui/Button';
import { Badge } from '../../components/ui/badge';
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Eye,
  Plus,
  Settings,
  Activity,
  DollarSign,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  recentActivity: Array<{
    id: string;
    type: 'order' | 'product' | 'user';
    message: string;
    timestamp: string;
  }>;
}

export function AdminDashboard() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentActivity: []
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories if not loaded
        if (categories.length === 0) {
          await dispatch(fetchCategories()).unwrap();
        }

        // Simulate loading other data
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Calculate stats
        const mockStats: DashboardStats = {
          totalProducts: products.length || 25,
          totalCategories: categories.length || 12,
          totalOrders: 156,
          totalUsers: 342,
          totalRevenue: 48750,
          recentActivity: [
            {
              id: '1',
              type: 'order',
              message: 'New order #ORD-001 placed by John Doe',
              timestamp: '2 minutes ago'
            },
            {
              id: '2',
              type: 'product',
              message: 'Product "Wireless Headphones" updated',
              timestamp: '15 minutes ago'
            },
            {
              id: '3',
              type: 'user',
              message: 'New user registration: jane@example.com',
              timestamp: '1 hour ago'
            },
            {
              id: '4',
              type: 'order',
              message: 'Order #ORD-002 marked as shipped',
              timestamp: '2 hours ago'
            },
            {
              id: '5',
              type: 'product',
              message: 'New product "Gaming Laptop" added',
              timestamp: '3 hours ago'
            }
          ]
        };

        setStats(mockStats);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [dispatch, categories.length, products.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/admin/products'
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: Layers,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: '/admin/categories'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/admin/orders'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      link: '/admin/users'
    },
    {
      title: 'Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      link: '/admin/analytics'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-4 w-4" />;
      case 'product':
        return <Package className="h-4 w-4" />;
      case 'user':
        return <Users className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'text-green-600 bg-green-50';
      case 'product':
        return 'text-blue-600 bg-blue-50';
      case 'user':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('admin.dashboard.title', 'Dashboard')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('admin.dashboard.subtitle', 'Welcome to your admin dashboard')}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            {t('admin.dashboard.viewSite', 'View Site')}
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            {t('admin.dashboard.settings', 'Settings')}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              {t('admin.dashboard.recentActivity', 'Recent Activity')}
            </h2>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              {t('admin.dashboard.viewAll', 'View All')}
            </Button>
          </div>
          
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            {t('admin.dashboard.quickActions', 'Quick Actions')}
          </h2>
          
          <div className="space-y-3">
            <Link to="/admin/products/new">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                {t('admin.dashboard.addProduct', 'Add Product')}
              </Button>
            </Link>
            
            <Link to="/admin/categories/new">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                {t('admin.dashboard.addCategory', 'Add Category')}
              </Button>
            </Link>
            
            <Link to="/admin/orders">
              <Button className="w-full justify-start" variant="outline">
                <ShoppingCart className="h-4 w-4 mr-2" />
                {t('admin.dashboard.manageOrders', 'Manage Orders')}
              </Button>
            </Link>
            
            <Link to="/admin/users">
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                {t('admin.dashboard.manageUsers', 'Manage Users')}
              </Button>
            </Link>
            
            <Link to="/admin/analytics">
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                {t('admin.dashboard.viewAnalytics', 'View Analytics')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-card border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {t('admin.dashboard.performance', 'Performance Overview')}
          </h2>
          <Badge variant="secondary">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12% vs last month
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">98.5%</p>
            <p className="text-sm text-muted-foreground">Uptime</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">2.3s</p>
            <p className="text-sm text-muted-foreground">Avg Load Time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">73%</p>
            <p className="text-sm text-muted-foreground">Conversion Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">4.8</p>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}
