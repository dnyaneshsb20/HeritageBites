import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Icon from "../../components/AppIcon";

const AISuggestions = () => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "👋 Hi! Tell me what ingredients you have, and I’ll suggest a dish for you." }
  ]);
  const [query, setQuery] = useState("");

  const handleAskAI = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user", text: query }];
    setMessages(newMessages);

    // Simulated AI response (replace with API call later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `🍲 Based on "${query}", I suggest Paneer Butter Masala with Naan.` }
      ]);
    }, 600);

    setQuery("");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-popover shadow-sm flex items-center space-x-2">
        <Icon name="Sparkles" size={22} className="text-[#f87d46]" />
        <h1 className="text-xl font-semibold text-foreground">
          AI Recipe Assistant
        </h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FFFDF9]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow 
                ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-[#f87d46] to-[#fa874f] text-white rounded-br-sm"
                    : "bg-[#FFF7E6] border border-[#F9BC06] text-foreground rounded-bl-sm"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleAskAI}
        className="p-4 border-t border-border bg-popover flex gap-2"
      >
        <Input
          type="text"
          placeholder="Type your ingredients or mood..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button
          type="submit"
          variant="hero"
          className="bg-gradient-to-r from-[#f87d46] to-[#fa874f] text-[#fdfbff]"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default AISuggestions;
