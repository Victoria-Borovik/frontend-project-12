import { Formik } from 'formik';
import { useEffect, useRef } from 'react';

import {
  Col,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useProfanityFilter } from '../context/ProfanityContext.jsx';
import { useAddMessageMutation } from '../slices/messagesApi.js';
import { getUsername } from '../slices/authSlice.js';
import { getCurrentChannel } from '../slices/uiSlice.js';

const Message = ({ body, username }) => {
  const filter = useProfanityFilter();
  const messageRef = useRef();

  useEffect(() => {
    messageRef.current.scrollIntoView();
  }, [messageRef]);

  return (
    <div className="text-break mb-2" ref={messageRef}>
      <b>{username}</b>
      <span>: </span>
      <span>{filter.clean(body)}</span>
    </div>
  );
};

const MessagesBox = ({ messages }) => (
  <div id="messages-box" className="chat-messages overflow-auto px-5">
    {messages && messages
      .map(({ id, body, username }) => <Message key={id} body={body} username={username} />)}
  </div>
);

const MessagesForm = ({ username, channelId }) => {
  const { t } = useTranslation();
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef, isLoading]);

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ body: '' }}
        onSubmit={(values, { resetForm }) => {
          addMessage({ ...values, channelId, username });
          resetForm();
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
        }) => (
          <Form
            novalidate
            className="py-1 border rounded-2"
            onSubmit={handleSubmit}
          >
            <InputGroup className="has-validation">
              <Form.Control
                name="body"
                placeholder="Введите сообщение..."
                aria-label={t('Messages.inputLabel')}
                className="border-0 p-0 ps-2 form-control"
                value={values.body}
                onChange={handleChange}
                ref={inputRef}
              />
              <button
                type="submit"
                className="btn btn-group-vertical"
                disabled={isLoading || !values.body.trim().length}
              >
                <ArrowRightSquare width={20} height={20} />
                <span className="visually-hidden">{t('Messages.sendBtn')}</span>
              </button>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const MessagesHeader = ({ header, messagesCount }) => {
  const { t } = useTranslation();
  const filter = useProfanityFilter();
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># </b>
        <b>{filter.clean(header)}</b>
      </p>
      <span className="text-muted">
        {t('Messages.messagesCounter.count', { count: messagesCount })}
      </span>
    </div>
  );
};

const Messages = ({ messages }) => {
  const username = useSelector((state) => getUsername(state));
  const currentChannel = useSelector((state) => getCurrentChannel(state));
  const currentMessages = messages.filter(({ channelId }) => channelId === currentChannel.id);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader header={currentChannel.name} messagesCount={currentMessages.length} />
        <MessagesBox messages={currentMessages} />
        <MessagesForm username={username} channelId={currentChannel.id} />
      </div>
    </Col>
  );
};

export default Messages;
