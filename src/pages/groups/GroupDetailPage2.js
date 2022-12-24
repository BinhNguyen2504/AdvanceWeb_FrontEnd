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
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Layout, Space, Popconfirm } from 'antd';

import { ToTopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// Images
import { render } from 'react-dom';
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

const formProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text'
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

const handleRemove = (member) => {
  // call api
  // show dialog success or error
  console.log('remove member: ', member);
};

const handleEditRole = (member) => {
  console.log('edit role member: ', member);
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
    // name: (
    //   <>
    //     <Avatar.Group>
    //       <Avatar className='shape-avatar' shape='square' size={40} src={face4} />
    //       <div className='avatar-info'>
    //         <Title level={5}>Miriam Eric</Title>
    //         <p>miriam@mail.com</p>
    //       </div>
    //     </Avatar.Group>{' '}
    //   </>
    // ),
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
  {
    key: '5',
    name: 'Richard Gran',
    _id: 'id5',
    // name: (
    //   <>
    //     <Avatar.Group>
    //       <Avatar className='shape-avatar' shape='square' size={40} src={face5} />
    //       <div className='avatar-info'>
    //         <Title level={5}>Richard Gran</Title>
    //         <p>richard@mail.com</p>
    //       </div>
    //     </Avatar.Group>{' '}
    //   </>
    // ),
    function: (
      <div className='author-info'>
        <Title level={5}>Manager</Title>
        <p>Organization</p>
      </div>
    ),

    status: <Button className='tag-badge'>ONLINE</Button>,
    employed: (
      <div className='ant-employed'>
        <span>23/03/20</span>
        <a href='#pablo'>Edit</a>
      </div>
    )
  },

  {
    key: '6',
    name: 'John Levi',
    _id: 'id6',
    // name: (
    //   <>
    //     <Avatar.Group>
    //       <Avatar className='shape-avatar' shape='square' size={40} src={face6} />
    //       <div className='avatar-info'>
    //         <Title level={5}>John Levi</Title>
    //         <p>john@mail.com</p>
    //       </div>
    //     </Avatar.Group>{' '}
    //   </>
    // ),
    function: (
      <div className='author-info'>
        <Title level={5}>Tester</Title>
        <p>Developer</p>
      </div>
    ),

    status: <Button className='tag-badge'>ONLINE</Button>,
    employed: (
      <div className='ant-employed'>
        <span>14/04/17</span>
        <a href='#pablo'>Edit</a>
      </div>
    )
  },
  {
    key: '7',
    name: 'Miriam Eric',
    _id: 'id4',
    // name: (
    //   <>
    //     <Avatar.Group>
    //       <Avatar className='shape-avatar' shape='square' size={40} src={face4} />
    //       <div className='avatar-info'>
    //         <Title level={5}>Miriam Eric</Title>
    //         <p>miriam@mail.com</p>
    //       </div>
    //     </Avatar.Group>{' '}
    //   </>
    // ),
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
  {
    key: '8',
    name: 'Richard Gran',
    _id: 'id5',
    // name: (
    //   <>
    //     <Avatar.Group>
    //       <Avatar className='shape-avatar' shape='square' size={40} src={face5} />
    //       <div className='avatar-info'>
    //         <Title level={5}>Richard Gran</Title>
    //         <p>richard@mail.com</p>
    //       </div>
    //     </Avatar.Group>{' '}
    //   </>
    // ),
    function: (
      <div className='author-info'>
        <Title level={5}>Manager</Title>
        <p>Organization</p>
      </div>
    ),

    status: <Button className='tag-badge'>ONLINE</Button>,
    employed: (
      <div className='ant-employed'>
        <span>23/03/20</span>
        <a href='#pablo'>Edit</a>
      </div>
    )
  },
  {
    key: '9',
    name: 'John Levi',
    _id: 'id6',
    // name: (
    //   <>
    //     <Avatar.Group>
    //       <Avatar className='shape-avatar' shape='square' size={40} src={face6} />
    //       <div className='avatar-info'>
    //         <Title level={5}>John Levi</Title>
    //         <p>john@mail.com</p>
    //       </div>
    //     </Avatar.Group>{' '}
    //   </>
    // ),
    function: (
      <div className='author-info'>
        <Title level={5}>Tester</Title>
        <p>Developer</p>
      </div>
    ),

    status: <Button className='tag-badge'>ONLINE</Button>,
    employed: (
      <div className='ant-employed'>
        <span>14/04/17</span>
        <a href='#pablo'>Edit</a>
      </div>
    )
  },
  {
    key: '8',
    name: 'Richard Gran',
    _id: 'id5',
    // name: (
    //   <>
    //     <Avatar.Group>
    //       <Avatar className='shape-avatar' shape='square' size={40} src={face5} />
    //       <div className='avatar-info'>
    //         <Title level={5}>Richard Gran</Title>
    //         <p>richard@mail.com</p>
    //       </div>
    //     </Avatar.Group>{' '}
    //   </>
    // ),
    function: (
      <div className='author-info'>
        <Title level={5}>Manager</Title>
        <p>Organization</p>
      </div>
    ),

    status: <Button className='tag-badge'>ONLINE</Button>,
    employed: (
      <div className='ant-employed'>
        <span>23/03/20</span>
        <a href='#pablo'>Edit</a>
      </div>
    )
  },
  {
    key: '9',
    name: 'John Levi',
    _id: 'id6',
    // name: (
    //   <>
    //     <Avatar.Group>
    //       <Avatar className='shape-avatar' shape='square' size={40} src={face6} />
    //       <div className='avatar-info'>
    //         <Title level={5}>John Levi</Title>
    //         <p>john@mail.com</p>
    //       </div>
    //     </Avatar.Group>{' '}
    //   </>
    // ),
    function: (
      <div className='author-info'>
        <Title level={5}>Tester</Title>
        <p>Developer</p>
      </div>
    ),

    status: <Button className='tag-badge'>ONLINE</Button>,
    employed: (
      <div className='ant-employed'>
        <span>14/04/17</span>
        <a href='#pablo'>Edit</a>
      </div>
    )
  },
  {
    key: '8',
    name: 'Richard Gran',
    _id: 'id5',
    // name: (
    //   <>
    //     <Avatar.Group>
    //       <Avatar className='shape-avatar' shape='square' size={40} src={face5} />
    //       <div className='avatar-info'>
    //         <Title level={5}>Richard Gran</Title>
    //         <p>richard@mail.com</p>
    //       </div>
    //     </Avatar.Group>{' '}
    //   </>
    // ),
    function: (
      <div className='author-info'>
        <Title level={5}>Manager</Title>
        <p>Organization</p>
      </div>
    ),

    status: <Button className='tag-badge'>ONLINE</Button>,
    employed: (
      <div className='ant-employed'>
        <span>23/03/20</span>
        <a href='#pablo'>Edit</a>
      </div>
    )
  },
  {
    key: '9',
    name: 'John Levi',
    _id: 'id6',
    // name: (
    //   <>
    //     <Avatar.Group>
    //       <Avatar className='shape-avatar' shape='square' size={40} src={face6} />
    //       <div className='avatar-info'>
    //         <Title level={5}>John Levi</Title>
    //         <p>john@mail.com</p>
    //       </div>
    //     </Avatar.Group>{' '}
    //   </>
    // ),
    function: (
      <div className='author-info'>
        <Title level={5}>Tester</Title>
        <p>Developer</p>
      </div>
    ),

    status: <Button className='tag-badge'>ONLINE</Button>,
    employed: (
      <div className='ant-employed'>
        <span>14/04/17</span>
        <a href='#pablo'>Edit</a>
      </div>
    )
  }
];
// project table start
const project = [
  {
    title: 'COMPANIES',
    dataIndex: 'name',
    width: '32%'
  },
  {
    title: 'BUDGET',
    dataIndex: 'age'
  },
  {
    title: 'STATUS',
    dataIndex: 'address'
  },
  {
    title: 'COMPLETION',
    dataIndex: 'completion'
  }
];
const dataproject = [
  {
    key: '1',

    name: (
      <Avatar.Group>
        <Avatar className='shape-avatar' src={ava1} size={25} alt='' />
        <div className='avatar-info'>
          <Title level={5}>Spotify Version</Title>
        </div>
      </Avatar.Group>
    ),
    age: <div className='semibold'>$14,000</div>,
    address: <div className='text-sm'>working</div>,
    completion: (
      <div className='ant-progress-project'>
        <Progress percent={30} size='small' />
        <span>
          <Link to='/'>
            <img src={pencil} alt='' />
          </Link>
        </span>
      </div>
    )
  },

  {
    key: '2',
    name: (
      <Avatar.Group>
        <Avatar className='shape-avatar' src={ava2} size={25} alt='' />
        <div className='avatar-info'>
          <Title level={5}>Progress Track</Title>
        </div>
      </Avatar.Group>
    ),
    age: <div className='semibold'>$3,000</div>,
    address: <div className='text-sm'>working</div>,
    completion: (
      <div className='ant-progress-project'>
        <Progress percent={10} size='small' />
        <span>
          <Link to='/'>
            <img src={pencil} alt='' />
          </Link>
        </span>
      </div>
    )
  },

  {
    key: '3',
    name: (
      <Avatar.Group>
        <Avatar className='shape-avatar' src={ava3} size={25} alt='' />
        <div className='avatar-info'>
          <Title level={5}> Jira Platform Errors</Title>
        </div>
      </Avatar.Group>
    ),
    age: <div className='semibold'>Not Set</div>,
    address: <div className='text-sm'>done</div>,
    completion: (
      <div className='ant-progress-project'>
        <Progress percent={100} size='small' format={() => 'done'} />
        <span>
          <Link to='/'>
            <img src={pencil} alt='' />
          </Link>
        </span>
      </div>
    )
  },

  {
    key: '4',
    name: (
      <Avatar.Group>
        <Avatar className='shape-avatar' src={ava5} size={25} alt='' />
        <div className='avatar-info'>
          <Title level={5}> Launch new Mobile App</Title>
        </div>
      </Avatar.Group>
    ),
    age: <div className='semibold'>$20,600</div>,
    address: <div className='text-sm'>canceled</div>,
    completion: (
      <div className='ant-progress-project'>
        <Progress percent={50} size='small' status='exception' format={() => '50%'} />
        <span>
          <Link to='/'>
            <img src={pencil} alt='' />
          </Link>
        </span>
      </div>
    )
  },

  {
    key: '5',
    name: (
      <Avatar.Group>
        <Avatar className='shape-avatar' src={ava5} size={25} alt='' />
        <div className='avatar-info'>
          <Title level={5}>Web Dev</Title>
        </div>
      </Avatar.Group>
    ),
    age: <div className='semibold'>$4,000</div>,
    address: <div className='text-sm'>working</div>,
    completion: (
      <div className='ant-progress-project'>
        <Progress percent={80} size='small' />
        <span>
          <Link to='/'>
            <img src={pencil} alt='' />
          </Link>
        </span>
      </div>
    )
  },

  {
    key: '6',
    name: (
      <Avatar.Group>
        <Avatar className='shape-avatar' src={ava6} size={25} alt='' />
        <div className='avatar-info'>
          <Title level={5}>Redesign Online Store</Title>
        </div>
      </Avatar.Group>
    ),
    age: <div className='semibold'>$2,000</div>,
    address: <div className='text-sm'>canceled</div>,
    completion: (
      <div className='ant-progress-project'>
        <Progress percent={0} size='small' />
        <span>
          <Link to='/'>
            <img src={pencil} alt='' />
          </Link>
        </span>
      </div>
    )
  }
];

const GroupDetailPage = () => {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  return (
    <Content>
      <MainLayout>
        <section className='courses container'>
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
