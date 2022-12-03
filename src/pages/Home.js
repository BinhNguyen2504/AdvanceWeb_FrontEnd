import { Button, Layout } from 'antd';
import Title from 'antd/es/typography/Title';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const HomePage = () => (
  <Content>
    <MainLayout>
      <Title>Home Page</Title>
      <Button>Enroll</Button>
    </MainLayout>
  </Content>
);

export default HomePage;
