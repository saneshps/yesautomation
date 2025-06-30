<!DOCTYPE html>
<html lang="en">

<head>


  <title> Trusted by | yesautomation.ae</title>
  <link rel="shortcut icon" href="images/favicon.png">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">





  <link rel="stylesheet" href="main/bootstrap.min.css">
  <link rel="stylesheet" href="main/layout.css">
  <link rel="stylesheet" href="main/trusted.css">
  <link rel="stylesheet" href="main/about.css">
  <link rel="stylesheet" href="slider/skdslider.css">
  <link rel="stylesheet" href="main/menu.css">

  <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">




  <!-- <div class="whatssap"></div>

<a href="https://api.whatsapp.com/send?phone=+971508993781&amp;text=Hey%20there!%20I%20woud%20like%20to%20know%20more%20about%20your%20products." class="float" target="_blank">
<i class="fa fa-whatsapp my-float"></i>
</a> -->

  <?php $page = 'trust';
  include 'header.php'; ?>








  <section id="about-banner">



    <div class="slide-desc">

      <div class="cap-one">

        <h1> Trusted by </h1>


      </div>


    </div>

  </section>



  <section id="trusted-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <h3>What matters in the end are happy customers.</h3>
          <p>We are fortunate enough to work with the best names of the industry. These diverse needs and challenges are that made us learn, grow and evolve. </p>
          <p>Below is not all, but few major names to give you an impression of those valuable customers, who choose to rent from YES Automation!!</p>
        </div>

      </div>
    </div>

  </section>


  <div id="steel-div">
    <div class="container-fluid">
      <!-- <div class="row">
			<div class="col-md-12">
				<h3>Steel Division</h3>	

			</div>
			</div> -->
      <div class="row">

        <ul class="bxslider">
          <li>
            <img src="images/t1.png" class="img-responsive" alt="client">

          </li>

          <li>
            <img src="images/t2.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t3.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t4.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t5.png" class="img-responsive" alt="client">

          </li>

          <li>
            <img src="images/t6.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t7.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t8.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t9.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t10.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t11.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t12.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t13.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t14.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t15.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t16.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t17.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t18.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t19.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t20.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t21.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t22.png" class="img-responsive" alt="client">

          </li>
          <li>
            <img src="images/t23.png" class="img-responsive" alt="client">

          </li>


        </ul>







      </div>
    </div>




  </div>






  <?php include 'footer.php'; ?>

  <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
  <script src='https://cdn.jsdelivr.net/bxslider/4.1.1/jquery.bxslider.min.js'></script>

  <script src="js/index.js"></script>
  <script>
    $('.bxslider').bxSlider({
      minSlides: 1,
      maxSlides: 8,
      slideWidth: 189,
      slideMargin: 0,
      ticker: true,
      speed: 50000
    });
  </script>

  <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>

  <script src="https://code.jquery.com/jquery-1.7.1.min.js"></script>
  <script src="js/jquery.flexisel.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.js"></script>
  <script>
    $(window).load(function() {
      $("#flexiselDemo1").flexisel();

      $("#flexiselDemo2").flexisel({
        visibleItems: 4,
        itemsToScroll: 3,
        animationSpeed: 200,
        infinite: true,
        navigationTargetSelector: null,
        autoPlay: {
          enable: false,
          interval: 1300,
          pauseOnHover: true
        },
        responsiveBreakpoints: {
          portrait: {
            changePoint: 480,
            visibleItems: 1,
            itemsToScroll: 1
          },
          landscape: {
            changePoint: 640,
            visibleItems: 2,
            itemsToScroll: 2
          },
          tablet: {
            changePoint: 768,
            visibleItems: 3,
            itemsToScroll: 3
          }
        },
        loaded: function(object) {
          console.log('Slider loaded...');
        },
        before: function(object) {
          console.log('Before transition...');
        },
        after: function(object) {
          console.log('After transition...');
        },
        resize: function(object) {
          console.log('After resize...');
        }
      });

      $("#flexiselDemo1").flexisel({
        visibleItems: 4,
        itemsToScroll: 1,
        autoPlay: {
          enable: true,
          interval: 1300,
          pauseOnHover: true
        }
      });

      $("#flexiselDemo2").flexisel({
        visibleItems: 4,
        itemsToScroll: 1,
        autoPlay: {
          enable: true,
          interval: 1300,
          pauseOnHover: true
        }
      });
      $("#flexiselDemo4").flexisel({
        infinite: false
      });

    });
  </script>









  <script>
    (function($) {

      $.fn.sliderUi = function(options) {

        var settings = $.extend({
          autoPlay: true,
          delay: 3000,
          responsive: true,
          controlShow: true,
          arrowsShow: true,
          caption: false,
          speed: 300,
          cssEasing: 'ease-out'
        }, options || {});

        function supportCSS3(prop) {
          var prefix = ['-webkit-', '-moz-', ''];
          var root = document.documentElement;

          function camelCase(str) {
            return str.replace(/\-([a-z])/gi, function(match, $1) {
              return $1.toUpperCase();
            })
          }
          for (var i = prefix.length - 1; i >= 0; i--) {
            var css3prop = camelCase(prefix[i] + prop);
            if (css3prop in root.style) {
              return css3prop;
            }
          }
          return false;
        }

        function transitionEnd() {
          var transitions = {
            'transition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'mozTransitionEnd'
          }
          var root = document.documentElement;
          for (var name in transitions) {
            if (root.style[name] !== undefined) {
              return transitions[name];
            }
          }
          return false;
        }

        function support3d() {
          if (!window.getComputedStyle) {
            return false;
          }
          var el = document.createElement('div'),
            has3d,
            transform = supportCSS3('transform');

          document.body.insertBefore(el, null);

          el.style[transform] = 'translate3d(1px,1px,1px)';
          has3d = getComputedStyle(el)[transform];

          document.body.removeChild(el);

          return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
        }

        var transformProperty = supportCSS3('transform');
        var transitionProperty = supportCSS3('transition');
        var has3d = support3d();

        return this.each(function() {
          var
            container = $(this),
            slider = container.find('.slider'),
            sliderStyle = slider.get(0).style,
            arrows = container.find('.switch'),
            caption = slider.find('.caption'),
            slide = slider.find('.slide'),
            slideLen = slide.length,
            slideWidth = container.outerWidth(),
            sliderWidth = slideLen * slideWidth,
            controlPanel = null,
            current = 0,
            offset = null,
            busy = false,
            timer = null;

          // console.log(1);
          sliderStyle['width'] = sliderWidth + 'px';
          slide.css('width', slideWidth);

          if (settings.responsive) {
            $(window).on('resize', function() {
              if (transitionProperty) {
                sliderStyle[transitionProperty] = 'none';
              }
              busy = false;
              slideWidth = container.outerWidth();
              sliderWidth = slideLen * slideWidth;
              slide.css('width', slideWidth);

              if (transitionProperty && transformProperty) {
                sliderStyle['width'] = sliderWidth + 'px';

                (has3d) ?
                sliderStyle[transformProperty] = 'translate3d(' + -(slideWidth * current) + 'px, 0, 0)': sliderStyle[transformProperty] = 'translate(' + -(slideWidth * current) + 'px, 0)';

              } else {
                slider.css({
                  width: sliderWidth + 'px',
                  'margin-left': -(slideWidth * current) + 'px'
                });
              }

            })
          }

          !settings.caption && caption.remove();

          if (settings.controlShow) {
            controlPanel = $('<div/>', {
                'class': 'slider-nav'
              })
              .appendTo(container);

            // Control links
            var links = [];

            for (var i = 0; slideLen > i; i++) {
              var act = (current === i) ? 'active' : '';
              links.push('<a class="' + act + '" data-id="' + i + '"></a>');
            }
            controlPanel.get(0).innerHTML = links.join('');

            var navControl = controlPanel.find('a');
            navControl.on('click', function(e) {
              e.preventDefault();
              if ($(this).hasClass('active')) return;
              current = parseInt(this.getAttribute('data-id'), 10);
              show('current');
            })
          }

          var show = function(side) {
            if (busy) return;

            if (side === 'next') {
              if (current < slideLen - 1) {
                offset = -(slideWidth * (++current)) + 'px';
              } else {
                offset = 0;
                current = 0;
              }
            } else if (side === 'current') {
              offset = -(slideWidth * current) + 'px';
            } else {
              if (current > 0) {
                offset = -(slideWidth * (--current)) + 'px';
              } else {
                offset = -(slideWidth * (slideLen - 1)) + 'px';
                current = slideLen - 1;
              }
            }
            if (settings.controlShow) {
              navControl.removeClass('active');
              navControl.eq(current).addClass('active');
            }
            busy = true;
            if (transitionProperty && transformProperty) {
              sliderStyle[transitionProperty] = transformProperty + ' ' + settings.speed + 'ms ' + settings.cssEasing;

              (has3d) ?
              sliderStyle[transformProperty] = 'translate3d(' + offset + ', 0, 0)': sliderStyle[transformProperty] = 'translate(' + offset + ', 0)';

              slider.one(transitionEnd(), function(e) {
                busy = false;
              })
            } else {
              slider.animate({
                'margin-left': offset
              }, settings.speed, 'linear', function() {
                busy = false;
              })
            }
          }

          if (settings.arrowsShow) {
            arrows.on('click', function(e) {
              e.preventDefault();
              var side = this.id;
              show(side);
            })
          } else {
            arrows.remove();
          }

          var auto = function() {
            if (timer) clearInterval(timer);
            timer = setInterval(function() {
              show('next');
            }, settings.delay);
          }

          if (settings.autoPlay) {
            auto();
            container.hover(function() {
              clearInterval(timer);
            }, function() {
              auto();
            });
          }

        });

      }

    })(jQuery);

    $('.slider-container').sliderUi({
      speed: 450,
      cssEasing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      caption: true
    });
  </script>
  <script src="slider/skdslider.min.js"></script>

  <script>
    jQuery(document).ready(function() {
      jQuery('#banner').skdslider({
        delay: 5000,
        animationSpeed: 1000,
        showNextPrev: true,
        showPlayButton: false,
        autoSlide: true,
        animationType: 'sliding'
      });
      jQuery('#responsive').change(function() {
        $('#responsive_wrapper').width(jQuery(this).val());
        $(window).trigger('resize');
      });

    });
  </script>

  <script src="js/script.js"></script>




  </body>

</html>