<?php 
$host='localhost:82';

$user='root';

$password='';

$db='faiz';

$con = mysql_connect($host, $user, $password) or die('error');

mysql_select_db($db, $con) or die('error');
?>
<html>
    <head>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <meta content="utf-8" http-equiv="encoding">
        <title>TMS</title>
        <!-- <link href="../manage/css/bootstrap.css" rel="stylesheet">
        <link href="../manage/css/layout.css" rel="stylesheet">
        <link href="../manage/css/datepicker.css" rel="stylesheet"> -->
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
        <script src="//code.jquery.com/jquery-1.10.2.js"></script>
        <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
        <link rel="stylesheet" href="/resources/demos/style.css">
        <script>
            $(function() {
                $( "#datepicker" ).datepicker();
            });
        </script>
        <style type="text/css"></style> 


        <script>
            $(document).ready(function() {
                $('#selecctall').click(function(event) {  //on click 
                    if(this.checked) { // check select status
                        $('.checkbox1').each(function() { //loop through each checkbox
                            this.checked = true;  //select all checkboxes with class "checkbox1"               
                        });
                    }else{
                        $('.checkbox1').each(function() { //loop through each checkbox
                            this.checked = false; //deselect all checkboxes with class "checkbox1"                       
                        });         
                    }
                });
    
            });
        </script>
        <?php include '../manage/includes/header.php' ?>

        <script type="text/javascript">


  
            function load(){

                var a=$("#upload").val();

                if(a=='link'){
                    $('#link').show();
                    $('#file').hide();
                }
                else if(a=='image'){
                    $('#file').show();
                    $('#link').hide();
                }
                else{
                    $('#file').hide();
                    $('#link').hide();
                }
            }


        </script>
    </head>
    <body>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">New Deal</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="reg-for">
                                <div>
                                    <div class="clearfix"></div>
                                    <div>
                                        <div class="form">
                                            <form name="registration1_form" id="registration1_form" method="post" action="<?php echo MANAGE_TEAM ?>add_deal" onsubmit="return validate(this);" enctype="multipart/form-data">

                                                <div class="form-group">
                                                    <div class="col-md-5">
                                                        <select name="category" id="district" class="form-control" required>

                                                            <option value="">- Select category -</option>
                                                            <?php
                                                            foreach ($this->category as $details):
                                                                ?>

                                                                <option value="<?php echo $details['pk_int_category_id']; ?>">
    <?php echo $details['vchr_category_name'] ?></option>


<?php endforeach; ?>


                                                        </select>

                                                    </div>


                                                    <div class="col-md-5">
                                                        <input  id="name" name="heading" class="form-control" type="text" placeholder="Deal heading" style="
                                                                margin-left: 0%;
                                                                width: 100%;
                                                                ">
                                                    </div>

                                                    <div class="clearfix"></div></div>

                                                <div class="form-group">
                                                    <div class="col-md-5">
                                                        <select id="upload" onchange="load()" class="form-control">

                                                            <option value="none">- Select One Option only -</option>


                                                            <option value="image" id="img">Image Uploading  </option>
                                                            <option value="link" id="lnk">Link  </option>





                                                        </select>
                                                    </div>
                                                    <!-- <div class="col-md-5">
                                                    <input type="file" class="form-control" id="inputUsernameEmail" required name="file" style="
                                                        margin-left: 0%;
                                                        width: 100%;
                                                    " >
                                                    </div> -->
                                                    <div class="col-md-5">
                                                        <label>Description </label>
                                                        <textarea id="supportAdd" name="description" style="
                                                                  width: 100%;
                                                                  height: 108px;
                                                                  " placeholder="Description"  ></textarea>
                                                    </div>
                                                    <!--<script>
                                                        function textdone (){
                                                            var txt = document.getElementById("Add1");
                                                            alert(txt.value);
                                                        }
                                                    </script>
                                                    <button onclick="textdone()">dfd</button>-->


                                                    <div class="clearfix"></div></div>
                                                <div class="form-group" id="file" style="display:none">
                                                    <div class="col-md-5" >
                                                        <input  id="name" name="file"  class="form-control" type="file"   style="
                                                                margin-left: -1%;
                                                                width: 100%;
                                                                margin-top: -3%;
                                                                "> 
                                                    </div>

                                                </div>


                                        </div>



                                        <div class="form-group" id="link" style="display:none">
                                            <div class="col-md-5" id="show">
                                                <input  id="name" name="link_site" class="form-control" type="text"   placeholder="Link to image" style="
                                                        margin-left: 4%;
                                                        width: 97%;
                                                        margin-top: -18%;
                                                        ">
                                            </div> 

                                        </div>
                                        <div class="form-group">
                                            <div class="col-md-5">
                                                <input type="text" name="expiry" placeholder="Expiry Date" required class="form-control" id="datepicker" style="
                                                       width: 97%;
                                                       margin-left: 3%;
                                                       ">
                                            </div>

                                            <div class="col-md-5">
                                                <input type="text" class="form-control" id="file" placeholder="Discount" name="discount" style="margin-left: 0%;
                                                       width: 50%;
                                                       margin-top: 0%; float: left;
                                                       "> <p style=" display: block; float: left; margin-left: 10px; margin-top: 5px;">
                                                    <input type="radio" name="test" id="input1" value="%" />% 
                                                    <input type="radio" name="test" id="input2" value="$" />$
                                                </p>

                                            </div>

                                            <div class="clearfix"></div></div>


                                        <div class="form-group">



                                            <div class="clearfix"></div></div>
                                        <div class="form-group">
                                            <div class="col-md-5">
                                                <input  id="name" name="link" class="form-control" type="text"  placeholder="Link to deal" style="
                                                        margin-left: 3%;
                                                        width: 97%;
                                                        margin-top: -2%;
                                                        ">
                                            </div>
                                            <div class="col-md-5" style="
                                                 margin-top: -1%;">
                                                <input type="text" name="coupencode"  class="form-control" id="inputUsernameEmail" placeholder="Coupen code" style="
                                                       width: 98%;

                                                       ">
                                            </div>




                                        </div>
                                        <div class="form-group">

                                            <div class="col-md-12" style="  margin-top: 2%;
                                                 margin-left: 2%;">Hot Deal 
                                                <input type="checkbox" name="deal_type"  default="0" value="1" style="width:5%;" >
                                                Free shipping <input type="checkbox" name="free"  style="width:5%;" >
                                            </div>
                                            <!--    <div class="col-md-5" style="  margin-top: 2%;
                                              margin-left: 2%;"> Free shipping <input type="checkbox" name="deal_type1"  default="0" value="1" style="width:5%;" >
                                            </div>-->
                                            <!-- <div class="col-md-5" style="
                                                margin-top: -24px;
                                                margin-left: 1%;
                                            ">
                                                <input  id="name" name="orderno" class="form-control" type="number" required placeholder="Sort Order No" style="
                                                width: 98%;
                                            ">
                                            </div> -->
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success">Submit</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- new enqiry menu -->



        <div class="icon-container" >
<?php include '../manage/includes/inner-menu.php'; ?>

            <div class="col-md-9">

                <div class="row">
                    <div class="bread">
                        <div id="bc1" class="btn-group btn-breadcrumb">
                            <a href="<?php echo ABS_PATH ?>" class="btn btn-default"><i class="fa fa-home"></i></a>
                            <a href="http://bestdeals2shop.com/manage/manageTeam/view_deals" class="btn btn-default"><div>Deals</div></a>

                        </div>
                    </div>
                    <div class="row">
                        <div class="reg-form">
                            <div class="bulk">
                                <div class="col-md-4"><h3 style="padding-left:1.2%">Deals</h3>
                                </div>
                                <div class="col-md-1" style="
                                     margin-left: -13%;
                                     margin-top: 2%;
                                     ">
                                    <div class="dropdown">
                                        <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Select category
                                            <span class="caret"></span></button>
                                        <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
<?php foreach ($this->category as $details): ?>
                                                <li role="presentation"><a role="menuitem" tabindex="-1" href="<?php echo MANAGE_TEAM . 'view_deals1/' . $details['pk_int_category_id']; ?>"><?php echo $details['vchr_category_name'] ?></a></li>

                                                <li role="presentation" class="divider"></li>
<?php endforeach; ?>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-2 pull-right enq-btn"><a href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-envelope"></i>Add Deals</a></div>
                                <div class="col-md-2 pull-right enq-btn"><a href="<?php echo MANAGE_TEAM . 'Deleteexpired' ?>"><i class="fa fa-envelope"></i>Delete Expired Products</a></div>

                                <div class="clearfix"></div>
                            </div>
                            <div class="form clearfix">

                                <form name="registration1_form" id="registration1_form" method="POST" action="<?php echo MANAGE_TEAM . 'deletese' ?>" enctype="multipart/form-data">

                                    <div class="table-cntnr">

                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Category</th>
                                                    <th style="
                                                        width: 10%;
                                                        ">Deal heading</th>
                                                                  <!-- <th>Description</th> -->

                                                    <th>Expiry Date</th>
                                                    <th>Discount</th>
                                                    <th>Coupen Code</th>
                                                    <th>Image</th>
                                                    <th>day count</th>
                                                    <!-- <th>Sort Order</th> -->
                                                    <!-- <th>Deal Type</th> -->
                                                    <th style="width:13%">Action</th>
                                                    <td><input type="checkbox" id="selecctall"/>  All</li></td>


                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>

<?php
$i = 1;

foreach ($this->get as $details):
    ?>
                                                        <td><?php echo $i; ?></td>
                                                        <td><?php echo $details['vchr_category_name'] ?></td>
                                                        <td><?php echo substr($details['vchr_deal_heading'], 0, 150) ?></td>
                                                        <!-- <td><p>  //$string=$details['vchr_deal_description'];
                                                        //echo substr($string, 0,80);
                                                        
                                                         ?></p></td> -->


                                                        <td><?php echo $details['expiry_date'] ?></td>
                                                        <td>
    <?php
    $discount1 = $fetch['int_discount'];

    $d = $discount1;


    $t1 = substr($d, 0, -1); // return 20
    $t2 = substr($d, strlen($d) - 1, 1);




    echo $details['int_discount']
    ?></td>
                                                        <td><?php echo $details['coupen_code'] ?></td>
                                                        <?php
                                                        $name = explode('.', $details['vchr_image']);



                                                        if ($name[1] == 'jpg' || ($name[1] == 'jpeg') || ($name[1] == 'png')) {
                                                            ?>
                                                            <td>                                                                                                                                                                                                                     
                                                                <img src="<?php echo UPLOADS .
                                                    $details['vchr_image'];
                                                    ?>"style="width:100px;height:auto">
                                                            </td>
                                                                 <?php } else {
                                                                     ?>
                                                            <td><?php echo $details['vchr_image'] ?> </td> <?php
                                                }
                                                $date = $details['expiry_date'];
                                                $d = date("Y/m/d");
                                                $d1 = $d; // Today 

                                                $d2 = $date; // Expiry

                                                $datetime1 = new DateTime($d1);
                                                $datetime2 = new DateTime($d2);
                                                $difference = $datetime1->diff($datetime2);
                                                 $sqldays=mysql_query("SELECT DATEDIFF('$date','$d') AS days");
                                                 $resultday=mysql_fetch_array($sqldays);
                                                 

                                                $day = ($datetime1 > $datetime2) ? '-' . $difference->d : $difference->d;
                                                                 ?>
                                                        <td><?php
                                                    if ($resultday['days'] == 0) {
                                                        echo 'Today';
                                                    } elseif ($resultday['days'] == 1) {
                                                        echo '1' . '&nbsp' . 'day';
                                                    } else {
                                                        echo $resultday['days'] . '&nbsp' . 'days';
                                                    }
                                                    ?> </td>


                                                        <td>
                                                            <a href="<?php echo MANAGE_TEAM . 'deletedeal/' . $details['pk_int_deal_id'] ?>" class="action" onclick="return confirm('Are you Sure want to Delete This entry');"><i class="fa  fa-trash-o"></i></a>
                                                            <a href="<?php echo MANAGE_TEAM . 'editdeal/' . $details['pk_int_deal_id'] ?>" class="action"><i class="fa  fa-edit"></i></a>
                                                        <td><input name="checkbox[]" class="checkbox1" type="checkbox" value="<?php echo $details['pk_int_deal_id']; ?>"></td>
                                                        </td>


                                                    </tr>

    <?php $i++ ?>
<?php endforeach; ?>



                                            </tbody>

                                        </table>

                                    </div>

                                    <div class="col-md-12"><button type="submit" name="delete" class="btn btn-success  pull-right" onclick="return confirm('Are you Sure want to Delete This All entry');">Delete</button></div>
                                </form>

                            </div>
                        </div>
                    </div>


                </div>

            </div>
            <div class="clearfix"></div>
        </div>
        <div class="footer">Powered by Adox solutions</div>

        <script src="../manage/public/js/bootstrap.js"></script> 
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
            $(document).ready(function(){
                $("#sort").live('keypress',function(e){
                    var code=(e.keyCode ? e.keyCode : e.which);
                    if(code==13){
                        $(this).closest('myform').submit();
                    }
                });
            });

        </script>
        <script>
            function test() {
                var ts=$(this).val();
                alert(ts);
            }
        </script>
    </body>
</html>
