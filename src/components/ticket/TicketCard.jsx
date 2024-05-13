// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector, useDispatch } from 'react-redux'
import TicketHeader from './TicketHeader';
import TicketContent from './TicketContent';
import { fetchWonTicket } from "@/components/ticket/wonTicketSlice.js"
import InfoModal from "@/components/ticket/InfoModal.jsx"
import TicketButton from "@/components/ticket/TicketButton.jsx"
import {
  addSelected,
  selectFieldsNumbers,
  selectFinalStatus,
  updateStatus
} from "@/components/ticket/fieldsSlice.js"
import { arrayNumbers } from "@/utils/common.js"

export default function TicketCard({ticketNumber, config}) {

  const dispatch = useDispatch();
  const selectedNumber = useSelector(selectFieldsNumbers);
  const fieldsStatus = useSelector(selectFinalStatus);

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
    dispatch(fetchWonTicket(selectedNumber));
  }
  const checkReady = (setLoading) => {
    if(fieldsStatus) {
      setLoading(true);
      checkResult();
      setTimeout(()=>setLoading(false), 1000);
    }
  }

  return (
    <div className="ticket">
      <div className={`ticket__card`}>
        <TicketHeader ticketNumber={ticketNumber} handleBtnRand={handleBtnRandom}/>
        <TicketContent fieldsOption={config}/>
        <TicketButton btnText={'Показать результат'} handleBtn={checkReady}/>
        <InfoModal ticketNumber={ticketNumber}/>
      </div>
    </div>
  )
}