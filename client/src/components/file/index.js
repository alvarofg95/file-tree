import React, { createRef } from 'react';
import Icon from '../icon';
import fileIcon from '../../assets/file.png';
import viewIcon from '../../assets/view.png';
import downloadIcon from '../../assets/download.png';
import { apiCallDownload, DOWNLOAD_URL } from '../../utils/services';

const File = ({ name, route, onPreview }) => {
  const ref = createRef();

  const handleDownload = (preview = false) => {
    apiCallDownload(`${DOWNLOAD_URL}${route}`).then((res) => {
      const url = window.URL.createObjectURL(res);
      if (!preview) {
        ref.current.style.display = 'none';
        ref.current.href = url;
        ref.current.download = name;
        ref.current.click();
        window.URL.revokeObjectURL(url);
      } else {
        onPreview(url);
      }
    });
  };

  return (
    <div className="detail">
      <Icon src={fileIcon} />
      <p>{name}</p>
      <div className="icons">
        <Icon
          src={viewIcon}
          width="22"
          height="22"
          title="Preview"
          onClick={() => handleDownload(true)}
        />
        <Icon
          src={downloadIcon}
          width="22"
          height="22"
          title="Download"
          onClick={() => handleDownload(false)}
        />
        <a ref={ref} />
      </div>
    </div>
  );
};

export default File;
