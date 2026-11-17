<?php

/**
 * This class will handle common functions.
 *
 * @author Abdu
 */
class Common {

    /**
     * This function cleans post and get input values.
     *
     * @param string $input
     * @return string
     */
    public static function clean($input) {
        return trim($input);
    }

    /**
     * This function will  print  error in database query .
     *
     * @param string $qry
     */
//    public static function debugQuery($qry) {
//        echo "<br/>-------Params -- <br/>";
//        $qry->debugDumpParams();
//        echo "<br/>----Error---<br/>";
//        print_r($qry->errorInfo());
//    }

}