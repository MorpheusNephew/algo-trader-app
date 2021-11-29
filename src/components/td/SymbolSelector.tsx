import { useGetCompanyOptions } from '../../hooks/companies/useGetCompanyOptions';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

interface IFormInput {
  symbols: string[];
}

export const SymbolSelector = () => {
  const { control, handleSubmit } = useForm<IFormInput>();
  const companyOptions = useGetCompanyOptions();

  const optionsToLoad = async (inputValue: string): Promise<any[]> => {
    return companyOptions.filter(({ label }) =>
      label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

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
              placeholder='Search ticker symbols...'
              cacheOptions={true}
              defaultOptions={companyOptions}
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
