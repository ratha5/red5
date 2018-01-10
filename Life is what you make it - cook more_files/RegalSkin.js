$(document).ready(function () {

    //Use to determine if menu design is corporate/backoffice
    var url = window.location.href;
    if (url.indexOf("backoffice") >= 0) {
        //Backoffice: backoffice.saladmaster.com
        $('.menuLinks').addClass("backoffice");
        $('.topLinks').addClass("backoffice");

    } else if (url.indexOf("corporate") >= 0) {
        //Executive: corporate.saladmaster.com
        $('body').addClass("executive");
        $('.menuLinks').addClass("backoffice");
        $('.topLinks').addClass("backoffice");
    }
    else {
        //Corporate: saladmaster.com
        $('.menuLinks').addClass("corporate");
        $('.topLinks').addClass("corporate");
        $('#dnn_dnnLogin_loginLink').hide();
    }

    var jRes = jRespond([{ label: 'desktop', enter: 768, exit: 10000 }, { label: 'mobile', enter: 200, exit: 767 }]);
    jRes.addFunc([{
        breakpoint: 'desktop',
        enter: function () {
            $('.mainMenu').show();
            $('.searchDiv').show();
        },
        exit: function () {
            $('.mainMenu').hide();
            $('.searchDiv').hide();
        }
    }, {
        breakpoint: 'mobile',
        enter: function () {
            $('.backoffice .mainMenu ul > li > a > div').removeClass("drop-down-arrow");
            $('.backoffice .mainMenu ul > li > a > div').addClass("drop-down-arrow-white");
            $('.search-container').fadeToggle(1000);
            $('body').addClass('mobile');
        },
        exit: function () {
            $('.backoffice .mainMenu ul > li > a > div').removeClass("drop-down-arrow-white");
            $('.backoffice .mainMenu ul > li > a > div').addClass("drop-down-arrow");
            $('body').removeClass('mobile');
        }
    }
    ]);

    //Adds page name to body class attribute.
    //Ex: <body class="PAGENAME">
    var pagename = window.location.pathname.match(/^\/?(\w+)\b/);
    if (pagename) $(document.body).addClass(pagename[1].toLowerCase());

    if (pagename) {
        if (pagename[1] === 'Blog') {
            var blogname = window.location.pathname.substring(6, 12);
            $(document.body).addClass(blogname);
        }
    }

    var productDetail = window.location.pathname.match(/ProductDetail/g);
    if (productDetail != null) {
        $(document.body).addClass(productDetail[0]);
    }




    //Search icon click
    $('.search-icon').click(function () {
        $('.search-container').fadeToggle(1000);
    });

    //Custom Menu display for Corporate site
    $('.corporate .topLevel .drop-down-number').each(function (index) {
        $(this).html("0" + (index + 1));
    });

    //Mobile menu
    $('#nav-toggle').click(function () {
        this.classList.toggle("active");
        $('.mainMenu').fadeToggle();
        $('.searchDiv').fadeToggle();
    });

    //Subnavs
    $('div.subLevel').hide();

    if (!$('body').hasClass('mobile')) {
        console.log('mobile' + $('body').hasClass('mobile'));

        $('ul.topLevel > li').mouseover(function () {
            $(this).find('div.subLevel').show();
        });

        $('ul.topLevel > li').mouseout(function () {
            $(this).find('div.subLevel').hide();
        });
    } else {
        $('.backoffice ul.topLevel > li').mouseover(function () {
            $(this).find('div.subLevel').show();
        });

        $('.backoffice ul.topLevel > li').mouseout(function () {
            $(this).find('div.subLevel').hide();
        });
    }



    var nav = $('.menuLinks ');

    $(window).scroll(function () {
        if ($(this).scrollTop() > 30) {
            nav.addClass("f-nav");
        } else {
            nav.removeClass("f-nav");
        }
    });

    $('.corporate .menuTDSize span').each(function (e) {
        if ($(this).text() == "Our Story" || $(this).text() == "Cook More") {
            $(this).css("display", "table-caption")
        }
    });

    //SPV Quantity label
    //setTimeout(function(){
    //    $('.purchase-info span.qty input').before('<div class="qty-class">Qty</div>');
    //}, 2000);

    //setTimeout(function(){
    //    $('.product-view textarea').resizable({
    //        handles: "se"
    //    });
    //}, 2000);

    $('#dnnMenu a').attr('href', function (i, o) {
        return RemoveBaseUrl(o);
    });

});

function RemoveBaseUrl(url) {
    /*
     * Replace base URL in given string, if it exists, and return the result.
     *
     * e.g. "http://localhost:8000/api/v1/blah/" becomes "/api/v1/blah/"
     *      "/api/v1/blah/" stays "/api/v1/blah/"
     */
    var baseUrlPattern = /^https?:\/\/[a-z\:0-9.]+/;
    var result = "";

    var match = baseUrlPattern.exec(url);
    if (match != null) {
        result = match[0];
    }

    if (result.length > 0) {
        url = url.replace(result, "");
    }

    return url;
}