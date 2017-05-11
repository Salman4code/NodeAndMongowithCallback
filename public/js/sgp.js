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
        console.log("logout response", response.message);
        if (response.status == true) {
            // window.location.hash="#home";
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
  if (event.target.id == "title" || event.target.id == "content" || event.target.id == "done")
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
      console.log('save_notes response', response);

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
      console.log('get_data_notes response', response);
      $("#cards").html("");
      $("#list_cards").html("");
      $("#title").val("");
      $("#content").val("");

      for (var i = response.note_data.length - 1; i >= 0; i--) {
        console.log(response.note_data[i]._id);
        var note_id = response.note_data[i]._id;
        title = response.note_data[i].title;
        take_note = response.note_data[i].take_note;
        if (localStorage.getItem("view") == "grid") {
          console.log("gridview");

          gridview(note_id);

        } else if (localStorage.getItem("view") == "list") {
          console.log("listview");
          // var div = $("<pre id='box1' class='col-sm-9' style='border:none; box-shadow: 2px 2px 2px #888;'>" + title + "<br>" + take_note + "</pre>");
          // $("#list_cards").append(div);
          listview(note_id);

        }
      }
      // var elem = document.querySelector('#cards');
      // var pckry = new Packery(elem, {
      //   itemSelector: '#box',
      //   gutter: 10
      // });
      // pckry.getItemElements().forEach(function(itemElem){
      //   var draggie= new Draggabilly(itemElem);
      //   pckry.bindDraggabillyEvents(draggie);
      // })

    },
    error: function(error) {
      console.log("page was not loaded ", error);
    },
    complete: function(xhr, status) {
      console.log("the request is completed");
    }
  });
}


function update_data_notes(id, poptitle, popnote) {
  var notedata = {
    title: poptitle,
    take_note: popnote
  };
  $.ajax({
    url: "/update_data_notes/" + id + "",
    type: "POST",
    dataType: "JSON",
    data: notedata,
    success: function(response) {
      if (response.status == true) {
        // console.log('the page was loaded', response);
        console.log("update_data_notes",response.message+" "+response.updateresult);
        get_data_notes();
      } else {
        console.log(response.updateresult);
      }
    },
    error: function(error) {
      console.log('the page was not loaded', error);
    }
  });

}

function read_single_note(id) {
  console.log("function");
  $.ajax({
    url: "/read_single_note/" + id + "",
    type: "POST",
    success: function(response) {
      console.log('the page was loaded', response.message);
      // $("#poptitle").val("");
      $("#popnote").html("");
      console.log("id::", response.message[0]._id);
      // console.log(response.message[0].title);
      // console.log(response.message[0].take_note);
      // console.log(response.message[0].createdAt);
      // console.log("Date",response.message[0].updatedAt);
       notecard_id = response.message[0]._id;
      var title = response.message[0].title;
      var take_note = response.message[0].take_note;
      $("#poptitle").text(title);
      $("#popnote").append(take_note);

      // $("#popdone").attr('onclick',"update_data_notes('"+notecard_id+"','"+poptitle+"','"+popnote+"')")


      // get_data_notes();
    },
    error: function(error) {
      console.log('the page was not loaded', error);
    }
  });
}

$(document).on("click", "#popdone", (function() {

  var poptitle = $("#poptitle").html();
  var popnote = $("#popnote").html();
  update_data_notes(notecard_id, poptitle, popnote);
}));

function delete_notes(id) {
  $.ajax({
    url: "/delete_data_notes/" + id + "",
    type: "POST",
    success: function(response) {
      console.log('the page was loaded', response);;
      console.log(response.message);
      get_data_notes();
    },
    error: function(error) {
      console.log('the page was not loaded', error);
    }
  });

}

function listview(note_id) {
  $("#cards").hide();
  $("#list_cards").show();
  console.log("list");
  // var div = $("<pre class='col-sm-12' id='box1' style='background-color:rgb(250, 250, 250);margin-left:18%;border:none;box-shadow: 0 0 10px 0 rgba(0,0,0,0.2),0 2px 2px 0 rgba(0,0,0,0.2);word-wrap:break-word;width: 458px;' data-toggle='modal' data-target='#myModal'>" + title + "<br>" + take_note + "<br><a id='delete' onclick= delete_notes('" + note_id + "')>" + 'delete' + " </a><a id='update' onclick= read_single_note('" + note_id + "')>" + '&nbsp;update' + "</a></pre>");
  var div = $("<pre class='col-md-12 col-sm-12' id='box1'><div data-toggle='modal' data-target='#myModal' onclick= read_single_note('" + note_id + "') ><div>" + title + "</div><div id='notecontent'>"+take_note+"</div></div><div><a id='delete' onclick = delete_notes('" + note_id + "')>" + 'delete' + "</a></div></pre>");

  $("#list_cards").append(div);
  var elem = document.querySelector('#list_cards');
  var pckry = new Packery(elem, {
    itemSelector: '#box1',
    gutter: 10
  });
  pckry.getItemElements().forEach(function(itemElem) {
    var draggie = new Draggabilly(itemElem);
    pckry.bindDraggabillyEvents(draggie);
  })
}

function gridview(note_id) {
  $("#list_cards").hide();
  $("#cards").show();
  console.log("grid");
  // var div = $("<pre class='col-md-4' id='box' style='border:none;box-shadow: 0 0 10px 0 rgba(0,0,0,0.2),0 2px 2px 0 rgba(0,0,0,0.2); margin-top:10px; word-wrap: break-word;' data-toggle='modal' data-target='#myModal'>" + title + "<br>" + take_note + "<br><a id='delete' onclick = delete_notes('" + note_id + "')>" + 'delete' + "</a><a id='update' onclick= read_single_note('" + note_id + "')>" + 'update' + "</a></pre>");
  var div = $("<pre class='col-md-4' id='box'><div data-toggle='modal' data-target='#myModal' onclick= read_single_note('" + note_id + "') ><div style='font-size: large;'>" + title + "</div><div id='notecontent'>"+take_note+"</div></div><div><a id='delete' onclick = delete_notes('" + note_id + "')>" + 'delete' + "</a></div></pre>");
  $("#cards").append(div);
  var elem = document.querySelector('#cards');
  var pckry = new Packery(elem, {
    // options
    itemSelector: '#box',
    gutter: 20
  });

  pckry.getItemElements().forEach(function(itemElem) {
    var draggie = new Draggabilly(itemElem);
    pckry.bindDraggabillyEvents(draggie);
  })
}

function indexPage() {

  $.ajax({
    url: "index.html",
    type: "GET",
    dataType: 'html',
    success: function(response) {
      console.log('indexPage response', response);
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
