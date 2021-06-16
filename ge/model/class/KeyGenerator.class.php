<?php
require_once('MathXtra.class.php');
class KeyGenerator{
	public static function _getInc(){
		if(!isset($_SESSION['inc'])/* || !is_integer($_SESSION['inc']) || $_SESSION['inc']<1*/){
			$_SESSION['inc']=1;
		}else{
			$_SESSION['inc']++;
		}
	//	echo '<div style="color:blue">inc=<b>'.$_SESSION['inc'].'</b></div>';
		return $_SESSION['inc'];
	}
	public static function generateKey(){
		/**
		*	Function to generate a primary key, using:
		* 		- the current timestamp
		*		- the user's remote ip address
		*/
		$ip=$_SERVER['REMOTE_ADDR'];
		$digitz=explode('.',$ip);
//		$digitz=explode(':',$ip);
		$s='';
		foreach($digitz as $i=>$dig){
			$s.=MathXtra::toBase(intval($dig),32,2);
		}
//		echo '<div>inc=<b>'.self::$inc.'</b></div>';
		$s.=MathXtra::toBase(self::_getInc(),32,2);
		return MathXtra::toBase(time(),32,7).$s;
	}
}
?>