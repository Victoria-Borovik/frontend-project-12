import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import CustomSpinner from '../components/Spinner.jsx';
import { logout } from '../slices/authSlice.js';
import { getModalType } from '../slices/uiSlice.js';
import { useGetChannelsQuery } from '../slices/channelsApi.js';
import { useGetMessagesQuery } from '../slices/messagesApi.js';
import getModal from '../components/modals/index.js';

const renderModal = ({ modal, channels, messages }) => {
  if (!modal) {
    return null;
  }
  const Component = getModal(modal);
  return <Component channels={channels} messages={messages} />;
};

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modal = useSelector((state) => getModalType(state));

  const {
    data: channels,
    error: channelError,
    isLoading: isChannelsLoading,
  } = useGetChannelsQuery();
  const {
    data: messages,
    error: messageError,
    isLoading: isMessagesLoading,
  } = useGetMessagesQuery();

  if (channelError || messageError) {
    if (channelError.status === 401 || messageError.status === 401) {
      dispatch(logout());
      toast.error(t('toast.userError'));
    } else {
      toast.error(t('toast.networkError'));
    }
  }

  if (isChannelsLoading || isMessagesLoading) {
    return (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <CustomSpinner />
        </Row>
      </Container>
    );
  }

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels channels={channels} />
          <Messages channels={channels} messages={messages} />
        </Row>
      </Container>
      {renderModal({ modal, channels, messages })}
    </>
  );
};

export default ChatPage;
