<!--***************************************-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<!--***************************************-->

<section id="feeds">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <h3><span><img src="images/feeds.png" class="img-responsive" alt="yesautomation"></span></h3>
        <div class="soc">
          <a href="https://www.instagram.com/yes_automationuae/" target="blank" class="le"><i class="demo-icon icon-instagram">&#xe812;</i></a>
          <a class="le" target="blank" href="https://www.linkedin.com/company/yes-automation/"><i class="demo-icon icon-linkedin">&#xf0e1;</i></a>
          <a class="le" target="blank" href="https://www.youtube.com/@yesautomation4230"><i class="demo-icon icon-youtube">&#xf167;</i></a>
          <a href="https://www.facebook.com/YES-Automation-109242957330326/" class="le" target="blank"><i class="demo-icon icon-003-facebook">&#xe808;</i></a>

        </div>
      </div>
    </div>
  </div>

</section>




<section id="newsfeeds">
  <div class="container-fluid">

    <div class="row">

      <div class="owl-slider">
        <div id="carousel" class="owl-carousel">




          <?php

          include 'config.php';
          $sql = "select  *, news.id as newsid from news join news_image ON news.id=news_image.nid group by news.id ORDER BY news.tstamp desc limit 6";
          $result = mysqli_query($con, $sql);

          $i = 0;

          foreach ($result as $value) {


            $t = substr($value['tstamp'], 0, 10);
            $date = date("d-m-Y", strtotime($t));

            $day = date("d", strtotime($t));
            $month_num = date("m", strtotime($t));
            $year = date("Y", strtotime($t));
            $month_name = date("F", mktime(0, 0, 0, $month_num, 10));


            $des = substr($value['description'], 0, 300);

            $arr[$i] = array(
              'image' => UPLOADS . "/news/" . $value['file'],
              'date' => $date,
              'title' => $value['title'],
              'desc' => $value['description']
            );
            $i++;
          ?>





            <div class="item">
              <div class="container">
                <div class="column">
                  <div class="min">
                    <div class="ico">
                      <img src="images/news/icon.png" alt="yesautomation">
                    </div>
                    <div class="hed">
                      <h3>@yesautomation <span class="date"><?php echo $day . " " . $month_name . " " . $year; ?></span></h3>
                      <p>Dubai, United Arab Emirates - UAE</p>
                    </div>
                  </div>
                  <!-- <img src="images/news/news-1.jpg" alt="news"> -->
                  <img src="<?php echo UPLOADS . "/news/" . $value['file']; ?>" width="300">
                  <div class="min">
                    <img src="images/news/insta.png" class="lov" alt="news">
                    <div class="li">
                      <h3 class="like"><?php echo $value['likes']; ?> likes</h3>
                    </div>
                    <div class="hedsc">
                      <h3><?php echo $value['title']; ?></h3>
                      <p><?php echo $des; ?></p>
                      <p class="red">
                        <a href="<?php echo $value['linkedin']; ?>" target="blank">Read more on <img class="linked" src="images/linked-in.png" alt="linked-in"></a>
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            </div>


          <?php } ?>




          <!-- 
                      <a href="#" target="blank"><div class="item">
                          <div class="container">
                                <div class="column">
                                  <div class="min">
                                    <div class="ico">
                                      <img src="images/news/icon.png" alt="news">
                                    </div>
                                    <div class="hed">
                                      <h3>@yesautomatikon <span class="date">02th July 2020</span></h3>
                                      <p>Dubai, United Arab Emirates - UAE</p>
                                    </div>
                                </div>          
                                <img src="images/news/news-2.jpg" alt="news">
                                <div class="min">
                                  <img src="images/news/insta.png" class="lov" alt="news">
                                  <div class="li">
                                      <h3 class="like">13 likes</h3>
                                    </div>
                                  <div class="hedsc">
                                    <h3>YES AUTOMATION</h3>
                                      <p>Focused on Speciality Equipment Rentals. It can be a short term need or it can be where you are limited by a small budget. Why to buy when you can rent it from us. Give us a call and lets talk !!</p>
                                      <p class="red">Read more on <img class="linked" src="images/linked-in.png" alt="news"></p>
                                  </div>

                                </div>

                              </div>
                              
                          </div>
                        </div>
                      </a>

                      <a href="#" target="blank"><div class="item">
                          <div class="container">
                              <div class="column">
                                  <div class="min">
                                    <div class="ico">
                                      <img src="images/news/icon.png" alt="news">
                                    </div>
                                    <div class="hed">
                                      <h3>@yesautomatikon <span class="date">25th June 2020</span></h3>
                                      <p>Dubai, United Arab Emirates - UAE</p>
                                    </div>
                                </div>          
                                <img src="images/news/news-3.jpg" alt="news">
                                <div class="min">
                                  <img src="images/news/insta.png" class="lov" alt="news">
                                  <div class="li">
                                      <h3 class="like">15 likes</h3>
                                    </div>
                                  <div class="hedsc">
                                      <h3>YES AUTOMATION</h3>
                                      <p>Focused on Speciality Equipment Rentals. It can be a short term need or it can be where you are limited by a small budget. Why to buy when you can rent it from us. Give us a call and lets talk !!</p>
                                      <p class="red">Read more on <img class="linked" src="images/linked-in.png" alt="news"></p>
                                  </div>

                                </div>

                              </div>

                          </div>
                        </div>
                      </a>
                          -->


        </div>

      </div>

    </div>

    <div class="col-md-12">
      <a href="news.php">
        <div class="read">
          More
        </div>
      </a>
    </div>



  </div>
</section>


<input type="hidden" value="2" id="plus">


<script>
  function openModal() {
    document.getElementById('myModal').style.display = "block";
  }

  function closeModal() {
    $('#plus').val("2");
    document.getElementById('myModal').style.display = "none";
  }

  var slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {


    var plus = $('#plus').val();

    var plus = parseInt(plus);

    $('#plus').val(plus + 1);

    if (plus > 6) {


      window.location.href = "https://www.yesmachinery.ae/news.php";

    } else {

      showSlides(slideIndex += n);

    }

  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    let nxt = slideIndex - 1;
    if (slides[nxt]) {
      slides[nxt].style.display = "block";
    }
    if (dots[nxt]) {
      dots[nxt].className += " active";
      captionText.innerHTML = dots[nxt].alt;
    }

  }
</script>




<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>


<!--***************************************-->

<script>
  // Instantiate the Bootstrap carousel
  //$('.multi-item-carousel').carousel();
  $('.multi-item-carousel').carousel({
    interval: false
  });

  // for every slide in carousel, copy the next slide's item in the slide.
  // Do the same for the next, next item.
  $('.multi-item-carousel .item').each(function() {

    var next = $(this).next();

    if (!next.length) {
      next = $(this).siblings(':first');

    }
    next.children(':first-child').clone().appendTo($(this));

    if (next.next().length > 0) {


      next.next().children(':first-child').clone().appendTo($(this));

    } else {
      $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    }


  });
</script>

<script>
  $(document).ready(function() {
    //     $('.multi-item-carousel').carousel({
    //   interval: 2500
    // });
    $('#ne').click(function() {

      var rightCount = $('#pic_count_right').val();
      if (rightCount > 5) {
        $('#ne').click(function() {
          //alert('end');
          $('#theCarousel').carousel({
            pause: true,
            interval: false
          });
          //window.location.replace("https://www.yesmachinery.ae/news.php");
          window.location.href = "https://www.yesmachinery.ae/news.php";

        });
      } else {
        rightCount++;

        $('#pic_count_right').val(rightCount);
      }

    });
    $('#pre').click(function() {

      var leftCount = $('#pic_count_left').val();
      if (leftCount > 5) {
        $('#pre').click(function() {
          $('#theCarousel').carousel({
            pause: true,
            interval: false
          });
          //window.location.replace("https://localhost/yes-l/news.php");
          window.location.href = "https://www.yesmachinery.ae/news.php";
        });
      } else {
        leftCount++;

        $('#pic_count_left').val(leftCount);
      }

    });
  });
</script>


<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>

<script>
  jQuery("#carousel").owlCarousel({
    autoplay: true,
    lazyLoad: true,
    loop: true,
    margin: 20,
    /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
    responsiveClass: true,
    autoHeight: true,
    autoplayTimeout: 7000,
    smartSpeed: 800,
    nav: true,
    responsive: {
      0: {
        items: 1
      },

      600: {
        items: 2
      },

      1024: {
        items: 3
      },

      1366: {
        items: 3
      }
    }
  });
</script>