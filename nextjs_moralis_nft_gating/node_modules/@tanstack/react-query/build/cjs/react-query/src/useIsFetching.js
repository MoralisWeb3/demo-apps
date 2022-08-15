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
var shim = require('use-sync-external-store/shim');
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

function useIsFetching(arg1, arg2, arg3) {
  const [filters, options = {}] = index.parseFilterArgs(arg1, arg2, arg3);
  const queryClient = QueryClientProvider.useQueryClient({
    context: options.context
  });
  const queryCache = queryClient.getQueryCache();
  return shim.useSyncExternalStore(React__namespace.useCallback(onStoreChange => queryCache.subscribe(index.notifyManager.batchCalls(onStoreChange)), [queryCache]), () => queryClient.isFetching(filters), () => queryClient.isFetching(filters));
}

exports.useIsFetching = useIsFetching;
//# sourceMappingURL=useIsFetching.js.map
