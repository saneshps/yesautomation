<?php include_once('functions.php'); 


if(isset($_REQUEST['catid']) && $_REQUEST['catid']){
    $model = $_REQUEST['catid'];

    // Get questions for products
    $arrQues = getQuestions($model);
    
    $questions = $arrQues['questions'];

    $html = '';
    if(count($questions) == 0){
        echo '';
        exit; 
    }

    $queStr = '';
    foreach($questions as $id => $que): 
        $queStr .= '<div class="col-md-6 m-bott">'.$que.'<input type="text" placeholder="'.$que.'" id="question_'.$id.'" name="answers['.$id.']"></div>';
    endforeach; 

    $html = '<div class="row m-bott">'.$queStr.'</div>';

    echo $html;
    exit;
}
?>