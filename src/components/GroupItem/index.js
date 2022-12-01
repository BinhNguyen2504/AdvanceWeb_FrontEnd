import { Link } from 'react-router-dom';

const GroupItem = ({ name, id }) => (
  <div className='box'>
    <div className='tutor'>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
        alt=''
      />
      <div className='info'>
        <h3>{name}</h3>
        {/* <span>21-10-2022</span> */}
      </div>
    </div>
    <div className='thumb'>
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
        alt=''
      />
      {/* <span>10 videos</span> */}
    </div>
    <h3 className='title'>complete react tutorial</h3>
    <Link to={`/groups/${id}`} className='inline-btn'>
      view playlist
    </Link>
  </div>
);

export default GroupItem;
