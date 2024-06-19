import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = React.createContext();

const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();

  return (
    <NavigationContext.Provider value={navigate}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationContext, NavigationProvider };
