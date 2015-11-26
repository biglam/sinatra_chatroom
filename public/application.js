$(function() {

  setInterval(function(){
          updateWindow();
      },10000);

  $('#chat_form').on('submit', function(e) {
    e.preventDefault();
    


    var username = $('#username').val();
    var message = $('#message').val();
    var since = $('#since').val();
    // console.log('did i get here?' + username + since + message);

    $.ajax({
      url: "chat",
      type: 'POST',
      data: { username: username, message: message, since: since },
      success: function(data) {
        addMessages(data);
      },
      complete: function(response) {
        $('#username').val(' ');
        $('#message').val(' ');
        // console.log(response.responseText);
      }
    });
  });


  function updateWindow() {
    // alert('called');
    $.ajax({
      url: 'chat.json',
      type: 'GET',
      success: function(data) {
        console.log(data);
        addMessages(data);
      }
    });
  }

  function addMessages(data) {

    console.log(data);
    $.each(data, function(i, message){
      var htmlstring = '<li><span title="'+message.timestamp + '"><span class="username">&lt;'+ message.username +'&gt; </span><span class="message">'+ message.message +'</span></span></li>';
      $('.chat').prepend(htmlstring);
      var listlength = $('.chat li').length;
      console.log(listlength);
      if (listlength >= 10) {
        $('.chat li:last').remove();
      }

    });
    // $('#since').val(data[data.length-1].timestamp);
  }
});