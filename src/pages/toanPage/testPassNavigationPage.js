/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Row, Space } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
const TestNaviPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/toan/presentation/host/live/1', { state: { socket: 'socket', game: 'gameData' } });
  };
  return (
    <MainLayout>
      <section className='courses container'>
        <Button onClick={handleClick}>Navigate to Live Page</Button>
      </section>
    </MainLayout>
  );
};
export default TestNaviPage;
