import {getPreservedNavigatorState} from '@navigation/AppNavigator/createSplitNavigator/usePreserveNavigatorState';

import type {RouterConfigOptions} from '@react-navigation/native';

import {StackRouter} from '@react-navigation/native';

import type RightModalNavigatorRouterOptions from './types';

function RightModalRouter(options: RightModalNavigatorRouterOptions) {
    const stackRouter = StackRouter(options);

    return {
        ...stackRouter,
        getInitialState(configOptions: RouterConfigOptions) {
            const preservedState = getPreservedNavigatorState(options.parentRoute.key);
            if (preservedState && Array.isArray(preservedState.routes) && preservedState.routes.length > 0) {
                return stackRouter.getRehydratedState(preservedState, configOptions);
            }
            return stackRouter.getInitialState(configOptions);
        },
    };
}

export default RightModalRouter;
