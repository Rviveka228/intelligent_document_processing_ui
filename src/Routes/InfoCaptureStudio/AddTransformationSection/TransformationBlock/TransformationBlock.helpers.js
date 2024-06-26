import {getUniqueId} from '../../../../Utils/commonUtils';

export const getDefaultTransFormations = () => {
  return [
    {
      value: '',
      id: getUniqueId(),
    },
  ];
};

export const appliedTransformationFormatter = (data) => {
  let newData = [];
  data.forEach((item) => {
    if (item.type === 'TABLE_ENTITY') {
      item.columns.forEach((item) => {
        newData.push({
          field: item.field,
          key: item.column_name,
          type: 'TABLE_ENTITY',
          transformation: item.transformation,
          split_field_config: item.split_field_config,
        });
      });
    } else {
      newData.push(item);
    }
  });
  return newData;
};
