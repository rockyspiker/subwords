const fs = require('fs')

const totalTalkText = fs.readFileSync('words.txt').toString()
const sortedWords = totalTalkText
  .toLowerCase()
  .split(/[^a-zA-Z]+/g)
  .filter(word => word != '')
  .sort()
  .sort((a, b) => {
    return a.length - b.length
  })

const finalData = new Array()

// creating empty indexes
for (let emptyIndex in sortedWords[0]) {
  finalData[emptyIndex] = []
}

sortedWords.forEach((word, index) => {
  const subwordsArray = new Array()
  let wordObject = {
    word: word
  }

  if (finalData[word.length] === undefined) {
    finalData[word.length] = new Array()
  }

  // creating empty indexes
  for (let emptyIndex in sortedWords[0]) {
    subwordsArray[emptyIndex] = []
  }

  sortedWords.some(subword => {
    if (subword.length > word.length || word === subword)
      return

    if (subwordsArray[subword.length] === undefined) {
      subwordsArray[subword.length] = new Array()
    }

    if (isSubword(word, subword)) {
      subwordsArray[subword.length].push(subword)
    }
  })

  wordObject.subwords = subwordsArray

  finalData[word.length].push(wordObject)
  console.log(`${word}: ${(index / sortedWords.length) * 100}%`)
})

fs.writeFileSync('subwords.json', JSON.stringify([...finalData], null, 2))

// check for subwords
function isSubword(word, subword) {
  const wordArr = word.split("")
  const subwordArr = subword.split("")
  let isSubword = true
  let subwordIndex = 0
  while(subwordIndex < subwordArr.length && isSubword){
    const matchIndex = wordArr.findIndex(w => w === subwordArr[subwordIndex])
    if(matchIndex < 0){
      isSubword = false
    } else {
      wordArr.splice(matchIndex, 1)
      subwordIndex += 1
    }
  }
  return isSubword
}