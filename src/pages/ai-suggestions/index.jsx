// src/pages/ai-suggestions/index.jsx
import React, { useState, useRef, useEffect } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Icon from "../../components/AppIcon";

const AISuggestions = () => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "👋 Hi! Tell me what ingredients you have, and I’ll suggest a dish for you.",
    },
  ]);
  const [query, setQuery] = useState("");
  const chatEndRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleAskAI = async (e) => {
    e.preventDefault();
    const text = query.trim();
    if (!text) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text }]);
    setQuery("");

    // Call OpenAI API using fetch
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful Indian recipe assistant. Suggest dishes based on ingredients.",
            },
            { role: "user", content: text },
          ],
          max_tokens: 200,
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a recipe.";

      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Sorry, something went wrong. Please try again." },
      ]);
    }
  };

  // Auto scroll down when new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-16"} bg-popover border-r border-border flex flex-col transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex flex-col items-start gap-1 p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="ChefHat" size={20} color="white" />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              DishCover
              <h1 className="text-sm font-semibold text-foreground/80">
                AI Recipe Assistant
              </h1>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className={`font-semibold text-lg ${!isSidebarOpen && "hidden"} md:block`}>Chats</h2>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-sm px-2 py-1 border rounded">
            {isSidebarOpen ? "<" : ">"}
          </button>
        </div>

        {/* Sidebar Items */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-muted">🍳 New Chat</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-muted">📖 Saved Recipes</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-muted">⚙️ Settings</button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="p-4 border-b border-border bg-popover flex items-center gap-3">
          <Icon name="Sparkles" size={20} />
          <h1 className="text-lg font-semibold">AI Recipe Assistant</h1>
        </header>

        {/* Chat Messages */}
        <main className="flex-1 overflow-y-auto px-4 py-6 bg-[#FFFDF9]">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`${m.role === "user" ? "ml-4" : "mr-4"} ${
                    m.role === "user"
                      ? "w-full sm:w-10/12 md:w-8/12 lg:w-6/12"
                      : "w-full sm:w-11/12 md:w-9/12 lg:w-7/12"
                  }`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl text-base shadow ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-[#f87d46] to-[#fa874f] text-white"
                        : "bg-[#FFF7E6] border border-[#F9BC06] text-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </main>

        {/* Input Bar */}
        <form onSubmit={handleAskAI} className="p-4 border-t border-border bg-popover">
          <div className="max-w-4xl mx-auto flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your ingredients or mood..."
              className="flex-1 min-w-[500px] h-12 px-4 py-3 rounded-xl border border-border"
            />
            <Button
              type="submit"
              variant="hero"
              className="h-12 px-6 rounded-xl bg-gradient-to-r from-[#f87d46] to-[#fa874f] text-[#fdfbff]"
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AISuggestions;
