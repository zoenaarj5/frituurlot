<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array(
		'orderId',
		'content'
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
		$curDat=date('Y-m-d H:i:s');
		$result=NewManager::addElement(
			'order_comment',
			array(
				'order_id'=>$_POST['orderId'],
				'content'=>$_POST['content'],
				'date'=>$curDat
			)
		);
		$response['result'][]=array('comment-added',!empty($result));
		if($result){
			$response['data']=1;
		}
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>