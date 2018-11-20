var max_open_chats = 5
var num_open_chats = 0


// CLICK USER ON MAP OR CALLED AFTER POLYGON DRAWN (drawing.js)
function create_conversation(user_ids) {
  if (user_ids.length == 0) {
    $('#cname_modal').modal('hide');
    return
  }
  $('#cname_modal').modal('show');
  $("#conv_name_field").val("")
  $("#conv_name_field").on("keydown", function(e) {
    if (e.keyCode == 13) {
      chat_name = $("#conv_name_field").val()
      $('#cname_modal').modal('hide');
      $.ajax({
        url: "chatrooms/create",
        type: "POST",
        dataType:"script",
        data: {users: user_ids, name: chat_name}
      });
    }
  })
}

//CLICK SIDE BAR CHAT
function chatbox_chat_clicked(el) {
  chat_wrapper_active($("#chat_wrapper1"))
  id = Number($(el).attr("id").substring(4,))
  if (chatroom_already_opened(id)) {
    if (!chat_window_opened(id)) {
      open_chat($("#messages_container_" + id))
    }
    $("#message_field_" + id).focus()
  }
  else {
    $.ajax({
      url: "chatrooms/show",
      type: "GET",
      dataType: "script",
      data: {chat_id: id}
    })
  }
}

function chat_window_opened(id) {
  wdw = $("#messages_container_" + id).parents().eq(1)
  if (wdw.css("visibility") == "visible") {
    return true
  }
  return false
}

// IS THE CHAT WINDOW DISPLAYED (OPEN OR CLOSED DOESNT MATTER)
function chatroom_already_opened(id) {
  if ($("#messages_container_" + id).length == 0) {
    return false
  }
  return true
}

//CLICK OPEN SIDEBAR
function open_all_chats() {
  $("#all_chat_btn").css("visibility", "hidden")
  $("#all_chats_box").css("visibility", "visible")
}

//CLICK CLOSE SIDE BAR
function toggle_all_chats() {
  $("#all_chats_box").css("visibility", "hidden")
  $("#all_chat_btn").css("visibility", "visible")
}

//CLICK TOGGLE IN CHAT WINDOW
function toggle_chat(el) {
  wrapper = $(el).parents().eq(2)
  btm_pnl = $(el).parents().eq(2).children().first()
  wrapper.css("visibility", "hidden")
  btm_pnl.css("visibility", "visible")

  for (var i = chatwrap_to_idnum(wrapper) + 1; i <= num_open_chats; i++) {
    idnum_to_chatwrap(i).css("left", "-=50")
  }
}

//CLICK BOTTOM HIDDEN CHAT
function open_chat(el) {
  wrapper = $(el).parents().eq(1)
  wrapper.css("visibility", "visible")
  for (var i = chatwrap_to_idnum(wrapper) + 1; i <= num_open_chats; i++) {
    idnum_to_chatwrap(i).css("left", "+=50")
  }
}

//CLICK CLOSE IN CHAT WINDOW
function close_chat(el) {
  position = chatwrap_to_idnum($(el))
  open_wdw_visibility = $(el).children().eq(1).css("visibility")
  $(el).empty()
  $(el).css("visibility", "hidden")

  for (var i = position + 1; i <= num_open_chats; i++) {
    slide_chat(i - 1, i, open_wdw_visibility)
  }
  num_open_chats -= 1
}

// MOVE THE CONTENT OF #(chat_wrapper<idx_from>) to #(chat_wrapper<idx_to>)
function slide_chat(idx_to, idx_from, open_wdw_visibility) {
  src = $("#chat_wrapper" + idx_from)
  dest = $("#chat_wrapper" + idx_to)


  dest.empty()
  dest.append(src.html())
  dest.css("visibility", src.css("visibility"))

  if (idx_to != 1 && open_wdw_visibility == "hidden") {
    dest.css("left", "+=50")
  }

  src.empty()
  src.css("visibility", "hidden")
}

function go_to_user(id) {
  $.ajax({
    url: "users/get_user_location",
    type: "GET",
    data: {id: id},
    dataType:"json",
    success: function(loc) {
      map.setZoom(14)
      map.panTo({lat: loc.lat, lng: loc.long})
    }
  });
}

function chat_wrapper_active(chat_wrapper_element) {
  if (chat_wrapper_element.html() == "") {
    return false
  }
  return true
}

function num_open_chat_windows() {
  count = 0
  for (var i = 1; i <= 5; i++) {
    if ($("#chat_wrapper" + i).html() != "") {
      console.log("pass")
      if ($("#chat_wrapper" + i).children().eq(1).css("visibility") == "visible") {
        count++
      }
    }
  }
  return count
}

// "chat_wrapper3" => 3
function chatwrap_to_idnum(chatwrap) {
  return Number(chatwrap.attr('id').substr(-1))
}

function idnum_to_chatwrap(idnum) {
  return $("#chat_wrapper" + idnum)
}

//number of open chats to the right of current
function open_wrappers_to_right(wrapper) {
  count = 0
  curr = chatwrap_to_idnum(wrapper)
  for (var i = curr + 1; i <= num_open_chats; i++) {
    if ($("#" + idnum_to_chatwrap(i)).children().eq(1).css("visibility") == "visible") {
      count++
    }
  }
  return count
}
