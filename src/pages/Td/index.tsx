import { Add } from '@material-ui/icons';

const openAuthWindow = (e: any, authUrl: string) => {
  window.open(authUrl, 'Auth', 'width=500,height=500');
  return false;
};

const TdAmeritrade = () => {
  return (
    <div>
      <h2>TD AmeriTrade</h2>
      <div>
        This is the page that will check whether a user has a TD Ameritrade
        connection or not
      </div>
      <div onClick={(e) => openAuthWindow(e, '/connect/td')}>
        <Add />
      </div>
    </div>
  );
};

export default TdAmeritrade;
