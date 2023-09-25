import { IAction, IAppContext } from '@/types/app'

export function appReducer(app: IAppContext, action: IAction): IAppContext {
  switch (action.type) {
    case 'read': {
      return {
        ...app,
        textSent: action.textSent,
        trackTitle: action.textSent.slice(0, 45),
        isAudioLoading: true,
        isAudioDisabled: true,
        reRun: true,
      }
    }
    case 'updated': {
      return {
        ...app,
        isAudioDisabled: false,
        //reRun: true,
      }
    }
    case 'ready': {
      return {
        ...app,
        url: action.url,
        isAudioLoading: false,
        isAudioDisabled: true,
        reRun: false,
      }
    }
    case 'lang': {
      return {
        ...app,
        language: action.language,
        voice: null,
        isAudioDisabled: true,
      }
    }
    case 'voice': {
      return {
        ...app,
        voice: {
          languageCodes: action.voice.languageCodes[0],
          name: action.voice.name,
          ssmlGender: action.voice.ssmlGender,
        },
        //reRun: true,
        isAudioDisabled: false,
      }
    }

    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}
