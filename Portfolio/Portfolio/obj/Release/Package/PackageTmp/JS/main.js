$(document).ready(function () {
    Parse.initialize("WAjj5MaAdb8zNUmJ8rE0Y0HDTpYFru9Cs0f4UBgQ", "o93YSY4iZHdauQyNXjFsWChQaJm64ORnRHe9QJ3k");

    // Force close for mobile view
    $(".auto-close").click(function (event) {

        if (screen.width <= 767) {
            event.stopPropagation();
            $(".navbar-collapse").collapse('hide');
        }

    });

    $('#sentMessage').hide(); // Initially hide the success message

    $.vegas({
        src: 'img/header.jpg'
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
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
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
        changeHash: true,
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