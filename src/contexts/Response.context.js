import React from 'react';

const ResponseContext = React.createContext(null);

export function ResponseContextProvider({ children }) {
  const [value, setValue] = React.useState([]);
  const [loading,setLoading] = React.useState(true)
  return (
    <ResponseContext.Provider value={[value, setValue,loading,setLoading]}>
      {children}
    </ResponseContext.Provider>
  );
}

export function useResponse() {
  const [value, setValue,loading,setLoading] = React.useContext(ResponseContext);
  return [value, setValue,loading,setLoading];
}
