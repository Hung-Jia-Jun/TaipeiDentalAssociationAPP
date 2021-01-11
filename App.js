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
import SendMessage from "./screens/SendMessage";
import MessageCommunication from "./screens/MessageCommunication";
import DentalProcurement from "./screens/DentalProcurement";
import DentalProcurementConfirm from "./screens/DentalProcurementConfirm";
import DentalProcurementSussful from "./screens/DentalProcurementSussful";
import ShoppingCart from "./screens/ShoppingCart";
import ShoppingCartDeleteProductConfirm from "./screens/ShoppingCartDeleteProductConfirm";
import ShoppingCartDeletedProductList from "./screens/ShoppingCartDeletedProductList";
import ShoppingCartDoneProductList from "./screens/ShoppingCartDoneProductList";

import ReceiveAward from "./screens/ReceiveAward";
import EditProfile from "./screens/EditProfile";
import MyFavourite from "./screens/MyFavourite";
import MyFavouriteFood from "./screens/MyFavouriteFood";
import MyFavouriteSeminar from "./screens/MyFavouriteSeminar";
import MyFavouriteProduct from "./screens/MyFavouriteProduct";
import MyStore from "./screens/MyStore";
import MyStoreHasBeenRemoved from "./screens/MyStoreHasBeenRemoved";
import PersonalBusinessCard from "./screens/PersonalBusinessCard";












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
    SendMessage: {
        screen: SendMessage,
        navigationOptions: {
            header: null,
        }
    },
    MessageCommunication: {
        screen: MessageCommunication,
        navigationOptions: {
            header: null,
        }
    },
    DentalProcurement: {
        screen: DentalProcurement,
        navigationOptions: {
            header: null,
        }
    },
    DentalProcurementConfirm: {
        screen: DentalProcurementConfirm,
        navigationOptions: {
            header: null,
        }
    },
    DentalProcurementSussful: {
        screen: DentalProcurementSussful,
        navigationOptions: {
            header: null,
        }
    },
    ShoppingCart: {
        screen: ShoppingCart,
        navigationOptions: {
            header: null,
        }
    },
    ShoppingCartDeleteProductConfirm: {
        screen: ShoppingCartDeleteProductConfirm,
        navigationOptions: {
            header: null,
        }
    },
    ShoppingCartDeletedProductList: {
        screen: ShoppingCartDeletedProductList,
        navigationOptions: {
            header: null,
        }
    },
    ShoppingCartDoneProductList: {
        screen: ShoppingCartDoneProductList,
        navigationOptions: {
            header: null,
        }
    },
    ReceiveAward: {
        screen: ReceiveAward,
        navigationOptions: {
            header: null,
        }
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            header: null,
        }
    },
    MyFavourite: {
        screen: MyFavourite,
        navigationOptions: {
            header: null,
        }
    },
    MyFavouriteFood: {
        screen: MyFavouriteFood,
        navigationOptions: {
            header: null,
        }
    },
    MyFavouriteSeminar: {
        screen: MyFavouriteSeminar,
        navigationOptions: {
            header: null,
        }
    },
    MyFavouriteProduct: {
        screen: MyFavouriteProduct,
        navigationOptions: {
            header: null,
        }
    },
    MyStore: {
        screen: MyStore,
        navigationOptions: {
            header: null,
        }
    },
    MyStoreHasBeenRemoved : {
        screen: MyStoreHasBeenRemoved ,
        navigationOptions: {
            header: null,
        }
    },
    PersonalBusinessCard : {
        screen: PersonalBusinessCard ,
        navigationOptions: {
            header: null,
        }
    },
   
});

export default createAppContainer(AppNavigator);
