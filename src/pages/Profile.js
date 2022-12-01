import { Layout } from 'antd';
import { useSelector } from 'react-redux';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const Profile = () => {
  const { username, email } = useSelector((state) => state.auth);

  return (
    <Content>
      <MainLayout>
        <section className='user-profile'>
          <h1 className='heading'>your profile</h1>
          <div className='info'>
            <div className='user'>
              <img src='/img/ava.jpg' alt='' />
              <h3>{username}</h3>
              <p>{email}</p>
              {/* <a href='update.html' className='inline-btn'>
              update profile
            </a> */}
            </div>

            <div className='box-container'>
              <div className='box'>
                <div className='flex'>
                  <i className='fas fa-user-group' />
                  <div>
                    <span>4</span>
                    <p>joined group</p>
                  </div>
                </div>
                <a href='/' className='inline-btn'>
                  view groups
                </a>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </Content>
  );
};

export default Profile;
