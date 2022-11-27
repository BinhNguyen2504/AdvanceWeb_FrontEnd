const SideBar = () => (
  <div className='side-bar'>
    <div id='close-btn'>
      <i className='fas fa-times' />
    </div>

    <div className='profile'>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
        className='image'
        alt=''
      />
      <h3 className='name'>Binh Nguyen</h3>
      <p className='role'>Student</p>
      <a href='/profile' className='btn'>
        view profile
      </a>
    </div>

    <nav className='navbar'>
      <a href='/'>
        <i className='fas fa-home' />
        <span>home</span>
      </a>
      <a href='about.html'>
        <i className='fas fa-question' />
        <span>about</span>
      </a>
      <a href='/groups'>
        <i className='fas fa-graduation-cap' />
        <span>groups</span>
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
