<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

    <head>

        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

        <title><?php echo SITE?></title>

        <link rel="shortcut icon" href="<?php echo IMAGE ?>favicone.ico">

            <meta name="keywords" content="<?php echo $this->metaKeywords ?>">

                <meta name="description" content="<?php echo $this->metaDescription ?>">
            

<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="crossorigin="anonymous"></script>


<script src="//code.jquery.com/jquery-1.12.4.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.10.0/jquery.validate.min.js"></script>
         

                    <?php

                    if (isset($this->js)) {

                        foreach ($this->js as $js) {

                            echo '<script src="' . $js . '"></script>';

                        }

                    }

                    if (isset($this->css)) {

                        foreach ($this->css as $css) {

                            echo '<link href="' . $css . '" rel="stylesheet" />';

                        }

                    }

                    ?>
      
                    <script type="text/javascript">

                        (function(i, s, o, g, r, a, m) {

                            i['GoogleAnalyticsObject'] = r;

                            i[r] = i[r] || function() {

                                (i[r].q = i[r].q || []).push(arguments)

                            }, i[r].l = 1 * new Date();

                            a = s.createElement(o),

                                    m = s.getElementsByTagName(o)[0];

                            a.async = 1;

                            a.src = g;

                            m.parentNode.insertBefore(a, m)

                        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');



                        ga('create', 'UA-41031364-1', 'advanceworldgroup.com');

                        ga('send', 'pageview');



                    </script>

                    </head>

                    <body>