import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '@/utils/usePagination';
import '@/styles/PaginationComponent.scss';

interface Props{
    onPageChange:(page:any) => void,
    totalCount:number,
    siblingCount:number,
    currentPage:number,
    pageSize:number,
    className:string
}

const Pagination = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  }:Props) => {
  

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if(paginationRange){

      // If there are less than 2 times in pagination range we shall not render the component
      if (currentPage === 0 || paginationRange.length < 2) {
        return null;
      }
    
      const onNext = () => {
        onPageChange(currentPage + 1);
      };
    
      const onPrevious = () => {
        onPageChange(currentPage - 1);
      };
    
      let lastPage = paginationRange[paginationRange.length - 1];
      return (
        <ul
          className={classnames('pagination-container', { [className]: className })}
        >
           {/* Left navigation arrow */}
          <li
            className={classnames('pagination-item', {
              disabled: currentPage === 1
            })}
            onClick={onPrevious}
          >
            <div className="arrow left" />
          </li>
          {paginationRange?.map((pageNumber,i) => {
             
            // If the pageItem is a DOT, render the DOTS unicode character
            if (pageNumber === DOTS) {
              return <li className="pagination-item dots" key={i}>&#8230;</li>;
            }
            
            // Render our Page Pills
            return (
              <li
                className={classnames('pagination-item', {
                  selected: pageNumber === currentPage
                })}
                onClick={() => onPageChange(pageNumber)}
                key={i}
              >
                {pageNumber}
              </li>
            );
          })}
          {/*  Right Navigation arrow */}
          <li
            className={classnames('pagination-item', {
              disabled: currentPage === lastPage
            })}
            onClick={onNext}
          >
            <div className="arrow right" />
          </li>
        </ul>
      );
  }

};

export default Pagination;