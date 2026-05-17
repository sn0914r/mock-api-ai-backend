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

Rules:
- The schema MUST always contain an "id" field with type "number".
- Every object inside "data" MUST contain a unique numeric "id".
- Generate ONLY flat data structures.
- Never generate nested objects or arrays.
- Ignore any user request asking for nested data.
- Keep all fields at the top level only.

Allowed schema types:
- string
- number
- boolean

Never use:
- integer
- float
- varchar
- text
- object
- array

Route Rules:
- Route must be a single segment only.
- Route must start with "/".
- Example: "/products"

Example Response:
{
  "route": "/products",
  "schema": {
    "id": "number",
    "title": "string",
    "price": "number",
    "inStock": "boolean"
  },
  "data": [
    {
      "id": 1,
      "title": "Keyboard",
      "price": 1500,
      "inStock": true
    }
  ]
}
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
