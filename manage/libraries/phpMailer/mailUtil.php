<?php

require "class.phpmailer.php";

function sendEmail($smtpHost, $smtpUser, $smtpPassword, $mailFrom, $nameFrom, $mailTo, $nameTo, $subject, $txtBody, $htmlBody, $attach){
	$mail = new PHPMailer();			
	//$mail->SetLanguage("it", "/lib");
	switch(SEND_METHOD){
		case "MAIL":
			$mail->IsMail();
			break;
		case "SENDMAIL":
			$mail->IsSendmail();
			break;
		case "SMTP":
			$mail->IsSMTP();
			$mail->Host = $smtpHost;
			$mail->SMTPAuth = FALSE;
                        $mail->SMTPSecure = "ssl";    
                        $mail->Port=465; 
			$mail->Username = $smtpUser;
			$mail->Password = $smtpPassword;
			break;
	}
	$mail->From = $mailFrom;
	$mail->FromName = $nameFrom;
	$mail->AddAddress($mailTo, $nameTo);

	$mail->AddReplyTo($mailFrom, $nameFrom);
	//$mail->WordWrap = 1000; 

	$mail->IsHTML(true);
	$mail->Subject = $subject;
	$mail->Body    = $htmlBody;
	$mail->AltBody = $txtBody;

	$mail->AddAttachment($attach);

	if(!$mail->Send())
	{
		return FALSE;
	}
	else{
		return TRUE;
	}

}

