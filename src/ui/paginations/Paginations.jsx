import React from 'react';

const Pagination = ({ currentPage, totalPages, handleChangePage }) => {
  
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisibleButtons = 3; 

    let startPage = Math.max(currentPage - Math.floor(maxVisibleButtons / 2), 1);
    let endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(endPage - maxVisibleButtons + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleChangePage(i)}
          style={{
            backgroundColor: currentPage === i ? '#EBAC32' : 'transparent',
            color: currentPage === i ? '#fff' : '#6c757d',
            padding: '8px 12px',
            margin: '0 4px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          {i}
        </button>
      );
    }

    return (
      <>
        {startPage > 1 && (
          <button
            onClick={() => handleChangePage(1)}
            style={{
              padding: '8px 12px',
              margin: '0 4px',
              cursor: 'pointer',
              borderRadius: '4px',
              color: '#6c757d',
              backgroundColor: 'transparent',
            }}
          >
            1
          </button>
        )}
        {startPage > 2 && <span style={{ margin: '0 4px' }}>...</span>}
        {pageNumbers}
        {endPage < totalPages - 1 && <span style={{ margin: '0 4px' }}>...</span>}
        {endPage < totalPages && (
          <button
            onClick={() => handleChangePage(totalPages)}
            style={{
              padding: '8px 12px',
              margin: '0 4px',
              cursor: 'pointer',
              borderRadius: '4px',
              color: '#6c757d',
              backgroundColor: 'transparent',
            }}
          >
            {totalPages}
          </button>
        )}
      </>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <button
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '8px 12px',
          margin: '0 4px',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          border: '1px solid #EBAC32',
          borderRadius: '4px',
          backgroundColor: currentPage === 1 ? '#e9ecef' : '#ffffff',
        }}
      >
        السابق
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '8px 12px',
          margin: '0 4px',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          border: '1px solid #EBAC32',
          borderRadius: '4px',
          backgroundColor: currentPage === totalPages ? '#e9ecef' : '#ffffff',
        }}
      >
        التالي
      </button>
    </div>
  );
};

export default Pagination;
