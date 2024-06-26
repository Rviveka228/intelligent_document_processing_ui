import React from 'react';
import {Form, Button} from 'antd';
import PropType from 'prop-types';

const ApplicationForm = (props) => {
  const formInputs = props.formItems.map((item, index) => {
    return (
      <Form.Item
        key={index}
        label={item.label}
        name={item.name}
        rules={item.rules}>
        {item.child}
      </Form.Item>
    );
  });
  return (
    <Form
      {...props.layout}
      name={props.formName}
      initialValues={{...props.initialValues}}
      onFinish={props.onFinish}>
      {formInputs}
      <Form.Item {...props.tailLayout}>
        <Button type='primary' htmlType='submit'>
          {props.submitButtonName}
        </Button>
      </Form.Item>
    </Form>
  );
};

ApplicationForm.propTypes = {
  onFinish: PropType.func,
  formItems: PropType.array,
  formName: PropType.string,
  initialValues: PropType.array,
  submitButtonName: PropType.string,
  layout: PropType.shape({
    labelCol: PropType.object,
    wrapperCol: PropType.object,
  }),
  tailLayout: PropType.shape({
    wrapperCol: PropType.object,
  }),
};

ApplicationForm.defaultProps = {
  layout: {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
  },
  tailLayout: {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  },
};

export default ApplicationForm;
