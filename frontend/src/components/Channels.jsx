import { useEffect, useRef } from 'react';
import cn from 'classnames';
import {
  Col,
  Nav,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useProfanityFilter } from '../context/ProfanityContext.jsx';
import {
  getActiveChannelId,
  setActiveChannelId,
  openAddModal,
  openRenameModal,
  openRemoveModal,
} from '../slices/uiSlice.js';

const Channel = ({ channel, activeChannelId }) => {
  const { id, name, removable } = channel;
  const isActiveChannel = id === activeChannelId;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filter = useProfanityFilter();

  const ref = useRef(null);
  const activeChannelRef = isActiveChannel ? ref : null;

  useEffect(() => {
    if (activeChannelRef) {
      activeChannelRef.current.scrollIntoView();
    }
  }, [activeChannelRef]);

  const getBtnClass = () => cn(
    'w-100 rounded-0 text-start text-truncate btn',
    { 'btn-secondary': isActiveChannel },
  );

  return (
    <Nav.Item
      as="li"
      className="w-100"
      ref={activeChannelRef}
    >
      {removable ? (
        <Dropdown
          as={ButtonGroup}
          className="d-flex"
        >
          <button
            type="button"
            className={getBtnClass()}
            onClick={() => dispatch(setActiveChannelId(id))}
          >
            <span className="me-1">{t('Channels.marker')}</span>
            {filter.clean(name)}
          </button>
          <Dropdown.Toggle
            split
            variant={cn({ secondary: activeChannelId === id })}
            className="flex-grow-0"
          >
            <span className="visually-hidden">
              {t('Channels.toggleTitle')}
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              href="#"
              onClick={() => dispatch(openRemoveModal(id))}
            >
              {t('Channels.removeDropdown')}
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              onClick={() => dispatch(openRenameModal(id))}
            >
              {t('Channels.renameDropdown')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <button
          type="button"
          className={getBtnClass(id)}
          onClick={() => {
            dispatch(setActiveChannelId(id));
          }}
        >
          <span className="me-1">{t('Channels.marker')}</span>
          {filter.clean(name)}
        </button>
      )}
    </Nav.Item>
  );
};

const ChannelsList = ({ channels, activeChannelId }) => (
  <Nav
    as="ul"
    className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
  >
    {channels && channels.map((channel) => (
      <Channel key={channel.id} channel={channel} activeChannelId={activeChannelId} />
    ))}
  </Nav>
);

const ChannelsHeader = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('Channels.title')}</b>
      <button
        type="button"
        className="p-0 text-primary btn btn-group-vertical"
        onClick={() => dispatch(openAddModal())}
      >
        <PlusSquare width="20" height="20" />
        <span className="visually-hidden">+</span>
      </button>
    </div>
  );
};

const Channels = ({ channels }) => {
  const activeChannelId = useSelector((state) => getActiveChannelId(state));
  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelsHeader />
      <ChannelsList channels={channels} activeChannelId={activeChannelId} />
    </Col>
  );
};

export default Channels;
