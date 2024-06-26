/* eslint-disable no-unused-vars */
import {Button} from 'antd';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from 'react-query';
import qs from 'qs';

import {getTemplatesDetails} from '../../Http/Configuration';

import {Loader} from '../../Components/Loader';
import PageContent from '../../Components/PageContent';
import PageHeading from '../../Components/PageHeading/PageHeading';
import Container from '../../Components/Container/Container';
import {Pagination} from '../../Components/Pagination';
import {TemplateCard} from './Children/TemplateCard/TemplateCard';

import cn from './Template.module.scss';
import {useNavigate} from 'react-router';
import {ROUTE} from '../../Routes.constants';
import {InputBox} from '../../Components/InputBox/InputBox';
import {SelectElement} from '../../Components/SelectElement/SelectElement';
import {getDocumentList} from '../../Http/DocumentType';
import EmptyState, {TYPES} from '../../Components/EmptyState/EmptyState';
import {createSearchParams} from 'react-router-dom';

export const Template = (props) => {
  const PAGE_SIZE = 12;
  const navigate = useNavigate();
  const [current, setCurrent] = useState(1);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState();
  const [documentTypes, setDocumentTypes] = useState();
  const [documentId, setDocumentId] = useState();

  const [searchText, setSearchText] = useState('');

  const {
    data: templateResponseData,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: [
      'allTemplates',
      current,
      lastEvaluatedKey,
      documentId,
      searchText,
    ],
    queryFn: () => {
      let params = {
        page: current,
        limit: PAGE_SIZE,
        query: searchText ? searchText : null,
        document_id: documentId ? documentId : null,
        offset: current === 1 ? 0 : current * 12 - 12,
      };
      if (templateResponseData?.data?.last_evaluated_key) {
        params = {
          ...params,
          last_evaluated_key: lastEvaluatedKey,
        };
      }
      // eslint-disable-next-line no-console
      return getTemplatesDetails(params);
    },
    retry: 1,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const getSelectedTemplate = async (id, filePath) => {
    // navigate(`${ROUTE.CAPTURE_STUDIO}/${id}`);
    navigate({
      pathname: `${ROUTE.CAPTURE_STUDIO}/${id}`,
      search: createSearchParams(qs.stringify({filePath})).toString(),
    });
  };

  const openAddNewTemplate = () => {
    navigate(ROUTE.CAPTURE_STUDIO);
  };

  const pageChangeHandler = (page) => {
    if (page > 1 && templateResponseData?.data?.last_evaluated_key) {
      setLastEvaluatedKey(
        JSON.stringify(templateResponseData?.data?.last_evaluated_key)
      );
    } else {
      setLastEvaluatedKey();
    }
    setCurrent(page);
  };
  const onTextChange = (event) => {
    setSearchText(event.target?.value);
  };

  const onDocumentTypeChange = (value) => {
    setSearchText('');
    setCurrent(1);
    setLastEvaluatedKey();
    setDocumentId(value);
  };

  useEffect(() => {
    const documentTypeList = async () => {
      const response = await getDocumentList();
      setDocumentTypes(response?.data);
    };
    documentTypeList();
  }, []);

  return (
    <PageContent>
      <Container>
        <div className={cn.templateWrapper}>
          <PageHeading text={'Template Listing'}>
            <ul className={cn.templateFilter}>
              <li>
                <SelectElement
                  allowClear
                  placeholder={'Select Document'}
                  onChange={(value) => {
                    onDocumentTypeChange(value);
                  }}
                  options={documentTypes?.documents.map((item) => {
                    return {
                      value: item.document_id,
                      label: item.document_name,
                    };
                  })}
                />
              </li>
              <li>
                <InputBox
                  value={searchText}
                  onChange={onTextChange}
                  placeholderLabel={'Search templates'}
                />
              </li>
              <li>
                <Button type='primary' onClick={openAddNewTemplate}>
                  Add new template
                </Button>
              </li>
            </ul>
          </PageHeading>
          {isLoading || isFetching ? (
            <Loader visible />
          ) : isError || templateResponseData?.data?.data?.length === 0 ? (
            <EmptyState
              title={isError ? 'Something went wrong' : 'No data found'}
              description={''}
              type={TYPES.RESULTS}
            />
          ) : (
            <div className={cn.templeteBlock}>
              {!isLoading && !isError && templateResponseData?.data?.data && (
                <>
                  <ul className={cn.templeteList}>
                    {templateResponseData?.data?.data.map((item, key) => {
                      return !(item.template_name === 'Master') ? (
                        <TemplateCard
                          key={key}
                          {...item}
                          onClick={() => {
                            getSelectedTemplate(
                              item.template_id,
                              item?.s3_path
                            );
                          }}
                        />
                      ) : null;
                    })}
                  </ul>
                  <div className={cn.templetePagination}>
                    <Pagination
                      current={current}
                      onChange={pageChangeHandler}
                      total={templateResponseData?.data?.totalDocs}
                      defaultPageSize={PAGE_SIZE}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Container>
    </PageContent>
  );
};

Template.propTypes = {
  onTabNavigate: PropTypes.func,
};

Template.defaultProps = {};
