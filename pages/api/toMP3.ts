import fs from 'fs';
import path from 'path';

export const config = {
    runtime: "nodejs"
};

const handler = async (req: Request, res): Promise<{ success: boolean }> => {
    // TODO enable more of the actual max of ~ 3000 char (1mb) ~ 3min
    try {
        const base64MP3 = req.body["base64MP3"]; // TODO type
        const url = `data:audio/mp3;base64,${base64MP3}`
        const buffer = Buffer.from(
            url.split('base64,')[1],  // only use encoded data after "base64,"
            'base64'
        )
        fs.writeFile(path.join(process.env.ROOT, './public/audio/audio.mp3'), buffer,
            (error) => {
                if (error) {
                    console.log('[write mp3]: ERROR ' + error);
                    res.status(500).json({ succes: false });
                    // throw error;
                } else {
                    console.log('[write mp3]: SUCCESS');
                    console.log(`wrote ${buffer.byteLength.toLocaleString()} bytes to file.`)
                    res.status(200).json({ succes: true });
                    return res
                }
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
        return res
    }
};

export default handler;

