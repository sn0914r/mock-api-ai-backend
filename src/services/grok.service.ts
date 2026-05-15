import groq from "../clients/groq";
import { fakeApiSchema } from "../schemas/fakeAPISchema";

export const generateFakeApi = async (prompt: string, limit: number) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
Generate ${limit} fake items.

Return ONLY valid JSON.

Response format:
{
  "route": "string",
  "schema": {},
  "data": []
}

Allowed schema types:
- string
- number
- boolean

Never use:
- integer
- float
- varchar
- text

Make sure the route is single segment only.
Example:
"/products"
`,
      },
      {
        role: "user",
        content: `Prompt: ${prompt}\nLimit: ${limit}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const result = response.choices[0]?.message.content || "{}";
  const parsedResult = JSON.parse(result);
  const validatedData = fakeApiSchema.parse(parsedResult);

  return validatedData;
};
