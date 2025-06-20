import React, { useState } from "react";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi there! How can I help you?" },
  ]);
  const [input, setInput] = useState<string>("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: input },
    ];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost:9000/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("API error");
      }

      const data: { reply: string } = await response.json();

      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Oops! Something went wrong. Please try again.",
        },
      ]);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-orange-500 text-white p-3 rounded-full shadow-lg"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white border shadow-lg rounded-lg flex flex-col overflow-hidden z-50">
          <div className="p-3 bg-orange-600 text-white font-semibold">
            Chatbot
          </div>
          <div className="flex-1 p-3 overflow-y-auto max-h-80">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 text-sm ${
                  msg.sender === "user"
                    ? "text-right text-orange-700"
                    : "text-left text-gray-700"
                }`}
              >
                <div
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === "user" ? "bg-orange-100" : "bg-gray-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 p-2 border rounded-l-md text-sm"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="bg-orange-500 text-white px-4 rounded-r-md text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
