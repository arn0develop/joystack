import React from 'react'
import 'src/setup/SetupPage/ProceedButton/style.scss'
import {withTranslation, WithTranslation} from 'react-i18next'

interface Properties extends WithTranslation {
  submit: () => void
  centered?: boolean
  disabled?: boolean
  titleT?: string | null
}

class ProceedButton extends React.Component<Properties> {
  render() {
    const {submit, disabled,titleT, t,centered} = this.props
    console.log(titleT)
    return (
      <div className='proceed-button-container'>
        <button
          disabled={disabled}
          onClick={submit}
          className={`proceed-button main-button ${centered ? 'centered-button' : ''}`}
        >
          {t(titleT || 'TO_THE_NEXT_STEP')}
        </button>
      </div>
    )
  }
}

export default withTranslation('SETUP_PAGE')(ProceedButton)