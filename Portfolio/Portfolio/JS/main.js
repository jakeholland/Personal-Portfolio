$(document).ready(function () {
    Parse.initialize("WAjj5MaAdb8zNUmJ8rE0Y0HDTpYFru9Cs0f4UBgQ", "o93YSY4iZHdauQyNXjFsWChQaJm64ORnRHe9QJ3k");

    $('#sentMessage').hide();

    $.vegas({
        src: 'http://authenticgoods.co/wrapbootstrap/themes/articulate/img/slider/04.jpg'
    })('overlay', {
        src: 'img/overlays/05.png'
    });

    $(".navbar").sticky({
        topSpacing: 0
    });

    $(".hire-me").click(function () {
        return $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 500);
    });
    $("ul.nav-pills li a").click(function () {
        $("ul.nav-pills li.active").removeClass("active"), $(this).parent("li").addClass("active")
    });



    $(".grid-wrapper").magnificPopup({
        delegate: "a",
        type: "image",
        gallery: {
            enabled: !0
        }
    });

    $(".grid-wrapper").magnificPopup({
        delegate: "a",
        type: "image",
        gallery: {
            enabled: false
        }
    });

    $(".chart").waypoint(function () {

        $(".chart").easyPieChart({
            barColor: "#3498db",
            easing: "easeOutBounce",
            size: 150,
            scaleColor: false
        });

    }, {
        triggerOnce: true,
        offset: "bottom-in-view"
    });

    $("#main-menu").onePageNav({
        currentClass: "active",
        changeHash: !1,
        scrollThreshold: 0.5,
        scrollSpeed: 750,
        filter: "",
        easing: "swing"
    });



    var $container = $(".grid-wrapper");
    $container.imagesLoaded(function () {
        $container.isotope({
            itemSelector: 'li',
            layoutMode: 'fitRows',
            transitionDuration: '750ms'
        });
    });

    $(".grid-controls li a").click(function () {
        console.log('click', $(this).attr("data-filter"))
        $container.isotope({
            filter: $(this).attr("data-filter")
        });
    });



    $('#contact-form').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'Your name is required'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    emailAddress: {
                        message: 'The email address is not valid'
                    }
                }
            },
            message: {
                validators: {
                    notEmpty: {
                        message: 'You must send a message'
                    }
                }
            }
        }
    })
        .on('err.field.fv', function (event) {
            $('#sentMessage').hide();
        })
        .on('success.field.fv', function (event) {
            $('#sentMessage').hide();
        })
        .on('success.form.fv', function (event) {
            // Prevent form submission
            event.preventDefault();

            var formObj = {
                name: $('#name').val(),
                email: $('#email').val(),
                message: $('#message').val(),
            };
            //console.log(formObj);

            Parse.Cloud.run('sendMessage', formObj, {
                success: function (result) {
                    $('#sentMessage').show();
                    console.log(result);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });

});