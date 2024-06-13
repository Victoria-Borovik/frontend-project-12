import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useActiveChannelContext } from '../../context/ActiveChannelContext.jsx';
import { useProfanityFilter } from '../../context/ProfanityContext.jsx';
import { getModalChannelId, setModal } from '../../slices/uiSlice.js';
import { useEditChannelMutation } from '../../slices/channelsApi.js';

const Rename = ({ channels }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    activeChannelId,
    setActiveChannelId,
  } = useActiveChannelContext();
  const filter = useProfanityFilter();

  const changingChannelId = useSelector((state) => getModalChannelId(state));
  const changingChannel = channels.find(({ id }) => id === changingChannelId);
  const [editChannel] = useEditChannelMutation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const handleClose = () => {
    dispatch(setModal(null));
  };

  const validationSchema = yup.object().shape({
    name: yup.string().trim()
      .min(3, t('Modals.validation.channelSize'))
      .max(20, t('Modals.validation.channelSize'))
      .required(t('Modals.validation.required'))
      .notOneOf(channels.map(({ name }) => name), t('Modals.validation.unique')),
  });

  const formik = useFormik({
    initialValues: { name: changingChannel.name },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      dispatch(setModal());
      editChannel({ id: changingChannelId, name: filter.clean(values.name) })
        .then(() => {
          if (activeChannelId === changingChannelId) {
            setActiveChannelId(changingChannelId);
          }
          toast.success(t('toast.renameChannel'));
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
          {t('Modals.rename')}
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

export default Rename;
