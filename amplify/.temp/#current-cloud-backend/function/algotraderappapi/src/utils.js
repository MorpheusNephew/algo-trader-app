"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToAuthenticatedUser = void 0;

const convertToAuthenticatedUser = user => {
  const authenticatedUser = {
    username: user.Username
  };
  user.Attributes.forEach(attribute => {
    authenticatedUser[attribute.Name] = attribute.Value;
  });
  return authenticatedUser;
};

exports.convertToAuthenticatedUser = convertToAuthenticatedUser;