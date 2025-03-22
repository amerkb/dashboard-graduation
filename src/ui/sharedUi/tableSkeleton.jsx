import React from 'react';  

export default function TableSkeleton({ cols }) {  
  return (  
    <table className="skeleton-table w-full border-collapse">  
      <thead className="skeleton-header">  
        <tr>  
          {cols.map((_, index) => (  
            <th key={index} className="border border-orange px-4 py-2">  
              <div className="py-3" style={{ width: '100%' }}></div>  
            </th>  
          ))}  
        </tr>  
      </thead>  
      <tbody>  
        {Array.from({ length: 7 }).map((_, rowIndex) => (  
          <tr key={rowIndex} className="skeleton-row border-b">  
            {cols.map((_, colIndex) => (  
              <td key={colIndex} className="skeleton-cell border border-orange px-4 py-2">  
                <div className="skeleton-box"></div>  
              </td>  
            ))}  
          </tr>  
        ))}  
      </tbody>  
    </table>  
  );  
}