import React from "react";
import Moralis from "moralis";

const defaultQueryOptions = {
  live: false,
  skip: false,
  filter: () => {},
  onCreate: (object, vs) => [object].concat(vs ?? []),
  onUpdate: (object, vs) => vs.map((v) => (v.id === object.id ? object : v)),
};

export function useMoralisQuery(className, options = defaultQueryOptions) {
  const fetch = () => {
    setState((v) => ({ ...v, loading: true }));
    return query.current
      .find()
      .then((data) => {
        setState({ data, error: null, loading: false });
      })
      .catch((error) => {
        setState({ data: null, error, loading: false });
      });
  };

  const query = React.useRef(null);
  const [state, setState] = React.useState({
    data: null,
    error: null,
    loading: false,
    refetch: () => fetch(),
  });

  const filterFn = React.useCallback((query) => {
    if (options && typeof options.filter === "function") {
      options.filter(query);
    }
  }, (options && options.params) || []);

  React.useEffect(() => {
    if (options && options.skip) return;
    query.current = new Moralis.Query(className);

    filterFn(query.current);
    fetch();

    if (options && options.live) {
      query.current
        .subscribe()
        .then((sub) => {
          sub.on("create", (object) => {
            setState((v) => {
              const data = (options.onCreate || defaultQueryOptions.onCreate)(
                object,
                v.data
              );
              return { ...v, data };
            });
          });
          sub.on("update", (object) => {
            setState((v) => {
              const data = (options.onUpdate || defaultQueryOptions.onUpdate)(
                object,
                v.data
              );
              return { ...v, data };
            });
          });
        })
        .catch((e) => console.warn(`${className} sub error, ${e}`));
    }
  }, [className, options && options.skip, filterFn]);

  return state;
}
