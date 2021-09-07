"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.helloRandom = void 0;

var _uuid = require("uuid");

const helloRandom = () => {
  return `Hello there ${(0, _uuid.v4)()}`;
};

exports.helloRandom = helloRandom;