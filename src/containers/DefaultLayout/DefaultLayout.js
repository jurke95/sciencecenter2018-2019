import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Background from './bck.jpg';

import {
  AppBreadcrumb,
  AppHeader,
  // AppSidebar,
  //AppSidebarFooter,
  //AppSidebarForm,
  // AppSidebarHeader,
  // AppSidebarMinimizer,
  //AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
//import navigation from '../../_nav';
// routes config
import routes from '../../routes';

//const DefaultAside = React.lazy(() => import('./DefaultAside'));
//const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

var sectionStyle = {

  backgroundImage: `url(${Background})`,
  minHeight: '100vh',
  minWidth: '100vh',
  marginTop: 0,
  zIndex: 1,
  overflow: 'hidden',
  backgroundRepeat: 'no-repeat'


};

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="app" style={sectionStyle}>
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          { /*<AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
    </AppSidebar>  */}
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>

        </div>


      </div>
    );
  }
}

export default DefaultLayout;
