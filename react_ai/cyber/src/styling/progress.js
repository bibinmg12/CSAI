// styling/progress.js
import React from 'react';

export const Progress = ({ value, max = 100, className = '' }) => {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${className}`}>
      <div
        className="bg-blue-500 h-full transition-all duration-300 ease-in-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};
