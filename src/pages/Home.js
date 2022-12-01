import { Layout } from 'antd';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const HomePage = () => {
  const [title, setTitle] = useState('Advance Web Project');
  const handleChangeTitle = (data) => {
    setTitle(data);
  };

  return (
    <Content>
      <MainLayout>
        <Title
          editable={{
            text: title,
            onChange: handleChangeTitle
          }}
        >
          {title}
        </Title>
      </MainLayout>
    </Content>
  );
};

export default HomePage;
