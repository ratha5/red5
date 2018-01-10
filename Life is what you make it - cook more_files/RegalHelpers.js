// Regal namespace
var REGALHELPERS = REGALHELPERS || {};

var REGALHELPERS = (function () {
    return {
        CurrentTimePeriod: (function () {
            var constCurrentTimePeriod = "CurrentTimePeriod";
            var constTimePeriodForNextReport = "TimePeriodForNextReport";
            var constUseCurrentTimePeriod = "UseCurrentTimePeriod";
           
            return {
                Get: function () {
                    return REGALHELPERS.Cookies.GetCookie(constCurrentTimePeriod);
                },
                Set: function (timePeriod) {
                    REGALHELPERS.Cookies.SetCookieExpireMinutes(constCurrentTimePeriod, timePeriod, 10);
                },
                GetOrDefault: function () {
                    var currentTimePeriod = REGALHELPERS.CurrentTimePeriod.Get();
                    return currentTimePeriod != "" ? currentTimePeriod : REGAL.TimePeriods.Weekly;
                },
                GetAsDateRange: function () {
                    var dateRangeStart = moment().startOf('isoweek');
                    var dateRangeEnd = moment().endOf('isoweek');

                    if (REGALHELPERS.CurrentTimePeriod.IsCurrentTimePeriodToBeUsed() ===  true) {
                        switch (REGALHELPERS.CurrentTimePeriod.Get()) {
                            case REGAL.TimePeriods.Monthly:
                                dateRangeStart = moment().startOf('month');
                                dateRangeEnd = moment().endOf('month');
                                break;
                            case REGAL.TimePeriods.Weekly:
                                dateRangeStart = moment().startOf('isoweek');
                                dateRangeEnd = moment().endOf('isoweek');
                                break;
                            case REGAL.TimePeriods.LastWeek:
                                dateRangeStart = moment().subtract('days', 7).isoWeekday(1);
                                dateRangeEnd = moment().subtract('days', 7).isoWeekday(7);
                                break;
                            case REGAL.TimePeriods.Daily:
                                dateRangeStart = moment().startOf('day');
                                dateRangeEnd = moment().endOf('day');
                                break;
                            case "":
                                dateRangeStart = moment().startOf('isoweek');
                                dateRangeEnd = moment().endOf('isoweek');
                                break;
                        };
                    }

                    return { start: dateRangeStart.toDate(), end: dateRangeEnd.toDate() };
                },
                IsCurrentTimePeriodToBeUsed: function () {
                    return REGALHELPERS.Cookies.DoesCookieExist(constTimePeriodForNextReport);
                },
                SetNextReportToUseCurrentTimePeriod: function () {
                    REGALHELPERS.Cookies.SetCookieExpireSeconds(constTimePeriodForNextReport, constUseCurrentTimePeriod, 10);
                },
                SetNextReportToUseDefaultTimePeriod: function () {
                    REGALHELPERS.Cookies.DeleteCookie(constTimePeriodForNextReport);
                }
            }
        })(),
        Cookies: (function () {
            return {
                SetCookie: function (cname, cvalue, expireSeconds) {
                    var d = new Date();
                    d.setTime(d.getTime() + (expireSeconds * 1000));
                    var expires = "expires=" + d.toUTCString();
                    var cookieString = cname + "=" + cvalue + ";" + expires + ";path=/";
                    document.cookie = cookieString;
                },
                SetCookieExpireDays: function (cname, cvalue, expireDays) {
                    var seconds = expireDays * 24 * 60 * 60;
                    REGALHELPERS.Cookies.SetCookie(cname, cvalue, seconds);
                },
                SetCookieExpireHours: function (cname, cvalue, expireHours) {
                    var seconds = expireHours * 60 * 60;
                    REGALHELPERS.Cookies.SetCookie(cname, cvalue, seconds);
                },
                SetCookieExpireMinutes: function (cname, cvalue, expireMinutes) {
                    var seconds = expireMinutes * 60;
                    REGALHELPERS.Cookies.SetCookie(cname, cvalue, seconds);
                },
                SetCookieExpireSeconds: function (cname, cvalue, expireSeconds) {
                    var seconds = expireSeconds;
                    REGALHELPERS.Cookies.SetCookie(cname, cvalue, seconds);
                },
                GetCookie: function (cname) {
                    var name = cname + "=";
                    var decodedCookie = decodeURIComponent(document.cookie);
                    var ca = decodedCookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == ' ') {
                            c = c.substring(1);
                        }
                        if (c.indexOf(name) == 0) {
                            return c.substring(name.length, c.length);
                        }
                    }
                    return "";
                },
                DeleteCookie: function (cname) {
                    REGALHELPERS.Cookies.SetCookieExpireSeconds(cname, "", -1);
                },
                DoesCookieExist: function (cname) {
                    return (REGALHELPERS.Cookies.GetCookie(cname) != "") ? true : false;
                }
            }
        })()
    }
})();