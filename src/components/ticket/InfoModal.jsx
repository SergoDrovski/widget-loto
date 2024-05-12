import TicketButton from "@/components/ticket/TicketButton.jsx"

export default function InfoModal(
  {
    content
  }) {

  return (
    <div className="winner-modal">
      <div className="winner-modal__wrapper">
        <h1 className="ticket__title">Билет 1</h1>
        <p>{content.textModal}</p>
        <TicketButton btnText={content.btnText} handleBtn={content.handleBtn}/>
      </div>
    </div>
  )
}