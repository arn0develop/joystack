import React from 'react'
import { MoreOutlined, PlusOutlined } from '@ant-design/icons'
import { withTranslation, WithTranslation } from 'react-i18next'
import ProjectOverviewItem from 'src/dashboard/DashboardPage/Overview/Item'
import 'src/dashboard/DashboardPage/Overview'

class Overview extends React.Component<WithTranslation> {
  render() {
    const { t } = this.props
    return (
      <div className="project-overview-content">
        <MoreOutlined />
        <div className="title">
          <span>{t('PROJECT_OVERVIEW.PROJECT')} (3)</span>
        </div>
        <ProjectOverviewItem
          imageUrl="/images/dashboard_joystack.png"
          name="Bubicraft"
          isActive
        />
        <ProjectOverviewItem
          imageUrl="/images/bubicraftll.png"
          name="Bubicraftll"
          isActive
        />
        <ProjectOverviewItem
          imageUrl="/images/goldcraft.png"
          name="Goldcraft"
          isActive={false}
        />
        <div className="new-project-content">
          <PlusOutlined />
          <span>{t('PROJECT_OVERVIEW.NEW_PROJECT')}</span>
        </div>
      </div>
    )
  }
}

export default withTranslation('dashboard')(Overview)