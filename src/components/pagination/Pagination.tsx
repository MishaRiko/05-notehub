import ReactPaginate from 'react-paginate';
import type { FC } from 'react';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (selected: number) => void;
}

const Pagination: FC<PaginationProps> = ({ page, pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={e => onPageChange(e.selected + 1)}
      forcePage={page - 1}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.page}
      nextClassName={css.page}
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;
