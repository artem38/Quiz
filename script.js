function randint(Min, Max){
return Math.round(Math.random() * (Max - Min) + Min)
}
let signs = ['+' , '-' , '*' , '/']
function getRandomSign() {
    return signs[randint(0,3)]
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) { // Цикл повторяется до тех пор, пока остаются элементы для перемешивания
    randomIndex = Math.floor(Math.random() * currentIndex); // Выбираем оставшийся элемент.
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [    // Меняем местами с текущим элементом.
      array[randomIndex], array[currentIndex]];
  }
  return array}
let timer = document.querySelector('.timer')
let quest = document.querySelector('.Qst')
let start = document.querySelector('.start')
let btn = document.querySelectorAll('.btn')
let main = document.querySelector('.main')
let correctAns = 0
let cookie = false
let cookies = document.cookie.split('; ')
for (let i = 0; i < cookies.length; i += 1){
if (cookies[i].split('=')[0] == 'название_cookie') {
        cookie = cookies[i].split('=')[1]
        break
}}
if (cookie) {
    console.log(cookie)
    timer.style.display = 'flex'
    let data = cookie.split('/')
    timer.innerHTML = `В прошлый раз вы дали ${data[1]}
     правильных ответов из ${data[0]}. Точность - ${Math.round(correctAns / QNum * 100)}%.`
}

class Question{
    constructor() {
        let sign = getRandomSign()
        let a = randint(1,30)
        let b = randint(1,30)
        this.quest = `${a} ${sign} ${b}`
        if (sign == '+') {
            this.ans_correct = a + b}
        else if (sign == '-') {
            this.ans_correct = a - b}
        else if (sign == '*') {
            this.ans_correct = a * b}
        else if (sign == '/') {
            this.ans_correct = a / b}
        

        this.answers = [randint(this.ans_correct - 15, this.ans_correct - 1),
            randint(this.ans_correct - 15, this.ans_correct - 1), 
            this.ans_correct,
            randint(this.ans_correct - 15, this.ans_correct - 1),
            randint(this.ans_correct - 15, this.ans_correct - 1),]
            shuffle (this.answers)

    } display() {
        quest.innerHTML = this.quest
        for(let i = 0; i < this.answers.length; i += 1) {
            
            btn[i].innerHTML = this.answers[i]
        }
    }
    }
start.addEventListener('click', function(){
    setTimeout(function(){
        timer.innerHTML = `Правильных ответов: ${correctAns} из ${QNum} <br/>
        Точность - ${Math.round(correctAns / QNum * 100)} %`
        let new_cookie =`Решено вопросов=${QNum}/${correctAns}; max-age=10000000000`
        document.cookie = new_cookie 

        main.style.display = 'none'
        start.style.display = 'flex'
        timer.style.display = 'flex'
        QNum = 0
        correctAns = 0
        CurQuest = 0
}, 10000)
    main.style.display = 'flex'
    start.style.display = 'none'
    timer.style.display = 'none'
})



let QNum = 0
let CurQuest = new Question()
CurQuest.display()
for(let i = 0; i < btn.length; i += 1) {
btn[i].addEventListener('click', function(){
    if(btn[i].innerHTML == CurQuest.ans_correct){
console.log('Правильно')
        btn[i].style.backgroundColor = '#00FF00'
        anime({
        targets: btn[i],
        duration: 600,
        easing: 'easeOutInQuad',
        delay: 150,
        backgroundColor: '#FFCB00',
        })
        correctAns += 1
    }
    else{
        console.log('Неправильно')
        btn[i].style.backgroundColor = '#FF0000'
        anime({
        targets: btn[i],
        duration: 600,
        easing: 'easeOutInQuad',
        delay: 150,
        backgroundColor: '#FFCB00',
    })

    
}
    QNum += 1
    CurQuest = new Question()
    CurQuest.display()
})
}

