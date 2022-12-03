import { ConfigProvider, Layout } from 'antd';
import customTheme from '../../theme';

import Footer from '../Footer';
import Header from '../Header';

const { Content } = Layout;

const BasicLayout = ({ children }) => (
  <ConfigProvider theme={customTheme}>
    <Header />
    <Content style={{ minHeight: 'calc(90vh)' }}>{children}</Content>
    <Footer />
  </ConfigProvider>
);
export default BasicLayout;
