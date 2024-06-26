import {getUniqueId} from '../../../Utils/commonUtils';

export const getEmptyField = () => {
  return {
    name: '',
    type: '',
    required: false,
    id: getUniqueId(),
  };
};
