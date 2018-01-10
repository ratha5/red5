// Regal namespace
var REGAL = REGAL || {};

//easynamespace?
var REGAL = (function () {
    //define private vars here

    return {
        Broadcaster: new ko.subscribable(),
        BroadcastedEvents: {        
            // Event Name:  ReloadAllDinners
            // Purpose:     Notify all listeners that the Dinners list for a given user 
            //              need to be reloaded.
            // Parameters:  None            
            ReloadAllDinners: 'ReloadAllDinners',      
            // Event Name:  ReloadFilteredDinners
            // Purpose:     Notify all listeners that the Dinners list for a given user
            //              need to be reloaded and filtered using the given parameters.
            // Parameters:  Object containing filtering parameters            
            ReloadFilteredDinners: 'ReloadFilteredDinners',
            // Event Name:  DinnerPartyStatusChanged
            // Purpose:     Notify all listeners that the Party Status of a Dinner has changed.
            // Parameters:  None
            DinnerPartyStatusChanged: 'DinnerPartyStatusChanged',
            // Event Name:  DinnerPartyRescheduled
            // Purpose:     Notify all listeners that a Party has been rescheduled.
            // Parameters:  var partyData = { PartyId: <Rescheduled PartyId>, BusinessUnitId: <Party BusinessUnitId> }
            DinnerPartyRescheduled: 'DinnerPartyRescheduled',
            // Event Name:  BackOfficeTimePeriodChanged
            // Purpose:     Notify all listeners that the BackOffice time period has changed.
            // Parameters:  var eventData = { TimePeriod: 'month' | 'week'}
            BackOfficeTimePeriodChanged: 'BackOfficeTimePeriodChanged',
            // Event Name:  ReloadAllRsvpList
            // Purpose:     Notify all listeners that the Rsvp list for a given user 
            //              need to be reloaded.
            // Parameters:  None            
            ReloadAllRsvpList: 'ReloadAllRsvpList',
            // Event Name:  ReloadAccountOverview
            // Purpose:     Notify all listeners that the Account Overview for a given user 
            //              needs to be reloaded.
            // Parameters:  None            
            ReloadAccountOverview: 'ReloadAccountOverview',
            // Event Name:  NewLeadAdded
            // Purpose:     Notify all listeners that a new Lead has been added.
            // Parameters:  None            
            NewLeadAdded: 'NewLeadAdded',
            // Event Name:  NewUserAdded
            // Purpose:     Notify all listeners that a new User has been added.
            // Parameters:  None            
            NewUserAdded: 'NewUserAdded',
            // Event Name:  ReloadAccountAddressBook
            // Purpose:     Notify all listeners that the Account AddressBook for a given user 
            //              needs to be reloaded.
            // Parameters:  None            
            ReloadAccountAddressBook: 'ReloadAccountAddressBook',
            // Event Name:  ReloadAccountBusinessInfo
            // Purpose:     Notify all listeners that the Account Business Info for a given user 
            //              needs to be reloaded.
            // Parameters:  None            
            ReloadAccountBusinessInfo: 'ReloadAccountBusinessInfo',
            // Event Name:  DinnerPartyStatusChanged
            // Purpose:     Notify all listeners that the Party Status of a Dinner has changed and needs to be refreshed using the passed value.
            // Parameters:  PartyStatusId
            RefreshDinnerPartyStatus: 'RefreshDinnerPartyStatus'
        },
        TimePeriods: {
            Monthly: "month",
            Weekly: "week",
            LastWeek: "lastweek",
            Daily: "today"
        },
        PhoneNumberTypeModel: function (phoneNumberTypeObject) {
            var self = this;
            self.Code = phoneNumberTypeObject.Code;
            self.Description = phoneNumberTypeObject.Description;
            self.Id = phoneNumberTypeObject.PhoneNumberTypeId;
            self.PhoneNumberTypeId = phoneNumberTypeObject.PhoneNumberTypeId;
        },
        InvokeServiceGet: function InvokeServiceGet(url, moduleHeaders, onSuccess, onError) {
            jQuery.ajax({
                type: "GET",
                url: url,
                beforeSend: moduleHeaders,
                success: function (data) {
                    if (onSuccess != null) {
                        //do work on private var wrapped inside the closure here.
                        onSuccess(data);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (onError != null) {
                        //or here.
                        onError(xhr, ajaxOptions, thrownError);
                    }
                }
            });
        },
        InvokeService: function InvokeService(url, moduleHeaders, postData, onSuccess, onError) {
            //or here
            REGAL.InvokeServicePost(url, moduleHeaders, postData, onSuccess, onError);
        },
        InvokeServicePost: function InvokeServicePost(url, moduleHeaders, postData, onSuccess, onError) {
            jQuery.ajax({
                type: "POST",
                url: url,
                data: postData,
                beforeSend: moduleHeaders,
                success: function (data) {
                    if (onSuccess != null) {
                        onSuccess(data);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (onError != null) {
                        onError(xhr, ajaxOptions, thrownError);
                    }
                }
            });
        },        
        InvokeServicePostSynch: function InvokeServicePost(url, moduleHeaders, postData, onSuccess, onError) {
            jQuery.ajax({
                type: "POST",
                url: url,
                data: postData,
                beforeSend: moduleHeaders,
                success: function (data) {
                    if (onSuccess != null) {
                        onSuccess(data);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (onError != null) {
                        onError(xhr, ajaxOptions, thrownError);
                    }
                },
                async: false
            });
        },
        InvokeServicePostEx: function InvokeServicePost(url, moduleHeaders, contentType, postData, onSuccess, onError) {
            jQuery.ajax({
                type: "POST",
                url: url,
                data: postData,
                beforeSend: moduleHeaders,
                contentType: contentType,
                success: function (data) {
                    if (onSuccess != null) {
                        onSuccess(data);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (onError != null) {
                        onError(xhr, ajaxOptions, thrownError);
                    }
                }
            });
        },
        Assert: function assert(value, desc) {
            var resultsList = document.getElementById("assertResults");
            if (!resultsList) {
                resultsList = document.createElement('ul');
                document.getElementsByTagName('body')[0].appendChild(resultsList);
                resultsList.setAttribute('id', 'assertResults');
            }
            var li = document.createElement("li");
            li.className = value ? "pass" : "fail";
            li.appendChild(document.createTextNode(desc));
            resultsList.appendChild(li);
        },
        GetQueryVariable: function (variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
            }
            return(false);
        },
        Secure: (function () {
            return {
                InvokeServicePost: function InvokeServicePost(url, headers, moduleHeaders, postData, onSuccess, onError) {
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        data: postData,
                        headers: headers,
                        beforeSend: moduleHeaders,
                        success: function (data) {
                            if (onSuccess != null) {
                                onSuccess(data);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            if (onError != null) {
                                onError(xhr, ajaxOptions, thrownError);
                            }
                        }
                    });
                },   
                InvokeServicePostSynch: function InvokeServicePost(url, headers, moduleHeaders, postData, onSuccess, onError) {
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        data: postData,
                        headers: headers,
                        beforeSend: moduleHeaders,
                        success: function (data) {
                            if (onSuccess != null) {
                                onSuccess(data);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            if (onError != null) {
                                onError(xhr, ajaxOptions, thrownError);
                            }
                        },
                        async: false
                    });
                },
                InvokeServicePostEx: function InvokeServicePost(url, headers, moduleHeaders, contentType, postData, onSuccess, onError) {
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        data: postData,
                        headers: headers,
                        beforeSend: moduleHeaders,
                        contentType: contentType,
                        success: function (data) {
                            if (onSuccess != null) {
                                onSuccess(data);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            if (onError != null) {
                                onError(xhr, ajaxOptions, thrownError);
                            }
                        }
                    });
                }
            }
        })(),
        Settings: (function () {
            var SettingsForm;
            return {
                ShowSettings: function (form) {
                    REGAL.Settings.SettingsForm = form;
                    REGAL.Settings.SettingsForm.find('.Setting').hide();
                    var dropDown = REGAL.Settings.SettingsForm.find('.ControlsToLoadDropDown');
                    var selectedIndex = dropDown.prop('selectedIndex');
                    if (selectedIndex > 0) {
                        var selectedText = dropDown.find('option:selected').text();
                        REGAL.Settings.SettingsForm.find('.Setting.' + selectedText).show();
                    }
                },
                ShowSettingsForControlSelected: function (control) {
                    REGAL.Settings.SettingsForm.find('.Setting').hide();
                    var selectedText = $(control).find('option:selected').text();
                    REGAL.Settings.SettingsForm.find('.Setting.' + selectedText).show();
                },
                HandleShowAllSettings: function(control) {
                    REGAL.Settings.SettingsForm.find('.Setting').hide();
                    var checkBox = $(control);
                    var isChecked = checkBox.prop('checked');
                    if (isChecked) {
                        REGAL.Settings.SettingsForm.find('.Setting').show();
                    } else {
                        REGAL.Settings.ShowSettings(REGAL.Settings.SettingsForm);
                    }
                }
            }
        })(),
        NestedNameSpace: (function () {
        //nestednamespace private vars here
        return {
            coolFunction: function (data) {
                //do work on private vars here
                //should also have access to parent's private vars here too
            }
        }
        })()
};
})();


