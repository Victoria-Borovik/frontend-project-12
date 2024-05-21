import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useRemoveChannelMutation } from '../../slices/channelsApi.js';
import { useRemoveMessageMutation } from '../../slices/messagesApi.js';
import {
  getCurrentChannel,
  getChangingChannelId,
  setChangingChannel,
  setCurrentChannel,
  closeModal,
} from '../../slices/uiSlice.js';

const Remove = ({ messages }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => getCurrentChannel(state));
  const changingChannelId = useSelector((state) => getChangingChannelId(state));
  const changingChannelMessages = messages.map(({ channelId }) => channelId === changingChannelId);
  const [removeMessage] = useRemoveMessageMutation();
  const [removeChannel] = useRemoveChannelMutation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleRemove = () => {
    handleClose();
    removeChannel(changingChannelId)
      .then(() => {
        if (currentChannel.id === changingChannelId) {
          dispatch(setCurrentChannel());
        }
        dispatch(setChangingChannel(null));
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
