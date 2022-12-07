/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Carousel, Space } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import MainLayout from '../../layouts/MainLayout';
import SlicePreview from '../../components/toanntt/SlicePreview';
import { MyPresent } from './mock';
import './carousel.css';
import { getNotNullList } from '../../utils';

const contentStyle = {
  margin: 0,
  //   height: '460px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
};
const PresentPreviewPage = () => {
  const token = localStorage.getItem('token');
  const API = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const getPresentationByID = (id) => API.get(`presentation/mypresentation/${id}`);
  const { presentid } = useParams();

  const [present, setPresent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (id) => {
      // const { data } = await API.get(`presentation/mypresentation/${id}`);
      const { data } = await getPresentationByID(id);
      console.log('response data: ', data);
      console.log('question: ', data.data.questions);
      setPresent(data.data);
    };
    console.log('present id: ', presentid);
    fetchData(presentid);
    return () => {
      console.log('This will be logged on unmount');
    };
  }, []);

  // const [present, setPresent] = useState({});
  // useEffect(() => {
  //   setPresent(MyPresent);
  // });

  const handleClickCard = (id) => {
    console.log('click card: ', id);
  };

  const handleCreateGame = (id) => {
    console.log('click card: ', id);
    navigate(`/toan/presentation/host/waiting/${id}`, { replace: false });
  };

  const questionCardList = getNotNullList(present.questions).map((question) => (
    <div key={question._id}>
      <SlicePreview content={question} />
    </div>
  ));

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <MainLayout>
      <section className='courses container'>
        <p className='btn'>Title: Presentation number 1</p>
        {/* <Carousel afterChange={onChange}>
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
        </Carousel> */}
        <Carousel afterChange={onChange}>{questionCardList}</Carousel>
        <Button type='primary' htmlType='submit' className='btn' onClick={handleCreateGame(presentid)}>
          Create Game
        </Button>
      </section>
    </MainLayout>
  );
};
export default PresentPreviewPage;
