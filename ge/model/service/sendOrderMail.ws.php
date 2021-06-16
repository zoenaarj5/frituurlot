<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	require_once('../class/class.phpmailer.php');
	$response=array('data'=>array('dataFetching'=>0,'mailSending'=>0),'result'=>array());
	$attributes=array('orderId','languageCode');
	$wrongData=array();
	foreach($attributes as $attr){
		if(empty($_POST[$attr])){
			$wrongData[]=$attr;
		}
	}
	$response['result'][]=array('input-data-exists',empty($wrongData));
	if($wrongData){
		$response['wrongData']=$wrongData;
		$response['data']['dataFetching']++;
	}else{
		$result=NewManager::starSelect(
			'order',
			array(
				'fields'=>array('id','date','confirmed','delivered','paid','cancelled'),
				'tables'=>array(
					'client'=>array(
						'fields'=>array('id','contact_name','contact_first_name','contact_gsm','contact_email','firm_name','firm_phone','firm_fax','address_street','address_number','address_box','address_zip_code','address_city','registration_date','suspended')
					)
				)
			),
			array(
				array('`order`.`id`',$_POST['orderId'])
			),
			null
		);
		$response['result'][]=array('order-has-client',!empty($result));
		if(!empty($result)){
			$orderData=$result[0];
			$oc_result=NewManager::starSelect(
				'order_comment',
				array(
					'fields'=>array('content')
				),
				array(
					array('order_id',$_POST['orderId'])
				),
				null
			);
			if(empty($oc_result)){
				$oc_result=array();
			}
			$ocz='<table><caption><i>Comments</i></caption>';
			foreach($oc_result as $line){
				$ocz.='<tr><td>'.$line['order_comment_content'].'</td></tr>';
			}
			$ocz.='</table>';echo $ocz;
			$result=NewManager::starSelect(
				'order_line',
				array(
					'fields'=>array('price','quantity','reduction'),
					'tables'=>array(
						'order'=>array(
							'fields'=>array('id'),
							'tables'=>array(
								'client'=>array('contact_email')
							)
						),
						'product'=>array(
							'fields'=>array('id','price'),
							'tables'=>array(
								's_translation'=>array(
									'foreign_key'=>'translatable_id',
									'key'=>'translatable_id',
									'fields'=>array('name','description')
								)
							)
						)
					)
				),
				array(
					array('`s_translation`.`language_code`',$_POST['languageCode']),
					array('`order`.`id`',$_POST['orderId'])
				),
				null
			);
			$response['result'][]=array('order-lines-found',!empty($result));
			if($result===false){
				$response['data']['dataFetching']++;
			}else{
				$response['data']['dataFetching']=$result;
				if($result){
//					$clientData=$result[0];
					$msgHTML=
					'<!DOCTYPE html>
					<html>
					<head>
						<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
						<style>
							table{
								background-color:#FC8;
								border-collapse:collapse;
								margin-bottom:10px;
								margin-top:10px;
								width:700px;
							}
							table td, table th{
								border:solid 1px black;
								text-align:center;
							}
						</style>
					</head>
					<body>
						<table>
							<caption>Client</caption>
							<tr><th>Date</th><th>Contact</th><th>Email</th><th>GSM</th><th>Firm</th><th>Tel</th><th>Fax</th><th>Address</th></tr>
							<tr><td>'.$orderData['order_date'].'</td><td>'.$orderData['client_contact_first_name'].' '.$orderData['client_contact_name'].'</td><td>'.$orderData['client_contact_email'].'</td><td>'.$orderData['client_contact_gsm'].'</td><td>'.$orderData['client_firm_name']
							.'</td><td>'.$orderData['client_firm_phone'].'</td><td>'.$orderData['client_firm_fax'].'</td>
							<td>'.$orderData['client_address_street'].' '.$orderData['client_address_number'].' '.$orderData['client_address_box'].' 
							 - '.$orderData['client_address_zip_code'].' '.$orderData['client_address_city'].'</td></tr>
						</table>';
						$msgHTML.=$ocz;
						$msgHTML.='<table>
							<caption>Order</caption>';
							$msgHTML.='<tr>	
								<th>ID</th>
								<th>Prod</th>
								<th>Price</th>
								<th>Reduction</th>
								<th>Quantity</th>
								<th>Total</th>
							</tr>';
							$grandTotal=0;
							foreach($result as $rl){
								$total=($rl['order_line_price']-$rl['order_line_reduction'])*$rl['order_line_quantity'];
								$grandTotal+=$total;
								$msgHTML.=
								'<tr>
									<td>'.$rl['product_id'].'</td>
									<td>'.$rl['s_translation_name'].'</td>
									<td>'.$rl['order_line_price'].'</td>
									<td>'.$rl['order_line_reduction'].'</td>
									<td>'.$rl['order_line_quantity'].'</td>
									<td>'.$total.'</td>
								</tr>';
							} 
							$msgHTML.='<tr><td colspan="5">GRAND TOTAL</td><td>'.$grandTotal.'</td></tr>';
					$msgHTML.='</table>
					</body>
					<html>';

					$mailer=new PHPMailer();
					$addresses=array(
						'kacva@yahoo.com'			=>'Kavuna',
						'kaval.80@gmail.com'		=>'Kaval',
						'immocelia@hotmail.com'		=>'Salva & Sanda'
					);
					foreach($addresses as $email=>$name){
						$mailer->AddAddress($email,$name);
					}
					$mailer->Subject='You have an order.';
					$mailer->SetFrom('zoenaarj5@hotmail.com','Salva & Sanda');
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
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>