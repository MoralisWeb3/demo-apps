import { useEffect, useState } from "react";
import Moralis from "moralis";

export const getAttributes = (r) => r.attributes;

export const defaultCloudQueryOptions = {
  includesCount: false,
  countName: "count",
  params: {}, // query params
  postProcess: getAttributes, // function to be called on each result (result) => result,
  onSuccess: () => {}, // function called on success
};

/**
 * Moralis Cloud Query hook
 * @param {string} methodName name of the Cloud Function
 * @param {object} options query options
 * @returns {object} query state
 */
export function useMoralisCloudQuery(
  methodName,
  options = defaultCloudQueryOptions
) {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    if (methodName) {
      setState((v) => ({ ...v, loading: true }));
      console.log("useMoralisCloudQuery:: methodName:", methodName," options:", options);
      Moralis.Cloud.run(methodName, options.params)
        .then((data) => {
          console.log("useMoralisCloudQuery:: data:", data);
          if (data) {
            let output = {};
            if (options.includesCount) {
              output.results = options.postProcess
                ? data.results.map(options.postProcess)
                : data.results;
              output[options.countName] = data[options.countName];
            } else {
              output = options.postProcess
                ? data.map(options.postProcess)
                : data;
            }
            console.log("useMoralisCloudQuery:: output:", output);

            setState({ data: output, error: null, loading: false });
          } else {
            setState({ data: null, error: null, loading: false });
          }

          if (typeof options.onSuccess === "function") {
            options.onSuccess();
          }
        })
        .catch((error) => {
          console.error(error);
          setState({ data: null, error, loading: false });
        });
    }
  }, [methodName, options]);

  return state;
}
