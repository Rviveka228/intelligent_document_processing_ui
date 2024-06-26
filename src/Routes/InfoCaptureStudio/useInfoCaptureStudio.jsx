/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable max-lines */

import {useEffect, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {v4 as uuidv4} from 'uuid';

import {PLANFILES} from '../../Utils/constants';

import {Notification} from '../../Components/Notification';

import {fetchCaptureInfo} from '../../Http/CaptureInfo';
import {fetchKeys} from '../../Http/Keys';
import {setTemplates, getTemplateById} from '../../Http/Configuration';
import {uploadPdf} from '../../Http/Upload';
import {processPdf} from '../../Http/Process';
import {useNavigate, useParams} from 'react-router';
import {ROUTE} from '../../Routes.constants';
import {getDocumentList, getDocumentTypes} from '../../Http/DocumentType';
import {getUniqueId, removeDuplicatesByKey} from '../../Utils/commonUtils';
import {reProcessingUpload} from '../../Http/ExceptionZone';
import {useSearchParams} from 'react-router-dom';

export default function useInfoCaptureStudio() {
  const navigate = useNavigate();
  let {templateId} = useParams();
  let height = 0;
  let width = 0;
  const [activeTab, setActiveTab] = useState('keyValues');
  const [specFileState, setSpecFileState] = useState({});
  const [fileInfo, setFileInfo] = useState();
  const [showFieldMapForm, setShowFieldMapForm] = useState({});
  const [keyValueFields, setKeyValueFields] = useState([]);
  const [tableFields, setTableFields] = useState([]);
  const [templateValues, setTemplateValues] = useState([]);
  const [tableTemplateValues, setTableTemplateValues] = useState([]);
  const [selectedFieldValues, setSelectedFieldValues] = useState({});
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isTableAssignModalOpen, setIsTableAssignModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [reviewedData, setReviewedData] = useState([]);
  const [allTableCells, setAllTableCells] = useState([]);
  const [selectedTableData, setSelectedTableData] = useState();
  const [templateName, setTemplateName] = useState('');
  const [templateDetails, setTemplateDetails] = useState([]);
  const [llmQuery, setLlmQuery] = useState('');
  const [llmTemplateValues, setLlmTemplateValues] = useState([]);
  const [selectedQueryFieldValues, setSelectedQueryFieldValues] = useState({});
  const [showTranformation, setShowTranformation] = useState(false);
  const [transformationData, setTransformationData] = useState([]);
  const [transformationLoading, setTransformationLoading] = useState(false);
  const [isQueryFieldAssignModalOpen, setIsQueryFieldAssignModalOpen] =
    useState(false);
  const [showQueryMapFormData, setShowQueryMapFormData] = useState({});
  const [getDocumentType, setGetDocumentType] = useState();
  const [getDocumentTypeId, setGetDocumentTypeId] = useState();
  const [mappedList, setMappedList] = useState([]);
  const [documentFields, setDocumentFields] = useState([]);
  const [captureInfoBlocks, setCaptureInfoBlocks] = useState([]);
  const [capturedLine, setCapturedLines] = useState([]);
  const [captureLineValues, setCaptureLineValues] = useState([]);
  const [initialClicked, setInitialClicked] = useState(false);
  const [showSpiltFields, setShowSplitFields] = useState(false);
  const [repeatedEntityFields, setRepeatedEntityFields] = useState([]);
  const [repeatedEntities, setRepeatedEntities] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const filePathException = searchParams.get('filePath');
  const s3Url = searchParams.get('url');
  const newExceptionTemplateDocId = searchParams.get('docId');
  const exceptionConfigId = searchParams.get('configId');

  const getTemplatesMutation = useMutation(
    ({templateId, filePathException}) =>
      getTemplateById(templateId, filePathException),
    {
      onSuccess: (data) => {
        setLlmTemplateValues(
          data.data.data.template
            .map((item) => ({
              ...item,
              id: uuidv4(),
              isNewlyMapped: true,
            }))
            .filter((item) => item.type === 'LLM')
        );
        setTemplateName(data?.data?.data?.name);
        setTemplateDetails(data?.data?.data?.template);
        setGetDocumentTypeId(data?.data?.data?.document_id);
        const repeatedEntityList = [
          'FIELD_KEY',
          'ADVANCED_OPTION',
          'LLM',
          'TABLE_ENTITY',
        ];
        setRepeatedEntityFields(
          data?.data?.data?.template
            // .filter((item) => !item?.value_orientation)
            .filter((item) => !repeatedEntityList.includes(item.type))
            .map((item) => {
              return {
                value: getUniqueId(),
                label: item.field,
                key: item.field,
                type: item.type,
              };
            })
        );
        setRepeatedEntities(
          data?.data?.data?.template
            .filter((item) => item?.value_orientation)
            .map((item) => {
              return {
                field: item?.field,
                id: item?.id,
                label_in_document: item?.label_in_document,
                multiple_titles: item?.multiple_titles,
                relative_field: item?.relative_field,
                relative_field_presence_count:
                  item?.relative_field_presence_count,
                presenceValue: item?.presenceValue,
                value_orientation: item?.value_orientation,
              };
            })
        );
        setCaptureLineValues(data?.data?.data?.id_strings?.map((item) => item));
        setFileInfo({
          fileId: data.data.data.uploaded_filepath,
          fileUri: data.data.data.s3_path,
        });
      },
      onError: (error) => {
        Notification({
          type: 'error',
          message: error.message || 'Something went wrong',
        });
      },
    }
  );

  useEffect(() => {
    if (templateId) {
      if (
        !getTemplatesMutation.isError &&
        !getTemplatesMutation.isLoading &&
        !getTemplatesMutation.data
      ) {
        getTemplatesMutation.mutate({templateId, filePathException});
      }
    }
  }, [filePathException]);

  useEffect(() => {
    if (templateDetails && templateDetails.length && templateId) {
      if (filePathException) {
        captureInfoMutation.mutate({
          s3_url: filePathException,
        });
      } else {
        captureInfoMutation.mutate({
          s3_url: fileInfo?.fileUri,
        });
      }
    }
  }, [templateDetails]);

  const handleMapNewFieldClick = (keyValue) => {
    setShowFieldMapForm(keyValue);
    setIsAssignModalOpen(true);
  };
  const handleSelectFieldValue = (value, keyValueId) => {
    setSelectedFieldValues((prev) => ({
      ...prev,
      [keyValueId]: value,
    }));
  };

  const handleSelectQueryFieldValue = (value, templateId) => {
    setSelectedQueryFieldValues((prev) => ({
      ...prev,
      [templateId]: value,
    }));
  };
  const revertFieldNameHandler = (keyValueId, oldValue) => {
    setTemplateValues((prev) =>
      prev.map((item) =>
        item.id === keyValueId
          ? {...item, value: oldValue, isNewlyMapped: false}
          : item
      )
    );
  };

  const assignNewKeyMapHandler = (keyValueId) => {
    const newValue = selectedFieldValues[keyValueId];
    if (newValue) {
      setTemplateValues((prev) =>
        prev.map((item) =>
          item.id === keyValueId
            ? {...item, value: newValue, isNewlyMapped: true}
            : item
        )
      );
      setIsAssignModalOpen(false);
    }
  };

  const mapQueryFieldHandler = (keyValue) => {
    setShowQueryMapFormData(keyValue);
    setIsQueryFieldAssignModalOpen(true);
  };

  const assignNewQueryFieldHandler = (templateId) => {
    const newValue = selectedQueryFieldValues[templateId];
    if (newValue) {
      setLlmTemplateValues((prevValues) => {
        return prevValues.map((item) =>
          item.id === templateId
            ? {...item, field: newValue, isNewlyMapped: true}
            : item
        );
      });
      setIsQueryFieldAssignModalOpen(false);
    }
  };

  const removeQueryFieldHandler = (templateId, oldValue) => {
    setLlmTemplateValues((prevValues) => {
      return prevValues.map((item) =>
        item.id === templateId
          ? {...item, field: oldValue, isNewlyMapped: false}
          : item
      );
    });
  };

  const {
    data: keysData,
    isLoading: isKeysDataLoading,
    isError: isKeysResponseError,
  } = useQuery({
    queryKey: 'fieldKeys',
    queryFn: () => fetchKeys(),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const saveTemplateMutation = useMutation((payload) => setTemplates(payload), {
    onSuccess: () => {
      Notification({
        type: 'success',
        message: 'Saved Template successfully',
      });
      setIsModelOpen(false);
      setFileInfo();
      setSpecFileState({});
      navigate(ROUTE.HOME);
    },
    onError: (error) => {
      setIsModelOpen(false);

      Notification({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
      setSpecFileState({});
      setFileInfo();
    },
  });

  const setTemplateValuesForMultiEntryAndKeyValues = (
    capturedInfoData,
    capturedTablesData
  ) => {
    const capturedInfo = [];
    const capturedTables = [];
    capturedInfoData.forEach((info) => {
      let keyData = {
        key: info.content,
        value: info.content,
        id: info.id,
        isNewlyMapped: false,
      };
      // Check if info's content matches any FIELD_KEY in templateData
      if (templateDetails && templateDetails.length && templateId) {
        const matchingField = templateDetails.find((field) => {
          return field.type === 'FIELD_KEY' && field.key === info.content;
        });

        if (matchingField) {
          keyData = {
            ...keyData,
            value: matchingField.field,
            isNewlyMapped: true,
          };
        }
      }
      capturedInfo.push(keyData);
    });

    // Iterate through captured_tables in captureData
    capturedTablesData.forEach((table, index) => {
      let matchingTable;
      if (templateDetails && templateDetails.length && templateId) {
        matchingTable = templateDetails.find((entity) => {
          return (
            entity.type === 'TABLE_ENTITY' && Number(entity.table_no) === index
          );
        });
      }

      table.cells.forEach((cell) => {
        // Check if the cell's content matches the column_name in the corresponding TABLE_ENTITY
        let tableKeyData = {
          tableId: table.id,
          key: cell.content,
          cellIndex: cell.cellIndex,
          cellId: cell.id,
          isNewlyMapped: false,
          value: cell.content,
          tableIndex: index,
        };
        if (matchingTable) {
          const matchingColumn = matchingTable.columns.find((column) => {
            return column.column_name === cell.content;
          });
          if (matchingColumn) {
            tableKeyData = {
              ...tableKeyData,
              isNewlyMapped: true,
              value: matchingColumn.field,
            };
          }
        }

        // Create object and push to capturedTables array
        capturedTables.push(tableKeyData);
      });
    });
    setTemplateValues(capturedInfo);
    setTableTemplateValues(capturedTables);
  };

  const captureInfoMutation = useMutation(
    (payload) => fetchCaptureInfo(payload),
    {
      onSuccess: (data) => {
        const capturedKeyInfo = data.data.captured_info;
        const captureInfoBlocksList = data?.data?.captured_blocks;
        const capturedLineList = data?.data?.captured_lines || [];
        const capturedTables = data.data.captured_tables.map((item) => {
          return {
            cells: item.cells.filter((cell) => cell.rowIndex === 0),
            id: item.id,
            pageIndex: item.pageIndex,
          };
        });

        setAllTableCells(
          data.data.captured_tables.flatMap((page) => {
            return page.cells.map((cell) => ({
              pageIndex: page.pageIndex,
              ...cell,
            }));
          })
        );
        setKeyValueFields(capturedKeyInfo);
        setCaptureInfoBlocks(captureInfoBlocksList);
        setTableFields(capturedTables);
        setCapturedLines(
          removeDuplicatesByKey(
            capturedLineList.map((item) => {
              return {
                value: item.text,
                label: item.text,
              };
            }),
            'value'
          )
        );
        setTemplateValuesForMultiEntryAndKeyValues(
          capturedKeyInfo,
          data.data.captured_tables
        );
      },
      onError: (error) => {
        Notification({
          type: 'error',
          message: error.message || 'Something went wrong',
        });
      },
      retry: 3,
    }
  );

  const uploadFileMutation = useMutation((payload) => uploadPdf(payload), {
    onSuccess: (data) => {
      setFileInfo({
        fileId: data.data.uploaded_filepath,
        fileUri: data.data.s3_path,
      });
      setSpecFileState({});

      captureInfoMutation.mutate({s3_url: data?.data?.s3_path});
    },
    onError: (error) => {
      setSpecFileState({});

      Notification({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
    },
  });

  const reviewFieldMapMutation = useMutation((payload) => processPdf(payload), {
    onSuccess: (data) => {
      setTransformationLoading(false);
      setReviewedData(
        Array.isArray(data.data.objects)
          ? data.data.objects
          : [data.data.objects]
      );
    },
    onError: (error) => {
      setTransformationLoading(false);
      setIsPreviewModalOpen(false);

      Notification({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
    },
    retry: 2,
  });

  const getTemplatePayload = ({
    transformations,
    splitFields,
    repeatedEntities,
  }) => {
    const mappedFields = templateValues.filter((item) => item.isNewlyMapped);
    const mappedQueryFields = llmTemplateValues.filter(
      (item) => item.isNewlyMapped
    );
    const mappedTableFields = tableTemplateValues.filter(
      (item) => item.isNewlyMapped
    );
    if (
      !mappedFields.length &&
      !mappedTableFields.length &&
      !mappedQueryFields.length
    ) {
      Notification({
        type: 'error',
        message: 'Please map minimum one field to continue!',
      });
      return false;
    }
    const keyValueTemplates = [];
    repeatedEntities?.forEach((item) => {
      // eslint-disable-next-line no-unused-vars
      const {id, type, ...restItem} = item;
      const fieldId = repeatedEntityFields.find(
        (fItem) => fItem.label === item.field
      )?.value;
      const transformation = transformations?.[fieldId];
      const split_field_config = splitFields?.[fieldId]?.map((splitItem) => {
        const fieldName = documentFields?.find(
          (fItem) => fItem.value === splitItem.field
        )?.label;
        return {
          field_name: fieldName,
          split_method: splitItem?.value,
        };
      });
      keyValueTemplates.push({
        ...restItem,
        type: type ?? 'REPEATED_ENTITY',
        transformation,
        split_field_config,
        key: restItem?.field,
      });
    });
    mappedFields.forEach((item) => {
      keyValueTemplates.push({
        field: item.value,
        key: item.key,
        type: 'FIELD_KEY',
        transformation: transformations?.[item.id],
        split_field_config: (splitFields?.[item?.id] ?? []).map((splitItem) => {
          const fieldName = documentFields?.find(
            (fItem) => fItem.value === splitItem.field
          )?.label;
          return {
            field_name: fieldName,
            split_method: splitItem?.value,
          };
        }),
      });
    });

    mappedQueryFields.forEach((queryField) => {
      keyValueTemplates.push({
        field: queryField.field,
        key: queryField.key,
        type: 'LLM',
        transformation: transformations?.[queryField.id],
        split_field_config: (splitFields?.[queryField?.id] ?? []).map(
          (splitItem) => {
            const fieldName = documentFields?.find(
              (fItem) => fItem.value === splitItem.field
            )?.label;
            return {
              field_name: fieldName,
              split_method: splitItem?.value,
            };
          }
        ),
      });
    });

    const tableTemplates = [];
    for (const tableFieldData of mappedTableFields) {
      const existingTemplate = tableTemplates.find(
        (template) => template.table_no === tableFieldData.tableIndex
      );
      if (!existingTemplate) {
        tableTemplates.push({
          table_no: tableFieldData.tableIndex,
          columns: [
            {
              column_name: tableFieldData.key,
              field: tableFieldData.value,
              transformation: transformations?.[tableFieldData.cellId],
              split_field_config: (
                splitFields?.[tableFieldData.cellId] ?? []
              ).map((splitItem) => {
                const fieldName = documentFields?.find(
                  (fItem) => fItem.value === splitItem.field
                )?.label;
                return {
                  field_name: fieldName,
                  split_method: splitItem?.value,
                };
              }),
            },
          ],
          type: 'TABLE_ENTITY',
        });
      } else {
        existingTemplate.columns.push({
          column_name: tableFieldData.key,
          field: tableFieldData.value,
          transformation: transformations?.[tableFieldData.cellId],
          split_field_config: (splitFields?.[tableFieldData.cellId] ?? []).map(
            (splitItem) => {
              return {
                field_name: tableFieldData?.value,
                split_method: splitItem?.value,
              };
            }
          ),
        });
      }
    }
    return [...keyValueTemplates, ...tableTemplates];
  };
  const onReProcess = async () => {
    try {
      await reProcessingUpload({
        config_id: exceptionConfigId,
      });
    } catch (error) {
      error;
    }
  };
  const onOkClickHandler = ({transformations, splitFields}) => {
    const templateData = getTemplatePayload({
      transformations,
      splitFields,
      repeatedEntities,
    });
    if (!templateData) {
      return;
    }
    let data = {
      document_id: getDocumentTypeId,
      name: templateName,
      template: templateData,
      uploaded_filepath: fileInfo?.fileId,
      s3_path: fileInfo?.fileUri || null,
      id_strings: captureLineValues,
    };
    if (templateId) {
      data = {...data, template_id: templateId};
    }
    saveTemplateMutation.mutate(data);
    if (filePathException || s3Url || newExceptionTemplateDocId) {
      onReProcess();
    }
  };

  const onSaveTemplateClickHandler = ({splitFields}) => {
    setInitialClicked(true);
    setShowSplitFields(true);
    const mappedFields = templateValues.filter((item) => item.isNewlyMapped);
    const mappedQueryFields = llmTemplateValues.filter(
      (item) => item.isNewlyMapped
    );
    const mappedTableFields = tableTemplateValues.filter(
      (item) => item.isNewlyMapped
    );
    if (
      !mappedFields.length &&
      !mappedTableFields.length &&
      !mappedQueryFields.length
    ) {
      Notification({
        type: 'error',
        message: 'Please map minimum one field to continue!',
      });
      return false;
    }
    if (showTranformation) {
      setIsModelOpen(true);
      return;
    }
    const keyValueTemplates = [];

    mappedFields.forEach((item) => {
      keyValueTemplates.push({
        id: item.id,
        field: item.value,
        key: item.key,
        type: 'FIELD_KEY',
      });
    });
    mappedQueryFields.forEach((queryField) => {
      keyValueTemplates.push({
        id: queryField.id,
        field: queryField.field,
        key: queryField.key,
        type: 'LLM',
      });
    });

    mappedTableFields.forEach((tableField) => {
      keyValueTemplates.push({
        id: tableField.cellId,
        field: tableField.value,
        key: tableField.key,
        type: 'TABLE_ENTITY',
        tableId: tableField.tableId,
      });
    });
    repeatedEntityFields.forEach((item) => {
      keyValueTemplates.push({
        id: item?.value,
        field: item?.label,
        key: item?.label,
        type: 'REPEATED_ENTITY',
      });
    });
    if (
      mappedQueryFields.length ||
      mappedTableFields.length ||
      repeatedEntityFields?.length
    ) {
      setTransformationLoading(true);
      reviewClickHandler({
        isFromTransformation: true,
        splitFields,
      });
    }
    setTransformationData(keyValueTemplates);
    setShowTranformation(true);
    reviewClickHandler({
      isFromTransformation: true,
      splitFields,
    });
    return;
  };

  const beforeUploadHandler = (file, name) => {
    setSpecFileState((previousState) => {
      return {...previousState, [name]: file};
    });
  };

  const onRemoveFileHandler = (file, name) => {
    setSpecFileState((prevState) => {
      const newState = {...prevState};
      delete newState[name];
      return newState;
    });
  };

  const onFileUploadHandler = () => {
    const formData = new FormData();

    formData.append('pdf_file', specFileState[PLANFILES.CAPTURE_STUDIO_FILE]);
    uploadFileMutation.mutate(formData);
  };

  const onTableClickHandler = (tableCells, id) => {
    setSelectedTableData({tableId: id, cells: tableCells});
    setIsTableAssignModalOpen(true);
  };

  const handleAssignTableField = (cellId, rowIndex) => {
    toggleIsBeingEdited(cellId, rowIndex, true);
  };

  const removeTableFieldMappingHandler = (data) => {
    setTableTemplateValues((prev) =>
      prev.map((tableValue) =>
        tableValue.tableId === data.tableId &&
        tableValue.cellId === data.cellData.id
          ? {...tableValue, value: tableValue.key, isNewlyMapped: false}
          : tableValue
      )
    );
    toggleIsBeingEdited(data.cellData.id, data.cellData.rowIndex, false);
  };

  // eslint-disable-next-line max-params
  const toggleIsBeingEdited = (cellId, rowIndex, showEdit) => {
    setSelectedTableData((prevData) => {
      return {
        ...prevData,
        cells: prevData.cells.map((cell) => {
          if (cell.rowIndex === rowIndex && cell.id === cellId) {
            // eslint-disable-next-line no-unused-vars
            const {isBeingEdited, ...otherData} = cell;
            if (showEdit) {
              return {
                ...otherData,
                isBeingEdited: true,
              };
            } else {
              return {...otherData};
            }
          }
          return cell;
        }),
      };
    });
  };

  const newTableFieldAssignHandler = (data) => {
    setTableTemplateValues((prev) =>
      prev.map((tableValue) =>
        tableValue.tableId === data.tableId && tableValue.cellId === data.cellId
          ? {...tableValue, value: data.value, isNewlyMapped: true}
          : tableValue
      )
    );
  };

  const reviewClickHandler = ({
    isFromTransformation = false,
    transformations,
    splitFields,
  }) => {
    const templateData = getTemplatePayload({
      repeatedEntities: repeatedEntities,
      transformations: transformations,
      splitFields: splitFields,
    });
    if (!templateData) {
      return;
    }
    if (!isFromTransformation) {
      setIsPreviewModalOpen(true);
    }
    reviewFieldMapMutation.mutate({
      // pdf_file: fileInfo.fileId,
      s3_url: fileInfo?.fileUri ? fileInfo?.fileUri : filePathException,
      document_id: getDocumentTypeId,
      template: templateData,
      // transformation: transformations,
    });
  };

  const submitQueryHandler = () => {
    if (!llmQuery) {
      Notification({
        type: 'error',
        message: 'Please input a query to continue!',
      });
      return;
    }
    setLlmQuery('');
    setLlmTemplateValues((prev) => {
      return [
        ...prev,
        {
          field: llmQuery,
          key: llmQuery,
          id: uuidv4(),
          isNewlyMapped: false,
        },
      ];
    });
  };
  const handleTranformationData = ({value, key, id}) => {
    setTransformationData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [key]: value,
          };
        }
        return item;
      })
    );
  };

  const onResetHandler = () => {
    setShowTranformation(false);
    setFileInfo();
    setAllTableCells([]);
    setActiveTab('keyValues');
    setSpecFileState({});
    setShowFieldMapForm({});
    setKeyValueFields([]);
    setTableFields([]);
    setTemplateValues([]);
    setTableTemplateValues([]);
    setSelectedFieldValues({});
    setIsModelOpen(false);
    setIsAssignModalOpen(false);
    setIsTableAssignModalOpen(false);
    setIsPreviewModalOpen(false);
    setReviewedData([]);
    setAllTableCells([]);
    setSelectedTableData();
    setTemplateName('');
    setCaptureLineValues([]);
    setShowSplitFields(false);
    navigate(ROUTE.CAPTURE_STUDIO);
  };
  const customCanvasPlugin = () => {
    const onCanvasLayerRender = (e) => {
      if (!e || !e.status) {
        return;
      }

      const pageIndex = e.pageIndex;
      const canvas = e.ele;
      const context = canvas.getContext('2d');
      context.globalAlpha = 0.2;
      context.lineWidth = 2;
      context.strokeStyle = 'red';
      if (canvas.height > height) {
        height = canvas.height;
      }
      if (canvas.width > width) {
        width = canvas.width;
      }

      const keyValuesOnPage = keyValueFields.filter(
        (keyValue) => keyValue.pageIndex === pageIndex
      );

      keyValuesOnPage.forEach((keyValueNote) => {
        keyValueNote.highlightAreas.forEach((area) => {
          const rectangleData = {
            height: area.height * height,
            left: area.left * width,
            top: area.top * height,
            width: area.width * width,
          };
          context.strokeRect(
            rectangleData.left,
            rectangleData.top,
            rectangleData.width,
            rectangleData.height
          );

          context.fillRect(
            rectangleData.left,
            rectangleData.top,
            rectangleData.width,
            rectangleData.height
          );
        });
      });
      context.globalAlpha = 1;
    };

    return {
      onCanvasLayerRender,
    };
  };
  const customTableCanvasPlugin = () => {
    const onCanvasLayerRender = (e) => {
      if (!e || !e.status) {
        return;
      }
      // eslint-disable-next-line no-unused-vars
      const pageIndex = e.pageIndex;
      const canvas = e.ele;
      const context = canvas.getContext('2d');
      context.globalAlpha = 0.2;
      context.lineWidth = 2;
      context.strokeStyle = 'red';
      if (canvas.height > height) {
        height = canvas.height;
      }
      if (canvas.width > width) {
        width = canvas.width;
      }

      const keyValuesOnPage = allTableCells.filter(
        (keyValue) => keyValue.pageIndex === pageIndex
      );
      keyValuesOnPage.forEach((keyValueNote) => {
        keyValueNote.highlightAreas.forEach((area) => {
          const rectangleData = {
            height: area.height * height,
            left: area.left * width,
            top: area.top * height,
            width: area.width * width,
          };
          context.strokeRect(
            rectangleData.left,
            rectangleData.top,
            rectangleData.width,
            rectangleData.height
          );

          context.fillRect(
            rectangleData.left,
            rectangleData.top,
            rectangleData.width,
            rectangleData.height
          );
        });
      });

      context.globalAlpha = 1;
    };

    return {
      onCanvasLayerRender,
    };
  };
  const customBlockCanvasPlugin = () => {
    const onCanvasLayerRender = (e) => {
      if (!e || !e.status) {
        return;
      }

      const pageIndex = e.pageIndex;
      const canvas = e.ele;
      const context = canvas.getContext('2d');
      context.globalAlpha = 0.2;
      context.lineWidth = 2;
      context.strokeStyle = 'red';
      if (canvas.height > height) {
        height = canvas.height;
      }
      if (canvas.width > width) {
        width = canvas.width;
      }

      const keyValuesOnPage = captureInfoBlocks.filter(
        (keyValue) => keyValue.pageIndex === pageIndex
      );

      keyValuesOnPage.forEach((keyValueNote) => {
        const rectangleData = {
          height: keyValueNote.geometry.height * height,
          left: keyValueNote.geometry.left * width,
          top: keyValueNote.geometry.top * height,
          width: keyValueNote.geometry.width * width,
        };
        context.strokeRect(
          rectangleData.left,
          rectangleData.top,
          rectangleData.width,
          rectangleData.height
        );

        context.fillRect(
          rectangleData.left,
          rectangleData.top,
          rectangleData.width,
          rectangleData.height
        );
      });
      context.globalAlpha = 1;
    };

    return {
      onCanvasLayerRender,
    };
  };

  const customCanvasPluginInstance = customCanvasPlugin();
  const customTableCanvasPluginInstance = customTableCanvasPlugin();
  const customBlockCanvasPluginsInstance = customBlockCanvasPlugin();
  useEffect(() => {
    const documentTypeList = async () => {
      const response = await getDocumentList();
      setGetDocumentType(response?.data);
    };
    documentTypeList();
  }, []);

  useEffect(() => {
    const documentTypeListWIthId = async () => {
      if (getDocumentTypeId) {
        const response = await getDocumentTypes(getDocumentTypeId);
        setMappedList(response.data?.data?.fields.map((item) => item.name));
        setDocumentFields(
          response.data?.data?.fields.map((item) => {
            return {
              label: item?.name,
              value: item?.id,
            };
          })
        );
      }
    };
    documentTypeListWIthId();
  }, [getDocumentTypeId]);

  const onDocumentIdSelect = (value) => {
    setGetDocumentTypeId(value);
  };

  return {
    keyValueFields,
    fileInfo,
    captureInfoMutation,
    showFieldMapForm,
    handleMapNewFieldClick,
    handleSelectFieldValue,
    selectedFieldValues,
    assignNewKeyMapHandler,
    keysData,
    isKeysDataLoading,
    isKeysResponseError,
    isModalOpen,
    setIsModelOpen,
    onOkClickHandler,
    templateName,
    setTemplateName,
    onSaveTemplateClickHandler,
    customCanvasPluginInstance,
    templateValues,
    revertFieldNameHandler,
    beforeUploadHandler,
    onRemoveFileHandler,
    specFileState,
    onFileUploadHandler,
    uploadFileMutation,
    isAssignModalOpen,
    setIsAssignModalOpen,
    activeTab,
    setActiveTab,
    setIsTableAssignModalOpen,
    isTableAssignModalOpen,
    onTableClickHandler,
    selectedTableData,
    tableTemplateValues,
    tableFields,
    handleAssignTableField,
    removeTableFieldMappingHandler,
    newTableFieldAssignHandler,
    setIsPreviewModalOpen,
    isPreviewModalOpen,
    reviewClickHandler,
    reviewedData,
    reviewFieldMapMutation,
    setFileInfo,
    customTableCanvasPluginInstance,
    onResetHandler,
    saveTemplateMutation,
    getTemplatesMutation,
    setLlmQuery,
    llmQuery,
    submitQueryHandler,
    llmTemplateValues,
    selectedQueryFieldValues,
    setSelectedQueryFieldValues,
    handleSelectQueryFieldValue,
    assignNewQueryFieldHandler,
    mapQueryFieldHandler,
    removeQueryFieldHandler,
    isQueryFieldAssignModalOpen,
    setIsQueryFieldAssignModalOpen,
    showQueryMapFormData,
    templateId,
    setShowTranformation,
    showTranformation,
    transformationData,
    transformationLoading,
    handleTranformationData,
    getDocumentType,
    onDocumentIdSelect,
    getDocumentTypeId,
    mappedList,
    captureInfoBlocks,
    customBlockCanvasPluginsInstance,
    capturedLine,
    captureLineValues,
    setCaptureLineValues,
    setGetDocumentTypeId,
    filePathException,
    s3Url,
    newExceptionTemplateDocId,
    initialClicked,
    showSpiltFields,
    documentFields,
    templateDetails,
    setRepeatedEntityFields,
    repeatedEntityFields,
    repeatedEntities,
    setRepeatedEntities,
  };
}
