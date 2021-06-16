<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array('productId','productGroupId');
	$optional=array();
	$loginField=null;
	$wrongData=array();
	foreach($attributes as $attr){
		if(empty($_POST[$attr]) && !in_array($attr,$optional)){
			$wrongData[]=$attr;
		}
	}
	$response['result'][]=array('input-data-exists',empty($wrongData));
	if($wrongData){
		$response['data']++;
	}else{
		$result=NewManager::removeElement(
			'group_has_product',
			array(
				array('product_id',$_POST['productId']),
				array('product_group_id',$_POST['productGroupId'])
			)
		);
		$response['result'][]=array('link-removed',!empty($result));
		if($result===false){
			$response['data']++;
		}
	}
	$response=NewManager::toUTF8($response);
	echo json_encode($response);
?>