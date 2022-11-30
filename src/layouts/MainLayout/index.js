import { ConfigProvider, Layout } from 'antd';
import customTheme from '../../theme';

import Footer from '../Footer';
import Header from '../Header';
import SideBar from '../SideBar';

const { Content } = Layout;

const MainLayout = ({ children }) => (
  <ConfigProvider theme={customTheme}>
    <Header />
    <SideBar />
    <Content style={{ minHeight: 'calc(90vh)' }}>{children}</Content>
    <Footer />
  </ConfigProvider>
);
export default MainLayout;
