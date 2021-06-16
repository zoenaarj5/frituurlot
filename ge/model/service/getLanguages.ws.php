<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());

	$attributes=array();
	$optional=array();
	$response=array('data'=>0,'result'=>array());
	$wrongData=array();
	foreach($attributes as $attr){
		if((!isset($_POST[$attr]) || empty($_POST[$attr])) && !in_array($attr,$optional)) {
			$wrongData[]=$attr;
		}
	}
	$response['result'][]=array('input-data-exists',count($wrongData)==0);
	if($wrongData){
		$response['data']++;
	}else{
		$result=NewManager::starSelect(
			'language',
			array(
				'fields'=>array('code','name')
			),null,null
		);
		$response['result'][]=array('languages-exist',!empty($result));
		if(!empty($result)){
			$response['data']=$result;
		}
	}/*
	if(is_array($response['data'])){
		foreach($response['data'] as $key=>$data){
			if(is_numeric($key)){
				unset($response['data'][$key]);
			}
		}
	}*/
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>