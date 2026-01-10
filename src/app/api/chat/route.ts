import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { generateChatSystemPrompt, chatbotConfig } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    // Check if chatbot is enabled
    if (!chatbotConfig.enabled) {
      return NextResponse.json(
        { error: "Chat is currently disabled" },
        { status: 503 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Chat is not configured" },
        { status: 500 }
      );
    }

    const { messages } = await request.json();

    // Lazy instantiation - only create client at runtime
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: chatbotConfig.model,
      messages: [
        { role: "system", content: generateChatSystemPrompt() },
        ...messages,
      ],
      temperature: chatbotConfig.temperature,
      max_tokens: chatbotConfig.maxTokens,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to process chat" },
      { status: 500 }
    );
  }
}
