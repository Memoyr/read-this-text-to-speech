export const config = {
  runtime: "edge"
};

const handler = async (req: Request, response:Response): Promise<Response> => {
 
  try {
    const { text, token } = (await req.json()) as {
      text: string;
      token:string
    };
    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Accept":"application/json"
      },
      method: "POST",
      body: JSON.stringify({
          input:{text},
          voice:{
            languageCode:"en-gb",
            name:"en-GB-Standard-A",
            ssmlGender:"FEMALE"
          },
          audioConfig:{
            audioEncoding:"MP3"
          }
      })
    });

    if (response.status !== 200) {
      throw new Error("GGC API returned an error");
    }

    const json = await response.json();
    
    return new Response(JSON.stringify(json.audioContent), { status: 200 });
  } catch (error) {
    
    console.error(error);
    return new Response("Error ", { status: 500 });
  }
};

export default handler;
