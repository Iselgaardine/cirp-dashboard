import React from 'react';
import { JSX } from 'react/jsx-runtime';
import { useLocation } from 'react-router-dom';

const Breadcrumb = (): JSX.Element => {
  const location = useLocation();
  
  const getBreadcrumbItems = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    if (pathnames.length === 0) return [{ text: 'Dashboard', path: '/' }];

    const items = [{ text: 'Dashboard', path: '/' }];
    let path = '';
    
    pathnames.forEach((item) => {
      path += `/${item}`;
      const text = item
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      items.push({ text, path });
    });

    return items;
  };

  return (
    <div className="flex items-center text-sm text-gray-600 mb-4">
      {getBreadcrumbItems().map((item, index, array) => (
        <React.Fragment key={item.path}>
          <span className="hover:text-blue-600 cursor-pointer">
            {item.text}
          </span>
          {index < array.length - 1 && (
            <span className="mx-2 text-gray-400">/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;