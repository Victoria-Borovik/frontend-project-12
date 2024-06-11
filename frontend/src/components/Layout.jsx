import { Container, Navbar, Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import routes from '../routes.js';
import { logout, getIsAuth } from '../slices/authSlice.js';
import { setUiToDefault } from '../slices/uiSlice.js';

const AppHeader = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => getIsAuth(state));

  const handleClick = () => {
    dispatch(logout());
    dispatch(setUiToDefault());
  };

  return (
    <div className="d-flex flex-column h-100">
      <Navbar expand="lg" className="shadow-sm bg-white">
        <Container>
          <Navbar.Brand href={routes.chat}>{t('Layout.title')}</Navbar.Brand>
          {isAuth
            && <Button variant="primary" onClick={handleClick}>{t('Layout.btn')}</Button>}
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppHeader;
