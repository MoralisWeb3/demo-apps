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

var index = require('../../query-core/build/esm/index.js');
var useBaseQuery = require('./useBaseQuery.js');

function useInfiniteQuery(arg1, arg2, arg3) {
  const options = index.parseQueryArgs(arg1, arg2, arg3);
  return useBaseQuery.useBaseQuery(options, index.InfiniteQueryObserver);
}

exports.useInfiniteQuery = useInfiniteQuery;
//# sourceMappingURL=useInfiniteQuery.js.map
