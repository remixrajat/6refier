
import axios from 'axios';
import {URL_TEXT, getCSRFHeader} from '../../../GlobalConstants'


var notificationURLS = {
    updateNotificationUrl : "api/update/",
    markNotificationUrl :"mark/",
    markAllNotificationUrl : "mark-all/",
    deleteNotificationUrl : "delete/"
}

/*

//functions to handle ajax success.
    var updateSuccess = function (response) {
        var notification_box = $(nfBoxListClassSelector);
        var notifications = response.notifications;
        $.each(notifications, function (i, notification) {
            notification_box.prepend(notification.html);
            });
    };

    var markSuccess = function (response, notification) {
    ////console.log(response);
            if (response.action == 'read') {
                var mkClass = readNotificationClass;
                var rmClass = unreadNotificationClass;
                var action = 'unread';
            } else {
                mkClass = unreadNotificationClass;
                rmClass = readNotificationClass;
                action = 'read';
            }
            // //console.log(notification.closest(nfClassSelector));
            notification.closest(nfSelector).removeClass(rmClass).addClass(mkClass);
            notification.attr('data-mark-action', action);

            toggle_text = notification.attr('data-toggle-text') || 'Mark as ' + action;
            notification.attr('data-toggle-text', notification.html());
            notification.html(toggle_text);
    };

    var markAllSuccess = function (response) {
        ////console.log(response);
        // //console.log(response.action);
        if (response.action == 'read') {
            var mkClass = readNotificationClass;
            var rmClass = unreadNotificationClass;
        } else {
            mkClass = unreadNotificationClass;
            rmClass = readNotificationClass;
        }
        // //console.log(mkClass);
        // //console.log(rmClass);
        $(nfSelector).removeClass(rmClass).addClass(mkClass);
    };

    var deleteSuccess = function (response, notification) {
        ////console.log(response);
        var $selected_notification = notification.closest(nfClassSelector);
        $selected_notification.fadeOut(300, function () {
            $(this).remove()
        });
    };*/



function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Mark a notification as read/unread using AJAX.
export var markNotification = (notification_id, mark_action) =>{
    let mark_post_data = {
            id: notification_id,
            action: mark_action,
            csrfmiddlewaretoken: getCookie('csrftoken')
        };
    let config = getCSRFHeader();
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + notificationURLS.markNotificationUrl, mark_post_data,config)
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
			}).then(function (data) {
				//console.log("******Response from server: ", data);
				dispatch({type : 'markAllNotificationsState' , data : data});
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}


// Mark all notifications as read or unread using AJAX.
export var markAllNotifications= (data_mark_acion) =>{
     var mark_all_post_data = {
            action: data_mark_acion,
            csrfmiddlewaretoken: getCookie('csrftoken')
        };
    let config = getCSRFHeader();    
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + notificationURLS.markAllNotificationUrl, mark_all_post_data, config)
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
			}).then(function (data) {
				//console.log("******Response from server: ", data);
				dispatch({type : 'markAllNotificationsState' , data : data});
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var deleteNotifications = (notification_id) =>{
    let delete_notification_data = {
            id: notification_id,
            csrfmiddlewaretoken: getCookie('csrftoken')
        };
    let config = getCSRFHeader();
    
	return (dispatch, getState) => {
		return axios.post(URL_TEXT + notificationURLS.deleteNotificationUrl, delete_notification_data,config)
			.then(function (response) {
				//console.log("******Response from server:", response);
				return response.data;
			}).then(function (data) {
				//console.log("******Response from server: ", data);
				dispatch({type : 'deleteNotificationState' , data : data});
			})
			.catch(function (error) {
				//console.log(error);
			});
	}
}

export var getAllNotifications = (flag) =>{
    //console.log("NotificationController::getAllNotifications",URL_TEXT + notificationURLS.updateNotificationUrl,flag);
    return (dispatch, getState) => {
        axios.get(URL_TEXT + notificationURLS.updateNotificationUrl, {params:{flag:flag,target:''}})
            .then(function (data) {
                // console.log("NotificationController::getAllNotifications******Respponse from server:", data);
                // dispatch(tasks('name', data));
                return  data.data;
            }).then(function (data) {
                // //console.log("NotificationController::getAllNotifications", data);
                dispatch({type : 'setNotificationListState' , data : data})
            })
            .catch(function (err) {
                //console.log("NotificationController::getAllNotifications :Error occurred while Fetching Notification",err);
            });
    }
}

