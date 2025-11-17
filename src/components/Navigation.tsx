import React from 'react';

interface LinkProps {
  href: string;
  label: string;
  mobile?: boolean;
  active?: boolean;
}

export const Link: React.FC<LinkProps> = ({ href, label, mobile, active }) => {
  return (
    <a
      href={href}
      className={`
        font-medium transition-colors duration-200
        ${mobile 
          ? `block w-full py-2 px-4 rounded ${
              active 
                ? 'bg-red-600 text-white dark:bg-red-700'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white'
            }`
          : `${
              active
                ? 'text-red-600 dark:text-red-500'
                : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500'
            } relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-red-600 dark:after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full`
        }
      `}
    >
      {label}
    </a>
  );
};

export const CTAButton: React.FC<{ children: React.ReactNode; primary?: boolean; href: string; }> = ({ 
  children, 
  primary = false,
  href
}) => {
  return (
    <a
      href={href}
      className={`
        inline-block px-6 py-3 rounded-md font-medium transition-all duration-200 transform hover:scale-105 text-center
        ${primary 
          ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl dark:bg-red-700 dark:hover:bg-red-600' 
          : 'bg-white text-red-600 border border-red-600 hover:bg-red-50 dark:bg-gray-800 dark:text-red-500 dark:border-red-500 dark:hover:bg-gray-700'
        }
      `}
    >
      {children}
    </a>
  );
};

export const PillLink: React.FC<{ label: string; href: string; active?: boolean }> = ({ 
  label, 
  href,
  active = false
}) => {
  return (
    <a
      href={href}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
        ${active 
          ? 'bg-red-600 text-white dark:bg-red-700' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
        }
      `}
    >
      {label}
    </a>
  );
};