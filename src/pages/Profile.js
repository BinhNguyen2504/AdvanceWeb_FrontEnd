import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useGetProfileQuery } from '../app/profileService';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const Profile = () => {
  const { data, isLoading } = useGetProfileQuery();

  return (
    <Content>
      <MainLayout>
        {!isLoading ? (
          <section className='user-profile container'>
            <h1 className='heading'>your profile</h1>
            <div className='info'>
              <div className='user'>
                <img src='/img/ava.jpg' alt='' />
                <h3>{data.data.username}</h3>
                <p>{data.data.role}</p>
              </div>

              <div className='box-container'>
                <div className='box'>
                  <div className='flex'>
                    <i className='fas fa-user-group' />
                    <div>
                      <span>{data.data.groups.length}</span>
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
                      <span>{data.data.ownGroups.length}</span>
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
        ) : (
          'Loading...'
        )}
      </MainLayout>
    </Content>
  );
};

export default Profile;
