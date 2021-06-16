<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array('promotionId','stopDate');
	$optional=array('stopDate');
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
		$curDate=date('Y-m-d H:i:s');
		$stopDate=empty($_POST['stopDate'])?$curDate->format('Y-m-d H:i:s'):$_POST['stopDate'];
		$result=NewManager::getQueryResult(
			'update promotion set stop_date="'.$curDate.'" where id='.$_POST['promotionId'].' and start_date < STR_TO_DATE("'.$stopDate.'","%Y-%m-%d %h:%i:%s") and end_date > STR_TO_DATE("'.$_POST['stopDate'].'","%Y-%m-%d %h:%i:%s")'
		);
		$response['result'][]=array('promotion-stopped',!empty($result));
		if($result===false){
			$response['data']++;
		}
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>