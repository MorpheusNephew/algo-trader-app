"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upsertCompaniesInfo = exports.getCompaniesInfo = void 0;

var _dynamodb = require("./dynamodb");

var _logger = _interopRequireDefault(require("./logger"));

var _utilDynamodb = require("@aws-sdk/util-dynamodb");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const CHUNK = 25;

const getCompaniesInfo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    _logger.default.info('Getting companies info');

    const input = {
      ExpressionAttributeValues: (0, _utilDynamodb.marshall)({
        ':id': 'company'
      }),
      KeyConditionExpression: 'id = :id'
    };
    const {
      Items
    } = yield (0, _dynamodb.query)(input);
    return Items.map(item => {
      const {
        companyName,
        sortName
      } = (0, _utilDynamodb.unmarshall)(item);
      return {
        name: companyName,
        symbol: sortName
      };
    });
  });

  return function getCompaniesInfo() {
    return _ref.apply(this, arguments);
  };
}();

exports.getCompaniesInfo = getCompaniesInfo;

const upsertCompaniesInfo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (companiesInfo) {
    _logger.default.info('Upserting companies info', {
      companiesInfo
    });

    const companiesInfoChunks = (0, _lodash.chunk)(companiesInfo, CHUNK);

    const upsertCompaniesInfoMapper = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(function* (companies) {
        const putRequest = companies.map(company => ({
          Item: (0, _utilDynamodb.marshall)({
            id: `company`,
            sortName: company.symbol,
            companyName: company.name,
            rowType: `company:${company.symbol}`
          })
        }));

        _logger.default.info('Batch writing companies', {
          companies
        });

        return (0, _dynamodb.batchWriteItem)(putRequest);
      });

      return function upsertCompaniesInfoMapper(_x2) {
        return _ref3.apply(this, arguments);
      };
    }();

    return Promise.all(companiesInfoChunks.map(upsertCompaniesInfoMapper));
  });

  return function upsertCompaniesInfo(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.upsertCompaniesInfo = upsertCompaniesInfo;