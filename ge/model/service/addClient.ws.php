<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array(
		'contactEmail','contactGSM',
		'contactName','contactFirstName',
		'firmName','firmPhone',
		'firmFax',
		'addressStreet','addressNumber',
		'addressBox','addressZipCode',
		'addressCity','password',
		'securityQuestionId','securityAnswer'
	);
	$optional=array(
		'contactEmail','contactGSM',
		'firmName','firmPhone',
		'firmFax','addressBox'
	);
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
/*	echo '<div><b>TO ADD:</b></div>';
	echo json_encode($toAdd);*/
	$response['result'][]=array('input-data-exists',empty($wrongData) && !empty($toAdd));
	if($wrongData){
		$response['data']++;
	}else{
		$dataInput=array(
			"contact_email"			=>			"contactEmail"	,
			"contact_gsm"			=>			"contactGSM"	,
			"contact_name"			=>			"contactName"	,
			"contact_first_name"	=>			"contactFirstName"	,
			"firm_name"				=>			"firmName"			,
			"firm_phone"			=>			"firmPhone"		,
			"firm_fax"				=>			"firmFax"		,
			"address_street"		=>			"addressStreet"	,
			"address_number"		=>			"addressNumber"	,
			"address_box"			=>			"addressBox"	,
			"address_zip_code"		=>			"addressZipCode",
			"address_city"			=>			"addressCity"	,
			"password"				=>			"password"		,
			"security_question_id"	=>			"securityQuestionId"	,
			"security_answer"		=>			"securityAnswer"		
		);
/*		echo '<div><b>BEFORE:</b></div>';
		echo json_encode($dataInput);*/
		foreach($dataInput as $key=>$val){
			if(array_key_exists($val,$toAdd)){
				$dataInput[$key]=$toAdd[$val];
			}
		}
		$dataInput['registration_date']=date('Y-m-d H:i:s');
		$dataInput['password']=hash('sha256',$toAdd['password']);
/*		echo '<div><b>AFTER:</b></div>';*/
//		echo json_encode($dataInput);
		$result=NewManager::addElement(
			'client',
			$dataInput
		);
		$response['result'][]=array('client-is-added',!empty($result));
		if(empty($result)){
			$response['data']++;
		}
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>