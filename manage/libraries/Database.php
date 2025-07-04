<?php



/**

 * Description 

 *

 * @author Niyas <niyast@live.com>

 */

class Database extends PDO {



    public function __construct($DB_TYPE, $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS) {

        parent::__construct($DB_TYPE . ':host=' . $DB_HOST . ';dbname=' . $DB_NAME, $DB_USER, $DB_PASS);



        //parent::setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTIONS);

    }



    /**

     * select

     * @param string $sql An SQL string

     * @param array $array Paramters to bind

     * @param constant $fetchMode A PDO Fetch mode

     * @return mixed

     */

    public function select($sql, $array = array(), $fetchMode = PDO::FETCH_ASSOC, $bindMode = PDO::PARAM_NULL) {

        $sth = $this->prepare($sql);

        foreach ($array as $key => $value) {

            $sth->bindValue("$key", $value, $bindMode);

        }



        if (!$sth->execute()) {

            print_r($sth->errorInfo());

        }

        return $sth->fetchAll($fetchMode);

    }



    /**

     * select

     * @param string $sql An SQL string

     * @param array $array Paramters to bind

     * @param constant $fetchMode A PDO Fetch mode

     * @return mixed

     */

    public function selectOne($sql, $array = array(), $fetchMode = PDO::FETCH_ASSOC) {

        $sth = $this->prepare($sql);

        foreach ($array as $key => $value) {

            $sth->bindValue("$key", $value);

        }



        if (!$sth->execute()) {

            print_r($sth->errorInfo());

        }

        return $sth->fetch($fetchMode);

    }



    /**

     * select

     * @param string $sql An SQL string

     * @param array $array Paramters to bind

     * @param constant $fetchMode A PDO Fetch mode

     * @return mixed

     */

    public function getCount($sql, $array = array(), $fetchMode = PDO::FETCH_ASSOC) {

        $sth = $this->prepare($sql);

        foreach ($array as $key => $value) {

            $sth->bindValue("$key", $value);

        }



        if (!$sth->execute()) {

            print_r($sth->errorInfo());

        }

        return $sth->rowCount();

    }



    /**

     * insert

     * @param string $table A name of table to insert into

     * @param string $data An associative array

     */

    public function insert($table, $data) {

        ksort($data);



        $fieldNames = implode('`, `', array_keys($data));

        $fieldValues = ':' . implode(', :', array_keys($data));



        $sth = $this->prepare("INSERT INTO $table (`$fieldNames`) VALUES ($fieldValues)");



        foreach ($data as $key => $value) {

            $sth->bindValue(":$key", $value);

        }

        if (!$sth->execute()) {

            print_r($sth->errorInfo());

            return $sth->errorInfo();

        }

        $this->lastInsertId = $this->lastInsertId();

    }



    /**

     * update

     * @param string $table A name of table to insert into

     * @param string $data An associative array

     * @param string $where the WHERE query part

     */

    public function update($table, $data, $where) {
		

        ksort($data);



        $fieldDetails = NULL;

        foreach ($data as $key => $value) {

            $fieldDetails .= "`$key`=:$key,";

        }

        $fieldDetails = rtrim($fieldDetails, ',');

      //echo "UPDATE $table SET $fieldDetails WHERE $where";exit;

        $sth = $this->prepare("UPDATE $table SET $fieldDetails WHERE $where");



        foreach ($data as $key => $value) {

            $sth->bindValue(":$key", $value);

        }



        if (!$sth->execute()) {

            print_r($sth->errorInfo());
			return false;

        }else{
			return true;
	}

    }



    /**

     * delete

     * 

     * @param string $table

     * @param string $where

     * @param integer $limit

     * @return integer Affected Rows

     */
    public function delete($table, $where, $limit = 1) {

        return $this->exec("DELETE FROM $table WHERE $where LIMIT $limit");
    }
}