import React, { useState } from "react";

export default function Search({ handleSearch }) {
  const [searchTxt, setSearchTxt] = useState("");
  const onSearchTextChanged = (e) => setSearchTxt(e.target.value);
  const submitSearch = (e) => {
    e.preventDefault();
    handleSearch(searchTxt);
  };

  return (
    <form onSubmit={submitSearch}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by address"
          aria-label="Search by address"
          aria-describedby="btn-search"
          onChange={onSearchTextChanged}
        />
        <button
          className="btn btn-outline-secondary"
          id="btn-search"
        >
          Search
        </button>
      </div>
    </form>
  );
}
