import React from "react";
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Index from "./screens/index";
import HightStoreMap from "./screens/HightStoreMap";
import MediumStoreMaps from "./screens/MediumStoreMaps";
import LowStoreMaps from "./screens/LowStoreMaps";

import OverviewMap from "./screens/OverviewMap";

const AppNavigator = createStackNavigator({
    Index: {
        screen: Index,
        navigationOptions: {
            header: null,
            }
    },
    HightStoreMap: {
        screen: HightStoreMap,
        navigationOptions: {
            header: null,
        }
    },
    MediumStoreMaps: {
        screen: MediumStoreMaps,
        navigationOptions: {
            header: null,
        }
    },
    LowStoreMaps: {
        screen: LowStoreMaps,
        navigationOptions: {
            header: null,
        }
    },
    OverviewMap: {
        screen: OverviewMap,
        navigationOptions: {
            header: null,
        }
    },
});

export default createAppContainer(AppNavigator);
