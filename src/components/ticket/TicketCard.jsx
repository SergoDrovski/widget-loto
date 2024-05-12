// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector, useDispatch } from 'react-redux'
import TicketHeader from './TicketHeader';
import TicketContent from './TicketContent';
import { clearWonTicket, updateWonTicket } from "@/components/ticket/wonTicketSlice.js"
import InfoModal from "@/components/ticket/InfoModal.jsx"
import TicketButton from "@/components/ticket/TicketButton.jsx"
import { useState } from "react"
import { client } from "@/api/client.js"
import {
  addSelected,
  clearAllSelected,
  selectFieldsNumbers,
  selectFinalStatus,
  updateStatus
} from "@/components/ticket/fieldsSlice.js"
import { arrayNumbers } from "@/utils/common.js"

export default function TicketCard(
  {
    ticketNumber,
    config
  }) {

  const dispatch = useDispatch();
  const selectedNumber = useSelector(selectFieldsNumbers);
  const fieldsStatus = useSelector(selectFinalStatus);
  const isTicketWon = useSelector(state => state.wonTicket.isTicketWon);

  const [isShow, setShow] = useState(false);

  const handleBtnRandom = () => {
    config.forEach((field) => {
      dispatch(addSelected({
        fieldName: field.fieldName,
        value: arrayNumbers(field.lengthSlots,field.rule)
      }));
      dispatch(updateStatus({ fieldName:field.fieldName, status: true }));
    })
  }
  const checkResult = async () => {
    // dispatch(fetchWonTicket(selectedNumber));
    client.post("/api/check", {
      selectedNumber: selectedNumber
    }).then(response => {
      dispatch(updateWonTicket(response.data));
      setTimeout(()=>setShow(true), 2000);
    }).catch(err => {

    })
  }
  const checkReady = (setLoading) => {
    if(fieldsStatus) {
      setLoading(true);
      checkResult();
      setTimeout(()=>setLoading(false), 1000);
    }
  }
  const newGame = () => {
    dispatch(clearAllSelected());
    dispatch(clearWonTicket());
    setShow(false);
  }

  let contentModalInfo = {
    btnText: 'Играть ещё!',
    handleBtn: newGame
  };

  if(isTicketWon) {
    contentModalInfo = {
      ...contentModalInfo,
      textModal: 'Ого, вы выиграли! Поздравляем!',
    }
  } else {
    contentModalInfo = {
      ...contentModalInfo,
      textModal: 'В этот раз не повезло :(',
    }
  }

  return (
    <div className="ticket">
      <div className={`ticket__card`}>
        <TicketHeader ticketNumber={ticketNumber} handleBtnRand={handleBtnRandom}/>
        <TicketContent fieldsOption={config}/>
        <TicketButton btnText={'Показать результат'} handleBtn={checkReady}/>
        {isShow ? (<InfoModal content={contentModalInfo} />) : null}
      </div>
    </div>
  )
}