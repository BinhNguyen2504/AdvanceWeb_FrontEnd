import './styles.css';

const Header = () => (
  <div className='header'>
    <section className='flex'>
      <a href='home.html' className='logo'>
        Educa.
      </a>

      <form action='search.html' method='post' className='search-form'>
        <input type='text' name='search_box' required placeholder='search courses...' />
        <div type='submit' className='fas fa-search' />
      </form>

      <div className='icons'>
        <div id='menu-btn' className='fas fa-bars' />
        <div id='search-btn' className='fas fa-search' />
        <div id='user-btn' className='fas fa-user' />
        <div id='toggle-btn' className='fas fa-sun' />
      </div>

      <div className='profile'>
        <img src='images/pic-1.jpg' className='image' alt='' />
        <h3 className='name'>shaikh anas</h3>
        <p className='role'>studen</p>
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
  </div>
);

export default Header;
