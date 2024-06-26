import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ModalWindow from '../../../Components/ModalWindow/ModalWindow';
import {SelectElement} from '../../../Components/SelectElement/SelectElement';
import {BLOCK_TYPE} from './AddBlockType.constant';
// import {getSelectMode} from './AddBlockType.helper';

import cn from './AddBlockType.module.scss';
import CustomScrollbar from '../../../Components/CustomScrollbar';
import NewFieldForm from '../Components/NewFieldForm';

export const AddBlockType = (props) => {
  const [data, setData] = useState();

  return (
    <ModalWindow
      open
      title={'This block is'}
      onOk={() => props.handleOk(null)}
      onCancel={() => props.handleOk(null)}>
      <div className={cn.addBlockTypeWrapper}>
        <ul className={cn.addBlockTypeList}>
          <li>
            <SelectElement
              options={BLOCK_TYPE}
              onChange={(value) => setData(value)}
              placeholder={'Select option'}
            />
          </li>
          {!!data && (
            <li>
              <label>Select Key</label>
              {/* <SelectElement
                mode={getSelectMode(data)}
                options={props.keysData?.data?.keys}
                placeholder={'Select'}
              /> */}
              <CustomScrollbar className={cn.mapScrollerpane}>
                {!!props.mappedList.length && (
                  <>
                    <NewFieldForm
                      note={{}}
                      selectedFieldValues={props.selectedFieldValues}
                      keys={props.mappedList}
                      handleSelectFieldValue={props.handleSelectFieldValue}
                    />
                  </>
                )}
              </CustomScrollbar>
            </li>
          )}
        </ul>
      </div>
    </ModalWindow>
  );
};

AddBlockType.propTypes = {
  handleOk: PropTypes.func,
  mappedList: PropTypes.object,
  selectedFieldValues: PropTypes.object,
  handleSelectFieldValue: PropTypes.func,
};
