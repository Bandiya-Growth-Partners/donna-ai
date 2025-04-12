import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock } from 'lucide-react';

const AddCaseForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    applicationNumber: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    applicationType: '',
    applicationDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically save the data to your backend
    // Then close the form
    onClose();
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 500 } }
  };

  // Application types for the dropdown
  const applicationTypes = [
    { id: 'trademark', name: 'Trademark' },
    { id: 'patent', name: 'Patent' },
    { id: 'copyright', name: 'Copyright' },
    { id: 'design', name: 'Design Patent' },
    { id: 'trade_secret', name: 'Trade Secret' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            variants={modalVariants}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">Add New Case</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="applicationNumber" className="block text-sm font-medium text-gray-700">Application Number</label>
                  <input
                    type="text"
                    id="applicationNumber"
                    name="applicationNumber"
                    value={formData.applicationNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Client Name</label>
                    <input
                      type="text"
                      id="clientName"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700">Client Email</label>
                    <input
                      type="email"
                      id="clientEmail"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700">Client Phone Number</label>
                    <input
                      type="tel"
                      id="clientPhone"
                      name="clientPhone"
                      value={formData.clientPhone}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="applicationType" className="block text-sm font-medium text-gray-700">Application Type</label>
                    <select
                      id="applicationType"
                      name="applicationType"
                      value={formData.applicationType}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="" disabled>Select type</option>
                      {applicationTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="applicationDate" className="block text-sm font-medium text-gray-700">Application Date</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="applicationDate"
                      name="applicationDate"
                      value={formData.applicationDate}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Set Reminder Options</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input id="email_reminder" name="reminder_type" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                      <label htmlFor="email_reminder" className="ml-3 block text-sm font-medium text-gray-700">Email Reminder</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input id="sms_reminder" name="reminder_type" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                      <label htmlFor="sms_reminder" className="ml-3 block text-sm font-medium text-gray-700">SMS Reminder</label>
                    </div>
                    
                    <div>
                      <label htmlFor="days_before" className="block text-sm font-medium text-gray-700">Days Before to Send Reminder</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="days_before"
                          name="days_before"
                          min="1"
                          max="60"
                          placeholder="30"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Case
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Demo component to show the form
// const AddCasePage = () => {
//   const [isFormOpen, setIsFormOpen] = useState(true);
  
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <button
//         onClick={() => setIsFormOpen(true)}
//         className="px-4 py-2 bg-indigo-600 text-white rounded-md"
//       >
//         Open Add Case Form
//       </button>
      
//       <AddCaseForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
//     </div>
//   );
// };

export default AddCaseForm;