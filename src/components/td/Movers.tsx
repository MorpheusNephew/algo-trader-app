import { getMovers } from '../../clients/td';
import { SubmitHandler, useForm } from 'react-hook-form';

enum IndexEnum {
  compx = '$COMPX',
  dji = '$DJI',
  spx = '$SPX.X',
}

enum DirectionEnum {
  up = 'up',
  down = 'down',
}

enum ChangeEnum {
  value = 'value',
  percent = 'percent',
}

interface IFormInput {
  index: IndexEnum;
  direction?: DirectionEnum;
  change?: ChangeEnum;
}

export const Movers = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { index, direction, change } = data;
    console.log('data', data);

    const response = await getMovers(index, direction, change);
    console.log(response);
  };

  return (
    <div>
      <div>Movers</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Index</label>
        <select {...register('index')}>
          <option value={IndexEnum.compx}>{IndexEnum.compx}</option>
          <option value={IndexEnum.dji}>{IndexEnum.dji}</option>
          <option value={IndexEnum.spx}>{IndexEnum.spx}</option>
        </select>
        <br />
        <label>Direction</label>
        <select {...register('direction')}>
          <option value={''}>ALL</option>
          <option value={DirectionEnum.up}>
            {DirectionEnum.up.toUpperCase()}
          </option>
          <option value={DirectionEnum.down}>
            {DirectionEnum.down.toUpperCase()}
          </option>
        </select>
        <br />
        <label>Change</label>
        <select {...register('change')}>
          <option value={''}>ANY</option>
          <option value={ChangeEnum.percent}>
            {ChangeEnum.percent.toUpperCase()}
          </option>
          <option value={ChangeEnum.value}>
            {ChangeEnum.value.toUpperCase()}
          </option>
        </select>
        <br />
        <input type='submit' />
      </form>
    </div>
  );
};
