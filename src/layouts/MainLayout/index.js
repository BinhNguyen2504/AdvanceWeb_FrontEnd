import { ConfigProvider, Layout } from 'antd';
import customTheme from '../../theme';

import Footer from '../Footer';
import Header from '../Header';

const MainLayout = ({ children }) => (
  <ConfigProvider theme={customTheme}>
    <Layout>
      <Header />
      {children}
      <Footer />
    </Layout>
  </ConfigProvider>
);
export default MainLayout;
