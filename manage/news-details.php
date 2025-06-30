<?php 
error_reporting(0);
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="icon" href="images/yesarabia.ico" type="image/x-icon"/>
<title>yesmachinery.ae</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Theme CSS -->
<link rel=stylesheet  href="css/style.css" >
<link rel="stylesheet" href="css/magnific-popup.css">
<!-- Bootstrap CSS -->
<link rel=stylesheet  href="css/bootstrap.min.css" >
<link rel=stylesheet  href="css/bootstrap-theme.css" >
<!-- Bootstrap JavaScript -->
<!--<script src="js/min.js"></script>-->

<!--<script src="js/popup1.0.js"></script>-->


</head>
<body>
<?php $page = 'news'; ?>
<?php include 'header.php' ?>
<?php include 'config.php' ?>
<div class="inner_banner"><div class="container"><div class="row"><div class="col-md-12"><h2 id="product-tittle">News & Resources</h2>
      </div>
    </div>
  </div>
</div>
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <ol class="breadcrumb">
        <li><a href="index.php">Home</a></li>
        <li class="active">News & Resources</li>
      </ol>
    </div>
  </div>
</div>
<div class="container">
  <div class="about_continer">
    <div class="row">
      <div class="col-md-9">
     <div class="news_filed" style="background: #eaeeef;">
     <div class="row">
     <?php 
$imageData="";
  if(isset($_GET['newid'])){
      $id=$_GET['newid'];
	  //echo $id; exit;
      $sql="select *,news.id as newsid from news join news_image ON news.id=news_image.nid  where news.id=$id ";
	  
      $reslt=mysql_query($sql);

      $fetch=mysql_fetch_array($reslt);
    ?>
   


      <a href="#"><h3><?php echo $fetch['title']; ?></h3>
          <h5 style=" font-weight: 400;
    color: #999;"><?php $date = date('j F, Y', strtotime($fetch['tstamp'])); echo 'Posted: '.$date; ?></h5>

          <div class="col-md-12">
            <p><?php echo $fetch['description']; ?> </p>
           <?php $img = "select * from news_image where nid='$id'";
                  
                  $imgrslt = mysql_query($img);
                 
        
                      //print_r($imgrslt);exit;
                      //$imageData = mysql_fetch_array($imgrslt);
                      ///print_r($imageData['file']);exit;
                      // $imageQueue = $imageData['file'];                   
                      
                    
           ?>            


                   
<div class="row"> 
     <?php
	 $count = 1;
                while($fetch=mysql_fetch_array($imgrslt)){
                        //    echo '<pre>';print_r($fetch);exit("hi");
                       //echo '<pre>';print_r($value);exit;
                            
                           ?>    
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                  <a class="image-link" href="<?php echo URL.'public/uploads/news/'.$fetch['file'];?>">

                                      <img width="100%" style="min-height:130px; max-height:130px; margin-bottom:20px;" src="<?php echo URL.'public/uploads/news/'.$fetch['file'];?>">

                                  </a>
                            </div>
							
                             <?php  if(($count%6)==0){
                                    echo'</div><div class="row">';
                            } ?>   
                             <?php  
                        
                            
                            $count++;
							} 
							
                            ?>




</div>  <!--/.row-->


         </div>
         
          
         
          
    <?php } ?></a>
     </div>
     </div>
     </div>
     <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" style="text-align: left;min-height: 200px;">
                <!--<div class="news_filed-left" > <h3>Recent News</h3>-->
                <div class="">
                    
                      <div class="well">
                       
                          <ul class="nav ">
                               <h3 class="nav-header">Recent News</h3>
                              
                            <?php  
                           $recent ="select * from news join news_image ON news.id=news_image.nid where news.id!='$id' order by tstamp desc limit 5";
							
                            $rnews = mysql_query($recent);
                 
        
                 
                      while($re = mysql_fetch_array($rnews)){ 
					   //print_r($re); exit;
                               //foreach($rnews as $nws){?>
								
                               <li ><a style="padding:4px 1px;" href="news-details.php?newid=<?php echo $re['nid'];?>"><?php echo $re['title'];?></a></li>
								<?php } ?>
                                
                          </ul>        
                      </div>  <!--./well-->
                    </div>
                </div>
          </div>     
     </div>      
  </div>
</div>
<?php include 'footer.php' ?>
  <script src="js/bootstrap.min.js"></script>  
 <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>   
 <script src="js/jquery.magnific-popup.js"></script>    
<script>
$(document).ready(function() {
  
  $('.image-link').magnificPopup({type:'image', gallery:{
  enabled:true,
  preload: [0,2], // read about this option in next Lazy-loading section

  navigateByImgClick: true,

  arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button

  tPrev: 'Previous (Left arrow key)', // title for left button
  tNext: 'Next (Right arrow key)', // title for right button
  tCounter: '<span class="mfp-counter">%curr% of %total%</span>'
  },
  mainClass: 'mfp-with-zoom', // this class is for CSS animation below

  zoom: {
    enabled: true, // By default it's false, so don't forget to enable it

    duration: 300, // duration of the effect, in milliseconds
    easing: 'ease-in-out', // CSS transition easing function

    // The "opener" function should return the element from which popup will be zoomed in
    // and to which popup will be scaled down
    // By defailt it looks for an image tag:
    opener: function(openerElement) {
      // openerElement is the element on which popup was initialized, in this case its <a> tag
      // you don't need to add "opener" option if this code matches your needs, it's defailt one.
      return openerElement.is('img') ? openerElement : openerElement.find('img');
    }
  }
        
         
           
   });
});
</script>    
 

</body>
</html>
