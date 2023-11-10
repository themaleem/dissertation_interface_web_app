import ImageComponent from "./image";
import CaretForwardImage from "../public/images/caret-forward.svg";
import CaretBackwardImage from "../public/images/caret-backward.svg";

// Default page size
const PAGE_SIZE = 3;

const Pagination = ({
  pageSize,
  totalRecords,
  onPageChange,
  currentPageNumber,
}) => {
  const size = pageSize || PAGE_SIZE;
  const totalPages = Math.ceil(totalRecords / size);

  const renderPageNumbers = () => {
    const pages = [];
    pages.push(
      <button
        key="page-1"
        type="button"
        onClick={() => onPageChange(1)}
        className={`button ${currentPageNumber === 1 ? "is-active" : ""}`}
      >
        1
      </button>,
    );

    const startPage = Math.max(2, currentPageNumber - 1);
    const endPage = Math.min(totalPages - 1, currentPageNumber + 1);

    if (currentPageNumber - 1 > 2) {
      pages.push(
        <span key="ellipsis-back" className="pagination-ellipsis">
          &hellip;
        </span>,
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={`page-${i}`}
          type="button"
          onClick={() => onPageChange(i)}
          className={`button ${currentPageNumber === i ? "is-active" : ""}`}
        >
          {i}
        </button>,
      );
    }

    if (currentPageNumber + 1 < totalPages - 1) {
      pages.push(
        <span key="ellipsis-forward" className="pagination-ellipsis">
          &hellip;
        </span>,
      );
    }

    pages.push(
      <button
        key={`page-${totalPages}`}
        type="button"
        onClick={() => onPageChange(totalPages)}
        className={`button ${
          currentPageNumber === totalPages ? "is-active" : ""
        }`}
      >
        {totalPages}
      </button>,
    );

    return pages;
  };

  return (
    <div className="table-pagination is-flex is-align-items-center is-justify-content-space-between">
      <p>
        Showing {Math.min(size, totalRecords - (currentPageNumber - 1) * size)}{" "}
        of {totalRecords} results
      </p>
      <div className="pagination-btn-wrapper is-flex is-align-items-center">
        {currentPageNumber > 1 && (
          <button
            type="button"
            className="button"
            onClick={() => onPageChange(currentPageNumber - 1)}
          >
            <ImageComponent src={CaretBackwardImage} alt="Previous" />
          </button>
        )}
        {renderPageNumbers()}
        {currentPageNumber < totalPages && (
          <button
            type="button"
            className="button"
            onClick={() => onPageChange(currentPageNumber + 1)}
          >
            <ImageComponent src={CaretForwardImage} alt="next" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
