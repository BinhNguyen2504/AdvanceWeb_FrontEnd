import { Spin } from 'antd';
import BasicLayout from '../layouts/BasicLayout';

const PlayerWaitingRoom = () => (
  <BasicLayout>
    <main className='courses container'>
      <h1>Please waiting...</h1>
      <div>Loading animation</div>
      <div>
        <h2>You joined the game</h2>
        <h4>Waiting on a host to start the game</h4>
      </div>
      <div className='example'>
        <Spin tip='Waiting other player' size='large'>
          <div className='content' />
        </Spin>
      </div>
    </main>
  </BasicLayout>
);

export default PlayerWaitingRoom;
