<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta charset="UTF-8">
<title><?php echo SITE?></title>

<!-- Bootstrap -->
<link href="css/bootstrap.css" rel="stylesheet">
<link href="css/layout.css" rel="stylesheet">
<link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
</head>
<body>
<?php include 'includes/header.php' ?>

<div class="icon-container" >
<?php include 'includes/inner-menu.php';?>
<div class="col-md-9">
<div class="bread">
<div id="bc1" class="btn-group btn-breadcrumb">
            <a href="#" class="btn btn-default"><i class="fa fa-home"></i></a>
            <a href="#" class="btn btn-default"><div>Settings</div></a>
            

        </div>
</div>

            <a class="col-xs-6 col-sm-2 placeholder" href="<?php echo MANAGE_USER ?>password">
              <div class="icon-holder"><img src="http://previews.123rf.com/images/snake3d/snake3d1110/snake3d111000016/10918391-Lock-padlock-security-password-safeguard-System-access-icon-concept-Puzzle-link-closed-secret-code-e-Stock-Photo.jpg" width="100%"/></div>
              <h4>Password Change</h4>
              
            </a>
            
        
            <div class="clearfix"></div>
            
    </div>
    <div class="clearfix"></div>
</div>
<div class="footer">Powered by Adox Solutions</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script> 
<script src="js/bootstrap.js"></script> 
<script>
$(function(){

    $('#slide-submenu').on('click',function() {                 
        $(this).closest('.list-group').fadeOut('slide',function(){
            $('.mini-submenu').fadeIn();    
        });
        
      });

    $('.mini-submenu').on('click',function(){       
        $(this).next('.list-group').toggle('slide');
        $('.mini-submenu').hide();
    })
})
$(document).ready(function(){
    $(window).resize(function() {

        ellipses1 = $("#bc1 :nth-child(2)")
        if ($("#bc1 a:hidden").length >0) {ellipses1.show()} else {ellipses1.hide()}
        
        ellipses2 = $("#bc2 :nth-child(2)")
        if ($("#bc2 a:hidden").length >0) {ellipses2.show()} else {ellipses2.hide()}
        
    })
    
});
</script>
</body>
</html> 