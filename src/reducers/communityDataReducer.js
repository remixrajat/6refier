let communityPageDataReducer = function (state = [], action) {
	switch (action.type) {
		case 'loadinitially':
			return Object.assign({}, state, action.data);

		case 'changeNavState':
			return Object.assign({}, state, action.data);
			
		case 'setCommunityBasicDetails':
			return Object.assign({}, state, { communityBasicDataState: action.data })
			
		case 'setCommunityMembersDetails':
			return Object.assign({}, state, { [action.data.property]: action.data.value });
			
		case 'setInternalCounsellorDetails':
			return Object.assign({}, state, { InternalCounsellorDataState: action.data })
			
		case 'setStudentDetails':
			return Object.assign({}, state, { communityStudentDataState: action.data })
			
		case 'setTeacherDetails':
			return Object.assign({}, state, { communityTeacherDataState: action.data })
			
		case 'setExternalMentorDetails':
			return Object.assign({}, state, { communityExtMentorDataState: action.data })
			
		case 'setClassDetails':
			return Object.assign({}, state, { communityClassDataState: action.data })
			
		case 'setSubjectDetails':
			return Object.assign({}, state, { communitySubjectDataState: action.data })
			
		case 'setInstituteTreeState':
			return Object.assign({}, state, { instituteTreeState: action.data })
			
		case 'setAutoSuggestStates':
			return Object.assign({}, state, { [action.data.propName]: action.data.value })
			
		case 'setPendingRequestState':
			return Object.assign({}, state, { pendingRequestState: action.data })
			
		case 'getCommunitySubscriptions':
			return Object.assign({}, state, { communitySubscriptionsState: action.data })
			
		case 'getCommunityAllSubscriptions':
			return Object.assign({}, state, { communityAllSubscriptionsState: action.data })
			
		case 'getCommunityActivityReports':
			return Object.assign({}, state, { communityAcitivityReports: action.data })
			
		case 'getCommunityMentorsOwners':
			return Object.assign({}, state, { communityMentorsOwners: action.data })
			
		case 'getCourseActivityReports':
			return Object.assign({}, state, { courseAcitivityReports: action.data })
			
		case 'getMyCommunityLearningPathAndReport':
			return Object.assign({}, state, { myCommunityLearningPathAndReport: action.data })
			
		case 'getMyCommunityPackageAndReport':
			return Object.assign({}, state, { myCommunityPackageAndReport: action.data })
			
		case 'getCommunityCourseTracker':
			return Object.assign({}, state, { communityCourseTracker: action.data });
		
		case 'getCommunitySkills':
			return Object.assign({}, state, { getCommunitySkills: action.data });

		case 'getCommunitySkillsDetails':
			return Object.assign({}, state, { getCommunitySkillsDetails: action.data });
		
		case 'communityPackagesMarketPlace':
			return Object.assign({}, state, { communityPackagesMarketPlace: action.data });
		
		case 'getAllSkillAndTag':
			return Object.assign({}, state, { getAllSkillAndTag: action.data });
		
		case 'fetchReportsForSkill':
			return Object.assign({}, state, { fetchReportsForSkill: action.data });

		case 'getPackageAssessmentSkill':
			if(action.add === 'add') {
				let getPackageAssessmentSkill = Object.assign({}, state.getPackageAssessmentSkill)
				
				Object.keys(action.data).forEach(function (key, i) {
					getPackageAssessmentSkill[key] = action.data[key]
				})

				return Object.assign({}, state, { getPackageAssessmentSkill: getPackageAssessmentSkill });
			}
			return Object.assign({}, state, { getPackageAssessmentSkill: action.data });
		
		case 'companySkillToSubEntity':
			
			if(action.add === 'add') {
				let companySkillToSubEntity = Object.assign({}, state.companySkillToSubEntity)
				
				Object.keys(action.data).forEach(function (key, i) {
					companySkillToSubEntity[key] = action.data[key]
				})

				return Object.assign({}, state, { companySkillToSubEntity: companySkillToSubEntity });
			}
			return Object.assign({}, state, { companySkillToSubEntity: action.data });

		
		case 'getUserEntitySkills':
			return Object.assign({}, state, { getUserEntitySkills: action.data });
		
		
			
		

		default: return state; 
	}
};


export default communityPageDataReducer;