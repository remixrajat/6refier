let groupDiscussionReducer = function (state = [], action) {
	switch (action.type) {
		case 'getAllRooms':
			return Object.assign({}, state, { getAllRooms: action.data })
		case 'getGroupDetails':
			return Object.assign({}, state, { getGroupDetails: action.data });
		case 'getGroupMembers':
			let userIdMapping = {}
			Object.keys(action.data).forEach((disscussionGroupMemberId)=>{
				action.data[disscussionGroupMemberId].fields.member.member_details = JSON.parse(action.data[disscussionGroupMemberId].fields.member.member_details) 
				userIdMapping[action.data[disscussionGroupMemberId].fields.member.member_details.id] = disscussionGroupMemberId
			});
			return Object.assign({}, state, { getGroupMembers: action.data, userIdMapping:userIdMapping });
		case 'DISCUSSION_ROOM_POSTS':
			return Object.assign({}, state, { discussionGroupPosts: action.data });
		case 'ADD_UPDATE_GROUP_POST':
			let discussionGroupPosts = []
			if(!action.isNewPost) {
				// let tempDiscussionGroupPosts = state.discussionGroupPosts.filter(post => {
				state.discussionGroupPosts.map(post => {
					if(post.pk !== action.data[0].pk) {
						return discussionGroupPosts.push(post)
					} else {
						return discussionGroupPosts.push(action.data[0])
					}
				})
				// discussionGroupPosts = tempDiscussionGroupPosts.concat(action.data)
			} else {
				discussionGroupPosts = state.discussionGroupPosts.concat(action.data)
			}
			return Object.assign({}, state, {discussionGroupPosts: discussionGroupPosts})
		case 'DISCUSSION_ROOM_POST_ANSWERS':
			let discussionGroupPostAnswer = {};
			let answers;
			discussionGroupPostAnswer[action.groupPostId] = action.data;
			answers = discussionGroupPostAnswer;
			return Object.assign({}, state, {discussionGroupPostAnswer: answers});
		case 'DISCUSSION_ROOM_POSTS_STATS_COUNT':
			return Object.assign({},state, {discussionRoomPostsStatsCount: action.data})
		case 'SUBSCRIBED_DISCUSSION_ROOMS':
			return Object.assign({}, state, { subscribedDiscussionRooms: action.data });
		case 'REMOVE_GROUP_POST':
			if (action.postType === 'post') {
				// for(let i=0; i < state.discussionGroupPosts.length; i++){}
				discussionGroupPosts = state.discussionGroupPosts.filter(function(groupPost){
					if(groupPost.pk !== action.postId){
						return groupPost;
					}
				})
				return Object.assign({}, state, { discussionGroupPosts: discussionGroupPosts });
			} else if (action.postType === 'answer') {
				let discussionGroupPostAnswer = {};
				discussionGroupPostAnswer[action.data.postId] = state.discussionGroupPostAnswer[action.data.postId]
																	.filter((answer) => {
					if(answer.pk !== action.postId) {
						return answer;
					}
				})
				return Object.assign({}, state, { discussionGroupPostAnswer: discussionGroupPostAnswer });
			}
		case 'GET_ALL_USER_ROOMS':
			let rooms = state.getAllUserRooms || []
			rooms = rooms.concat(action.data)
			return Object.assign({}, state, { getAllUserRooms: rooms })

		default: return state;
	}
};

export default groupDiscussionReducer;