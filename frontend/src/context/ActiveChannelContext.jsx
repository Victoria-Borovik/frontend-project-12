import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

const ActiveChannelContext = createContext({});

export const ActiveChannelProvider = ({ children }) => {
  const defaultChannelId = '1';
  const [activeChannelId, setChannelId] = useState(defaultChannelId);
  const setActiveChannelId = useMemo(
    () => (id = defaultChannelId) => setChannelId(id),
    [],
  );
  const value = useMemo(
    () => ({ activeChannelId, setActiveChannelId }),
    [activeChannelId, setActiveChannelId],
  );

  return (
    <ActiveChannelContext.Provider value={value}>
      {children}
    </ActiveChannelContext.Provider>
  );
};

export const useActiveChannelContext = () => useContext(ActiveChannelContext);
