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
import InviteGroupChat from "./screens/InviteGroupChat";
import CreateChatRoom from "./screens/CreateChatRoom";

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
import StudentDepartmentAssociationAnnouncementDetail from "./screens/StudentDepartmentAssociationAnnouncementDetail";

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

import EventRegistration from "./screens/EventRegistration";
import Questionnaire from "./screens/Questionnaire";
import LimitedTimeGroupPurchase from "./screens/LimitedTimeGroupPurchase";
import FleaMarket from "./screens/FleaMarket";
import OpinionSubmission from "./screens/OpinionSubmission";
import HealthInsurance from "./screens/HealthInsurance";
import OpeningStoreProblems from "./screens/OpeningStoreProblems";
import ActivityInformation from "./screens/ActivityInformation";
import Chatroom from "./screens/Chatroom";
import EventRegistrationDetail from "./screens/EventRegistrationDetail";
import HealthInsuranceDetail from "./screens/HealthInsuranceDetail";
import OpeningStoreProblemsDetail from "./screens/OpeningStoreProblemsDetail";
import ActivityInformationDetail from "./screens/ActivityInformationDetail";
import AnnouncementDetail from "./screens/AnnouncementDetail";
import GroupChat from "./screens/GroupChat";


import Register from "./screens/Register";
import EditBusinessCard from "./screens/EditBusinessCard";
import PublishRecruitment from "./screens/PublishRecruitment";
import PublishRecruitmentHumanSupport from "./screens/PublishRecruitmentHumanSupport";
import ClinicRecruitmentDetail from "./screens/ClinicRecruitmentDetail";
import MapDetail from "./screens/MapDetail";
import GroupSetting from "./screens/GroupSetting";

const AppNavigator = createStackNavigator({
	Index: {
		screen: Index,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
			}
	},
	HightStoreMaps: {
		screen: HightStoreMaps,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	MediumStoreMaps: {
		screen: MediumStoreMaps,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	LowStoreMaps: {
		screen: LowStoreMaps,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	OverviewMap: {
		screen: OverviewMap,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	Food: {
		screen: Food,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	FilterStroe: {
		screen: FilterStroe,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	MainMenu: {
		screen: MainMenu,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	Search: {
		screen: Search,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	Message: {
		screen: Message,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	Profile: {
		screen: Profile,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	Notifycation: {
		screen: Notifycation,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	Announcement: {
		screen: Announcement,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	Schedule: {
		screen: Schedule,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	AcademicEvents: {
		screen: AcademicEvents,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	AcademicEventsDetail: {
		screen: AcademicEventsDetail,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	DentalGroupPurchase: {
		screen: DentalGroupPurchase,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	DentalGroupPurchaseFilter: {
		screen: DentalGroupPurchaseFilter,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	DentalSpecialGroupPurchase: {
		screen: DentalSpecialGroupPurchase,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	ClinicRecruitment: {
		screen: ClinicRecruitment,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	ClinicRecruitmentHumanSupport: {
		screen: ClinicRecruitmentHumanSupport,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	ClinicRecruitmentHumanSupportDetail: {
		screen: ClinicRecruitmentHumanSupportDetail,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	ContactTheClinic: {
		screen: ContactTheClinic,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	Student: {
		screen: Student,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	StudentDepartmentAssociationAnnouncementDetail: {
		screen: StudentDepartmentAssociationAnnouncementDetail,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	HelpAndService: {
		screen: HelpAndService,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	HelpAndServiceAnonymous: {
		screen: HelpAndServiceAnonymous,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	SendMessage: {
		screen: SendMessage,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	MessageCommunication: {
		screen: MessageCommunication,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	DentalProcurement: {
		screen: DentalProcurement,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	DentalProcurementConfirm: {
		screen: DentalProcurementConfirm,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	DentalProcurementSussful: {
		screen: DentalProcurementSussful,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	ShoppingCart: {
		screen: ShoppingCart,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	ShoppingCartDeleteProductConfirm: {
		screen: ShoppingCartDeleteProductConfirm,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	ShoppingCartDeletedProductList: {
		screen: ShoppingCartDeletedProductList,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	ShoppingCartDoneProductList: {
		screen: ShoppingCartDoneProductList,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	ReceiveAward: {
		screen: ReceiveAward,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	EditProfile: {
		screen: EditProfile,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	MyFavourite: {
		screen: MyFavourite,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	MyFavouriteFood: {
		screen: MyFavouriteFood,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	MyFavouriteSeminar: {
		screen: MyFavouriteSeminar,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	MyFavouriteProduct: {
		screen: MyFavouriteProduct,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	MyStore: {
		screen: MyStore,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	MyStoreHasBeenRemoved : {
		screen: MyStoreHasBeenRemoved ,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	PersonalBusinessCard : {
		screen: PersonalBusinessCard ,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
   
	EventRegistration : {
		screen: EventRegistration,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	Questionnaire : {
		screen: Questionnaire,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	LimitedTimeGroupPurchase : {
		screen: LimitedTimeGroupPurchase,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	FleaMarket : {
		screen: FleaMarket,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	OpinionSubmission : {
		screen: OpinionSubmission,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	HealthInsurance : {
		screen: HealthInsurance,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	OpeningStoreProblems : {
		screen: OpeningStoreProblems,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	ActivityInformation : {
		screen: ActivityInformation,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	Chatroom : {
		screen: Chatroom,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	EventRegistrationDetail : {
		screen: EventRegistrationDetail,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	HealthInsuranceDetail : {
		screen: HealthInsuranceDetail,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	OpeningStoreProblemsDetail : {
		screen: OpeningStoreProblemsDetail,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	ActivityInformationDetail : {
		screen: ActivityInformationDetail,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	AnnouncementDetail : {
		screen: AnnouncementDetail,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	Register : {
		screen: Register,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	InviteGroupChat : {
		screen: InviteGroupChat,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	CreateChatRoom : {
		screen: CreateChatRoom,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	GroupChat : {
		screen: GroupChat,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	EditBusinessCard : {
		screen: EditBusinessCard,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	PublishRecruitment : {
		screen: PublishRecruitment,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	PublishRecruitmentHumanSupport : {
		screen: PublishRecruitmentHumanSupport,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	ClinicRecruitmentDetail : {
		screen: ClinicRecruitmentDetail,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	MapDetail : {
		screen: MapDetail,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	GroupSetting : {
		screen: GroupSetting,
		navigationOptions: {
			animationEnabled: false,
			headerShown: false
		}
	},
	
	
});

export default createAppContainer(AppNavigator);
