<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	require_once('../class/class.phpmailer.php');
	$response=array('data'=>0,'result'=>array());

	$attributes=array('clientId','languageCode');
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
		$pcCode=KeyGenerator::generateKey();
		$result=NewManager::addElement(
			'password_change',
			array(
				'client_id'=>$_POST['clientId'],
				'code'=>$pcCode
			)
		);
		$response['result'][]=array('password-change-request-added',!empty($result));
		if(!empty($result)){
			$result=NewManager::starSelect(
				'client',
				array(
					'fields'=>array('contact_email','contact_name','contact_first_name')
				),array(
					array('`client`.`id`',$_POST['clientId'])
				),
				null
			);
			$response['result'][]=array('client-email-found',!empty($result));
			if(empty($result)){
				$response['data']++;
			}else{
				$msgTranz=array(
					'fr'=>array(
						'title'=>'frituurlot.be - Changement de mot de passe',
						'content'=>'Vous avez demandé un changement de mot de passe. Veuillez copier le code ci-dessous sur ce lien:<a href="#">www.blabla.com</a>.',
						'bottomLine'=>'Si vous n\'êtes pas l\'auteur de la demande, veuillez ne pas tenir compte de ce message.'
					),
					'nl'=>array(
						'title'=>'frituurlot.be - Wachtwoordverandering',
						'content'=>'U hebt een verandering van uw wachtwoord aangevraagd. Gelieve de code hieronder te copiëren op dit adres:<a href="#">www.blabla.com</a>.',
						'bottomLine'=>'Als u de auteur van die aanvraag niet bent, gelieve dit bericht te negeren.'
					)
				);
				$key=KeyGenerator::generateKey();
				$msgHtml='<!DOCTYPE html>
					<head>
						<style></style>
					</head>
					<body>
						<div>
						'.$msgTranz[$_POST['languageCode']]['content'].'
						</div>
						<div>Code=<b>'.$key.'</b></div>
						<div>'.$msgTranz[$_POST['languageCode']]['bottomLine'].'</div>
					</body>
				';
				$klient=$result[0];
				echo json_encode($klient);
				$mailer=new PHPMailer();
				$addresses=array(
					$klient['client_contact_email']	=>$klient['client_contact_first_name'].' '.$klient['client_contact_name'],
					'kacva@yahoo.com'			=>'Kavuna'
				);
				foreach($addresses as $email=>$name)
					$mailer->AddAddress($email,$name);
				$mailer->Subject=$msgTranz[$_POST['languageCode']]['title'];
				$mailer->From='noreply@frituurlot.be';
				$mailer->Sender='zoenaarj5@hotmail.com';
				$mailer->MsgHTML($msgHtml);
				$mailer->CharSet='UTF-8';
				$count=0;
				$mailSent=$mailer->Send();
				$response['result'][]=array('mail-sent',!empty($mailSent));
				if(!$mailSent){
					$response['data']++;
				}else{

				}
			}
		}
	}else{
		$response['data']++;
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>