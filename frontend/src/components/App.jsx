import {
  BrowserRouter,
  Routes, Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../slices/authSlice.js';

import routes from '../routes.js';
import SignUpPage from '../pages/SignUpPage.jsx';
import LogInPage from '../pages/LogInPage.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import ChatPage from '../pages/ChatPage.jsx';
import Layout from './Layout.jsx';

const App = () => {
  const isAuth = useSelector((state) => getIsAuth(state));

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.chat} element={<Layout />}>
          <Route index element={isAuth ? <ChatPage /> : <SignUpPage />} />
          <Route path={routes.signup} element={<SignUpPage />} />
          <Route path={routes.login} element={<LogInPage />} />
          <Route path={routes.error} element={<ErrorPage />} />
          <Route path={routes.notDefined} element={<Navigate to={routes.error} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
