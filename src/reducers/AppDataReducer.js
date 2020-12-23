let appDataReducer = function (state = [], action) {
    switch (action.type) {
        case 'SET_URL_TEXT':
            return Object.assign({}, state, { URL_TEXT: action.data });
        case 'SET_MEDIA_URL_TEXT':
            return Object.assign({}, state, { MEDIA_URL_TEXT: action.data });
        case 'setCommunityListState':
            return Object.assign({}, state, { communityListState: action.data });
        case 'setCommunityListStateMemberOnly':
            return Object.assign({}, state, { communityListStateMemberOnly: action.data });
        case 'setCommunityListStateMemberOnlyOfUser':
            return Object.assign({}, state, { communityListStateMemberOnlyOfUser: action.data });
        case 'setPostsListState':
            let temp = [];
            if (state.postsList && state.postsList.length < action.data.length && action.isappendresponse) {
                temp = state.postsList;
            }
            temp = temp.concat(action.data);
            //console.log("setPostsListState :: ", temp, action);
            return Object.assign({}, state, { postsList: temp });
        case 'SET_POST_LIST_UPON_FETCH':
            let tempPostList = [];
            if (state.postsList && action.isappendresponse) {
                tempPostList = state.postsList;
            }
            tempPostList = tempPostList.concat(action.data);
            // console.log("setPostsListState :: ", temp, action);
            return Object.assign({}, state, { postsList: tempPostList });
        case 'setNotificationListState':
            if (state.hasOwnProperty('notificationsList') && action.data.hasOwnProperty("notifications")) {
                if (action.data.notifications && action.data.notifications.length === 0) {
                    return state;
                }
                if (state.notificationsList.notifications.length > 0 && state.notificationsList.notifications[0].id >= action.data.notifications[0].id) {
                    return state;
                }
                action.data.notifications = action.data.notifications.concat(state.notificationsList.notifications);
            }
            //console.log("setNotificationListState :: ", action.data.notifications);
            return Object.assign({}, state, { notificationsList: action.data });
        case 'markAllNotificationsState':
            return Object.assign({}, state, { notificationsList: action.data });
        case 'setPostsListStateByUser':
            // console.log("setPostsListStateByUser :: ", action.data);
            return Object.assign({}, state, { postsListByUser: action.data });
        case 'setQuestionsListStateByUser':
            //console.log("setQuestionsListStateByUser :: ", action.data);
            return Object.assign({}, state, { questionsListByUser: action.data });
        case 'setIndividualPostState':
            // console.log("setIndividualPostState :: ", action.data);
            return Object.assign({}, state, { individualQuestionState: action.data });
        case 'setPostsListLikedStateByUser':
            //console.log("setPostsListLikedStateByUser :: ", action.data);
            return Object.assign({}, state, { postsListLikedByUser: action.data });
        case 'setPostsListCommentedStateByUser':
            //console.log("setPostsListCommentedStateByUser :: ", action.data);
            return Object.assign({}, state, { postsListCommentedByUser: action.data });
        case 'setQuestionsAskedFromMentor':
            return Object.assign({}, state, { questionsAskedFromMentor: action.data });
        case 'getTagsList':
            //console.log("setTagsListState :: ", action.data);
            let tagsListStateObject = {};
            for(let tag of action.data) {
                tagsListStateObject[tag.pk] = tag;
            }
            return Object.assign({}, state, { tagsListState: action.data, tagsListStateObject });
        case 'getUserActivityReport':
            return Object.assign({}, state, { userActivityReport: action.data });
        case 'suggestedPosts':
            return Object.assign({}, state, { suggestedPosts: action.data })
        case 'getCourseForDashboard':
            return Object.assign({}, state, { courseForDashboard: action.data })
        case 'recentActivityCommunityOwner':
            return Object.assign({}, state, { recentActivityCommunityOwner: action.data })
        case 'myTransactionHistory':
            return Object.assign({}, state, { myTransactionHistory: action.data })
        case 'getPromotionMaterial':
            return Object.assign({}, state, { getPromotionMaterial: action.data })
        case 'APPLICATION_CONFIG':
            return Object.assign({}, state, {configs : action.data})
        default: return state;
    }
};


export default appDataReducer;
