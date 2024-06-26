export const formatAllTemplate = (response) => {
  const formatData = response.map((item) => {
    return {
      createdDate: item.created_date,
      id: item.template_id,
      templateName: item.template_name,
    };
  });
  return formatData;
};
