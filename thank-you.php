<!DOCTYPE html>
<html lang="en">

<head>
    <title>Thank You | yesautomation.ae</title>
    <link rel="shortcut icon" href="images/favicon.png">
    <meta name="description" content="Thank you for contacting YES Automation. We have received your enquiry and will get back to you shortly.">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="main/bootstrap.min.css">
    <link rel="stylesheet" href="main/layout.css">
    <link rel="stylesheet" href="main/contact.css">
    <link rel="stylesheet" href="main/menu.css">
    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
</head>

<body>
    <?php $page = 'contact';
    include 'header.php'; ?>

    <section id="contact-banner" class="thank-you-banner">
        <div class="slide-desc">
            <div class="cap-one">
                <h1>Thank You</h1>
            </div>
        </div>
    </section>

    <section id="contact-content">
        <div class="container-fluid">
            <div class="row contact-address">
                <div class="col-md-10 col-md-offset-1 thank-you-content">
                    <h2>Thank you for your enquiry</h2>
                    <p>We have received your message and will get back to you shortly.</p>
                    <div class="thank-you-actions">
                        <a href="contact-us.php" class="thank-you-btn">Back to Contact</a>
                        <a href="index.php" class="thank-you-btn thank-you-btn--secondary">Go to Home</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php include 'footer.php'; ?>
</body>

</html>
