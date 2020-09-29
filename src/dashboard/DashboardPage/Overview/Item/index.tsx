import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import 'src/dashboard/DashboardPage/Overview/Item/style.scss'

interface Properties extends WithTranslation {
  imageUrl: string
  name: string
  isActive: boolean
}

class ProjectOverviewItem extends React.Component<Properties> {
  render() {
    const { imageUrl, name, isActive, t } = this.props
    return (
      <div className="project-overview-item-content">
        <img src={imageUrl} alt={name} />
        <span className="name">{name} </span>
        <span className={`${isActive ? 'active' : 'deActive'}`}>
          {isActive
            ? t('PROJECT_OVERVIEW.ACTIVE')
            : t('PROJECT_OVERVIEW.IS_STARTED')}
        </span>
      </div>
    )
  }
}

export default withTranslation('dashboard')(ProjectOverviewItem)
