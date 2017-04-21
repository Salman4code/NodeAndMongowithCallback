$(document).ready(function() {


  // $('#logOut').click(function(){
  //   var page=$(this).attr('href');
  //   // var email_id=sessionStorage.getItem("userEmail")
  //  sessionStorage.removeItem("userEmail");
  //   console.log(page);
  //   loadpage1(page);
  // });
  // $("#logOut").click(function(){
  //   sessionStorage.removeItem("userEmail");
  //   window.location.hash="";
  //   location.reload();
  //   return;
  // });

  $("#logOut").click(function() {

    $.ajax({
      url: "/logout",
      type: "GET",

      success: function(response) {

        if (response.status == false) {
          indexPage();

        }

      }
    });
  });

  function indexPage() {

    $.ajax({
      url: "index.html",
      type: "GET",
      dataType: 'html',
      success: function(response) {
        //console.log('page was loaded', response);
        $('body').html(response);
      },
      error: function(error) {
        console.log("page was not loaded ", error);
      },
      complete: function(xhr, status) {
        console.log("the request is completed");
      }
    });
  }


});
