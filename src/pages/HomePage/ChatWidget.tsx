<<<<<<< Updated upstream
import React, { useState } from "react";
=======
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { marked } from "marked";
>>>>>>> Stashed changes

type Message = {
  sender: "user" | "bot";
  text: string;
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi there! How can I help you?" },
  ]);
<<<<<<< Updated upstream
  const [input, setInput] = useState<string>("");
=======
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); 

  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (lastMessageRef.current) {
      gsap.fromTo(
        lastMessageRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [messages]);
>>>>>>> Stashed changes

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: input },
    ];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true); 

    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("API error");
      }

      const data: { reply: string } = await response.json();

<<<<<<< Updated upstream
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
=======
      setTimeout(() => {
        (async () => {
          let botText: string;

          try {
            const markedResult = marked(data.reply || "");

            botText = markedResult instanceof Promise ? await markedResult : markedResult;

            setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
          } catch (error) {
            console.error("Error rendering markdown:", error);
          } finally {
            setIsTyping(false); 
          }
        })();
      }, 300);
>>>>>>> Stashed changes
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Oops! Something went wrong. Please try again.",
        },
      ]);
      setIsTyping(false); 
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

<<<<<<< Updated upstream
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white border shadow-lg rounded-lg flex flex-col overflow-hidden z-50">
=======
      {shouldRender && (
        <div
          ref={chatBoxRef}
          className="fixed bottom-24 right-14 w-100 bg-white border shadow-lg rounded-lg flex flex-col overflow-hidden z-50"
        >
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                  {msg.text}
                </div>
              </div>
            ))}
=======
                  <div
                    className={`inline-block px-3 py-2 rounded-lg ${
                      msg.sender === "user" ? "bg-orange-100" : "bg-gray-100"
                    }`}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  ></div>
                </div>
              );
            })}

            {isTyping && (
              <div
                ref={lastMessageRef} 
                className="mb-2 text-sm text-left text-gray-700"
              >
                <div className="inline-block px-3 py-2 rounded-lg bg-gray-100 italic">
                  Typing...
                </div>
              </div>
            )}
>>>>>>> Stashed changes
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