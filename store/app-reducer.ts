export interface IAppContext {
  textSent?: string
  trackTitle?: string
  url?: string
  isAudioDisabled?: boolean
  isAudioLoading?: boolean
}
interface IAction {
  type: string
  textSent?: string
  url?: string
  isAudioDisabled?: boolean
  isAudioLoading?: boolean
}
export interface IAppState {
  state: IAppContext
  dispatch: React.Dispatch<IAction>
}

export function appReducer(app: IAppContext, action: IAction): IAppContext {
  switch (action.type) {
    case 'read': {
      return {
        ...app,
        textSent: action.textSent,
        trackTitle: action.textSent.slice(0, 45),
        isAudioLoading: true,
        isAudioDisabled: true,
      }
    }
    case 'ready': {
      return {
        ...app,
        url: action.url,
        isAudioLoading: false,
        isAudioDisabled: false,
      }
    }

    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}
