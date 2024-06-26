import {getUniqueId} from '../../../Utils/commonUtils';

export const getDefaultZoneItem = () => {
  return {
    doc_type: null,
    doc_type_id: null,
    input: null,
    output: null,
    error: null,
    id: getUniqueId(),
  };
};
