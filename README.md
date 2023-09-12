# Read me this! - A basic text-to-speech tool

Small text to speech tool, for personal usage. 

Using (React, Nextjs, Nextjs-auth, Google text-to-speech API)


## Running Locally

**1. Install Dependencies**

```bash
npm i
```

**2. Run App**

```bash
npm run dev
```

**3. Use It**

The app require Google Authentication under the hood, create API credential and adjust your env variables.

[Enable googlea API](https://console.cloud.google.com/apis/library/speech.googleapis.com)

[oauthclient](https://console.cloud.google.com/apis/credentials/oauthclient)
 
 1. OAuth client ID
 2. Web application
 3. Authorised JavaScript origins -> http://localhost:3000
 4. Authorised redirect URIs -> http://localhost:3000/api/auth/callback/google

[credentials consent](https://console.cloud.google.com/apis/credentials/consent)

## Updates

Some improvements are on the list :

**Next up:**

- [ ] Enable audio generation longuer than 3 minutes (3000 characters)
- [ ] Authentication for new user on invitation only (quotas) (paid Solution, or test user account for demo ?)
- [ ] Multilingual
- [ ] Voice selection
- [ ] Darkmode & page design
- [ ] Design Shortcuts panel , add more shortcuts
- [ ] Design audio player & placement
- [ ] Install tailwind
- [ ] try elevenlabs 