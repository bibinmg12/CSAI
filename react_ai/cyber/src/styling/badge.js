// // src/components/ui/badge.js
// import React from 'react';

// export function Badge({ children, color = 'gray' }) {
//   const backgroundColors = {
//     gray: '#888',
//     red: '#e55353',
//     green: '#48bb78',
//     yellow: '#ecc94b',
//   };

//   return (
//     <span style={{
//       backgroundColor: backgroundColors[color] || '#888',
//       color: 'white',
//       borderRadius: 12,
//       padding: '4px 12px',
//       fontSize: 12,
//       fontWeight: 'bold',
//       whiteSpace: 'nowrap',
//     }}>
//       {children}
//     </span>
//   );
// }


// styling/badge.js
import React from 'react';
import clsx from 'clsx';

export const Badge = ({ children, variant = 'default' }) => {
  const base = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold';
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-green-100 text-green-800',
    outline: 'border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600',
    danger: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span className={clsx(base, variants[variant] || variants.default)}>
      {children}
    </span>
  );
};
