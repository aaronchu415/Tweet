$(function () {
  function handleMessageDelete(res) {

    //remove li from dom
    $(`#msg-${res}`).remove();
  }

  function handleLikeMessage(res) {
    $(`#like-${res.msgId}`).toggleClass("fas far");
    $(`#${res.msgId}-num-likes`).text(`${res.likes}`);
  }

  function handleFollow(res) {

    $(`#user-${res.followeeId}`).toggleClass("btn-outline-primary btn-primary");

    if (res.isFollowing) {
      $(`#user-${res.followeeId}`).text('Unfollow');
    } else {
      $(`#user-${res.followeeId}`).text('Follow');
    }
    //   $(`#user-${res.msgId}`).toggleClass("fas far");
    //   $(`#${res.msgId}-num-likes`).text(`${res.likes}`);

    //   user - {{ user.id }
    // }

    // load = {
    //   "followeeId": followee.id,
    //   "isFollowing": g.user.is_following(followee)
    // }

  }

  function handleSearchUpdate(res) {

    $('#search-list').empty();

    //append usernames dom element to search drop down
    for (let item of res) {

      let domEl = $(`<a href="/users/${item[1]}" class="dropdown-item"><small>${item[0]}</small></a>`);

      $('#search-list').append(domEl);
    }

  }

  function handleCommentSuccess(res) {
    $('#commentModalLong').modal('hide');
    $('#comment-form').trigger('reset');
  }


  $('[data-toggle="tooltip"]').tooltip();

  // hook up delete button 
  $('.trash-btn').on('click', (e) => {
    e.preventDefault();

    //get message_id
    msg_id = e.target.getAttribute('data-msg');

    //post request to delete end point
    $.ajax({
      type: "POST",
      url: `/messages/${msg_id}/delete`,
      success: handleMessageDelete
    });
  });

  $('.like-btn').on('click', (e) => {
    e.preventDefault();

    //get message_id
    msg_id = e.target.getAttribute('data-msg');

    data = {
      "msg-id": msg_id
    };

    //post request to like end point
    $.ajax({
      type: "POST",
      url: `/like`,
      data: JSON.stringify(data),
      contentType: "application/json",
      success: handleLikeMessage
    });
  });


  $('.follow-btn').on('click', (e) => {
    e.preventDefault();

    followee_id = e.target.getAttribute('data-msg');

    //post request to like end point
    $.ajax({
      type: "POST",
      url: `/users/follow/${followee_id}`,
      success: handleFollow
    });
  });

  // hook up search field to fire request on change
  $('#search').on('keyup', (e) => {
    let searchWord = e.target.value;

    if (searchWord === '') return;

    data = {
      "prefix": searchWord
    };

    //fire post request to autocomplete endpoint
    $.ajax({
      type: "POST",
      url: `/autocomplete`,
      data: JSON.stringify(data),
      contentType: "application/json",
      success: handleSearchUpdate
    });

    //update response to pop down
  });

});







