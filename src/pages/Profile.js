import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useGetProfileQuery } from '../app/profileService';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const Profile = () => {
  const { data } = useGetProfileQuery();
  const { groups, ownGroup, role, username } = data.data;

  return (
    <Content>
      <MainLayout>
        <section className='user-profile'>
          <h1 className='heading'>your profile</h1>
          <div className='info'>
            <div className='user'>
              <img src='/img/ava.jpg' alt='' />
              <h3>{username || ''}</h3>
              <p>{role || ''}</p>
              {/* <a href='update.html' className='inline-btn'>
              update profile
            </a> */}
            </div>

            <div className='box-container'>
              <div className='box'>
                <div className='flex'>
                  <i className='fas fa-user-group' />
                  <div>
                    <span>{groups.length || 0}</span>
                    <p>joined group</p>
                  </div>
                </div>
                <Link to='/groups' className='inline-btn'>
                  view groups
                </Link>
              </div>
              <div className='box'>
                <div className='flex'>
                  <i className='fas fa-user-group' />
                  <div>
                    <span>{ownGroup.length || 0}</span>
                    <p>owner group</p>
                  </div>
                </div>
                <Link to='/groups' className='inline-btn'>
                  view groups
                </Link>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </Content>
  );
};

export default Profile;
