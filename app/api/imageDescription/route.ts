// import { generateObject } from 'ai'
// import { openAI } from '@/app/providers/openAI'
// import { ingredientSchema, outputSchema } from "@/app/schemas/schemas"
// import { prompt } from "@/app/constants/constants"


export async function POST(req: Request) {
  const body = await req.json();
  console.log('[DEBUG]: POST /chat', body);

  try {
    return null;
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
}
