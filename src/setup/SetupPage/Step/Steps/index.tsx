import React from 'react'
import { Steps as AntSteps, Popover } from 'antd'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { WithTranslation, withTranslation } from 'react-i18next'
import redirect from 'src/redirect'
import 'src/setup/SetupPage/Step/Steps/style.scss'

const { Step } = AntSteps

interface SpecialDotParameters {
  dot: any
  status: string
  index: number
}

class SpecialDot extends React.Component<SpecialDotParameters> {
  render() {
    return  (
      <Popover
        content={
          <span>
            step {this.props.index} status: {this.props.status}
          </span>
        }>
        {this.props.dot}
      </Popover>
    )
  }
}

export enum StepKind {
  BEGIN = 0,
  ADDONS = 0,
  DOMAIN_SETUP = 1,
  WORLD_SETUP = 2,
  SUMMARY = 3
}

interface DotCreationParameters {
  index: number
  status: string
  title: string
  description: string
}

function createSpecialDot(iconDot: any, parameters: DotCreationParameters): React.ReactNode {
  return <SpecialDot
    dot={iconDot}
    status={parameters.status}
    index={parameters.index}
  />
}

interface OwnProperties {
  rootPath?: '/dashboard' | '/start'
}

const routeToKindCreator = (rootPath: string) => {
  const selectedPath = rootPath.slice(1) ? `${rootPath}/`: ''
  return new Map(Object.entries({
    [`${selectedPath}start`]: StepKind.BEGIN,
    [`${selectedPath}start/addons`]: StepKind.BEGIN,
    [`${selectedPath}start/domain`]: StepKind.DOMAIN_SETUP,
    [`${selectedPath}start/world`]: StepKind.WORLD_SETUP,
    [`${selectedPath}start/summary`]: StepKind.SUMMARY
  }))
}

type Properties = OwnProperties & RouteComponentProps<any> & WithTranslation

export class Steps extends React.Component<Properties> {
  private routeToKind = routeToKindCreator(this.props.rootPath?.slice(1) || '')

  private findRouteForLocation(location: string = window.location.toString()): StepKind {
    const relativePath = location.replace(/^(?:\/\/|[^/]+)*\//, '')
    return this.routeToKind.get(relativePath) || StepKind.BEGIN
  }
  render() {
    const { t, location: { pathname }, rootPath } = this.props
    const selectedPath = rootPath ? rootPath: ''
    const isHalfStep = [`${selectedPath}/start/modpack`, `${selectedPath}/start/minecraft`].includes(pathname)
    return (
      <div className="steps-content">
        <div className="logo">
          <Link to="/">
            <img width="150px" src={'/images/logo/joystack_logo.svg'} alt="logo" />
          </Link>
        </div>
        <AntSteps
          current={this.findRouteForLocation()}
          progressDot={createSpecialDot}
        >
          <Step
            className={isHalfStep ? 'half' : ''}
            onClick={() => redirect(`${selectedPath}/start`)}
            title={t('SERVER_TYPE')}
          />
          <Step title={t('DOMAIN')}/>
          <Step title={t('WORLD_SELECTION')}/>
          <Step title={t('START_THE_SERVER')}/>
        </AntSteps>
      </div>
    )
  }
}

export default withRouter(withTranslation('SETUP_PAGE')(Steps))