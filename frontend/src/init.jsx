import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import { ProfanityProvider } from './context/ProfanityContext.jsx';
import resources from './locales/index.js';
import App from './components/App.jsx';
import store from './slices/index.js';
import { channelsApi } from './slices/channelsApi.js';
import { messagesApi } from './slices/messagesApi.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'production',
};

const init = async () => {
  const socket = io();
  store.subscribe(() => {
    const { isAuth } = store.getState().auth;

    if (isAuth) {
      const channelsApiPromise = store.dispatch(channelsApi.endpoints.getChannels.initiate());
      const messagesApiPromise = store.dispatch(messagesApi.endpoints.getMessages.initiate());
      const { refetch: refetchChannels } = channelsApiPromise;
      const { refetch: refetchMessages } = messagesApiPromise;

      const handleEditChannels = () => {
        refetchChannels();
        refetchMessages();
      };

      const handleEditMessages = () => {
        refetchMessages();
      };

      socket.on('newChannel', handleEditChannels);
      socket.on('renameChannel', handleEditChannels);
      socket.on('removeChannel', handleEditChannels);
      socket.on('newMessage', handleEditMessages);

      channelsApiPromise.unsubscribe();
      messagesApiPromise.unsubscribe();
    }
  });
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      debug: false,
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  return (
    <I18nextProvider i18n={i18nextInstance}>
      <Provider store={store}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <ProfanityProvider>
              <App />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
              />
            </ProfanityProvider>
          </ErrorBoundary>
        </RollbarProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default init;
