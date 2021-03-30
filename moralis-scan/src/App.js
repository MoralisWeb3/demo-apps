import moralis from "moralis";
import { useState } from "react";
import Paginator from "./components/Paginator";
import Search from "./components/Search";
import TokenBalance from "./components/TokenBalance";
import TransResults from "./components/TransResults";
import { fetchTransactions } from "./queries/transactions";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

function App() {
  const [address, setAddress] = useState("");

  const onSearch = async (txt) => {
    const searchAddress = txt.trim().toLowerCase();
    console.log("Search:", searchAddress);

    await moralis.Cloud.run("watchEthAddress", { address: searchAddress });
    setAddress(searchAddress);
  };

  return (
    <div className="container">
      <h1>Moralis Scan</h1>
      <Search handleSearch={onSearch} />
      {address && (
        <div className="py-3">
          <TokenBalance address={address} />
          <Paginator fetchPage={fetchTransactions} fetchArgs={{ address }}>
            <TransResults address={address} />
          </Paginator>
        </div>
      )}
    </div>
  );
}

export default App;
