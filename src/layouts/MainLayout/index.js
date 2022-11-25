import { ConfigProvider, Layout } from 'antd';
import customTheme from '../../theme';

import Footer from '../Footer';
import Header from '../Header';
import SideBar from '../SideBar';

const MainLayout = ({ children }) => (
  <ConfigProvider theme={customTheme}>
    {/* <Layout style={{ padding: 0 }}> */}
    <Header />
    <SideBar />
    {children}
    <Footer />
    {/* </Layout> */}
  </ConfigProvider>
);
export default MainLayout;
