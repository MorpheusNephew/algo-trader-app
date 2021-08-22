# Database considerations

- [Database considerations](#database-considerations)
  - [08/22/2021](#08222021)
    - [AlgoTrader Table](#algotrader-table)

## 08/22/2021

### AlgoTrader Table

- access/refresh tokens with expirations for [CBOE](https://www.livevol.com/apis/technical-reference?m=reference) (only one)
- access/refresh tokens with expirations for [TD AmeriTrade](https://developer.tdameritrade.com/authentication/apis/post/token-0) (per user)

```json
{
    id: string,
    sortName: string,
    type: string,
    email?: string,
    accessToken?: string,
    accessTokenExpiration?: string,
    refreshToken?: string,
    refreshTokenExpiration?: string,
    isTd?: boolean
    isCboe?: boolean
}
```
