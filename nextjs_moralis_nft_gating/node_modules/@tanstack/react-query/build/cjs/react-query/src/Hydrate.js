/**
 * react-query
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var index = require('../../query-core/build/esm/index.js');
var QueryClientProvider = require('./QueryClientProvider.js');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

function useHydrate(state, options = {}) {
  const queryClient = QueryClientProvider.useQueryClient({
    context: options.context
  });
  const optionsRef = React__namespace.useRef(options);
  optionsRef.current = options; // Running hydrate again with the same queries is safe,
  // it wont overwrite or initialize existing queries,
  // relying on useMemo here is only a performance optimization.
  // hydrate can and should be run *during* render here for SSR to work properly

  React__namespace.useMemo(() => {
    if (state) {
      index.hydrate(queryClient, state, optionsRef.current);
    }
  }, [queryClient, state]);
}
const Hydrate = ({
  children,
  options,
  state
}) => {
  useHydrate(state, options);
  return children;
};

exports.Hydrate = Hydrate;
exports.useHydrate = useHydrate;
//# sourceMappingURL=Hydrate.js.map
