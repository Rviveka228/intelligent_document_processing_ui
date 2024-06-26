import moment from 'moment';

export const getFormattedExceptionZoneData = (response) => {
  const tableData = response?.list_failed_docs?.map((item) => {
    return {
      pdfName: item?.file_name,
      configId: item?.config_id,
      processStartDate: moment
        .unix(item?.process_start_time)
        .format('YYYY-MMM-DD - HH:mm:ss'),
      processFailedDate: moment
        .unix(item?.process_failed_time)
        .format('YYYY-MMM-DD -  HH:mm:ss'),
      reRunning: item?.re_run,
      failedObjectKey: item?.failed_object_key,
      status: item?.status,
    };
  });
  return tableData;
};
