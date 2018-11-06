function submitForm() {
    event.preventDefault();
    let req = {};
    req.name = document.forms['contactForm'].elements['name'].value;
    req.email = document.forms['contactForm'].elements['email'].value;
    req.message = document.forms['contactForm'].elements['message'].value;
    console.log(req);
    $.ajax({
        url: 'https://secure-beach-60355.herokuapp.com/',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(req),
        processData: false,
        success: function (data, textStatus, jQxhr) {
            $('#response pre').html(JSON.stringify(data));
            document.getElementsByClassName('success')[0].style.display = 'inline';
            setTimeout(()=>{
                document.getElementsByClassName('success')[0].style.display = 'none';
            }, 4000);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}
