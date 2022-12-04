import { Layout } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const Dashboard = () => (
  <Content>
    <MainLayout>
      <section className='courses container'>
        <Title>Home Page</Title>
        <Link to='/' className='btn'>
          Enroll presentation
        </Link>
      </section>
    </MainLayout>
  </Content>
);

export default Dashboard;
