import React, { useState } from 'react';
import PropTypes from "prop-types";

import './style.css';
import Pagination from './Pagination';
import { styles } from './styles';

export default function TableView({ datas, columns, setDatas, pagesCutCount, limitChange, keys }) {
  const [order, setOrder] = useState("asc");
  const [limit, setLimit] = useState("10");
  const listColumn = Object.keys(datas[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("");
  const [query, setQuery] = useState("");

  const search = (datas, query, keys) => {
    return datas.filter((data) => keys.some((key) => data[key].toLowerCase().includes(query)))
  }

  const total = search(datas, query, keys).length;
  const indexOfLastData = currentPage * limit;
  const indexOfFirstData = indexOfLastData - limit;
  const currentDatas = search(datas, query, keys).slice(indexOfFirstData, indexOfLastData);

  const sorting = (e, column) => {
    setActiveFilter(e.target.innerText);
    if (order === "asc") {
      const sorted = [...datas].sort((a, b) => {
        if (a[column].includes("/")) {
          return new Date(a[column]).getTime() - new Date(b[column]).getTime();
        }
        else return a[column].toLowerCase() > b[column].toLowerCase() ? 1 : -1
      }
      )
      setDatas(sorted);
      setOrder("dsc");
    }
    if (order === "dsc") {
      const sorted = [...datas].sort((a, b) => {
        if (a[column].includes("/")) {
          return new Date(b[column]).getTime() - new Date(a[column]).getTime();
        }
        else return a[column].toLowerCase() < b[column].toLowerCase() ? 1 : -1
      })
      setDatas(sorted);
      setOrder("asc");
    }
  }

function rangeArray(start, end, pagesCutCount) {
  let result = [];
  const ceilling = Math.ceil(pagesCutCount / 2);
  for(let i = 1; i <= end; i++) {
    if(i-ceilling < start && i+ceilling > start){
      result.push(i);
    }
  }
  return result;
}

  const pagesCount = Math.ceil(total / limit);
  const pages = rangeArray(currentPage, pagesCount, pagesCutCount);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;
  
  return (
    <div style={styles.tableContainer}>
      <div className="table-containerLimitSearch" style={styles.tableContainerLimitSearch}>
        <div className="table-containerLimit" style={styles.tableContainerLimit}>
          <p>Show</p>
          <select name="limit" id="limit" className="table-containerSelect" style={styles.tableContainerSelect} onChange={(e) => setLimit(e.target.value)}>
            {limitChange.map((value, index) => (
              <option key={index} value={value}>{value}</option>
            ))}
          </select>
          <p>entries</p>
        </div>
        <input
          style={styles.tableContainerSearch}
          className="table-containerSearch"
          name="search"
          type="search"
          placeholder="Search...."
          onChange={(e) => {
            setQuery(e.target.value.toLowerCase())
            setCurrentPage(1);
            }} />
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={column}>
                <button
                  style={column[index] === activeFilter ? styles.activeFilter : styles.tableColumnFilter}
                  onClick={(e) => sorting(e, listColumn[index])}>
                  <p>{column}</p>
                  {columns[index] === activeFilter && (order === "asc" ? (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                  </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                  </svg>))}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentDatas.map((data, index) => (
            <tr key={index}>
              {Object.values(data).map((value, id) => (
                <td key={id}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-pagination" style={styles.tablePagination}>
        <p className="table-paginationText" style={styles.tablePaginationText}>
          Showing {indexOfFirstData + 1} to {indexOfLastData} of {search(datas, query, keys).length} entries
        </p>
        <ul className="table-paginationNav" style={styles.tablePaginationNav}>
          <Pagination
            currentPage={currentPage}
            page="First"
            onPageChange={() => setCurrentPage(1)}
            isDisabled={isFirstPage}
          />
          <Pagination
            currentPage={currentPage}
            page="Prev"
            onPageChange={() => setCurrentPage(currentPage - 1)}
            isDisabled={isFirstPage}
          />
          {pages.map((page) => (
            <Pagination
              currentPage={currentPage}
              page={page}
              key={page}
              onPageChange={(page) => setCurrentPage(page)}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            page="Next"
            onPageChange={() => setCurrentPage(currentPage + 1)}
            isDisabled={isLastPage}
          />
          <Pagination
            currentPage={currentPage}
            page="Last"
            onPageChange={() => setCurrentPage(pagesCount)}
            isDisabled={isLastPage}
          />
        </ul>
      </div>
    </div>
  )
}

TableView.defaultProps = {
  limitChange: ["10", "25", "50", "100"],
  pagesCutCount: 5
}

TableView.propTypes = {
  datas: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  setDatas: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  pagesCutCount: PropTypes.number,
  limitChange: PropTypes.array,
}