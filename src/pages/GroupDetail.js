import { Avatar, Button, Card, Col, Form, Input, Layout, Popconfirm, Row, Space, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import groupAPI from '../api/groupAPI';

import {
  useGetGroupDetailQuery,
  useKickOutMutation,
  useRemoveGroupMutation,
  useSendInviteMailMutation,
  useGetInviteLinkMutation
} from '../app/groupService';

import MainLayout from '../layouts/MainLayout';
import { getNotNullList } from '../utils';

const { Content } = Layout;
const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetGroupDetailQuery(id);
  const [removeGroup] = useRemoveGroupMutation();
  const [kickMember] = useKickOutMutation();
  const [sendMail] = useSendInviteMailMutation();
  const [getLink] = useGetInviteLinkMutation();
  const [dataSource, setDataSource] = useState([]);
  const [gameDataSource, setGameDataSource] = useState([]);
  const [inviteLink, setInviteLink] = useState('');
  const [isDisplayInvite, setIsDisplayInvite] = useState(false);

  const handleEditRole = (member) => {
    console.log(member);
    navigate(`/groups/role/${id}`);
  };
  const handleInviteClick = async () => {
    setIsDisplayInvite(!isDisplayInvite);
    const result = await getLink({ id });
    if (result) setInviteLink(result.data.data);
  };
  const submitInvite = async (values) => {
    await sendMail({
      username: values.username,
      id
    });
  };
  const handleRemoveGroup = async () => {
    await removeGroup(id).unwrap();
    navigate('/groups');
  };
  const handleRemoveMember = async (username) => {
    console.log(username);
    await kickMember({ groupId: id, kickUsername: username });
  };

  const handleJoinGame = async (game) => {
    navigate('/presentation/group/player/join', { state: { gameid: game.roomId } });
  };

  const handleReviewGame = async (game) => {
    navigate(`/presentation/review/${game.roomId}`);
  };

  // const handleJoinPresentGroup = () => {
  //   navigate('/presentation/group/player/join', { state: { gameid: '123' } });
  // };

  useEffect(() => {
    if (data) {
      const { owner, coOwners, member } = data.data;
      const ownerData = {
        key: owner.name,
        name: owner.name,
        _id: owner.id,
        function: (
          <div className='author-info'>
            <p>Owner</p>
          </div>
        ),
        status: (
          <Button type='primary' className='tag-primary'>
            ONLINE
          </Button>
        ),
        employed: <div className='ant-employed' />
      };
      const memberList = getNotNullList(member).map((item) => ({
        key: item._id,
        name: item.name,
        _id: item._id,
        function: (
          <div className='author-info'>
            <p>Member</p>
          </div>
        ),
        status: (
          <Button type='primary' className='tag-primary'>
            ONLINE
          </Button>
        ),
        employed: (
          <Space size='middle'>
            <Button onClick={() => handleEditRole(member)} type='primary' ghost>
              Edit Role
            </Button>
            <Popconfirm
              placement='topLeft'
              title='Are you sure to delete this member'
              description='{description}'
              onConfirm={() => handleRemoveMember(item.name)}
              okText='Yes'
              cancelText='No'
            >
              <Button danger>Remove</Button>
            </Popconfirm>
          </Space>
        )
      }));
      const coOwnerList = coOwners.map((item) => ({
        key: item._id,
        name: item.name,
        _id: item._id,
        function: (
          <div className='author-info'>
            <p>Co-owner</p>
          </div>
        ),
        status: (
          <Button type='primary' className='tag-primary'>
            ONLINE
          </Button>
        ),
        employed: (
          <Space size='middle'>
            <Button onClick={() => handleEditRole(member)} type='primary' ghost>
              Edit Role
            </Button>
            <Popconfirm
              placement='topLeft'
              title='Are you sure to delete this member'
              description='{description}'
              // onConfirm={() => handleRemove(member)}
              okText='Yes'
              cancelText='No'
            >
              <Button danger>Remove</Button>
            </Popconfirm>
          </Space>
        )
      }));
      setDataSource([ownerData, ...coOwnerList, ...memberList]);
    }
  }, []);

  function compare(a, b) {
    if (a.isOpen === true && b.isOpen === false) {
      return -1;
    }
    if (a.isOpen === false && b.isOpen === true) {
      return 1;
    }
    return 0;
  }
  // get current game
  useEffect(() => {
    const getGameList = async (groupid) => {
      const res = await groupAPI.getGameInGroup(groupid);
      console.log('game res: ', res);
      // return res.data;
      const gameListData = res.data;
      const gameList = getNotNullList(gameListData);
      const gameElementListSorted = gameList.sort(compare);
      console.log('gameListData: ', gameListData);
      const rawElementList = gameElementListSorted.map((item) => ({
        key: item._id,
        name: item.roomId,
        _id: item._id,
        function: (
          <div className='author-info'>
            <p>{item.participants.length}</p>
          </div>
        ),
        status: (
          <Button type={item.isOpen ? 'primary' : 'secondary'} className='tag-primary'>
            {item.isOpen ? 'Playing' : 'Finished'}
          </Button>
        ),
        employed: (
          <Space size='middle'>
            {item.isOpen ? (
              <Popconfirm
                placement='topLeft'
                title='Are you sure to join this present'
                description='{description}'
                onConfirm={() => handleJoinGame(item)}
                okText='Yes'
                cancelText='No'
              >
                <Button disabled={!item.isOpen}>Join Presentation</Button>
              </Popconfirm>
            ) : (
              <Popconfirm
                placement='topLeft'
                title='Are you want to review this present'
                description='{description}'
                onConfirm={() => handleReviewGame(item)}
                okText='Yes'
                cancelText='No'
              >
                <Button>Review</Button>
              </Popconfirm>
            )}
          </Space>
        )
        // };
      }));
      // const gameElementList = rawElementList.filter((item) => item !== null && item !== undefined);
      const gameElementList = rawElementList.filter(() => true);
      console.log('gameElelIst: ', gameElementList);
      setGameDataSource([...gameElementList]);
    };
    getGameList(id);
  }, []);

  const columns = [
    {
      title: 'MEMBER',
      dataIndex: 'name',
      key: 'name',
      width: '32%',
      render: (_, member) => (
        <Avatar.Group>
          <Avatar className='shape-avatar' shape='square' size={40} src='/img/ava.jpg' />
          <Title level={5}>{member.name}</Title>
        </Avatar.Group>
      )
    },
    {
      title: 'ROLE',
      dataIndex: 'function',
      key: 'function'
    },
    {
      title: 'STATUS',
      key: 'status',
      dataIndex: 'status'
    },
    {
      title: 'ACTION',
      key: 'employed',
      dataIndex: 'employed'
    }
  ];

  // game table
  const gameColumns = [
    {
      title: 'Presentor',
      dataIndex: 'name',
      key: 'name',
      width: '32%',
      render: (_, member) => (
        <Avatar.Group>
          <Avatar className='shape-avatar' shape='square' size={40} src='/img/ava.jpg' />
          <Title level={5}>{member.name}</Title>
        </Avatar.Group>
      )
    },
    {
      title: 'Participant',
      dataIndex: 'function',
      key: 'function'
    },
    {
      title: 'STATUS',
      key: 'status',
      dataIndex: 'status'
    },
    {
      title: 'ACTION',
      key: 'employed',
      dataIndex: 'employed'
    }
  ];

  return (
    <Content>
      <MainLayout>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <section className='teachers container'>
            <h1 className='heading'>Group Details</h1>
            {/* {hasStreaming ? (
              <Space direction='vertical' style={{ width: '100%', marginBottom: 20 }}>
                <Button
                  style={{ borderColor: '#18A558', backgroundColor: '#A3EBB1' }}
                  onClick={() => handleJoinPresentGroup()}
                  block
                >
                  User ??? is streaming, click to join
                </Button>
              </Space>
            ) : (
              <div />
            )} */}
            <Space direction='horizontal' style={{ width: '100%', marginBottom: 20 }}>
              <Button type='primary' ghost onClick={handleInviteClick}>
                Invite member
              </Button>
              <Button type='primary' danger ghost onClick={handleRemoveGroup}>
                Delete
              </Button>
            </Space>
            {isDisplayInvite && (
              <Form name='invite' onFinish={submitInvite} style={{ marginBottom: '30px' }}>
                <Form.Item label='Username' name='username'>
                  <Input type='text' placeholder='Search by username' />
                </Form.Item>
                {/* <Form.Item>
                  <Button type='primary' htmlType='submit'>
                    Invite people
                  </Button>
                </Form.Item> */}
                {inviteLink && (
                  <p>
                    Copy this link:
                    <br />
                    {inviteLink}
                  </p>
                )}
              </Form>
            )}

            {/* <div className='box-container'> */}
            {/* <div className='box'>
                <div className='tutor'>
                  <img src='' alt='' />
                  <div>
                    <h3>{data.data && data.data.owner.name}</h3>
                    <span>Owner</span>
                  </div>
                </div>
                <a href='teacher_profile.html' className='inline-btn'>
                  view profile
                </a>
              </div> */}
            <hr />
            <div className='tabled'>
              <Row gutter={[24, 0]}>
                <Col xs='24' xl={24}>
                  <Card bordered={false} className='criclebox tablespace mb-24' title='Game List'>
                    <div className='table-responsive'>
                      <Table
                        columns={gameColumns}
                        dataSource={gameDataSource}
                        pagination
                        className='ant-border-space'
                      />
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
            <br />
            <div className='tabled'>
              <Row gutter={[24, 0]}>
                <Col xs='24' xl={24}>
                  <Card bordered={false} className='criclebox tablespace mb-24' title='Group Member'>
                    <div className='table-responsive'>
                      <Table columns={columns} dataSource={dataSource} pagination className='ant-border-space' />
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </section>
        )}
      </MainLayout>
    </Content>
  );
};

export default GroupDetail;
