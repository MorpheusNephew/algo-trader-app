"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upsertCompaniesInfo = void 0;

var _dynamodb = require("./dynamodb");

var _logger = _interopRequireDefault(require("./logger"));

var _utilDynamodb = require("@aws-sdk/util-dynamodb");

var _lodash = require("lodash");

var _pMap = _interopRequireDefault(require("p-map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const CHUNK = 25;

const upsertCompaniesInfo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (companiesInfo) {
    _logger.default.info('Upserting companies info', {
      companiesInfo
    });

    const companiesInfoChunks = (0, _lodash.chunk)(companiesInfo, CHUNK);

    const upsertCompaniesInfoMapper = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (companies) {
        const putRequest = companies.map(company => ({
          Item: (0, _utilDynamodb.marshall)({
            id: `company:${company.symbol}`,
            sortName: company.symbol,
            companyName: company.name
          })
        }));
        return (0, _dynamodb.batchWriteItem)(putRequest);
      });

      return function upsertCompaniesInfoMapper(_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    return (0, _pMap.default)(companiesInfoChunks, upsertCompaniesInfoMapper);
  });

  return function upsertCompaniesInfo(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.upsertCompaniesInfo = upsertCompaniesInfo;