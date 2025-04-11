
import React from 'react';

interface MapErrorProps {
  error: string;
  height: string;
  width: string;
}

const MapError: React.FC<MapErrorProps> = ({ error, height, width }) => {
  return (
    <div 
      style={{ 
        padding: '20px', 
        backgroundColor: '#f8d7da', 
        color: '#721c24', 
        textAlign: 'center',
        height,
        width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {error}
    </div>
  );
};

export default MapError;
