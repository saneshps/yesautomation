<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta charset="UTF-8">
<title><?php echo SITE?></title>

<!-- Bootstrap -->
<!-- <link href="css/bootstrap.css" rel="stylesheet">
<link href="css/layout.css" rel="stylesheet">
<link href="css/datepicker.css" rel="stylesheet"> -->
<link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="crossorigin="anonymous"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.10.0/jquery.validate.min.js"></script>

</head>
<body>
<?php include 'includes/header.php' ?>

<div class="icon-container" >
<?php include 'includes/inner-menu.php';?>
<?php if (isset($this->status)): ?>
        <?php if ($this->status == 'success'): ?>
            <h4 class="alert_success" color="red">Updated successfully.You may ask to login to continue </h4> 
        <?php endif; ?>
        <?php if ($this->status == 'mismatch'): ?>
            <h4 class="alert_warning " color="red">Password Mismatch</h4> 
        <?php endif; ?>
        <?php if ($this->status == 'invalid'): ?>
            <h4 class="alert_error">Invalid current password</h4> 
        <?php endif; ?>

    <?php endif; ?>
<div class="col-md-9">

<div class="row">
<div class="bread">
<div id="bc1" class="btn-group btn-breadcrumb">
            <a href="<?php echo ADMIN ?>" class="btn btn-default"><i class="fa fa-home"></i></a>
            <a href="<?php echo URL.'manageTeam/setting/setting/'?>" class="btn btn-default"><div>Settings</div></a>
            <a href="#" class="btn btn-default"><div>Change Password</div></a>

        </div>
</div>

<div class="row">
<div class="reg-form">
<div class="bulk" style="border-bottom:solid 1px #ffffff">
<div class="col-md-4" style="padding-left: 30px;"><h3>Change Password</h3></div>
<?php $result=""; ?>
<div class="clearfix"></div>
</div><?php if(isset($this->get)){ ?>
<?php $result=$this->get; }  ?>
<div class="form"><form name="registration1_form" id="example2" method="post" action="<?php echo MANAGE_USER.'changePassword' ?>" enctype="multipart/form-data">

<div class="table-cntnr">
<div class="form">
<div class="form-group">
<div class="col-md-5">
<input type="text" required class="form-control" id="userName" name="userName" value="<?php if(isset($result[0]['userName'])){echo $result[0]['userName'];} ?>" >
</div>
<div class="col-md-5">
    <input type="password"  required class="form-control" id="current"  name="current" placeholder="Current Password" >
</div>

<div class="clearfix"></div></div>

<div class="form-group">
<div class="col-md-5">
<input type="password" required class="form-control" id="new" name="new" placeholder="New Password" >
</div>

<div class="col-md-5">
<input type="password" required class="form-control" id="confirm"  name="confirm" placeholder="Confirm new Password" >
</div>
<div class="col-md-5" style="margin-top: 15px;">
<input type="email" required class="form-control" id="email" name="email" placeholder="E-mail" value="<?php if(isset($result[0]['email'])){echo $result[0]['email'];}?>">
</div>

<div class="clearfix"></div></div>
<div class="form-group">
<div class="col-md-12"><button type="submit" class="btn btn-success" name="subUser" value=""><i class="fa fa-chevron-circle-right"></i>Submit</button></div>

<div class="clearfix"></div></div>

</form>
</div>
</div>

</div>
</div>
</div>
</div>
            
    </div>
    <div class="clearfix"></div>
</div>
<div class="footer">Powered by Adox solutions</div>
<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>--> 
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
    <script src="js/bootstrap-datepicker.js"></script>
    <script>
    if (top.location != location) {
    top.location.href = document.location.href ;
  }
        $(function(){
            window.prettyPrint && prettyPrint();
            $('#dp1').datepicker({
                format: 'mm-dd-yyyy'
            });
            $('#dp2').datepicker();
            $('#dp3').datepicker();
            $('#dp3').datepicker();
            $('#dpYears').datepicker();
            $('#dpMonths').datepicker();
            
            
            var startDate = new Date(2012,1,20);
            var endDate = new Date(2012,1,25);
            $('#dp4').datepicker()
                .on('changeDate', function(ev){
                    if (ev.date.valueOf() > endDate.valueOf()){
                        $('#alert').show().find('strong').text('The start date can not be greater then the end date');
                    } else {
                        $('#alert').hide();
                        startDate = new Date(ev.date);
                        $('#startDate').text($('#dp4').data('date'));
                    }
                    $('#dp4').datepicker('hide');
                });
            $('#dp5').datepicker()
                .on('changeDate', function(ev){
                    if (ev.date.valueOf() < startDate.valueOf()){
                        $('#alert').show().find('strong').text('The end date can not be less then the start date');
                    } else {
                        $('#alert').hide();
                        endDate = new Date(ev.date);
                        $('#endDate').text($('#dp5').data('date'));
                    }
                    $('#dp5').datepicker('hide');
                });

        // disabling dates
        var nowTemp = new Date();
        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

        var checkin = $('#dpd1').datepicker({
          onRender: function(date) {
            return date.valueOf() < now.valueOf() ? 'disabled' : '';
          }
        }).on('changeDate', function(ev) {
          if (ev.date.valueOf() > checkout.date.valueOf()) {
            var newDate = new Date(ev.date)
            newDate.setDate(newDate.getDate() + 1);
            checkout.setValue(newDate);
          }
          checkin.hide();
          $('#dpd2')[0].focus();
        }).data('datepicker');
        var checkout = $('#dpd2').datepicker({
          onRender: function(date) {
            return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
          }
        }).on('changeDate', function(ev) {
          checkout.hide();
        }).data('datepicker');
        });
    </script>
    
    
    <!--VALIDATE PASSWORD FILEDS-->
    
     <script>
            // When the document is ready
            $(document).ready(function () {
                
                //validation rules
                $("#example2").validate({
                    //set this to false if you don't what to set focus on the first invalid input
                    focusInvalid: true,
                    //by default validation will run on input keyup and focusout
                    //set this to false to validate on submit only
                    onkeyup: true,
                    onfocusout: true,
                    //by default the error elements is a <label>
                   
                    rules: {
                        "userName": {
                            required: true,
                            minlength: 5
                        },  
                        "current": {
                            required: true,
                            minlength: 5
                        },
                        "confirm": {
                            equalTo:"#new"
                          
                        },
                        "new": {
                            required: true,
                            minlength: 5
                          
                        }
                    },
                    messages: {
                        "userName": {
                            required: "You must enter a username",
                            minlength: "Username must be at least 5 characters long"
                        },  
                        "current": {
                            required: "Please enter the current password",
                            minlength : "Password must be atleast 5 characters long"
                        },
                        "confirm": {
                            required: "Please confirm the password",
                            minlength: "Password must be atleast 5 characters long"
                           
                        },
                        "new": {
                            required: "Password field cannot be empty",
                            minlength: "Password must be atleast 5 characters long"
                           
                        }
                    }
                });
                
            });
      </script>
      <style>
          label.error{color:orange;}
      </style>
   
</body>
</html> 