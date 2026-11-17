<!DOCTYPE html>

<?php

$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

?>

<head>

    <title>

        <?php foreach ($this->kyword as $ky)

    if ($ky != 'companies') { {

            echo ucwords($ky) . ' ';

        }

    } ?>Companies in Qatar,Doha|Qatar Online Directory</title>

    <meta charset="utf-8" />

    <link rel="shortcut icon" href="<?php echo IMAGE ?>images/favicon.jpg"/>

    <meta name='viewport' content='width=1190'>

    <meta name="description" content="Search and find top <?php echo count($this->searchFeaturedResult1); ?> <?php foreach ($this->kyword as $ky)

    if ($ky != 'companies') { {

            echo ucwords($ky) . ' ';

        }

    } ?> Companies in Qatar.Get phone number and business details for <?php foreach ($this->kyword as $ky)

    if ($ky != 'companies') { {

            echo ucwords($ky) . ' ';

        }

    } ?> Suppliers, <?php foreach ($this->kyword as $ky)

    if ($ky != 'companies') { {

            echo ucwords($ky) . ' ';

        }

    } ?> Services in Doha, Qatar ">



    <meta name="keywords" content="<?php foreach ($this->kyword as $ky)

    if ($ky != 'companies') { {

            echo ucwords($ky) . ' ';

        }

    } ?> companies in Qatar, <?php foreach ($this->kyword as $ky)

        if ($ky != 'companies') { {

                echo ucwords($ky) . ' ';

            }

        } ?> Companies, <?php foreach ($this->kyword as $ky)

        if ($ky != 'companies') { {

                echo ucwords($ky) . ' ';

            }

        } ?> list of companies, Top <?php foreach ($this->kyword as $ky)

        if ($ky != 'companies') { {

                echo ucwords($ky) . ' ';

            }

        } ?> companies in Doha, Doha <?php foreach ($this->kyword as $ky)

        if ($ky != 'companies') { {

                echo ucwords($ky) . ' ';

            }

        } ?> Companies , Qatar <?php foreach ($this->kyword as $ky)

        if ($ky != 'companies') { {

                echo ucwords($ky) . ' ';

            }

        } ?> Companies, <?php foreach ($this->kyword as $ky) {

        echo $ky . ' ';

    } ?> business listings, Best <?php foreach ($this->kyword as $ky)

        if ($ky != 'companies') { {

                echo ucwords($ky) . ' ';

            }

        } ?> companies  in Qatar, ">

         <link rel="canonical" href="<?php echo $actual_link;?>" />

       <meta name="coverage" content="worldwide" />

	<meta name="robots" content="index, follow" />

	<meta name="rating" content="GENERAL" />

	<meta name="distribution" content="GLOBAL" />

	<meta name="classification" content="Directory" />

        <meta name="copyright" content="Blue Media Networks" />

	<meta name="author" content="http://localhost:82/Abaq/Abaq">

    

    <meta http-equiv="Cache-control" content="public">



    <script src="<?php echo JS . 'jquery.js'; ?>"></script>

    <script>

        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){

                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),

            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)

        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');



        ga('create', 'UA-63875765-1', 'auto');

        ga('send', 'pageview');



    </script>



<?php

if (isset($this->css)) {

    foreach ($this->css as $css) {

        echo '<link href="' . $css . '" rel="stylesheet" />';

    }

}

?>





<?php

if (isset($this->js)) {

    foreach ($this->js as $js) {

        echo '<script src="' . $js . '"></script>';

    }

}

?>



    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

    <script>

        var cb = function() {

            var l = document.createElement('link'); l.rel = 'stylesheet';

            l.href = '<?php echo CSS . 'css/qatpedia.css'; ?>';

            var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);

        };

        var raf = requestAnimationFrame || mozRequestAnimationFrame ||

            webkitRequestAnimationFrame || msRequestAnimationFrame;

        if (raf) raf(cb);

        else window.addEventListener('load', cb);

    </script>

    <script type="text/javascript" >

        $(function() {

            function split(val) {

                return val.split(/,\s*/);

            }

            function extractLast(term) {

                return split(term).pop();

            }



            $(".buisnessSearch")

            // don't navigate away from the field on tab when selecting an item

            .bind("keydown", function(event) {

                if (event.keyCode === $.ui.keyCode.TAB &&

                    $(this).data("ui-autocomplete").menu.active) {

                    event.preventDefault();

                }

            })

            .autocomplete({

                source: function(request, response) {

                    $.getJSON($('.buisnessSearch').attr('data-url'), {

                        term: extractLast(request.term)

                    }, response);

                },

                search: function() {

                    // custom minLength

                    var term = extractLast(this.value);

                    if (term.length < 1) {

                        return false;

                    }

                },

                focus: function() {

                    // prevent value inserted on focus

                    return false;

                }

            });



            $(".buisnessSearch2")

            // don't navigate away from the field on tab when selecting an item

            .bind("keydown", function(event) {

                if (event.keyCode === $.ui.keyCode.TAB &&

                    $(this).data("ui-autocomplete").menu.active) {

                    event.preventDefault();

                }

            })

            .autocomplete({

                source: function(request, response) {

                    $.getJSON($('.buisnessSearch2').attr('data-url'), {

                        term: extractLast(request.term)

                    }, response);

                },

                search: function() {

                    // custom minLength

                    var term = extractLast(this.value);

                    if (term.length < 1) {

                        return false;

                    }

                },

                focus: function() {

                    // prevent value inserted on focus

                    return false;

                }

            });



				

        });



    </script>









    <script type="text/javascript" src="http://qatpedia.com/views/home/js/index.js"></script>



    <link rel="stylesheet" href="http://qatpedia.com/views/business/css/jPages.css">



    <script type="text/javascript" src="http://qatpedia.com/views/business/js/highlight.pack.js"></script>

    <script type="text/javascript" src="http://qatpedia.com/views/business/js/tabifier.js"></script>

    <script src="<?php echo JS ?>jquery.js"></script>

    <script src="http://qatpedia.com/views/business/js/jPages.js"></script>









    <!--jquery.js-->



    <!--jquery.lightbox_me.js-->





    <!-- Bootstrap JavaScript -->

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js"></script>

    <!-- Go to www.addthis.com/dashboard to customize your tools -->





    <script>

        /* when document is ready */

        $(function() {

            /* initiate plugin */

            $("div.holder").jPages({

                containerID: "itemContainer"

            });

        });

    </script>





</head>



<body>



    <div class="top-nav">

        <div class="container">

            <div class="row">

                <div class="col-md-9">

                    <nav class="navbar navbar-default">

                        <div class="collapse navbar-collapse js-navbar-collapse">

                            <ul class="nav navbar-nav">

                                <li class="dropdown mega-dropdown"> <a href="http://www.qatpedia.com/company/listing/companies-in-qatar-by-category" class="dropdown-toggle" >Categories <i class="fa fa-angle-down"></i></a>

                                    <ul class="dropdown-menu mega-dropdown-menu row">





                                        <div class="row">

                                            <div class="col-md-12 ">

                                                <div class="header-dropbtn row">

                                                    <div  class="col-md-9"><h3>Looking for even more ? check out all here</h3></div>

                                                    <div class="col-md-3"><a class="btn btn-info btn-sml pull-right" href="<?php echo HOME ?> cat">View all categories &raquo;</a></div>

                                                </div>

                                            </div>

                                        </div>

                                    </ul>



                                </li>

                                <li> <a href="<?php echo URL; ?>about/qatar/about-qatar-online-business-directory">About QatPedia</a></li>

                                <li> <a href="<?php echo URL; ?>contact/free/list-companies-in-qatar-free">Get Listed For Free</a></li>

                                <li> <a href="<?php echo URL; ?>contact/qatar/contact-qatar-online-business-directory">Get in touch</a></li>





                            </ul>

                        </div>

                        <!-- /.nav-collapse --> 

                    </nav>

                </div>

                <div class="col-md-3 " >

                    <ul class="pull-right login_menu">



                        <li class="login"> <a href="<?php echo URL; ?>contact/free" > Get Listed For Free </a> <i class="fa fa-angle-right"></i></li>

                    </ul>

                </div>

            </div>

        </div>

    </div>

    <div class="banner">

        <div class="container">

            <div class="row">

                <div class="col-md-2 col-xs-12 main-logo"><a href="<?php echo URL ?>" class="logo"><img src="<?php echo IMAGE ?>images/qat-pedia-logo.png" width="100%"></a> </div>

                <div class="mobile-header row">

                    <div class="col-xs-7"><img src="<?php echo IMAGE ?>images/mobile-logo.png" width="100%"></div>

                    <div class="col-xs-3 menu">menu</div>

                </div>

                <div class="col-md-10">



                    <div class="search">

                        <h3>Search for anything</h3>

                        <form class="frmSearch" name="autofil" enctype="multipart/form-data" id="autofil" method="post" action="" >

                            <div class="row" style="position:relative">

                                <div class="col-md-5">

                                    <div class="type-search">

                                        <input type="text" class="fld1 buisnessSearch"  id="searchKeyWord" data-url="<?php echo URL . '/home/getBuisnessSearch' ?>" placeholder="enter business name">

                                        <span><img src="<?php echo IMAGE ?>images/serch-type.png" width="18" height="16"></span></div>

                                </div>



                                <div class="col-md-6 col-xs-12">

                                    <div class="time" style="margin:-24px 0 7px 0; color:#fff; text-align:right; font-size:12px;"><i class="fa  fa-clock-o"></i> <?php date_default_timezone_set("Asia/Qatar");

echo date('l - M - d - Y '); ?> <?php echo date("h:i:a"); ?></div>

                                    <input type="text" class="fld1 buisnessSearch2"  id="searchCategory" data-url="<?php echo URL . 'home/getBuisnesscat' ?>" placeholder="enter category name">



                                </div>

                                <div class="col-md-1 col-xs-3 search-btn">

                                    <button type="submit" style="border:none; background:none" data-url="<?php echo COMPANIES . 'qatar/' ?>" id="subSearch" value="" class="search-sub add-business" ><img src="<?php echo IMAGE ?>images/search_icon.png" width="100%"></button>



                                </div>



                            </div>

                        </form>



                        <div class="row search_details">

                            <div class="col-md-3"> <p><i class="fa fa-bars"> </i> Search over 56844 + listings</p></div>

                            <div class="col-md-4">  <p><i class="fa fa-cloud"> </i> Qatar<span style="font-family:arial">'</span>s largest business database</p> </div>

                            <div class="col-md-4">  <p><i class="fa fa-area-chart"></i> Fastest growing online directory</p> </div>



                        </div>



                    </div>

                </div>

            </div>

        </div>

    </div>



    <div class="container">

        <div class="row"> <ol class="breadcrumb">

                <li><a href="#">Home</a></li>

                <li><a href="#">Library</a></li>

                <li class="active">Data</li>

            </ol>

        </div>

    </div>



    <div class="container">





        <div class="row catagary_detail ">





<?php if (count($this->searchFeaturedResult1) != 0) { ?>



                <h3> Showing results of <span class="head-color"><?php echo count($this->searchFeaturedResult1); ?></span> for <span class="head-color" ><h1 style="display:inherit; font-size:24px;"><?php foreach ($this->kyword as $ky) {

        echo $ky . ' ';

    } ?> in doha, qatar</h1>  </span> </h3>

<?php } else { ?>

                <h3> No Search Result Found for <?php foreach ($this->kyword as $ky) {

        echo $ky . ' ';

    } ?>in Qatar</h3>

<?php } ?>





            <div class="col-md-9">

                <div class="holder">

                </div>

                <div id="itemContainer" style="min-height=1000px !important" >

                                        <?php

                                        foreach ($this->searchFeaturedResult1 as $business):

                                            ?>  

                                            <?php if ($business['type'] == 'premium') {

                                                ?>



                            <div class="row deatil-box">

                                <span class="premium"> <img src="<?php echo IMAGE ?>images/premium.png" width="71" height="70" alt="companies in doha, qatar" > </span> 

                                <div class="col-md-3 detailsimage"> <img alt="<?php foreach ($this->kyword as $ky) {

                                            echo $ky . ' ';

                                        } ?>  in qatar, <?php echo $business['title'] ?>  in qatar ,doha" src="<?php echo UPLOADS ?>images/logo/<?php echo $business['logo']; ?>" width="100%" class="img-responsive" alt="product 2"> </div>

                                <div class="col-md-9 deatil-discript"> 

                                    <h2 style="margin:0; font-size:25px;"> <a href="<?php echo BUSINESS . 'qatar/' . strtolower(str_replace('--', '-', preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $business['title'])))) . '-' . $business['town'];

                                        if ($business['town'] == '') echo 'doha'; ?>">  <?php echo $business['title'] ?> Qatar</a> </h2>

                                    <div class="row"> 

                                        <div class="col-md-6"> 

                                            <p> 

                                                P.O. Box:  <?php echo $business['po'] ?>  

                            <?php echo '<br>' ?>

                            <?php echo $business['location'] ?>  <br>

        <?php

        echo $business['townName'];

        echo '<br>';



        echo $business['cityName'];

        ?> </p>

                                            <h4><i class="fa fa-clock-o fa-1g"></i><?php if ($business['hours']) {

            echo 'Working hours :' . $business['hours'];

        } ?>   </h4>

                                        </div>

                                        <div class="col-md-6 details_comp"> <p> <?php if ($business['contact']) {

                                    echo 'Contact Person :' . $business['contact'];

                                } ?> </p> </div>

                                    </div>

                                    <div class=" row detail_info"> 

                                        <ul class="detail_contact"> 

                                            <li> <i class="fa fa-phone"></i><?php echo $business['phone'] ?></li> 

                                            <li> <i class="fa fa-envelope"></i><?php echo $business['email'] ?></li>

                                            <li> <i class="fa fa-share"></i><?php echo $business['mobile'] ?></li>

                                        </ul>

                                    </div>

                                    <p class="details_note"><?php if ($business['description']) {

                                    echo substr($business['description'], 0, 154); ?> <a href="<?php echo BUSINESS . 'qatar/' . strtolower(str_replace('--', '-', preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $business['title'])))) . '-' . $business['town'];

                                    if ($business['town'] == '') echo 'doha'; ?>">read more ></a><?php } ?> </p>

                                </div>

                            </div></a>

                        <?php } elseif ($business['type'] == 'silver') { ?>



                            <div class="row deatil-box">

                                <span class="premium"> <img src="<?php echo IMAGE ?>images/silver.png" width="71" height="70" alt="companies in qatar,doha" > </span> 

                                <div class="col-md-3 detailsimage"> <img alt="<?php foreach ($this->kyword as $ky) {

                        echo $ky . ' ';

                    } ?> in qatar,<?php echo $business['title'] ?>  in qatar ,doha" src="<?php echo UPLOADS ?>images/logo/<?php echo $business['logo']; ?>" width="100%" class="img-responsive" alt="product 2"> </div>

                                <div class="col-md-9 deatil-discript"> 

                                    <h2 style="margin:0; font-size:25px;"> <a href="<?php echo BUSINESS . 'qatar/' . strtolower(str_replace('--', '-', preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $business['title'])))) . '-' . $business['town'];

                    if ($business['town'] == '') echo 'doha'; ?>">  <?php echo $business['title'] ?> Qatar </a></h2>

                                    <div class="row"> 

                                        <div class="col-md-6"> <p>

                                                P.O. Box:  <?php echo $business['po'] ?>  

        <?php echo '<br>' ?>



        <?php echo $business['location'] ?>  <br>

        <?php

        echo $business['townName'];

        echo '<br>';



        echo $business['cityName'];

        ?> </p>

                                            <h4><?php if ($business['hours']) {

                                echo 'Working hours :' . $business['hours'];

                            } ?>   </h4>

                                        </div>

                                        <div class="col-md-6 details_comp"> <p> <?php if ($business['contact']) {

                                echo 'Contact Person :' . $business['contact'];

                            } ?> </p> </div>

                                    </div>

                                    <div class=" row detail_info"> 

                                        <ul class="detail_contact"> 

                                            <li> <i class="fa fa-phone"></i><?php echo $business['phone'] ?></li> 

                                            <li> <i class="fa fa-envelope"></i><?php echo $business['email'] ?></li>

                                            <li> <i class="fa fa-share"></i><?php echo $business['mobile'] ?></li>

                                        </ul>

                                    </div>

                                    <p class="details_note"><?php if ($business['description']) {

                                echo substr($business['description'], 0, 154); ?> <a href="<?php echo BUSINESS . 'qatar/' . strtolower(str_replace('--', '-', preg_replace('/[^A-Za-z0-9\-]/', '', str_replace(' ', '-', $business['title'])))) . '-' . $business['town'] ?>">read more ></a><?php } ?> </p>

                                </div>

                            </div></a>

    <?php } else { ?>

                            <div class="row deatil-box normal-account">

                        <!--<div class="col-md-2 detailsimage"> <img src="images/list-image.png" width="100%" class="img-responsive" alt="product 2"> </div>-->

                                <div class="col-md-12 deatil-discript"> 

                                    <h2 style="margin:0; font-size:25px;"> <a href="<?php echo BUSINESS . 'qatar/' . Hash::slugify($business['title']) . '-' . $business['town'];

        if ($business['town'] == '') echo 'doha'; ?>"> <?php echo $business['title'] ?> Qatar </a></h2>

                                    <div class="row"> 

                                        <div class="col-md-12"> <p>P.O. Box:  <?php echo $business['po'] ?> </p>

                                        </div>

        <?php

        $num = explode(',', $business['mobile']);

//echo'<pre>';

//print_r($num);exit;

        ?>

                                    </div>

                                    <div class=" row detail_info"> 

                                        <ul class="detail_contact"> 

        <?php if ($num[0]) { ?><li> <i class="fa fa-phone"></i><?php echo $num[0]; ?></li> <?php } ?>

                                            <li> <i class="fa fa-envelope"></i><?php echo $business['email'] ?></li>

                                            <li> <i class="fa fa-map"></i>Doha, Qatar</li> 

                                            <li> <i class="fa fa-building-o"></i><?php foreach ($this->kyword as $ky) {

            echo $ky . ' ';

        } ?></li> 



                                        </ul>

                                    </div>

                                </div>

                            </div>





    <?php } endforeach; ?>



                </div>

                <div class="holder">

                </div>

                <style>

                    .popular-categories{display:block !important; border-top: solid 1px #e5e5e5; margin-top:55px;}

                    .popular-categories h3{font-family:'Lato', sans-serif !important}

                    .short-descri{display:block !important; border-top: solid 1px #e5e5e5; margin-top:25px; padding-top:25px; margin-bottom:42px;}

                    .popular-categories ul{list-style:none; padding: 0px 0 25px 0; margin:20px -7px 0px -7px; }

                    .popular-categories ul li{ float:left; width:50%;}

                    .popular-categories ul li a{  padding:2px 0; display:block; color:#009ab6}

                    .description{margin:0 -7px;}

                </style>



                <div class="row popular-categories">

                    <div class="col-md-12">

                        <ul>

                            <h3>Related Categories in Doha, Qatar</h3>



<?php foreach ($this->popularcat as $pop) { ?>

                                <li><a href="<?php echo COMPANIES ?>qatar/list-of-<?php $arg = Hash::slugify($pop['categoryName']);

    echo $arg; ?>-in-qatar"><?php echo $pop['categoryName'] ?> in qatar</a></li>

<?php } ?>



                        </ul>

                    </div>

                </div>



                <div class="row short-descri">

                    <div class="col-md-12">

                        <div class="description">





<?php if ($this->seo[0]['article'] == "") { ?>





<?php } else { ?>



                                <h4>  <?php if ($this->seo[0]['keyword']) {

        echo 'Classification:' . $this->seo[0]['keyword'];

    } ?></h4>

                                <h4><?php echo $this->seo[0]['atitle']; ?></h4>

                                <p><?php echo $this->seo[0]['article']; ?></p>



<?php } ?>

                        </div>

                    </div>

                </div>













            </div>





            <div class="col-md-3"> 

                <div class="row"></div>

                <div class="row"><div class="col-md-12 top-side-ads"> 

                        <a  href="http://http://localhost:82/Abaq/Abaq" > <img alt="Qatar Business directory" width="100%" src="<?php echo IMAGE ?>images/side-top-ads1.png" width="268" height="auto"></a>

                        <a href="http://qatpedia.com/companies/qatar/list-of-construction-companies-in-qatar" > <img alt="Qatar Business directory" width="100%" src="<?php echo IMAGE ?>images/side-top-ads2.png" width="268" height="77"></a>

                        <a href="http://yogasha.net/" target="_blank">  <img alt="Qatar Business directory" width="100%" src="<?php echo IMAGE ?>images/side-top-ads3.png"  width="268" height="77"></a>

                        <a href="#" target="_blank">  <img alt="Qatar Business directory" width="100%" src="<?php echo IMAGE ?>images/side-top-ads4.png"  width="268" height="77"> </a>

                        <a href="http://qhcqatar.com/" target="_blank">  <img alt="Qatar Business directory" width="100%" src="<?php echo IMAGE ?>images/side-top-ads5.png"  width="268" height="77"> </a>

                        <a href="http://bpcplus.com/" target="_blank">  <img alt="Qatar Business directory" width="100%" src="<?php echo IMAGE ?>images/side-top-ads6.png"  width="268" height="77"> </a>

                        <a href="http://easyclearanceqa.com/" target="_blank">  <img alt="Qatar Business directory" width="100%" src="<?php echo IMAGE ?>images/side-top-ads7.png"  width="268" height="77"> </a>











                    </div> </div>



            </div>

        </div>







    </div>   









</body>

</html>