import axios from 'axios';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useEffect, useRef } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import routes from '../routes.js';
import { login } from '../slices/authSlice.js';
import signUpPic from '../assets/signUpPic.jpg';

const SignUpPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const signUpSchema = yup.object().shape({
    username: yup.string()
      .min(3, t('SignUpPage.form.validation.usernameSize'))
      .max(20, t('SignUpPage.form.validation.usernameSize'))
      .required(t('SignUpPage.form.validation.required')),
    password: yup.string()
      .min(6, t('SignUpPage.form.validation.passwordSize'))
      .required(t('SignUpPage.form.validation.required')),
    confirmPassword: yup.string()
      .equals([yup.ref('password')], t('SignUpPage.form.validation.notEqualPassword'))
      .required(t('SignUpPage.form.validation.required')),
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
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={signUpSchema}
                onSubmit={(values, { setErrors }) => {
                  axios.post(routes.signupPath, values)
                    .then((response) => {
                      dispatch(login(response.data));
                      navigate(routes.chat);
                    })
                    .catch((error) => {
                      if (error.response && error.response.status === 409) {
                        setErrors({ username: t('SignUpPage.form.validation.notUniqueLogin') });
                        inputRef.current.focus();
                        return;
                      }
                      console.error(error);
                      toast.error(t('toast.networkError'));
                    });
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <Form className="w-50" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">{t('SignUpPage.title')}</h1>
                    <FloatingLabel
                      controlId="username"
                      label={t('SignUpPage.form.username')}
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        name="username"
                        autoComplete="username"
                        placeholder={t('SignUpPage.form.username')}
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.username && !!errors.username}
                        required
                        ref={inputRef}
                      />
                      <Form.Control.Feedback
                        placement="right"
                        type="invalid"
                        tooltip
                      >
                        {touched.username && errors.username}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="password"
                      label={t('SignUpPage.form.password')}
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        placeholder={t('SignUpPage.form.password')}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && !!errors.password}
                        required
                      />
                      <Form.Control.Feedback
                        placement="right"
                        type="invalid"
                        tooltip
                      >
                        {touched.password && errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="confirmPassword"
                      label={t('SignUpPage.form.confirmPassword')}
                      className="mb-4"
                    >
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        autoComplete="new-password"
                        placeholder={t('SignUpPage.form.confirmPassword')}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                        required
                      />
                      <Form.Control.Feedback
                        placement="right"
                        type="invalid"
                        tooltip
                      >
                        {touched.confirmPassword && errors.confirmPassword}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="w-100"
                    >
                      {t('SignUpPage.form.submitBtn')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
