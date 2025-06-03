$(document).ready(function () {
  function activateLink(hash) {
    $('.menu-lateral .nav-link').removeClass('active');
    $('.menu-lateral .nav-link[href="' + hash + '"]').addClass('active');
  }

  // Al hacer clic
  $('.menu-lateral .nav-link').on('click', function (e) {
    e.preventDefault();
    const target = $(this).attr('href');
    const offsetTop = $(target).position().top + $('#exp-container').scrollTop();

    $('#exp-container').animate({
      scrollTop: offsetTop
    }, 500);

    activateLink(target);
  });

  // Al cargar la página con hash
  const initialHash = window.location.hash;
  if (initialHash) {
    activateLink(initialHash);
  }
});