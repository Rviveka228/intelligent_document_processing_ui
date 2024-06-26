import React, {useState} from 'react';
import PropType from 'prop-types';
import Button from '../../../Components/Button';
import {EntityModal} from './EntityModal/EntityModal';

export const RepeatedEntities = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onOpen = () => {
    setModalVisible(true);
  };

  const onClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Button type='dashed' onClick={onOpen}>
        Repeated entities
      </Button>
      {modalVisible && (
        <EntityModal mappedList={props.mappedList} onClose={onClose} />
      )}
    </>
  );
};

RepeatedEntities.propTypes = {
  mappedList: PropType.array,
  getDocumentTypeId: PropType.string,
};
