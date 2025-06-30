<link rel="stylesheet" type="text/css" href="slick/slick/slick.css">
<link rel="stylesheet" type="text/css" href="slick/slick/slick-theme.css">




<section id="partners">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <h2>Our Partners</h2>



        <ul class="bxslider">
          <li>
            <img src="images/clients/1.png" alt="yesautomation"> 
          </li>
          <li>
            <img src="images/clients/2.png" alt="yesautomation">
          </li>
          <li>
            <img src="images/clients/3.png" alt="yesautomation">
          </li>
          <li>
            <img src="images/clients/4.png" alt="yesautomation">
          </li>
          <li>
            <img src="images/clients/5.png" alt="yesautomation">
          </li>
          <li>
            <img src="images/clients/6.png" alt="yesautomation">
          </li>
          <li>
            <img src="images/clients/7.png" alt="yesautomation">
          </li>




        </ul>



      </div>
    </div>
  </div>
</section>



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
    speed: 20000
  });
</script>




<script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
<script src="slick/slick/slick.js"></script>

<script>
  $(document).on('ready', function() {

    var width = screen.width,
      height = screen.height;



    if (width >= 1024 && width <= 2560)

    {

      $(".center").slick({
        dots: true,
        autoplay: true,
        /* this is the new line */
        autoplaySpeed: 500,
        infinite: true,
        centerMode: true,
        slidesToShow: 6,
        slidesToScroll: 6
      });


    } else if (width >= 150 && width <= 767) {


      $(".center").slick({
        dots: true,
        autoplay: true,
        /* this is the new line */
        autoplaySpeed: 500,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1
      });


    } else if (width >= 768 && width <= 1023) {


      $(".center").slick({
        dots: true,
        autoplay: true,
        /* this is the new line */
        autoplaySpeed: 500,
        infinite: true,
        centerMode: true,
        slidesToShow: 2,
        slidesToScroll: 2
      });

    }


  });
</script>