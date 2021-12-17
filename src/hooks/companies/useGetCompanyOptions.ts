import { getCompanies } from '../../clients/companies';
import { ICompany } from '../../types';
import { useEffect, useState } from 'react';

interface ICompanyOption {
  value: string;
  label: string;
}

export const useGetCompanyOptions = () => {
  const [companyOptions, setCompanyOptions] = useState<ICompanyOption[]>([]);

  useEffect(() => {
    getCompanies().then((returnedCompanies) => {
      const companies = returnedCompanies.map(({ name, symbol }: ICompany) => ({
        value: symbol,
        label: `${name} (${symbol})`,
      }));

      setCompanyOptions(companies);
    });
  }, []);

  return companyOptions;
};
