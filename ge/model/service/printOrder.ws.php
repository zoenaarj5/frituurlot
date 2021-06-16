<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array(
		'orderId','languageCode'
	);
	$optional=array();
	$wrongData=array();
	$toAdd=array();
	foreach($attributes as $attr){
		if(empty($_GET[$attr])){
			if(!in_array($attr,$optional)){
				$wrongData[]=$attr;
			}
		}else{
			$toAdd[$attr]=$_GET[$attr];
		}
	}
	$response['result'][]=array('input-data-exists',empty($wrongData) && !empty($toAdd));
	if($wrongData){
		$response['data']++;
	}else{
		$result=NewManager::starSelect(
			'order_line',
			array(
				'fields'=>array('quantity','price','reduction'),
				'tables'=>array(
					'order'=>array(
						'fields'=>array('id','date','client_id')
					),
					'product'=>array(
						'fields'=>array('id','price'),
						'tables'=>array(
							's_translation'=>array(
								'key'=>'translatable_id',
								'foreign_key'=>'translatable_id',
								'fields'=>array('name','description')
							)
						)
					)
				)
			),
			array(
				array('`order`.`id`',$_GET['orderId']),
				array('`s_translation`.`language_code`',$_GET['languageCode'])
			),
			null
		);
		$response['result'][]=array('orders-found',!empty($result));
		if(empty($result)){
			if($result===false){
				$response['data']++;
			}
		}else{
//			var_dump($result);
			$s='<!DOCTYPE html>
			<html>
				<head>
					<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
					<style>
						body{
							background-color:orange;
							width:500px;
						}
						table{
							border-collapse:collapse;
							margin-left:200px;
							width:450px;
						}table td, table th{
							border:solid 1px black;
							font-size:30px;
						}
					</style>
				</head>
				<body>
					<table>
						<tr><th>Product</th><th>Price</th><th>Reduction</th><th>Quantity</th><th>Total</th></tr>';
						$total=0;
						foreach($result as $orderLine){
							$lineTotal=($orderLine['order_line_price']-$orderLine['order_line_reduction'])*$orderLine['order_line_quantity'];
							$s.='<tr><td>'.$orderLine['s_translation_name'].'</td><td>'.$orderLine['order_line_price'].'</td><td>'.$orderLine['order_line_reduction'].'</td><td>'.$orderLine['order_line_quantity'].'</td><td>'.$lineTotal.'</td></tr>';
							$total+=$lineTotal;
						}
			$s.='<tr><td colspan="4">GRAND TOTAL</td><td>€ '.$total.'</td></tr>';
			$s.=	'</table>
				</body>
			</html>';
			$clientId=$result[0]['order_client_id'];
			require_once('../html2pdf_v4.03/html2pdf.class.php');
			try{
				$pdf=new HTML2PDF('P','A4','fr');
				$pdf->writeHTML($s);
				$pdf->output('../../pdf/'.$clientId.'.pdf');
				$response['result'][]=array('pdf_created',1);
			}catch(HTML2PDF_exception $e){
				$response['data']++;
			}
		}
		/*
		ob_start();
		echo '<page>';
		echo '<h2>Order by client '.$_POST['clientId'].'</h2>';
		echo '<table>';
			echo '<tr><th>ID</th><th>Price</th><th>Redux</th><th>Quantity</th><th>Total</th></tr>';
			foreach($_POST[] as $ol){
				echo '<tr><td>'.$ol['productId'].'</td><td>'.$ol['price'].'</td><td>'.$ol['redux'].'</td><td>'.$ol['quantity'].'</td><td>'.$ol['total'].'</td></tr>';
			}
		echo '</table>';
		echo '</page>';

		$cont=ob_get_clean();
		*/
/*		require_once('../html2pdf_v4.03/html2pdf.class.php');
		try{
			$pdf=new HTML2PDF('P','A4','fr');
			$pdf->writeHTML($cont);
			$pdf->output('../../pdf/'.$_POST['clientId'].'.pdf');
			$response['result'][]=array('pdf_created',1);
		}catch(HTML2PDF_exception $e){
			$response['data']++;
		}*/
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response);
