<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta charset="UTF-8">
<title><?php echo SITE?></title>

<!-- Bootstrap -->
<link href="<?php echo URL?>public/css/bootstrap.css" rel="stylesheet">
<link href="<?php echo URL?>public/css/layout.css" rel="stylesheet">
<link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
</head>
<body style="background-position: 50% 50%; background:url(<?php echo URL ?>public/images/bg.jpg) no-repeat center; margin-top:6% ">
<nav class="navbar navbar-default" role="navigation" style="display:none">
  <!-- Brand and toggle get grouped for better mobile display -->
  <div class="col-lg-4" style="padding:0">
   
    <a class="navbar-brand" href="#"> <img src="<?php echo URL?>public/images/bg.jpg" width="80%"/></a>
  </div>
  <div class="col-lg-2 pull-right welcome"> Welcome Guest</div>

</nav>

<div id="fullscreen_bg" class="fullscreen_bg"/>

<div class="container" style="min-height:100px">
<h2 class="tms-ttl">Welcome to Admin</h2>
    <form class="form-signin" method="post" action="" align="center">
        <input type="text" name="userName"class="form-control" placeholder="UserName" required="" autofocus="">
        <input type="password" name="password" class="form-control" placeholder="Password" required="">
       
        <input class="btn btn-lg btn-primary btn-block" name="subLogin" type="submit" value="Login">

        <div class="forgot row">
<!--        <div class="col-md-5">Register Now</div>-->
        <div class="col-md-7"><a href="<?php echo URL.'manage/forgot_password/'?>"> Forgot Password?</div></a>
        </div>
    </form>
<div class="footer" style="background:none; text-align:center">Powered by Adox solutions</div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script> 
<script src="../manage/public/js/bootstrap.js"></script> 
</body>
</html> 