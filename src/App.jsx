import TicketCard from './components/ticket/TicketCard';

const configTicket = [
  {
    fieldName: "firstField",
    fieldNumber: 1,
    textRule: "Отметьте 8 чисел.",
    lengthSlots: 19,
    rule: 8,
  },
  {
    fieldName: "secondField",
    fieldNumber: 2,
    textRule: "Отметьте 1 число.",
    lengthSlots: 2,
    rule: 1,
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
