import { Voice } from '@/types/app'

export const config = {
  runtime: 'edge',
}

const handler = async (req: Request, response: Response): Promise<Response> => {
  try {
    const { input, token, voice } = (await req.json()) as {
      input: string
      token: string
      voice: Voice
    }
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          input: { text: input },
          voice: {
            languageCode: voice.languageCodes,
            name: voice.name,
            ssmlGender: voice.ssmlGender,
          },
          audioConfig: {
            audioEncoding: 'MP3',
          },
        }),
      }
    )

    if (response.status !== 200) {
      throw new Error('GGC API returned an error')
    }

    const json = await response.json()

    return new Response(JSON.stringify(json.audioContent), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Error ', { status: 500 })
  }
}

export default handler
