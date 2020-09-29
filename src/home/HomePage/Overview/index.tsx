import React from 'react'

import { withTranslation, WithTranslation } from 'react-i18next'
import 'src/home/HomePage/Overview/style.scss'

const ItemIcon = () => {
  return (
    <div className="item-icon-border">
      <div className="item-icon">
        <i
          className="material-icons-outlined mr-1 unselectable-text"
          unselectable="on"
        >
          done
        </i>
      </div>
    </div>
  )
}

interface Properties {
  title: string
  text: string
  id: string
  accordionId: string
  expanded: boolean
}

class OverviewCard extends React.Component<Properties> {
  render() {
    const collapseId = `collapse-${this.props.id}`
    return (
      <div className="card">
        <div className="card-header">
          <button
            className="btn collapse-button btn-link"
            type="button"
            data-toggle="collapse"
            data-target={`#${collapseId}`}
            aria-expanded="true"
            aria-controls={collapseId}
          >
            <h2>{this.props.title}</h2>
          </button>
          <div className="card-header-icon">
            <ItemIcon />
          </div>
        </div>
        <div
          id={collapseId}
          className={`collapse ${this.props.expanded ? 'show' : ''}`}
          aria-labelledby={collapseId}
          data-parent={`#${this.props.accordionId}`}
        >
          <div className="card-body">{this.props.text}</div>
        </div>
      </div>
    )
  }
}

class Overview extends React.Component<WithTranslation> {
  render() {
    const { t } = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="overview-title">
              {t('OVERVIEW.YOUR_JOYSTACK_BENEFITS')}
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="overview-spacer" />
          </div>
        </div>
        <div className="row">
          <div className="accordion" id="joystack-overview">
            <OverviewCard
              expanded={true}
              title={t('OVERVIEW.START_COMPLETELY_FREE')}
              id="first"
              accordionId="joystack-overview"
              text={t('OVERVIEW.ABOUT_FIRST_CARD')}
            />
            <OverviewCard
              expanded={false}
              title={t('OVERVIEW.MODPACKS_PLUGINS_MAPS')}
              id="second"
              accordionId="joystack-overview"
              text={t('OVERVIEW.ABOUT_SECOND_CARD')}
            />
            <OverviewCard
              expanded={false}
              title={t('OVERVIEW.SHARE_IMPORT_VIA_LINK')}
              id="third"
              accordionId="joystack-overview"
              text={t('OVERVIEW.ABOUT_THIRD_CARD')}
            />
            <OverviewCard
              expanded={false}
              title={t('OVERVIEW.EASILY_ADJUSTABLE')}
              id="fourth"
              accordionId="joystack-overview"
              text={t('OVERVIEW.ABOUT_FOURTH_CARD')}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation('HOME_PAGE')(Overview)
