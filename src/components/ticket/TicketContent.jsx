import TicketField from "./TicketField"
export default function TicketContent({ fieldsOption }) {
  return (
    <section className="ticket__content">
      <div className="content-wrapper">
        <TicketField {...fieldsOption[0]} />
        <TicketField {...fieldsOption[1]} />
      </div>
    </section>
  )
}
