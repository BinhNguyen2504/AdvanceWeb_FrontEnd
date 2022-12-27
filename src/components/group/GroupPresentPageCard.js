/* eslint-disable no-underscore-dangle */
import { Card } from 'antd';

const GroupPresentPageCard = ({ groupData, canPresent, handleSelect }) => (
  <div className='site-card-border-less-wrapper'>
    {canPresent ? (
      <Card
        title={groupData.groupName}
        bordered={false}
        hoverable
        style={{ backgroundColor: 'Highlight' }}
        onClick={() => handleSelect(groupData)}
      >
        <p>
          Number of member:
          {groupData.member.length}
        </p>
      </Card>
    ) : (
      <Card title={groupData.groupName} bordered={false} style={{ backgroundColor: '#cbd8e3' }}>
        <p>
          Number of member:
          {groupData.member.length}
        </p>
      </Card>
    )}
  </div>
);
export default GroupPresentPageCard;
