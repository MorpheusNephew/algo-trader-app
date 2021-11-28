import { getCompanies } from '../../clients/companies';
import { ICompany } from '../../types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

interface IFormInput {
  symbols: string[];
}

const optionsToLoad = async (inputValue: string): Promise<any[]> => {
  console.log('inputValue', inputValue);
  const companies = await getCompanies();

  console.log('companies', companies);

  return companies.map(({ symbol }: ICompany) => ({
    value: symbol,
    label: symbol,
  }));
};

export const SymbolSelector = () => {
  const { control, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log('My Symbol Selector', data);
  };

  return (
    <div>
      <div>Symbol Selector</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='symbols'
          control={control}
          render={({ field }) => (
            <AsyncSelect
              isMulti
              defaultOptions
              loadOptions={optionsToLoad}
              {...field}
            />
          )}
        />
        <input type='submit' value='Save' />
      </form>
    </div>
  );
};
