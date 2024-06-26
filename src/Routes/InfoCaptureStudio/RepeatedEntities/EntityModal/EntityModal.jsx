/* eslint-disable max-lines */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Modal, Radio} from 'antd';
import {EntitiesCard} from './EntitiesCard';
import Button from '../../../../Components/Button';
import {SVGIcons} from '../../../../Components/SVGIcons';
import {getUniqueId} from '../../../../Utils/commonUtils';

import cn from './EntityModal.module.scss';
import {Loader} from '../../../../Components/Loader';

export const EntityModal = (props) => {
  const [containMultiples, setContainMultiples] = useState(false);
  const [isSinglePrimary, setSinglePrimary] = useState(false);
  const [cards, setCards] = useState([{id: getUniqueId()}]);
  const [loading, setLoading] = useState(true);

  const onContainMultipleChange = (event) => {
    const checked = event.target.value;
    setContainMultiples(checked);
  };

  const onSinglePrimaryChange = (event) => {
    const checked = event.target.value;
    setSinglePrimary(checked);
  };

  const addCard = () => {
    const newEntityCard = [...cards, {id: getUniqueId()}];
    setCards(newEntityCard);
  };

  const parsePayload = (payload) => {
    if (containMultiples && !isSinglePrimary) {
      return payload.concat({
        contains_multi_primary_fields: true,
        type: 'ADVANCED_OPTION',
      });
    }
    if (containMultiples && isSinglePrimary) {
      return [
        {
          contains_multi_primary_fields: true,
          one_feed_per_page: true,
          type: 'ADVANCED_OPTION',
        },
      ];
    }
    return [];
  };

  const removeCard = (id) => () => {
    const removedCard = cards.find((item) => item.id === id);
    if (!removedCard) {
      return;
    }

    const updatedCards = cards.filter((item) => item.id !== id);

    const updatedRepeatedEntityFields = props.repeatedEntityFields.filter(
      (field) => field.label !== removedCard.field
    );
    props.setRepeatedEntities(parsePayload(updatedCards));
    props.setRepeatedEntityFields(updatedRepeatedEntityFields);
    setCards(updatedCards);
  };

  const updateCard = (changedData) => {
    const updatedCards = cards.map((item) => {
      return item.id === changedData.id ? changedData : item;
    });
    const updatedRepeatedEntityFields = props.repeatedEntityFields.map(
      (field) => (field.label === changedData.id ? changedData : field)
    );
    props.setRepeatedEntities(parsePayload(updatedCards));
    props.setRepeatedEntityFields(updatedRepeatedEntityFields);

    setCards(updatedCards);
  };

  useEffect(() => {
    props.setRepeatedEntities(parsePayload(cards));
  }, [containMultiples, isSinglePrimary]);

  const repeatedEntityList = props.templateDetails
    ?.filter((item) => item.type === 'REPEATED_ENTITY')
    .filter((item) => item?.value_orientation);

  const advancedOption = props.templateDetails.find(
    (item) => item.one_feed_per_page !== undefined
  );
  const oneFeedPerPage = advancedOption
    ? advancedOption.one_feed_per_page
    : false;
    
  useEffect(() => {
    if (oneFeedPerPage) {
      setContainMultiples(true);
      setSinglePrimary(true);
    }
  }, [oneFeedPerPage]);

  useEffect(() => {
    if (repeatedEntityList.length > 0 && !containMultiples) {
      setContainMultiples(true);
      setCards(
        repeatedEntityList.map((item) => {
          return {
            ...item,
            id: getUniqueId(),
          };
        })
      );
    }
    setLoading(false);
  }, [props.templateDetails]);

  return (
    <div className={cn.entityWrapper}>
      <div className={cn.entityHeader}>
        <h5>Repeated Entities</h5>
      </div>

      {loading ? (
        <Loader visible />
      ) : (
        <div className={cn.entityContent}>
          <div className={cn.entityCaption}>
            Contains Multi primary fields :
            <Radio.Group
              value={containMultiples}
              onChange={onContainMultipleChange}>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </div>
          {containMultiples && (
            <>
              <div className={cn.entityCaption}>
                Single primary field feed per page :
                <Radio.Group
                  value={isSinglePrimary}
                  onChange={onSinglePrimaryChange}>
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </div>
              <div className={cn.entityForms}>
                {!isSinglePrimary && (
                  <>
                    {cards.map((card, index) => (
                      <div className={cn.entityCard} key={card.id}>
                        <EntitiesCard
                          documentFields={props.documentFields}
                          onRemove={removeCard}
                          onChange={updateCard}
                          dataItem={card}
                          setRepeatedEntityFields={
                            props.setRepeatedEntityFields
                          }
                          repeatedEntityFields={props.repeatedEntityFields}
                          parsePayload={parsePayload}
                        />
                        <Button
                          type={'link'}
                          className={cn.deleteButton}
                          icon={<SVGIcons type='SVG-cross-mark' />}
                          onClick={removeCard(card.id)}
                        />
                      </div>
                    ))}
                    <div className={cn.entityAdd}>
                      <Button
                        className={cn.addButton}
                        icon={<SVGIcons type='SVG-add' />}
                        onClick={addCard}
                      />
                    </div>
                  </>
                )}
              </div>
              {/* <div className={cn.cardItemControl}>
              <Button type='primary' onClick={onSave}>
                Save
              </Button>
            </div> */}
            </>
          )}
        </div>
      )}
    </div>
  );
};

EntityModal.propTypes = {
  onClose: PropTypes.func,
  documentFields: PropTypes.array,
  setRepeatedEntities: PropTypes.func,
  templateDetails: PropTypes.array,
  setRepeatedEntityFields: PropTypes.func,
  repeatedEntityFields: PropTypes.array,
};
