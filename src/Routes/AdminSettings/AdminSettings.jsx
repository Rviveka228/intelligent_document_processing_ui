import React, {useEffect, useState} from 'react';

import PageContent from '../../Components/PageContent';
import Container from '../../Components/Container/Container';
import {InputBox} from '../../Components/InputBox/InputBox';
import {LabelWrapper} from '../../Components/LabelWrapper/LabelWrapper';
import {AdminSettingsHeader} from './AdminSettingsHeader/AdminSettingsHeader';
import {Card} from '../../Components/Card/Card';
import cn from './AdminSettings.module.scss';
import {getAdminSettingsFields} from '../../Http/AdminSettings';
import {Loader} from '../../Components/Loader';
import {DropZone} from './DropZone';

export const AdminSettings = () => {
  const [loading, setLoading] = useState(false);
  const [configId, seConfigId] = useState();
  // eslint-disable-next-line no-unused-vars
  const [adminData, setAdminData] = useState();
  const [adminFields, setAdminFields] = useState({
    quality_error_threshold: '',
    processing_error_threshold: '',
    email_address: '',
    drop_zone: [],
  });

  const onDropZoneChanged = (changedDropZone) => {
    setAdminFields({
      ...adminFields,
      drop_zone: changedDropZone,
    });
  };

  const getAdminFields = async () => {
    try {
      setLoading(true);
      const response = await getAdminSettingsFields();
      setAdminData(response?.data);
      seConfigId(
        response?.data?.admin_settings.map((item) => item.config_id)[0]
      );
      if (
        response?.data?.admin_settings &&
        response?.data?.admin_settings.length
      ) {
        setAdminFields(response?.data?.admin_settings[0].settings);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminFields();
  }, []);

  return (
    <PageContent>
      <Container>
        <div className={cn.settingsWrapper}>
          <AdminSettingsHeader
            getAdminFields={getAdminFields}
            adminFields={adminFields}
            configId={configId}
          />
          <div className={cn.settingsBlock}>
            <div className={cn.settingsInner}>
              {loading ? (
                <Loader visible />
              ) : (
                <Card className={cn.settingsCard}>
                  <ul className={cn.settingsList}>
                    <li>
                      <LabelWrapper label='Quality Error threshold'>
                        <InputBox
                          value={adminFields?.quality_error_threshold}
                          onChange={(event) =>
                            setAdminFields({
                              ...adminFields,
                              quality_error_threshold: event.target.value,
                            })
                          }
                          placeholderLabel='Quality Error threshold'
                        />
                      </LabelWrapper>
                    </li>
                    <li>
                      <LabelWrapper label='Processing error threshold'>
                        <InputBox
                          value={adminFields?.processing_error_threshold}
                          onChange={(event) =>
                            setAdminFields({
                              ...adminFields,
                              processing_error_threshold: event.target.value,
                            })
                          }
                          placeholderLabel='Processing error threshold'
                        />
                      </LabelWrapper>
                    </li>
                    <li>
                      <LabelWrapper label='Notify to (Email address) '>
                        <InputBox
                          value={adminFields?.email_address}
                          onChange={(event) =>
                            setAdminFields({
                              ...adminFields,
                              email_address: event.target.value,
                            })
                          }
                          placeholderLabel='Email address '
                        />
                      </LabelWrapper>
                    </li>
                    {/* <li>
                      <LabelWrapper label='Drop zone '>
                        <InputBox
                          value={adminFields?.drop_zone}
                          onChange={(event) =>
                            setAdminFields({
                              ...adminFields,
                              drop_zone: event.target.value,
                            })
                          }
                          placeholderLabel='Drop zone '
                        />
                      </LabelWrapper>
                    </li> */}
                    <li>
                      <DropZone
                        zoneList={adminFields?.drop_zone}
                        onDropZoneChanged={onDropZoneChanged}
                      />
                    </li>
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </div>
      </Container>
    </PageContent>
  );
};
