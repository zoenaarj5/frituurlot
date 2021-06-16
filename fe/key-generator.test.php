<?php
echo KeyGenerator::generateKey();
class KeyGenerator{
	public static function generateKey(){
		/**
		*	Function to generate a primary key, using:
		* 		- the current timestamp
		*		- the user's remote ip address
		*/
		$ip=$_SERVER['REMOTE_ADDR'];
		$digitz=explode('.',$ip);
		$s='';
		foreach($digitz as $i=>$dig){
			$s.=MathXtra::toBase(intval($dig),32,2);
		}
		return MathXtra::toBase(time(),32,7).$s;
	}
}
class MathXtra{
	public static function toBase($value,$newBase,$digits=0){
		/**
		*	IN: Value in decimal
		*	OUT:The equivalent in desired base
		*/
		if(is_numeric($value)){
			$rem=$value;
			$res='';
			while($rem>0){
				$rst=$rem%$newBase;
				$rst=self::getRightDigit($rst);
				$res=''.$rst.$res;
				$rem=floor($rem/$newBase);
			}
		}else{
			$res= '0';
		}
		while(strlen($res)<$digits){
			$res='0'.$res;
		}
		return $res;
	}
	public static function getRightDigit($number){
		/**
		*	IN:	Number from 0 to 32
		*	OUT:One-digit number written in 32-base
		*/
		if(is_numeric($number)){
			if($number>9){
				$ascval=ord('A')-10+$number;
				$final=chr($ascval);
				return $final;	
			}else{
				return $number;
			}
		}else{
			return 0;
		}
	}
}
?>