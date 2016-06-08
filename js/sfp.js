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
