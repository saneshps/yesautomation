<?php

class Mailer extends Model {

    public function __construct() {
        parent::__construct();
    }

    public function SendMessageMail($Email, $Content) {
        $this->Input = $Content;
        $this->Email = $Email;
        $this->Subject = 'You have a message from "Health factory"';
        $this->Content = $this->Input['AdminMessage'];
        $this->link = 'http://localhost:82/faiz/';
        $this->from_email = "Faiz Alelweet";
        $this->headers = "From: " . $this->from_email . "\r\n";
        $this->headers .= "Reply-To: " . $this->from_email . "\r\n";
        $this->headers .= "Content : " . $this->Content . "\r\n";
        $this->headers .= "link : " . $this->link . "\r\n";
        $this->headers .= "MIME-Version: 1.0\r\n";
        $this->headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        $this->message = $this->Content;
        mail($this->Email, $this->subject, $this->message, $this->headers);
    }

    public function SendMailtoAdmin() {
        $this->Content = 'New customer has registered in health factory';
        $this->Email = 'Faiz alelweet email';
        $this->subject = 'New registration';
        $this->from_email = "Faiz alelweet";
        $this->headers = "From: " . $this->from_email . "\r\n";
        $this->headers .= "Reply-To: " . $this->from_email . "\r\n";
        $this->headers .= "Content : " . $this->Content . "\r\n";
        $this->headers .= "link : " . $this->link . "\r\n";
        $this->headers .= "MIME-Version: 1.0\r\n";
        $this->headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        $this->message = $this->Content;
        mail($this->Email, $this->subject, $this->message, $this->headers);
    }

    public function resetpassword($email) {
        $this->email = $email;



//                $this->subject="Helath factory Dubai";
//                $this->link='http://www.healthfactory.com/index/resetaccount';
//                $headers ="From: " .$this->subject. "\r\n";
//                $headers.= "MIME-Version: 1.0\r\n";
//                $headers.= "Content-Type: text/html; charset=ISO-8859-1\r\n";
//                
//                $this->message = "<table width='410' cellpadding='10' cellspacing='0'>
//                <tr>
//                    <td height='19' colspan='2' bgcolor='#e1ebef'>&nbsp;</td>
//                </tr>
//                <tr>
//                    <td height='73' colspan='2' align='center' bgcolor='#046388' style='font-family:Verdana, Geneva, sans-serif'><strong style='font-size:18px' sty>$this->subject</strong></td>
//                </tr>";	
//                $this->message.= "  <tr style='color:#2d2d2d; font-size:14px; font-family:Verdana, Geneva, sans-serif;'>
//                    <td height='37' bgcolor='#e1ebef' style='font-weight:bold'>Click the following link to reset your account password:</td>
//                    <td bgcolor='#e1ebef'></td>
//                </tr>";
//                $this->message.= "  <tr style='color:#2d2d2d; font-size:14px; font-family:Verdana, Geneva, sans-serif;'>
//                    <td width='40' height='37' bgcolor='#e1ebef' style='font-weight:bold'>From:</td>
//                    <td width='328' bgcolor='#e1ebef'>$this->link</td>
//                </tr>";
//                $this->message.= " </table>";
//                mail($this->email,$this->subject,$this->message,$headers);
    }

    public function sendnewenqmail() {

        $to = "preshbin@adoxsolutions.com";
        $subject = "Hi!";
        $body = "Hi,\n\n A new email from faiz alelweet \n
                 link\n http://healthfactory.com/admin/";
        mail($to, $subject, $body);
    }
    
    public function mailforuserenquiry()
    {
        $this->email=$this->input['email'];
        $this->msg=$this->input['msg'];
        $fileatt = "public/pdf/01-Oasis profile.pdf"; // Path to the file
        $fileatt_type = "application/pdf"; // File Type
        $fileatt_name = "Healthfactory PDF"; // Filename that will be used for the file as the attachment
        $email_from = "faizAlelweet"; // Who the email is from
        $email_subject = "Replay from Faiz alelweet"; // The Subject of the email
        //$email_message = "Thanks for visiting <a href="http://www.hackingethics.com/" class="kblinker" target="_blank" title="More about HackingEthics »">HackingEthics</a>.com! <br>";
        $email_message .= $this->msg.'<br/>'; // Message that the email has in it
        $email_to = $this->email; // Who the email is to
        $headers = "From: ".$email_from;
        $file = fopen($fileatt,'rb');
        $data = fread($file,filesize($fileatt));
        fclose($file);
        $semi_rand = md5(time());
        $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";
        $headers .= "\nMIME-Version: 1.0\n" .
        "Content-Type: multipart/mixed;\n" .
        " boundary=\"{$mime_boundary}\"";
        $email_message .= "This is a multi-part message in MIME format.\n\n" .
        "--{$mime_boundary}\n" .
        "Content-Type:text/html; charset=\"iso-8859-1\"\n" .
        "Content-Transfer-Encoding: 7bit\n\n" .
        $email_message .= "\n\n";
        $data = chunk_split(base64_encode($data));
        $email_message .= "--{$mime_boundary}\n" .
        "Content-Type: {$fileatt_type};\n" .
        " name=\"{$fileatt_name}\"\n" .
        //"Content-Disposition: attachment;\n" .
        //" filename=\"{$fileatt_name}\"\n" .
        "Content-Transfer-Encoding: base64\n\n" .
        $data .= "\n\n" .
        "--{$mime_boundary}--\n";
        $sent = @mail($email_to, $email_subject, $email_message, $headers);
        if($sent) {
        echo "Mail has send to the user";
        } else {
        die("Error in sending...");
        } 
    
    }

}

?>   