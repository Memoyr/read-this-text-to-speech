export interface IAppContext {
  textSent?: string
  reRun?: boolean
  trackTitle?: string
  url?: string
  isAudioDisabled?: boolean
  isAudioLoading?: boolean
  language?: string
  voice?: Voice
}

export interface IAction {
  type: string
  textSent?: string
  url?: string
  isAudioDisabled?: boolean
  isAudioLoading?: boolean
  language?: string
  voice?: Voice
  reRun?: boolean
}

export interface IAppState {
  state: IAppContext
  dispatch: React.Dispatch<IAction>
}

export interface LanguageTag {
  tag: string
  description: string
}

export enum SsmlVoiceGender {
  'SSML_VOICE_GENDER_UNSPECIFIED',
  'MALE',
  'FEMALE',
  'NEUTRAL',
}

export interface Voice {
  languageCodes: string
  name: string
  ssmlGender: SsmlVoiceGender
}

export const LanguageTags: LanguageTag[] = [
  { tag: 'bn-IN', description: 'Bangla (India)' },
  { tag: 'cs-CZ', description: 'Czech (Czech Republic)' },
  { tag: 'da-DK', description: 'Danish (Denmark)' },
  { tag: 'de-DE', description: 'Standard German (as spoken in Germany)' },
  { tag: 'el-GR', description: 'Modern Greek' },
  { tag: 'en-AU', description: 'Australian English' },
  { tag: 'en-CA', description: 'Canadian English' },
  { tag: 'en-GB', description: 'British English' },
  { tag: 'en-IE', description: 'Irish English' },
  { tag: 'en-IN', description: 'Indian English' },
  { tag: 'en-NZ', description: 'New Zealand English' },
  { tag: 'en-US', description: 'English (USA)' },
  { tag: 'en-ZA', description: 'English (South Africa)' },
  { tag: 'es-AR', description: 'Argentine Spanish' },
  { tag: 'es-CL', description: 'Chilean Spanish' },
  { tag: 'es-CO', description: 'Colombian Spanish' },
  {
    tag: 'es-ES',
    description: 'Castilian Spanish (as spoken in Central-Northern Spain)',
  },
  { tag: 'es-MX', description: 'Mexican Spanish' },
  { tag: 'es-US', description: 'American Spanish' },
  { tag: 'fi-FI', description: 'Finnish (Finland)' },
  { tag: 'fr-BE', description: 'Belgian French' },
  { tag: 'fr-CA', description: 'Canadian French' },
  { tag: 'fr-CH', description: 'Swiss French' },
  { tag: 'fr-FR', description: 'Standard French (especially in France)' },
  { tag: 'he-IL', description: 'Hebrew (Israel)' },
  { tag: 'hi-IN', description: 'Hindi (India)' },
  { tag: 'hu-HU', description: 'Hungarian (Hungary)' },
  { tag: 'id-ID', description: 'Indonesian (Indonesia)' },
  { tag: 'it-IT', description: 'Standard Italian (as spoken in Italy)' },
  { tag: 'ja-JP', description: 'Japanese (Japan)' },
  { tag: 'ko-KR', description: 'Korean (Republic of Korea)' },
  { tag: 'nl-BE', description: 'Belgian Dutch' },
  {
    tag: 'nl-NL',
    description: 'Standard Dutch (as spoken in The Netherlands)',
  },
  { tag: 'no-NO', description: 'Norwegian (Norway)' },
  { tag: 'pl-PL', description: 'Polish (Poland)' },
  { tag: 'pt-BR', description: 'Brazilian Portuguese' },
  {
    tag: 'pt-PT',
    description: 'European Portuguese (as written and spoken in Portugal)',
  },
  { tag: 'ro-RO', description: 'Romanian (Romania)' },
  { tag: 'ru-RU', description: 'Russian (Russian Federation)' },
  { tag: 'sk-SK', description: 'Slovak (Slovakia)' },
  { tag: 'sv-SE', description: 'Swedish (Sweden)' },
  { tag: 'ta-IN', description: 'Indian Tamil' },
  { tag: 'th-TH', description: 'Thai (Thailand)' },
  { tag: 'tr-TR', description: 'Turkish (Turkey)' },
  { tag: 'zh-CN', description: 'Mainland China, simplified characters' },
]
