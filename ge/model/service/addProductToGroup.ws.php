<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array('productId','productGroupId');
	$optional=array('image','active');
	$wrongData=array();
	foreach($attributes as $attr){
		if((!isset($_POST[$attr]) || empty($_POST[$attr])) && !in_array($attr,$optional)) {
			$wrongData[]=$attr;
		}
	}
	$response['result'][]=array('input-data-exists',count($wrongData)==0);
	$response['wrongData']=$wrongData;
	if($wrongData){
		$response['data']++;
	}else{
		$result=NewManager::addElement(
			'group_has_product',
			array(
				'product_id'=>$_POST['productId'],
				'product_group_id'=>$_POST['productGroupId']
			)
		);
		var_dump($result);
		$response['result']['association-created']=!empty($result);
		if(empty($result)){
			$response['data']++;
		}
	}
//	echo '<div>response data=<b>'.$response['data'].'<b></div>';
/*	echo '<table style="border-collapse:collapse">';
	foreach($response['result'] as $line){
		echo '<tr>';
		foreach($line as $val){
			echo '<td style="border:solid 1px black">'.$val.'</td>';
		}
		echo '</tr>';
	}
	echo '</table>';*/
	$response=newManager::toUTF8($response);
	echo json_encode($response);
//	var_dump($response);
?>