import React from "react";
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Index from "./screens/index";
import HightStoreMap from "./screens/HightStoreMap";
import MediumStoreMaps from "./screens/MediumStoreMaps";
import LowStoreMaps from "./screens/LowStoreMaps";
import OverviewMap from "./screens/OverviewMap";
import Food from "./screens/Food";
import FilterStroe from "./screens/FilterStroe";
import MainMenu from "./screens/MainMenu";
import Search from "./screens/Search";
import Message from "./screens/Message";
import Profile from "./screens/Profile";
import Announcement from "./screens/Announcement";


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
    Food: {
        screen: Food,
        navigationOptions: {
            header: null,
        }
    },
    FilterStroe: {
        screen: FilterStroe,
        navigationOptions: {
            header: null,
        }
    },
    MainMenu: {
        screen: MainMenu,
        navigationOptions: {
            header: null,
        }
    },
    Search: {
        screen: Search,
        navigationOptions: {
            header: null,
        }
    },
    Message: {
        screen: Message,
        navigationOptions: {
            header: null,
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            header: null,
        }
    },
    Announcement: {
        screen: Announcement,
        navigationOptions: {
            header: null,
        }
    },
    
});

export default createAppContainer(AppNavigator);
