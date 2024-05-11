import { useState } from "react"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from "react-redux"
import { addSelected, deleteSelected } from "@/components/ticket/fieldsSlice.js"


export default function TicketField(
  {
    fieldName,
    fieldNumber,
    textRule,
    fieldOption = {
      lengthSlots: 19,
      rule: 8,
      wonSlots: []
    }
  }) {

  return (
    <div className="field-wrapper">
      <p className="field-title"> Поле {fieldNumber}
        <span className="mark-numbers">{textRule}
          <span className="check-mark"></span>
        </span>
      </p>
      <FieldSlotsList fieldName={fieldName} option={fieldOption} />
    </div>
  )
}

function FieldSlotsList({ fieldName, option }) {
  const {
    lengthSlots,
    rule
  } = option

  const dispatch = useDispatch();
  const existingField = useSelector(state => state.fields[fieldName]);
  const wonStatusField = useSelector(state => state.wonStatus.selectedNumber[fieldName]);

  const addSlot = (numberSlot) => {
    if(existingField.length < rule) {
      dispatch(addSelected({ fieldName, value: numberSlot }));
    }
  }
  const deleteSlot = (numberSlot) => {
    // setSlot(newSelectedSlots);
    dispatch(deleteSelected({ fieldName, value: numberSlot }));
  }
  const checkSelectedSlot = (numberSlot) => {
    return existingField.find((num)=> num === numberSlot );
  }

  const checkWonSlot = (numberSlot) => {
    return wonStatusField.find((num)=> num === numberSlot );
  }

  const renderedSlotsList = [];
  for (let i = 1; i <= lengthSlots; i++) {
    renderedSlotsList.push(
      (<Slot
        key={i}
        number={i}
        deleteSlot={deleteSlot}
        addSlot={addSlot}
        isSelected={checkSelectedSlot(i)}
        isWonSlot={checkWonSlot(i)}
      />)
    )
  }

  return (
    <div className="field">
      {renderedSlotsList}
    </div>
  )
}

function Slot({ number, deleteSlot, addSlot, isSelected, isWonSlot }) {
  const handleClickSlot = (e) => {
    e.preventDefault();
    const slotElem = e.target;
    const numberSlot = Number(slotElem.dataset.id);

    if(isSelected){
      deleteSlot(numberSlot);
    } else {
      addSlot(numberSlot);
    }
  }

  return (
    <div
      data-id={number}
      className={`slot ${isSelected ? "selected" : ""} ${isWonSlot ? "won" : ""}`}
      onClick={(event) => handleClickSlot(event)}
    >{number}</div>
  )
}
