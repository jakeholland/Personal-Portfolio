$(document).ready(function () {
    new WOW().init();

    // Force close for mobile view
    $(".auto-close").click(function (event) {

        if (screen.width <= 767) {
            event.stopPropagation();
            $(".navbar-collapse").collapse('hide');
        }

    });

    $('#sentMessage').hide(); // Initially hide the success message

    $("#typed_subheader").typed({
        strings: ["iOS DEVELOPER", "DESIGNER", "WEB DEVELOPER", "GEEK", "FULL STACK DEVELOPER"],
        typeSpeed: 30,
        backDelay: 750,
        loop: false,
        loopCount: false,
        showCursor: false
     });

    $(".navbar").sticky({
        topSpacing: 0
    });

    // Scrolling events and animations
    $(".hire-me").click(function () {
        return $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, 500);
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

    $(".btn-down").click(function(){
        $("html, body").animate({scrollTop: $(".page-profile").offset().top}, 'slow');
    });

    // Portfolio grid functions
    $("ul.nav-pills li a").click(function () {
        $("ul.nav-pills li.active").removeClass("active"), $(this).parent("li").addClass("active")
    });

    $(".grid-wrapper").imagesLoaded(function () {
        $(".grid-wrapper").isotope({
            itemSelector: 'li',
            layoutMode: 'fitRows',
            transitionDuration: '750ms'
        });
    });

    $(".grid-controls li a").click(function () {
        //console.log('click', $(this).attr("data-filter"))
        $(".grid-wrapper").isotope({
            filter: $(this).attr("data-filter")
        });
    });

    $(".grid-wrapper").find(".item").each(function() {
        var type = "image";

        if($(this).hasClass("magnific-vimeo")) {
            type = "iframe";
        }

        // ("all" === e || !e || i.parents("." + e).length > 0) && (a.push(o), s.push(i.attr("href")))

        $(this).magnificPopup({
            type: type,
            // items: {
            //     src: $(this).attr("href"),
            //     type: type
            // },
            closeOnContentClick: true,
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function (element) {
                    return element.find('img');
                }
            }
            // callbacks: {
            //     beforeOpen: function() {
            //         // var e = s.indexOf(this.st.el.attr("href")); - 1 !== e && this.goTo(e)
            //     }
            // }
        });
    });

    // Send email form
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
                        message: 'You must include a message'
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

            sendEmail({
                name: $('#name').val(),
                email: $('#email').val(),
                message: $('#message').val()
            });

        });

    function sendEmail(formEmail){
        // Returns successful data submission message when the entered information is stored in database.
        $.post("contact_form.php", formEmail)
            .done(function( data ) {
                // Success
                $('#sentMessage').fadeIn();
                setTimeout(function() {
                    $('#sentMessage').fadeOut();
                    $('#name, #email, #message').val('');
                }, 3000 );
            });
    }

});
