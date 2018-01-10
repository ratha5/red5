$(document).ready(function () {
    $(".bullet1").click(function () {
        $(".bullet1").addClass("on");
        $(".bullet2").removeClass("on");
        $(".bullet3").removeClass("on");

        $(".bullet-info1").show();
        $(".bullet-info2").hide();
        $(".bullet-info3").hide();
    });
    $(".bullet2").click(function () {
        $(".bullet1").removeClass("on");
        $(".bullet2").addClass("on");
        $(".bullet3").removeClass("on");

        $(".bullet-info1").hide();
        $(".bullet-info2").show();
        $(".bullet-info3").hide();
    });
    $(".bullet3").click(function () {
        $(".bullet1").removeClass("on");
        $(".bullet2").removeClass("on");
        $(".bullet3").addClass("on");

        $(".bullet-info1").hide();
        $(".bullet-info2").hide();
        $(".bullet-info3").show();
    });

    $('.faqs .a').hide();

    $(".faqs .q").click(function () {

        if ($(this).parent().find(".a").attr('style') === '' || $(this).parent().find(".a").attr('style') === 'display: block;') {
            $(this).parent().find(".a").hide()
            $(this).parent().find(".faqs-arrow").removeClass('up');
            $(this).attr('style', 'border-bottom: none;padding-bottom: 0;');
        } else {
            $(this).parent().find(".a").show()
            $(this).parent().find(".faqs-arrow").addClass('up');
            $(this).attr('style', 'border-bottom: 1px solid #e2e2e2;padding-bottom: 20px;');
        }
    });

    

    setTimeout(function () {
        if (window.location.search) {
            var qstring = window.location.search;

            if (qstring === '?benefits') {
                $('html, body').animate({
                    scrollTop: $(".link-benefits").offset().top - 200
                }, 2000);
            }

            if (qstring === '?made') {
                $('html, body').animate({
                    scrollTop: $(".link-made").offset().top - 200
                }, 2000);
            }

            if (qstring === '?sets') {
                $('html, body').animate({
                    scrollTop: $(".link-sets").offset().top - 200
                }, 2000);
            }

            if (qstring === '?all') {
                $('html, body').animate({
                    scrollTop: $(".link-all").offset().top - 200
                }, 2000);
            }

            if (qstring === '?productsfaqs') {
                $('html, body').animate({
                    scrollTop: $(".link-pfaqs").offset().top - 200
                }, 2000);
            }
        }
    }, 800);

});