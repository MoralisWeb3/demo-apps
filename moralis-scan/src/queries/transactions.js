import moralis from "moralis";

const constructQuery = (address, pageSize, offset = 0) => {
  const fromQuery = new moralis.Query("EthTransactions");
  fromQuery.equalTo("from_address", address);

  const toQuery = new moralis.Query("EthTransactions");
  toQuery.equalTo("to_address", address);

  const query = moralis.Query.or(fromQuery, toQuery);
  query.limit(pageSize);
  query.withCount();
  if (offset) {
    query.skip(offset);
  }
  return query;
};

export const fetchTransactions = async (
  pageSize = 10,
  offset = 0,
  { address }
) => {
  if (!address) {
    return {
      results: [],
      count: 0,
    };
  }

  const query = constructQuery(address, pageSize, offset);
  const raw = await query.find();
  // console.log("raw results:", raw);

  const output = {
    results: [],
    count: raw.count,
  };
  output.results = raw.results.map((r, i) => ({
    index: offset + i + 1,
    block_number: r.attributes.block_number,
    hash: r.attributes.hash,
    block_timestamp: r.attributes.block_timestamp.valueOf(),
    from_address: r.attributes.from_address,
    to_address: r.attributes.to_address,
    value: r.attributes.value,
    gas_price: r.attributes.gas_price,
  }));
  console.log("results:", output);

  return output;
};
