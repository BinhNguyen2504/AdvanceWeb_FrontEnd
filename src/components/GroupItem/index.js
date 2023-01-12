/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';

const GroupItem = ({ data }) => (
  <div className='box'>
    <div className='tutor'>
      <img src='/img/thumbnail.jpg' alt='' />
      <div className='info'>
        <h3>{data.groupName}</h3>
      </div>
    </div>
    <div className='thumb'>
      <img src='/img/thumbnail.jpg' alt='' />
    </div>
    <h3 className='title'>{data.name}</h3>
    {data.id ? (
      <Link to={`/groups/${data.id}`} className='inline-btn'>
        view group
      </Link>
    ) : (
      <Link to={`/groups/${data._id}`} className='inline-btn'>
        view group
      </Link>
    )}
  </div>
);

export default GroupItem;
