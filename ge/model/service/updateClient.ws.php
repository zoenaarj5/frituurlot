<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());

	$attributes=array(
		'clientId',
		'contactName',
		'contactFirstName',
		'contactGSM',
		'firmName',
		'firmPhone',
		'firmFax',
		'addressStreet',
		'addressNumber',
		'addressBox',
		'addressZipCode',
		'addressCity',
		'password',
		'registrationDate',
		'suspended'
	);
	$optional=array(
		'contactName',
		'contactFirstName',
		'contactGSM',
		'firmName',
		'firmPhone',
		'firmFax',
		'addressStreet',
		'addressNumber',
		'addressBox',
		'addressZipCode',
		'addressCity',
		'password',
		'registrationDate',
		'suspended'
	);
	$response['post']=$_POST;
	$wrongData=array();
	$toChange=array();
	foreach($attributes as $attr){
		if(empty($_POST[$attr])){
			if(!in_array($attr,$optional)){
				$wrongData[]=$attr;
			}
		}else{
			$response['post'][$attr]=$_POST[$attr];
			if(!empty(trim($_POST[$attr]))){
				$toChange[]=$attr;
			}
		}
	}
	$response['toChange']=$toChange;
	$response['wrongData']=$wrongData;
	$response['result'][]=array('required-update-data-exists',empty($wrongData));
	if(empty($wrongData)){
		$response['result'][]=array('update-data-to-change-exists',!empty($toChange));
		if($toChange) {
			$dataTL=array(
				'contact_name'=>		'contactName',
				'contact_first_name'=>	'contactFirstName',
				'contact_gsm'=>			'contactGSM',
				'firm_name'=>			'firmName',
				'firm_phone'=>			'firmPhone',
				'firm_fax'=>			'firmFax',
				'address_street'=>		'addressStreet',
				'address_number'=>		'addressNumber',
				'address_box'=>			'addressBox',
				'address_zip_code'=>	'addressZipCode',
				'address_city'=>		'addressCity',
				'password'=>			'password',
				'registration_date'=>	'registrationDate',
				'suspended'=>			'suspended'
			);
			$toAdd=array();
			foreach($dataTL as $tName=>$pName){
				if(in_array($pName,$toChange)){
					if($pName=='password'){
						$toAdd[$tName]=hash('sha256',$_POST[$pName]);
					}else{
						$toAdd[$tName]=$_POST[$pName];
					}
				}
			}
			$result=NewManager::updateElement(
				'client',
				$toAdd,
				array(
					array('`client`.`id`',$_POST['clientId'])
				)
			);
			$response['result'][]=array('update-done',!empty($result));
			if(empty($result)){
				$response['data']++;
			}
		}else{
			$response['data']++;
		}
	}else{
		$response['data']++;
	}
	echo json_encode($response);
?>