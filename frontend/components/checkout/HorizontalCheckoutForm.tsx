'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalCheckoutFormProps {
  children: React.ReactNode[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  stepTitles: string[];
}

export default function HorizontalCheckoutForm({
  children,
  currentStep,
  setCurrentStep,
  stepTitles
}: HorizontalCheckoutFormProps) {
  const nextStep = () => {
    if (currentStep < children.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      {/* Progress Bar */}
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex items-center justify-between mb-2">
          {stepTitles.map((title, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index < stepTitles.length - 1 ? 'flex-1' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  index <= currentStep ? 'text-black' : 'text-gray-500'
                }`}
              >
                {title}
              </span>
              {index < stepTitles.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    index < currentStep ? 'bg-black' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentStep * 100}%)`,
            width: `${children.length * 100}%`
          }}
        >
          {children.map((child, index) => (
            <div key={index} className="w-full flex-shrink-0 p-6">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
        
        <button
          type="button"
          onClick={nextStep}
          disabled={currentStep === children.length - 1}
          className="flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}