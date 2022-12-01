import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useGetListGroupQuery } from '../app/groupService';
import GroupItem from '../components/GroupItem';
import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const GroupList = () => {
  const { data, isLoading, isFetching } = useGetListGroupQuery();
  console.log(data);

  return (
    <Content>
      <MainLayout>
        <section className='courses'>
          <h1 className='heading' span={12}>
            Group List
          </h1>
          <Link className='btn' to='/groups/create'>
            Create group
          </Link>
          <br />
          <div className='box-container'>
            <GroupItem />
            <GroupItem />
            <GroupItem />
          </div>
        </section>
      </MainLayout>
    </Content>
  );
};

export default GroupList;
