import { useEffect, useState } from "react";

export const usePagination = (fetchResults, fetchParams) => {
  const [results, setResults] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [numResults, setNumResults] = useState(0)

  useEffect(() => {
    // fetch the data for this page
    const offset = (currPage - 1) * pageSize;
    fetchResults(pageSize, offset, fetchParams).then((data) => {
      const numPages = Math.ceil(data.count / pageSize) || 0;
      setTotalPages(numPages);
      setNumResults(data.count);
      setResults(data.results);
    });
  }, [currPage, pageSize, fetchParams]);

  const nextPage = () => {
    if (currPage >= totalPages) {
      // already at the last page
      return;
    }
    const nextPage = currPage + 1;
    setCurrPage(nextPage);
  };

  const prevPage = () => {
    if (currPage <= 1) {
      // already at the first page
      return;
    }
    const nextPage = currPage - 1;
    setCurrPage(nextPage);
  };

  return {
    pageSize,
    setPageSize,
    totalPages,
    currPage,
    setCurrPage,
    nextPage,
    prevPage,
    results,
    numResults,
  };
};
