import { useGetBrokerageConnections } from '../hooks/connections/useGetBrokerageConnections';

const ConnectedBrokerages = (props: any) => {
  const [brokerageConnections, loadingBrokerageConnections] =
    useGetBrokerageConnections();

  return (
    <div>
      <div>Connected brokerages</div>
      {brokerageConnections ? (
        <div>Your connected brokerages here: {brokerageConnections}</div>
      ) : loadingBrokerageConnections ? (
        <div>Loading brokerages</div>
      ) : (
        props.children
      )}
    </div>
  );
};

export default ConnectedBrokerages;
