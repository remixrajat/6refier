let recordedContentPageReducer = function(state =[], action){
    switch(action.type){			
        case 'contentDetails': 
            return Object.assign({}, state, {contentDetails : action.data});

        case 'contentUrlMapping':
            if (state.contentUrls === undefined){
                state = Object.assign({}, state, {contentUrls : {}})
            }
            
            let concat_content_url = Object.assign({}, state.contentUrls, action.data)
            // console.log("recordedContentPageReducer:: ",state.contentUrls, concat_content_url)
            return Object.assign({}, state, {contentUrls : concat_content_url});
        case 'contentAccessMapping':
            return Object.assign({}, state, {contentAccess : action.data});
        case 'contentLikesMapping':
            if (state.contentLikesMapping === undefined){
                state = Object.assign({}, state, {contentLikesMapping : {}})
            }
            
            let concat_content_likes = Object.assign({}, state.contentLikesMapping, action.data)
            // console.log("recordedContentPageReducer:: ",state.contentLikesMapping, concat_content_likes)
            return Object.assign({}, state, {contentLikesMapping : concat_content_likes});
        case 'contentDeleteLikesMapping':
            // if (state.contentLikesMapping === undefined){
            //     state = Object.assign({},state,{contentLikesMapping : {}})
            // }
            
            // let concat_content_like = Object.assign({}, state.contentLikesMapping, action.data)
            // console.log("recordedContentPageReducer:: ",state.contentLikesMapping, concat_content_like)
            // return Object.assign({},state, {contentLikesMapping : concat_content_like});
            return state;
        case "contentStats":
            return Object.assign({}, state, {contentStats : action.data});

        case 'contentDetailsForDashboard': 
            return Object.assign({}, state, {contentDetailsForDashboard : action.data});

        case 'CUSTOM_CONTENT_LIST': 
            return Object.assign({}, state, {customContentDetails : action.data});
            
        default: 
            return state;
    }
}

export default recordedContentPageReducer;
