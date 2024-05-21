import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const CustomSpinner = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner
        variant="primary"
        animation="border"
        role="status"
      >
        <span className="visually-hidden">{t('Spinner.title')}</span>
      </Spinner>
    </div>
  );
};

export default CustomSpinner;
