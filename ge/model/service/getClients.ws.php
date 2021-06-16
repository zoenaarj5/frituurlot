<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());

	$attributes=array();
	$optional=array();

	$wrongData=array();
	$toChange=array();
	foreach($attributes as $attr){
		if(empty($_POST[$attr])){
			if(!in_array($attr,$optional)){
				$wrongData[]=$attr;
			}
		}else{
			if(!empty(trim($_POST[$attr]))){
				$toChange[]=$attr;
			}
		}
	}
	$response['result'][]=array('required-update-data-exists',empty($wrongData));
	if(empty($wrongData)){
		$result=NewManager::starSelect(
			'client',
			array(
				'fields'=>array('id','contact_name','contact_first_name','contact_gsm','contact_email','firm_name','firm_phone','firm_fax','address_street','address_number','address_box','address_zip_code','address_city','registration_date','suspended'
				)
			),null,null
		);
//		var_dump($result);
		$response['result'][]=array('clients-exist',!empty($result));
		if(!empty($result)){
			$response['data']=$result;
		}
	}else{
		$response['data']++;
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>