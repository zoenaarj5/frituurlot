<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array('clientId');
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
			'order',
			array(
				'fields'=>array('id','date','confirmed','delivered','paid','cancelled'),
				'tables'=>array(
					'client'=>array(
						'fields'=>array('id','firm_name','contact_name','contact_first_name','contact_email','firm_phone','firm_fax')
					)
				)
			),
			array(
				array('`client`.`id`',$_POST['clientId'])
			),array(
				array('order','date',1)
			)
		);
		$response['result'][]=array('orders-exist',!empty($result));
		if($result){
			$finalRes=array();
			foreach($result as $r_line){
				$rez=NewManager::starSelect(
					'order_comment',
					array(
						'fields'=>array('id','date','content')
					),
					array(
						array('`order_comment`.`order_id`',$r_line['order_id'])
					),null
				);
				if(!empty($rez)){
					$r_line['comments']=$rez;
				}
				$finalRes[]=$r_line;
			}
			$response['data']=$finalRes;
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