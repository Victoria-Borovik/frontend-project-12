import { Container, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AppHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100">
      <Navbar expand="lg" className="shadow-sm bg-white">
        <Container>
          <Navbar.Brand href="/">{t('Layout.title')}</Navbar.Brand>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppHeader;
