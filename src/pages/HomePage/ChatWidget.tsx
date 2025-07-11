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

  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (lastMessageRef.current) {
      gsap.fromTo(
        lastMessageRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost:9000/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("API error");

      const data: { reply: string } = await response.json();

      setTimeout(() => {
        (async () => {
          let botText: string;

          try {
            const markedResult = marked(data.reply || "");

            botText =
              markedResult instanceof Promise
                ? await markedResult
                : markedResult;

            setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
          } catch (error) {
            console.error("Error rendering markdown:", error);
          }
        })();
      }, 300);
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
            {messages.map((msg, idx) => {
              const isLast = idx === messages.length - 1;
              return (
                <div
                  key={idx}
                  ref={isLast ? lastMessageRef : null}
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
              );
            })}
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

