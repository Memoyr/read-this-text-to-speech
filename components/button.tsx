import * as React from 'react'
import {
  Button as BaseButton,
  ButtonOwnerState,
  ButtonProps,
} from '@mui/base/Button'

const Button = React.forwardRef(function Button(
  props: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <BaseButton
      {...props}
      slotProps={{
        root: (state: ButtonOwnerState) => ({
          className: `hover:text-[#608bff] transition-colors ${
            state.focusVisible ? 'outline-0 ring-2 ring-[#608bff]' : ''
          }`,
        }),
      }}
      ref={ref}
    />
  )
})

export default Button
