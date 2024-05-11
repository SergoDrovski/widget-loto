import TicketCard from './components/ticket/TicketCard';

const configTicket = [
  {
    fieldName: "firstField",
    fieldNumber: 1,
    textRule: "Отметьте 8 чисел.",
    fieldOption: {
      lengthSlots: 19,
      rule: 8,
      //selectedSlots: [],
      //setSlot: null,
      wonStatus: {}
    }
  },
  {
    fieldName: "secondField",
    fieldNumber: 2,
    textRule: "Отметьте 1 число.",
    fieldOption: {
      lengthSlots: 2,
      rule: 1,
      //selectedSlots: [],
      //setSlot: null,
      wonStatus: {}
    }
  }
]

function App() {
  return (
    <div className="App">
      <TicketCard
        ticketNumber={1}
        config={configTicket}
      />
    </div>
  );
}

export default App;
