import { createContext, useContext } from 'react';
import filter from 'leo-profanity';

const ProfanityContext = createContext({});

export const ProfanityProvider = ({ children }) => {
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  return (
    <ProfanityContext.Provider value={filter}>
      {children}
    </ProfanityContext.Provider>
  );
};

export const useProfanityFilter = () => useContext(ProfanityContext);
