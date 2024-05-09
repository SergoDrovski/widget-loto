import { Server, Response } from 'miragejs'

let responseLimit = 2;

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

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

const arrayNumbers = (length, slice) => {
  const array = [];
  for (let i = 1; i <= length; i++) {
    array.push(i);
  }
  shuffle(array);
  return array.slice(0, slice);
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
        responseLimit = 2;
        return new Response(
          400,
          {'Content-Type': 'application/json'},
          { message: ["something went wrong, please try again"] }
        )
      } else {
        responseLimit--;
      }
      const randomArrayNumber = getRandomArrayNumber();
      return checkResult(data.selectedNumber, randomArrayNumber);
    })
  },
})