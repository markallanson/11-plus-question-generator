// Function to generate questions using OpenAI API
async function generateQuestions() {
  const assistantPrompt = `
You are an assistant that only speaks JSON data.

All your responses are structured as a JSON object that contains a single key "questions" which contains
an array of JSON objects.

Each object in the questions array contains only the keys "question" and "answer".
  `;

  const prompt = document.getElementById("promptInput").value.trim();
  const apiKey = document.getElementById("openAiApiKey").value.trim();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: assistantPrompt + prompt,
          },
        ],
        temperature: 0.7,
        top_p: 1.0,
      }),
    });

    const data = await response.json();

    const questionsJson = JSON.parse(data.choices[0].message.content);

    const questions = questionsJson.questions.map((question, index) => ({
      questionNumber: index + 1,
      question: question.question.trim(),
      answer: question.answer.trim(),
    }));

    displayQuestions(questions);
    displayAnswers(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    alert("Failed to fetch questions. Please try again later.");
  }
}

// Function to display questions in a table
function displayQuestions(questions) {
  let tableHTML = `
    <h1>Questions</h1>
    <table id="questions">
        <tr>
            <th>Question #</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Score</th>
        </tr>
    `;

  questions.forEach((question) => {
    tableHTML += `
        <tr>
            <td>${question.questionNumber}</td>
            <td>${question.question}</td>
            <td></td>
            <td></td>
        </tr>
    `;
  });

  tableHTML += `</table>`;

  document.getElementById("questionsWrapper").innerHTML = tableHTML;
}

// Function to display questions in a table
function displayAnswers(questions) {
  let tableHTML = `
    <h1>Answers</h1>
    <table id="answers">
    <tr>
    `;

  questions.forEach((question) => {
    tableHTML += `
            <th>${question.questionNumber}</th>
        `;
  });

  tableHTML += "</tr><tr>";

  questions.forEach((question) => {
    tableHTML += `
            <td>${question.answer}</td>
        `;
  });

  tableHTML += `</tr></table>`;

  document.getElementById("answersWrapper").innerHTML = tableHTML;
}

// Button to print the page
function printPage() {
  window.print();
}
document.getElementById("printButton").addEventListener("click", printPage);
