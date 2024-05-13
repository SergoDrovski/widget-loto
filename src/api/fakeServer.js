import { Server, Response } from 'miragejs'
import { arrayNumbers } from "@/utils/common.js"

let responseLimit = 1;

const responseTemplates = {
  selectedNumber: {
    firstField: [],
    secondField: []
  },
  isTicketWon: false
}

// В случае совпадения четырех и более цифр в первом поле,
// либо трех и более чисел в первом поле и одного во втором,
// пользователь считается победителем лотереи и получает причитающиеся ему лавры
const checkResult = (selectedNumber, randomNumber) => {
  const result = structuredClone(responseTemplates);

  Object.entries(result.selectedNumber).forEach(field => {
    let nameField = field[0];
    randomNumber[nameField].forEach(num => {
      if(selectedNumber[nameField].includes(num)) {
        result.selectedNumber[nameField].push(num);
      }
    })
  })

  if(
    result.selectedNumber.firstField.length >= 4 ||
    (result.selectedNumber.firstField.length >= 3 && result.selectedNumber.secondField.length >= 1)
  ) {
    result.isTicketWon = true;
  }
  return result;
}

const getRandomArrayNumber = () => {
  return {
    firstField: arrayNumbers(19,8),
    secondField: arrayNumbers(2,1),
  }
}


new Server({
  routes() {
    this.post('/api/check', function (schema, req) {
      const data =  JSON.parse(req.requestBody);
      if (
        !(data?.selectedNumber.firstField && data?.selectedNumber.secondField)
      ) {
        throw new Error('Could not data!')
      }

      if(responseLimit <= 0) {
        responseLimit = 1;
        return new Response(
          400,
          {'Content-Type': 'application/json'},
          { message: "something went wrong, please try again" }
        )
      } else {
        responseLimit--;
      }
      const randomArrayNumber = getRandomArrayNumber();
      return checkResult(data.selectedNumber, randomArrayNumber);
    })
  },
})