<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array('orderId');
	$optional=array();
	$wrongData=array();
	foreach($attributes as $attr){
		if(empty($attr) && !in_array($attr,$optional)){
			$wrongData[]=$attr;
		}
	}
	$response['result'][]=array('input-data-exists',empty($wrongData));
	if($wrongData){
		$response['data']++;
	}else{
		$result=NewManager::starSelect(
			'order_comment',
			array(
				'fields'=>array('id','date','content')
			),
			array(
				array('order_id',$_POST['orderId'])

			),array(
				array('order_comment','date',1)
			)
		);
		$response['result'][]=array('orders-exist',!empty($result));
		if($result){
			$response['data']=$result;
		}
	}
/*	if(is_array($response['data'])){
		for($i=0;$i<count($response['data'])/2;$i++){
			unset($response['data'][$i]);
		}
	}*/
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>