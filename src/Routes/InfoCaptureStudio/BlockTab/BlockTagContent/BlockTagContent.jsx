import React from 'react';
import PropTypes from 'prop-types';
import cn from './BlockTagContent.module.scss';
import {removeRegexCharacters} from './BlockTagContent.helpers';

export const BlockTagContent = (props) => {
  const transcriptTextRegex = new RegExp(
    '(' + removeRegexCharacters(props.searchText ?? '') + ')',
    'gi'
  );
  const isNotMatched = (text) => {
    return !transcriptTextRegex.test(text);
  };

  return (
    <ul className={cn.blockTagContent}>
      {props.captureInfoBlocks.map((item) => {
        if (isNotMatched(item.text)) {
          return <></>;
        }
        return (
          <li key={item.id} onClick={props.showBlockType}>
            {item.text}
          </li>
        );
      })}
    </ul>
  );
};

BlockTagContent.propTypes = {
  captureInfoBlocks: PropTypes.array,
  showBlockType: PropTypes.func,
  searchText: PropTypes.string,
};
