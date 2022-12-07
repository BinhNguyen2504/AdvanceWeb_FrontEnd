/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Card } from 'antd';

const PresentCard = ({ content, handleClick }) => (
  <div className='site-card-border-less-wrapper'>
    <Card title={content.name} bordered={false} hoverable onClick={() => handleClick(content._id)}>
      <p>
        Number question:
        {content.numberOfQuestion}
      </p>
      <p>
        ID:
        {content._id}
      </p>
    </Card>
  </div>
);
export default PresentCard;
