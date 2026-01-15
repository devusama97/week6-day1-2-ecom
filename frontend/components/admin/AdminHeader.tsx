'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            console.log('Hamburger clicked!');
            console.log('onMenuClick exists?', !!onMenuClick);
            if (onMenuClick) {
              console.log('Calling onMenuClick...');
              onMenuClick();
            } else {
              console.log('onMenuClick is undefined!');
            }
          }}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 border-2 border-red-500"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="flex items-center space-x-2 sm:space-x-4 ml-auto">
          <button className="p-2 text-gray-400 hover:text-gray-600 hidden sm:block">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.1797 2.64844C17.4352 2.64844 21.7117 6.92418 21.7119 12.1797C21.7142 14.2372 21.0463 16.2397 19.8105 17.8848L19.7988 17.9014L24.959 23.0615C25.187 23.3173 25.3083 23.6506 25.2988 23.9932C25.2892 24.3364 25.1491 24.6634 24.9062 24.9062C24.6634 25.1491 24.3364 25.2892 23.9932 25.2988C23.6929 25.3072 23.4002 25.2146 23.1602 25.0381L23.0605 24.958L17.9014 19.7988L17.8848 19.8105C16.2397 21.0463 14.2372 21.7142 12.1797 21.7119C6.92418 21.7117 2.64844 17.4352 2.64844 12.1797C2.64861 6.92429 6.92429 2.64861 12.1797 2.64844ZM13.5156 5.46289C12.1875 5.1988 10.8107 5.3344 9.55957 5.85254C8.30818 6.37088 7.23787 7.24878 6.48535 8.375C5.73291 9.50113 5.33209 10.8253 5.33203 12.1797C5.33421 13.9953 6.05599 15.7367 7.33984 17.0205C8.62361 18.3042 10.3642 19.0261 12.1797 19.0283C13.5341 19.0283 14.8582 18.6265 15.9844 17.874C17.1106 17.1215 17.9885 16.0521 18.5068 14.8008C19.0252 13.5494 19.1607 12.1722 18.8965 10.8438C18.6322 9.51546 17.9801 8.29558 17.0225 7.33789C16.0647 6.38012 14.8441 5.72714 13.5156 5.46289Z" fill="#232321" stroke="#232321" strokeWidth="0.046875"/>
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hidden sm:block">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.86523 20.2734H15.1357C15.164 20.2734 15.1922 20.281 15.2168 20.2949C15.2412 20.3088 15.2618 20.3285 15.2764 20.3525C15.2909 20.3767 15.299 20.4044 15.2998 20.4326C15.3006 20.4607 15.2943 20.4888 15.2812 20.5137C14.9623 21.1065 14.4888 21.6027 13.9111 21.9482C13.3335 22.2937 12.673 22.476 12 22.4766C11.3269 22.4759 10.6665 22.2928 10.0889 21.9473C9.51137 21.6018 9.03758 21.1063 8.71875 20.5137C8.70572 20.4888 8.69939 20.4607 8.7002 20.4326C8.70104 20.4044 8.70902 20.3767 8.72363 20.3525C8.73829 20.3283 8.75948 20.3088 8.78418 20.2949C8.79663 20.2879 8.80953 20.2819 8.82324 20.2783L8.86523 20.2734ZM12 1.52344C13.245 1.52349 14.3519 2.42837 14.7568 3.78418L14.7793 3.77734L14.7549 3.78516L14.7617 3.79297C14.7743 3.80764 14.7897 3.81969 14.8066 3.8291L14.8057 3.83008L14.8086 3.83105C15.9379 4.29568 16.7941 4.92372 17.4268 5.75098C18.2846 6.87075 18.7207 8.36526 18.7207 10.1895C18.7207 11.9558 18.8769 13.0301 19.1631 13.8193C19.4495 14.6091 19.8663 15.1128 20.3818 15.7363C20.4559 15.8257 20.5333 15.9208 20.6104 16.0137C20.8085 16.253 20.9339 16.5442 20.9717 16.8525C21.0094 17.161 20.9578 17.4738 20.8232 17.7539C20.5372 18.3519 19.9338 18.7255 19.2422 18.7256H4.7627C4.11109 18.7255 3.53664 18.3965 3.23242 17.8604L3.1748 17.751L3.12891 17.6445C3.02985 17.3929 2.99506 17.1202 3.02832 16.8506C3.06639 16.5426 3.19158 16.2516 3.38965 16.0127C3.46738 15.9172 3.54411 15.8249 3.61914 15.7344C4.13504 15.1116 4.5516 14.609 4.83789 13.8193C5.12399 13.0301 5.27929 11.9555 5.2793 10.1885C5.2793 8.58866 5.59966 7.26971 6.24805 6.21582C6.8965 5.16206 7.87481 4.37053 9.19238 3.82812L9.19434 3.82715C9.21078 3.81796 9.22572 3.80603 9.23828 3.79199L9.24023 3.79395L9.24316 3.7832C9.64807 2.42869 10.7549 1.52344 12 1.52344Z" fill="#232321" stroke="#232321" strokeWidth="0.046875"/>
            </svg>
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <span className="text-xs sm:text-sm font-medium">ADMIN</span>
              <span className="text-gray-400">▼</span>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between">
                  <span>CHANGE PASSWORD</span>
                  <span>›</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                >
                  <span>LOG OUT</span>
                  <span>⎋</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}