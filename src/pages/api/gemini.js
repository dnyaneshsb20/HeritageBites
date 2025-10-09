// src/pages/api/gemini.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "No prompt provided" });

  // Directly insert your API key here (temporary quick fix)
  const apiKey = "AIzaSyCQHGbUf0_vrxhKfd8gyjig4OQlh55brow";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5:generateMessage?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: [{ author: "user", content: prompt }],
          temperature: 0.7,
          max_output_tokens: 500,
        }),
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.content?.[0]?.text ||
      data?.candidates?.[0]?.output_text ||
      "Couldn't generate a response";

    res.status(200).json({ text });
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ text: "Error contacting Gemini API" });
  }
}
