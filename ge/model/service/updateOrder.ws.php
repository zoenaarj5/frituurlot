<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());

	$attributes=array(
		'orderId','confirmed','delivered','paid','cancelled'
	);
	$optional=array('confirmed','delivered','paid','cancelled');
	$response=array('data'=>0,'result'=>array());
	$wrongData=array();
	$toChange=array();
	foreach($attributes as $attr){
		if(isset($_POST[$attr])){
			$toChange[]=$attr;
		}else{
			if(!in_array($attr,$optional)){
				$wrongData[]=$attr;
			}
		}
	}
	$response['toChange']=$toChange;
	$response['wrongData']=$wrongData;
	$response['input-data-exists']=empty($wrongData) && !empty($toChange);
	if(empty($wrongData) && !empty($toChange)){
		$dataTrans=array(
			'confirmed'=>'confirmed',
			'delivered'=>'delivered',
			'paid'=>'paid',
			'cancelled'=>'cancelled'
		);
		$data2Change=array();
		foreach($dataTrans as $key=>$trans){
			if(in_array($key,$toChange)){
				switch($key){
					case 'confirmed':
					case 'delivered':
					case 'paid':
					case 'cancelled':
						$data2Change[$trans]=$_POST[$key]?1:0;
						break;

				}
			}
		}
		$response['data2Change']=$data2Change;
		$response['result'][]=array('data-to-change-exists',!empty($data2Change));
		if(!empty($data2Change)){
			$result=NewManager::updateElement(
				'order',
				$data2Change,
				array(
					array('`order`.`id`',$_POST['orderId'])
				)
			);
			$response['result'][]=array('order-updated',!empty($result));
		}
	}

	/*
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