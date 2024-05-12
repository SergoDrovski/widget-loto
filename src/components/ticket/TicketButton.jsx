import { useState } from "react"

export default function TicketButton(
  {
    handleBtn,
    btnText,
  }) {

  const [isLoading, setLoading] = useState(false);

  return (
    <div className="ticket__button-wrapper">
      <button
        onClick={() => handleBtn(setLoading)}
        className={`ticket__button ${isLoading ? 'loading' : ''}`}
      >{btnText}</button>
    </div>
  )
}