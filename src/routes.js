
import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { BASE_URL } from './services/LoginConfig';



export const renderRoutes = (routes = []) => (
    <Suspense fallback="Loading...">
        <Switch>
            {routes.map((route, i) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;
                return (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <Guard>
                                <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>
                            </Guard>
                        )}
                    />
                );
            })}

            {/* <Route path='/tokenReceiver' component={<TokenReceiver />}></Route> */}
        </Switch>
    </Suspense>
);

const routes = [
    {
        path: '/',
        exact: true,
        component: () => window.location.href = BASE_URL
    },
    {
        path: '*',
        layout: MainLayout,
        guard: AuthGuard,
        routes: [
            { exact: true, path: '/Class4GPF', component: lazy(() => import('./components/ClassfourGPF/ClassfourGPFMain')) },
        ]
    }
];

export default routes;