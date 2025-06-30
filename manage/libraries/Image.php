<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Image
 *
 * @author Niyas
 */
class Image {

    public static function resizeImage($image, $width, $height, $scale) {
        list($imagewidth, $imageheight, $imageType) = getimagesize($image);
        $imageType = image_type_to_mime_type($imageType);
//        $newImageWidth = ceil($width * $scale);
//        $newImageHeight = ceil($height * $scale);
        $newImageWidth = $imagewidth;
        $newImageHeight = $imageheight;
        $newImage = imagecreatetruecolor($newImageWidth, $newImageHeight);
        switch ($imageType) {
            case "image/gif":
                $source = imagecreatefromgif($image);
                break;
            case "image/pjpeg":
            case "image/jpeg":
            case "image/jpg":
                $source = imagecreatefromjpeg($image);
                break;
            case "image/png":
            case "image/x-png":
                $source = imagecreatefrompng($image);
                break;
        }
        imagecopyresampled($newImage, $source, 0, 0, 0, 0, $newImageWidth, $newImageHeight, $width, $height);

        switch ($imageType) {
            case "image/gif":
                imagegif($newImage, $image);
                break;
            case "image/pjpeg":
            case "image/jpeg":
            case "image/jpg":
                imagejpeg($newImage, $image, 90);
                break;
            case "image/png":
            case "image/x-png":
                imagepng($newImage, $image);
                break;
        }

        chmod($image, 0777);
        return $image;
    }

    public static function resizeThumbnailImage($thumb_image_name, $image, $width, $height, $start_width, $start_height, $scale) {
        list($imagewidth, $imageheight, $imageType) = getimagesize($image);
        $imageType = image_type_to_mime_type($imageType);

        $newImageWidth = ceil($width * $scale);
        $newImageHeight = ceil($height * $scale);
        $newImage = imagecreatetruecolor($newImageWidth, $newImageHeight);
        switch ($imageType) {
            case "image/gif":
                $source = imagecreatefromgif($image);
                break;
            case "image/pjpeg":
            case "image/jpeg":
            case "image/jpg":
                $source = imagecreatefromjpeg($image);
                break;
            case "image/png":
            case "image/x-png":
                $source = imagecreatefrompng($image);
                break;
        }
        imagecopyresampled($newImage, $source, 0, 0, $start_width, $start_height, $newImageWidth, $newImageHeight, $width, $height);
        switch ($imageType) {
            case "image/gif":
                imagegif($newImage, $thumb_image_name);
                break;
            case "image/pjpeg":
            case "image/jpeg":
            case "image/jpg":
                imagejpeg($newImage, $thumb_image_name, 90);
                break;
            case "image/png":
            case "image/x-png":
                imagepng($newImage, $thumb_image_name);
                break;
        }
        chmod($thumb_image_name, 0777);
        return $thumb_image_name;
    }

    public static function getHeight($image) {
        $sizes = getimagesize($image);
        $height = $sizes[1];
        return $height;
    }

    public static function getWidth($image) {
        $sizes = getimagesize($image);
        $width = $sizes[0];
        return $width;
    }

    
    public static function saveImage($imagePath,$fileTempPath){
        move_uploaded_file($fileTempPath, $imagePath);
    }
            
            
    public static function saveImages($imagePath, $fileTempPath, $water=false) {
        $watermark = imagecreatefrompng(UPLOAD_PATH . 'images/water.png');
        $width_cfg = 500;
        $height_cfg = 400;
        list($width_orig, $height_orig, $type) = getimagesize($fileTempPath);
        $height = $height_orig;
        $width = $width_orig;
        list($wwidth_orig, $wheight_orig, $wtype) = getimagesize(UPLOAD_PATH . 'images/water.png');

        $image_p = imagecreatetruecolor($width, $height);

        switch ($type) {
            case 2: //'image/jpeg':
                // case 'image/pjpeg':
                $image = imagecreatefromjpeg($fileTempPath);
                break;
            case 1://'image/gif':
                $image = imagecreatefromgif($fileTempPath);
                break;
            case 3://'image/png':
                $image = imagecreatefrompng($fileTempPath);
                break;
        }
        if ($image) {
            imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
            if ($water) {
                imagecopyresampled($image_p, $watermark, 0, 0, 0, 0, $width, $height, $wwidth_orig, $wheight_orig);
            }
            imagejpeg($image_p, $imagePath, 100);
        }
    }

    public static function saveThumb($imagePath, $fileTempPath, $water=false ) {
     //   $watermark = imagecreatefrompng(UPLOAD_PATH . 'images/water.png');
        list($width_orig, $height_orig, $type) = getimagesize($fileTempPath);
       // list($wwidth_orig, $wheight_orig, $wtype) = getimagesize(UPLOAD_PATH . 'images/water.png');
//        if ($width && ($width_orig < $height_orig)) {
//            $width = ($height / $height_orig) * $width_orig;
//        } else {
//            $height = ($width / $width_orig) * $height_orig;
//        }

        $image_p = imagecreatetruecolor($width, $height);

        switch ($type) {
            case 2: //'image/jpeg':
                // case 'image/pjpeg':
                $image = imagecreatefromjpeg($fileTempPath);
                break;
            case 1://'image/gif':
                $image = imagecreatefromgif($fileTempPath);
                break;
            case 3://'image/png':
                $image = imagecreatefrompng($fileTempPath);
                break;
        }
        if ($image) {
            imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
            
            imagejpeg($image_p, $imagePath, 100);
        }
    }

}

?>
