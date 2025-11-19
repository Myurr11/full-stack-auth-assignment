import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../services/api';
import Layout from '../components/Layout';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        taskAPI.getStats(),
        taskAPI.getTasks({ limit: 5 })
      ]);

      setStats(statsRes.data.data);
      setRecentTasks(tasksRes.data.data.tasks.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'in-progress':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'low':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-600"></div>
        </div>
      </Layout>
    );
  }

  const statusCounts = stats?.byStatus?.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {}) || {};

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <span className="text-2xl font-light text-gray-600">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
            Welcome back, {user?.name}
          </h1>
          <p className="text-lg text-gray-500 font-light">Your task overview for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Tasks */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Total Tasks</p>
                <p className="text-4xl font-light text-gray-900">{stats?.total || 0}</p>
              </div>
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Pending</p>
                <p className="text-4xl font-light text-gray-900">{statusCounts.pending || 0}</p>
              </div>
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100">
                <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">In Progress</p>
                <p className="text-4xl font-light text-gray-900">{statusCounts['in-progress'] || 0}</p>
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Completed</p>
                <p className="text-4xl font-light text-gray-900">{statusCounts.completed || 0}</p>
              </div>
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tasks Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-light text-gray-900 mb-1">Recent Tasks</h2>
                <p className="text-sm text-gray-500">Your most recent activities</p>
              </div>
              <Link
                to="/tasks"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-xl text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300"
              >
                <span>View All</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="p-8">
            {recentTasks.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-6 border border-gray-200">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">No tasks yet</h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Start organizing your work by creating your first task</p>
                <Link
                  to="/tasks"
                  className="inline-flex items-center px-6 py-3 text-base font-medium rounded-xl text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Create Your First Task
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center justify-between p-6 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-300 group"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-normal text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 ml-6 flex-shrink-0">
                      <span className={`px-4 py-2 text-sm font-medium rounded-full ${getPriorityVariant(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusVariant(task.status)}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;