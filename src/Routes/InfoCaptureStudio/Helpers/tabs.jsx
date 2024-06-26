/* eslint-disable max-lines */
import {ToolTip} from '../../../Components/ToolTip';
import {SVGIcons} from '../../../Components/SVGIcons';
import CustomScrollbar from '../../../Components/CustomScrollbar';
import FieldDetails from '../Components/FieldDetails';
import Button from '../../../Components/Button';
import {InputBox} from '../../../Components/InputBox/InputBox';
import QueryDetails from '../Components/QueryDetails';

import {
  infoStudioTableInfo,
  infoStudioKeyValueInfo,
} from '../../../Utils/constants';

import cn from '../styles.module.scss';
import {EntityModal} from '../RepeatedEntities/EntityModal/EntityModal';
// import {BlockTab} from '../BlockTab';

export const getTabList = ({
  keyValueFields,
  handleMapNewFieldClick,
  templateValues,
  revertFieldNameHandler,
  onTableClickHandler,
  tableFields,
  setLlmQuery,
  submitQueryHandler,
  llmTemplateValues,
  llmQuery,
  mapQueryFieldHandler,
  removeQueryFieldHandler,
  // showBlockTab,
  // selectedFieldValues,
  // handleSelectFieldValue,
  // showFieldMapForm,
  // captureInfoBlocks,
  documentFields,
  setRepeatedEntities,
  templateDetails,
  setRepeatedEntityFields,
  repeatedEntityFields,
}) => {
  let tabs = [
    {
      label: (
        <ToolTip toolTipText={infoStudioKeyValueInfo}>
          <span>Key Values</span>
          <span>
            <SVGIcons type={'SVG-info'} />
          </span>
        </ToolTip>
      ),
      children: (
        <CustomScrollbar className={'pdf-aside-scroll'}>
          <div className={cn.keyValueblock}>
            {keyValueFields.length === 0 && (
              <div>There are no key value pairs</div>
            )}
            <ul className={cn.captureList}>
              {keyValueFields.map((keyValue) => {
                return (
                  <li key={keyValue.id}>
                    <FieldDetails
                      templateValues={templateValues}
                      keyValue={keyValue}
                      onMapNewField={handleMapNewFieldClick}
                      onRevertFieldName={revertFieldNameHandler}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </CustomScrollbar>
      ),
      key: 'keyValues',
    },
    {
      label: (
        <ToolTip toolTipText={infoStudioTableInfo}>
          <span>Query</span>
          <span>
            <SVGIcons type={'SVG-info'} />
          </span>
        </ToolTip>
      ),
      children: (
        <CustomScrollbar className={'pdf-aside-scroll'}>
          <div className={cn.queryBlock}>
            <div className={cn.queryAdd}>
              <div className={cn.queryAdd__item}>
                <InputBox
                  placeholderLabel='Enter a query to search within document'
                  value={llmQuery}
                  onChange={(event) => setLlmQuery(event.target.value)}
                />
              </div>
              <div className={cn.queryAdd__item}>
                <Button
                  onClick={submitQueryHandler}
                  disabled={!llmQuery}
                  type='primary'>
                  Add Query
                </Button>
              </div>
            </div>
            {llmTemplateValues?.length === 0 && (
              <div className={cn.queryEmptstate}>
                <p>There are no saved queries</p>
              </div>
            )}
            <ul className={cn.captureList}>
              {llmTemplateValues?.map((templateValue) => {
                return (
                  <li key={templateValue.id}>
                    <QueryDetails
                      templateValue={templateValue}
                      onMapQueryField={mapQueryFieldHandler}
                      onRevertQueryField={removeQueryFieldHandler}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </CustomScrollbar>
      ),
      key: 'query',
    },
    {
      label: (
        <ToolTip toolTipText={infoStudioTableInfo}>
          <span>Multi Entry</span>
          <span>
            <SVGIcons type={'SVG-info'} />
          </span>
        </ToolTip>
      ),
      children: (
        <CustomScrollbar className={'pdf-aside-scroll'}>
          <div className={cn.tablesBlock}>
            {tableFields.length === 0 && <div>There are no tables</div>}
            <ul className={cn.captureList}>
              {tableFields.map((table, index) => {
                return (
                  <li key={table.id}>
                    <div className={cn.entryWrapper}>
                      <div className={cn.tableDetailsBlock}>
                        <div className={cn.tableDetailsHeading}>
                          <div className={cn.tableHeadingText}>
                            <h4>{`Table ${index + 1}`}</h4>
                          </div>
                          <div className={cn.headingControls}>
                            <Button
                              type='link'
                              onClick={() =>
                                onTableClickHandler(table.cells, table.id)
                              }>
                              Configure
                            </Button>
                          </div>
                        </div>
                        <ul className={cn.multiEntry}>
                          {table.cells.slice(0, 3).map((cell) => {
                            return <li key={cell.id}>{cell.content}</li>;
                          })}
                          {table.cells.length > 3 && (
                            <>
                              <li>
                                <span>
                                  <SVGIcons type={'SVG-more'} />
                                </span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </CustomScrollbar>
      ),
      key: 'multiEntry',
    },
    {
      label: (
        <ToolTip toolTipText={infoStudioKeyValueInfo}>
          <span>Repeated Entities</span>
          <span>
            <SVGIcons type={'SVG-info'} />
          </span>
        </ToolTip>
      ),
      children: (
        <CustomScrollbar className={'pdf-aside-scroll'}>
          <EntityModal
            setRepeatedEntities={setRepeatedEntities}
            documentFields={documentFields}
            templateDetails={templateDetails}
            setRepeatedEntityFields={setRepeatedEntityFields}
            repeatedEntityFields={repeatedEntityFields}
          />
        </CustomScrollbar>
      ),
      key: 'repeatedEntities',
    },
  ];

  // if (showBlockTab) {
  //   tabs.push({
  //     label: (
  //       <ToolTip toolTipText={infoStudioTableInfo}>
  //         <span>Multi Entry</span>
  //         <span>
  //           <SVGIcons type={'SVG-info'} />
  //         </span>
  //       </ToolTip>
  //     ),
  //     children: (
  //       <CustomScrollbar className={'pdf-aside-scroll'}>
  //         <div className={cn.tablesBlock}>
  //           {tableFields.length === 0 && <div>There are no tables</div>}
  //           <ul className={cn.captureList}>
  //             {tableFields.map((table, index) => {
  //               return (
  //                 <li key={table.id}>
  //                   <div className={cn.entryWrapper}>
  //                     <div className={cn.tableDetailsBlock}>
  //                       <div className={cn.tableDetailsHeading}>
  //                         <div className={cn.tableHeadingText}>
  //                           <h4>{`Table ${index + 1}`}</h4>
  //                         </div>
  //                         <div className={cn.headingControls}>
  //                           <Button
  //                             type='link'
  //                             onClick={() =>
  //                               onTableClickHandler(table.cells, table.id)
  //                             }>
  //                             Configure
  //                           </Button>
  //                         </div>
  //                       </div>
  //                       <ul className={cn.multiEntry}>
  //                         {table.cells.slice(0, 3).map((cell) => {
  //                           return <li key={cell.id}>{cell.content}</li>;
  //                         })}
  //                         {table.cells.length > 3 && (
  //                           <>
  //                             <li>
  //                               <span>
  //                                 <SVGIcons type={'SVG-more'} />
  //                               </span>
  //                             </li>
  //                           </>
  //                         )}
  //                       </ul>
  //                     </div>
  //                   </div>
  //                 </li>
  //               );
  //             })}
  //           </ul>
  //         </div>
  //       </CustomScrollbar>
  //     ),
  //     key: 'multiEntry',
  //   });
  //   tabs.push({
  //     label: (
  //       <ToolTip toolTipText={infoStudioTableInfo}>
  //         <span>Blocks</span>
  //         <span>
  //           <SVGIcons type={'SVG-info'} />
  //         </span>
  //       </ToolTip>
  //     ),
  //     children: (
  //       <BlockTab
  //         captureInfoBlocks={captureInfoBlocks}
  //         mappedList={mappedList || []}
  //         selectedFieldValues={selectedFieldValues}
  //         handleSelectFieldValue={handleSelectFieldValue}
  //         showFieldMapForm={showFieldMapForm}
  //       />
  //     ),
  //     key: 'block',
  //   });
  // }
  return tabs;
};
