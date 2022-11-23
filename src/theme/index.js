import { theme } from 'antd';

const { defaultAlgorithm } = theme;

const customTheme = {
  algorithm: [defaultAlgorithm],
  components: {
    token: {
      colorPrimary: '#00b96b',
      colorPrimaryBg: '#e6f7ff',
      colorLink: '#1890ff'
    },
    Radio: {
      colorPrimary: '#00b96b'
    },
    Button: {
      colorPrimary: '#00b96b'
    }
  }
};

export default customTheme;
