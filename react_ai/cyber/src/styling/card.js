// // src/components/ui/card.js
// import React from 'react';

// export function Card({ children }) {
//   return (
//     <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 16, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
//       {children}
//     </div>
//   );
// }

// export function CardContent({ children }) {
//   return (
//     <div>
//       {children}
//     </div>
//   );
// }

// styling/card.js
import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-4 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`text-gray-800 dark:text-gray-200 ${className}`}>
    {children}
  </div>
);

