import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useGetListGroupQuery } from '../../app/groupService';
import GroupCard from '../../components/group/GroupCard';
import GroupItem from '../../components/GroupItem';
import MainLayout from '../../layouts/MainLayout';

const { Content } = Layout;

const GroupPage = () => {
  const { data, isLoading } = useGetListGroupQuery();

  return (
    <Content>
      <MainLayout>
        {!isLoading ? (
          <section className='courses container'>
            <Link className='btn' to='/toan/groups/create'>
              Create group
            </Link>
            <br />
            <h1 className='heading' span={12}>
              Joined groups
            </h1>
            <div className='box-container'>
              {data.data.map((group) => (
                // <GroupItem key={group.id} name={group.groupName} id={group.id} />
                <GroupCard key={group.id} data={group} />
              ))}
            </div>
            <br />
            <h1 className='heading' span={12}>
              Owner groups
            </h1>
            <div className='box-container'>
              {data.data.map((group) => (
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

export default GroupPage;
