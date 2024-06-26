/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Button from '../../../Components/Button';
import {SelectElement} from '../../../Components/SelectElement/SelectElement';
import {SVGIcons} from '../../../Components/SVGIcons';
import cn from './Helpers.module.scss';

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
export const TABLE_ASSIGNMENTS_COLUMNS = ({
  onTableFieldAssignClick,
  keysData,
  mappedList,
  onNewTableFieldValueSelect,
  currentTemplateValues,
  tableId,
  onRemoveTableFieldMapping,
}) => {
  return [
    {
      title: 'Column Name',
      dataIndex: 'content',
      key: 'columnName',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        const currentTableValue = currentTemplateValues.find(
          (templateValue) =>
            templateValue.tableId === tableId &&
            templateValue.cellId === record.id
        );
        if (currentTableValue.isNewlyMapped) {
          return (
            <div className={cn.tableControls}>
              <div className={cn.tableSelectbox}>
                <SelectElement
                  showSearch
                  filterOption={filterOption}
                  value={currentTableValue.value}
                  placeholder='Select the new field name'
                  onSelect={(value) => {
                    onNewTableFieldValueSelect({
                      value: value,
                      cellId: record.id,
                      tableId: tableId,
                    });
                  }}
                  options={mappedList.map((key) => {
                    return {
                      value: key,
                      label: key,
                    };
                  })}
                />
              </div>
              <div className={cn.tableButton}>
                <Button
                  type='link'
                  onClick={() =>
                    onRemoveTableFieldMapping({cellData: record, tableId})
                  }
                  icon={<SVGIcons type={'SVG-cross-mark'} />}></Button>
              </div>
            </div>
          );
        } else {
          if (!record.isBeingEdited) {
            return (
              <Button
                type='link'
                onClick={() => onTableFieldAssignClick(record)}>
                Add Mapping
              </Button>
            );
          } else {
            return (
              <div className={cn.tableSelectbox}>
                <SelectElement
                  showSearch
                  filterOption={filterOption}
                  placeholder='Select the new field name'
                  onSelect={(value) => {
                    onNewTableFieldValueSelect({
                      value: value,
                      cellId: record.id,
                      tableId: tableId,
                    });
                  }}
                  options={mappedList.map((key) => {
                    return {
                      value: key,
                      label: key,
                    };
                  })}
                />
              </div>
            );
          }
        }
      },
    },
  ];
};

export const filterTableColumns = (tableData) => {
  let nonContentEmptyData = tableData.filter((data) => {
    return data.content != '';
  });

  return nonContentEmptyData;
};

export const reviewDataSource = (data) => {
  const iterableData = Object.entries(data ?? {});
  const primaryData = iterableData?.filter(
    (item) => item[0] !== 'data_quality'
  );
  const dataQuality = iterableData?.find(
    (item) => item[0] === 'data_quality'
  )?.[1];
  const mappedData = primaryData?.map(([field, value]) => {
    return {
      key: field,
      field,
      value: value || 'N/A',
    };
  });
  const crossAppendedData = mappedData?.map((item) => {
    return {
      ...item,
      dataQuality: dataQuality?.find(
        (fItem) => fItem?.field_name === item?.field
      )?.DQS,
    };
  });
  return crossAppendedData;
};

export const reviewTableColumns = [
  {
    title: 'Field',
    dataIndex: 'field',
    key: 'container',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'Data Quality',
    dataIndex: 'dataQuality',
    key: 'dataQuality',
  },
];
