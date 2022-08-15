'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.InterpreterStatus = void 0;
(function (InterpreterStatus) {
    InterpreterStatus[InterpreterStatus["NotStarted"] = 0] = "NotStarted";
    InterpreterStatus[InterpreterStatus["Running"] = 1] = "Running";
    InterpreterStatus[InterpreterStatus["Stopped"] = 2] = "Stopped";
})(exports.InterpreterStatus || (exports.InterpreterStatus = {}));
