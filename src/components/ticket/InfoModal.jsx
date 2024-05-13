// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import TicketButton from "@/components/ticket/TicketButton.jsx"
import { clearAllSelected } from "@/components/ticket/fieldsSlice.js"
import { clearWonTicket } from "@/components/ticket/wonTicketSlice.js"

export default function InfoModal(props) {
  const dispatch = useDispatch()
  const { isTicketWon, status, error } = useSelector(state => state.wonTicket)

  const [visibleClass, setClass] = useState("")
  const [textModal, setText] = useState({
    title: "",
    text: "",
    btnText: "",
  })

  const textWin = "Ого, вы выиграли! Поздравляем!"
  const textLoose = "В этот раз не повезло :("
  const btnText = "Играть ещё!"
  const title = `Билет ${props.ticketNumber}`

  const newGame = () => {
    dispatch(clearAllSelected())
    dispatch(clearWonTicket())
  }

  useEffect(() => {
    switch (status) {
      case "idle":
        setClass("close")
        break
      case "succeeded":
        isTicketWon
          ? setText({ btnText, title, text: textWin })
          : setText({ btnText, title, text: textLoose })
        setTimeout(() => {
          setClass("open")
        }, 1500)
        break
      case "failed":
        setText({ text: error, title: "Ошибка!", btnText })
        setClass("open")
        break
      default:
        return
    }
  }, [title, status, visibleClass, isTicketWon, error])

  return (
    <div className={`info-modal ${visibleClass}`}>
      <div className="info-modal__wrapper">
        <h1 className="ticket__title">{textModal.title}</h1>
        <p>{textModal.text}</p>
        <TicketButton btnText={textModal.btnText} handleBtn={() => newGame()} />
      </div>
    </div>
  )
}
