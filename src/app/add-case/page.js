'use client';

import { useRouter } from 'next/navigation';
import AddCaseForm from '../components/AddCaseForm';
import Navigation from '../components/Navigation';

export default function AddCasePage() {
  const router = useRouter();
  
  return (
    <>
      {/* <Navigation /> */}
      <div className=" bg-gray-50 pt-16">
        <AddCaseForm 
          isOpen={true} 
          onClose={() => router.back()} 
        />
      </div>
    </>
  );
}