import React from 'react';
import Link from 'next/link';
import { Calendar, List, Home, User, Bell, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  // if (pathname === '/login') return null; // Don't show navigation on login page
  
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Calendar className="h-8 w-8 text-indigo-600" />
          <Link href="/dashboard">
            <h1 className="ml-2 text-xl font-semibold text-gray-900">Donna</h1>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/dashboard" className={`flex items-center text-sm font-medium ${pathname === '/dashboard' ? 'text-indigo-600' : 'text-gray-700 hover:text-gray-900'}`}>
            <Home className="mr-1 h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/cases" className={`flex items-center text-sm font-medium ${pathname === '/cases' ? 'text-indigo-600' : 'text-gray-700 hover:text-gray-900'}`}>
            <List className="mr-1 h-5 w-5" />
            Cases
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Bell className="h-6 w-6" />
          </button>
          <div className="relative group">
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
              <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">JD</span>
            </button>
            <div className="hidden group-hover:block origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User className="mr-3 h-5 w-5 text-gray-400" />
                  Your Profile
                </Link>
                <Link href="/login" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                  Sign out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
