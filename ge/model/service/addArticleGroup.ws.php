<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array(
		'articleGroupTheme',
		'articleSize'
	);
	$optional=array();
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
			'article_group',
			array(
				'theme'=>$_POST['articleGroupTheme'],
				'article_size'=>$_POST['articleSize']
			)
		);
		$response['result'][]=array('theme-added',!empty($result));
		if($result){
			$response['data']=1;
		}
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>