export default function TicketButton({
  handleBtn,
  btnText,
  isLoading,
  isActive = true,
}) {
  return (
    <div className="ticket__button-wrapper">
      <button
        disabled={!isActive}
        onClick={handleBtn}
        className={`ticket__button ${isLoading ? "loading" : ""}`}
      >
        {isLoading ? (
          <span>
            <b></b>
            <b></b>
            <b></b>
          </span>
        ) : (
          btnText
        )}
      </button>
    </div>
  )
}
