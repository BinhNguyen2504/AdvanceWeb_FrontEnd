import { Layout } from 'antd';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const HomePage = () => (
  <Content>
    <MainLayout>
      <h1>Home Page</h1>
    </MainLayout>
  </Content>
);

export default HomePage;
