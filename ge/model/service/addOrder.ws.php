<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());

	$attributes=array(
		'clientId','comment'
	);
	$optional=array('comment');
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
		$key=KeyGenerator::generateKey();
		$date=date('Y-m-d H:i:s');
		$result=NewManager::addElement(
			'order',
			array(
				'id'=>$key,
				'client_id'=>$_POST['clientId'],
				'date'=>$date,
				'confirmed'=>1
			)
		);
		$response['result'][]=array('order-added',!empty($result));
		if($result){
			$fetch_res=NewManager::starSelect(
				'order',
				array(
					'fields'=>array('id','date','delivered','paid','client_id')
				),
				array(
					array('`order`.`id`',$key)
				),null
			);
			$response['result'][]=array('new-order-found',!empty($fetch_res));
			if(!empty($fetch_res)){
				$response['data']=$fetch_res[0];
				$comment='Order '.$key.' from client Nr '.$_POST['clientId'];
				if(!empty($_POST['comment'])){
					$com=trim($_POST['comment']);
					if(!empty($com)) {
						$comment.=' - '.$com;
					}
				};
				$result=NewManager::addElement(
					'order_comment',
					array(
						'date'=>$date,
						'order_id'=>$key,
						'content'=>$comment
					)
				);
				$response['result'][]=array('order-comment-added',!empty($result));
			}
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