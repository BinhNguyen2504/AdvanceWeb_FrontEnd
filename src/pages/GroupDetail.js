import { Avatar, Button, Card, Col, Layout, Popconfirm, Row, Space, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetGroupDetailQuery } from '../app/groupService';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetGroupDetailQuery(id);
  const [dataSource, setDataSource] = useState([]);
  const [inviteLink, setInviteLink] = useState('');
  const [isDisplayInviteLink, setIsDisplayInviteLink] = useState(false);

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
        employed: (
          <div className='ant-employed'>
            <Button>Remove</Button>
            <Button>Edit</Button>
          </div>
        )
      };

      const memberList = member.map((item) => ({
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
          <div className='ant-employed'>
            <Button>Remove</Button>
            <Button>Edit</Button>
          </div>
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
          <div className='ant-employed'>
            <Button>Remove</Button>
            <Button>Edit</Button>
          </div>
        )
      }));
      setDataSource([ownerData, ...coOwnerList, ...memberList]);
      // setDataSource([
      //   {
      //     key: '1',
      //     name: 'toan',
      //     _id: 'id1',
      //     function: (
      //       <div className='author-info'>
      //         <Title level={5}>Manager</Title>
      //         <p>Organization</p>
      //       </div>
      //     ),
      //     status: (
      //       <Button type='primary' className='tag-primary'>
      //         ONLINE
      //       </Button>
      //     ),
      //     employed: (
      //       <div className='ant-employed'>
      //         <Button>Remove</Button>
      //         <Button>Edit</Button>
      //       </div>
      //     )
      //   }
      // ]);
    }
  }, []);

  const handleEditRole = (member) => {
    const groupid = '123';
    navigate(`/groups/role/${groupid}`);
  };

  console.log(data);

  const columns = [
    {
      title: 'MEMBER',
      dataIndex: 'name',
      key: 'name',
      width: '32%',
      render: (_, member) => (
        <Avatar.Group>
          {console.log(member)}
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
      dataIndex: 'employed',
      render: (_, member) => (
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
    }
  ];
  // const dataSource = [];
  const handleInviteClick = () => {
    setInviteLink('link 123');
    setIsDisplayInviteLink(true);
  };
  const hasStreaming = true;

  return (
    <Content>
      <MainLayout>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <section className='teachers container'>
            <h1 className='heading'>Group Details</h1>
            {hasStreaming ? (
              <Space direction='vertical' style={{ width: '100%', marginBottom: 20 }}>
                <Button style={{ borderColor: '#18A558', backgroundColor: '#A3EBB1' }} block>
                  User ??? is streaming, click to join
                </Button>
              </Space>
            ) : (
              <div />
            )}
            <Space direction='horizontal' style={{ width: '100%', marginBottom: 20 }}>
              <Button type='primary' ghost onClick={handleInviteClick}>
                Invite member
              </Button>
              <Button type='primary' danger ghost>
                Delete
              </Button>
            </Space>

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
                  <Card bordered={false} className='criclebox tablespace mb-24' title='Group Member'>
                    <div className='table-responsive'>
                      <Table columns={columns} dataSource={dataSource} pagination className='ant-border-space' />
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
            {/* {data.data &&
                data.data.member.map((item) => (
                  <div className='box'>
                    <div className='tutor'>
                      <img src='/img/ava.jpg' alt='' />
                      <div>
                        <h3>{item.name}</h3>
                        <span>Member</span>
                      </div>
                    </div>
                    <a href='teacher_profile.html' className='inline-btn'>
                      view profile
                    </a>
                  </div>
                ))} */}
            {/* </div> */}
          </section>
        )}
      </MainLayout>
    </Content>
  );
};

export default GroupDetail;
