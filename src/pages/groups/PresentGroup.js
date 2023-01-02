import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Divider } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';

import GroupPresentPageCard from '../../components/group/GroupPresentPageCard';
import { useGetListOwnerGroupQuery } from '../../app/groupService';

const PresentGroupPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetListOwnerGroupQuery();
  console.log('group: ', data);

  const [selectedGroupName, setSelectedGroupName] = useState('');
  const handleSelectGroup = (group) => {
    console.log('selected group: ', group);
    setSelectedGroupName(group.groupName);
  };

  const handleStartGroupPresent = () => {
    navigate('/presentation/group/host/waiting');
  };

  return (
    <Content>
      <MainLayout>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <section className='courses container'>
            <h1 className='heading' span={12}>
              Your Owner Groups
            </h1>

            <Row gutter={[16, 16]}>
              {data.data.map((group) => (
                <Col span={8} key={group._id}>
                  <GroupPresentPageCard groupData={group} canPresent id={group._id} handleSelect={handleSelectGroup} />
                </Col>
              ))}
            </Row>
            <Divider />
            <Button type='primary' onClick={() => handleStartGroupPresent()} disabled={selectedGroupName === ''} block>
              {`Start Present: ${selectedGroupName}`}
            </Button>
          </section>
        )}
      </MainLayout>
    </Content>
  );
};
export default PresentGroupPage;
