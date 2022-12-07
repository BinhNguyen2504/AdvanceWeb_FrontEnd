import { Layout } from 'antd';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const GroupDetail = () => (
  <Content>
    <MainLayout>
      <section className='teachers container'>
        <h1 className='heading'>Group Details</h1>
        <div className='box-container'>
          <div className='box'>
            <div className='tutor'>
              <img src='/img/ava.jpg' alt='' />
              <div>
                <h3>john deo</h3>
                <span>developer</span>
              </div>
            </div>
            <a href='teacher_profile.html' className='inline-btn'>
              view profile
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  </Content>
);

export default GroupDetail;
