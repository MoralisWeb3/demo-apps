import { useEffect, useState } from "react";
import Moralis from "moralis";

const defaultQueryOptions = {
  includesCount: false,
  countName: "count",
  params: {}, // query params
  postProcess: (r) => r.attributes, // function to be called on each result (result) => result,
};

/**
 * Moralis Cloud Query hook
 * @param {string} methodName name of the Cloud Function
 * @param {object} options query options
 * @returns {object} query state
 */
export function useMoralisCloudQuery(
  methodName,
  options = defaultQueryOptions
) {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    if (methodName) {
      setState((v) => ({ ...v, loading: true }));
      console.log("useMoralisCloudQuery:: options:", options);
      Moralis.Cloud.run(methodName, options.params)
        .then((data) => {
          let output = {};
          if (options.includesCount) {
            output.results = data.results.map(options.postProcess);
            output[options.countName] = data[options.countName];
          } else {
            output = data.map(options.postProcess);
          }
          console.log("useMoralisCloudQuery:: output:", output);

          setState({ data: output, error: null, loading: false });
        })
        .catch((error) => {
          setState({ data: null, error, loading: false });
        });
    }
  }, [methodName, options]);

  return state;
}
