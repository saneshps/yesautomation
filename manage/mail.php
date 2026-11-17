<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
     <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <title>Untitled Document</title>
     </head>

     <body>
          <div style="width:100%; background:#f1f1f1;">
               <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
               <script type="text/javascript">
                    $(document).ready(function() {
                         $( "img" ).css({
                              width: "150px"
                         });
                    });
    
               </script>
               <table cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;table-layout:fixed;margin:0 auto;max-width:600px;width:613px; background:#fff;">


                    <tbody>
                         <tr></tr></tbody>
                    <tbody>

                         <tr style="background-color:#f26330; color:#fff !important;">
                              <td style="width:50%;padding-right:10px;padding-left:10px;padding-top:5px;min-width:0px;vertical-align:middle;line-height:19px;font-size:14px;text-align:left;margin-left:0;margin-right:0;margin-bottom:0;margin-top:0;font-weight:normal;font-family:'Helvetica','Arial',sans-serif;color:#222222;border-collapse:collapse!important;word-break:break-word;padding-bottom:5px" colspan="2">&nbsp;</td>
                              <td width="50%" style="width:50%;padding-left:10px;padding-top:5px;min-width:0px;text-align:right;vertical-align:middle;line-height:19px;font-size:14px;margin-left:0;margin-right:0;margin-bottom:0;margin-top:0;font-weight:normal;font-family:'Helvetica','Arial',sans-serif;color:#222222;border-collapse:collapse!important;word-break:break-word;padding-bottom:5px;padding-right:10px"><span style="width:50%;padding-right:10px;padding-left:10px;padding-top:5px;min-width:0px;vertical-align:middle;line-height:19px;font-size:14px;text-align:rioght;margin-left:0;margin-right:0;margin-bottom:0;margin-top:0;font-weight:normal;font-family:'Helvetica','Arial',sans-serif;color:#222222;border-collapse:collapse!important;word-break:break-word;padding-bottom:5px"><a href="http://www.bestdeals2shop.com" name="14d9e7ba3847be6f_online_1" target="_blank" id="14d9e7ba3847be6f_online_1" style="text-decoration:none;color:#ffffff!important;font-family:Arial;font-weight:bold;font-size:11px"> www.bestdeals2shop.com</a></span></td>
                         </tr>
                         <tr>
                              <td bgcolor="#ff6c00" height="13" colspan="3">

                                   <div style="padding:10px 10px; text-align:center;"> <a href="http://bestdeals2shop.com/"><img src="http://bestdeals2shop.com/images/shop2amaze.png" /></a></div>

                              </td>
                         </tr>
                         <tr>

                         </tr>
                         <tr>
                              <td align="center" style="font-size:0px;border-bottom: 1px solid #d9d9d9; padding-bottom: 17px;" colspan="3"><table width="100%" align="center" cellpadding="0" cellspacing="0" style="margin-right:8px;margin-bottom:5px;display:inline-block">
                                        <tbody>
                                             <tr></tr>
                                             <tr>
                                                  <?php
                                                    $dims = explode('.', $_POST[0]['vchr_image']);
                                                    if (($dims[1] == 'jpeg') || ($dims[1] == 'jpg') || ($dims[1] == 'png')) {
                                                         ?>
                                                         <td align="center"><div style="height:113px;width:128px; max-height:30px;display:block;font-size:0;overflow:hidden"><a target="_blank" style="text-decoration:none" href="http://links.souq.mkt5098.com/ctt?kn=14&amp;ms=MTE1MDYzOTQS1&amp;r=MTI3MjM4ODAxNjc1S0&amp;b=0&amp;j=NTQxOTM1MjAzS0&amp;mt=1&amp;rt=0" name="14d9e7ba3847be6f_uae_souq_com_ae_en_apple_watch"><img style="display:inline-block;vertical-align:middle;max-width:100%;min-height:auto" alt="Apple Watch Sport 38mm" src="http://bestdeals2shop.com/manage/public/uploads/<?php echo $_POST[0]['vchr_image']; ?>" class="CToWUd" /> <span style="vertical-align:middle;display:inline-block;min-height:100%"></span></a></div>
                                                         <?php
                                                         } else {
                                                              $new = explode('<img', $_POST[0]['vchr_image']);
                                                              $f = explode('<a href', $_POST[0]['vchr_image']);
                                                              $f11 = explode('/', $f[1]);
                                                              if (($f11[3] == 'linksynergy.walmart.com') || ($f11[4] == 'linksynergy.walmart.com') || ($f11[2] == 'linksynergy.walmart.com')) {

                                                                   $first = str_ireplace('<img', ' <img height="100" width="100" ', $new[0]);
                                                                   echo $first;
                                                              } else {
                                                                   $t11 = explode('</a>', $_POST[0]['vchr_image']);
                                                                   $ts = str_ireplace('<img', ' <img height="100" width="100" ', $t11[0]);

                                                                   echo $ts;
                                                              }
                                                         }
                                                       ?>

                                                       <div style="display:block;min-height:30px;max-height:30px;overflow:hidden;margin:5px 5px 5px;font-family:Arial;font-size:12px"><a target="_blank" style="text-decoration:none" href="http://links.souq.mkt5098.com/ctt?kn=14&amp;ms=MTE1MDYzOTQS1&amp;r=MTI3MjM4ODAxNjc1S0&amp;b=0&amp;j=NTQxOTM1MjAzS0&amp;mt=1&amp;rt=0" name="deals"><span style="display:inline-block;color:black;color: #ff6c00;font-size:10px;overflow:hidden;word-break:break-word;vertical-align:middle"><?php echo $_POST[0]['vchr_deal_heading']; ?></span> <span style="vertical-align:middle;display:inline-block;min-height:100%"></span></a></div>
                                                       <div style="background: #0f81eb none repeat scroll 0 0; border-radius: 5px;color: #fff !important;font-size: 16px;margin-right: 4px;padding: 10px 64px;text-align: center; float:left; font-family:Arial, Helvetica, sans-serif;" class="col-md-3 discount"><a style="color:#fff !important; text-decoration:none;" target="_blank" style="text-decoration:none" href="http://links.souq.mkt5098.com/ctt?kn=14&amp;ms=MTE1MDYzOTQS1&amp;r=MTI3MjM4ODAxNjc1S0&amp;b=0&amp;j=NTQxOTM1MjAzS0&amp;mt=1&amp;rt=0" name="14d9e7ba3847be6f_uae_souq_com_ae_en_apple_watch"> Discount : <strong><?php echo $_POST[0]['int_discount']; ?></strong></a></div></td>
                                             </tr>
                                        </tbody>
                                   </table></td>
                         </tr>
                         <tr>
                              <td height="10"></td>
                         </tr>
                         <tr>
                              <td height="10"></td>
                         </tr>
                         <tr bgcolor="#f26330">
                              <td style="font-size:18px;text-transform:uppercase;padding-top:12px;padding-bottom:12px;text-align:center;word-break:break-word;border-collapse:collapse!important;vertical-align:top;color:#fff;font-family:verdana,sans-serif;font-weight:normal;padding-right:0;padding-left:0;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;line-height:19px" colspan="3"><a target="_blank" style="color:#000;text-decoration:none" href="http://links.souq.mkt5098.com/ctt?kn=19&amp;ms=MTE1MDYzOTQS1&amp;r=MTI3MjM4ODAxNjc1S0&amp;b=0&amp;j=NTQxOTM1MjAzS0&amp;mt=1&amp;rt=0" name="14d9e7ba3847be6f_deals_souq_com_ae_en__pid_tag_">featured deals</a></td>
                         </tr>
                         <tr>
                              <td height="15"></td>
                         </tr>
                         <tr>
                              <td align="center" colspan="3">
                                   <?php foreach ($_POST as $arr) { ?>
                                          <table width="130" cellspacing="0" cellpadding="0" style="margin-right:8px;margin-bottom:5px;border:1px solid #e5e5e5;display:inline-block">
                                               <tbody>
                                                    <tr></tr>
                                                    <tr>
                                                         <td align="center">
                                                              <div style="height:113px!important;width:128px; max-height:30px; display:block;font-size:0;overflow:hidden">
                                                                   <?php
                                                                   $dim = explode('.', $arr['vchr_image']);
                                                                   if (($dim[1] == 'jpeg') || ($dim[1] == 'jpg') || ($dim[1] == 'png')) {
                                                                        ?>
                                                                        <a target="_blank" style="text-decoration:none" href="http://bestdeals2shop.com" name="14d9e7ba3847be6f_uae_souq_com_ae_en_apple_watch"><img style="display:inline-block;vertical-align:middle;width:100px;height:100px" alt="Apple Watch Sport 38mm" src="http://bestdeals2shop.com/manage/public/uploads/<?php echo $arr['vchr_image']; ?>" class="CToWUd" /> 
                                                                             <span style="vertical-align:middle;display:inline-block;height:100%">

                                                                             </span>
                                                                        </a>
                                                                   <?php
                                                                   } else {
//                                                        foreach($_POST[0]['vchr_image'] as $img)
//                                                        {
//                                                         $new1=explode('<img',$img);
//                                                    $fn=explode('<a href',$img);
//                                                    $f1n=explode('/',$fn[1]);
//                                                        }
//                                                    
//                                                     if(($f1n[3]=='linksynergy.walmart.com')||($f1n[4]=='linksynergy.walmart.com')||($f1n[2]=='linksynergy.walmart.com'))
//                                                  {
//                                                      $new11=explode('<img',$_POST[0]['vchr_image']);
//                                                        $first1 = str_ireplace('<img', ' <img height="100" width="100" ',$new11[0]);
//                                                        echo $first1;
//                                                    }else  {
                                                                        $t1s = explode('</a>', $arr['vchr_image']);
                                                                        $tm = str_ireplace('<img', ' <img height="100" width="100" ', $t1s[0]);
                                                                        $tm1 = explode('<img', $tm);
                                                                        if ($tm1[2]) {
                                                                             $new11 = explode('<img', $_POST[0]['vchr_image']);
                                                                             $first1 = str_ireplace('<img', ' <img height="100" width="100" ', $new11[0]);
                                                                             echo $first1;
                                                                        } else {
                                                                             echo $tm;
                                                                        }
                                                                   }
                                                                   ?>


                                                              </div>

                                                             <div style="display:block;min-height:30px;max-height:30px;overflow:hidden;margin:5px 5px 5px;font-family:Arial;font-size:12px"><a target="_blank" style="text-decoration:none" href="http://bestdeals2shop.com" name="14d9e7ba3847be6f_uae_souq_com_ae_en_apple_watch"><span style="display:inline-block;color:black;color:#595959;font-size:12px;overflow:hidden;word-break:break-word;vertical-align:middle"><?php echo $arr['vchr_deal_heading']; ?> </span> <span style="vertical-align:middle;display:inline-block;min-height:100%"></span></a></div>
                                                             <?php 
                                                              $d = $arr['int_discount'];;


                                        $t1 = substr($d, 0, -1); // return 20
                                        $t2 = substr($d, strlen($d) - 1, 1);
                                                             
                                                        if($t2=='%')  {   ?>
                                                              
                                                                   <a target="_blank" style="text-decoration:none" href="http://bestdeals2shop.com" name="14d9e7ba3847be6f_uae_souq_com_ae_en_apple_watch"><span style="display:block;font-family:Arial;font-size:12px;font-weight:bold;line-height:15px;color:#ff951b;display:block;padding-bottom:5px">Discount : <?php echo  $d; ?> </span></a></td>
                                                                   <?php } else { ?>
  <a target="_blank" style="text-decoration:none" href="http://bestdeals2shop.com" name="14d9e7ba3847be6f_uae_souq_com_ae_en_apple_watch"><span style="display:block;font-family:Arial;font-size:12px;font-weight:bold;line-height:15px;color:#ff951b;display:block;padding-bottom:5px">Discount : <?php echo $t2.$t1; ?> </span></a></td>
  <?php }?>

                                                       
                                                    </tr>
                                               </tbody>
                                          </table>
  <?php } ?>
                              </td>
                         </tr>
                         <tr>
                              <td height="15"></td>
                         </tr>
                         <tr>
                              <td align="center" colspan="3"><a target="_blank" name="14d9e7ba3847be6f_unsub_1" href="http://bestdeals2shop.com/unsubscribe.php?<?php echo 'id='.$_POST[0]['u_id']; ?>" style="color:#6f6f6f;text-decoration:none">Unsubscribe</a></td>
                         </tr>
                         <tr>
                              <td height="14"></td>
                         </tr>
                    </tbody>



               </table></div>
     </body>
</html>