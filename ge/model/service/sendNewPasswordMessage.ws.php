<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$attributes=array('clientId','languageCode');
	$optional=array();
	$response=array('data'=>0,'result'=>array());
	$wrongData=array();
	foreach($attributes as $attr){
		if((!isset($_POST[$attr]) || empty($_POST[$attr])) && !in_array($attr,$optional)) {
			$wrongData[]=$attr;
		}
	}
	if(!in_array($_POST['languageCode', array('fr','nl'))){
		$wrongData[]='languageCode'
	}
	$response['result'][]=array('input-data-exists',count($wrongData)==0);
	if(!empty($wrongData)){
		$response['data']++;
	}else{
		$result=NewManager::starSelect(
			'client',
			array(
				'fields'=>array('email','security_answer'),
				'tables'=>array(
					'security_question'=>array(
						'tables'=>array(
							'xs_translation'
						)
					)
				)
			),
			array(
				array('`xs_translation`.`language_code`',$_POST['languageCode'])
			),null
		),
		$response['result'][]=array('client-found',!empty($result));
		if($result===false){
			$response['data']++;
		}else{
			if(!empty($result)){
				$clientData=$result[0];
				$curDate=date('Y-m-d H:i:s');
				$key=KeyGenerator::generateKey();
				$result=NewManager::addElement(
					'password_change',
						array(
							'id'=>$key,
							'request_date'=>$curDate,
							'client_id'=>$clientData['client_id']
						)
					)
				);
				$response['result'][]=array('password-change-request-added',!empty($result));
				if($result===false){
					$response['data']++;
				}else{
					if(!empty($result)){
						$msgContent=array(
							'fr'=>array(
								'title'=>'FrituurLot - Changement de mot de passe',
								'text'=>'Veuillez cliquer sur le lien ci-dessous pour pouvoir changer votre mot de passe. Vous ne devez pas le faire si vous n\'êtes pas l\'auteur de cette demande.'
							),
							'nl'=>array(
								'title'=>'FrituurLot - Wachtwoordwijzigingsverzoek',
								'text'=>'Click op de link om uw wachtwoord te kunnen veranderen. Dat hoeft u niet de doen als u niet de auteur bent van dit aanvraag'
							),
						)
						$msgHTML=
						'<!DOCTYPE html>
						<html>
						<head>
							<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
							<style>
								table{
									background-color:#FC8;
									border-collapse:collapse;
								}
								table tr, table th{
									border:solid 1px black;
								}
							</style>
						</head>
						<body>
							<div>
								'.$msgContent[$_POST['languageCode']]['text'].'
							</div>
							<div><a href="frituurlot.be/#/passwordChangeConfirm">frituurlot.be/#/passwordChangeConfirm</a></div>
						</body>
						<html>';

						$mailer=new PHPMailer();
						$addresses=array(
							$clientData['contact_email']=>$clientData['contact_first_name'].' '.$clientData['contact_name'],
							'kaval.80@gmail.com'		=>'Kaval'
						);
						foreach($addresses as $email=>$name){
							$mailer->AddAddress($email,$name);
						}
						$mailer->Subject=$msgContent[$_POST['languageCode']]['title'];
						$mailer->SetFrom('immocelia@hotmail.com','Salva & Sanda');
		//				$mailer->Sender='zoenaarj5@hotmail.com';
						$mailer->MsgHTML($msgHTML);
						$mailer->CharSet='UTF-8';
						$mailSent=$mailer->Send();
						$response['result'][]=array('mail-sent',$mailSent);
						if(!$mailSent){
							$response['data']['mailSending']++;
						}
					}

				}
			}
		}
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>