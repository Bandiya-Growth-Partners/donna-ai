import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, Search, Bell, User, LogOut } from 'lucide-react';
import AddCaseForm from './AddCaseForm'; // Assuming you have this component

const DashboardPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  // Mock data for upcoming dates
  const upcomingDates = [
    { id: 1, title: "Smith v. Johnson", type: "Trademark", date: "Mar 25, 2025", client: "Smith Corp", highlight: true },
    { id: 2, title: "Tech Innovations Patent", type: "Patent", date: "Mar 29, 2025", client: "Jane Wilson" },
    { id: 3, title: "Creative Commons Case", type: "Copyright", date: "Apr 2, 2025", client: "Media Studios" },
    { id: 4, title: "Software Patent Review", type: "Patent", date: "Apr 10, 2025", client: "TechFirm Inc" },
    { id: 5, title: "Logo Trademark Dispute", type: "Trademark", date: "Apr 15, 2025", client: "Brand Masters" },
  ];

  // Generate calendar days
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const today = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    // Important dates (mock data)
    const importantDates = [5, 12, 19, 25];

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today && month === currentMonth && year === currentYear;
      const isImportant = importantDates.includes(day);
      
      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`h-10 w-10 rounded-full flex items-center justify-center cursor-pointer 
            ${isToday ? 'bg-indigo-600 text-white' : ''} 
            ${isImportant && !isToday ? 'bg-red-100 text-red-800' : ''}`}
        >
          {day}
        </motion.div>
      );
    }

    return days;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-indigo-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">LegalCalendar</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-6 w-6" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">JD</span>
              </button>
              
              {showDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="mr-3 h-5 w-5 text-gray-400" />
                      Your Profile
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header> */}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-white rounded-xl shadow p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Calendar</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={previousMonth}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-lg font-medium text-gray-800 w-36 text-center">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button 
                  onClick={nextMonth}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Days of week */}
            <div className="grid grid-cols-7 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {renderCalendar()}
            </div>
          </motion.div>
          
          {/* Upcoming dates */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Upcoming Dates</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cases..."
                  className="pl-8 pr-4 py-2 w-full text-sm bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-4">
              {upcomingDates.map((item) => (
                <motion.div 
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border ${item.highlight ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.client}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.type === 'Trademark' ? 'bg-blue-100 text-blue-800' :
                        item.type === 'Patent' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {item.date}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <a href="#" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">View all dates</a>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Floating Action Button */}
      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </motion.button> */}
     
       
        
  
          <div className="bg-gray-50 flex items-center justify-center">
            {/* <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Open Add Case Form
            </button> */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg"
              onClick={() => setIsFormOpen(true)}
            >
              <Plus className="h-6 w-6" />
            </motion.button>
            
            <AddCaseForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
          </div>
        
      
      
      
    </div>
  );
};

export default DashboardPage;