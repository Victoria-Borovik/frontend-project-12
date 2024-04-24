import axios from 'axios';
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

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice.js';

import routes from '../routes.js';
import logInPic from '../assets/logInPic.jpg';

const LogInPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthFailed, setIsAuthFailed] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef, isAuthFailed]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      setIsAuthFailed(false);
      axios.post(routes.loginPath, values)
        .then((response) => {
          dispatch(login(response.data));
          navigate(routes.chat);
        })
        .catch((error) => {
          setIsAuthFailed(true);
          console.log(error);
        });
    },
  });
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5 row">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={logInPic}
                  alt={t('LogInPage.logo')}
                  className="rounded-circle"
                />
              </div>
              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center mb-4">
                  {t('LogInPage.title')}
                </h1>
                <FloatingLabel
                  controlId="username"
                  label={t('LogInPage.form.username')}
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('LogInPage.form.username')}
                    isInvalid={isAuthFailed}
                    ref={inputRef}
                    onChange={formik.handleChange}
                    value={formik.username}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="password"
                  label={t('LogInPage.form.password')}
                  className="mb-4"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    autoComplete="password"
                    required
                    placeholder={t('LogInPage.form.password')}
                    isInvalid={isAuthFailed}
                    onChange={formik.handleChange}
                    value={formik.password}
                  />
                  <Form.Control.Feedback tooltip type="invalid">
                    {t('LogInPage.form.invalid')}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  {t('LogInPage.form.submitBtm')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('LogInPage.footer.message')}</span>
                {' '}
                <a href={routes.signup}>{t('LogInPage.footer.link')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LogInPage;
