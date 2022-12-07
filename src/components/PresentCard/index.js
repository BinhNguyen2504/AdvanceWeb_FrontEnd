import { Card } from 'antd';
import { Link } from 'react-router-dom';

const PresentCard = ({ name, num, id }) => (
  <div className='site-card-border-less-wrapper'>
    <Card title={name} bordered={false} hoverable extra={<Link to={`/presentation/preview/${id}`}>Detail</Link>}>
      <p>
        Number question:
        {num}
      </p>
    </Card>
  </div>
);
export default PresentCard;
