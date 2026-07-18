// import { NextResponse } from 'next/server';
// import { GoogleGenAI } from '@google/genai';

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// export async function POST(req: Request) {
//   try {
//     const { habit, logs, message, chatHistory } = await req.json();

//     const systemPrompt = `
//       You are an expert behavior change coach specializing in Cognitive Behavioral Therapy (CBT).
//       The user is working dynamically to overcome the following habit/addiction: "${habit}".
//       Here is their recent live friction tracking history for this habit: ${JSON.stringify(logs)}
//       Provide an empathetic, personalized, and context-aware coaching response.
//       Keep it actionable and restricted to under 3 sentences max.
//     `;

//     const contents = [
//       { role: 'user', parts: [{ text: systemPrompt }] },
//       ...chatHistory.map((ch: any) => ({
//         role: ch.sender === 'user' ? 'user' : 'model',
//         parts: [{ text: ch.text }]
//       })),
//       { role: 'user', parts: [{ text: message }] }
//     ];

//     // UPDATED ACTIVE PRODUCTION STRING
//     const response = await ai.models.generateContent({
//       model: 'gemini-2.0-flash', // Ensure this string matches the latest flash iteration or 'gemini-2.5-pro'
//       contents: contents,
//     });

//     return NextResponse.json({ reply: response.text });
//   } catch (error) {
//     console.error('API Invocation Error:', error);
//     return NextResponse.json({ error: 'Gemini invocation failed' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { Mistral } from '@mistralai/mistralai';

// Initialize the Mistral client with your server-protected API token
const apiKey = process.env.MISTRAL_API_KEY || '';
const client = new Mistral({ apiKey });

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { habit, message, logs, chatHistory } = payload;

    // Strict Security Input Type Validation Guardrail Check
    if (
      !habit || typeof habit !== 'string' || 
      !message || typeof message !== 'string' ||
      !Array.isArray(logs) || !Array.isArray(chatHistory)
    ) {
      return new Response(JSON.stringify({ error: 'Insecure or malformed payload layout signature rejected.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Context-aware dynamic framing based on user tracking state
    // const systemPrompt = `
    //   You are an expert behavior change coach specializing in Cognitive Behavioral Therapy (CBT).
    //   The user is working dynamically to overcome the following habit/addiction: "${habit}".
      
    //   Here is their recent live friction tracking history for this habit:
    //   ${JSON.stringify(logs)}

    //   Provide an empathetic, personalized, and context-aware coaching response to their message. 
    //   Never give canned, static, or generic answers. Keep your response completely actionable and restricted to under 3 sentences max.
    // `;
    const systemPrompt = `
  You are an elite behavioral change consultant and clinical coach specializing in Cognitive Behavioral Therapy (CBT).
  The user is consulting you to structurally address and balance the following lifestyle area: "${habit}".
  
  Here is their live dynamic friction log history context for reference: ${JSON.stringify(logs)}

  YOUR BOUNDARIES & CLINICAL METHODOLOGY:
  1. DO NOT give direct, straight-forward suggestions immediately. Act like a live consulting doctor conducting a real intake session.
  2. Rather than leaving conversations blindly open-ended, you must actively guide the user. Balance empathy with clinical curiosity to uncover their daily routines, hidden triggers, environmental cues, and internal struggles.
  3. Work to understand their overall time structure and schedule alongside the habit itself before prescribing micro-habits.
  4. Provide deep validation, then outline structured step-by-step custom adjustments when appropriate.
  5. CRITICAL: Every single response must conclude with a sharp, engaging, singular clinical follow-up question to keep the patient focused and maintain conversation momentum.

  Keep your output concise, deeply human, professional, and limited to 3-4 sentences maximum.
    CRITICAL TEXT FORMATTING RULE: 
If you recommend a concrete, real-world behavioral task for the patient to perform during their routine, you MUST strictly enclose that specific actionable task inside bracket tags exactly like this: [Action: Your task description here | Time Slot]. 
For Time Slot, choose exactly one of these: Morning Focus, Midday Routine, Evening Transition, or Night Vulnerability Window.
Example: "I recommend stepping away from screens. [Action: Leave phone in the hallway | Night Vulnerability Window]"
`;

    // Map your custom state elements cleanly into Mistral's required array format
    const formattedMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...chatHistory.map((ch: any) => ({
        role: ch.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: ch.text,
      })),
      { role: 'user' as const, content: message },
    ];

    // Invoke Mistral's ultra-fast flash model to preserve quick response times
    const response = await client.chat.complete({
      model: 'mistral-large-latest', 
      messages: formattedMessages,
    });

    const replyText = response.choices?.[0]?.message?.content || 'I encountered an error processing your context.';

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error('Mistral API Error:', error);
    return NextResponse.json({ error: 'Mistral invocation failed' }, { status: 500 });
  }
}