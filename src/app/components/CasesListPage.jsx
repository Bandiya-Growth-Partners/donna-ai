'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, ChevronRight, Calendar, Mail, Phone, Clock } from 'lucide-react';
import AddCaseForm from './AddCaseForm';


const CasesListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCases, setFilteredCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Two separate states for filter selection and applied filters
  const [filterSelections, setFilterSelections] = useState({
    applicationType: '',
    status: '',
    startDate: '',
    endDate: ''
  });
  
  // This state will only be updated when Apply Filters is clicked
  const [appliedFilters, setAppliedFilters] = useState({
    applicationType: '',
    status: '',
    startDate: '',
    endDate: ''
  });
  
  // Mock data for cases
  const cases = [
    { 
      id: 1, 
      applicationNumber: "TM-2025-001",
      clientName: "Smith Corporation",
      clientEmail: "contact@smithcorp.com",
      clientPhone: "(555) 123-4567",
      applicationType: "Trademark",
      applicationDate: "2025-02-15",
      status: "Active",
      nextDeadline: "2025-04-20"
    },
    { 
      id: 2, 
      applicationNumber: "PT-2025-042",
      clientName: "Jane Wilson",
      clientEmail: "jwilson@example.com",
      clientPhone: "(555) 987-6543",
      applicationType: "Patent",
      applicationDate: "2025-01-28",
      status: "Pending",
      nextDeadline: "2025-03-29"
    },
    { 
      id: 3, 
      applicationNumber: "CR-2025-103",
      clientName: "Media Studios LLC",
      clientEmail: "legal@mediastudios.com",
      clientPhone: "(555) 456-7890",
      applicationType: "Copyright",
      applicationDate: "2025-03-05",
      status: "Active",
      nextDeadline: "2025-04-02"
    },
    { 
      id: 4, 
      applicationNumber: "PT-2025-078",
      clientName: "TechFirm Inc",
      clientEmail: "patents@techfirm.com",
      clientPhone: "(555) 234-5678",
      applicationType: "Patent",
      applicationDate: "2025-02-10",
      status: "Under Review",
      nextDeadline: "2025-04-10"
    },
    { 
      id: 5, 
      applicationNumber: "TM-2025-094",
      clientName: "Brand Masters Co",
      clientEmail: "info@brandmasters.com",
      clientPhone: "(555) 876-5432",
      applicationType: "Trademark",
      applicationDate: "2025-01-15",
      status: "Pending",
      nextDeadline: "2025-04-15"
    }
  ];

  // Search function - search should still work immediately
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    // Apply search with current filters
    if (query.trim() === '') {
      // If search query is empty, just apply the filters
      applyFiltersAndSearch('', appliedFilters);
    } else {
      applyFiltersAndSearch(query, appliedFilters);
    }
  };

  // Handle filter selection changes (doesn't apply them yet)
  const handleFilterChange = (name, value) => {
    setFilterSelections(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply button click handler
  const handleApplyFilters = () => {
    setAppliedFilters(filterSelections);
    applyFiltersAndSearch(searchQuery, filterSelections);
  };

  // Apply filters and search
  const applyFiltersAndSearch = (query, currentFilters) => {
    const lowercaseQuery = query.toLowerCase().trim();
    
    let filtered = cases;
    
    // Apply search if query exists
    if (lowercaseQuery) {
      filtered = filtered.filter(
        item => 
          item.applicationNumber.toLowerCase().includes(lowercaseQuery) ||
          item.clientName.toLowerCase().includes(lowercaseQuery) ||
          item.clientEmail.toLowerCase().includes(lowercaseQuery) ||
          item.applicationType.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Apply type filter
    if (currentFilters.applicationType) {
      filtered = filtered.filter(
        item => item.applicationType.toLowerCase() === currentFilters.applicationType.toLowerCase()
      );
    }
    
    // Apply status filter
    if (currentFilters.status) {
      filtered = filtered.filter(
        item => item.status.toLowerCase() === currentFilters.status.toLowerCase()
      );
    }
    
    // Apply date range filter
    if (currentFilters.startDate && currentFilters.endDate) {
      const startDate = new Date(currentFilters.startDate);
      const endDate = new Date(currentFilters.endDate);
      
      filtered = filtered.filter(item => {
        const appDate = new Date(item.applicationDate);
        return appDate >= startDate && appDate <= endDate;
      });
    } else if (currentFilters.startDate) {
      const startDate = new Date(currentFilters.startDate);
      
      filtered = filtered.filter(item => {
        const appDate = new Date(item.applicationDate);
        return appDate >= startDate;
      });
    } else if (currentFilters.endDate) {
      const endDate = new Date(currentFilters.endDate);
      
      filtered = filtered.filter(item => {
        const appDate = new Date(item.applicationDate);
        return appDate <= endDate;
      });
    }
    
    setFilteredCases(filtered);
  };

  // Clear all filters
  const clearFilters = () => {
    const emptyFilters = {
      applicationType: '',
      status: '',
      startDate: '',
      endDate: ''
    };
    
    // Clear both selection and applied filters
    setFilterSelections(emptyFilters);
    setAppliedFilters(emptyFilters);
    
    // Re-run search with empty filters
    if (searchQuery) {
      applyFiltersAndSearch(searchQuery, emptyFilters);
    } else {
      setFilteredCases([]);
    }
  };

  // Determine which cases to display
  const casesToDisplay = searchQuery || Object.values(appliedFilters).some(val => val !== '') 
    ? filteredCases 
    : cases;

  // Handle case selection
  const toggleCaseSelection = (caseItem) => {
    if (selectedCase && selectedCase.id === caseItem.id) {
      setSelectedCase(null);
    } else {
      setSelectedCase(caseItem);
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get application type badge color
  const getTypeColor = (type) => {
    switch(type) {
      case 'Trademark':
        return 'bg-purple-100 text-purple-800';
      case 'Patent':
        return 'bg-indigo-100 text-indigo-800';
      case 'Copyright':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">All Cases</h1>
          <p className="mt-1 text-sm text-gray-500">View and manage all your intellectual property cases</p>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by case number, client, email, or type..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Filter className="mr-2 h-5 w-5 text-gray-500" />
                Filter
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
          
          {/* Filter options (collapsed by default) */}
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Type</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={filterSelections.applicationType}
                    onChange={(e) => handleFilterChange('applicationType', e.target.value)}
                  >
                    <option value="">All Types</option>
                    <option value="Trademark">Trademark</option>
                    <option value="Patent">Patent</option>
                    <option value="Copyright">Copyright</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={filterSelections.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <div className="flex gap-2">
                    <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={filterSelections.startDate}
                      onChange={(e) => handleFilterChange('startDate', e.target.value)}
                    />
                    <span className="text-gray-500 self-center">to</span>
                    <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={filterSelections.endDate}
                      onChange={(e) => handleFilterChange('endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button 
                  className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-500"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
                <button 
                  className="ml-3 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Cases List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {casesToDisplay.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {casesToDisplay.map((caseItem) => (
                <li key={caseItem.id}>
                  <div 
                    className={`px-6 py-4 cursor-pointer hover:bg-gray-50 ${selectedCase && selectedCase.id === caseItem.id ? 'bg-gray-50' : ''}`}
                    onClick={() => toggleCaseSelection(caseItem)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {selectedCase && selectedCase.id === caseItem.id ? (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="font-medium text-gray-900">{caseItem.applicationNumber}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(caseItem.applicationType)}`}>
                          {caseItem.applicationType}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                          {caseItem.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <span className="truncate">{caseItem.clientName}</span>
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>
                          Deadline: {caseItem.nextDeadline}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded case details */}
                  {selectedCase && selectedCase.id === caseItem.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 py-4 bg-gray-50 border-t border-gray-100"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Client Details</h4>
                          <p className="mt-1 flex items-center text-sm text-gray-900">
                            {caseItem.clientName}
                          </p>
                          <p className="mt-1 flex items-center text-sm text-gray-500">
                            <Mail className="mr-1.5 h-4 w-4 text-gray-400" />
                            {caseItem.clientEmail}
                          </p>
                          <p className="mt-1 flex items-center text-sm text-gray-500">
                            <Phone className="mr-1.5 h-4 w-4 text-gray-400" />
                            {caseItem.clientPhone}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Application Details</h4>
                          <p className="mt-1 flex items-center text-sm text-gray-900">
                            {caseItem.applicationNumber} ({caseItem.applicationType})
                          </p>
                          <p className="mt-1 flex items-center text-sm text-gray-500">
                            <Calendar className="mr-1.5 h-4 w-4 text-gray-400" />
                            Filed: {caseItem.applicationDate}
                          </p>
                          <p className="mt-1 flex items-center text-sm text-gray-500">
                            <Clock className="mr-1.5 h-4 w-4 text-gray-400" />
                            Next Deadline: {caseItem.nextDeadline}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end space-x-3">
                        <button className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-500 border border-transparent rounded-md hover:border-indigo-300">
                          View Details
                        </button>
                        <button 
                          className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-500 border border-transparent rounded-md hover:border-indigo-300"
                          onClick={() => setIsFormOpen(true)}
                        >
                          Edit Case
                        </button>
                        <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                          Manage Reminders
                        </button>                      
                      </div>
                      <AddCaseForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
                    </motion.div>
                  )}
                </li>
              ))}
            </ul>
          ) : searchQuery || Object.values(appliedFilters).some(val => val !== '') ? (
            <div className="px-6 py-10 text-center">
              <p className="text-gray-500">No cases found matching your search criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  clearFilters();
                }}
                className="mt-2 text-indigo-600 hover:text-indigo-500"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="px-6 py-10 text-center">
              <p className="text-gray-500">No cases available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CasesListPage;