/* eslint-disable max-lines */
import React, {useState} from 'react';
import {useQuery} from 'react-query';

import {useNavigate} from 'react-router-dom';

import PageContent from '../../Components/PageContent';
import Container from '../../Components/Container/Container';
import PageHeading from '../../Components/PageHeading';
import Button from '../../Components/Button';
import {TypeCard} from './TypeCard';
import cn from './Types.module.scss';
import {ROUTE} from '../../Routes.constants';
import {getDocumentTypes} from '../../Http/DocumentType';
import EmptyState, {TYPES} from '../../Components/EmptyState/EmptyState';
import {Loader} from '../../Components/Loader';

export const Types = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [documentId, setDocumentId] = useState();
  const handleClick = () => {
    navigate(ROUTE.CREATE_TYPES);
  };
  const {
    data: responseData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: 'getDocumentTypes',
    queryFn: () => getDocumentTypes(),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const getSelectedDocument = async (id) => {
    navigate(`${ROUTE.CREATE_TYPES}/${id}`);
  };

  return (
    <PageContent>
      <Container>
        <div className={cn.documentTypeWrapper}>
          <PageHeading text={'Document Types'}>
            <Button type='primary' onClick={handleClick}>
              Add new type
            </Button>
          </PageHeading>

          {isError || responseData?.data?.document_types?.length === 0 ? (
            <EmptyState
              type={isError ? TYPES.SEARCH : TYPES.RESULTS}
              title={isError ? 'Something went wrong' : ''}
            />
          ) : isLoading ? (
            <Loader visible />
          ) : (
            <div className={cn.documentTypeBlock}>
              <ul className={cn.documentTypeList}>
                {responseData?.data?.document_types.map((item) => {
                  return (
                    <TypeCard
                      key={item.name}
                      data={item}
                      onClick={() => {
                        getSelectedDocument((item.config_id));
                      }}
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </PageContent>
  );
};
