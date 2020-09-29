import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { EllipsisOutlined, CheckOutlined } from '@ant-design/icons/lib'
import 'src/dashboard/DashboardPage/Menu/DataMenu/Activity/style.scss'

interface EntryStatus {
  pending?: boolean
  completionTime: number
}

enum EntryType {
  SERVER_STARTED,
  BACKUP_ACTIVATED,
  BACKUP_DEACTIVATED,
  SERVER_STOPPED
}

export interface Entry {
  type: EntryType
  status: EntryStatus
}

export interface Properties {
  entries: Entry[]
}

const entryMessageKeys = new Map<number, string>([
  [EntryType.SERVER_STARTED, 'menus.data.activity.serverStarted'],
  [EntryType.BACKUP_ACTIVATED, 'menus.data.activity.backupsEnabled'],
  [EntryType.BACKUP_DEACTIVATED, 'menus.data.activity.backupsDisabled'],
  [EntryType.SERVER_STOPPED, 'menus.data.activity.serverStopped']
])

function resolveEntryMessage(type: EntryType, message: (key: string) => string): string {
  const key = entryMessageKeys.get(type) || 'menus.data.activity.unknown'
  return message(key)
}

class Activity extends React.Component<Properties & WithTranslation> {
  render() {
    return (
      <div className="server-activity dashboard-card">
        <div className="title">
          <span>
            {this.props.t('menus.data.activity.serverActivity')}
          </span>
        </div>
        {this.renderEntries()}
        <div className="show-more">
          <span>
            {this.props.t('menus.data.activity.showMore')}
          </span>
        </div>
      </div>
    )
  }

  private renderEntries() {
    const entries = this.props.entries.map((entry, index) => this.renderEntryAsListItem(entry, index))
    return <ul>{entries}</ul>
  }

  private renderEntryAsListItem(entry: Entry, index: number) {
    return <li key={`activity-entry-${index}`}>{this.renderEntry(entry)}</li>
  }

  private renderEntry(entry: Entry) {
    const icon = entry.status.pending ? <EllipsisOutlined/> : <CheckOutlined/>
    const message = resolveEntryMessage(entry.type, this.props.t)
    return <span>{icon} {message}</span>
  }
}

export default withTranslation('dashboard')(Activity)