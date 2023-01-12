import { Avatar, Card, Col, Divider, Row, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import { getNotNullList } from '../../utils';

const ResultView = ({ resultData, isHost }) => {
  const [gameDataSource, setGameDataSource] = useState([]);
  const [resultDataSource, setResultDataSource] = useState([]);
  function compare(a, b) {
    if (a.score > b.score) {
      return -1;
    }
    if (a.score < b.score) {
      return 1;
    }
    return 0;
  }

  // game table
  const gameColumns = [
    {
      title: 'Player',
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
    const gameList = getNotNullList(resultData.result);
    const gameElementList = gameList.sort(compare).map((player, index) => ({
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

  // history table
  const historyColumns = [
    {
      title: 'Player',
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
      title: 'Question',
      dataIndex: 'function',
      key: 'function'
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer'
    },
    {
      title: 'Score',
      key: 'status',
      dataIndex: 'status'
    },
    {
      title: 'Time',
      key: 'employed',
      dataIndex: 'employed'
    }
  ];
  // get current game
  useEffect(() => {
    const gameList = getNotNullList(resultData.history);
    const gameElementList = gameList.map((player) => ({
      key: player._id,
      name: player.name,
      _id: player._id,
      function: (
        <div className='author-info'>
          <p>{player.question}</p>
        </div>
      ),
      answer: (
        // <Button type='primary' className='tag-primary' block>
        //   {player.score ? player.score : '0'}
        // </Button>
        <p>{player.answer}</p>
      ),
      status: (
        // <Button type='primary' className='tag-primary' block>
        //   {player.score ? player.score : '0'}
        // </Button>
        <p>{player.isTrue ? 'correct' : 'incorrect'}</p>
      ),
      employed: (
        // <Space size='middle'>
        //   <Popconfirm
        //     placement='topLeft'
        //     title='Are you sure to join this present'
        //     description='{description}'
        //     onConfirm={() => console.log('click confirm')}
        //     okText='Yes'
        //     cancelText='No'
        //   >
        //     <Button disabled={!item.isOpen}>Join Presentation</Button>
        //   </Popconfirm>
        // </Space>
        <p>{player.time}</p>
      )
    }));
    setResultDataSource([...gameElementList]);
  }, [resultData]);

  return (
    <div className='tabled'>
      <Row gutter={[24, 0]}>
        <Col xs='24' xl={24}>
          <Card bordered={false} className='criclebox tablespace mb-24' title='Leaderboard'>
            <div className='table-responsive'>
              <Table columns={gameColumns} dataSource={gameDataSource} pagination className='ant-border-space' />
            </div>
            <Divider />
            <div className='table-responsive'>
              {isHost ? (
                <Table columns={historyColumns} dataSource={resultDataSource} pagination className='ant-border-space' />
              ) : (
                <div />
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ResultView;
