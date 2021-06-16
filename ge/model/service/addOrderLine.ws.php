<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());

	$attributes=array(
		'orderId','productId','quantity','reduction','names'
	);
	$optional=array('reduction','names');
	$response=array('data'=>0,'result'=>array());
	$wrongData=array();
	foreach($attributes as $attr){
		if(empty($_POST[$attr]) && !in_array($attr,$optional)) {
			$wrongData[]=$attr;
		}
	}
	$response['result'][]=array('input-data-exists',count($wrongData)==0);
	if($wrongData){
		$response['data']++;
	}else{
		$check_res=NewManager::starSelect(
			'order_line',
			array(
				'fields'=>array('order_id','product_id','names')
			),
			array(
				array('order_id',$_POST['orderId']),
				array('product_id',$_POST['productId'])
			),
			null
		);
		$response['result'][]=array('similar-order-line-found',!empty($check_res));
	//	echo '<div><b>Check res = </b>'.json_encode($check_res).'</div>';

		$separator=',';
		$newNames=empty($_POST['names'])?array():explode($separator,$_POST['names']);

		$result=false;
		$result=NewManager::starSelect(
			'product',
			array(
				'fields'=>array('id','price')
			),
			array(
				array('`product`.`id`',$_POST['productId'])
			),
			null
		);
		$response['product-found']=$result[0];
		if($check_res){
			$price=0;
			$paramz=array();
			if(!empty($result)){
				$price=$result[0]['product_price'];
			}
			$reduction=empty($_POST['reduction'])?0:$_POST['reduction'];
			$response['reduction']=$reduction;
			$oldNames=explode($separator,$check_res[0]['order_line_names']);
//			$response['res_zero']=$check_res[0]['order_line_names'];
//			$response['old_names']=$oldNames;
			$newNames=empty($_POST['names'])?array():explode(',',$_POST['names']);
			$newNames=array_merge($oldNames,$newNames);
//			$response['new_names']=$newNames;
			$newNamesStr=/*empty($newNames)?'':*/implode($separator, $newNames);
			$paramz=array_merge(
				$paramz,
				array(
					':quantity'=>$_POST['quantity'],
					':orderId'=>$_POST['orderId'],
					':productId'=>$_POST['productId'],
					':price'=>$price,
					':reduction'=>$reduction
				)
			);
			if($newNames){
				$paramz[':names']=$newNamesStr;
			}
			$response['paramz']=$paramz;
			$result=NewManager::getExecutionResult(
				'update `order_line` set `quantity`=:quantity+`quantity`'
				.(empty($newNames)?'':',names=:names')
				.' where `order_id`=:orderId and `product_id`=:productId',
				$paramz,
				true
			);
			$response['result'][]=array('order-line-updated',!empty($result));
		}else{
			$price=0;
			$paramz=array();
			$price=empty($result)?0:$result[0]['product_price'];
			$reduction=empty($_POST['reduction'])?0:$_POST['reduction'];
			$newNamesStr=empty($newNames)?'':''.implode($separator, $newNames);
			$paramz=array_merge(
				$paramz,
				array(
					'quantity'=>$_POST['quantity'],
					'order_id'=>$_POST['orderId'],
					'product_id'=>$_POST['productId'],
					'price'=>$price,
					'reduction'=>$reduction
				)
			);
			if($newNames){
				$paramz['names']=$newNamesStr;
			}
			$response['paramz']=$paramz;
			$result=NewManager::addElement(
				'order_line',
				$paramz
			);
			$response['result'][]=array('order-line-added',!empty($result));
		}
		if(empty($result)){
			$response['data']++;
		}
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>