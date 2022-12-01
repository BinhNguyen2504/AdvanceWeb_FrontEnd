import { Button, Layout } from 'antd';
import { Link } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const GroupList = () => (
  <Content>
    <MainLayout>
      <section className='courses'>
        <h1 className='heading' span={12}>
          Group List
        </h1>
        <Button className='btn'>Create group</Button>
        <br />
        <div className='box-container'>
          <div className='box'>
            <div className='tutor'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
                alt=''
              />
              <div className='info'>
                <h3>john deo</h3>
                <span>21-10-2022</span>
              </div>
            </div>
            <div className='thumb'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
                alt=''
              />
              <span>10 videos</span>
            </div>
            <h3 className='title'>complete JQuery tutorial</h3>
            <Link to='/groups/1' className='inline-btn'>
              view playlist
            </Link>
          </div>
          <div className='box'>
            <div className='tutor'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
                alt=''
              />
              <div className='info'>
                <h3>john deo</h3>
                <span>21-10-2022</span>
              </div>
            </div>
            <div className='thumb'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
                alt=''
              />
              <span>10 videos</span>
            </div>
            <h3 className='title'>complete react tutorial</h3>
            <Link to='/groups/1' className='inline-btn'>
              view playlist
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  </Content>
);

export default GroupList;
