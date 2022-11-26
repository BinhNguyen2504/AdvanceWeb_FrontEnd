import { Layout } from 'antd';

const { Header: HeaderAnt } = Layout;

const Header = () => (
  <HeaderAnt className='header'>
    <section className='flex'>
      <a href='/' className='logo'>
        Kahoot
      </a>

      <div className='icons'>
        <div id='menu-btn' className='fas fa-bars' />
        <div id='search-btn' className='fas fa-search' />
        <div id='user-btn' className='fas fa-user' />
        <div id='toggle-btn' className='fas fa-sun' />
      </div>

      <div className='profile'>
        <img src='images/pic-1.jpg' className='image' alt='' />
        <h3 className='name'>Binh nguyen</h3>
        <p className='role'>students</p>
        <a href='profile.html' className='btn'>
          view profile
        </a>
        <div className='flex-btn'>
          <a href='login.html' className='option-btn'>
            login
          </a>
          <a href='register.html' className='option-btn'>
            register
          </a>
        </div>
      </div>
    </section>
  </HeaderAnt>
);

export default Header;
