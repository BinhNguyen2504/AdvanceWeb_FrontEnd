import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useGetListGroupQuery } from '../app/groupService';
import GroupItem from '../components/GroupItem';
import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const GroupList = () => {
  const { data } = useGetListGroupQuery();
  // const { groups, ownGroup } = data;
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
          {/* <div className='box-container'>
            {groups.map((group) => (
              <GroupItem key={group.id} name={group.name} id={group.id} />
            ))}
          </div>
          <div className='box-container'>
            {ownGroup.map((group) => (
              <GroupItem key={group.id} name={group.name} id={group.id} />
            ))}
          </div> */}
        </section>
      </MainLayout>
    </Content>
  );
};

export default GroupList;
