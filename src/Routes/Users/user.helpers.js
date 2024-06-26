export const getUserListFormattedData = (response) => {
  const formattedData = response.map((item) => {
    return {
      admin: item?.admin,
      id: item?.config_id,
      userName: item?.username,
    };
  });
  return formattedData;
};
