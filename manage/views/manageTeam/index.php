<!doctype html>
<script>
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id))
            return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.3";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>
<?php
include("includes/connection.php");
?>
<?php

function GetStringBetween($string, $start, $finish) {
    $string = " " . $string;
    $position = strpos($string, $start);
    if ($position == 0)
        return "";
    $position += strlen($start);
    $length = strpos($string, $finish, $position) - $position;
    return substr($string, $position, $length);
}
$sqlse=mysql_query("Select *from seo order by id desc limit 1");
$resultse=mysql_fetch_array($sqlse);
?>

<html>
    <head>
        <meta charset="utf-8">
        <meta property="og:title" content="bestdeals2shop:best deals "/>
       <!-- <meta property="og:image" content="http://bestdeals2shop.com/images/shop2amaze.png"/>-->
        <meta property="og:description" content="Serach your Favourate deals"/>
        <meta property="og:site_name" content="bestdeals2shop"/>
        <link rel="icon" href="images/yesarabia.ico" type="image/x-icon"/>
        <?php if(isset($resultse)){
           ?>
        <title><?php echo $resultse['page_title'];?></title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="title" content="<?php echo $resultse['metaname']; ?>">
    <meta name="description" content="<?php echo $resultse['description']; ?>">
    <meta name="keywords" content="<?php echo $resultse['keywords']; ?>">
    
<!-- <meta name="description" content="Deals, Best Deals, Shopping, Amaze, Amazon, Walmart, Fry's, Bestbuy.com, Costco, Dealsea, deal plus, dealnews, deals2buy, travel deals, ">-->
<!-- <meta name="keywords" content="vegas travel deals, tickets & travel, Air, Flight, Laptop, Television, Emirates, Southwest, Singapore Airlines, home electronics, electronics accessories, plasma electronics, electronics kids, Toys , ToysrUS, hamilton electronics, electronics desktop computers, Refurbished, home garden home, kitchen home garden, apparel juniors, men's apparel, clothing & apparel, clearance apparel, boys' apparel, socks apparel, shoes apparel, Nike, Sketchers, t shirts apparel, Ebay, Clearance, Kohls, Tigerdirect, Carters, Hotel, Travel, Bed Bath, Automotive, Electrical, Insurance">-->
 <?php } ?>

        <!-- Bootstrap CSS -->
        <link rel=stylesheet  href="css/bootstrap.min.css" >
        <link rel=stylesheet  href="css/bootstrap-theme.min.css" >
        <link rel=stylesheet  href="css/bootstrap-select.min.css" >
        <!-- Theme CSS -->
        <link rel=stylesheet  href="css/style.css" >
        <link rel=stylesheet  href="css/font-awesome.min.css" >
        <!-- Bootstrap JavaScript -->
        <script src="js/min.js"></script>
        <script src="js/bootstrap.min.js"></script>
<!--        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>-->

        <script type="text/javascript">
            function like(ids){
                 
                $.ajax({
           
                    type: 'POST',
                    url:"update_like.php",
                    async: false,
                    data: {ids:ids}  ,
                    dataType: 'json',
                    success: function(res){
                        if(res == 'false') {
                            //alert('liked succesfully');
                            alert('already liked this item');
                        } else {
                            //alert('already liked this item');
                            $('#like_'+ids).html('<i class="fa fa-thumbs-up"></i>'+res); 
                        }
                        //window.location.reload();
                    }
                });
                //      alert('Item added succesfully');
            }
            $(document).ready(function () {
                setTimeout(function () {
                    $('.loading').hide();
                    $('.contenttabbg').fadeIn();
                }
                , 2000);
            });
        </script>
        <script>
            $(function() {
        
        
                $('.coupan-effct').has('.effect1').mouseover(function(){
                    $(this).children('.effect1').css('left','-10px');
                })
                .mouseout(function(){
                    $(this).children('.effect1').css('left','0px');
                })
                .click(function(){
                    $(this).children('.effect1').css('left','-250px').css('visibility','hidden');
                })
   
   
        
            }); 
        </script>

    </head>

    <body>
        <?php
        $page_name = 'index';
        include 'header.php';
        ?>


        <div class="container">

            <div class="row">
                <div class="col-md-12">
                    <div class="serching-tab" style="display:none;">
                        <div class="bs-docs-example">

                            <form action="index.php" method="get">
                                <select name="id"class="selectpicker" data-style="btn-info" style="display: none;" onChange="this.form.submit(1)">
                                    <option>-More Categories-</option>
                                    <?php
                                    $result = mysql_query("select * from tbl_category order by pk_int_category_id DESC ");
                                    while ($fetch = mysql_fetch_array($result)) {
                                        ?>

                                        <option value="<?php echo $fetch['pk_int_category_id'] ?>"><?php echo $fetch['vchr_category_name'] ?> </option>



                                    <?php } ?>

                                </select>
                            </form>
                        </div>
                        <?php
                        $sql = mysql_query("select * from adds order by id desc");
                        $result = mysql_fetch_array($sql);
                        ?>
                    </div>
                </div>
                <div class="col-md-9" style="margin-bottom: 25px;">
                    <div class="cntnt-tab">
                        <div class="row"> 
                            <div class="col-md-12"> 
                                <ul class="deal-tap clearfix">
                                    <?php
                                    $iid = (isset($_GET['id'])) ? $_GET['id'] : '';
                                    ?>
                                    <?php if (isset($_GET['type'])) { ?>
                                        <li <?php echo (empty($iid)) ? 'class="active"' : ''; ?>><a href="index.php?type=1">All</a> <span><img src="images/arrow.png" width="100%"></span></li>
                                    <?php } else { ?>
                                        <li <?php echo (empty($iid)) ? 'class="active"' : ''; ?>><a href="index.php">All</a> <span><img src="images/arrow.png" width="100%"></span></li>

<?php
}
$results = mysql_query("select * from tbl_category order by order_no asc LIMIT 6");
while ($fetch = mysql_fetch_array($results)) {
    ?>
                                        <?php if (isset($_GET['type'])) { ?>
                                            <li <?php echo ($iid == $fetch['pk_int_category_id']) ? 'class="active"' : ''; ?>><a href="index.php?id=<?php echo $fetch['pk_int_category_id'] ?>&& type=1"> 
                                                    <?php echo $fetch['vchr_category_name'] ?></a> <span><img src="images/arrow.png" width="100%"></span></li>
                                                <?php } else { ?>
                                            <li <?php echo ($iid == $fetch['pk_int_category_id']) ? 'class="active"' : ''; ?>><a href="index.php?id=<?php echo $fetch['pk_int_category_id'] ?>"> 
                                                    <?php echo $fetch['vchr_category_name'] ?></a> <span><img src="images/arrow.png" width="100%"></span></li>



                                            <?php
                                        }
                                    }
                                    ?>

                                </ul>
                            </div>

                        </div>
                    </div>



                    <?php
                    $datepage = date("Y-m-d");

                    if (isset($_GET['perpge'])) {

                        $per_page = $_GET['perpge'];
                    } else {
                        $per_page = 20;
                    }

                    if (isset($_GET['page'])) {
                        $page = $_GET['page'];
                    } else {
                        $page = 1;
                    }
                    $start_from = ($page - 1) * $per_page;
                    if (isset($_GET['type'])) {
                        $type = $_GET['type'];
                        $sql = "select * from tbl_deals where deal_type=1 and expiry_date>='$datepage' order by insert_time desc LIMIT $start_from,$per_page";
                        $query = mysql_query($sql);
                    } else {
                        $sql = "select * from tbl_deals where  expiry_date>='$datepage' order by insert_time desc LIMIT $start_from,$per_page";
                        $query = mysql_query($sql);
                    }
                    if (isset($_GET['id']) && isset($_GET['type'])) {
                        $ids = $_GET['id'];
                        $ty = $_GET['type'];
                        $sql = "select * from tbl_deals where fk_category_id=$ids and deal_type=$ty and expiry_date>='$datepage' order by insert_time desc LIMIT $start_from,$per_page";

                        $query = mysql_query($sql);
                    }
                    if (isset($_GET['id']) && empty($_GET['type'])) {
                        $ids = $_GET['id'];
                        $sql = "select * from tbl_deals where fk_category_id=$ids and expiry_date>='$datepage' order by insert_time desc LIMIT $start_from,$per_page";

                        $query = mysql_query($sql);
                    }

                    while ($fetch = mysql_fetch_array($query)) {




                        $type1 = $fetch['deal_type'];
                        $id = $fetch['pk_int_deal_id'];
                        $discount = $fetch['int_discount'];
                        $code = $fetch['coupen_code'];
                        $date = $fetch['expiry_date'];




                        $d = date("Y/m/d");
                        $sqld = mysql_query("SELECT DATEDIFF('$date','$d') AS days");
                        $resultdate = mysql_fetch_array($sqld);


                        $d1 = $d; // Today 

                        $d2 = $date; // Expiry

                        $datetime1 = new DateTime($d1);
                        $datetime2 = new DateTime($d2);
                        $difference = $datetime1->diff($datetime2);


                        $day = ($datetime1 > $datetime2) ? '-' . $difference->d : $difference->d;



                        if ($fetch['expiry_date'] >= date("Y-m-d")) {
                            ?>
                            <div class="loading" style="text-align: center;padding: 200px 0px;">
                                <img src="images/loading_spinner.gif"/>
                            </div>
                            <div class="row contenttabbg"  style="display: none;">
                                <div class="col-xs-12 col-md-12">
                                    <div class="main-deals clearfix">
                                       

                                            <div class="col-xs-4 col-md-3">



                                                <!--                               if there uploaded image and heading with deal links                             -->

                                                <?php
                                                if ($fetch['vchr_image']) {
                                                    $img = explode('.', $fetch['vchr_image']);
                                                    if ($img[1] == 'jpg' || ($img[1] == 'jpeg') || ($img[1] == 'png')) {
                                                        ?>


                                                        <?php if (($fetch['deal_link'])) { ?>
                                                            <div class="deal-pics"> 

                                                                <a href="<?php echo $fetch['deal_link']; ?>" target="_blank">
                                                                    <img src="http://bestdeals2shop.com/manage/public/uploads/<?php echo $fetch['vchr_image'] ?>"> 
                                                                </a>



                                                            </div>

                                                        <?php } else {
                                                            $ff1 = $fetch['vchr_deal_heading'];
                                                            $linkim = GetStringBetween($ff1, 'href="', '"');
                                                            ?>
                                                            <div class="deal-pics"> 

                                                                <a href="<?php echo $linkim ?>" target="_blank">
                                                                    <img src="http://bestdeals2shop.com/manage/public/uploads/<?php echo $fetch['vchr_image'] ?>"> 
                                                                </a>



                                                            </div>



                <?php }
            } else { ?>
                                                        <div class="deal-pics"> 
                                                            <a href="" target="_blank">
                                                        <?php echo $fetch[4]; ?>

                                                        </div>
                                                        <?php
                                                    }
                                                } else {
                                                    ?>
                                                    <div class="deal-pics"> 
                                                        <a href="<?php echo $fetch['deal_link'] ?>" target="_blank">
                                                            <img src="http://bestdeals2shop.com/images/image-dummy.png"> 
                                                        </a>
                                                    </div>
        <?php } ?>


                                            </div>
                                            <div class="col-xs-8 col-md-7" style="min-height:136px">
                                                <?php
                                                if ($fetch['vchr_image']) {
                                                    $img = explode('.', $fetch['vchr_image']);
                                                    if ($img[1] == 'jpg' || ($img[1] == 'jpeg') || ($img[1] == 'png')) {
                                                        ?>

                                                        <h3> <a href="<?php echo $fetch['deal_link']; ?> " target="_blank"><?php echo $fetch['vchr_deal_heading']; ?></a> </h3>
                                                        <?php
                                                    } else {

                                                        $ff = $fetch[4];
                                                        $link = GetStringBetween($ff, 'href="', '">');
                                                        ?>
                                                        <h3> <a href="<?php echo $link; ?>" target="_blank"><?php echo $fetch['vchr_deal_heading']; ?></a> </h3>
                                                    <?php }
                                                }
                                                ?>

                                                    <?php if (strlen($fetch['vchr_deal_description']) > 100) { ?>

                                                    <span class="more" id="more" style="display: block !important; overflow:hidden">
                                                    <?php echo $fetch['vchr_deal_description']; ?>
                                                    </span>
        <?php } else { ?>
                                                    <p> <?php echo $fetch['vchr_deal_description']; ?> </p>
        <?php } ?>

                                                <div id="<?php echo $fetch['pk_int_deal_id']; ?>" style="display:none;" >
                                                    <p id="tt" >

        <?php echo $fetch['vchr_deal_description']; ?>
                                                    </p>

                                                </div>
                                               
                                                    <div class="coupon-session col-xs-12 pad-lft-0">
        <?php if ($code) { ?>

                                                            <div class="col-xs-7 col-md-4 pad-lft-0">
                                                                <div class="coupan-effct">
                                                                    <div class="effect1" style="position:absolute; left:0; top:0; z-index:999;"><img src="images/coupen-btn.png" ></div>
                                                                    <div class=" coupen-code">
                                                                        <strong><?php echo $code; ?></strong></div></div></div>
                                                        <?php } else { ?>
                                                            <div class="col-xs-6 col-md-4 pad-lft-0 coupen-code-hide"><img src="images/coupen-btn-2.png" ></strong></div>
                                                        <?php } ?>
                                                        <?php
                                                        $discount1 = $fetch['int_discount'];

                                                        $d = $discount1;


                                                        $t1 = substr($d, 0, -1); // return 20
                                                        $t2 = substr($d, strlen($d) - 1, 1);
                                                        ?>
                                                        <?php
                                                        if ($d) {


                                                            if ($t2 == '%') {
                                                                ?>

                                                                <div class="col-xs-5 col-md-3 discount"> <strong> <?php echo $d . '&nbsp'; ?> OFF </strong></div>
                                                            <?php } else { ?>
                                                                <div class="col-xs-5 col-md-3 discount"> <strong> <?php echo $t2 . $t1 . '&nbsp'; ?>OFF</strong></div>
                                                                <?php
                                                            }
                                                        }
                                                        ?>

                                                        <?php if ($day == 0) { ?>
                                                            <div class="col-xs-6 col-md-3 expire"> Expire in : <strong><?php echo 'Today'; ?></strong></div>
                                                        <?php } elseif ($resultdate['days'] == 1) { ?>
                                                            <div class="col-xs-6 col-md-3 expire"> Expire in : <strong><?php echo '1' . '&nbsp' . 'day'; ?></strong></div>
                                                            <?php
                                                        } else {
                                                            $no = $day;
                                                            ?>
                                                            <div class="col-xs-6 col-md-3 expire"> Expire in : <strong><?php echo $resultdate['days'] . '&nbsp' . 'days'; ?></strong></div>
        <?php } ?>
                                                    </div>
                                                </div>
                                           
                                            <div class="col-xs-12 col-md-2"> 

                                                <div class="row" id="desk-deal"> 
                                                    <div class="clearfix"  >
                                                        <div class="col-md-12 col-xs-12"> 
                                                            <div class="clearfix lft" >
                                                                <?php
                                                                $getlike = mysql_query("select count(`ip_address`) as l from tbl_like where `fk_deal_id`=$id");
                                                                $likeresult = mysql_fetch_array($getlike);
                                                                ?>
                                                                <div class="share-link clearfix col-md-12 col-xs-6">
                                                                    <a id="like_<?php echo $id; ?>" onclick="like(<?php echo $id; ?>)" class="like" href="javascript:void(0);">
                                                                        <i class="fa fa-thumbs-up"></i><?php echo $likeresult['l']; ?>
                                                                    </a> 

                                                                    <div class="fb-share-button" style="padding-top:2px" data-href="http://bestdeals2shop.com/offer.php?id=<?php echo $id; ?>" 
                                                                         data-layout="button">
                                                                    </div>

                                                                </div>
                                                                <?php if ($fetch['freeship'] == 1) { ?>

                                                                  <div class="free-ship  col-md-12 col-xs-3"> <img width="23" height="20" src="images/free-delivery.png"> Free Delivery</div> 
                                                                <?php } else { ?>
                                                                    <div class="free-ship-hide  col-md-12 col-xs-3"> <img width="23" height="20" src="images/free-delivery-hide.png"> Free Delivery</div> 

        <?php } if ($type1 == 1) {
            ?>
                                                                    <div class="hot-deal  col-md-12 col-xs-3"> 
                                                                        <img width="20" height="24" src="images/hotdeal-icon.png"> Hotdeal 
                                                                    </div> 
        <?php } else { ?>
                                                                    <div class="hot-deal-hide  col-md-12 col-xs-3"> 
                                                                        <img width="20" height="24" src="images/hotdeal-icon-hide.png"> Hotdeal 
                                                                    </div> 
        <?php } ?>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </div>
                            
<!--                                                mobile code                    -->
                                                <div class="row" id="mob-deal"> 
                                            <div class="clearfix"  >
                                                <div class="col-md-12 col-xs-9 col-xs-offset-3"> 
                                                    <div class="clearfix lft" > 
                                                        <?php
                                                        $getlike = mysql_query("select count(`ip_address`) as l from tbl_like where `fk_deal_id`=$id");
                                                        $likeresult = mysql_fetch_array($getlike);
//                  echo'<pre>';
//                  print_r($likeresult);exit;
                                                        ?>
                                                        <div class="share-link clearfix col-md-12 col-xs-7">
                                                            <a id="like_<?php echo $id; ?>" onClick="like(<?php echo $id; ?>)" class="like" href="javascript:void(0);">
                                                                <i class="fa fa-thumbs-up"></i><?php echo $likeresult['l']; ?>
                                                            </a> 
<!-- <a class="share" href="http://bestdeals2shop.com/offer.php?id=<?php echo $id; ?>"><i class="fa fa-share"></i> SHARE</a>-->
                                                       <div class="fb-share-button" style="padding-top:2px" data-href="http://bestdeals2shop.com/offer.php?id=<?php echo $id; ?>" 
                                                                 data-layout="button">
                                                         </div>
                                                        
                                                        
                                                        </div>
                     <?php if ($fetch['freeship'] == 1) { ?>

                                                            <div class="free-ship  col-md-12 col-xs-3"> <img width="22" height="20" src="images/free-delivery.png"> </div> 
                     <?php } else { ?>
                                                            <div class="free-ship-hide  col-md-12 col-xs-3 "> <img width="22" height="20" src="images/free-delivery-hide.png"> </div> 

                                                        <?php } if ($type1 == 1) {
                                                            ?>
                                                            <div class="hot-deal  col-md-12 col-xs-2"> 
                                                                <img width="20" height="24" src="images/hotdeal-icon.png"> 
                                                            </div> 
        <?php } else { ?>
                                                            <div class="hot-deal-hide  col-md-12 col-xs-2"> 
                                                                <img width="20" height="24" src="images/hotdeal-icon-hide.png"> 
                                                            </div> 
        <?php } ?>
                                                    </div>
                                                </div>
                                            </div> </div>
                                          
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                                <?php
                            }
                        }
                        ?>
                        <?php {
                            if (isset($_GET['id']) && isset($_GET['type'])) {

                                $ids = $_GET['id'];
                                $ty = $_GET['type'];
                                $sql = "select * from tbl_deals where fk_category_id=$ids and deal_type=$ty and expiry_date>='$datepage'";
                            } elseif ((isset($_GET['id']) && empty($_GET['type']))) {

                                $ids = $_GET['id'];
                                $sql = "select * from tbl_deals where fk_category_id=$ids and deal_type=0 and expiry_date>='$datepage'";
                            } elseif (isset($_GET['type'])) {

                                $sql = "select * from tbl_deals where deal_type=1 and expiry_date>='$datepage'";
                            } else {

                                $sql = "select * from tbl_deals where  expiry_date>='$datepage'";
                            }




//                                                    $sql = "select * from tbl_deals";
                            $results = mysql_query($sql);

                            $total_records = mysql_num_rows($results);


                            $total_pages = ceil($total_records / $per_page);
                        }
                        ?>

                        <div class="row">
                            <?php
                            if ($total_records > 5) {


                                if (isset($_GET['type'])) {
                                    ?>     

                                    <div class="col-md-6"> 
                                        <ul class="pagination" style="display:block">
                                            <li><a href="#">&laquo;</a></li>

                                                <?php for ($i = 1; $i <= $total_pages; $i++) {
                                                    ?>
                                                <li <?php if ($page == $i) { ?> class="active" <?php } ?>>
                                                    <?php
                                                    if (isset($_GET['perpge']) && !empty($_GET['perpge'])) {
                                                        $url = 'index.php?perpge=' . $_GET['perpge'] . '&page=' . $i;
                                                    } else {
                                                        $url = 'index.php?type=1 &page=' . $i;
                                                    }
                                                    ?>
                                                    <a href="<?php echo $url; ?>"><?php echo $i; ?></a>
                                                </li><?php } ?>
                                            <li><a href="">&raquo;</a></li>
                                        </ul>
                                    </div>
    <?php } if (empty($_GET['type']) && (isset($_GET['id']))) { ?>
                                    <div class="col-md-6"> 
                                        <ul class="pagination" style="display:block">
                                            <li><a href="#">&laquo;</a></li>

                                                <?php for ($i = 1; $i <= $total_pages; $i++) {
                                                    ?>
                                                <li <?php if ($page == $i) { ?> class="active" <?php } ?>>
                                                    <?php
                                                    if (isset($_GET['perpge']) && !empty($_GET['perpge'])) {
                                                        $url = 'index.php?perpge=' . $_GET['perpge'] . '&page=' . $i;
                                                    } else {
                                                        $url = 'index.php?page=' . $i . '&&id=' . $_GET['id'];
                                                    }
                                                    ?>
                                                    <a href="<?php echo $url; ?>"><?php echo $i; ?></a>
                                                </li><?php } ?>
                                            <li><a href="">&raquo;</a></li>
                                        </ul>
                                    </div>
    <?php } if (empty($_GET['id']) && (empty($_GET['type']))) { ?>
                                    <div class="col-md-6"> 
                                        <ul class="pagination" style="display:block">
                                            <li><a href="#">&laquo;</a></li>

                                                <?php for ($i = 1; $i <= $total_pages; $i++) {
                                                    ?>
                                                <li <?php if ($page == $i) { ?> class="active" <?php } ?>>
                                                    <?php
                                                    if (isset($_GET['perpge']) && !empty($_GET['perpge'])) {
                                                        $url = 'index.php?perpge=' . $_GET['perpge'] . '&page=' . $i;
                                                    } else {
                                                        $url = 'index.php?page=' . $i;
                                                    }
                                                    ?>
                                                    <a href="<?php echo $url; ?>"><?php echo $i; ?></a>
                                                </li><?php } ?>
                                            <li><a href="">&raquo;</a></li>
                                        </ul>
                                    </div>
    <?php }
}
?>


                            <div class="col-md-6"> 
                                    <?php if ($total_records > 10) { ?>
                                    <div class="drop pull-right">
                                        <label>Items Per Page</label>
    <?php if (empty($_GET['type'])) { ?>
                                            <div class="dropdown pull-right">
                                                <form action="index.php" method="get">
                                              
        <?php $f = isset($_GET['perpge']) ? $_GET['perpge'] : ''; ?>
                                                    <select name="perpge" onChange="this.form.submit(1)">

                                                        <option >20</option>
                                                        <option <?php echo ($f == 40) ? 'selected="selected"' : ''; ?>>40</option>
                                                        <option <?php echo ($f == 60) ? 'selected="selected"' : ''; ?>>60</option>
                                                        <option <?php echo ($f == 80) ? 'selected="selected"' : ''; ?>>80</option>
                                                        <option <?php echo ($f == 100) ? 'selected="selected"' : ''; ?>>100</option>
                                                    </select>
                                                </form>
                                              
                                            </div>
    <?php } elseif (isset($_GET['type'])) { ?>
                                            <div class="dropdown pull-right">
                                                <form action="index.php" method="get">
                                              
        <?php $f1 = isset($_GET['perpge']) ? $_GET['perpge'] : ''; ?>
                                                    <select name="perpge" class="selectCategory">

                                                        <option >20</option>
                                                        <option <?php echo ($f1 == 40) ? 'selected="selected"' : ''; ?>>40</option>
                                                        <option <?php echo ($f1 == 60) ? 'selected="selected"' : ''; ?>>60</option>
                                                        <option <?php echo ($f1 == 80) ? 'selected="selected"' : ''; ?>>80</option>
                                                        <option <?php echo ($f1 == 100) ? 'selected="selected"' : ''; ?>>100</option>
                                                    </select>
                                                </form>
                                              
                                            </div>
    <?php } ?>
                                    </div>
<?php } ?>
                            </div>
                        </div>


                    </div>





            <?php include 'side.php' ?>

                </div>
            </div>
<?php include 'footer.php' ?>

            <script src="js/bootstrap-select.js"></script>
            <script type="text/javascript">
                window.onload = function () {
                    $('.selectpicker').selectpicker({
                        style: 'btn-primary',
                        size: 4
                    });
                };



            </script>
            <script>
                $(document).ready(function(){
                    $("#myD12").click(function(){ 
        
                        var data_id = $('#tt').val();
        
                        //$("#as").toggle(1000);
                        // $(this).next().toggle('slow');
                    });});
    
                function Test(id)
                {
                    var data_id = id;
                    alert(data_id);
   
                    $("#"+data_id).toggle(1000); }

            </script>

    </body>
</html>



<style>
    .article {
        display: table;
        padding: 3px;
        margin: 2px;
    }
    .article .text {
        font-size: 12px;
        line-height: 17px;
        font-family: arial;
    }

    .article .text.short {        
        overflow: hidden;
    }
    .article .text.ful {
        display: none;
    }

    .ellipsis {
        color: #06c;
        font-weight: bold;
        font-size: 14px;
    }
</style>

<style>
    .morecontent span {
        display: none;
    }
    .morelink {

        display: inline;
    }

</style>

<script type="text/javascript">
  
    $(document).ready(function() {
        // Configure/customize these variables.
        var showChar = 100;  // How many characters are shown by default
        var ellipsestext = "";
        var moretext = "More";
        var lesstext = "Less";
    
          
        $('.more').each(function() {
            var content = $(this).html();
 
            if(content.length > showChar) {
 
                var c = content.substr(0, showChar);
                var h = content.substr(showChar, content.length - showChar);
 
                var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
 
                $(this).html(html);
            }
 
        });
          
        
 
        $(".morelink").click(function(){
            if($(this).hasClass("less")) {
                $(this).removeClass("less");
                $(this).html(moretext);
            } else {
                $(this).addClass("less");
                $(this).html(lesstext);
            }
            $(this).parent().prev().toggle();
            $(this).prev().toggle();
            return false;
        });
    });

    /*$(document).ready(function(){
        $("#expanderHead").click(function(){
                $("#expanderContent").slideToggle();
                if ($("#expanderSign").text() == "+"){
                        $("#expanderSign").html("-")
                }
                else {
                        $("#expanderSign").text("+")
                }
        });
});*/
</script>

<script>
    $(document).ready(function() {
        $('.selectCategory').change(function(){
            var id = $(this).val();
            location.href = '/index.php?type=1&perpge='+id;
        });
    });
    
    
    
</script>