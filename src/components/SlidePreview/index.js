import React from 'react';
import { Button, Card, Col, Row } from 'antd';

const SlicePreview = ({ content }) => (
  <div className='site-card-border-less-wrapper'>
    <Card
      title={content.content}
      bordered={false}
      extra={<Button>Next</Button>}
      style={{
        height: '400px',
        width: '100%'
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Button>{`Time: ${content.time}s`}</Button>
        </Col>
        <Col span={12}>{/* <Button>Next</Button> */}</Col>
        <Col span={12}>
          <Button block>{content.ansA}</Button>
        </Col>
        <Col span={12}>
          <Button block>{content.ansB}</Button>
        </Col>
        <Col span={12}>
          <Button block>{content.ansC}</Button>
        </Col>
        <Col span={12}>
          <Button block>{content.ansD}</Button>
        </Col>
      </Row>
    </Card>
  </div>
);
export default SlicePreview;
