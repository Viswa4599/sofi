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

function sendMessage() {
  var userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;

  // Display user's message
  var chatWindow = document.getElementById("chat-window");
  var userMessageDiv = document.createElement("div");
  userMessageDiv.className = "message user";
  userMessageDiv.innerHTML = `<p>${userInput}</p>`;
  chatWindow.appendChild(userMessageDiv);
  document.getElementById("user-input").value = "";

  // Placeholder for API call
  var apiUrl = "https://your-api-endpoint.com/chat";
  var messageData = { text: userInput };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Assuming the response contains the bot's reply
      var botMessageDiv = document.createElement("div");
      botMessageDiv.className = "message bot";
      botMessageDiv.innerHTML = `<p>${data.reply}</p>`;
      chatWindow.appendChild(botMessageDiv);
    })
    .catch((error) => console.error("Error:", error));
}
