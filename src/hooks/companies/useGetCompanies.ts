import { getCompanies } from '../../clients/companies';
import { ICompany, ICompanyOption } from '../../types';
import { useEffect, useState } from 'react';

export const useGetCompanies = () => {
  const [companies, setCompanies] = useState<ICompanyOption[]>([]);

  useEffect(() => {
    getCompanies().then((returnedCompanies) => {
      const companyOptions = returnedCompanies.map(
        ({ name, symbol }: ICompany) => ({
          value: symbol,
          label: `${name} (${symbol})`,
        })
      );

      setCompanies(companyOptions);
    });
  }, []);

  return companies;
};
