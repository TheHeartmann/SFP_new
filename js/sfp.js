var tagArray = [];

function alertAndClear(formID) {
    alert('Thank you for getting in touch. We will process your enquiry and get back to you shortly.');
    document.getElementById(formID).reset();
}

function resetForm(formID) {
    document.getElementById(formID).reset();
}

function submitForm() {
    var form = document.getElementById("contactForm");
    var replyto = form.elements[0].value;
    var subject = form.elements[1].value;
    var msg = form.elements[2].value;
    var gotcha = form.elements[3].value;
    $.ajax({
        url: "https://formspree.io/{{site.email}}"
        , method: "POST"
        , data: {
            _replyto: replyto
            , _subject: subject
            , message: msg
            , _gotcha: gotcha
        }
        , dataType: "json"
    });
    $("#formDiv").hide();
    $("#footerLogo").hide();
    $("#thankYou").show();
    return false;
}

$(document).ready(function () {

    $(".modal").on('hide.bs.modal', function (e) {
        $(this).find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');

    });


    $('[data-toggle="filter"]').click(function () {
        //Assign tag
        var text = $(this).text().replace(/\s+/g, '');
        var tag = '.' + text;

        //Add or remove from array
        var tagIndex = tagArray.indexOf(tag);
        if (tagIndex < 0) {
            tagArray.push(tag);
            showClear();
            $('button' + tag).addClass("active");

        } else {
            tagArray.splice(tagIndex, 1);
            $('button' + tag).removeClass("active");
        }

        showPosts();
        activateButtons();

    });

    $('[data-toggle="video-toggle"]').click(function () {
        $(this).siblings().toggle();

        var player = $(this).siblings('.modal-video').children('iframe');

        if ($(this).siblings('.modal-video').is(':visible')) {
            player[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
        } else {
            player[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        }
    });


    $('[data-toggle="video-toggle-img"]').click(function () {
        var vidDiv = $(this).siblings('.modal-video');

        $(this).hide();
        vidDiv.show();

        var player = vidDiv.children('iframe');
        player[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    });


    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        //get the name field value
        var email = $('#email').val();
        //get the comments
        var comments = $('#comments').val();
        //get the subject
        var subject = $('#subject').val();

        //pretend we don't need validation

        //send to formspree
        $.ajax({
            url: 'https://formspree.io/contact@soundsforpixels.com'
            , method: 'POST'
            , data: {
                email: email
                , comments: comments
                , _subject: subject
            , }
            , dataType: "json"
            , success: function () {
                document.getElementById("contactForm").reset();
                toggleView();
            }, error: function () {
                showModal('#mailErrorModal');
                $('.error-div').show();
            }, warning: function () {
                alert("err … don't know what this means … Send us an email through your usual client and we'll get in touch. Please include as much detail about this issue as you can. Thanks! —SFP")
            }

        });

    });

});

function toggleView() {
    $("#formDiv").toggle();
    $("#footerLogo").toggle();
    $("#thankYou").toggle();
}

    function clearFilter() {
        $("button.tag-button").removeClass("active");
        /*        $("button.tag-button").removeClass("disabled");
                $("button.tag-button").removeAttr("disabled");
                $("button.tag-button").removeAttr("disabled");*/
        $("button.tag-button").show();
        $("article.blog-post").show();
        tagArray = [];
        hideClear();
    }

    function showClear() {
        $("#clear").show();
    }

    function hideClear() {
        $("#clear").hide();
    }

    function showPosts() {
        if (tagArray.length == 0) {
            clearFilter();
        } else {
            $("article.blog-post").show().each(function () {
                if ($(this).is(tagArray.join(''))) {
                    $(this).show;
                } else {
                    $(this).hide();
                }
            })
        }
    }

    function activateButtons() {
        $('.tag-button').each(function () {
            var btnText = $(this).text().replace(/\s+/g, '');
            var btnTag = '.' + btnText;

            if ($("article.blog-post" + tagArray.join('') + btnTag).length) {
                /* if ($(this).hasClass('disabled')){
                     $(this).removeClass('disabled');
                     $(this).removeAttr('disabled');*/
                if ($(this).is(':visible')) {
                    $(this).show();
                }
            } else {
                /*                 $(this).addClass('disabled');
                                  $(this).attr('disabled', 'disabled');*/
                $(this).hide();
            }

        })
    }

    function showModal(modalName) {
        $(modalName).modal();
    }

function toggleSection(sectionName){
        var sectionId = "#" + sectionName;
        var sectionLink = document.getElementById(sectionName + "Link");

        $(sectionId).show();
    $(sectionLink).addClass('active');
    $(sectionLink).siblings().removeClass('active');
    $(sectionId).siblings().hide();
}
