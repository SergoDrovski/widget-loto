// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from "react-redux"
import {
  addSelected,
  deleteSelected,
  updateStatus,
} from "@/components/ticket/fieldsSlice.js"

export default function TicketField({
  fieldName,
  fieldNumber,
  textRule,
  lengthSlots = 19,
  rule = 8,
}) {
  const { status, numbers } = useSelector(state => state.fields[fieldName])

  if (numbers.length > 0) {
    textRule = `Осталось ещё ${rule - numbers.length}.`
  }

  if (numbers.length === rule) {
    textRule = "Готово!"
  }

  return (
    <div className="field-wrapper">
      <p className="field-title">
        {" "}
        Поле {fieldNumber}
        <span className="mark-numbers">
          {textRule}
          <span className={status ? "check-mark" : ""}></span>
        </span>
      </p>
      <FieldSlotsList option={{ fieldName, lengthSlots, rule }} />
    </div>
  )
}

function FieldSlotsList({ option }) {
  const { fieldName, lengthSlots, rule } = option

  const dispatch = useDispatch()
  const existingField = useSelector(state => state.fields[fieldName].numbers)
  const wonTicketField = useSelector(
    state => state.wonTicket.selectedNumber[fieldName],
  )

  const addSlot = numberSlot => {
    if (existingField.length < rule) {
      dispatch(addSelected({ fieldName, value: numberSlot }))
    }
    if (existingField.length === rule - 1) {
      dispatch(updateStatus({ fieldName, status: true }))
    }
  }
  const deleteSlot = numberSlot => {
    if (existingField.length === rule) {
      dispatch(updateStatus({ fieldName, status: false }))
    }
    dispatch(deleteSelected({ fieldName, value: numberSlot }))
  }
  const checkSelectedSlot = numberSlot => {
    return existingField.find(num => num === numberSlot)
  }

  const checkWonSlot = numberSlot => {
    return wonTicketField.find(num => num === numberSlot)
  }

  const renderedSlotsList = []
  for (let i = 1; i <= lengthSlots; i++) {
    renderedSlotsList.push(
      <Slot
        key={i}
        number={i}
        deleteSlot={deleteSlot}
        addSlot={addSlot}
        isSelected={checkSelectedSlot(i)}
        isWonSlot={checkWonSlot(i)}
      />,
    )
  }

  return <div className="field">{renderedSlotsList}</div>
}

function Slot({ number, deleteSlot, addSlot, isSelected, isWonSlot }) {
  const handleClickSlot = e => {
    e.preventDefault()
    const slotElem = e.target
    const numberSlot = Number(slotElem.dataset.id)

    if (isSelected) {
      deleteSlot(numberSlot)
    } else {
      addSlot(numberSlot)
    }
  }

  return (
    <div
      data-id={number}
      className={`slot ${isSelected ? "selected" : ""} ${isWonSlot ? "won" : ""}`}
      onClick={event => handleClickSlot(event)}
    >
      {number}
    </div>
  )
}
