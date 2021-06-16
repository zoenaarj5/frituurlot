<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());

	$attributes=array('productId','newPrice');
	$optional=array();
	$wrongData=array();
	foreach($attributes as $attr){
		if((!isset($_POST[$attr]) || empty($_POST[$attr])) && !in_array($_POST[$attr],$optional)) {
			$wrongData[]=$attr;
		}
	}
	$response['result'][]=array('input-data-exists',count($wrongData)==0);
	if($wrongData){
		$response['data']++;
	}else{
		$result=NewManager::addElement(
			'price_change',
			array(
				'new_price'=>$_POST['newPrice'],
				'product_id'=>$_POST['productId']
			)
		);
		$response['result'][]=array('price-change-added',!empty($result));
		if($result){
			$result=NewManager::updateElement(
				'product',
				array('price'=>$_POST['newPrice']),
				array(array('id',$_POST['productId']))
			);
			$response['result'][]=array('price-updated',!empty($result));
			if(!$result){
				$response['data']++;
			}
		}else{
			$response['data']++;
		}
	}
	echo json_encode($response);
?>