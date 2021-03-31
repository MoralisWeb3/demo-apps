import React, { useState } from "react";
import Moralis from "moralis";
import { useHistory } from "react-router";

export default function Search() {
  const [searchTxt, setSearchTxt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const onSearchTextChanged = (e) => setSearchTxt(e.target.value);
  const submitSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const searchAddress = searchTxt.trim().toLowerCase();
    console.log("Search:", searchAddress);
    if (searchAddress.length !== 42) {
      const msg = "not an address";
      console.log(msg);
      setError(msg);
    }

    await Moralis.Cloud.run("watchEthAddress", { address: searchAddress });
    setLoading(false);

    // navigate to address search result component
    history.push(`/address/${searchAddress}`);
  };

  return (
    <div>
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
          <button className="btn btn-outline-secondary" id="btn-search">
            Search
            {loading && (
              <>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Loading...</span>
              </>
            )}
          </button>
        </div>
        <div className="text-danger">{error}</div>
      </form>
    </div>
  );
}
