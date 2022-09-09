import React from 'react';
import { useResponse } from './Response.context';

const FilterContext = React.createContext();
function getValues(state) {
  let URL = 'https://kineticcodes.pythonanywhere.com/projects/?';
  const query = [];
  for (let category in state) {
    if (category === 'loading') {
      continue;
    }
    for (let items of state[category]) {
      query.push(`${category}=${items}`);
    }
  }
  const string = query.join('&');
  URL += string;
  return URL;
}
const initialState = { tech: [], management: [], tags: [] };
export function FilterContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducerfn, initialState);
  const [, setValue, , setLoading] = useResponse();
  React.useEffect(() => {
    setLoading(true);
    fetch(getValues(state))
      .then((response) => response.json())
      .then((data) => {
        setValue(data);
        setLoading(false);
      });
  }, [state, setValue, setLoading]);
  return (
    <FilterContext.Provider value={[state, dispatch]}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const [state, dispatch] = React.useContext(FilterContext);
  return [state, dispatch];
}

function reducerfn(prevState, action) {
  switch (action.type) {
    case 'ADD':
      const basedOn = action.payload.basedOn;
      const value = action.payload.value;
      const newState = { ...prevState };
      console.log(basedOn);
      if (!newState[basedOn.toLowerCase()].includes(value)) {
        newState[basedOn.toLowerCase()].push(value);
      }

      return newState;
    case 'REMOVE':
      const name = action.payload.name;
      const category = action.payload.category;
      const newStateRemove = { ...prevState };
      newStateRemove[category] = newStateRemove[category].filter(
        (element) => element !== name
      );
      return newStateRemove;
    case 'CLEAR':
      return {
        tech: [],
        management: [],
        tags: [],
      };

    default:
      return prevState;
  }
}
