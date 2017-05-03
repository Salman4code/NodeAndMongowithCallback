$(document).ready(function() {
  if (localStorage.getItem("view") == "grid") {
    $("#grid").hide();
    $("#list").show();
  } else {
    $("#list").hide();
    $("#grid").show();
  }
  get_data_notes();

  $(".sidebar-nav").hide();
  $("#logOut").click(function() {

    $.ajax({
      url: "/logout",
      type: "POST",

      success: function(response) {

        if (response.status == true) {
          indexPage();

        }

      }
    });
  });
  // $("#menu-toggle").click(function(e) {
  //     console.log("toggle");
  //           e.preventDefault();
  //           $("#wrapper").toggleClass("toggled");
  //       });
});


// $(document.body).on('click', '#menu-toggle', (function(e) {
//   console.log("toggle");
//   $(".sidebar-nav").show();
//   e.preventDefault();
//   $("#wrapper").toggleClass("toggled");
//
// }));



$(document).on('click', '#note', (function(e) {
  $("#div1").hide();
  $("#div2").show();
}));


$(document).on('click', '#list', (function() {
  // $("#list_cards").show();
  $("#list").hide();
  $("#grid").show();
  localStorage.setItem("view", "list");
  get_data_notes();
}));

$(document).on('click', '#grid', (function() {
  $("#grid").hide();
  $("#list").show();
  // $("#list_cards").hide();
  localStorage.setItem("view", "grid");
  get_data_notes();
}));


$(document).on("click", "#done", (function() {
  console.log("done clicked");
  var title = $("#title").val();
  var take_note = $("#content").val();
  console.log("done", take_note);
  if (title == "" && take_note == "") {

    return;
  }

  save_notes(title, take_note);

  // $("#cards").empty();


}));

$("body").click(function(event) {
  if (event.target.id == "title" || event.target.id == "content" ||event.target.id=="done")
    return;
  else {
    $("#div2").hide();
    $("#div1").show();

    var title = $("#title").val();
    var take_note = $("#content").val();
    console.log("done", take_note);
    if (title == "" && take_note == "") {

      return;
    }

    save_notes(title, take_note);

  }
});

function save_notes(title, take_note) {

  var obj = {
    title: title,
    take_note: take_note

  };
  $.ajax({
    url: "/data_notes",
    type: "POST",
    dataType: "JSON",
    data: obj,
    success: function(response) {
      //  console.log('the page was loaded', response);

      var a = response.message;
      console.log(a);
      console.log("success");
      get_data_notes();
    },
    error: function(error) {
      console.log('the page was not loaded', error);
      console.log(obj);
    }
  });
}


function get_data_notes() {
  $.ajax({
    url: "/get_data_notes",
    type: "POST",
    dataType: 'JSON',
    success: function(response) {
      $("#cards").html("");
      $("#list_cards").html("");
      console.log('page was loaded', response);
      console.log(response.message);
      $("#title").val("");
      $("#content").val("");

      for (var i = response.message.length - 1; i >= 0; i--) {
        console.log(response.message._id);
        title = response.message[i].title;
        take_note = response.message[i].take_note;
        if (localStorage.getItem("view") == "grid") {
          console.log("gridview");

          gridview();

          // var div = $("<pre class='col-sm-4' id='box' style='border:none; box-shadow: 2px 2px 2px #888; margin-top:10px;'>" + title + "<br>" + take_note + "</pre>");
          // $("#cards").append(div);
          // var elem = document.querySelector('#cards');
          // var pckry = new Packery(elem, {
          //   itemSelector: '#box',
          //   gutter: 10
          // });

        } else if (localStorage.getItem("view") == "list") {
          console.log("listview");
          // var div = $("<pre id='box1' class='col-sm-9' style='border:none; box-shadow: 2px 2px 2px #888;'>" + title + "<br>" + take_note + "</pre>");
          // $("#list_cards").append(div);
          listview();

        } else {
          gridview();
        }
        // var elem = document.querySelector('#cards');
        // var pckry = new Packery(elem, {
        //   itemSelector: '#box',
        //   gutter: 10
        // });

      }


    },
    error: function(error) {
      console.log("page was not loaded ", error);
    },
    complete: function(xhr, status) {
      console.log("the request is completed");
    }
  });
}


function gridview() {
  console.log("grid");
  var div = $("<pre class='col-md-4' id='box' style='border:none; box-shadow: 2px 2px 2px #888; margin-top:10px;word-wrap:break-word;'>" + title + "<br>" + take_note + "<br><a id='delete' onclick= delete_notes('"+ +"')>"+'delete'+"</a></pre>");
  $("#cards").append(div);
  var elem = document.querySelector('#cards');
  var pckry = new Packery(elem, {
    // options
    itemSelector: '#box',
    gutter: 10
  });

  pckry.getItemElements().forEach(function(itemElem){
    var draggie= new Draggabilly(itemElem);
    pckry.bindDraggabillyEvents(draggie);
  })

  $(document).on('click', '#delete', (function() {

  }));

}

function delete_notes(id){
  $.ajax({
    url: "/delete_data_notes/"+id,
    type: "POST",
    success: function(response) {
      console.log('the page was loaded', response);
;
      console.log(response.message);
      get_data_notes();
    },
    error: function(error) {
      console.log('the page was not loaded', error);
    }
  });

}

function listview() {
  // $("#cards").empty();
  // $("#list_cards").empty();
  console.log("list");
  var div = $("<pre class='col-sm-12' id='box1' style='border:none; box-shadow: 2px 2px 2px #888;word-wrap:break-word;width: 700px;'>" + title + "<br>" + take_note +"<br><a id='delete'>"+'delete'+" </a></pre>");
  $("#cards").append(div);
  //   var elem = document.querySelector('#list_cards');
  //   var pckry = new Packery(elem, {
  //     // options
  //     itemSelector: '#box1',
  //     gutter: 10
  //   });
}


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
