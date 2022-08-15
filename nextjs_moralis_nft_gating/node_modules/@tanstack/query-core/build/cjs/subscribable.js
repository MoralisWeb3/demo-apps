/**
 * query-core
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

class Subscribable {
  constructor() {
    this.listeners = [];
    this.subscribe = this.subscribe.bind(this);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    this.onSubscribe();
    return () => {
      this.listeners = this.listeners.filter(x => x !== listener);
      this.onUnsubscribe();
    };
  }

  hasListeners() {
    return this.listeners.length > 0;
  }

  onSubscribe() {// Do nothing
  }

  onUnsubscribe() {// Do nothing
  }

}

exports.Subscribable = Subscribable;
//# sourceMappingURL=subscribable.js.map
