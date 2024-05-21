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
  getCurrentChannel,
  setCurrentChannel,
  openAddModal,
  openRenameModal,
  openRemoveModal,
} from '../slices/uiSlice.js';

const ChannelsList = ({ channels, channelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filter = useProfanityFilter();

  const getBtnClass = (id) => cn(
    'w-100 rounded-0 text-start text-truncate btn',
    { 'btn-secondary': channelId === id },
  );

  return (
    <Nav
      as="ul"
      className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels && channels.map(({ id, name, removable }) => {
        if (removable) {
          return (
            <Nav.Item
              as="li"
              className="w-100"
              key={id}
            >
              <Dropdown
                as={ButtonGroup}
                className="d-flex"
              >
                <button
                  type="button"
                  className={getBtnClass(id)}
                  onClick={() => dispatch(setCurrentChannel({ id, name }))}
                >
                  <span className="me-1">#</span>
                  {filter.clean(name)}
                </button>
                <Dropdown.Toggle
                  split
                  variant={cn({ secondary: channelId === id })}
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
            </Nav.Item>
          );
        }
        return (
          <Nav.Item
            as="li"
            className="w-100"
            key={id}
          >
            <button
              type="button"
              className={getBtnClass(id)}
              onClick={() => {
                dispatch(setCurrentChannel({ id, name }));
              }}
            >
              <span className="me-1">#</span>
              {filter.clean(name)}
            </button>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

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
  const currentChannel = useSelector((state) => getCurrentChannel(state));
  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelsHeader />
      <ChannelsList channels={channels} channelId={currentChannel.id} />
    </Col>
  );
};

export default Channels;
