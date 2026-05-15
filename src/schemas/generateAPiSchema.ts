import z from "zod";

export const generateApiSchema = z.object({
    prompt: z.string(),
    limit: z.coerce.number()
})