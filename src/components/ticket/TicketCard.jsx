// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"

import TicketHeader from "./TicketHeader"
import TicketContent from "./TicketContent"
import InfoModal from "@/components/ticket/InfoModal.jsx"
import TicketButton from "@/components/ticket/TicketButton.jsx"

import { fetchWonTicket } from "@/components/ticket/wonTicketSlice.js"
import {
  addSelected,
  selectFieldsNumbers,
  selectFinalStatus,
  updateStatus,
} from "@/components/ticket/fieldsSlice.js"
import { arrayNumbers } from "@/utils/common.js"

export default function TicketCard({ ticketNumber, config }) {
  const dispatch = useDispatch()
  const selectedNumber = useSelector(selectFieldsNumbers)
  const fieldsStatus = useSelector(selectFinalStatus)
  const ticketWonStatus = useSelector(state => state.wonTicket.status)

  const [btnState, setBtnState] = useState(false)

  const checkReady = () => {
    if (fieldsStatus) {
      setBtnState(true)
      dispatch(fetchWonTicket(selectedNumber))
    }
  }

  useEffect(() => {
    if (ticketWonStatus === "idle") {
      setBtnState(false)
    }
  }, [ticketWonStatus, btnState])

  const handleBtnRandom = () => {
    config.forEach(field => {
      dispatch(
        addSelected({
          fieldName: field.fieldName,
          value: arrayNumbers(field.lengthSlots, field.rule),
        }),
      )
      dispatch(updateStatus({ fieldName: field.fieldName, status: true }))
    })
  }

  return (
    <div className="ticket">
      <div className={`ticket__card`}>
        <TicketHeader
          ticketNumber={ticketNumber}
          handleBtnRand={handleBtnRandom}
        />
        <TicketContent fieldsOption={config} />
        <TicketButton
          btnText={"Показать результат"}
          handleBtn={checkReady}
          isLoading={btnState}
          isActive={!btnState}
        />
        <InfoModal ticketNumber={ticketNumber} />
      </div>
    </div>
  )
}
