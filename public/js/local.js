
var temp = [];
$(document).ready(function() {

  $.ajax({
    url: "/welcome",
    type: "GET",
    success: function(response) {
      console.log('page was loaded', response.status);
      if(response.status==true)
      {
        welcomepage();
      }
    },
    error: function(error) {
      console.log("page was not loaded ", error);
    },
    complete: function(xhr, status) {
      console.log("the request is completed");
    }
    // welcomepage();
  });



  $("#login1").click(function() {
    //alert("hi");
    var flag = 0;
    var userEmail = $("#email_id").val();;
    var userPassword = $("#password").val();
    var login={
      email:userEmail,
      password:userPassword
    };

    $.ajax({
      url: "/login",
      type: "POST",
      dataType: 'JSON',
      data:login,
      success: function(response) {
        console.log('page was loaded', response);
        console.log(response.status);
        if(response.status==false)
        {
          if(response.message=="Unauthorised User" || response.message=="Email id is not Registered")
          {
            console.log(response.message);
            $("span").remove();
            $("#login1").after('<p style="margin-left:15%;"><span id="error" style="color:red;">'+response.message+'</span>');
            return;
          }
          console.log(response.message[0].msg);
          $("span").remove();
          $("#login1").after('<p style="margin-left:15%;"><span id="error" style="color:red;">'+response.message[0].msg+'</span>');
        }
        else
        {
        welcomepage();
      }
        //$('body').html(response);
      },
      error: function(error) {
        console.log("page was not loaded ", error);
      }
    });

  });

  $("#submit").click(function() {
  var Username = $("#name").val();
  var Useremail = $("#email_id").val();
  var Usermobile=$("#mobile_no").val();
  var password = $("#Password").val();
  var rPassword = $("#rPassword").val();

  var signup={
    username:Username,
    email:Useremail,
    mobile:Usermobile,
    password:password,
    confirmpassword:rPassword
  };
  if(validateinput(signup))
  {
  $.ajax({
    url: "/signup",
    type: "POST",
    dataType: 'JSON',
    data:signup,
    success: function(response) {
       console.log(response.status);
      if(response.status==true)
      {
      welcomepage();
    }else{
      $('span').remove();
      $('#email_id').after('<p style="margin-left:15%;"><span style="color:red;">'+response.message+'</span></p>');
      console.log(response.message);
    }
    },
    error: function(error) {
      console.log("page was not loaded ", error);
    }
  });
}
else {
  return;
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



function welcomepage() {

  $.ajax({
    url: "template/home.html",
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

function validateinput(signup)
{
  Username = signup.username;
  Useremail = signup.email;
  Usermobile=signup.mobile;
  password = signup.password;
  rPassword = signup.confirmpassword;

  var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var passwordregex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  var mobileregex=/^[789]\d{9}$/;
  console.log(typeof(Username));
  if (Username =="" || typeof(Username) !== 'string') {
   $('span').remove();
   $('#name').after('<p style="margin-left:15%;"><span style="color:red;">'+"Please Enter name"+'</span><p>');
    return false;

  }
  else if(Useremail==""||Useremail==undefined || Useremail==null){
     $('span').remove();
     $('#email_id').after('<p style="margin-left:15%;"><span style="color:red;">'+"Please Enter email_id"+'</span></p>');
     return false;
  }
  else if (!emailregex.test(Useremail)) {

    $('span').remove();
   $('#email_id').after('<p style="margin-left:15%;"><span style="color:red;">'+"Please Enter valid email_id"+'</span></p>');
    return false;

  }
  else if (Usermobile=="" || Usermobile==undefined || Usermobile==null) {
    $('span').remove();
   $('#mobile_no').after('<p style="margin-left:15%;"><span style="color:red;">'+"Please Enter Mobile Number"+'</span></p>');
    return false;
  }
  else if (!mobileregex.test(Usermobile)) {
    $('span').remove();
   $('#mobile_no').after('<p style="margin-left:15%;"><span style="color:red;">'+"Mobile Number is not valid"+'</span></p>');
    return false;
  }
  else if (password=="" || password == undefined || password== null) {

    $('span').remove();
   $('#Password').after('<p style="margin-left:15%;"><span style="color:red;">'+"Please Enter password"+'</span></p>');
    return false;

  }
  else if (!passwordregex.test(password)) {
    $('span').remove();
    $('#Password').after('<p style="margin-left:15%;"><span style="color:red;">'+"Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character"+'</span></p>');
    return false;

  } else if (password != rPassword) {

        $('span').remove();
       $('#rPassword').after('<p style="margin-left:15%;"><span style="color:red;">'+"Password does not match<br>"+'</span></p>');
    return false;

  }
  return true;
}
