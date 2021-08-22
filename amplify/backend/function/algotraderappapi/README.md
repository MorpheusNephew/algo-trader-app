# AlgoTrader API

- [AlgoTrader API](#algotrader-api)
  - [Endpoints](#endpoints)
    - [Connections](#connections)
      - [Types](#types)

## Endpoints

All endpoints have the prefix `/api`

### Connections

prefix: `/connections`

| Request path   | Description                     | Parameters                                   | Notes                                |
| -------------- | ------------------------------- | -------------------------------------------- | ------------------------------------ |
| `GET /`        | Gets all connections for a user |                                              | Returns type `IConnectionResponse[]` |
| `POST /`       | Creates a connection for a user | Body will be of type `IConnection`           |                                      |
| `DELETE /<id>` | Deletes a connection for a user | id will be the `id` of `IConnectionResponse` |                                      |

#### Types

TConnection (currently only td, but in the future can contain other brokerages)

```typescript
type TConnection = 'td';
```

IConnection

```typescript
interface IConnection {
  accessToken: 'string';
  accessTokenExpiration: 'string';
  refreshToken: 'string';
  refreshTokenExpiration: 'string';
  type: 'TConnection';
}
```

IConnectionResponse

```typescript
interface IConnectionResponse {
  id: 'string';
  type: 'TConnection';
}
```
