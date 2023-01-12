import { Form, Input, Layout } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useGetListJoinedGroupQuery, useGetListOwnerGroupQuery } from '../app/groupService';

import { axiosClient } from '../api/client';
import GroupItem from '../components/GroupItem';
import MainLayout from '../layouts/MainLayout';
import { BASE_URL } from '../constants';

const { Content } = Layout;

const GroupList = () => {
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const getListJoinedAPI = async () => {
    const { data } = await API.get('/group/myjoinedgroups');
    return data;
  };

  const getOwnListGroupAPI = async () => {
    const { data } = await API.get('/group/mygroups');
    return data;
  };

  // const { data: joinedGroup, isLoading: b } = useGetListJoinedGroupQuery();
  // const { data: ownerGroup, isLoading: a } = useGetListOwnerGroupQuery();
  const joinGroup = async (values) => {
    axiosClient.get(values.link);
  };

  const [joinedGroup, setJoinedGroup] = useState([]);
  const [ownerGroup, setOwnerGroup] = useState([]);

  const getJoinGroup = async () => {
    const res = await getListJoinedAPI();
    setJoinedGroup(res.data);
  };

  const getOwnGroup = async () => {
    const res = await getOwnListGroupAPI();
    setOwnerGroup(res.data);
  };

  useEffect(() => {
    getJoinGroup();
    getOwnGroup();
  }, []);

  return (
    <Content>
      <MainLayout>
        <section className='courses container'>
          <Link className='btn' to='/groups/create'>
            Create group
          </Link>
          <Form name='invite' onFinish={joinGroup} style={{ marginBottom: '30px' }}>
            <Form.Item label='Link' name='link'>
              <Input type='text' placeholder='Invitation link' />
            </Form.Item>
          </Form>
          <br />
          <h1 className='heading' span={12}>
            Joined groups
          </h1>
          <div className='box-container'>
            {joinedGroup.map((group) => (
              <GroupItem data={group} key={group._id} />
            ))}
          </div>
          <br />
          <h1 className='heading' span={12}>
            Owner groups
          </h1>
          <div className='box-container'>
            {ownerGroup.map((group) => (
              <GroupItem data={group} key={group._id} />
            ))}
          </div>
        </section>
      </MainLayout>
    </Content>
  );
};

export default GroupList;
