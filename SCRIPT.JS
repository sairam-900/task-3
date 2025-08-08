const quizData = [
    {
        question: "Which day is celebrated as International Day of Peace?",
        options: ["21st September", "1st May", "14th November", "10th December"],
        answer: "21st September"
    },
    {
        question: "Which organization works for children's rights globally?",
        options: ["UNICEF", "WHO", "UNESCO", "NATO"],
        answer: "UNICEF"
    },
    {
        question: "What is the main cause of global warming?",
        options: ["Deforestation", "Earthquakes", "Tsunamis", "Lunar Eclipse"],
        answer: "Deforestation"
    }
];
let currentQuestion = 0;

function loadQuiz() {
    const questionData = quizData[currentQuestion];
    document.getElementById('quizQuestion').textContent = questionData.question;
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = "";
    questionData.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(btn);
    });
    document.getElementById('quizResult').textContent = "";
}

function checkAnswer(selected) {
    const correct = quizData[currentQuestion].answer;
    if (selected === correct) {
        document.getElementById('quizResult').textContent = "✅ Correct!";
        document.getElementById('quizResult').style.color = "green";
    } else {
        document.getElementById('quizResult').textContent = `❌ Wrong! Correct answer is: ${correct}`;
        document.getElementById('quizResult').style.color = "red";
    }
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuiz();
        } else {
            document.getElementById('quizContainer').innerHTML = "<h3>🎉 You completed the quiz!</h3>";
        }
    }, 1500);
}

loadQuiz();

/* -------------------- JOKE API -------------------- */
async function getJoke() {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await response.json();
    document.getElementById('jokeText').textContent = `${data.setup} - ${data.punchline}`;
}

/* -------------------- WEATHER API -------------------- */
async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API Key
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    if (data.cod === 200) {
        document.getElementById('weatherResult').innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    } else {
        document.getElementById('weatherResult').innerHTML = `<p style="color:red;">City not found</p>`;
    }
}
