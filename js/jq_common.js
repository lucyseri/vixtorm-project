$('#header-include').load("html/header.html", function(){
  //login
  $('header .goto li.goto-login a').click(function(){
    $('.login-popup').addClass('active');
    $('.login-popup').prop('inert', false);
    return false;
  });
  $('.login-popup button.close-btn').click(function(){
    $('.login-popup').removeClass('active');
    $('.login-popup').prop('inert', true);
  });
  $('.login-popup ul.options li.login-state').click(function(){
    $(this).toggleClass('active');
  });
  $('.login-popup button.submit').click(function(){
    var loginId = document.querySelector('#login-email');
    var loginPw = document.querySelector('#login-pw');
    if(loginId.value === ''){
      alert('이메일을 입력해주세요');
      loginId.focus();
      return false;
    }
    if(loginPw.value === ''){
      alert('비밀번호를 입력해주세요');
      loginPw.focus();
      return false;
    }
    $('#login-form').submit();
    $('.login-popup').removeClass('active');
  });
  //join
  $('header .goto li.goto-join a').click(function(){
    $('.join-popup').addClass('active');
    $('.join-popup').prop('inert', false);
    return false;
  });
  $('.join-popup button.close-btn').click(function(){
    $('.join-popup').removeClass('active');
    $('.join-popup').prop('inert', true);
  });
  $('span.select-box select').click(function(){
    $('span.select-box select').toggleClass('active');
  }).keydown(function(e){
    if(e.keyCode == '40' || e.keyCode == '38') $('span.select-box select').toggleClass('active');
  });
  $(document).click(function(e){
    if(!$(e.target).is($('span.select-box select'))) $('span.select-box select').removeClass('active');
  });
  $('.join-popup button.submit').click(function(){
    if($('#join-name').val() === ''){
      alert('이름을 입력해주세요');
      $('#join-name').focus();
      return false;
    }
    if($('#join-phon').val() === ''){
      alert('번호를 입력해주세요');
      $('#join-phon').focus();
      return false;
    }
    if($('#join-email').val() === ''){
      alert('이메일을 입력해주세요');
      $('#join-email').focus();
      return false;
    }
    if($('#join-pw1').val() === ''){
      alert('비밀번호를 입력해주세요');
      $('#join-pw1').focus();
      return false;
    }
    if($('#join-pw2').val() != $('#join-pw1').val()){
      alert('비밀번호를 확인해주세요');
      $('#join-pw2').focus();
      return false;
    }
    $('.join-popup form').submit();
    $('.join-popup').removeClass('active');
  });
});
//footer
$('#footer-include').load("html/footer.html", function(){
  $('.family-site .select span.default').click(function(){
    $('.family-site .select').toggleClass('active');
  });
});