import React from 'react';
import { Button, Card, Col, Row } from 'antd';

const SlicePreview = ({ content }) => (
  <div className='site-card-border-less-wrapper'>
    <Card
      title={content.title}
      bordered={false}
      style={{
        height: 600,
        width: '100%'
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Button block>Cau A</Button>
        </Col>
        <Col span={12}>
          <Button block>Cau B</Button>
        </Col>
        <Col span={12}>
          <Button block>Cau C</Button>
        </Col>
        <Col span={12}>
          <Button block>Cau D</Button>
        </Col>
      </Row>
    </Card>
  </div>
);
export default SlicePreview;
