/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';

const GroupCard = ({ data }) => {
  console.log('group card: ', data);

  return (
    <div className='box'>
      <div className='tutor'>
        <img src='/img/thumbnail.jpg' alt='' />
        <div className='info'>
          <h3>{data.groupName}</h3>
          {/* <span>21-10-2022</span> */}
        </div>
      </div>
      <div className='thumb'>
        <img src='/img/thumbnail.jpg' alt='' />
        {/* <span>10 videos</span> */}
      </div>
      <h3 className='title'>{data.name}</h3>
      <h5 className='title'>
        Number of member:
        {data.member.length}
      </h5>
      <p className='title'>
        Owner:
        {data.owner.name}
      </p>
      <Link to={`/toan/groups/${data._id}`} className='inline-btn'>
        view group
      </Link>
    </div>
  );
};

export default GroupCard;
