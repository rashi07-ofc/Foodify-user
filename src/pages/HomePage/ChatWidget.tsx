import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { marked } from "marked";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi there! How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false); // State for typing indicator

  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref to scroll to the end of messages

  // Handle mounting & animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else if (chatBoxRef.current) {
      const tl = gsap.timeline();
      tl.to(chatBoxRef.current, {
        opacity: 0,
        y: 100,
        duration: 0.7,
        ease: "power3.in",
        onComplete: () => setShouldRender(false),
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (shouldRender && chatBoxRef.current) {
      gsap.fromTo(
        chatBoxRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [shouldRender]);

  // Scroll to the latest message or typing indicator
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isBotTyping]); // Trigger scroll on message or typing indicator change

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsBotTyping(true); // Show typing indicator immediately

    try {
      const response = await fetch("http://localhost:9000/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data: { reply: string } = await response.json();

      // Simulate a slight delay before the bot's response appears
      setTimeout(async () => {
        let botText: string;
        try {
          const markedResult = marked(data.reply || "");
          botText =
            markedResult instanceof Promise ? await markedResult : markedResult;

          setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
        } catch (error) {
          console.error("Error rendering markdown:", error);
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "Apologies, I had trouble processing that. Please try again.",
            },
          ]);
        } finally {
          setIsBotTyping(false); // Hide typing indicator after bot message
        }
      }, 500); // Small delay to make the typing visible
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Oops! Something went wrong. Please try again.",
        },
      ]);
      setIsBotTyping(false); // Hide typing indicator on API error
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
          gsap.fromTo(
            ".chat-toggle",
            { scale: 0.9 },
            { scale: 1, duration: 0.2, ease: "power1.out" }
          );
        }}
        className="chat-toggle fixed bottom-6 right-10 bg-orange-500 text-white px-6 py-4 rounded-full shadow-lg z-49"
      >
        💬
      </button>

      {shouldRender && (
        <div
          ref={chatBoxRef}
          className="fixed bottom-24 right-14 w-100 bg-white border shadow-lg rounded-lg flex flex-col overflow-hidden z-50"
        >
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
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                ></div>
              </div>
            ))}

            {isBotTyping && (
              <div className="mb-2 text-left">
                <div className="inline-flex items-center bg-gray-100 px-3 py-2 rounded-lg min-w-[50px] relative">
                  {/* <span className="typing-dot bg-gray-400 w-2 h-2 rounded-full mx-[1px] animate-bounce-custom animation-delay-0"></span>
                  <span className="typing-dot bg-gray-400 w-2 h-2 rounded-full mx-[1px] animate-bounce-custom animation-delay-100"></span>
                  <span className="typing-dot bg-gray-400 w-2 h-2 rounded-full mx-[1px] animate-bounce-custom animation-delay-200"></span> */}
                  <span className="w-2 h-2 bg-gray-400 rounded-full mx-0.5 animate-wave animate-delay-0"></span>
<span className="w-2 h-2 bg-gray-400 rounded-full mx-0.5 animate-wave animate-delay-1"></span>
<span className="w-2 h-2 bg-gray-400 rounded-full mx-0.5 animate-wave animate-delay-2"></span>

                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Dummy div for scrolling */}
          </div>
          <div className="p-2 border-t flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 p-2 border rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Type a message..."
              disabled={isBotTyping} // Disable input while bot is typing
            />
            <button
              onClick={handleSend}
              className="bg-orange-500 text-white px-4 rounded-r-md text-sm hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isBotTyping || !input.trim()} // Disable send while bot is typing or input is empty
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