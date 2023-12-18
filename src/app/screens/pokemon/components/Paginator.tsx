import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons'
import { Select } from '@radix-ui/themes';

interface PaginatorProps {
  totalPages: number;
  currentPage: number;
  onChangePage: (number: number) => void;
  onOrderChange: (order: string) => void;
}

const CustomPagination: React.FC<PaginatorProps> = ({ totalPages, currentPage, onChangePage, onOrderChange }) => {
  const [displayedPages, setDisplayedPages] = useState(6); // Show only 6 pages at a time

  const handlePageClick = (pageNumber: number) => {
    onChangePage(pageNumber);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(displayedPages / 2));
    const endPage = Math.min(totalPages, startPage + displayedPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <div
          key={i}
          className={`flex items-center justify-center rounded-full p-1 text-xs h-9 w-9 cursor-pointer shadow-md`}
          style={{
            backgroundColor: currentPage === i ? 'red' : 'white',
            color: currentPage === i ? 'white' : 'black',
          }}
            onClick={() => handlePageClick(i)}
        >
          {i}
        </div>
      );
    }

    return pageNumbers;
  };

  const handleSelectChange = (value: string) => {
    onOrderChange(value)
  }

  return (
    <div className='flex justify-around items-center flex-wrap gap-3 mb-3'>
        <Select.Root defaultValue="rank" size='3' onValueChange={(value: any)=> handleSelectChange(value)}>
            <Select.Trigger variant='ghost'/>
                <Select.Content>
                    <Select.Item value="rank" className='font-bold'>Rank</Select.Item>
                    <Select.Item value="asc" className='font-bold'>Ascending</Select.Item>
                    <Select.Item value="des" className='font-bold'>Descending</Select.Item>
                </Select.Content>
            </Select.Root>

      <div className="flex gap-3">
        <div
          className={`flex items-center justify-center rounded-full p-1 text-xs h-9 w-9 cursor-pointer ${
            currentPage === 1 ? '' : 'shadow-md'
          }`}
          style={{
            backgroundColor: currentPage === 1 ? 'var(--background)' : 'white',
          }}
          onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
        >
          <ChevronLeftIcon/>
        </div>
        {generatePageNumbers()}
        <div
          className={`flex items-center justify-center rounded-full p-1 text-xs h-9 w-9 cursor-pointer ${
            currentPage === totalPages ? '' : 'shadow-md'
          }`}
          style={{
            backgroundColor: currentPage === totalPages ? 'var(--background)' : 'white',
          }}
          onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))}
        >
          <ChevronRightIcon/>
        </div>
      </div>
    </div>
  );
};

export default CustomPagination;
