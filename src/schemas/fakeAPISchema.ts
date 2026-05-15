import z from "zod";

export const fakeApiSchema = z.object({
    route: z.string(),
    schema: z.record(z.string(), z.any()),
    data: z.array(z.any())
})