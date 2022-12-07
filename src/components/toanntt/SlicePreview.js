/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, Card, Col, Row } from 'antd';

const SlicePreview = ({ content }) => (
  <div className='site-card-border-less-wrapper'>
    <Card
      title={content.content}
      bordered={false}
      extra={<Button>Next</Button>}
      style={{
        height: 600,
        width: '100%'
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Button ce>Count down</Button>
        </Col>
        <Col span={12}>
          <Button>Next</Button>
        </Col>
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
