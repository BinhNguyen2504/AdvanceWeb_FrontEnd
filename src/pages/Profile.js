import { Layout } from 'antd';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const Profile = () => (
  <Content>
    <MainLayout>
      <section className='user-profile'>
        <h1 className='heading'>your profile</h1>

        <div className='info'>
          <div className='user'>
            <img src='images/pic-1.jpg' alt='' />
            <h3>shaikh anas</h3>
            <p>student</p>
            <a href='update.html' className='inline-btn'>
              update profile
            </a>
          </div>

          <div className='box-container'>
            <div className='box'>
              <div className='flex'>
                <i className='fas fa-bookmark' />
                <div>
                  <span>4</span>
                  <p>saved playlist</p>
                </div>
              </div>
              <a href='/' className='inline-btn'>
                view playlists
              </a>
            </div>

            <div className='box'>
              <div className='flex'>
                <i className='fas fa-heart' />
                <div>
                  <span>33</span>
                  <p>videos liked</p>
                </div>
              </div>
              <a href='/' className='inline-btn'>
                view liked
              </a>
            </div>

            <div className='box'>
              <div className='flex'>
                <i className='fas fa-comment' />
                <div>
                  <span>12</span>
                  <p>videos comments</p>
                </div>
              </div>
              <a href='/' className='inline-btn'>
                view comments
              </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  </Content>
);

export default Profile;
