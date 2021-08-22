# MicroServices

- [MicroServices](#microservices)
  - [Refresh Token Refresher](#refresh-token-refresher)
  - [AlgoTrader API](#algotrader-api)
  - [Symbol Retriever](#symbol-retriever)

## Refresh Token Refresher

The token refresher is what will go through and refresh refresh tokens the day before they expire

## AlgoTrader API

This [API](../amplify/backend/function/algotraderappapi/README.md) is what the front-end application will communicate with to do things like connecting a user to a brokerage account, see account information, and adjust broker configuration

## Symbol Retriever

This will use CBOE's LiveVol API to get all current company [symbols](https://www.livevol.com/apis/technical-reference?m=reference). This should run on a schedule of when the market is open
