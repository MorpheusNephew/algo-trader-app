import { CompanyInfo } from '/opt/nodejs/types';

export interface CompanyInfoResponse {
  data: {
    table: { rows: CompanyInfo[] };
  };
}
