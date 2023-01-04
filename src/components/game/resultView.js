import { Avatar, Card, Col, Row, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import { getNotNullList } from '../../utils';

const ResultView = ({ resultData }) => {
  const [gameDataSource, setGameDataSource] = useState([]);
  console.log('data in result view: ', resultData);
  // game table
  const gameColumns = [
    {
      title: 'Presentor',
      dataIndex: 'name',
      key: 'name',
      width: '32%',
      render: (_, player) => (
        <Avatar.Group>
          <Avatar className='shape-avatar' shape='square' size={40} src='/img/ava.jpg' />
          <Title level={5}>{player.name}</Title>
        </Avatar.Group>
      )
    },
    {
      title: 'Rank',
      dataIndex: 'function',
      key: 'function'
    },
    {
      title: 'Score',
      key: 'status',
      dataIndex: 'status'
    }
    // {
    //   title: 'ACTION',
    //   key: 'employed',
    //   dataIndex: 'employed'
    // }
  ];
  // get current game
  useEffect(() => {
    const gameElementList = getNotNullList(resultData.result).map((player, index) => ({
      key: player._id,
      name: player.name,
      _id: player._id,
      function: (
        <div className='author-info'>
          <p>{index + 1}</p>
        </div>
      ),
      status: (
        // <Button type='primary' className='tag-primary' block>
        //   {player.score ? player.score : '0'}
        // </Button>
        <p>{player.score ? player.score : '0'}</p>
      )
      //   employed: (
      //     // <Space size='middle'>
      //     //   <Popconfirm
      //     //     placement='topLeft'
      //     //     title='Are you sure to join this present'
      //     //     description='{description}'
      //     //     onConfirm={() => console.log('click confirm')}
      //     //     okText='Yes'
      //     //     cancelText='No'
      //     //   >
      //     //     <Button disabled={!item.isOpen}>Join Presentation</Button>
      //     //   </Popconfirm>
      //     // </Space>
      //     <div />
      //   )
    }));
    console.log('gameElelIst: ', gameElementList);
    setGameDataSource([...gameElementList]);
  }, [resultData]);

  return (
    <div className='tabled'>
      <Row gutter={[24, 0]}>
        <Col xs='24' xl={24}>
          <Card bordered={false} className='criclebox tablespace mb-24' title='Leaderboard'>
            <div className='table-responsive'>
              <Table columns={gameColumns} dataSource={gameDataSource} pagination className='ant-border-space' />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ResultView;
