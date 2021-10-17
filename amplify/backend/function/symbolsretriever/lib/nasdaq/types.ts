export interface CompanyInfoResponse {
  data: {
    table: { rows: CompanyInfo[] };
  };
}

export interface CompanyInfo {
  name: string;
  symbol: string;
}
