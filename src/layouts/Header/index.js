import { Layout } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css';

const { Header: HeaderAnt } = Layout;

const Header = () => {
  const { username, email } = useSelector((state) => state.auth);
  const [toggleProfile, setToggleProfile] = useState(false);
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const mode = localStorage.getItem('theme');
    if (!mode) {
      localStorage.setItem('theme', JSON.stringify('light'));
    }
    if (theme === 'dark') {
      document.getElementById('toggle-btn').classList.replace('fa-sun', 'fa-moon');
      document.body.classList.add('dark');
    } else {
      document.getElementById('toggle-btn').classList.replace('fa-moon', 'fa-sun');
      document.body.classList.remove('dark');
    }
  }, [theme]);
  const handleChangeTheme = () => {
    localStorage.setItem('theme', JSON.stringify(theme === 'dark' ? 'light' : 'dark'));
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <HeaderAnt className='header'>
      <section className='flex'>
        <Link to='/' className='logo'>
          Kahoot
        </Link>

        <div className='icons'>
          <div id='menu-btn' className='fas fa-bars' />
          <div id='search-btn' className='fas fa-search' />
          <button
            id='user-btn'
            className='fas fa-user'
            onClick={() => setToggleProfile(!toggleProfile)}
            type='button'
            aria-label='Toggle profile'
          />
          <button
            id='toggle-btn'
            className='fas fa-sun'
            onClick={handleChangeTheme}
            type='button'
            aria-label='Toggle theme'
          />
        </div>

        <div
          className={classNames('profile', {
            active: toggleProfile
          })}
        >
          <img src='img/ava.jpg' className='image' alt='' />
          <h3 className='name'>{username}</h3>
          <p className='role'>{email}</p>
          <button type='button' className='btn'>
            Logout
          </button>
        </div>
      </section>
    </HeaderAnt>
  );
};
export default Header;
