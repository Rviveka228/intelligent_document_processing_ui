import {Button, Modal, notification} from 'antd';
import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {deleteDocument} from '../../../../Http/DocumentType';
import {ROUTE} from '../../../../Routes.constants';

export const DeleteBlock = () => {
  const {documentId} = useParams();
  const navigate = useNavigate();

  const onDocumentDelete = () => {
    Modal.confirm({
      title: 'Do you want to delete',
      // eslint-disable-next-line no-undef
      onOk: async () => {
        try {
          await deleteDocument(documentId);
          navigate(ROUTE.TYPES);
        } catch (error) {
          notification.error({message: 'Something went wrong'});
        }
      },
      okButtonProps: {
        danger: true,
      },
    });
  };
  return (
    <Button type={'primary'} onClick={onDocumentDelete} loading={''}>
      Delete
    </Button>
  );
};
