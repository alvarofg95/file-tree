import React, { useEffect, useReducer } from 'react';
import Modal from 'react-modal';
import Folder from './components/folder';
import File from './components/file';
import apiCall, { FIND_URL } from './utils/services';

const initialState = {
  fileTree: [],
};

const updateFileTree = (tree = [], name, result) => {
  return tree.map((item) => {
    if (item.name === name) {
      item.children = result;
    } else {
      updateFileTree(item.children, name, result);
    }
    return item;
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FIRST_LOAD':
      return {
        ...state,
        fileTree: action.payload,
      };
    case 'ADD_CHILDREN':
      const { fileTree } = state;
      const { payload, key } = action;
      return {
        ...state,
        fileTree: updateFileTree(fileTree, key, payload),
      };
    case 'OPEN_PREVIEW':
      return {
        ...state,
        modal: true,
        modalUrl: action.payload,
      };
    case 'CLOSE_PREVIEW':
      return {
        ...state,
        modal: false,
        modalUrl: null,
      };
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fileTree, modal, modalUrl } = state;

  useEffect(() => {
    apiCall().then((res) => dispatch({ type: 'FIRST_LOAD', payload: res }));
  }, []);

  const onClickFolder = (url) => {
    const finalUrl = url.route || url.name;
    apiCall(`${FIND_URL}${finalUrl}`).then((res) => {
      dispatch({
        type: 'ADD_CHILDREN',
        key: url.name,
        payload: res,
      });
    });
  };

  const handlePreview = (url) => {
    dispatch({ type: 'OPEN_PREVIEW', payload: url });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_PREVIEW' });
  };

  const renderTree = (children) => {
    return children.map((item, index) => {
      const { children } = item;
      return (
        <div key={index} className="itemContainer">
          {item.folder ? (
            <Folder {...item} handleClick={() => onClickFolder(item)} />
          ) : (
            <File {...item} onPreview={handlePreview} />
          )}
          {item.children && renderTree(children)}
        </div>
      );
    });
  };

  return (
    <div className="container">
      {renderTree(fileTree)}
      <Modal isOpen={modal && modalUrl} className="customModal">
        <div>
          <iframe src={modalUrl} />
        </div>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default App;
