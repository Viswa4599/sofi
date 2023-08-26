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

// Function to auto-scroll to the bottom
function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight;
}

function sendMessage() {
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
  // Placeholder for API call
  var apiUrl =
    "https://jpaeewshfgzmzil5l322xzevue0bbvgl.lambda-url.us-east-1.on.aws/";
  var messageData = {
    input: userInput,
    previous_context: "act like a girl",
    initial: initial_text,
    session_id: "",
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
      // Assuming the response contains the bot's reply
      var botMessageDiv = document.createElement("div");
      botMessageDiv.className = "message bot";
      botMessageDiv.innerHTML = `<div class = "circle-txt-bot"> SV</div><p>${data.sofi}</p>`;
      chatWindow.appendChild(botMessageDiv);
    })
    .catch((error) => console.error("Error:", error));

  scrollToBottom(chatWindow);
}

// session_id
