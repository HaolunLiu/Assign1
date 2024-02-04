const quizQ = [
    {
        question: "What is the number of this course?",
        answers: ["CMPT 213", "CMPT 276", "CMPT 383", "CMPT 295"],
        correctAnswer: 1
    },
    {
        question: "What is the name of professor?",
        answers: ["Bobby Chan", "Brian Fraser", "John Edgar", "Leo Liu"],
        correctAnswer: 0
    },
    {
        question: "What is the name of the course?",
        answers: ["Networking", "Data Structures and Algorithms", "Java Object Oriented Programming", "Into to Software Engineering"],
        correctAnswer: 3
    },
    {
        question: "What is going to be your final grade if you study and try your best?",
        answers: ["A", "B", "C", "D"],
        correctAnswer: 0
    },
    {
        question: "Where is this course located?",
        answers: ["Vancouver", "Burnaby", "Surrey", "Toronto"],
        correctAnswer: 2
    },
];

let qIndex = 0;
let ans = Array(quizQ.length).fill(null);


const qEle = document.getElementById('question');
const ansEle = document.getElementById('answer-buttons');
const prev = document.getElementById('previous');
const next = document.getElementById('next');
const sub = document.getElementById('submit');
const result = document.getElementById('result');
const scoreEle = document.getElementById('score');
const correctAnsEle = document.getElementById('correctAns');


function printQues() {
    const question = quizQ[qIndex];
    qEle.innerText = question.question;

    ansEle.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        if (index === ans[qIndex]) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => selectAns(index));
        ansEle.appendChild(button);
    });

    navButton();
}

function selectAns(index) {
    ans[qIndex] = index;
    activeAns(index);
}


function activeAns(index) {
    Array.from(ansEle.children).forEach((button, idx) => {
        if (idx === index) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}


function navButton() {
    prev.classList.toggle('hidden', qIndex === 0);
    next.classList.toggle('hidden', qIndex === quizQ.length - 1);
    sub.classList.toggle('hidden', qIndex !== quizQ.length - 1);
}


function showResults() {
    let score = 0;
    quizQ.forEach((question, index) => {
        if (question.correctAnswer === ans[index]) {
            score++;
        }
    });
    scoreEle.innerText = `Your Score: ${score} out of ${quizQ.length}`;
    correctAnsEle.innerHTML = quizQ.map((q, index) => 
        `Q${index + 1}: ${q.answers[q.correctAnswer]}`).join('<br>');
    result.classList.remove('hidden');


    sub.innerText = 'Restart';
    sub.removeEventListener('click', showResults);
    sub.addEventListener('click', restartQuiz);
}



function restartQuiz() {
    qIndex = 0;
    ans.fill(null);
    result.classList.add('hidden');
    sub.innerText = 'Submit';
    sub.removeEventListener('click', restartQuiz);
    sub.addEventListener('click', showResults);

    printQues();
}


prev.addEventListener('click', () => {
    qIndex--;
    printQues();
});

next.addEventListener('click', () => {
    if (ans[qIndex] === null) {
        alert("Please select an answer!");
        return;
    }
    qIndex++;
    printQues();
});

sub.addEventListener('click', () => {
    if (ans.includes(null)) {
        alert("Please answer all questions before submitting!");
        return;
    }
    showResults();
    ansEle.innerHTML = ''; 
    qEle.innerText = ''; 
});


document.addEventListener('DOMContentLoaded', printQues);
