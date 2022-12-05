/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Carousel, Space } from 'antd';
import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import SlicePreview from '../../components/toanntt/SlicePreview';
import { MyPresent } from './mock';

const contentStyle = {
  margin: 0,
  //   height: '460px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
};
const PresentPreviewPage = () => {
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
        <p className='btn'>PIN: APTX-4869</p>
        <Carousel afterChange={onChange}>
          <div>
            <SlicePreview content={present} />
          </div>
          <div>
            <SlicePreview content={present} />
          </div>
          <div>
            <SlicePreview content={present} />
          </div>
          <div>
            <SlicePreview content={present} />
          </div>
        </Carousel>
        <Button type='primary' htmlType='submit' className='btn'>
          Start Game
        </Button>
      </section>
    </MainLayout>
  );
};
export default PresentPreviewPage;
