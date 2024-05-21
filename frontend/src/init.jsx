import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ProfanityProvider } from './context/ProfanityContext.jsx';
import resources from './locales/index.js';
import App from './components/App.jsx';
import store from './slices/index.js';

const init = async () => {
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
      </Provider>
    </I18nextProvider>
  );
};

export default init;
