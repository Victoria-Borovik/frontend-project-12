import { useTranslation } from 'react-i18next';
import errorPic from '../assets/errorPic.svg';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img
        className="img-fluid h-25"
        alt={t('ErrorPage.logo')}
        src={errorPic}
      />
      <h1 className="h4 text-muted">{t('ErrorPage.title')}</h1>
      <p className="text-muted">
        {t('ErrorPage.message')}
        {' '}
        <a href="/">{t('ErrorPage.link')}</a>
      </p>
    </div>
  );
};

export default ErrorPage;
