<?php include_once('functions.php');

// Cities
$emirates = [];
$emirates = getEmirates();

// Get questions for products
$arrQues = getQuestions($model);
// $questions = $arrQues['questions'];
?>
<div id="modalOne" class="modal-quote">
    <div class="modal-content">
        <div class="contact-form">
            <a class="close">&times;</a>
            <!-- <form action="/">
            <h2>Contact Us</h2>
            <div>
              <input class="fname" type="text" name="name" placeholder="Full name" />
              <input type="text" name="name" placeholder="Email" />
              <input type="text" name="name" placeholder="Phone number" />
              <input type="text" name="name" placeholder="Website" />
            </div>
            <span>Message</span>
            <div>
              <textarea rows="4"></textarea>
            </div>
            <button type="submit" href="/">Submit</button>
          </form> -->

            <form method="post" id="frmquote">
                <h2 class="text-center">Generate Quote Request</h2>
                <div class="row m-bott">
                    <div class="col-md-6">
                        <?php if (isset($catoptions)) { ?>
                            <select class="optionalcat" name="category_id" id="categoryid">
                                <?php foreach ($catoptions as $option) :  ?>
                                    <option value="<?= $option ?>"><?= $option ?></option>
                                <?php endforeach; ?>
                            </select>
                        <?php } else { ?>
                            <input type="hidden" id="categoryid" name="category_id" value="<?= $arrQues['category_id'] ?>">
                        <?php } ?>
                    </div>
                    <div class="col-md-6"></div>
                </div>
                <h4>Company Details</h4>
                <div class="row m-bott">
                    <div class="col-md-6 m-bot">
                        <input type="text" placeholder="Company" id="company" name="company" required>
                    </div>
                    <div class="col-md-6">
                        <input type="text" placeholder="Contact Name" id="name" name="name" required>
                    </div>
                </div>
                <div class="row m-bott">
                    <div class="col-md-6 m-bot">
                        <input type="email" placeholder="Email" id="email" name="email" required>
                    </div>
                    <div class="col-md-6">
                        <input type="text" placeholder="Phone" id="phone" name="phone">
                    </div>
                </div>
                <div class="row m-bott">
                    <div class="col-md-6 m-bot">
                        <select name="city" required>
                            <option value="">--Emirates--</option>
                            <?php foreach ($emirates as $id => $name) : ?>
                                <option value="<?= $id ?>"><?= $name ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <select class="form-control" name="delivery_method" required>
                            <option value="">--Delivery--</option>
                            <option value="supplier">By Supplier</option>
                            <option value="buyer">By Buyer</option>
                        </select>
                    </div>
                </div>
                <div class="row m-bott">
                    <div class="col-md-6">
                        <div class="form-check">
                            <label class="m-bot" for="duration">Work Schedule</label>
                            <div class="input-group">
                                <!-- <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-clock"></i></span>
                                </div> -->
                                <input type="text" class="form-control float-right" id="rentaltime">
                                <input type="hidden" name="rental_from" id="rental_from">
                                <input type="hidden" name="rental_to" id="rental_to">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="is_technician">Is technician required for the job?
                            <input type="checkbox" name="is_technician" id="is_technician" value="1" style="width:6%; vertical-align: middle; margin: 0;">
                        </label>
                        <div class=" hide" id="tech_timing">
                            <!-- <label for="technician_time">Technician Timing</label> -->
                            <div class="input-group">
                                <!-- <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-clock"></i></span>
                                </div> -->
                                <input type="text" class="form-control float-right" id="techtime">
                                <input type="hidden" name="duration_from" id="duration_from">
                                <input type="hidden" name="duration_to" id="duration_to">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row m-bott">
                    <div class="col-md-12">
                        <textarea placeholder="Your Comments" id="remarks" name="remarks"></textarea>
                    </div>
                </div>
                <h4>Tell us more about your requirement</h4>
                <div id="question_block"></div>
                <div class="row m-bott">
                    <div class="col-md-4"></div>
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <input type="submit" value="Generate Quote" name="sendquote" style="background: #f26726;">
                    </div>
                </div>

                <p id="resultinfo" style="color:red;"></p>

            </form>

        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css">

<script>
    var model = "<?= $model ?>";
    loadQuestion(model);

    $(document).ready(function() {

        $('#is_technician').on('click', function(e) {
            if (this.checked) {
                $('#tech_timing').removeClass('hide');

            } else {
                $('#tech_timing').addClass('hide');
                $('#duration_from').val('');
                $('#duration_to').val('');
            }
        });
        $("form").on("submit", function(event) {
            event.preventDefault();

            var formValues = $(this).serialize();

            $.post("postquoterequest.php", formValues, function(data) {
                // Display the returned data in browser          
                //$('#resultinfo').html(data.message).fadeOut();

                $('#frmquote')[0].reset(); // Reset all form data
                alert('You are successfully placed the quote request !');
            });
        });

        //Date range picker with time picker
        $('#rentaltime').daterangepicker({
            timePicker: false,
            locale: {
                format: 'DD/MM/YYYY'
            }
        }, function(start, end, label) {
            if (!start || !end) {
                $('#rental_from').val('');
                $('#rental_to').val('');
            }
            $('#rental_from').val(start.format('YYYY-MM-DD'));
            $('#rental_to').val(end.format('YYYY-MM-DD'));
        });


        $('#techtime').daterangepicker({
            timePicker: false,
            locale: {
                format: 'DD/MM/YYYY'
            }
        }, function(start, end, label) {
            if (!start || !end) {
                $('#duration_from').val('');
                $('#duration_to').val('');
            }
            $('#duration_from').val(start.format('YYYY-MM-DD'));
            $('#duration_to').val(end.format('YYYY-MM-DD'));
        });

        $('.optionalcat').on('change', function(e) {
            let catid = $(this).val();
            loadQuestion(catid);

        });

    });

    function loadQuestion(catid) {
        $.ajax({
            type: "GET",
            url: 'questions.php',
            data: {
                'catid': catid
            },
            success: function(data) {
                $('#question_block').html(data);
            },
            error: function(xhr, status, error) {
                console.error(xhr);
            }
        });
    }
</script>