import React, {useState} from 'react';
import PropTypes from 'prop-types';
import CustomScrollbar from '../../../Components/CustomScrollbar';

import cn from './BlockTab.module.scss';
import {InputBox} from '../../../Components/InputBox/InputBox';
import {AddBlockType} from '../AddBlockType';
import {BlockTagContent} from './BlockTagContent/BlockTagContent';

export const BlockTab = (props) => {
  const [blockTypeVisible, setBlockTypeVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const onTextChange = (event) => {
    setSearchText(event.target?.value);
  };

  const hideBlockType = () => {
    setBlockTypeVisible(false);
  };

  const showBlockType = () => {
    setBlockTypeVisible(true);
  };

  return (
    <div className={cn.blockWrapper}>
      <div className={cn.blockInput}>
        <InputBox
          value={searchText}
          onChange={onTextChange}
          placeholderLabel={'Search ...'}
        />
      </div>
      <CustomScrollbar className={'pdf-aside-scroll'}>
        <BlockTagContent
          showBlockType={showBlockType}
          captureInfoBlocks={props.captureInfoBlocks}
          searchText={searchText}
        />
      </CustomScrollbar>
      {blockTypeVisible && (
        <AddBlockType
          mappedList={props.mappedList}
          selectedFieldValues={props.selectedFieldValues}
          handleSelectFieldValue={props.handleSelectFieldValue}
          handleOk={hideBlockType}
        />
      )}
    </div>
  );
};

BlockTab.propTypes = {
  captureInfoBlocks: PropTypes.array,
  mappedList: PropTypes.array,
  selectedFieldValues: PropTypes.object,
  handleSelectFieldValue: PropTypes.object,
};
