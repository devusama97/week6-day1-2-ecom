'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { userService, User } from '@/services/userService';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [currentPage, search]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching users with page:', currentPage, 'search:', search);
      const response = await userService.getAllUsers(currentPage, search);
      console.log('API Response:', response);

      // Handle backend response interceptor format: { data: {...}, success: true }
      const data = response.data || response;
      const usersData = data?.users || data || [];
      const totalPagesData = data?.totalPages || 1;

      console.log('Users data:', usersData);
      console.log('Total pages:', totalPagesData);

      setUsers(Array.isArray(usersData) ? usersData : []);
      setTotalPages(totalPagesData);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearch(searchInput);
    setCurrentPage(1);
  };

  const handleBlockUser = async (userId: string) => {
    try {
      await userService.blockUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleUnblockUser = async (userId: string) => {
    try {
      await userService.unblockUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      user: 'bg-gray-100 text-gray-800',
      admin: 'bg-blue-100 text-blue-800',
      superadmin: 'bg-purple-100 text-purple-800'
    };
    return colors[role as keyof typeof colors] || colors.user;
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Users Management</h1>
            <nav className="text-xs sm:text-sm text-gray-500">
              Home {'>'} Users
            </nav>
          </div>

          {/* Search */}
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2 sm:gap-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleSearch}
              className="px-4 sm:px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm"
            >
              Search
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg border">
            <div className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold mb-4">All Users</h2>

              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-max">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium">Name</th>
                        <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium hidden sm:table-cell">Email</th>
                        <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium">Role</th>
                        <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium">Status</th>
                        <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium hidden md:table-cell">Joined</th>
                        <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users && users.length > 0 ? users.map((user) => (
                        <tr key={user._id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2 sm:px-4 font-medium text-xs sm:text-sm">{user.name}</td>
                          <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm hidden sm:table-cell truncate max-w-[150px]">{user.email}</td>
                          <td className="py-3 px-2 sm:px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-2 sm:px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                              }`}>
                              {user.isBlocked ? 'Blocked' : 'Active'}
                            </span>
                          </td>
                          <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm hidden md:table-cell">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-2 sm:px-4">
                            {user.role !== 'super_admin' && (
                              <button
                                onClick={() => user.isBlocked ? handleUnblockUser(user._id) : handleBlockUser(user._id)}
                                className={`px-2 sm:px-3 py-1 rounded text-xs font-medium ${user.isBlocked
                                  ? 'bg-green-600 text-white hover:bg-green-700'
                                  : 'bg-red-600 text-white hover:bg-red-700'
                                  }`}
                              >
                                {user.isBlocked ? 'Unblock' : 'Block'}
                              </button>
                            )}
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-500 text-sm">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-1 sm:space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-2 sm:px-3 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs sm:text-sm"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-2 sm:px-3 py-2 border rounded-lg text-xs sm:text-sm ${currentPage === page
                          ? 'bg-black text-white'
                          : 'hover:bg-gray-50'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-2 sm:px-3 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs sm:text-sm"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}