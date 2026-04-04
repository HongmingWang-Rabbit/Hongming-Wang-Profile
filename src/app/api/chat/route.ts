import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { generateChatSystemPrompt, chatbotConfig } from "@/lib/constants";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

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

    const body = await request.json();
    const { messages } = body;

    // Validate messages array
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages must be a non-empty array" },
        { status: 400 }
      );
    }

    if (messages.length > MAX_MESSAGES) {
      return NextResponse.json(
        { error: `Too many messages (max ${MAX_MESSAGES})` },
        { status: 400 }
      );
    }

    // Validate each message
    for (const msg of messages) {
      if (
        typeof msg.role !== "string" ||
        !["user", "assistant"].includes(msg.role) ||
        typeof msg.content !== "string" ||
        msg.content.length > MAX_MESSAGE_LENGTH
      ) {
        return NextResponse.json(
          { error: "Invalid message format" },
          { status: 400 }
        );
      }
    }

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
