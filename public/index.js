function initMap() {
    // The location of Mine
    var myLocation = {
        lat: 51.5071,
        lng: -0.1278
    };
    // The map, centered at Mine
    var map = new google.maps.Map(
        $('#map')[0], {
            zoom: 10,
            center: myLocation
        });
    //adding my marker    
    var marker = new google.maps.Marker({
        position: myLocation,
        map: map
    });

    //hiding the visitor location text
    $('#guess-text').hide();

    // The visitors marker and the guessing game is added if ipinfo is retrieved
    if ($('#location').text().length) {
        var first = 1;
        var visitorLocation = {
            lat: parseFloat($('#location').text().split(',')[0]),
            lng: parseFloat($('#location').text().split(',')[1])
            // lat: 40.5074,
            // lng: -30.24
        };
        if (first) {
            map.addListener('click', function () {

                setTimeout(function () {
                    map.setZoom(4);
                    var visitorMarker = new google.maps.Marker({
                        position: visitorLocation,
                        map: map,
                        icon: {
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        }
                    });
                    map.setCenter(visitorMarker.getPosition());
                    setTimeout(function () {
                        map.setZoom(9);
                    }, 1600);

                }, 900);
                setTimeout(() => {
                    $('#guess-text').show();
                }, 3700);
            });
            first--;
        }

    }
}


$(document).ready(function () {

    //change title img responsive
    function tokyoChanger() {
        if ($(window).width() < 550) {
            $("#Tokyo").attr('src', 'images/Tokyo3.png');
        } else {
            $("#Tokyo").attr('src', 'images/Tokyo.png');
        }
    }
    tokyoChanger();
    $(window).resize(function () {
        tokyoChanger();
    });




    //ABOUT ME Hover face 
    $('.profile-img-container').on('mouseenter', function () {
        $('.profile-img').css('filter', 'brightness(40%');
        $('<a class="sns-button" href="https://github.com/LRUki"><i class="fab fa-github fa-lg" id="git-icon"></i></a>').insertAfter('.profile-img');
        $('<p ID="git-text">Check out my GitHub!</p>').insertAfter('.profile-img');
    }).on('mouseleave', function () {
        $('.profile-img').css('filter', '');
        $('#git-icon').remove();
        $('#git-text').remove();
    });


    //HISTORY ANIMATION
    //toggle up the timeline contents onload
    $(window).on('load', function () {
        var $textElements = $('.timeline-text');
        $.each($textElements, function () {
            $textElement = $(this)
            $textElement.slideUp(1000);
        })
    })


    var $animation_elements = $('hr.timeline-before');
    var $window = $(window);
    //checking if the top of the timeline
    function checkView() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function () {
            var $element = $(this);
            //console.log($(this))
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            //console.log('element' + element_top_position);
            var element_bottom_position = (element_top_position + element_height);
            //console.log('window' + window_bottom_position)

            //check to see if this current container is within viewport
            if ((element_top_position <= window_bottom_position) &&
                (element_bottom_position >= window_top_position)) {
                $element.next().slideDown(800);
            }
        });
    }

    $window.on('scroll resize', checkView);
    $window.trigger('scroll');

    //Stop carousel autoplay
    $('.carousel').carousel('pause');

    //Contact form | attaching sender Ipinformation to the eamil formspree | ensuring no missing field
    if ($('#senderIpBox').text().length) {
        $('#submitButton').on('click', function () {
            //ipinfo
            var senderIpInfo = $('#senderIpBox').text();
            $('#senderIpInput').attr('value', senderIpInfo);
            //checking empty space
            var name = $("#name").val();
            var email = $("#email").val();
            var content = $("content").val();
            if (name == '' || email == '' || content == '') {
                $('form').attr('onsubmit', 'return false;');
                alert('Please fill required fields');
                // $('form').attr('action', '/');
            } else {
                $('form').attr('onsubmit', '');
                $('form').trigger('click');
            }
        });
    }



});