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
            headerShown: false
            }
    },
    HightStoreMap: {
        screen: HightStoreMap,
        navigationOptions: {
            headerShown: false
        }
    },
    MediumStoreMaps: {
        screen: MediumStoreMaps,
        navigationOptions: {
            headerShown: false
        }
    },
    LowStoreMaps: {
        screen: LowStoreMaps,
        navigationOptions: {
            headerShown: false
        }
    },
    OverviewMap: {
        screen: OverviewMap,
        navigationOptions: {
            headerShown: false
        }
    },
    Food: {
        screen: Food,
        navigationOptions: {
            headerShown: false
        }
    },
    FilterStroe: {
        screen: FilterStroe,
        navigationOptions: {
            headerShown: false
        }
    },
    MainMenu: {
        screen: MainMenu,
        navigationOptions: {
            headerShown: false
        }
    },
    Search: {
        screen: Search,
        navigationOptions: {
            headerShown: false
        }
    },
    Message: {
        screen: Message,
        navigationOptions: {
            headerShown: false
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            headerShown: false
        }
    },
    Notifycation: {
        screen: Notifycation,
        navigationOptions: {
            headerShown: false
        }
    },
    Announcement: {
        screen: Announcement,
        navigationOptions: {
            headerShown: false
        }
    },
    Schedule: {
        screen: Schedule,
        navigationOptions: {
            headerShown: false
        }
    },
    AcademicEvents: {
        screen: AcademicEvents,
        navigationOptions: {
            headerShown: false
        }
    },
    AcademicEventsDetail: {
        screen: AcademicEventsDetail,
        navigationOptions: {
            headerShown: false
        }
    },
    DentalGroupPurchase: {
        screen: DentalGroupPurchase,
        navigationOptions: {
            headerShown: false
        }
    },
    DentalGroupPurchaseFilter: {
        screen: DentalGroupPurchaseFilter,
        navigationOptions: {
            headerShown: false
        }
    },
    DentalSpecialGroupPurchase: {
        screen: DentalSpecialGroupPurchase,
        navigationOptions: {
            headerShown: false
        }
    },
    ClinicRecruitment: {
        screen: ClinicRecruitment,
        navigationOptions: {
            headerShown: false
        }
    },
    ClinicRecruitmentHumanSupport: {
        screen: ClinicRecruitmentHumanSupport,
        navigationOptions: {
            headerShown: false
        }
    },
    ClinicRecruitmentHumanSupportDetail: {
        screen: ClinicRecruitmentHumanSupportDetail,
        navigationOptions: {
            headerShown: false
        }
    },
    ContactTheClinic: {
        screen: ContactTheClinic,
        navigationOptions: {
            headerShown: false
        }
    },
    Student: {
        screen: Student,
        navigationOptions: {
            headerShown: false
        }
    },
    StudenDepartmentAssociationAnnouncementDetail: {
        screen: StudenDepartmentAssociationAnnouncementDetail,
        navigationOptions: {
            headerShown: false
        }
    },
    HelpAndService: {
        screen: HelpAndService,
        navigationOptions: {
            headerShown: false
        }
    },
    HelpAndServiceAnonymous: {
        screen: HelpAndServiceAnonymous,
        navigationOptions: {
            headerShown: false
        }
    },
    SendMessage: {
        screen: SendMessage,
        navigationOptions: {
            headerShown: false
        }
    },
    MessageCommunication: {
        screen: MessageCommunication,
        navigationOptions: {
            headerShown: false
        }
    },
    DentalProcurement: {
        screen: DentalProcurement,
        navigationOptions: {
            headerShown: false
        }
    },
    DentalProcurementConfirm: {
        screen: DentalProcurementConfirm,
        navigationOptions: {
            headerShown: false
        }
    },
    DentalProcurementSussful: {
        screen: DentalProcurementSussful,
        navigationOptions: {
            headerShown: false
        }
    },
    ShoppingCart: {
        screen: ShoppingCart,
        navigationOptions: {
            headerShown: false
        }
    },
    ShoppingCartDeleteProductConfirm: {
        screen: ShoppingCartDeleteProductConfirm,
        navigationOptions: {
            headerShown: false
        }
    },
    ShoppingCartDeletedProductList: {
        screen: ShoppingCartDeletedProductList,
        navigationOptions: {
            headerShown: false
        }
    },
    ShoppingCartDoneProductList: {
        screen: ShoppingCartDoneProductList,
        navigationOptions: {
            headerShown: false
        }
    },
    ReceiveAward: {
        screen: ReceiveAward,
        navigationOptions: {
            headerShown: false
        }
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            headerShown: false
        }
    },
    MyFavourite: {
        screen: MyFavourite,
        navigationOptions: {
            headerShown: false
        }
    },
    MyFavouriteFood: {
        screen: MyFavouriteFood,
        navigationOptions: {
            headerShown: false
        }
    },
    MyFavouriteSeminar: {
        screen: MyFavouriteSeminar,
        navigationOptions: {
            headerShown: false
        }
    },
    MyFavouriteProduct: {
        screen: MyFavouriteProduct,
        navigationOptions: {
            headerShown: false
        }
    },
    MyStore: {
        screen: MyStore,
        navigationOptions: {
            headerShown: false
        }
    },
    MyStoreHasBeenRemoved : {
        screen: MyStoreHasBeenRemoved ,
        navigationOptions: {
            headerShown: false
        }
    },
    PersonalBusinessCard : {
        screen: PersonalBusinessCard ,
        navigationOptions: {
            headerShown: false
        }
    },
   
});

export default createAppContainer(AppNavigator);
