import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useGetListGroupQuery } from '../app/groupService';
import GroupItem from '../components/GroupItem';
import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const GroupList = () => {
  const { data, isLoading } = useGetListGroupQuery();
  console.log(data.data.groups);
  return (
    <Content>
      <MainLayout>
        {!isLoading ? (
          <section className='courses'>
            <Link className='btn' to='/groups/create'>
              Create group
            </Link>
            <br />
            <h1 className='heading' span={12}>
              Joined groups
            </h1>
            <div className='box-container'>
              {data.data.groups.map((group) => (
                <GroupItem key={group.id} name={group.groupName} id={group.id} />
              ))}
            </div>
            <br />
            <h1 className='heading' span={12}>
              Owner groups
            </h1>
            <div className='box-container'>
              {data.data.ownGroup.map((group) => (
                <GroupItem key={group.id} name={group.groupName} id={group.id} />
              ))}
            </div>
          </section>
        ) : (
          'Loading...'
        )}
      </MainLayout>
    </Content>
  );
};

export default GroupList;
