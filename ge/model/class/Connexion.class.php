<?php
class Connexion extends PDO
{
	public function __construct($dbName)
	{
		$pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
		parent::__construct('mysql:host=mysql51-130.perso; dbname='.$dbName,'frituurlot2015','FreeTuur2015',$pdo_options);
//		parent::__construct('mysql:host=localhost; dbname='.$dbName,'root','',$pdo_options);
	}
}
?>