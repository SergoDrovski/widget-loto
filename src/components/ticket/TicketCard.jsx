import TicketHeader from './TicketHeader';
import TicketContent from './TicketContent';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector, useDispatch } from 'react-redux'
import { fetchWonStatus } from "@/components/ticket/wonTicketSlice.js"

export default function TicketCard(
  {
    ticketNumber,
    config
  }) {


  const fields = useSelector(state => state.fields);
  const dispatch = useDispatch();

  const handleBtnRandom = () => {
    console.log('set random');
  }

  const handleBtnCheck = async () => {
    dispatch(fetchWonStatus(fields));
  }


  return (
    <div className="ticket">
      <div className="ticket__card">
        <TicketHeader ticketNumber={ticketNumber} handleBtnRand={handleBtnRandom}/>

        <TicketContent fieldsOption={config}/>

        <div className="ticket__button-wrapper">
          <button onClick={handleBtnCheck} className="ticket__button ">Показать результат</button>
        </div>

        <div className="winner-modal">
          <div className="container">
            <div className="winner-modal__wrapper">
              <h1 className="ticket__title">Билет 1</h1>
              <p>Ого, вы выиграли! Поздравляем!</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}