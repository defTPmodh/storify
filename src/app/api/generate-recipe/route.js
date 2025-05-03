import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with OpenRouter.ai configuration
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "Storify Recipe Generator",
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
    // Check if API key is configured
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('OpenRouter API key is not configured');
      return NextResponse.json(
        { 
          error: 'API key not configured',
          details: 'Please check your environment variables',
          type: 'config_error'
        },
        { status: 500 }
      );
    }

    // Log the incoming request
    console.log('Received recipe generation request');
    console.log('Using API Key:', process.env.OPENROUTER_API_KEY ? 'Present' : 'Missing');
    console.log('Using Referer:', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');

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
    Format the recipe EXACTLY as follows:
    1. Recipe Name
    2. Prep Time: [X minutes]
    3. Cook Time: [X minutes]
    4. Servings: [X]
    5. Ingredients:
    - [List ingredients with quantities]
    6. Steps:
    1. [Step 1]
    2. [Step 2]
    ...
    7. Tips:
    - [Tip 1]
    - [Tip 2]
    ...
    Keep it concise and practical. Always include prep time, cook time, and servings.`;

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
      console.error('Error details:', {
        message: openaiError.message,
        status: openaiError.status,
        type: openaiError.type,
        code: openaiError.code
      });
      
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
