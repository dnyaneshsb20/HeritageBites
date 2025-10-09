import React, { useState, useRef, useEffect } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Icon from "../../components/AppIcon";

const GEMINI_API_KEY = "YOUR_REAL_API_KEY_HERE"; // insert your API key here

const AISuggestions = () => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "👋 Hi! Tell me what ingredients you have, and I’ll suggest a dish for you." }
  ]);
  const [query, setQuery] = useState("");
  const chatEndRef = useRef(null);

  const handleAskAI = async (e) => {
    e.preventDefault();
    const text = query.trim();
    if (!text) return;

    setMessages(prev => [...prev, { role: "user", text }]);
    setQuery("");

    try {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5:generateMessage?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: [{ author: "user", content: query }],
        temperature: 0.7,
        max_output_tokens: 500,
      }),
    }
  );

  const data = await res.json();
  console.log("Raw API response:", data);

  const aiText =
    data?.candidates?.[0]?.content?.[0]?.text ||
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    data?.candidates?.[0]?.output_text ||
    "Couldn't generate a response";

  setMessages(prev => [...prev, { role: "ai", text: aiText }]);
} catch (err) {
  console.error("Fetch error:", err);
  setMessages(prev => [...prev, { role: "ai", text: "Error contacting Gemini API." }]);
}

  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="flex flex-col flex-1">
        <header className="p-4 border-b border-border bg-popover flex items-center gap-3">
          <Icon name="Sparkles" size={20} />
          <h1 className="text-lg font-semibold">AI Recipe Assistant</h1>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 bg-[#FFFDF9]">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`${m.role === "user" ? "ml-4" : "mr-4"} ${m.role === "user" ? "w-full sm:w-10/12 md:w-8/12 lg:w-6/12" : "w-full sm:w-11/12 md:w-9/12 lg:w-7/12"}`}>
                  <div className={`px-4 py-3 rounded-2xl text-base shadow ${m.role === "user" ? "bg-gradient-to-r from-[#f87d46] to-[#fa874f] text-white" : "bg-[#FFF7E6] border border-[#F9BC06] text-foreground"}`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </main>

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
