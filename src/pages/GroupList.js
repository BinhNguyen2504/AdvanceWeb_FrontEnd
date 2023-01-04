import { Form, Input, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useGetListJoinedGroupQuery, useGetListOwnerGroupQuery } from '../app/groupService';

import { axiosClient } from '../api/client';
import GroupItem from '../components/GroupItem';
import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const GroupList = () => {
  const { data: joinedGroup, isLoading: b } = useGetListJoinedGroupQuery();
  const { data: ownerGroup, isLoading: a } = useGetListOwnerGroupQuery();
  const joinGroup = async (values) => {
    axiosClient.get(values.link);
  };

  return (
    <Content>
      <MainLayout>
        {!a && !b ? (
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
              {joinedGroup.data.map((group) => (
                <GroupItem data={group} key={group._id} />
              ))}
            </div>
            <br />
            <h1 className='heading' span={12}>
              Owner groups
            </h1>
            <div className='box-container'>
              {ownerGroup.data.map((group) => (
                <GroupItem data={group} key={group._id} />
              ))}
            </div>
          </section>
        ) : (
          'Loading...'
        )}
      </MainLayout>
    </Content>
  );
};

export default GroupList;
