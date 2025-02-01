async function sendMessage() {
    const inputField = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");
    const userMessage = inputField.value.trim();

    if (userMessage === "") return;

    chatbox.innerHTML += <div class="message user">${userMessage}</div>;
    inputField.value = "";

    // Scroll to bottom
    chatbox.scrollTop = chatbox.scrollHeight;

    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) throw new Error("Server error");

        const data = await response.json();
        chatbox.innerHTML += <div class="message bot">${data.reply}</div>;
        chatbox.scrollTop = chatbox.scrollHeight;
    } catch (error) {
        chatbox.innerHTML += <div class="message bot error">Oops! Something went wrong.</div>;
        chatbox.scrollTop = chatbox.scrollHeight;
    }
}

// Send message on pressing "Enter"
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});