export const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const arrayCreator = (arr) => {
  const newArray = [];
  arr.forEach((item) => {
    newArray.push({value: item, label: capitalize(item.toLowerCase())});
  });
  return newArray;
};

export const deepClone = (value) => {
  return JSON.parse(JSON.stringify(value));
};

export const dataSorting = (arr) => {
  const newArray = [];
  arr.forEach((item) => {
    newArray.push({
      name: item.name,
      height: item.height,
      length: item.length,
      width: item.width,
      class: item.class,
    });
  });
  return newArray;
};

export const formatToTableStructure = (data, title) => {
  const tableData = Object.values(
    data.reduce((accumulator, item) => {
      if (!accumulator[item.row_index]) {
        accumulator[item.row_index] = {};
      }
      accumulator[item.row_index][item.col_index] = item.text;
      return accumulator;
    }, {})
  );
  return {data: tableData, title: title};
};

export const getUniqueId = (length = 2) => {
  return (
    Array(length)
      .fill('')
      .map(() => Math.trunc(Math.random() * 1e9).toString(16))
      .join('-') +
    '-' +
    (+new Date()).toString(16)
  );
};

export const removeDuplicatesByKey = (arr, key) => {
  // eslint-disable-next-line no-undef
  const uniqueValues = new Set();
  return arr.filter((obj) => {
    const value = obj[key];
    if (!uniqueValues.has(value)) {
      uniqueValues.add(value);
      return true;
    }
    return false;
  });
};

/**
 * @description handler to format error function based on the Yup schema
 * @return promise of error object
 */
export const validateForm = async (params) => {
  try {
    await params.schema.validate(params.data, {abortEarly: false});
    return {
      errorData: {},
      valid: true,
    };
  } catch (error) {
    const errorData =
      error.inner.reduce((accumulator, item) => {
        accumulator[item.path] = item.message;
        return accumulator;
      }, {}) ?? {};
    return {
      valid: false,
      errorData,
    };
  }
};

export const trimText = (text, trimLength) => {
  if (text && text.length > trimLength) {
    return text.substring(0, trimLength) + '...';
  }
  return text;
};
