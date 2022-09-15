import React from 'react';

const Icon = ({ src, height = '32', width = '32', title, onClick }) => {
  return (
    <img
      src={src}
      width={width}
      height={height}
      alt={title}
      title={title}
      onClick={onClick}
    />
  );
};

export default Icon;
