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
import Notifycation from "./screens/Notifycation";

import Announcement from "./screens/Announcement";
import Schedule from "./screens/Schedule";
import AcademicEvents from "./screens/AcademicEvents";
import AcademicEventsDetail from "./screens/AcademicEventsDetail";
import DentalGroupPurchase from "./screens/DentalGroupPurchase";
import DentalGroupPurchaseFilter from "./screens/DentalGroupPurchaseFilter";
import DentalSpecialGroupPurchase from "./screens/DentalSpecialGroupPurchase";
import ClinicRecruitmentHumanSupport from "./screens/ClinicRecruitmentHumanSupport";
import ClinicRecruitment from "./screens/ClinicRecruitment";
import ClinicRecruitmentHumanSupportDetail from "./screens/ClinicRecruitmentHumanSupportDetail";
import ContactTheClinic from "./screens/ContactTheClinic";


import Student from "./screens/Student";
import StudenDepartmentAssociationAnnouncementDetail from "./screens/StudenDepartmentAssociationAnnouncementDetail";

import HelpAndService from "./screens/HelpAndService";
import HelpAndServiceAnonymous from "./screens/HelpAndServiceAnonymous";




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
    Notifycation: {
        screen: Notifycation,
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
    Schedule: {
        screen: Schedule,
        navigationOptions: {
            header: null,
        }
    },
    AcademicEvents: {
        screen: AcademicEvents,
        navigationOptions: {
            header: null,
        }
    },
    AcademicEventsDetail: {
        screen: AcademicEventsDetail,
        navigationOptions: {
            header: null,
        }
    },
    DentalGroupPurchase: {
        screen: DentalGroupPurchase,
        navigationOptions: {
            header: null,
        }
    },
    DentalGroupPurchaseFilter: {
        screen: DentalGroupPurchaseFilter,
        navigationOptions: {
            header: null,
        }
    },
    DentalSpecialGroupPurchase: {
        screen: DentalSpecialGroupPurchase,
        navigationOptions: {
            header: null,
        }
    },
    ClinicRecruitment: {
        screen: ClinicRecruitment,
        navigationOptions: {
            header: null,
        }
    },
    ClinicRecruitmentHumanSupport: {
        screen: ClinicRecruitmentHumanSupport,
        navigationOptions: {
            header: null,
        }
    },
    ClinicRecruitmentHumanSupportDetail: {
        screen: ClinicRecruitmentHumanSupportDetail,
        navigationOptions: {
            header: null,
        }
    },
    ContactTheClinic: {
        screen: ContactTheClinic,
        navigationOptions: {
            header: null,
        }
    },
    Student: {
        screen: Student,
        navigationOptions: {
            header: null,
        }
    },
    StudenDepartmentAssociationAnnouncementDetail: {
        screen: StudenDepartmentAssociationAnnouncementDetail,
        navigationOptions: {
            header: null,
        }
    },
    HelpAndService: {
        screen: HelpAndService,
        navigationOptions: {
            header: null,
        }
    },
    HelpAndServiceAnonymous: {
        screen: HelpAndServiceAnonymous,
        navigationOptions: {
            header: null,
        }
    },
    
    
});

export default createAppContainer(AppNavigator);
