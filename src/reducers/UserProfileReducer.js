function formatGoals(usergoals){
	if(usergoals.length <1 || usergoals === undefined || usergoals === null){
		//console.log("formatGoals::if",usergoals);
		let goals = [];
		let temp ={};
		temp.value = "";
		temp.label = "Goal";
        temp.isShow = true;
        temp.key = "goals";
		goals.push(temp);
		temp ={};
		temp.value = "";
		temp.label = "Status";
        temp.isShow = false;
        temp.key = "status"
		goals.push(temp);
		usergoals.push({formdata : goals,is_dummy:true});
		return usergoals;
    }else{
		//console.log("formatGoals::else",usergoals)
	}
    
	for (let i=0; i<usergoals.length;i++){
		let goals = [];
		let temp ={};
		temp.value = usergoals[i].fields["goals"];
		temp.label = "Goal";
        temp.isShow = true;
        temp.key = "goals";
		goals.push(temp);
		temp ={};
		temp.value = usergoals[i].fields["status"];
		temp.label = "Status";
        temp.isShow = false;
        temp.key = "status"
		goals.push(temp);
		usergoals[i].formdata = goals;
	}
	//console.log("formatGoals::calling over",usergoals );
	return usergoals;
}

function formatSkills(userSkill,isHaveSkill){
	if( userSkill === undefined || userSkill === null ||userSkill.length === 0 ){
		let skills = [];
		let temp ={};
		temp.value = "";
		temp.label = "Skill";
        temp.isShow = true;
        temp.key = "skills";
		skills.push(temp);
		temp ={};
		temp.value = "";
		temp.label = "Profiency Level(Out of 100%)";
        temp.isShow = false;
        temp.key = "profiency_level";
		skills.push(temp);
		if (!isHaveSkill){
			temp ={};
			temp.value = false;
			temp.isCheckbox = true;
			temp.label = "Do I have this skill?";
			temp.isShow = true;
			temp.key = "is_have_skill";
			skills.push(temp);
		}
		
		userSkill.push({formdata : skills,is_dummy:true});
		return userSkill;

	}
	
	for(let i=0; i< userSkill.length; i++){
		//console.log("userSkill[i]", isHaveSkill,userSkill[i]);
		let isShow= true;
		if(isHaveSkill){
			//console.log("userSkill[i]", isHaveSkill , userSkill[i].fields["is_have_skill"]);
			if(!userSkill[i].fields["is_have_skill"]){
				isShow = false;
			}
		}else{
			//console.log("userSkill[i]", isHaveSkill , userSkill[i].fields["is_have_skill"]);
			if(userSkill[i].fields["is_have_skill"]){
				isShow = false;
			}
		}
		//console.log("userSkill[i]", isShow);
		let skills = [];
		let temp ={};
		temp.value = userSkill[i].fields["skills"];
		temp.label = "Skill";
        temp.isShow = isShow;
        temp.key = "skills";
		skills.push(temp);
		temp ={};
		temp.value = userSkill[i].fields["profiency_level"];
		temp.label = "Profiency Level(Out of 100%)";
        temp.isShow = false
        temp.key = "profiency_level";
		skills.push(temp);
		if (!isHaveSkill){
			temp ={};
			temp.value =  userSkill[i].fields["is_have_skill"]
			temp.isCheckbox = true;
			temp.label = "Do you have above skill?";
			temp.isShow = isShow;
			temp.key = "is_have_skill";
			skills.push(temp);
		}
		userSkill[i].formdata = skills;
	}
	//console.log("formatGoals::calling over",userSkill );
	return userSkill;
}

function formatAchievments(userAchievments){

	if( userAchievments.length <1 || userAchievments === undefined || userAchievments === null ){
		//console.log("formatGoals::if",userAchievments)
		let achievment = [];
		let temp ={};
		temp.value = "";
		temp.label = "Achievment";
        temp.isShow = true;
        temp.key = "achievments";
		achievment.push(temp);
		temp ={};
		temp.value = "";
		temp.label = "Description";
		temp.isShow = false;
        achievment.push(temp);
		temp.key = "comments";
		userAchievments.push({formdata : achievment,is_dummy:true})
		//console.log("formatGoals::starting",achievment,userAchievments);
		return userAchievments;
	}

	for(let i=0; i< userAchievments.length; i++){
		let achievment = [];
		let temp ={};
		temp.value = userAchievments[i].fields["achievments"];
		temp.label = "Achievment";
        temp.isShow = true;
        temp.key = "achievments";
		achievment.push(temp);
		temp ={};
		temp.value = userAchievments[i].fields["comments"];
		temp.label = "Description";
		temp.isShow = false;
        achievment.push(temp);
        temp.key = "comments";
		userAchievments[i].formdata = achievment;
	}
	//console.log("formatGoals::calling over",userAchievments );
	return userAchievments;
}

function formatCertificates(userCerti){
	if(userCerti.length === 0 ||userCerti === undefined || userCerti === null){
		let certi = [];
		let temp ={};
		temp.value = "";
		temp.label = "Certificate Awarded";
        temp.isShow = true;
        temp.key = "certificatesTitle";
		certi.push(temp);
		temp ={};
		temp.value = "";
		temp.label = "Description";
        temp.isShow = false;
        temp.key = "certificatesComment";
		certi.push(temp);
		temp ={};
		temp.value ="";
		temp.label = "Certificate";
		temp.isShow = false;
        temp.isImage = false;
        temp.key = "certificate_picture";
		certi.push(temp);
		userCerti.push({formdata : certi,is_dummy:true});
		return userCerti;
	}
	for(let i=0; i< userCerti.length; i++){
		let certi = [];
		let temp ={};
		temp.value = userCerti[i].fields["certificatesTitle"];
		temp.label = "Certificate Awarded";
        temp.isShow = true;
        temp.key = "certificatesTitle";
		certi.push(temp);
		temp ={};
		temp.value = userCerti[i].fields["certificatesComment"];
		temp.label = "Description";
        temp.isShow = false;
        temp.key = "certificatesComment";
		certi.push(temp);
		temp ={};
		temp.value = userCerti[i].fields["certificate_picture"];
		temp.label = "Certificate";
		temp.isShow = false;
        temp.isImage = false;
        temp.key = "certificate_picture";
		certi.push(temp);
		userCerti[i].formdata = certi;
	}
	//console.log("formatGoals::calling over",userCerti );
	return userCerti;
}

function formatEducation(userEducations){
	if(userEducations.length === 0|| userEducations === undefined || userEducations === null){
		let edu = [];
		let temp ={};
		temp.value = "";
		temp.label = "Institute ";
		temp.isShow = true;
		temp.isAutosuggestInstitute = true;
        temp.key = "institute";
		edu.push(temp);
		temp ={};
		temp.value = "";
		temp.label = "Class-Section";
		temp.isShow = true;
		temp.isAutosuggestSubEntity = true;
        temp.key = "courses";
		edu.push(temp);
		temp ={};
		temp.value = "";
		temp.label = "Start Day : ";
        temp.isShow = true;
        temp.isDate = true;
        temp.key = "start_date";
		edu.push(temp);
		temp ={};
		temp.value = "";
		temp.label = "End Day : ";
        temp.isShow = true;
        temp.isDate = true;
        temp.key = "end_date";
		edu.push(temp);
		temp ={};
		temp.value = "";
		temp.label = "Is Currently Studying :     ";
		temp.isShow = true;
		temp.isCheckbox = true;
        temp.key = "is_currently_studying";
		edu.push(temp);
		userEducations.push({formdata : edu ,is_dummy:true});
		return userEducations;
	}
	for(let i=0; i< userEducations.length; i++){
		let edu = [];
		let temp ={};
		temp.value = userEducations[i].fields["institute"];
		temp.label = "Institute ";
		temp.isShow = true;
		temp.isAutosuggestInstitute = true;
        temp.key = "institute";
		edu.push(temp);
		temp ={};
		temp.value = userEducations[i].fields["courses"];
		temp.label = "Class-Section";
		temp.isShow = true;
		temp.isAutosuggestSubEntity = true;
        temp.key = "courses";
		edu.push(temp);
		temp ={};
		temp.value = userEducations[i].fields["start_date"];
		temp.label = "Start Day : ";
        temp.isShow = true;
        temp.isDate = true;
        temp.key = "start_date";
		edu.push(temp);
		temp ={};
		temp.value = userEducations[i].fields["end_date"];
		temp.label = "End Day : ";
        temp.isShow = true;
        temp.isDate = true;
        temp.key = "end_date";
		edu.push(temp);
		temp ={};
		temp.value = userEducations[i].fields["is_currently_studying"];
		temp.label = "Is Currently Studying :     ";
		temp.isShow = true;
		temp.isCheckbox = true;
        temp.key = "is_currently_studying";
		edu.push(temp);
		userEducations[i].formdata = edu;
	}
	//console.log("formatGoals::calling over",userEducations );
	return userEducations;

}


function formatProfessional(userProffesionalDetails){
	if(userProffesionalDetails.length === 0||userProffesionalDetails === undefined || userProffesionalDetails === null){
		let prof = [];
		let temp ={};
		temp.value = "";
		temp.label = "Organisation";
		temp.isShow = true;
		temp.key = "organisation";
		prof.push(temp);
		temp ={};
		temp.value = "";
		temp.label = "Joining Date: ";
        temp.isShow = true;
		temp.isDate = true;
		temp.key = "start_date";
		prof.push(temp);
		temp ={};
		temp.value = "";
		temp.label = "Leaving Date : ";
        temp.isShow = true;
		temp.isDate = true;
		temp.key = "end_date";
		prof.push(temp);
		temp ={};
		temp.value = "";
		temp.label = "Is it Current Company ?   :    ";
		temp.isShow = true;
		temp.isCheckbox = true;
		temp.key = "is_currently_working";
		prof.push(temp);
		userProffesionalDetails.push({formdata : prof,is_dummy:true});
		return userProffesionalDetails;
	}
	for(let i=0; i< userProffesionalDetails.length; i++){
		let prof = [];
		let temp ={};
		temp.value = userProffesionalDetails[i].fields["organisation"];
		temp.label = "Organisation";
		temp.isShow = true;
		temp.key = "organisation";
		prof.push(temp);
		temp ={};
		temp.value = userProffesionalDetails[i].fields["start_time"];
		temp.label = "Joining Date: ";
        temp.isShow = true;
		temp.isDate = true;
		temp.key = "start_date";
		prof.push(temp);
		temp ={};
		temp.value = userProffesionalDetails[i].fields["end_time"];
		temp.label = "Leaving Date : ";
        temp.isShow = true;
		temp.isDate = true;
		temp.key = "end_date";
		prof.push(temp);
		temp ={};
		temp.value = userProffesionalDetails[i].fields["is_currently_working"];
		temp.label = "Is it Current Company ?   :    ";
		temp.isShow = true;
		temp.isCheckbox = true;
		temp.key = "is_currently_working";
		prof.push(temp);
		userProffesionalDetails[i].formdata = prof;

	}
	//console.log("formatGoals::calling over",userProffesionalDetails );
	return userProffesionalDetails;

}

function formatHobbies(userHobbies){
    if(userHobbies.length === 0|| userHobbies === undefined || userHobbies === null ){
		let prof = [];
		let temp ={};
		temp.value = "";
		temp.label = "Interest : ";
        temp.isShow = true;
        temp.key = "hobbies";
		prof.push(temp);
		temp ={};
		temp.value = "";
		temp.label = "Description : ";
        temp.isShow = false;
        temp.key = "comments";
		prof.push(temp);
		userHobbies.push({formdata : prof,is_dummy:true});
		return userHobbies;
	}
	for(let i=0; i< userHobbies.length; i++){
		let prof = [];
		let temp ={};
		temp.value = userHobbies[i].fields["hobbies"];
		temp.label = "Interest : ";
        temp.isShow = true;
        temp.key = "hobbies";
		prof.push(temp);
		temp ={};
		temp.value = userHobbies[i].fields["comments"];
		temp.label = "Description : ";
        temp.isShow = false;
        temp.key = "comments";
		prof.push(temp);
		userHobbies[i].formdata = prof;

	}
	//console.log("formatGoals::calling over",userHobbies );
	return userHobbies;
}



let userProfileReducer = (state=[], action) => {
	// console.log("userProfileReducer",action)
switch(action.type){
	case 'SET_USER_STATE':
		let profileFieldsTemp  = JSON.parse(action.data.profile);
		// console.log("IntroForm :: profilefields are1 : ", action.data);
		//console.log("profilefields are : ", profileFieldsTemp);
		if(profileFieldsTemp.length > 0 ){
		let profileFields = profileFieldsTemp[0].fields;
		profileFields.pk=profileFieldsTemp[0].pk;
        let userId = JSON.parse(action.data.profile)[0].pk;
        let goalData = JSON.parse(action.data.goals);
        let professionalData = JSON.parse(action.data.professional);
        let achievmentsData = JSON.parse(action.data.achievments);
		let skillsData = JSON.parse(action.data.skills);
		let skillIWantData = JSON.parse(action.data.skillsIWant); //Object.assign([], skillsData);
        let certificatesData = JSON.parse(action.data.certificates);
        let educationData = JSON.parse(action.data.education);
		let hobbiesData = JSON.parse(action.data.hobbies);
		let credits = JSON.parse(action.data.credits);
		let userProfileTags = action.data.userProfileTags;
		
        if(action.data.profile && profileFields){
            return Object.assign({},state,{
                                            userId : userId,
                                            userProfileData : action.data,
                                            profileFields : profileFields,
                                            goals : formatGoals(goalData),
                                            professional : formatProfessional(professionalData),
                                            achievments : formatAchievments(achievmentsData),
                                            skills : formatSkills(skillsData,true),
                                            skillsIWant : formatSkills(skillIWantData,false),
                                            certificates : formatCertificates(certificatesData),
                                            education : formatEducation(educationData),
											hobbies : formatHobbies(hobbiesData),
											credits: credits,
											userProfileTags: userProfileTags
			});
		}
        }
        else{
            return state;
        }

    case 'setReadOnlyUserState':
        let profileFieldsRO = JSON.parse(action.data.profile)[0].fields;
        let goalDataRO = JSON.parse(action.data.goals);
        let professionalDataRO = JSON.parse(action.data.professional);
        let achievmentsDataRO = JSON.parse(action.data.achievments);
		let skillsDataRO = JSON.parse(action.data.skills);
		let skillIWantDataRO = JSON.parse(action.data.skillsIWant);//Object.assign([], skillsDataRO);
        let certificatesDataRO = JSON.parse(action.data.certificates);
        let educationDataRO = JSON.parse(action.data.education);
		let hobbiesDataRO = JSON.parse(action.data.hobbies)
		let userProfileTagsRO = action.data.userProfileTags;
		let userTypesRO = action.data.userTypes

        if(action.data.profile && profileFieldsRO){
            return Object.assign({},state,{
                                            userProfileDataRO : action.data,
                                            profileFieldsRO : profileFieldsRO,
                                            goalsRO : formatGoals(goalDataRO),
                                            professionalRO : formatProfessional(professionalDataRO),
                                            achievmentsRO : formatAchievments(achievmentsDataRO),
                                            skillsRO : formatSkills(skillsDataRO,true),
                                            skillsIWantRO : formatSkills(skillIWantDataRO,false),
                                            certificatesRO : formatCertificates(certificatesDataRO),
                                            educationRO : formatEducation(educationDataRO),
											hobbiesRO : formatHobbies(hobbiesDataRO),
											userProfileTags: userProfileTagsRO,
											userTypes: userTypesRO
											
        });
        }
        else{
            return state;
        }

    case 'setProfileData':
        // console.log("setProfileData",action, action.data.userProfileTags);
        switch(action.section){
            case "goals":
                return Object.assign({},state,{goals : formatGoals(action.data)});
            case "professional":
                return Object.assign({},state,{professional : formatProfessional(action.data)})
            case "achievments":
                return Object.assign({},state,{achievments : formatAchievments(action.data) })
            case "skills":
				return Object.assign({},state,{skills : formatSkills(action.data, true)})
			case "skillsIWant":
                return Object.assign({},state,{skillsIWant : formatSkills(action.data, false)})
            case "certificates":
                return Object.assign({},state,{certificates : formatCertificates(action.data)})
            case "education":
                return Object.assign({},state,{education : formatEducation(action.data)})
            case "hobbies":
                state = Object.assign({},state,{hobbies : formatHobbies( action.data)});
				state= Object.assign({},state,{userProfileTags : action.data.userProfileTags.userProfileTags});
				return state;
			case "profile":
				action.data[0].fields.pk = action.data[0].pk
				return Object.assign({},state,{profileFields : action.data[0].fields});
            default:
                return state;    
        }
        // return Object.assign({},state,{profileFields : JSON.parse(action.data)[0].fields})
		case 'isNewUserExplainComplete':
			return Object.assign({}, state, {isNewUserExplainComplete: action.data})
    default: return state;
}
}

export default userProfileReducer;
    	