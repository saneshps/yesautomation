 <?php
	if (isset($_POST['subc'])) {
		//print_r($_POST);exit;
		$name = $_POST['firstname'];
		$mail = $_POST['email'];
		$phone = $_POST['mobile'];

		$msg = $_POST['msg'];
		$subject = $_POST['subject'];
		$header = 'MIME-Version: 1.0' . "\r\n";
		$header .= 'Content-type: text/html; charset=utf-8' . "\r\n";
		//$header .= 'To: Abdul anas <abdulanas386@gmail.com>' . "\r\n";
		$header .= 'From: Yesautomation ' . "\r\n";

		$message = '
<div style="background:#e5e5e5; padding:2% 6%">


<div style="padding:15px; background:#e7e7e7;text-align: center;  border-bottom:solid 5px #9dc33b">
<div><img src="https://www.yesautomation.ae/images/logo.png"  alt="Yesautomation" /></div>
</div>

 



<div style="margin-top: -6%;">
<div style="padding:15px 15px 35px 15px; background:white;text-align: center; ">
<H1>Enquiry from Yesautomation Website</H1>
<div style="padding-bottom:5px; height: 30px; border-top:dashed 1px #e5e5e5; padding-top:20px;">
<div > Name:  <a style="color:#999">' . $name . '</a></div>


</div>
<div style="padding-bottom:5px; height: 30px;">
<div > Mail:  <a style="color:#999">' . $mail . '</a></div>

 
  
</div>

<div style="padding-bottom:5px; height: 30px;">
<div > Phone:  <a style="color:#999">' . $phone . '</a></div>

 
  
</div>


<div style="padding-bottom:5px; height: 30px;">
<div > Subject:  <a style="color:#999">' . $subject . '</a></div>


  
</div>

<div style="padding-bottom:5px; height: 30px;">
<div > Message:  <a style="color:#999">' . $msg . '</a></div>
  
</div>

</div>

';
		//echo '<pre>';print_r($message);exit;
		$result = mail('sales@yesautomation.ae', 'Enquiry From Yesautomation website', $message, $header);
		//mail($email,'Thanks for your feedback' , $feedback,$header);
		if ($result) {
			echo "<script>alert('Mail Send Successfully')</script>";
			echo "<script>window.location='contact.php?success'</script>";
		} else {
			echo "<script>alert('Something Wrong.......')</script>";
		}
	}

	?>
 <!DOCTYPE html>
 <html lang="en">

 <head>


 	<title>Contact us | yesautomation.ae</title>
 	<link rel="shortcut icon" href="images/favicon.png">
 	<meta name="description" content="Get in touch with the leading machinery equipment Rental company in UAE. For more details contact yesautomation.ae and Give us a call, let's talk.">

 	<meta charset="utf-8">
 	<meta name="viewport" content="width=device-width, initial-scale=1">




 	<link rel="stylesheet" href="main/bootstrap.min.css">
 	<link rel="stylesheet" href="main/layout.css">
 	<link rel="stylesheet" href="main/contact.css">
 	<link rel="stylesheet" href="main/menu.css">
 	<link rel="stylesheet" href="slider/skdslider.css">


 	<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">


 </head>
 <style>
 	.video-f iframe {
 		width: 100%;
 	}
 </style>

 <body>

 	<!-- <div class="whatssap"></div>

<a href="https://api.whatsapp.com/send?phone=+971508993781&amp;text=Hey%20there!%20I%20woud%20like%20to%20know%20more%20about%20your%20products." class="float" target="_blank">
<i class="fa fa-whatsapp my-float"></i>
</a> -->


 	<?php $page = 'contact';
		include 'header.php'; ?>


 	<section id="contact-banner">

 		<div class="slide-desc">

 			<div class="cap-one">

 				<h1> Contact Us </h1>


 			</div>


 		</div>



 	</section>


 	<section id="contact-content">
 		<div class="container-fluid">
 			<div class="row">
 				<div class="col-md-12">
 					<h2>Our Location</h2>
 					<p>If you would like to find out more about how YES Automation can help your business,
 						we will be more than happy to speak with you and set up a meeting to identify your
 						requirement and provide you our proposal
 					</p>

 				</div>


 				<div class="col-md-4 col-sm-5 up">
 					<h4>Head office</h4>
 					<p>YORK ENGINEERING SOLUTIONS FZC </p>
 					<p>BLOCK NO. 7, WAREHOUSE NO 3</p>
 					<p>UM LAOB REGION, PLOT NO. 1628</p>
 					<p>UMM AL QUWAIN, UAE</p>
 					<div class="bodx">
 						<h5><span>TEL :</span> <a href="tel:97165264382" target="_blank" style="color: #333;">+971 6 526 4382</a></h5>
 						<h5><span>MOB :</span> <a href="tel:971502118507" target="_blank" style="color: #333;">+971 50 211 8507</a></h5>
 						<h5><span>FAX :</span> +971 6 5264384 </h5>
 						<p>Mail : <a href="mailto:sales@yesautomation.ae" target="_blank"><span>sales@yesautomation.ae</span></a></p>
 					</div>


 				</div>

 				<!--//  form   -->
 				<div class="col-md-8 col-sm-7" id="contact-form">
 					<div class="container-fluid">
 						<div class="row">
 							<div class="col-md-12">
 								<h2>Quick Enquiry</h2>
 								<p>Brief us your requirements below, and let's connect</p>

 							</div>
 						</div>


 						<div class="row">
 							<form action="" method="post">


 								<div class="col-md-6">
 									<input type="text" id="fname" pattern=".*\S+.*" name="firstname" placeholder="Firstname.." required>
 								</div>

 								<div class="col-md-6">
 									<input type="email" id="mail" pattern=".*\S+.*" name="mail" placeholder="E-mail.." required>
 								</div>


 								<div class="col-md-6">
 									<input type="text" id="lname" pattern=".*\S+.*" name="mobile" placeholder="Mobile.." required>
 								</div>

 								<div class="col-md-6">
 									<input type="text" id="lname" pattern=".*\S+.*" name="subject" placeholder="Subjects..">
 								</div>

 								<div class="col-md-12">

 									<textarea id="subject" name="msg" pattern=".*\S+.*" placeholder="Message" style="height:200px" required></textarea>
 								</div>
 								<div class="col-md-4 col-lg-3 col-4">
 									<input type="submit" value="Send mail" name="subc">
 								</div>
 							</form>


 						</div>
 					</div>
 				</div>
 				<!--//  form   -->

 			</div>
 		</div>

 	</section>




 	<div class="video-f">
 		<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.3153228089104!2d55.66152581501685!3d25.56117408372815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDMzJzQwLjIiTiA1NcKwMzknNDkuNCJF!5e0!3m2!1sen!2sin!4v1587410898618!5m2!1sen!2sin" height="350" style="border:0" allowfullscreen></iframe>

 	</div>

















 	<?php include 'footer.php'; ?>








 	<script src="js/script.js"></script>


 	<script src="js/custom.js"></script>
 	<script>
 		var _gaq = _gaq || [];
 		_gaq.push(['_setAccount', 'UA-36251023-1']);
 		_gaq.push(['_setDomainName', 'jqueryscript.net']);
 		_gaq.push(['_trackPageview']);

 		(function() {
 			var ga = document.createElement('script');
 			ga.type = 'text/javascript';
 			ga.async = true;
 			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'https://www') + '.google-analytics.com/ga.js';
 			var s = document.getElementsByTagName('script')[0];
 			s.parentNode.insertBefore(ga, s);
 		})();
 	</script>


 </body>

 </html>