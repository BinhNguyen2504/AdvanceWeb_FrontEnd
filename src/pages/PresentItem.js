import { Layout } from 'antd';
import { useState } from 'react';
import Title from 'antd/es/typography/Title';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const PresentItem = () => {
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

export default PresentItem;
