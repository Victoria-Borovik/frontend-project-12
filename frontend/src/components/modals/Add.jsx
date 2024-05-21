import { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { setCurrentChannel, closeModal } from '../../slices/uiSlice.js';
import { useAddChannelMutation } from '../../slices/channelsApi.js';

const Add = ({ channels }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, t('Modals.validation.channelSize'))
      .max(20, t('Modals.validation.channelSize'))
      .required(t('Modals.validation.required'))
      .notOneOf(channels.map(({ name }) => name), t('Modals.validation.unique')),
  });

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('Modals.add')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values) => {
            handleClose();
            addChannel(values)
              .then(({ data }) => {
                dispatch(setCurrentChannel(data));
                toast.success(t('toast.addChannel'));
              })
              .catch((error) => {
                console.error(error);
                toast.error(t('toast.networkError'));
              });
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  className="mb-2"
                  name="name"
                  id="name"
                  isInvalid={!!errors.name}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  ref={inputRef}
                />
                <Form.Label
                  for="name"
                  className="visually-hidden"
                >
                  {t('Modals.label')}
                </Form.Label>
                <Form.Control.Feedback
                  type="invalid"
                >
                  {errors.name}
                </Form.Control.Feedback>
                <div className="d-flex justify-content-end">
                  <Button
                    type="button"
                    variant="secondary"
                    className="me-2"
                    onClick={handleClose}
                  >
                    {t('Modals.cancelBtn')}
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                  >
                    {t('Modals.sendBtn')}
                  </Button>
                </div>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
