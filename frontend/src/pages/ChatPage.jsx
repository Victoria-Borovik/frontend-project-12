import { Container, Row } from 'react-bootstrap';
import Channels from '../components/Channels.jsx';

const ChatPage = () => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      <Channels />
    </Row>
  </Container>
);

export default ChatPage;
