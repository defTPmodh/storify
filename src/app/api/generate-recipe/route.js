import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with OpenRouter.ai configuration
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // Your local development URL
    "X-Title": "Storify Recipe Generator", // Your app name
  },
});

// Handle GET request
export async function GET() {
  return NextResponse.json(
    { message: 'This endpoint only accepts POST requests' },
    { status: 405 }
  );
}

// Handle POST request
export async function POST(request) {
  try {
    // Log the incoming request
    console.log('Received recipe generation request');

    const body = await request.json();
    console.log('Request body:', body);

    const { ingredients } = body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      console.log('Invalid ingredients:', ingredients);
      return NextResponse.json(
        { error: 'Please provide at least one ingredient' },
        { status: 400 }
      );
    }

    console.log('Generating recipe for ingredients:', ingredients);

    // Optimized prompt for faster response
    const prompt = `Create a quick recipe using these ingredients: ${ingredients.join(', ')}. 
    Format as:
    1. Recipe Name
    2. Prep Time (minutes)
    3. Cook Time (minutes)
    4. Servings
    5. Ingredients (with quantities)
    6. Steps (numbered)
    7. Tips (bullet points)
    Keep it concise and practical.`;

    console.log('Sending request to OpenRouter.ai...');

    try {
      const completion = await openai.chat.completions.create({
        model: "meta-llama/llama-4-maverick:free",
        messages: [
          {
            "role": "user",
            "content": prompt
          }
        ]
      });

      console.log('Received response from OpenRouter.ai');

      if (!completion.choices[0]?.message?.content) {
        console.error('No content in OpenRouter.ai response:', completion);
        throw new Error('No recipe generated');
      }

      const recipe = completion.choices[0].message.content;
      console.log('Generated recipe:', recipe);

      return NextResponse.json({ recipe });
    } catch (openaiError) {
      console.error('OpenRouter.ai API error:', openaiError);
      return NextResponse.json(
        { 
          error: 'Failed to generate recipe with OpenRouter.ai',
          details: openaiError.message,
          type: 'openai_error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Detailed error in recipe generation:', error);
    
    // Return a more detailed error message
    return NextResponse.json(
      { 
        error: 'Failed to generate recipe. Please try again.',
        details: error.message,
        type: 'server_error'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    }
  );
} 