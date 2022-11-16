import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Header = () => {
  const items = [
    { label: 'Home', key: 'home', url: '/' },
    { label: 'Login', key: 'login', url: '/login' }
  ];
  return (
    <header>
      <div className='logo' />
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['/home']}>
        {items.map((item) => (
          <Menu.Item key={item.key}>
            <Link to={item.url}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </header>
  );
};
export default Header;
