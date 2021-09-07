"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateSecondsFromNow = void 0;

const getDateSecondsFromNow = seconds => {
  const currentDate = new Date();
  currentDate.setSeconds(currentDate.getSeconds() + seconds);
  return currentDate.toISOString();
};

exports.getDateSecondsFromNow = getDateSecondsFromNow;