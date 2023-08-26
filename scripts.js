// // Add this after appending the bot's message
// var botSubscript = document.createElement("div");
// botSubscript.className = "subscript";
// botSubscript.textContent = "Sofi";
// chatWindow.appendChild(botSubscript);

// // Add this after appending the user's message
// var userSubscript = document.createElement("div");
// userSubscript.className = "subscript";
// userSubscript.textContent = "You";
// chatWindow.appendChild(userSubscript);

var initial_text = true;
var sessionId = '';
var current_context = 'act like a girl';
var modelProcessing = false;

document.addEventListener("DOMContentLoaded", function() {
  var sessionId = generateRandomId();
  console.log(sessionId);
});

function generateRandomId() {
  return 'session_' + Math.random().toString(36).substr(2, 9);
}


// Function to auto-scroll to the bottom
function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight;
}

function sendMessage() {
    if (modelProcessing) {
      return; // Exit the function if the bot is still processing
  }
  modelProcessing = true;

  var userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;

  // Display user's message
  var chatWindow = document.getElementById("chat-window");
  var userMessageDiv = document.createElement("div");
  userMessageDiv.className = "message user";

  userMessageDiv.innerHTML = `<div class = "circle-txt-user">YOU</div><p>${userInput}</p>`;
  chatWindow.appendChild(userMessageDiv);
  document.getElementById("user-input").value = "";

  console.log("USER INPUT: " + userInput);
  var apiUrl = 
    "https://jpaeewshfgzmzil5l322xzevue0bbvgl.lambda-url.us-east-1.on.aws/";
  var messageData = {
    input: userInput,
    previous_context: current_context,
    initial: initial_text,
    session_id: sessionId,
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("RESPONSE: " + response);
      return response.json();
    })

    .then((data) => {
      current_context = data.context;
      var botMessageDiv = document.createElement("div");
      botMessageDiv.className = "message bot";
      botMessageDiv.innerHTML = `<div class = "circle-txt-bot"> SV</div><p>${data.sofi}</p>`;
      chatWindow.appendChild(botMessageDiv);
      modelProcessing = false;
      scrollToBottom(chatWindow);
    })
    .catch((error) => console.error("Error:", error));

  scrollToBottom(chatWindow);

  initial_text = false;
}

// Send message triggered when user presses enter
document.getElementById("user-input").addEventListener("keyup", function(event) {
  // Check if the pressed key was Enter
  if (event.key === 'Enter' && !modelProcessing) {
      // Prevent default behavior (like submitting a form)
      event.preventDefault();

      // Call the sendMessage function
      sendMessage();
  }
});

let sendButton = document.getElementById("sendButton");
sendButton.disabled = modelProcessing; // Disable or enable the button based on the flag

