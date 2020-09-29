import React from 'react'
import { Select as AntSelect, Tooltip } from 'antd'
import { withTranslation, WithTranslation } from 'react-i18next'
import './style.scss'

interface Option {
  id: number
  value: string
}

interface Properties extends WithTranslation {
  name: string
  options: Option[]
  value: string
  onSelect?: (index: number) => void
}

class Select extends React.Component<Properties> {
  render() {
    const { name, options, value, t } = this.props
    return (
      <div className="select-container">
        <span>{name}</span>
        <AntSelect
          dropdownClassName="settings-menu-select"
          onSelect={(value, option) => this.props.onSelect && this.props.onSelect(option.key as number)}
          value={value}
        >
          {options.map(({ id, value }) => (
            <AntSelect.Option key={id} value={value}>{value}</AntSelect.Option>
          ))}
        </AntSelect>
        <Tooltip placement="top" title={t('settings.INFO')}>
          <div className="info">?</div>
        </Tooltip>
      </div>
    )
  }
}

export default withTranslation('dashboard')(Select)
