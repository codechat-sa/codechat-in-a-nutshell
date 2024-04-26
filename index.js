
$(document).ready(function () {

    AOS.init();
  
    $('#slide-toggle').click(function () {
      $('.overlay').fadeToggle(50);
  
      $('#menu-slider').toggleClass('hide');
      $('#main-warapper').toggleClass('left');
  
      $('body').toggleClass('no-scroll');
    });
  
    $('.overlay').click(function () {
      $(this).fadeToggle(50);
  
      $('#menu-slider').toggleClass('hide');
      $('#main-warapper').toggleClass('left');
  
      $('body').toggleClass('no-scroll');
    });
  });
  //# sourceURL=pen.js


function readMore(text,read) {
    var moreText = document.getElementById(text);
    var btnText = document.getElementById(read);

    if (moreText.style.display === "none") {
        moreText.style.display = "inline";
        btnText.innerHTML = "Read Less"; // Changes the link text
    } else {
        moreText.style.display = "none";
        btnText.innerHTML = "Read More"; // Changes the link text back
    }
}
