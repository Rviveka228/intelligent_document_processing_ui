import React from 'react';
import PageHeading from '../../../Components/PageHeading/PageHeading';
// import {SelectElement} from '../../../Components/SelectElement/SelectElement';

export const ExceptionZoneHeader = () => {
  return (
    <div>
      <PageHeading text={'Exception Zone'}>
        {/* <SelectElement
          allowClear
          options={[
            {
              value: 'qualityFailures',
              label: 'Quality Failures',
            },
            {
              value: 'processingFailures',
              label: 'Processing Failures',
            },
          ]}
          placeholder={'Error Type'}
        /> */}
      </PageHeading>
    </div>
  );
};
