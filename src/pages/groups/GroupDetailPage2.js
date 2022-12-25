/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Layout, Space, Popconfirm, Divider } from 'antd';

import { SmileFilled, SmileOutlined, ToTopOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

// Images
import { render } from 'react-dom';
import Paragraph from 'antd/es/typography/Paragraph';
import { useState } from 'react';
import ava1 from '../../assets/images/logo-shopify.svg';
import ava2 from '../../assets/images/logo-atlassian.svg';
import ava3 from '../../assets/images/logo-slack.svg';
import ava5 from '../../assets/images/logo-jira.svg';
import ava6 from '../../assets/images/logo-invision.svg';
import face1 from '../../assets/images/face-1.jpg';
import face2 from '../../assets/images/face-2.jpg';
import face3 from '../../assets/images/face-3.jpg';
import face4 from '../../assets/images/face-4.jpg';
import face5 from '../../assets/images/face-5.jpeg';
import face6 from '../../assets/images/face-6.jpeg';
import pencil from '../../assets/images/pencil.svg';

import MainLayout from '../../layouts/MainLayout';

const { Title } = Typography;
const { Content } = Layout;

const GroupDetailPage = () => {
  const navigate = useNavigate();
  const [isDisplayInvideLink, setIsDisplayInvideLink] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  //   const formProps = {
  //     name: 'file',
  //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //     headers: {
  //       authorization: 'authorization-text'
  //     },
  //     onChange(info) {
  //       if (info.file.status !== 'uploading') {
  //         console.log(info.file, info.fileList);
  //       }
  //       if (info.file.status === 'done') {
  //         message.success(`${info.file.name} file uploaded successfully`);
  //       } else if (info.file.status === 'error') {
  //         message.error(`${info.file.name} file upload failed.`);
  //       }
  //     }
  //   };

  const handleRemove = (member) => {
    // call api
    // show dialog success or error
    console.log('remove member: ', member);
  };

  const handleEditRole = (member) => {
    const groupid = '123';
    console.log('edit role member: ', member);
    // navigate(`/toan/groups/role/${groupid}`, { state: member });
    navigate(`/toan/groups/role/${groupid}`);
  };

  // table code start
  const columns = [
    {
      title: 'MEMBER',
      dataIndex: 'name',
      key: 'name',
      width: '32%',
      render: (_, member) => (
        <>
          <Avatar.Group>
            <Avatar className='shape-avatar' shape='square' size={40} src={face2} />
            {/* <div className='avatar-info'> */}
            <Title level={5}>{member.name}</Title>
            {/* <p>{member._id}</p> */}
            {/* </div> */}
          </Avatar.Group>
          {' '}
        </>
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
    //   {
    //     title: 'ACTION',
    //     key: 'employed',
    //     dataIndex: 'employed'
    //   },
    {
      title: 'ACTION',
      key: 'employed',
      dataIndex: 'employed',
      render: (_, member) => (
        <Space size="middle">
          <Button onClick={() => handleEditRole(member)} type="primary" ghost>Edit Role</Button>
          <Popconfirm
            placement="topLeft"
            title='Are you sure to delete this member'
            description='{description}'
            onConfirm={() => handleRemove(member)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Remove</Button>
          </Popconfirm>
        </Space>
      ),
    }
  ];

  const data = [
    {
      key: '1',
      name: 'toan',
      _id: 'id1',
      function: (
        <div className='author-info'>
          <Title level={5}>Manager</Title>
          <p>Organization</p>
        </div>
      ),

      status: (
        <Button type='primary' className='tag-primary'>
          ONLINE
        </Button>
      ),
      employed: (
        <div className='ant-employed'>
          {/* <span>23/04/18</span> */}
          <Button>Remove</Button>
          <Button>Edit</Button>
          {/* <a href='#pablo'>Edit</a> */}
        </div>
      )
    },

    {
      key: '2',
      name: 'Alexa Liras',
      _id: 'id2',
      function: (
        <div className='author-info'>
          <Title level={5}>Programator</Title>
          <p>Developer</p>
        </div>
      ),
      status: <Button className='tag-badge'>ONLINE</Button>,
      employed: (
        <div className='ant-employed'>
          <span>23/12/20</span>
          <a href='#pablo'>Edit</a>
        </div>
      )
    },

    {
      key: '3',
      name: 'Laure Perrier',
      _id: 'id3',
      function: (
        <div className='author-info'>
          <Title level={5}>Executive</Title>
          <p>Projects</p>
        </div>
      ),

      status: (
        <Button type='primary' className='tag-primary'>
          ONLINE
        </Button>
      ),
      employed: (
        <div className='ant-employed'>
          <span>03/04/21</span>
          <a href='#pablo'>Edit</a>
        </div>
      )
    },
    {
      key: '4',
      name: 'Miriam Eric',
      _id: 'id4',
      function: (
        <div className='author-info'>
          <Title level={5}>Marketing</Title>
          <p>Organization</p>
        </div>
      ),

      status: (
        <Button type='primary' className='tag-primary'>
          ONLINE
        </Button>
      ),
      employed: (
        <div className='ant-employed'>
          <span>03/04/21</span>
          <a href='#pablo'>Edit</a>
        </div>
      )
    },
  ];

  const handleInviteClick = () => {
    setInviteLink('link 123');
    setIsDisplayInvideLink(true);
  };

  const hasStreaming = true;
  return (
    <Content>
      <MainLayout>
        <section className='courses container'>
          { hasStreaming ? (
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button style={{ borderColor: '#18A558', backgroundColor: '#A3EBB1' }} block>User ??? is streaming, click to join</Button>
            </Space>
          ) : <div />}

          <br /><br /><br />
          <Space direction="horizontal" style={{ width: '100%' }}>
            <Button type='primary' ghost onClick={handleInviteClick}>Invite member</Button>
            <Button type="primary" danger ghost>Delete</Button>
          </Space>
          { isDisplayInvideLink ? (
            <Space direction="vertical" style={{ width: '100%' }}>
              <Typography.Title code expandable copyable level={3} style={{ margin: 0, width: '100%' }}>
                {inviteLink}
              </Typography.Title>
            </Space>
          ) : <div />}
          <Divider />

          <div className='tabled'>
            <Row gutter={[24, 0]}>
              <Col xs='24' xl={24}>
                <Card
                  bordered={false}
                  className='criclebox tablespace mb-24'
                  title='Group Member'
            //       extra={(
            //         <Radio.Group onChange={onChange} defaultValue='a'>
            //           <Radio.Button value='a'>All</Radio.Button>
            //           <Radio.Button value='b'>ONLINE</Radio.Button>
            //         </Radio.Group>
            // )}
                >
                  <div className='table-responsive'>
                    <Table columns={columns} dataSource={data} pagination className='ant-border-space' />
                  </div>
                </Card>

                {/* <Card
                  bordered={false}
                  className='criclebox tablespace mb-24'
                  title='Projects Table'
                  extra={(
                    <Radio.Group onChange={onChange} defaultValue='all'>
                      <Radio.Button value='all'>All</Radio.Button>
                      <Radio.Button value='online'>ONLINE</Radio.Button>
                      <Radio.Button value='store'>STORES</Radio.Button>
                    </Radio.Group>
            )}
                >
                  <div className='table-responsive'>
                    <Table columns={project} dataSource={dataproject} pagination={false} className='ant-border-space' />
                  </div>
                  <div className='uploadfile pb-15 shadow-none'>
                    <Upload {...formProps}>
                      <Button type='dashed' className='ant-full-box' icon={<ToTopOutlined />}>
                        Click to Upload
                      </Button>
                    </Upload>
                  </div>
                </Card> */}
              </Col>
            </Row>
          </div>
        </section>
      </MainLayout>
    </Content>
  );
};

export default GroupDetailPage;
