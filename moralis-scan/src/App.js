import moralis from "moralis";
import { useState } from "react";
import Search from "./components/Search";
import TransResults from "./components/TransResults";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

function App() {
  const [transResults, setTransResults] = useState([]);

  const onSearch = async (txt)=> {
    const address = txt.trim().toLowerCase();
    console.log("Search:", address);
    await moralis.Cloud.run("watchEthAddress", {address});

    const fromQuery = new moralis.Query("EthTransactions");
    fromQuery.equalTo("from_address", address);

    const toQuery = new moralis.Query("EthTransactions");
    toQuery.equalTo("to_address", address);

    const query = moralis.Query.or(fromQuery, toQuery);
    let results = await query.find();

    results = results.map(r => ({
      block_number: r.attributes.block_number,
      hash: r.attributes.hash,
      block_timestamp: r.attributes.block_timestamp.valueOf(),
      from_address: r.attributes.from_address,
      to_address: r.attributes.to_address,
      value: r.attributes.value,
      gas_price: r.attributes.gas_price,
    }));
    console.log(results);

    setTransResults(results);
  }

  return (
    <div className="container">
      <h1>Moralis Scan</h1>
      <Search handleSearch={onSearch}/>
      <TransResults trans={transResults} />
    </div>
  );
}

export default App;
