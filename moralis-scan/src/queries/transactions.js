export const processTransaction = (r) => ({
    block_number: r.attributes.block_number,
    hash: r.attributes.hash,
    block_timestamp: r.attributes.block_timestamp.valueOf(),
    from_address: r.attributes.from_address,
    to_address: r.attributes.to_address,
    value: r.attributes.value,
    gas_price: r.attributes.gas_price,
  });
