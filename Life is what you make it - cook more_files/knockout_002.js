// Knockout.Bindings
// (c) Anders Malmgren - https://github.com/AndersMalmgren/Knockout.Bindings
// License: MIT (http://www.opensource.org/licenses/mit-license.php)
// Datepicker and some other parts of library (C) Ryan Niemeyer
(function (factory) {
    // Module systems magic dance.
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("knockout"), exports);
    } else if (typeof define === "function" && define["amd"]) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout", "exports"], factory);
    } else {
        // <script> tag: use the global `ko` object
        factory(ko);
    }
}(function (ko, exports) {
    
    String.empty = "";
    String.hasValue = function (value) {
        return value != null && value != String.empty;
    };

    var extendLiteral = function (target, source) {
        for (var index in source) {
            if (target[index] == null) {
                target[index] = source[index];
            }
        }

        return target;
    }

    var writeValueToProperty = function (property, allBindingsAccessor, key, value, checkIfDifferent) {
        if (!property || !ko.isWriteableObservable(property)) {
            var propWriters = allBindingsAccessor()['_ko_property_writers'];
            if (propWriters && propWriters[key])
                propWriters[key](value);
        } else if (!checkIfDifferent || property() !== value) {
            property(value);
        }
    }

    ko.validation.init({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: false,
        parseInputAttributes: true,
        messageTemplate: null,
        decorateInputElement: true,
        errorElementClass: 'requiredInput',
        grouping: { deep: true, observable: true, live: false }
    }, true);

    ko.validation.rules['mustEqual'] = {
        validator: function (val, otherVal) {
            return val === otherVal;
        },
        message: 'The field must equal {0}'
    };
    ko.validation.rules['minArrayLength']= {
        validator: function (obj, params) {
            return (obj.length >= params.minLength);
        },
        message : "Array does not meet minimum length requirements"
    };
    ko.validation.registerExtenders();

    ko.validation.rules['areSame'] = {
        getValue: function (o) {
            return (typeof o === 'function' ? o() : o);
        },
        validator: function (val, otherField) {
            return val === this.getValue(otherField);
        },
        message: 'The fields must have the same value'
    };

    //Fix for a bug in jquery UI button
    var enableUpdate = ko.bindingHandlers.enable.update;
    ko.bindingHandlers.enable.update = function (element, valueAccessor) {
        enableUpdate(element, valueAccessor);
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (!value || value == null) {
            $(element).removeClass("ui-state-hover ui-state-focus");
        }
    };

    ko.bindingHandlers.message = {
        defaultOptions: {
            splashTimeout: 1000,
            show: "fade",
            hide: "fade"
        },
        update: function (element, valueAccessor) {
            var opt = ko.utils.unwrapObservable(valueAccessor());

            if (opt != null) {
                extendLiteral(opt, ko.bindingHandlers.message.defaultOptions);
                if (opt.splash) {
                    ko.bindingHandlers.message.showSplash(opt.splash, opt);
                } else if (opt.confirm) {
                    opt.result = confirm(opt.confirm);
                } else if (opt.alert) {
                    alert(opt.alert);
                }
            }
        },
        showSplash: function (text, opt) {
            var splash = $("<div id='splash'/>");
            splash.html(text).appendTo("body").dialog({
                show: opt.show,
                hide: opt.hide,
                close: function () { splash.remove(); },
                open: function () {
                    setTimeout(function () { splash.dialog("close") }, opt.splashTimeout);
                }
            });
        }
    };

    ko.virtualElements.allowedBindings.message = true;
    
    function TestPasswordScore(password) {
        var score = 0
        //if length is 0 then 0 score
        if (password.length == 0) {
            return score;
        }
        //anything less than 6 chars is only 10 points
        if (password.length < 6) {
            score += 10;
            return score;
        }
        score += 10;
        //3 numbers is 30 points
        if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) {
            score += 30;
        } else if (password.match(/\d+/)) {
            //1 number is 10 points
            score += 10;
        }

        //two capital letters is 20 points
        if(password.match(/(.*[A-Z].*[A-Z])/)) {
            score += 20;
        } else if (password.match(/[A-Z]/)) {
            //one capital is 10 points
            score += 10;
        }
        
        //two special characters is 30 points
        if (password.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/)) {
            score += 30;
        } else if (password.match(/.[!,@,#,$,%,\^,&,*,?,_,~]/)) {
            //one special character is 10 points
            score += 10;
        }

        //LetterNumbercharacter combo is bonus 10 points
        if (password.match(/([a-zA-Z0-9].*[!,@,#,$,%,\^,&,*,?,_,~])|([!,@,#,$,%,\^,&,*,?,_,~].*[a-zA-Z0-9])/)) {
            score += 10;
        }

        //length greater than 9 chars is 10 points
        if (password.length > 9) {
            score += 10;
        }

        return score;
    }

    ko.bindingHandlers.PasswordStrengthMeter =
    {
        update: function(element, valueAccessor, allBindingsAccessor) {
            var valueUnwrapped = valueAccessor()();
            var $element = $(element);
            var $meterImage = $element.find('.meterImage');
            var score = TestPasswordScore(valueUnwrapped);
            if (score == 0) {
                $meterImage.attr('src', '/DesktopModules/RegalWare/AccountManagement/Images/password-strength-blank-img.png');
            } else if (score < 25) {
                $meterImage.attr('src', '/DesktopModules/RegalWare/AccountManagement/Images/password-strength-weak-img.png');
            } else if (score < 50) {
                $meterImage.attr('src', '/DesktopModules/RegalWare/AccountManagement/Images/password-strength-low-medium-img.png');
            } else if (score < 75) {
                $meterImage.attr('src', '/DesktopModules/RegalWare/AccountManagement/Images/password-strength-medium-img.png');
            } else {
                $meterImage.attr('src', '/DesktopModules/RegalWare/AccountManagement/Images/password-strength-strong-img.png');
            }
        }
    }

    ko.bindingHandlers.Loading = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            var value = valueAccessor(), allBindings = allBindingsAccessor();
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            var options = allBindingsAccessor().loadingOptions || {};

            if (valueUnwrapped == true) {
                if (!$.isEmptyObject(options))
                    $(element).isLoading(options); // Make the element visible
                else {
                    $(element).isLoading(); // Make the element visible
                    $(element).hide();
                }
                var observable = valueAccessor();
                observable(true)
            }
            else {
                $(element).isLoading("hide");   // Make the element invisible
                $(element).show();
                var observable = valueAccessor();
                observable(false);

                if (allBindings.visible !== undefined) {
                    var isVisible = (typeof(allBindings.visible) === 'function') ? allBindings.visible() : (typeof(allBindings.visible) === 'boolean') ? allBindings.visible : false;
                    if (isVisible) {
                        $(element).show();
                    }
                    else {
                        $(element).hide();
                    }
                }
            }
            if (allBindings.enable !== undefined) {
                $(element).prop("disabled", !allBindings.enable());
            }
        }
    };

    ko.bindingHandlers.slideVisible = {
        init: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor()); // Get the current value of the current property we're bound to
            $(element).toggle(value); // jQuery will hide/show the element depending on whether "value" or true or false
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // First get the latest data that we're bound to
            var value = valueAccessor();

            // Next, whether or not the supplied model property is observable, get its current value
            var valueUnwrapped = ko.unwrap(value);

            // Grab some more data from another binding property
            var duration = allBindings.get('slideDuration') || 400; // 400ms is default duration unless otherwise specified

            // Now manipulate the DOM element
            if (valueUnwrapped == true)
                $(element).slideDown(duration); // Make the element visible
            else
                $(element).slideUp(duration);   // Make the element invisible
        }
    };

    ko.bindingHandlers.fadeVisible = {
        init: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor()); // Get the current value of the current property we're bound to
            $(element).toggle(value); // jQuery will hide/show the element depending on whether "value" or true or false
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // First get the latest data that we're bound to
            var value = valueAccessor();
            // Next, whether or not the supplied model property is observable, get its current value
            var valueUnwrapped = ko.unwrap(value);
            // Grab some more data from another binding property
            var duration = allBindings.get('slideDuration') || 400; // 400ms is default duration unless otherwise specified
            // Now manipulate the DOM element
            if (valueUnwrapped == true)
                $(element).fadeIn(duration); // Make the element visible
            else
                $(element).fadeOut(duration);   // Make the element invisible
        }
    };

    ko.bindingHandlers.daterangepicker = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var $el = $(element);

            //initialize datepicker with some optional options
            var options = allBindingsAccessor().daterangepickerOptions || {};
            $el.daterangepicker(options);
            $el.val(viewModel.eventDateText);

            //handle the field changing
            ko.utils.registerEventHandler(element, "change", function () {
                var observable = valueAccessor();
                observable($el.daterangepicker("getRange"));
            });

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $el.daterangepicker("destroy");
            });
        },

        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor()),
                $el = $(element),
                current = $el.daterangepicker("getRange");
            //$el.attr("style", "color: #0A2835;")

            if (value) {
                if (value - current !== 0) {
                    $el.daterangepicker("setRange", value);
                }
            } else {
                //$el.val(viewModel.eventDateText);
                //$el.attr("style", "color: #c6c6c6;")
            }
        }
    };

    ko.bindingHandlers.timepicker = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var $el = $(element);
            //initialize timepicker with some optional options
            var options = allBindingsAccessor().timepickerOptions || {};
            $el.timepicker(options);
            //handle the field changing
            ko.utils.registerEventHandler(element, "change", function () {
                var observable = valueAccessor();
                observable($el.val());
            });
            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                //$(element).timepicker("destroy");
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor()),
                $el = $(element),
                current = $el.timepicker("getTime");
            if (value) {
                if (value - current !== 0) {
                    $el.timepicker("setTime", value);
                }
            } else {
                $el.timepicker("setTime", "");
            }
        }
    };

    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var $el = $(element);
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {};
            $el.datepicker(options);
            //handle the field changing
            ko.utils.registerEventHandler(element, "change", function () {
                var observable = valueAccessor();
                observable($el.datepicker("getDate"));
            });
            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $el.datepicker("destroy");
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor()),
                $el = $(element),
                current = $el.datepicker("getDate");
            if (value) {
                if (value - current !== 0) {
                    $el.datepicker("setDate", value);
                }
            }
            else {
                $el.datepicker("setDate", null);
            }
        }
    };

    ko.bindingHandlers.button = {
        initIcon: function (options) {
            if (options.icon) {
                options.icons = { primary: options.icon };
            }
        },
        init: function (element, valueAccessor) {
            var options = ko.utils.unwrapObservable(ko.toJS(valueAccessor())) || {};
            ko.bindingHandlers.button.initIcon(options);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).button("destroy");
            });

            $(element).button(options);
        },
        update: function (element, valueAccessor) {
            var options = ko.toJS(valueAccessor());
            ko.bindingHandlers.button.initIcon(options);

            if (options) {
                $(element).button(options);
            }
        }
    };

    ko.bindingHandlers.dialog = {
        init: function (element) {
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).dialog("destroy");
            });
        },
        update: function (element, valueAccessor) {
            var options = ko.toJS(valueAccessor());

            if (options) {
                setTimeout(function () {
                    $(element).dialog(options);
                }, 0);
            }
        }
    };

    ko.bindingHandlers.openDialog = {
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            setTimeout(function () {
                if($(element).hasClass('ui-dialog-content')) {
                    if (value) {
                        $(element).dialog("open");
                    } else {
                        $(element).dialog("close");
                    }
                }
            }, 0);
        }
    };

    ko.bindingHandlers.label = {
        counter: 0,
        init: function (element, valueAccessor) {
            var options = ko.utils.unwrapObservable(valueAccessor()) || {};
            var wrapped = $(element);
            var id = wrapped.attr("id");
            if (!String.hasValue(id)) {
                id = "label-" + ko.bindingHandlers.label.counter++;
                wrapped.attr("id", id);
            }
            var label = $("<label/>");
            label.attr("for", id);
            if (options.title) {
                label.attr("title", options.title);
            }
            label.insertAfter(wrapped);

            ko.applyBindingsToNode(label[0], { text: options.caption });
        }
    };

    ko.bindingHandlers.moveHighlighter = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            if (ko.utils.unwrapObservable(valueAccessor)) {
                var $element = $(element);
                var isAnimating = false;
               $element.find('li').on('click', function () {
                 if (!isAnimating) {
                       isAnimating = true;
                       var $li = $(this);
                       setTimeout(function() {
                           var topli = $li.position().top;
                           var target = $li.attr('data-target');
                           var $target = $(target);
                           var $high = $element.parent().parent().find('.highlighter');
                           $high.animate({ top: topli + $high.height() / 2 - 8 },
                           {
                               complete: function () {
                                   $li.parent().parent().find('.tabsection').fadeOut(400, "swing", function () {
                                       setTimeout(function () {
                                           $target.fadeIn(400,"swing",function(){isAnimating = false} );
                                       }, 401);
                                   });
                               }
                           });
                        }, 0);
                   }
               });
            } else {
                $(element).find('li').off('click');
            }
        }
    }
    
    ko.bindingHandlers.selected = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var selected = valueAccessor();
            var key = allBindingsAccessor().optionsKey ? allBindingsAccessor().optionsKey : allBindingsAccessor().optionsText;
            var comparer = typeof key === "function" ? ko.bindingHandlers.selected.functionComparer : ko.bindingHandlers.selected.keyComparer;

            var observable = ko.computed({
                read: function () {
                    var items = ko.utils.unwrapObservable(allBindingsAccessor().options);
                    var value = ko.utils.unwrapObservable(selected);
                    if (value === null || value === undefined) {
                        return value;
                    }
                    return ko.utils.arrayFirst(items, function (item) {
                        return comparer(item, key, value);
                    });
                },
                write: function (value) {
                    writeValueToProperty(selected, allBindingsAccessor, "selected", value);
                },
                disposeWhenNodeIsRemoved: element
            });

            ko.applyBindingsToNode(element, { value: observable });
        },
        keyComparer: function (item, key, value) {
            return ko.utils.unwrapObservable(item[key]) === ko.utils.unwrapObservable(value[key]);
        },
        functionComparer: function (item, key, value) {
            return key(item, value);
        }

    };

    ko.bindingHandlers.tabs = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            ko.renderTemplate(tabsTemplate, bindingContext.createChildContext(valueAccessor()),
                { templateEngine: stringTemplateEngine }, element, "replaceChildren");

            var tabs = ko.utils.unwrapObservable(valueAccessor())
            config = ko.utils.unwrapObservable(allBindingsAccessor().tabsOptions) || {};

            if (config.enable && ko.isObservable(config.enable)) {
                config.enable.subscribe(function (enable) {
                    if (enable) {
                        $(element).tabs({ disabled: [] });
                    } else {
                        var index = 0;
                        var indexes = ko.utils.arrayMap(tabs, function () { return index++ });
                        $(element).tabs({ disabled: indexes });
                    }
                });

                config.enable = null;
            }

            if (config.selectedTab && ko.isObservable(config.selectedTab)) {
                var updating = false;
                var getIndex = function (tab) {
                    var index = ko.utils.arrayIndexOf(tabs, ko.utils.arrayFirst(tabs, function (item) {
                        return ko.utils.unwrapObservable(item) === ko.utils.unwrapObservable(tab);
                    }));
                    return index === -1 ? false : index;
                };

                var onSelectedChangeCallback = function (value) {
                    if (updating) return;

                    updating = true;
                    var newIndex = getIndex(value);
                    $(element).tabs("option", "active", newIndex);
                    updating = false;
                };

                config.active = getIndex(config.selectedTab());
                if (config.active === false) {
                    config.collapsible = true;
                }

                config.selectedTab.subscribe(onSelectedChangeCallback);

                config.select = function (event, ui) {
                    if (updating) return;

                    var selectedModel = ko.utils.unwrapObservable(tabs[ui.index].model);

                    if (config.onTabChanging !== undefined) {
                        var args = { cancel: false, currentModel: config.selectedTab(), selectedModel: selectedModel };
                        config.onTabChanging.call(viewModel, args);

                        if (args.cancel) return false;
                    }

                    updating = true;
                    config.selectedTab(selectedModel);
                    updating = false;
                };
            }

            var onHistory = function () {
                if (notNavigating) return;
                if (String.hasValue(window.location.hash)) {
                    navigating = true;
                    $(element).tabs("select", window.location.hash);
                    navigating = false;
                }
            };

            if (history && history.pushState) {
                var setState = function (state) {
                    history.pushState(state, null, state);
                };

                window.onpopstate = onHistory;
            }
            else if ($.address) {
                var setState = function (state) {
                    window.location.hash = state;
                };

                $.address.change(onHistory);
            }

            if (setState != null) {
                var orgSelect = config.select;
                var notNavigating = false;
                var navigating = false;
                config.select = function (event, ui) {
                    notNavigating = true;
                    result = true;

                    if (orgSelect)
                        result = orgSelect(event, ui);

                    if (!navigating) {
                        setState(ui.tab.hash);
                    }
                    notNavigating = false;
                    return result;
                };
            }

            $(element).tabs(config);

            return { controlsDescendantBindings: true };
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var tabs = ko.utils.unwrapObservable(valueAccessor());

            ko.utils.arrayForEach(tabs, function (tab) {
                tab = ko.utils.unwrapObservable(tab);
                if (tab.enable.subscribed) return;
                tab.enable.subscribed = true; //Hack to avoid multiple subscriptions
                tab.enable.subscribe(function (enable) {
                    var index = ko.utils.arrayIndexOf(tabs, ko.utils.arrayFirst(tabs, function (item) {
                        return item == tab;
                    }));

                    if (enable) {
                        $(element).tabs("enable", index);
                    } else {
                        $(element).tabs("disable", index);
                    }

                });
            });

            if ($(element).find('ul > li').size() == tabs.length) return;

            config = $(element).tabs("option");
            $(element).tabs("destroy").tabs(config);
        }

    };

    var tabsTemplate = '<ul data-bind="foreach: $data">' +
                            '<li><a data-bind="text: title, attr: { href: \'#tab-\' + id() }"></a></li>' +
                        '</ul>' +
                        '<!-- ko foreach: $data -->' +
                            '<div data-bind="attr: { id: \'tab-\' + id() }">' +
                                '<div data-bind="template: { name: template, data: model }">' +
                                '</div>' +
                            '</div>' +
                        '<!-- /ko -->';

    ko.TabViewModel = function (id, title, model, template) {
        this.id = ko.observable(id);
        this.title = ko.observable(title);
        this.model = ko.observable(model);
        this.template = template;
        this.enable = ko.observable(true);
    };

    ko.bindingHandlers.dump = {
        init: function (element, valueAccessor, allBindingsAccessor, viewmodel, bindingContext) {
            var context = valueAccessor();
            var allBindings = allBindingsAccessor();
            var pre = document.createElement('pre');

            element.appendChild(pre);

            var dumpJSON = ko.computed({
                read: function () {
                    var en = allBindings.enable === undefined || allBindings.enable;
                    return en ? ko.toJSON(context) : '';
                },
                disposeWhenNodeIsRemoved: element
            });

            ko.applyBindingsToNode(pre, {
                text: dumpJSON,
                visible: dumpJSON
            });

            return { controlsDescendentBindings: true };
        }
    };

    ko.extenders.trackChange = function (target, track) {
        if (track) {
            target.isDirty = ko.observable(false);
            target.originalValue = target();
            target.subscribe(function (newValue) {
                // use != not !== so numbers will equate naturally
                target.isDirty(newValue != target.originalValue);
            });
        }
        return target;
    };

    ko.extenders.phoneChangeAdd = function (target, option) {
        target.subscribe(function (newValue) {
            if (target.isValid() && ko.utils.unwrapObservable(newValue) != "") {
                switch (option.type) {
                    case 'Work':
                        option.phoneArray.remove(function (item) { return item.Code == option.type; });
                        option.phoneArray.push(new REGAL.PhoneNumberTypeModel({ Code: "Work", Description: "Work Phone", PhoneNumberTypeId: "3" }));
                        if (option.phoneArray().length == 1)
                        {
                            option.primaryPhoneTypeID("3");
                        }
                        break;
                    case 'Home':
                        option.phoneArray.remove(function (item) { return item.Code == option.type; });
                        option.phoneArray.push(new REGAL.PhoneNumberTypeModel({ Code: "Home", Description: "Home Phone", PhoneNumberTypeId: "1" }));
                        if (option.phoneArray().length == 1) {
                            option.primaryPhoneTypeID("1");
                        }
                        break;
                    case 'Mobile':
                        option.phoneArray.remove(function (item) { return item.Code == option.type; });
                        option.phoneArray.push(new REGAL.PhoneNumberTypeModel({ Code: "Mobile", Description: "Mobile Phone", PhoneNumberTypeId: "2" }));
                        if (option.phoneArray().length == 1) {
                            option.primaryPhoneTypeID("2");
                        }
                        break;
                }
            } else {
                option.phoneArray.remove(function (item) { return item.Code == option.type; });
            };
            //if (ko.utils.unwrapObservable(newValue) === "") {
            //    AddDinnerLead.AddLeadModel().PhoneNumberTypes.remove(function(item) { return item.Code == option; });
            //}
            //console.log(ko.utils.unwrapObservable(newValue));
        });
        return target;
    };

    ko.extenders.numeric = function (target, precision) {
        //create a writable computed observable to intercept writes to our observable
        var result = ko.pureComputed({
            read: target,  //always return the original observables value
            write: function (newValue) {
                var current = target(),
                    roundingMultiplier = Math.pow(10, precision),
                    newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue),
                    valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

                //only write if it changed
                if (valueToWrite !== current) {
                    target(valueToWrite);
                } else {
                    //if the rounded value is the same, but a different value was written, force a notification for the current field
                    if (newValue !== current) {
                        target.notifySubscribers(valueToWrite);
                    }
                }
            }
        }).extend({ notify: 'always' });

        //initialize with current value to make sure it is rounded appropriately
        result(target());

        //return the new computed observable
        return result;
    };

    //string template source engine
    var stringTemplateSource = function (template) {
        this.template = template;
    };

    stringTemplateSource.prototype.text = function () {
        return this.template;
    };

    var stringTemplateEngine = new ko.nativeTemplateEngine();
    stringTemplateEngine.makeTemplateSource = function (template) {
        return new stringTemplateSource(template);
    };

    // This section will mask the input for phone number
    ko.extenders.mask = function (observable, mask) {
        observable.mask = mask;
        return observable;
    }

    ko.extenders.uppercase = function (target, option) {
        target.subscribe(function (newValue) {
            if (newValue) {
                target(newValue.toUpperCase());
            }            
        });
        return target;
    };

    var orgValueInit = ko.bindingHandlers.value.init;
    ko.bindingHandlers.value.init = function (element, valueAccessor) {
        var mask = valueAccessor().mask;
        if (mask) {
            $(element).mask(mask);
        }

        orgValueInit.apply(this, arguments);
    }


    ko.bindingHandlers.formatPhoneNumberText = {
        update: function (element, valueAccessor) {
            var phone = ko.utils.unwrapObservable(valueAccessor());
            // Remove any non-numeric characters
            if(phone!=null){
                    phone = phone.replace(/\D/g, '');
                    var formatPhone = function () {
                        return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                    }
                    ko.bindingHandlers.text.update(element, formatPhone);
            }else
            {
                return null;
            }
        }
    };

    // This extension will highlight the content of the field when it has focus
    ko.bindingHandlers.hasSelectedFocus = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            ko.bindingHandlers['hasfocus'].init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            ko.bindingHandlers['hasfocus'].update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);

            var selected = ko.utils.unwrapObservable(valueAccessor());
            if (selected) element.select();
        }
    };

    // START TRIMMED EXTENSION: Uses $trim function from JQuery
    ko.subscribable.fn.trimmed = function () {
        return ko.computed({
            read: function ()
            {
               return $.trim(this());
            },
            write: function (value)
            {
                this( $.trim(value));
                this.valueHasMutated();
            },
            owner: this
        }).extend({ notify: 'always' });
    };
    // END TRIMMED EXTENSION

    
    ko.bindingHandlers.inputMask = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            switch (value) {
                case 'name':
                    // This function prevents any invalid characters being keyed in to the input string
                    $(element).on('keypress', function (char) {
                        var pos = this.selectionStart;
                        char = (char) ? char : window.event;
                        var isWhich = (char.which) ? true : false;
                        var charCode = (char.which) ? char.which : char.keyCode;
                        //alert('charCode:' + charCode);
                        if ((charCode >= 65 && charCode <= 90) ||           // lowercase
                            (charCode >= 97 && charCode <= 122) ||          // uppercase
                            (charCode == 32 && pos > 0) ||                  // space
                            (charCode == 39 && pos > 0 && isWhich) ||       // apostrophe
                            (charCode == 45 && pos > 0 && isWhich) ||       // hyphen
                            (charCode == 8) ||                              // backspace
                            (charCode == 9) ||                              // tab
                            (charCode == 13) ||                             // enter
                            (charCode == 35) ||                             // end
                            (charCode == 36) ||                             // home
                            (charCode == 37) ||                             // left arrow
                            (charCode == 39 && !isWhich) ||                 // right arrow
                            (charCode == 45 && !isWhich) ||                 // insert 
                            (charCode == 46)                                // delete
                            ) {
                            // allowed characters
                        }
                        else {
                            // otherwise drop character
                            char.preventDefault();
                        }
                            
                    });

                    // This function removes all invalid characters from pasted text
                    $(element).on('paste', function (e) {
                        var clipboardData = e.clipboardData || e.originalEvent.clipboardData || window.clipboardData;
                        var pastedText = clipboardData.getData('text');
                        
                        var validCharHasBeenFound = false;
                        var outputText = '';
                        var pos = 0;
                        while (pos < pastedText.length) 
                        {
                            var charCode = pastedText.charCodeAt(pos);
                            if ((charCode >= 65 && charCode <= 90) ||                               // lowercase
                                (charCode >= 97 && charCode <= 122) ||                              // uppercase
                                (charCode == 32 && pos > 0 && validCharHasBeenFound == true) ||     // space
                                (charCode == 39 && pos > 0 && validCharHasBeenFound == true) ||     // apostrophe
                                (charCode == 45 && pos > 0 && validCharHasBeenFound == true)        // hyphen
                                )
                            {
                                validCharHasBeenFound = true;
                                outputText += String.fromCharCode(charCode);
                            }
                            pos++;
                        }
                        this.value = outputText;

                        return false;

                    });
                    break;
                default:
                    break;
            };
            
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            
        }
    };
}));
