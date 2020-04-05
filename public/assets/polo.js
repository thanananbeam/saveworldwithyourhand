$('#gototop').click(function () {
  $("html, body").animate({
    scrollTop: 0
  }, 600);
  return false;
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $('#gototop').fadeIn();
  } else {
    $('#gototop').fadeOut();
  }
});