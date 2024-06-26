/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery} from 'react-query';
import {Input, Modal} from 'antd';

import PageContent from '../../../Components/PageContent';
import Container from '../../../Components/Container/Container';
import PageHeading from '../../../Components/PageHeading';

import {BreadCrumbs} from '../../../Components/BreadCrumbs/BreadCrumbs';
import {Card} from '../../../Components/Card/Card';
import {InputBox} from '../../../Components/InputBox/InputBox';
import {SVGIcons} from '../../../Components/SVGIcons';
import Button from '../../../Components/Button';
import {AddField} from './AddField';
import {Notification} from '../../../Components/Notification';

import {createDocumentType, getDocumentTypes} from '../../../Http/DocumentType';

import {ROUTE} from '../../../Routes.constants';

import cn from './CreateType.module.scss';
import {getEmptyField} from './CreateType.helpers';
import {getUniqueId} from '../../../Utils/commonUtils';
import {DeleteBlock} from './DeleteBlock/DeleteBlock';
import {Loader} from '../../../Components/Loader';

const BreadcrumbData = [{name: 'Document types'}, {name: 'Create new '}];
const {TextArea} = Input;
export const CreateType = () => {
  const {documentId} = useParams();
  const [documentData, setDocumentData] = useState({
    name: '',
    description: '',
    fields: [getEmptyField()],
  });

  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const handleBredCrumbClick = (value) => {
    if (value === 'Document types') {
      navigate(ROUTE.TYPES);
    }
  };

  const setName = (value, key) => {
    setDocumentData((prev) => ({...prev, [key]: value}));
  };
  const documentTypeMutation = useMutation(() => getDocumentTypes(documentId), {
    onSuccess: (response) => {
      const data = response?.data?.data;
      setDocumentData({
        name: data?.name ?? '',
        description: data?.description ?? '',
        fields: data?.fields?.map((item) => {
          return {
            ...item,
            id: getUniqueId(),
          };
        }) ?? [getEmptyField()],
      });
    },
  });
  const setFieldData = ({value, index, key}) => {
    setDocumentData((prev) => ({
      ...prev,
      fields: prev.fields.map((item) => {
        if (index === item.id) {
          return {
            ...item,
            [key]: value,
          };
        }
        return item;
      }),
    }));
  };
  const handleAddField = () => {
    setDocumentData((prev) => ({
      ...prev,
      fields: [...prev.fields, getEmptyField()],
    }));
  };
  const handleCloseField = (index) =>
    setDocumentData((prev) => ({
      ...prev,
      fields: prev.fields.filter((item) => item.id !== index),
    }));
  const {mutate: createType, isLoading} = useMutation(
    (payload) => createDocumentType(payload),
    {
      onSuccess: () => {
        Notification({
          type: 'success',
          message: 'Successfully created',
        });
        navigate(ROUTE.TYPES);
      },
      onError: () => {
        Notification({
          type: 'error',
          message: 'Failed to  create',
        });
      },
    }
  );
  const handleSave = () => {
    const filteredField = documentData.fields.filter(
      (item) => item.name && item.type
    );
    if (filteredField.length && documentData.name) {
      createType({
        name: documentData.name,
        fields: filteredField,
        description: documentData?.description,
        config_id: documentId ? documentId : '',
      });
      return;
    }
    setShowError(true);
    return;
  };
  const {isLoading: isFetchingDocumentType} = documentTypeMutation;
  useEffect(() => {
    documentTypeMutation.mutate();
  }, []);

  return (
    <PageContent>
      <Container>
        <div className={cn.documentCreateTypeWrapper}>
          <PageHeading text={'Create Document Type'}>
            <Button type={'primary'} onClick={handleSave} loading={isLoading}>
              Save
            </Button>
            {documentId && <DeleteBlock />}
          </PageHeading>
          <BreadCrumbs data={BreadcrumbData} onClick={handleBredCrumbClick} />
          {isFetchingDocumentType ? (
            <Loader visible />
          ) : (
            <Card className={cn.documentCreateTypeBlock}>
              <div className={cn.documentCreateTypeBlock__name}>
                <label>Name</label>
                <InputBox
                  placeholderLabel={'Enter Name'}
                  value={documentData?.name}
                  onChange={(event) => setName(event.target.value, 'name')}
                  status={!documentData.name && showError ? 'error' : ''}
                />
              </div>
              <div className={cn.documentCreateTypeBlock__name}>
                <label>Description</label>
                <TextArea
                  placeholder={'Enter Description'}
                  value={documentData.description}
                  onChange={(event) =>
                    setName(event.target.value, 'description')
                  }
                  status={!documentData.description && showError ? 'error' : ''}
                />
              </div>
              <div className={cn.fieldAddWrapper}>
                <div className={cn.fieldAdd}>
                  <h3>Fields</h3>
                  <ul className={cn.fieldAddList}>
                    {documentData.fields.map((fieldData) => (
                      <AddField
                        showError={showError}
                        setFieldData={setFieldData}
                        key={fieldData.id}
                        index={fieldData.id}
                        fieldData={fieldData}
                        disableClose={documentData.fields.length < 2}
                        handleCloseField={handleCloseField}
                      />
                    ))}
                    <li>
                      <Card className={cn.addCard}>
                        <div className={cn.addTrigger} onClick={handleAddField}>
                          <span className={cn.triggerButton}>
                            <SVGIcons type='SVG-add' />
                          </span>
                          <h3>Fields</h3>
                        </div>
                      </Card>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Container>
    </PageContent>
  );
};
