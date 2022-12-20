import { Layout } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../app/authService';
import { logoutUser } from '../../app/authSlice';
import { BASE_URL } from '../../constants';
import { setAuthHeader } from '../../utils';

import './styles.css';

const { Header: HeaderAnt } = Layout;

const Header = () => {
  const { username, email } = useSelector((state) => state.auth);
  const [toggleProfile, setToggleProfile] = useState(false);
  const [theme, setTheme] = useState('light');
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const handleLogout = async () => {
    await logout().unwrap();
    window.open(`${BASE_URL}/user/logout`, '_self');
    localStorage.removeItem('token');
    dispatch(logoutUser());
    navigate('/login');
    setAuthHeader(null);
  };

  return (
    <HeaderAnt className='header'>
      <section className='flex'>
        <Link to='/dashboard' className='logo'>
          Quizz
        </Link>

        <div className='icons'>
          {/* <div id='menu-btn' className='fas fa-bars' />
          <div id='search-btn' className='fas fa-search' /> */}
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
          {username ? (
            <button type='button' className='btn' onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to='/login' className='btn'>
              Login
            </Link>
          )}
        </div>
      </section>
    </HeaderAnt>
  );
};
export default Header;
