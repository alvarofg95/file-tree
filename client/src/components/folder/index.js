import React from 'react';
import Icon from '../icon';
import folderIcon from '../../assets/folder.png';
import openIcon from '../../assets/open.png';
import './index.css';

const Folder = ({ name, handleClick }) => {
  return (
    <div className="detail">
      <Icon src={folderIcon} />
      <p>{name}</p>
      <Icon src={openIcon} height="25" width="25" onClick={handleClick} />
    </div>
  );
};

export default Folder;
