import React from 'react'
import { Button } from 'antd'
import 'src/component/NavigationBar/style.scss'
import { NativeButtonProps } from 'antd/lib/button/button'
 
interface Properties extends NativeButtonProps {
  language: string
  flag: string
}

export default class LanguageButton extends React.Component<Properties> {
  render() {
    const { flag, language, ...buttonProps } = this.props
    const link = `https://www.countryflags.io/${flag}/flat/48.png`
    return (
      <div className="language-button">
        <Button {...buttonProps}>
          <img src={link} alt={language} />
        </Button>
      </div>
    )
  }
}
