import { Col, Nav } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

import { useTranslation } from 'react-i18next';
import { useGetChannelsQuery } from '../slices/channelsApi.js';

const ChannelsList = () => {
  // Доделать, чтобы только после isLoading = false начали загружаться каналы
  const { data, isLoading } = useGetChannelsQuery();
  console.log(data);
  console.log(isLoading);
  return (
    <Nav className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {data && data.map(({ id, name }) => (
        <Nav.Item className="w-100" key={id}>
          <button type="button" className="w-100 rounded-0 text-start btn">
            <span className="me-1">#</span>
            {name}
          </button>
        </Nav.Item>
      ))}
    </Nav>
  );
};

const ChannelsHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('Channels.title')}</b>
      <button type="button" className="p-0 text-primary btn btn-group-vertical">
        <PlusSquare width="20" height="20" />
        <span className="visually-hidden">+</span>
      </button>
    </div>
  );
};

const Channels = () => (
  <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
    <ChannelsHeader />
    <ChannelsList />
  </Col>
);

export default Channels;
