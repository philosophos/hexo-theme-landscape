(function($){
  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });

  // totop
  var bigfa_scroll = {
      drawCircle: function(id, percentage, color) {
          var width = $(id).width();
          var height = $(id).height();
          var radius = parseInt(width / 2.20);
          var position = width;
          var positionBy2 = position / 2;
          var bg = $(id)[0];
          id = id.split("#");
          var ctx = bg.getContext("2d");
          var imd = null;
          var circ = Math.PI * 2;
          var quart = Math.PI / 2;
          ctx.clearRect(0, 0, width, height);
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineCap = "square";
          ctx.closePath();
          ctx.fill();
          ctx.lineWidth = 3;
          imd = ctx.getImageData(0, 0, position, position);
          var draw = function(current, ctxPass) {
              ctxPass.putImageData(imd, 0, 0);
              ctxPass.beginPath();
              ctxPass.arc(positionBy2, positionBy2, radius, -(quart), ((circ) * current) - quart, false);
              ctxPass.stroke();
          }
          draw(percentage / 100, ctx);
      },
      backToTop: function($this) {
          $this.click(function() {
              $("body,html").animate({
                  scrollTop: 0
              },
              800);
              return false;
          });
      },
      scrollHook: function($this, color) {
          color = color ? color: "#000000";
          $this.scroll(function() {
              var docHeight = ($(document).height() - $(window).height()),
              $windowObj = $this,
              $per = $(".percentage"),
              percentage = 0;
              defaultScroll = $windowObj.scrollTop();
              percentage = parseInt((defaultScroll / docHeight) * 100);
              var backToTop = $("#backtoTop");
              if (backToTop.length > 0) {
                  if ($windowObj.scrollTop() > 200) {
                      backToTop.addClass("display");
                  } else {
                      backToTop.removeClass("display");
                  }
                  $per.attr("data-percent", percentage);
                  bigfa_scroll.drawCircle("#backtoTopCanvas", percentage, color);
              }
          });
      }
  }
  $(document).ready(function() {
      var T = bigfa_scroll,
          totop = $("#backtoTop"),
          percent = totop.children(".percentage");
      T.backToTop(totop);
      T.scrollHook($(window), "#99ccff");
/*      percent.hover(function(){
          percent.addClass("fa-long-arrow-up");
          percent.css({"font-family":"FontAwesome"});
      },function(){
          percent.removeClass("fa-long-arrow-up");
          percent.removeAttr("style");
      });
      */
  });

})(jQuery);
