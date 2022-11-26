const SideBar = () => (
  <div className='side-bar'>
    <div id='close-btn'>
      <i className='fas fa-times' />
    </div>

    <div className='profile'>
      <img src='images/pic-1.jpg' className='image' alt='' />
      <h3 className='name'>Binh Nguyen</h3>
      <p className='role'>Student</p>
      <a href='profile.html' className='btn'>
        view profile
      </a>
    </div>

    <nav className='navbar'>
      <a href='home.html'>
        <i className='fas fa-home' />
        <span>home</span>
      </a>
      <a href='about.html'>
        <i className='fas fa-question' />
        <span>about</span>
      </a>
      <a href='courses.html'>
        <i className='fas fa-graduation-cap' />
        <span>courses</span>
      </a>
      <a href='teachers.html'>
        <i className='fas fa-chalkboard-user' />
        <span>teachers</span>
      </a>
      <a href='contact.html'>
        <i className='fas fa-headset' />
        <span>contact us</span>
      </a>
    </nav>
  </div>
);
export default SideBar;
