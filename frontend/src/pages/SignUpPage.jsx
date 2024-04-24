import { useFormik } from 'formik';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FloatingLabel,
  Button,
} from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import signUpPic from '../assets/signUpPic.jpg';

const SignUpPage = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={signUpPic}
                  className="rounded-circle"
                  alt={t('SignUpPage.logo')}
                />
              </div>
              <Form className="w-50">
                <h1 className="text-center mb-4">{t('SignUpPage.title')}</h1>
                <FloatingLabel
                  controlId="username"
                  label="Имя пользователя"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder="От 3 до 20 символов"
                    required
                    value={formik.username}
                    onChange={formik.handleChange}
                  />
                  <Form.Control.Feedback
                    placement="right"
                    type="invalid"
                    tooltip
                  >
                    Обязательное поле
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="password"
                  label="Пароль"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="username"
                    autoComplete="new-password"
                    placeholder="Не менее 6 символов"
                    required
                    value={formik.password}
                    onChange={formik.handleChange}
                  />
                  <Form.Control.Feedback
                    placement="right"
                    type="invalid"
                    tooltip
                  >
                    Обязательное поле
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="confirmPassword"
                  label="Подтвердите пароль"
                  className="mb-4"
                >
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    placeholder="Пароли должны совпадать"
                    required
                    value={formik.confirmPassword}
                    onChange={formik.handleChange}
                  />
                  <Form.Control.Feedback
                    placement="right"
                    type="invalid"
                    tooltip
                  >
                    Пароли должны совпадать
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                >
                  Зарегистрироваться
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
