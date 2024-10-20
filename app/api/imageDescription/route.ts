import { generateObject } from 'ai'
import { openAI } from '@/app/providers/openAI'
import { outputSchema } from "@/app/schemas/schemas"
import { prompt } from "@/app/constants/constants"

// POST /imageDescription
export async function POST(req: Request) {  
  try {
  const body = await req.json();

  const { image, mimeType } = body;

  // Convert the Base64 image string to a data URL
  const imageUrl = `data:image/png;base64,${image}`;
  const model = openAI('gpt-4o')
  
  // *********************** //
  // *** openAI endpoint *** //
  // *********************** //
  const response = await generateObject({
    model,
    output: 'object',
    schema: outputSchema,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image', image: imageUrl, mimeType: mimeType,        
            experimental_providerMetadata: {
              openai: { imageDetail: 'high' },
            }, },
        ],
      },
    ],
    maxTokens: 4096,
  })

  return response.toJsonResponse();
} catch (error) {
    console.error('[ERROR]: POST/imageDescription:', error);

    return new Response(JSON.stringify({ error: 'Internal Server Error: please try again later' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
