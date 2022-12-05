/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Carousel, Space, Spin } from 'antd';
import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import SlicePreview from '../../components/toanntt/SlicePreview';
import { MyPresent } from './mock';
import './carousel.css';

const contentStyle = {
  margin: 0,
  //   height: '460px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
};
const WaitingHostPage = () => {
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
        <p className='btn'>Pin: APTX-4869</p>

        <div className='example'>
          <Spin tip='Waiting other player' size='large'>
            <div className='content' />
          </Spin>
        </div>

        <Button type='primary' htmlType='submit' className='btn'>
          Start Game
        </Button>
      </section>
    </MainLayout>
  );
};
export default WaitingHostPage;
