<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array(
		'fr-title','fr-description','en-title','en-description','rw-title','rw-description'
	);
	$optional=array(
		'fr-title','fr-description','en-title','en-description','rw-title','rw-description'
	);
	$languages=array('en','fr','rw');
	$wrongData=array();
	$toAdd=array();
	foreach($attributes as $attr){
		if(empty($_POST[$attr])){
			if(!in_array($attr,$optional)){
				$wrongData[]=$attr;
			}
		}else{
			$toAdd[$attr]=$_POST[$attr];
		}
	}
	$response['result'][]=array('input-data-exists',empty($wrongData) && !empty($toAdd));
	if($wrongData){
		$response['data']++;
	}else{
		$result=NewManager::addElement(
			'show',

		)
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>