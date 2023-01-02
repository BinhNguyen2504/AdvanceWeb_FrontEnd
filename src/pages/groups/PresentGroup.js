import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Button, Divider, notification } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { useRef, useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import MainLayout from '../../layouts/MainLayout';

import GroupPresentPageCard from '../../components/group/GroupPresentPageCard';
import { useGetListOwnerGroupQuery } from '../../app/groupService';
import { openNotification } from '../../utils';
import createGame from '../../api/groupAPI';

const PresentGroupPage = () => {
  const { presentid } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { data, isLoading } = useGetListOwnerGroupQuery();
  console.log('group: ', data);
  const gameData = useRef();

  const [selectedGroup, setSelectedGroup] = useState({});
  const handleSelectGroup = (group) => {
    console.log('selected group: ', group);
    setSelectedGroup(group);
  };

  const createGroupGame = async (presenID, groupID) => {
    // API tạo game : trả về
    // i.current = 0;
    console.log('insinde create group');
    const response = await createGame({
      presentationId: presenID,
      groupId: groupID
    });
    console.log('response: ', response);

    // danh sách các câu hỏi
    gameData.current = response.data;
    // setinfo(JSON.stringify(response.data.data));
    // setroomId(response.data.data.roomId);
    // SOCKET gọi lên socket tạo phòng
    // socket.current.emit('join-room', {
    //   //  Tên định danh socket - duy nhất - có thể dùng id hoặc user name
    //   name: 'thetoan3',
    //   room: data.data.roomId
    // });
    // questions.current = data.data.presentation.questions;
    // setMessage(JSON.stringify(gameData.current.roomId));
    console.log('game: ', gameData.current);
    return response.data;
  };

  const handleStartGroupPresent = async () => {
    if (selectedGroup === undefined || selectedGroup === null || selectedGroup === {} || selectedGroup === '') {
      openNotification(
        api,
        'Cannot start present',
        'You must select a specific group to present',
        <SmileOutlined style={{ color: '#108ee9' }} />
      );
      return;
    }
    const game = await createGroupGame(presentid, selectedGroup._id);
    if (game === undefined || game === null || game === {}) {
      openNotification(
        api,
        'Cannot start present',
        'Something wrong, please try later',
        <SmileOutlined style={{ color: '#108ee9' }} />
      );
      return;
    }

    navigate('/presentation/group/host/waiting', { state: { game } });
  };

  return (
    <Content>
      <MainLayout>
        {contextHolder}
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
            <Button
              type='primary'
              onClick={() => handleStartGroupPresent()}
              disabled={selectedGroup.groupName === ''}
              block
            >
              {`Start Present: ${selectedGroup.groupName}`}
            </Button>
          </section>
        )}
      </MainLayout>
    </Content>
  );
};
export default PresentGroupPage;
