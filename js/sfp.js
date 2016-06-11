

function alertAndClear(formID){
    alert('Thank you for getting in touch. We will process your enquiry and get back to you shortly.');
    document.getElementById(formID).reset();
}

function resetForm(formID){
            document.getElementById(formID).reset();
        }
function submitForm(){
    var form = document.getElementById("contactForm");
            var replyto = form.elements[0].value;
              var subject = form.elements[1].value;
               var msg = form.elements[2].value;
               var gotcha =  form.elements[3].value;
            $.ajax({
                url: "https://formspree.io/{{site.email}}",
                method: "POST",
                data: {
                    _replyto: replyto,
                    _subject: subject,
                    message: msg,
                    _gotcha: gotcha
                },
                dataType: "json"
            });
            $("#formDiv").hide();
            $("#footerLogo").hide();
            $("#thankYou").show();
            return false;
}

$(document).ready(function () {
  $('[data-toggle="filter"]').click(function () {
      var tag=$(this).text().toLowerCase();
     // var tagArray = [];
      //ftagArray[0]=tag;

      if($(this).hasClass("active")){
          clearFilter();
      } else{
          if ($(".btn-cat.active").length){
             // $(".btn-cat.active").text().toLowerCase()
              $(".btn-cat.active").removeClass("active");
          }
          $(this).addClass("active");
          $("article.blog-post").show()
          $("article.blog-post").not("."+tag).hide()

      }
  });

});

    function clearFilter() {
        $("button.btn-cat").removeClass("active");
      $("article.blog-post").show();
    }

