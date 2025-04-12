'use client';

import DashboardContent from '../components/DashboardPage';
import Navigation from '../components/Navigation';
import { useState } from 'react';
import AddCaseForm from '../components/AddCaseForm';

export default function Dashboard() {
  const [isAddCaseFormOpen, setIsAddCaseFormOpen] = useState(false);
  
  return (
    <>
      <Navigation />
      <DashboardContent onAddCase={() => setIsAddCaseFormOpen(true)} />
      <AddCaseForm isOpen={isAddCaseFormOpen} onClose={() => setIsAddCaseFormOpen(false)} />
    </>
  );
}
