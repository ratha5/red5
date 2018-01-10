$(document).ready(function () {
    

    var jRes = jRespond([{ label: 'mobile', enter: 200, exit: 767 }]);

    jRes.addFunc([{
        breakpoint: 'mobile',
        enter: function () {
            var myvid = document.getElementById('home-video');
            $('.easyhtml5video video').hide();
        },
        exit: function () {

        }
    }]);
});