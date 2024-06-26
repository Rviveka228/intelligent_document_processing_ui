import {UploadOutlined} from '@ant-design/icons';
import {Button, Upload} from 'antd';
import PropTypes from 'prop-types';

export const FileUpload = (props) => {
  const beforeUploadHandlerd = (file) => {
    props.beforeUpload(file, props.name);
    return false;
  };
  const onRemoveHandler = (file) => {
    props.onRemove(file, props.name);
  };
  return (
    <Upload
      multiple={props.isMultiple}
      name={props.name}
      beforeUpload={beforeUploadHandlerd}
      onRemove={onRemoveHandler}
      fileList={props.fileList || []}>
      <Button
        disabled={props.isButtonDisabled || false}
        icon={<UploadOutlined />}>
        {props.uploadButtonName}
      </Button>
    </Upload>
  );
};
FileUpload.propTypes = {
  name: PropTypes.string,
  isMultiple: PropTypes.bool,
  uploadButtonName: PropTypes.string,
  onRemove: PropTypes.func,
  beforeUpload: PropTypes.func,
  fileList: PropTypes.array,
  isButtonDisabled: PropTypes.bool,
  getDocumentTypeId: PropTypes.string,
};

FileUpload.defaultProps = {isMultiple: false};
