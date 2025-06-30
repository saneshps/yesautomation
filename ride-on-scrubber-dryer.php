<!DOCTYPE html>

<html lang="en">

<head>


  <title>Ride On Scrubber Dryer | Automatic Vacuum Cleaner | Rental</title>

  <meta name="description" content="A wide range of Floor cleaning machines or Automatic Vacuum Cleaner rental services. Yes Automation offering the best quality cleaning Machines Rental in UAE.">

  <link rel="shortcut icon" href="images/favicon.png">

  <meta charset="utf-8">

  <meta name="keywords" content="cleaning Machines Rental in UAE, cleaning Machines hire UAE, cleaning Machines Rental, automatic vacuum cleaners for rent in UAE, automatic vacuum cleaners hire ">

  <meta name="viewport" content="width=device-width, initial-scale=1">




  <link rel="stylesheet" href="main/bootstrap.min.css">

  <link rel="stylesheet" href="main/layout.css">

  <link rel="stylesheet" href="main/rentals.css">
  <link href="slider/skdslider.css" rel="stylesheet">
  <link rel="stylesheet" href="main/menu.css">

  <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-187454492-3"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'UA-187454492-3');
  </script>



  <!-- <div class="whatssap"></div>

<a href="https://api.whatsapp.com/send?phone=+971508993781&amp;text=Hey%20there!%20I%20woud%20like%20to%20know%20more%20about%20your%20products." class="float" target="_blank">
<i class="fa fa-whatsapp my-float"></i>
</a> -->

  <?php $page = 'steel';
  include 'header.php'; ?>


  <section id="machinery-banner">

    <ul id="banner">


      <li>

        <img src="images/cleaning-mach-ban3.png" alt="Ride On Scrubber Dryer in UAE">

      </li>
    </ul>

    <div class="slide-desc">

      <div class="cap-one">

        <h1> Ride On Scrubber Dryer </h1>


      </div>


    </div>

  </section>



  <section id="machinery-image">

    <div class="container-fluid">

      <div class="row">

        <div class="col-xl-3 col-lg-3 col-md-4">

          <div class="back-it">
            <div class="reach">

              <h4>Reach Our Expert</h4>

              <img src="images/anjali.png" class="img-responsive" style="margin: auto;" alt="Yes Automation">

              <h6>Anjali Roy</h6>

              <p><a href="mailto:sales@yesautomation.ae">sales@yesautomation.ae</a></p>



            </div>



            <!-- Express Interest -->
            <div class="intrest">



              <h3>EXPRESS INTEREST</h3>

              <form method="post" action="form.php">

                <input type="hidden" name="pn" id="pn" value="Cleaning Robot">

                <div class="col-md-12 col-sm-12 padd">

                  <input type="email" name="email" placeholder="Enter Your Email id" required="">

                </div>



                <div class="col-md-12 col-sm-12 padd">

                  <input placeholder="Mobile number" name="mobile" required="">

                </div>





                <div class="col-md-12 col-sm-12 padd bg-send">

                  <input type="submit" value="SEND" name="Submit">

                </div>

              </form>



              <h4>Hear from us in 24 hours</h4>

            </div>
            <!--// Express Interest -->



            <div id="download">

              <h3>DOWNLOAD CATALOGUES</h3>



              <!-- <a  href="pdf/almi-catalogue.pdf" class="box" download><i class="demo-icon icon-pdf">&#xe811;</i>  Almi Catalogue</a> -->



            </div>



            <div id="case">



              <a href="#">
                <h2>Case Study</h2>
              </a>

            </div>
          </div>


        </div>

        <div class="col-xl-9 col-lg-9 col-md-8">



          <h2 style="text-transform: uppercase;" id="product-tittle">Ride On Scrubber Dryer</h2>
          <p>Our Ride-on scrubber dryers are known for its manoeuvrability and speed. Stable and robust models with a good turning circle and speed-dependent water dosing technology. Available for daily, weekly, and monthly hires. </p>

          <div class="row top">
            <div class="col-md-4">
              <p class="text-center"><b>RA500 Sauber</b></p>
              <img src="images/cleaning-machines/ra500sauber.webp" class="img-responsive" alt="Ride On Scrubber Dryer">
            </div>
            <div class="col-md-4">
              <p class="text-center"><b>RA900 Sauber</b></p>
              <img src="images/cleaning-machines/ra900-sauber.webp" class="img-responsive" alt="Ride On Scrubber Dryer">
            </div>

          </div>

          <div class="row top">
            <div class="col-md-12">
              <p>For any rental requirements for the <b>cleaning machines</b> please <a class="cont" href="contact.php">contact us.</a> </p>
            </div>



          </div>



        </div>

      </div>
    </div>



  </section>



  <?php include 'footer.php'; ?>



  <script>
    $(function() {

      var Accordion = function(el, multiple) {

        this.el = el || {};

        this.multiple = multiple || false;



        // Variables privadas

        var links = this.el.find('.link');

        // Evento

        links.on('click', {
          el: this.el,
          multiple: this.multiple
        }, this.dropdown)

      }



      Accordion.prototype.dropdown = function(e) {

        var $el = e.data.el;

        $this = $(this),

          $next = $this.next();



        $next.slideToggle();

        $this.parent().toggleClass('open');



        if (!e.data.multiple) {

          $el.find('.submenu').not($next).slideUp().parent().removeClass('open');

        };

      }



      var accordion = new Accordion($('#accordion'), false);

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



                (has3d)

                ?
                sliderStyle[transformProperty] = 'translate3d(' + -(slideWidth * current) + 'px, 0, 0)'

                  : sliderStyle[transformProperty] = 'translate(' + -(slideWidth * current) + 'px, 0)';



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



              (has3d)

              ?
              sliderStyle[transformProperty] = 'translate3d(' + offset + ', 0, 0)'

                : sliderStyle[transformProperty] = 'translate(' + offset + ', 0)';



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