import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useProfanityFilter } from '../../context/ProfanityContext.jsx';
import { setActiveChannelId, closeModal } from '../../slices/uiSlice.js';
import { useAddChannelMutation } from '../../slices/channelsApi.js';

const Add = ({ channels }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filter = useProfanityFilter();

  const [addChannel] = useAddChannelMutation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const validationSchema = yup.object().shape({
    name: yup.string().trim()
      .required(t('Modals.validation.required'))
      .min(3, t('Modals.validation.channelSize'))
      .max(20, t('Modals.validation.channelSize'))
      .notOneOf(channels.map(({ name }) => name), t('Modals.validation.unique')),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleClose();
      addChannel({ ...values, name: filter.clean(values.name) })
        .then(({ data }) => {
          dispatch(setActiveChannelId(data.id));
          toast.success(t('toast.addChannel'));
        })
        .catch((error) => {
          console.error(error);
          toast.error(t('toast.networkError'));
        });
    },
  });

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('Modals.add')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              name="name"
              id="name"
              isInvalid={!!formik.errors.name}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              {formik.errors.name}
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
      </Modal.Body>
    </Modal>
  );
};

export default Add;
