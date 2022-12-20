import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const { username, email } = useSelector((state) => state.auth);

  return (
    <div className='side-bar'>
      <div id='close-btn'>
        <i className='fas fa-times' />
      </div>
      <div className='profile'>
        <img src='/img/ava.jpg' className='image' alt='' />
        <h3 className='name'>{username}</h3>
        <p className='role'>{email}</p>
        <Link to='/profile' className='btn'>
          view profile
        </Link>
      </div>
      <nav className='navbar'>
        <Link to='/dashboard'>
          <i className='fas fa-home' />
          <span>Dashboard</span>
        </Link>
        <Link to='/groups'>
          <i className='fas fa-chalkboard-user' />
          <span>Groups</span>
        </Link>
        <Link to='/presentation'>
          <i className='fas fa-chalkboard-user' />
          <span>Presentation</span>
        </Link>
        {/* <Link to='/dashboard'>
          <i className='fas fa-headset' />
          <span>Contact us</span>
        </Link> */}
      </nav>
    </div>
  );
};
export default SideBar;
