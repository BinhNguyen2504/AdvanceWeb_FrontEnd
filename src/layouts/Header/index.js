import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import './styles.css';

const { Header: HeaderAnt } = Layout;

const Header = () => {
  const items = [
    { label: 'Home', key: 'home', url: '/' },
    { label: 'Login', key: 'login', url: '/login' }
  ];

  return (
    <HeaderAnt className='header'>
      <div className='logo' />
      <Menu
        mode='horizontal'
        defaultSelectedKeys={['home']}
        items={items.map((item) => ({
          key: item.key,
          label: <Link to={item.url}>{item.label}</Link>
        }))}
      />
    </HeaderAnt>
  );
};
export default Header;
