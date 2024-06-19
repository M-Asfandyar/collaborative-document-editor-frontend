import React from 'react';

const OfflineModeIndicator = ({ isOffline }) => {
  return (
    <div>
      {isOffline ? <p>You are currently offline</p> : <p>You are online</p>}
    </div>
  );
};

export default OfflineModeIndicator;
