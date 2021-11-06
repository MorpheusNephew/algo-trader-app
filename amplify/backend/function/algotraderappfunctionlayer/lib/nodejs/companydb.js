"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upsertCompanyInfo = void 0;

var _dynamodb = require("./dynamodb");

var _logger = _interopRequireDefault(require("./logger"));

var _utilDynamodb = require("@aws-sdk/util-dynamodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const upsertCompanyInfo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    _logger.default.info('Upserting company info');

    const input = {
      Item: (0, _utilDynamodb.marshall)({
        id: 'company',
        sortName: 'Symbol',
        companyName: 'Company Name'
      })
    };
    return (0, _dynamodb.putItem)(input);
  });

  return function upsertCompanyInfo() {
    return _ref.apply(this, arguments);
  };
}();

exports.upsertCompanyInfo = upsertCompanyInfo;