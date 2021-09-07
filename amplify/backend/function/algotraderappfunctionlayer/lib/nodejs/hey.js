"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.helloRandom = void 0;

var _uuid = require("uuid");

const helloRandom = () => {
  return `'${(0, _uuid.v4)()}' from the function lambda layer`;
};

exports.helloRandom = helloRandom;