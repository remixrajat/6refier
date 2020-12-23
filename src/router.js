import Feeds from './communitypage/presentationalcomponents/Feeds/Feeds';
import Questions from './communitypage/presentationalcomponents/Questions/Questions';
import Updates from './communitypage/presentationalcomponents/Updates/Updates';
import CommunityProfile from './communitypage/presentationalcomponents/CommunityProfile/CommunityProfile';
import MentorHomePage from './dashboardpage/presentationalcomponents/MentorHomePage';

const routes = [
	{
		path:'/feeds',
		component:MentorHomePage
	},
	{
		path:'/questions',
		component:MentorHomePage
	},
	{
		path:'/updates',
		component:MentorHomePage
	},
	{
		path:'/community-profile',
		component:MentorHomePage
	}
];

export default routes;