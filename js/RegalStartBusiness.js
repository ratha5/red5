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

            if (qstring === '?opportunity') {
                $('html, body').animate({ scrollTop: $(".link-opportunity").offset().top - 150 }, 2000);
            }

            if (qstring === '?train') {
                $('html, body').animate({ scrollTop: $(".link-train").offset().top - 150 }, 2000);
            }

            if (qstring === '?incent') {
                $('html, body').animate({ scrollTop: $(".link-incent").offset().top - 150 }, 2000);
            }

            if (qstring === '?get') {
                $('html, body').animate({ scrollTop: $(".link-get").offset().top - 150 }, 2000);
            }

            if (qstring === '?success') {
                $('html, body').animate({ scrollTop: $(".link-success").offset().top - 150 }, 2000);
            }

            if (qstring === '?news') {
                $('html, body').animate({ scrollTop: $(".link-news").offset().top - 200 }, 2000);
            }

            if (qstring === '?business') {
                $('html, body').animate({ scrollTop: $(".link-business").offset().top - 150 }, 2000);
            }
        }
    }, 800);

});
