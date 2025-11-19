import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Floating Navigation */}
      <nav className="pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-300 px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Brand and Navigation */}
              <div className="flex items-center space-x-8">
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-3 group"
                >
                  <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-light text-white">T</span>
                  </div>
                  <span className="text-xl font-light text-gray-900 group-hover:text-gray-700 transition-colors">
                    TaskManager
                  </span>
                </Link>
                
                <div className="flex space-x-1">
                  <Link
                    to="/dashboard"
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isActive('/dashboard')
                        ? 'bg-gray-100 text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/tasks"
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isActive('/tasks')
                        ? 'bg-gray-200 text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>Tasks</span>
                  </Link>
                </div>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-xl">
                    <span className="text-sm font-light text-white">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium text-gray-900 block leading-tight">
                      {user?.name}
                    </span>
                    <span className="text-xs text-gray-500 block leading-tight">
                      {user?.email}
                    </span>
                  </div>
                </Link>
                
                <div className="h-6 w-px bg-gray-200"></div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2.5 text-sm font-medium text-black bg-red-600 rounded-xl hover:bg-red-700 transition-all duration-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;