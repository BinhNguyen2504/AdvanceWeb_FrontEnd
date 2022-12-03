import { Link } from 'react-router-dom';

const GroupItem = ({ name, id }) => (
  <div className='box'>
    <div className='tutor'>
      <img src='/img/thumbnail.jpg' alt='' />
      <div className='info'>
        <h3>{name}</h3>
        {/* <span>21-10-2022</span> */}
      </div>
    </div>
    <div className='thumb'>
      <img src='/img/thumbnail.jpg' alt='' />
      {/* <span>10 videos</span> */}
    </div>
    <h3 className='title'>complete react tutorial</h3>
    <Link to={`/groups/${id}`} className='inline-btn'>
      view playlist
    </Link>
  </div>
);

export default GroupItem;
