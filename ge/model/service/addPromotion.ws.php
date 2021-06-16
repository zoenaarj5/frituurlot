<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array('promotableId','type','value','startDate','endDate');
	$optional=array('startDate');
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
		$promoData=array(
			'promotable_id'=>$_POST['promotableId'],
			'type'=>$_POST['type'],
			'value'=>$_POST['value'],
			'end_date'=>$_POST['endDate']
		);
		if(!empty($_POST['startDate'])){
			$promoData['start_date']=$_POST['startDate'];
		}
//		var_dump($promoData);
		$result=NewManager::addElement(
			'promotion',
			$promoData
		);
		$response['result'][]=array('promotion-added',!empty($result));
		if(empty($result)){
			$response['data']++;
		}
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>