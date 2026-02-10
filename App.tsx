import React, { useState } from 'react';
import { Calculator } from './pages/Calculator';
import { ProUpgrade } from './pages/ProUpgrade';

// Simple router approach without external library for simplicity in this prompt context
// or usually we use react-router-dom, but for a single file component structure requested, 
// we can just toggle state or use hash based navigation if needed. 
// However, the prompt allows multiple files. Let's use simple conditional rendering for navigation.

type Page = 'calculator' | 'pro';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('calculator');

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl overflow-hidden relative">
      <header className="bg-brand-500 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight" onClick={() => setCurrentPage('calculator')}>
            Real Profit <span className="text-brand-100 font-light">Calc</span>
          </h1>
          <nav>
            {currentPage === 'calculator' ? (
              <button 
                onClick={() => setCurrentPage('pro')}
                className="bg-white text-brand-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-brand-50 transition shadow-sm"
              >
                Nâng cấp PRO
              </button>
            ) : (
              <button 
                onClick={() => setCurrentPage('calculator')}
                className="text-white hover:text-brand-100 text-sm font-medium"
              >
                Quay lại
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto bg-slate-50">
        {currentPage === 'calculator' && <Calculator onUpgrade={() => setCurrentPage('pro')} />}
        {currentPage === 'pro' && <ProUpgrade onBack={() => setCurrentPage('calculator')} />}
      </main>
      
      <footer className="p-4 text-center text-xs text-gray-400 bg-white border-t">
        &copy; {new Date().getFullYear()} Real Profit Calculator for Sellers
      </footer>
    </div>
  );
};

export default App;