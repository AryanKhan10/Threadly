import React, { useId, forwardRef } from 'react';

function TextArea({ label, className = "", ...props }, ref) {
  const id = useId();

  return (
    
    <div>
      {label && (
        <label htmlFor={id} className="text-base font-medium text-gray-900">
          {label}
        </label>
      )}
      <div className="mt-2">
        <textarea
          id={id}
          ref={ref}
          
          className={`${className}`}
          {...props}
        ></textarea>
      </div>
    </div>
  );
}

// Exporting with forwardRef to allow parent components to use ref with this component
export default forwardRef(TextArea);
