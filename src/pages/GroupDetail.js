import { Layout } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetGroupDetailQuery } from '../app/groupService';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const GroupDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetGroupDetailQuery(id);
  // console.log(data);

  return (
    <Content>
      <MainLayout>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <section className='teachers container'>
            <h1 className='heading'>Group Details</h1>
            <div className='box-container'>
              <div className='box'>
                <div className='tutor'>
                  <img src='/img/ava.jpg' alt='' />
                  <div>
                    <h3>{data.data && data.data.owner.name}</h3>
                    <span>Owner</span>
                  </div>
                </div>
                <a href='teacher_profile.html' className='inline-btn'>
                  view profile
                </a>
              </div>
              <hr />
              {data.data &&
                data.data.member.map((item) => (
                  <div className='box'>
                    <div className='tutor'>
                      <img src='/img/ava.jpg' alt='' />
                      <div>
                        <h3>{item.name}</h3>
                        <span>Member</span>
                      </div>
                    </div>
                    <a href='teacher_profile.html' className='inline-btn'>
                      view profile
                    </a>
                  </div>
                ))}
            </div>
          </section>
        )}
      </MainLayout>
    </Content>
  );
};

export default GroupDetail;
