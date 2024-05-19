import React from "react";
import "../../styles/pagination.css";
import { PaginationNumber } from "../../utils/utils";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsDot } from "react-icons/bs";

const Pagination = ({
  setCurrentPage,
  totalPage,
  postPerPage,
  currentPage,
  setPostPerPage,
}) => {
  const pageNum = PaginationNumber(totalPage, postPerPage);
  const setPostPerPageHandler = (e) => {
    setPostPerPage(e.target.value);
    setCurrentPage(1);
  };
  return (
    <>
      <div className="pagination-main-div w-100 d-flex justify-content-evenly align-items-center">
        <div></div>
        <div className="pagination_numbers">
          {pageNum?.length > 0 &&
            pageNum.map((page, index) => {
              return (
                <React.Fragment key={index}>
                  <button
                    className={`${page == currentPage ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}

                    <span>
                      <BsDot
                        className={`indiactor ${
                          page === currentPage ? "active" : ""
                        }`}
                      />
                    </span>
                  </button>
                </React.Fragment>
              );
            })}
        </div>

        <form>
          <label htmlFor="row_per_page">Row Per Page</label> <br />
          <select
            name="row_per_page"
            id="row_per_page"
            onChange={setPostPerPageHandler}
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </form>
      </div>
    </>
  );
};

export default Pagination;
