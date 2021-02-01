import React from "react";
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Index from "./screens/index";
import HightStoreMaps from "./screens/HightStoreMaps";
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
			animationEnabled: true,
			headerShown: false
			}
	},
	HightStoreMaps: {
		screen: HightStoreMaps,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	MediumStoreMaps: {
		screen: MediumStoreMaps,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	LowStoreMaps: {
		screen: LowStoreMaps,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	OverviewMap: {
		screen: OverviewMap,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	Food: {
		screen: Food,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	FilterStroe: {
		screen: FilterStroe,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	MainMenu: {
		screen: MainMenu,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	Search: {
		screen: Search,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	Message: {
		screen: Message,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	Profile: {
		screen: Profile,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	Notifycation: {
		screen: Notifycation,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	Announcement: {
		screen: Announcement,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	Schedule: {
		screen: Schedule,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	AcademicEvents: {
		screen: AcademicEvents,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	AcademicEventsDetail: {
		screen: AcademicEventsDetail,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	DentalGroupPurchase: {
		screen: DentalGroupPurchase,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	DentalGroupPurchaseFilter: {
		screen: DentalGroupPurchaseFilter,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	DentalSpecialGroupPurchase: {
		screen: DentalSpecialGroupPurchase,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	ClinicRecruitment: {
		screen: ClinicRecruitment,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	ClinicRecruitmentHumanSupport: {
		screen: ClinicRecruitmentHumanSupport,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	ClinicRecruitmentHumanSupportDetail: {
		screen: ClinicRecruitmentHumanSupportDetail,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	ContactTheClinic: {
		screen: ContactTheClinic,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	Student: {
		screen: Student,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	StudenDepartmentAssociationAnnouncementDetail: {
		screen: StudenDepartmentAssociationAnnouncementDetail,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	HelpAndService: {
		screen: HelpAndService,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	HelpAndServiceAnonymous: {
		screen: HelpAndServiceAnonymous,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	SendMessage: {
		screen: SendMessage,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	MessageCommunication: {
		screen: MessageCommunication,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	DentalProcurement: {
		screen: DentalProcurement,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	DentalProcurementConfirm: {
		screen: DentalProcurementConfirm,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	DentalProcurementSussful: {
		screen: DentalProcurementSussful,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	ShoppingCart: {
		screen: ShoppingCart,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	ShoppingCartDeleteProductConfirm: {
		screen: ShoppingCartDeleteProductConfirm,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	ShoppingCartDeletedProductList: {
		screen: ShoppingCartDeletedProductList,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	ShoppingCartDoneProductList: {
		screen: ShoppingCartDoneProductList,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	ReceiveAward: {
		screen: ReceiveAward,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	EditProfile: {
		screen: EditProfile,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	MyFavourite: {
		screen: MyFavourite,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	MyFavouriteFood: {
		screen: MyFavouriteFood,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	MyFavouriteSeminar: {
		screen: MyFavouriteSeminar,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	MyFavouriteProduct: {
		screen: MyFavouriteProduct,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	MyStore: {
		screen: MyStore,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	MyStoreHasBeenRemoved : {
		screen: MyStoreHasBeenRemoved ,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
	PersonalBusinessCard : {
		screen: PersonalBusinessCard ,
		navigationOptions: {
			animationEnabled: true,
			headerShown: false
		}
	},
   
});

export default createAppContainer(AppNavigator);
