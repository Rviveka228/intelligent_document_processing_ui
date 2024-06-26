import {SEARCH_TEXT_SPECIAL_CHARS} from './BlockTagContent.constants';

export const removeRegexCharacters = (searchText = '') => {
  return searchText.replace(/./g, (item) =>
    SEARCH_TEXT_SPECIAL_CHARS.includes(item) ? item : `\\${item}`
  );
};
