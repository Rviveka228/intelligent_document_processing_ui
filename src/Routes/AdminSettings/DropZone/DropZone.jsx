import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {SelectElement} from '../../../Components/SelectElement/SelectElement';
import {InputBox} from '../../../Components/InputBox/InputBox';
import cn from './DropZone.module.scss';
import {getDocumentList} from '../../../Http/DocumentType';
import {getDefaultZoneItem} from './DropZone.helpers';
import {getUniqueId} from '../../../Utils/commonUtils';
import Button from '../../../Components/Button';
import {SVGIcons} from '../../../Components/SVGIcons/SVGIcons';

export const DropZone = (props) => {
  const [zoneList, setZoneList] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [documentLoading, setDocumentLoading] = useState(true);

  const documentTypeList = async () => {
    try {
      setDocumentLoading(true);
      const response = await getDocumentList();
      setDocumentTypes(
        response?.data?.documents.map((item) => {
          return {
            value: item.document_id,
            label: item.document_name,
          };
        }) ?? []
      );
      setDocumentLoading(false);
    } catch {
      setDocumentLoading(false);
    }
  };

  const onDropZoneChanged = (changedList) => {
    props.onDropZoneChanged(
      changedList.map((item) => {
        // eslint-disable-next-line no-unused-vars
        const {id, ...restItem} = item;
        return restItem;
      })
    );
  };
  const onRemove = (id) => () => {
    const newZoneList = zoneList.filter((item) => item.id !== id);
    props.onDropZoneChanged(newZoneList);
    setZoneList(newZoneList);
  };

  const onAdd = () => {
    const newZoneList = [...zoneList, getDefaultZoneItem()];
    setZoneList(newZoneList);
  };

  const onTextChange = (id, field) => (event) => {
    const value = event.target?.value;
    const newZoneList = zoneList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });

    onDropZoneChanged(newZoneList);
    setZoneList(newZoneList);
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    documentTypeList();
    setZoneList(
      props.zoneList?.map((item) => {
        return {
          ...item,
          id: getUniqueId(),
        };
      }) ?? [getDefaultZoneItem()]
    );
  }, []);

  const onDocumentTypeChange = (id) => (value) => {
    const newZoneList = zoneList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          doc_type: documentTypes.find((fItem) => value === fItem.value).label,
          doc_type_id: value,
        };
      }
      return item;
    });

    onDropZoneChanged(newZoneList);
    setZoneList(newZoneList);
  };

  return (
    <div className={cn.dropZone}>
      <label>Drop Zone</label>
      <ul className={cn.dropZone__list}>
        {zoneList.map((item, index) => {
          return (
            <li key={item.id}>
              <div className={cn.zoneInputBlock}>
                <div className={cn.zoneInputItem}>
                  <label>Document Type</label>
                  <SelectElement
                    className={cn.dropZoneDocument}
                    loading={documentLoading}
                    showSearch
                    value={item.doc_type_id}
                    filterOption={filterOption}
                    options={documentTypes}
                    onSelect={onDocumentTypeChange(item.id)}
                    placeholder='Document Type'
                  />
                </div>
                <div className={cn.zoneInputItem}>
                  <label>Input bucket</label>
                  <InputBox
                    value={item.input}
                    onChange={onTextChange(item.id, 'input')}
                    placeholderLabel='Input bucket'
                  />
                </div>
                <div className={cn.zoneInputItem}>
                  <label>Output bucket</label>
                  <InputBox
                    value={item.output}
                    onChange={onTextChange(item.id, 'output')}
                    placeholderLabel='Output bucket'
                  />
                </div>
                <div className={cn.zoneInputItem}>
                  <label>Error Bucket</label>
                  <InputBox
                    value={item.error}
                    onChange={onTextChange(item.id, 'error')}
                    placeholderLabel='Error bucket'
                  />
                </div>
              </div>
              <div className={cn.zoneControls}>
                {zoneList.length > 1 && (
                  <Button
                    icon={<SVGIcons type='SVG-cross-mark' />}
                    onClick={onRemove(item.id)}
                  />
                )}
                {zoneList.length - 1 === index && (
                  <Button
                    type='primary'
                    icon={<SVGIcons type='SVG-add' />}
                    onClick={onAdd}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

DropZone.propTypes = {
  onDropZoneChanged: PropTypes.func,
  zoneList: PropTypes.array,
};
