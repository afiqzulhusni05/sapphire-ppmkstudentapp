import { useEffect, useRef, useState } from "react";
import {
  ppmkAnnouncements,
  ppmkFaq,
  ppmkSuggestions,
} from "./ppmkdb";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll bila ada mesej baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (customInput?: string) => {
    const text = customInput || input;
    if (!text.trim()) return;

    // User message
    const newMessages = [...messages, { sender: "user", text }];

    // Bot reply
    const botReply = getBotReply(text);
    newMessages.push({ sender: "bot", text: botReply });

    setMessages(newMessages);
    setInput("");
  };

  const getBotReply = (text: string) => {
    const lowerInput = text.toLowerCase();

    const matchedFaq = ppmkFaq.find((item) =>
      item.keywords.some((kw) => lowerInput.includes(kw))
    );
    if (matchedFaq) return matchedFaq.answer;

    const matchedAnnounce = ppmkAnnouncements.find(
      (a) =>
        lowerInput.includes(a.title.toLowerCase()) ||
        lowerInput.includes("announcement") ||
        lowerInput.includes("news")
    );
    if (matchedAnnounce)
      return `📰 ${matchedAnnounce.title}: ${matchedAnnounce.message} (📅 ${matchedAnnounce.date})`;

    return "🤔 Sorry, I couldn’t find information about that.";
  };

  return (
    <div className="w-96 h-[32rem] flex flex-col rounded-2xl shadow-2xl bg-white overflow-hidden border">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 font-semibold">
        💬 PPMK Virtual Assistant
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-2xl max-w-[75%] shadow-sm ${
                msg.sender === "bot"
                  ? "bg-white text-gray-800 border"
                  : "bg-blue-500 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 px-3 py-2 border-t bg-gray-100">
        {ppmkSuggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => handleSend(s)}
            className="px-3 py-1 text-sm bg-white border rounded-full shadow-sm hover:bg-blue-50 transition"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center border-t p-2 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
        />
        <button
          onClick={() => handleSend()}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
