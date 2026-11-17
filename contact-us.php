<?php
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

$mail_flash = '';

if (isset($_POST['subc'])) {
    $smtpFile = __DIR__ . '/smtp-config.php';
    $smtp = (is_file($smtpFile)) ? require $smtpFile : [];
    if (!is_array($smtp)) {
        $smtp = [];
    }

    $name = isset($_POST['firstname']) ? trim($_POST['firstname']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['mobile']) ? trim($_POST['mobile']) : '';
    $msg = isset($_POST['msg']) ? trim($_POST['msg']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';

    $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $safePhone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $safeSubject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
    $safeMsg = nl2br(htmlspecialchars($msg, ENT_QUOTES, 'UTF-8'));

    $htmlBody = '
<div style="background:#e5e5e5; padding:2% 6%">
<div style="padding:15px; background:#e7e7e7;text-align: center;  border-bottom:solid 5px #9dc33b">
<div><img src="https://www.yesautomation.ae/images/logo.png"  alt="Yesautomation" /></div>
</div>
<div style="margin-top: -6%;">
<div style="padding:15px 15px 35px 15px; background:white;text-align: center; ">
<H1>Enquiry from Yesautomation Website</H1>
<div style="padding-bottom:5px; height: 30px; border-top:dashed 1px #e5e5e5; padding-top:20px;">
<div > Name:  <a style="color:#999">' . $safeName . '</a></div>
</div>
<div style="padding-bottom:5px; height: 30px;">
<div > Mail:  <a style="color:#999">' . $safeEmail . '</a></div>
</div>
<div style="padding-bottom:5px; height: 30px;">
<div > Phone:  <a style="color:#999">' . $safePhone . '</a></div>
</div>
<div style="padding-bottom:5px; height: 30px;">
<div > Subject:  <a style="color:#999">' . $safeSubject . '</a></div>
</div>
<div style="padding-bottom:5px; min-height: 30px;">
<div > Message:  <a style="color:#999">' . $safeMsg . '</a></div>
</div>
</div>
</div>';

    $textBody = "Enquiry from Yesautomation Website\n"
        . "Name: {$name}\n"
        . "Mail: {$email}\n"
        . "Phone: {$phone}\n"
        . "Subject: {$subject}\n"
        . "Message: {$msg}\n";

    $sent = false;
    $mailSubject = $subject !== '' ? ('Enquiry: ' . $subject) : 'Enquiry From Yesautomation website';
    $toEmail = !empty($smtp['to_email']) ? $smtp['to_email'] : 'sales@yesautomation.ae';
    $toName = !empty($smtp['to_name']) ? $smtp['to_name'] : 'Yes Automation Sales';
    $fromEmail = !empty($smtp['from_email']) ? $smtp['from_email'] : 'sales@yesautomation.ae';
    $fromName = !empty($smtp['from_name']) ? $smtp['from_name'] : 'Yesautomation';
    $useSmtp = !empty($smtp['host']) && !empty($smtp['username']) && !empty($smtp['password']);

    if ($useSmtp) {
        require __DIR__ . '/vendor/autoload.php';
        try {
            $mailer = new PHPMailer(true);
            $mailer->isSMTP();
            $mailer->Host = $smtp['host'];
            $mailer->SMTPAuth = true;
            $mailer->Username = $smtp['username'];
            $mailer->Password = $smtp['password'];
            $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mailer->Port = !empty($smtp['port']) ? (int) $smtp['port'] : 587;
            $mailer->CharSet = 'UTF-8';

            $mailer->setFrom($fromEmail, $fromName);
            $mailer->addAddress($toEmail, $toName);
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $mailer->addReplyTo($email, $name !== '' ? $name : $email);
            }

            $mailer->isHTML(true);
            $mailer->Subject = $mailSubject;
            $mailer->Body = $htmlBody;
            $mailer->AltBody = $textBody;
            $mailer->send();
            $sent = true;
        } catch (Exception $e) {
            $errorDetail = isset($mailer) ? $mailer->ErrorInfo : $e->getMessage();
            error_log('Contact form SMTP error: ' . $errorDetail);
        }
    }

    if (!$sent) {
        $header = 'MIME-Version: 1.0' . "\r\n";
        $header .= 'Content-type: text/html; charset=utf-8' . "\r\n";
        $header .= 'From: ' . $fromName . ' <' . $fromEmail . '>' . "\r\n";
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $header .= 'Reply-To: ' . $email . "\r\n";
        }
        $sent = @mail($toEmail, $mailSubject, $htmlBody, $header);
    }

    $host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '';
    $isLocal = (bool) preg_match('/(\.local|\.test|localhost|127\.0\.0\.1)(:\d+)?$/i', $host);

    if ($sent || $isLocal) {
        header('Location: thank-you.php');
        exit;
    }

    $mail_flash = 'Mail send failed. Please try again.';
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
	<link rel="canonical" href="https://www.yesautomation.ae/contact-us.php" />

	<link rel="stylesheet" href="main/bootstrap.min.css">
	<link rel="stylesheet" href="main/layout.css">
	<link rel="stylesheet" href="main/contact-new.css">
	<link rel="stylesheet" href="main/menu.css">
	<link rel="stylesheet" href="slider/skdslider.css">
	<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
</head>

<body>
	<?php $page = 'contact';
    include 'header.php'; ?>

	<section id="cn-banner" class="cn-banner" aria-label="Contact Us">
		<div class="cn-banner__overlay"></div>
		<div class="cn-banner__content">
			<h1>Contact Us</h1>
		</div>
	</section>

	<section id="cn-main" class="cn-main">
		<div class="cn-wrap">
			<header class="cn-intro">
				<h2>Our Location</h2>
				<p>If you would like to find out more about how YES Automation can help your business, we will be more than happy to speak with you and set up a meeting to identify your requirement and provide you our proposal</p>
			</header>

			<div class="cn-grid">
				<aside class="cn-location" aria-labelledby="cn-office-title">
					<h3 id="cn-office-title">Head office</h3>
					<div class="cn-location__address">
						<p class="cn-location__company">YES AUTOMATION LLC</p>
						<p>BLOCK NO. 7, WAREHOUSE NO 3</p>
						<p>UM LAOB REGION, PLOT NO. 1628</p>
						<p>UMM AL QUWAIN, UAE</p>
					</div>

					<div class="cn-location__contact">
						<p><span>TEL :</span> <a href="tel:+97165264382">+971 6 526 4382</a></p>
						<p><span>MOB :</span> <a href="tel:+971565388502">+971 56 538 8502</a></p>
						<p><span>FAX :</span> +971 6 5264384</p>
						<p><span>Mail :</span> <a href="mailto:sales@yesautomation.ae">sales@yesautomation.ae</a></p>
					</div>
				</aside>

				<div class="cn-form-panel" id="contact-form">
					<div class="cn-form-head">
						<h2>Quick Enquiry</h2>
						<p>Brief us your requirements below, and let's connect</p>
						<?php if (!empty($mail_flash)) { ?>
							<p class="cn-mail-flash" style="color:#e53935;margin-top:10px;"><?php echo htmlspecialchars($mail_flash, ENT_QUOTES, 'UTF-8'); ?></p>
						<?php } ?>
					</div>

					<form id="cnEnquiryForm" class="cn-form" action="" method="post" novalidate>
						<div class="cn-form__row">
							<div class="cn-field" data-field="firstname">
								<input type="text" id="cn-firstname" name="firstname" placeholder="First Name" autocomplete="given-name" maxlength="80" aria-describedby="err-firstname">
								<span class="cn-error" id="err-firstname" role="alert"></span>
							</div>
							<div class="cn-field" data-field="email">
								<input type="email" id="cn-email" name="email" placeholder="E-Mail" autocomplete="email" maxlength="120" aria-describedby="err-email">
								<span class="cn-error" id="err-email" role="alert"></span>
							</div>
						</div>

						<div class="cn-form__row">
							<div class="cn-field" data-field="mobile">
								<input type="tel" id="cn-mobile" name="mobile" placeholder="Phone" autocomplete="tel" maxlength="20" inputmode="tel" aria-describedby="err-mobile">
								<span class="cn-error" id="err-mobile" role="alert"></span>
							</div>
							<div class="cn-field" data-field="subject">
								<input type="text" id="cn-subject" name="subject" placeholder="Subject" maxlength="150" aria-describedby="err-subject">
								<span class="cn-error" id="err-subject" role="alert"></span>
							</div>
						</div>

						<div class="cn-field cn-field--full" data-field="msg">
							<textarea id="cn-msg" name="msg" placeholder="Message" rows="6" maxlength="2000" aria-describedby="err-msg"></textarea>
							<span class="cn-error" id="err-msg" role="alert"></span>
						</div>

						<div class="cn-form__actions">
							<button type="submit" name="subc" value="1" class="cn-submit">Send Mail</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>

	<div class="cn-map">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.311212703181!2d55.66114237522392!3d25.561310877478412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5fda30b10c7a9%3A0x1281e5103fcbf1dd!2sYES%20Automation%20LLC!5e0!3m2!1sen!2sin!4v1786424587655!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>

	<?php include 'footer.php'; ?>

	<script src="js/script.js"></script>
	<script src="js/custom.js"></script>
	<script>
	(function () {
		var form = document.getElementById('cnEnquiryForm');
		if (!form) return;

		var fields = {
			firstname: {
				el: document.getElementById('cn-firstname'),
				err: document.getElementById('err-firstname'),
				validate: function (v) {
					if (!v.trim()) return 'Please enter your full name.';
					if (/[0-9]/.test(v)) return 'Name cannot contain numbers.';
					if (!/^[A-Za-z][A-Za-z\s.'-]{1,}$/.test(v.trim())) return 'Please enter a valid name.';
					return '';
				}
			},
			email: {
				el: document.getElementById('cn-email'),
				err: document.getElementById('err-email'),
				validate: function (v) {
					if (!v.trim()) return 'Please enter your email address.';
					if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Please enter a valid email address.';
					return '';
				}
			},
			mobile: {
				el: document.getElementById('cn-mobile'),
				err: document.getElementById('err-mobile'),
				validate: function (v) {
					if (!v.trim()) return 'Please enter your mobile number.';
					if (!/^[0-9+\-()\s]+$/.test(v)) return 'Phone can only contain numbers and symbols.';
					var digits = v.replace(/\D/g, '');
					if (digits.length < 10) return 'Please enter a valid mobile number (10 or more digits).';
					if (digits.length > 15) return 'Please enter a valid mobile number (max 15 digits).';
					return '';
				}
			},
			subject: {
				el: document.getElementById('cn-subject'),
				err: document.getElementById('err-subject'),
				validate: function (v) {
					if (!v.trim()) return 'Please enter a subject.';
					if (v.trim().length < 3) return 'Subject must be at least 3 characters.';
					return '';
				}
			},
		 
		};

		function setError(key, message) {
			var f = fields[key];
			var wrap = f.el.closest('.cn-field');
			f.err.textContent = message || '';
			if (message) {
				wrap.classList.add('is-invalid');
				f.el.setAttribute('aria-invalid', 'true');
			} else {
				wrap.classList.remove('is-invalid');
				f.el.removeAttribute('aria-invalid');
			}
		}

		function validateField(key) {
			var f = fields[key];
			var msg = f.validate(f.el.value);
			setError(key, msg);
			return !msg;
		}

		function validateAll() {
			var ok = true;
			Object.keys(fields).forEach(function (key) {
				if (!validateField(key)) ok = false;
			});
			return ok;
		}

		// Name: block digits while typing
		fields.firstname.el.addEventListener('input', function () {
			var cleaned = this.value.replace(/[0-9]/g, '');
			if (cleaned !== this.value) this.value = cleaned;
			if (this.closest('.cn-field').classList.contains('is-invalid')) validateField('firstname');
		});

		// Phone: allow only numbers and phone symbols
		fields.mobile.el.addEventListener('input', function () {
			var cleaned = this.value.replace(/[^0-9+\-()\s]/g, '');
			if (cleaned !== this.value) this.value = cleaned;
			if (this.closest('.cn-field').classList.contains('is-invalid')) validateField('mobile');
		});

		Object.keys(fields).forEach(function (key) {
			var f = fields[key];
			f.el.addEventListener('blur', function () { validateField(key); });
			f.el.addEventListener('input', function () {
				if (f.el.closest('.cn-field').classList.contains('is-invalid')) validateField(key);
			});
		});

		form.addEventListener('submit', function (e) {
			if (!validateAll()) {
				e.preventDefault();
				var firstInvalid = form.querySelector('.cn-field.is-invalid input, .cn-field.is-invalid textarea');
				if (firstInvalid) firstInvalid.focus();
			}
		});
	})();
	</script>
</body>

</html>
