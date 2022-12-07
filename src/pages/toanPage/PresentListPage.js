/* eslint-disable no-underscore-dangle */
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '../../layouts/MainLayout';
// import { MyPresentList } from './mock';
import { getNotNullList } from '../../utils';
import PresentCard from '../../components/PresentCard';
// import { useGetAllMyPresentQuery } from '../../app/presentationService';

const PresentListPage = () => {
  const token = localStorage.getItem('token');
  const API = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const getMyPresentation = () => API.get('presentation/mypresentation');

  // const { myPresentList, isLoading } = useGetAllMyPresentQuery();
  // console.log('my present list: ', myPresentList);
  const [presents, setPresents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      // const { data } = await API.get(`presentation/mypresentation/${id}`);
      const { data } = await getMyPresentation();
      // setPresents(MyPresentList);
      console.log('response data: ', data);
      setPresents(data.data);
    };
    fetchData();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, []);

  const handleClickCard = (id) => {
    console.log('click card: ', id);
    navigate(`/toan/presentation/preview/${id}`, { replace: false });
  };

  const presentCardList = getNotNullList(presents).map((present) => (
    <Col span={8}>
      <PresentCard key={present._id} content={present} handleClick={handleClickCard} />
    </Col>
  ));

  return (
    <MainLayout>
      <section className='courses container'>
        <Link className='btn' to='/presentation/create'>
          Create presentation
        </Link>
        <br />
        <h1 className='heading' span={12}>
          Presentation List
        </h1>
        <Row gutter={[16, 16]}>{presentCardList}</Row>
        {/* {!isLoading ? <Row gutter={[16, 16]}>{presentCardList}</Row> : <p>Loading</p>} */}
      </section>
    </MainLayout>
  );
};
export default PresentListPage;
