import { Link } from 'react-router-dom';
import { Row, Col, Divider, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';

import axios from 'axios';
import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import PresentCard from '../components/PresentCard';
import { useGetListPresentQuery, useGetPresentCollabQuery } from '../app/presentationService';
import { BASE_URL } from '../constants';

const PresentList = () => {
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const [ownerPresentList, setOwnerPresentList] = useState([]);
  const [colabPresentList, setColabPresentList] = useState([]);

  const getOwnerPresent = async () => {
    const { data } = await API.get('/presentation/mypresentation');
    return data;
  };

  const getColabPresent = async () => {
    const { data } = await API.get('/presentation/myCollabPresentation');
    return data;
  };

  const getPresentData = async () => {
    const ownerData = await getOwnerPresent();
    console.log('ownerData', ownerData);
    setOwnerPresentList(ownerData.data);

    const colabData = await getColabPresent();
    console.log('colabData: ', colabData);
    setColabPresentList(colabData.data);
  };

  useEffect(() => {
    getPresentData();
  }, []);

  // const { data: presentList, isLoading: a } = useGetListPresentQuery();
  // const { data: presentCollab, isLoading: b } = useGetPresentCollabQuery();
  return (
    <Content>
      <MainLayout>
        {/* {a || b ? (
          <h1>Loading...</h1>
        ) : ( */}
        <section className='courses container'>
          <Link className='btn' to='/presentation/create'>
            Create presentation
          </Link>
          <br />
          <h1 className='heading' span={12}>
            Presentation List
          </h1>

          <Typography.Title level={5}>Owner Present</Typography.Title>
          <Row gutter={[16, 16]}>
            {ownerPresentList.map((present) => (
              <Col span={8} key={present._id}>
                <PresentCard name={present.name} num={present.numberOfQuestion} id={present._id} />
              </Col>
            ))}
          </Row>
          <Divider />
          <Typography.Title level={5}>Colab Present</Typography.Title>
          <Row gutter={[16, 16]}>
            {colabPresentList.map((present) => (
              <Col span={8} key={present._id}>
                <PresentCard name={present.name} num={present.numberOfQuestion} id={present._id} />
              </Col>
            ))}
          </Row>
        </section>
        {/* )} */}
      </MainLayout>
    </Content>
  );
};
export default PresentList;
