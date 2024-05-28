import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
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

  const validationSchema = yup.object().shape({
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

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values, { setErrors }) => {
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
              <Form className="w-50" onSubmit={formik.handleSubmit}>
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
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.username && !!formik.errors.username}
                    required
                    ref={inputRef}
                  />
                  <Form.Control.Feedback
                    placement="right"
                    type="invalid"
                    tooltip
                  >
                    {formik.touched.username && formik.errors.username}
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
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                    required
                  />
                  <Form.Control.Feedback
                    placement="right"
                    type="invalid"
                    tooltip
                  >
                    {formik.touched.password && formik.errors.password}
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
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                    required
                  />
                  <Form.Control.Feedback
                    placement="right"
                    type="invalid"
                    tooltip
                  >
                    {formik.touched.confirmPassword && formik.errors.confirmPassword}
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
