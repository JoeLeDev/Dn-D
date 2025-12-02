import { NextRequest, NextResponse } from "next/server"
import * as deepl from "deepl-node"

const translator = process.env.DEEPL_API_KEY
  ? new deepl.Translator(process.env.DEEPL_API_KEY)
  : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, target } = body

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    if (!target || !["EN", "FR"].includes(target)) {
      return NextResponse.json(
        { error: "Target must be 'EN' or 'FR'" },
        { status: 400 },
      )
    }

    if (!translator) {
      return NextResponse.json(
        {
          error: "DeepL API key not configured",
          message:
            "Please set DEEPL_API_KEY environment variable. Get a free key at https://www.deepl.com/fr/pro-api",
        },
        { status: 500 },
      )
    }

    // Convertir EN/FR en codes DeepL (DeepL utilise des codes courts)
    const targetLang = target === "EN" ? ("en" as deepl.TargetLanguageCode) : ("fr" as deepl.TargetLanguageCode)
    
    // Laisser DeepL détecter automatiquement la langue source
    const result = await translator.translateText(text, null, targetLang)

    return NextResponse.json({
      text: result.text,
      detectedSourceLanguage: result.detectedSourceLang,
    })
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json(
      {
        error: "Translation failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

