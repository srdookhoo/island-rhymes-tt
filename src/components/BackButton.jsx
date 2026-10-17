import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({
  children = 'Back to the library',
  className = 'inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-scarlet',
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    const state = window.history.state;
    if (state && typeof state.idx === 'number' && state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button type="button" onClick={handleBack} className={`${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-scarlet focus-visible:ring-offset-2`}>
      <ArrowLeft className="h-4 w-4" /> {children}
    </button>
  );
}