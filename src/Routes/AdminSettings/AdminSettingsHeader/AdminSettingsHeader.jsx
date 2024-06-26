import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PageHeading from '../../../Components/PageHeading';
import Button from '../../../Components/Button';
import {getAdminSettingsFieldList} from '../../../Http/AdminSettings';
import {Notification} from '../../../Components/Notification';

export const AdminSettingsHeader = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const saveAdminSettings = async () => {
    try {
      setLoading(true);
      await getAdminSettingsFieldList({
        config_id: props.configId,
        settings: props.adminFields,
      });
      setLoading(false);
      Notification({
        type: 'success',
        message: 'Settings saved successfully',
      });
      await props.getAdminFields();
    } catch (error) {
      setLoading(false);
      Notification({
        type: 'error',
        message: error.message || 'Something went wrong',
      });
    }
  };
  return (
    <>
      <PageHeading text='Admin Settings'>
        <Button loading={loading} onClick={saveAdminSettings} type='primary'>
          Save
        </Button>
      </PageHeading>
    </>
  );
};
AdminSettingsHeader.propTypes = {
  adminFields: PropTypes.object,
  getAdminFields: PropTypes.func,
  configId: PropTypes.string,
};
