import { NextRequest, NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import {z} from 'zod'
import { generateObject } from "ai"

export default async function GET(req: NextRequest) {
    const recipeUrl = req.body

    // SCRAPE THE RECIPE CONTENT
    const recipeContent = ""

    const recipeObject = await generateObject({
        model: openai('gpt-4o'),
        prompt: `Given this recipe extract only the name, ingredients and steps to create a structured object. Do not include links. 
            The content is as follows ${recipeContent}`,

        schema: z.object({
            recipeName: z.string(),
            ingredients: z.array(z.object({ name: z.string(), amount: z.string() })),
            steps: z.array(z.string()),
        })
    })

    console.log(recipeObject)

    return NextResponse.json(recipeObject, {status: 200})
    // 

}