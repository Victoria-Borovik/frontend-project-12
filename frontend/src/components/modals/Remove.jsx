import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useActiveChannelContext } from '../../context/ActiveChannelContext.jsx';
import { useRemoveChannelMutation } from '../../slices/channelsApi.js';
import { useRemoveMessageMutation } from '../../slices/messagesApi.js';
import {
  getModalChannelId,
  setModalChannelId,
  setModal,
} from '../../slices/uiSlice.js';

const Remove = ({ messages }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    activeChannelId,
    setActiveChannelId,
  } = useActiveChannelContext();
  const changingChannelId = useSelector((state) => getModalChannelId(state));
  const changingChannelMessages = messages.map(({ channelId }) => channelId === changingChannelId);
  const [removeMessage] = useRemoveMessageMutation();
  const [removeChannel] = useRemoveChannelMutation();

  const handleClose = () => {
    dispatch(setModal(null));
  };

  const handleRemove = () => {
    removeChannel(changingChannelId)
      .then(() => {
        if (activeChannelId === changingChannelId) {
          setActiveChannelId();
        }
        dispatch(setModal(null));
        dispatch(setModalChannelId(null));
        changingChannelMessages.map(({ id }) => removeMessage(id));
        toast.success(t('toast.removeChannel'));
      })
      .catch((error) => {
        console.error(error);
        toast.error(t('toast.networkError'));
      });
  };

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('Modals.remove')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          {t('Modals.removeMessage')}
        </p>
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
            variant="danger"
            onClick={handleRemove}
          >
            {t('Modals.removeBtn')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
