import React from 'react';
import {Modal} from 'antd';
import PropType from 'prop-types';

import './style.scss';
const ModalWindow = (props) => (
  <Modal
    cancelText={props.cancelText}
    centered
    footer={props.footer}
    title={props.title}
    width={props.width}
    open={props.open}
    onCancel={props.onCancel}
    mask={props.mask ? props.mask : false}
    style={{backgroundColor: '#00000069'}}
    onOk={props.onOk}
    okText={props.confirmLoading ? ' ' : props.okText}
    className={props.className || ''}
    maskClosable={!props.isNonMaskable}
    closable={!props.isNotClosable}
    okButtonProps={{
      style: {display: props.isHideOkButton ? 'none' : ''},
      disabled: props.disableOkButton,
    }}
    cancelButtonProps={{
      style: {display: props.isHideCancelButton ? 'none' : ''},
    }}
    confirmLoading={props.confirmLoading}>
    {props.children}
  </Modal>
);

ModalWindow.propTypes = {
  isHideOkButton: PropType.bool,
  okText: PropType.string,
  isNotClosable: PropType.bool,
  isNonMaskable: PropType.bool,
  disableOkButton: PropType.bool,
  isHideCancelButton: PropType.bool,
  className: PropType.string,
  onCancel: PropType.func,
  onOk: PropType.func,
  confirmLoading: PropType.any,
  mask: PropType.bool,
  open: PropType.bool,
  cancelText: PropType.string,
  width: PropType.number,
  centered: PropType.bool,
  onModalCancel: PropType.func,
  okButtonProps: PropType.object,
  cancelButtonProps: PropType.object,
  showModal: PropType.bool,
  title: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node,
    PropType.array,
    PropType.string,
  ]),
  buttonLabel: PropType.string,
  submitHandler: PropType.func,
  footer: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node,
    PropType.array,
  ]),
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node,
    PropType.any,
  ]).isRequired,
};
export default ModalWindow;
