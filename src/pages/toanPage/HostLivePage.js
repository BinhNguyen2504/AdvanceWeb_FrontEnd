/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Row, Space } from 'antd';
import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import SlicePreview from '../../components/toanntt/SlicePreview';
import { MyPresent } from './mock';
import './carousel.css';
import ColChart from '../../components/toanntt/ColChart';

const contentStyle = {
  margin: 0,
  //   height: '460px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
};
const HostLivePage = () => {
  const [present, setPresent] = useState({});

  useEffect(() => {
    setPresent(MyPresent);
  });

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <MainLayout>
      <section className='courses container'>
        <p className='btn'>Title: Presentation number 1</p>
        <div className='site-card-border-less-wrapper'>
          <Card
            title={present.title}
            bordered={false}
            extra={<Button>Next</Button>}
            style={{
              height: 600,
              width: '100%'
            }}
          >
            <ColChart />
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
      </section>
    </MainLayout>
  );
};
export default HostLivePage;
