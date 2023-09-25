export const config = {
  runtime: 'edge',
}

const handler = async (req: Request, response: Response): Promise<Response> => {
  try {
    const { languageCode, token } = (await req.json()) as {
      languageCode: string
      token: string
    }

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/voices?languageCode=${languageCode}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        method: 'GET',
      }
    )

    if (response.status !== 200) {
      throw new Error('Get voices list API returned an error')
    }

    const json = await response.json()

    return new Response(JSON.stringify(json.voices), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Error ', { status: 500 })
  }
}

export default handler
