const questions = [
    {
        question: "Which is the largest animal in the world",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the smallest continent in the world",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world",
        answers: [
            { text: "Gobi", correct: false },
            { text: "Kalahari", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const ansBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    nextBtn.style.display = "none";
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    ansBtn.innerHTML = '';
    nextBtn.style.display = "none";

    currentQuestion.answers.forEach(element => {
        const button = document.createElement("button");
        button.innerHTML = element.text;
        button.classList.add("btn");
        button.dataset.correct = element.correct;

        button.addEventListener("click", selectAnswer);
        ansBtn.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";

    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
        // Show the correct answer
        Array.from(ansBtn.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
        });
    }

    // Disable all buttons after an answer is selected
    Array.from(ansBtn.children).forEach(button => {
        button.disabled = true;
    });

    nextBtn.style.display = "inline-block";  // Show the next button
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    ansBtn.innerHTML = '';
    nextBtn.style.display = "none";  // Hide the next button on the last question
}

nextBtn.addEventListener("click", handleNextButton);

startQuiz();
