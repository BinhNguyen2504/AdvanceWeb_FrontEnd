import React from 'react';
import { Card } from 'antd';

const PresentCard = ({ content, handleClick }) => (
  <div className='site-card-border-less-wrapper'>
    <Card title={content.title} bordered={false} hoverable onClick={() => handleClick(content.id)}>
      <p>
        Number question:
        {content.numberQuestion}
      </p>
      <p>
        ID:
        {content.id}
      </p>
    </Card>
  </div>
);
export default PresentCard;
