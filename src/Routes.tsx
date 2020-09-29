import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Logout from 'src/login/LoginPage/Logout'
import LoginPage, {Type as LoginType} from 'src/login/LoginPage'
import TestPage from './TestPage'
import {signUpMode} from './setup/SetupPage/mode'
import Loading from './component/Loading'

const HomePage = React.lazy(() => import('src/home/HomePage'))
const DashboardPage = React.lazy(() => import('src/dashboard/DashboardPage'))
const NotFoundPage = React.lazy(() => import('src/component/Pages/NotFoundPage'))
const SetupPage = React.lazy(() => import('src/setup/SetupPage'))
const PrivacyPolicy = React.lazy(() => import('src/component/Pages/PrivacyPolicy'))
const Terms = React.lazy(() => import('src/component/Pages/Terms'))

export default class Routes extends React.Component<any> {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            name="Home"
            render={(properties: any) => <HomePage {...properties} />}
          />
          <Route
            exact
            path="/loading"
            name="Loading"
            render={(properties: any) => <Loading {...properties} />}
          />
          <Route
            path="/dashboard"
            name="Dashboard"
            render={(properties: any) => <DashboardPage {...properties} />}
          />
          <Route
            exact
            path="/404"
            name="404 Page"
            render={(properties: any) => <NotFoundPage {...properties} />}
          />
          <Route
            path="/start"
            name="Start"
            render={(properties: any) =>
              <SetupPage {...properties} mode={signUpMode}/>
            }
          />
          <Route
            exact
            path="/logout"
            name="Log out"
            render={(properties: any) => <Logout {...properties}/>}
          />
          <Route
            exact
            path="/login"
            name="Log in"
            render={(properties: any) =>
              <LoginPage
                {...properties}
                type={LoginType.LOGIN}
              />
            }
          />
          <Route
            exact
            path="/register"
            name="Sign in"
            render={(properties: any) =>
              <LoginPage
                {...properties}
                type={LoginType.REGISTER}
              />
            }
          />
          <Route
            exact
            path="/privacy/:language"
            name="Privacy Policy"
            render={(properties: any) =>
              <PrivacyPolicy
                {...properties}
              />
            }
          />
          <Route
            exact
            path="/terms/:language"
            name="Terms"
            render={(properties: any) =>
              <Terms
                {...properties}
              />
            }
          />
          <Route exact path="/forum" name="Forum">
            <Redirect to="https://forum.joystack.com"/>
          </Route>
          <Redirect to="/404"/>
        </Switch>
      </div>
    )
  }
}
