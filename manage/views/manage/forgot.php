<link href="<?php echo URL?>public/css/bootstrap.css" rel="stylesheet">
<style>
    
    body{
    //background-color: #525252;
}
.centered-form{
	margin-top: 140px;
}

.centered-form .panel{
	background: rgba(255, 255, 255, 0.8);
	box-shadow: rgba(0, 0, 0, 0.3) 20px 20px 20px;
}
    
</style>
<div class="container">
        <div class="row centered-form">
        <div class="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
        	<div class="panel panel-default">
        		<div class="panel-heading">
			    		<h3 class="panel-title">Please enter   your mail id<small> </small></h3>
			 			</div>
			 			<div class="panel-body">
                                                    <form role="form" action="" method="post">
<!--			    			<div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                                        <div class="form-group">
                                                            <input type="text" name="first_name" id="first_name" class="form-control input-sm" placeholder="First Name">
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                                        <div class="form-group">
                                                            <input type="text" name="last_name" id="last_name" class="form-control input-sm" placeholder="Last Name">
                                                        </div>
                                                    </div>
			    			</div>-->

			    			<div class="form-group">
			    				<input type="email" name="email" id="email" class="form-control input-sm" placeholder="Email Address">
			    			</div>

			    			<div class="row">
<!--			    				<div class="col-xs-6 col-sm-6 col-md-6">
			    					<div class="form-group">
			    						<input type="password" name="password" id="password" class="form-control input-sm" placeholder="Password">
			    					</div>
			    				</div>-->
<!--			    				<div class="col-xs-6 col-sm-6 col-md-6">
			    					<div class="form-group">
			    						<input type="password" name="password_confirmation" id="password_confirmation" class="form-control input-sm" placeholder="Confirm Password">
			    					</div>
			    				</div>-->
			    			</div>
			    			
                                                <input type="submit" value="submit" name="frgtp" class="btn btn-info btn-block">
                                                <a href="<?php echo MANAGE.'login'?>">Login</a>
			    		
			    		</form>
			    	</div>
	    		</div>
    		</div>
    	</div>
    </div>

