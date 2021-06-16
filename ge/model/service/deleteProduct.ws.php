<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array('productId');
	$optional=array();
	$loginField=null;
	$wrongData=array();
	foreach($attributes as $attr){
		if(empty($_POST[$attr]) && !in_array($attr,$optional)){
			$wrongData[]=$attr;
		}
	}
	$response['result'][]=array('input-data-exists',empty($wrongData));
	if($wrongData){
		$response['data']++;
	}else{
		$result=NewManager::starSelect(
			'product',
			array(
				'fields'=>array('id','promotable_id','translatable_id')
			),
			array(
				array('id',$_POST['productId'])
			),
			array()
		);
		var_dump($result);
		$response['result'][]=array('product-found',!empty($result));
		if($result===false){
			$response['data']++;
		}else{
			if(!empty($result)){
				$product=$result[0];
				$result=NewManager::getExecutionResult(
					'delete from `s_translation` where `translatable_id`="'.$product['product_translatable_id'].'"',
					array(),true
				);
				$response['result'][]=array('translations-removed',$result!==false);
				if($result===false){
					$response['data']++;
				}else{
					$result=NewManager::getExecutionResult(
						'delete from `promotion` where promotable_id="'.$product['product_promotable_id'].'"',
						array(),true
					);
					$response['result'][]=array('promotions-removed',$result!==false);
					if($result!==false){
						$result=NewManager::getExecutionResult(
							'delete from `order_line` where order_id in (select id from `order` where product_id="'.$product['product_id'].'")',
							array(),true
						);
						$response['result'][]=array('related-order-lines-removed',$result!==false);
						if($result!==false){
							$result=NewManager::getExecutionResult(
								'delete from `group_has_product` where product_id="'.$product['product_id'].'"',
								array(),true
							);
							$response['result'][]=array('product-unbounded-to-groups',$result!==false);
							if($result!==false){
								$result=NewManager::getExecutionResult(
									'delete from `price_change` where product_id="'.$product['product_id'].'"',
									array(),true
								);
								$response['result'][]=array('price-changes-removed',$result!==false);
								if($result!==false){
									$result=NewManager::getExecutionResult(
										'delete from `product` where promotable_id="'.$product['product_promotable_id'].'" or translatable_id="'.$product['product_translatable_id'].'"',
										array(),true
									);
									$response['result'][]=array('product-removed',$result!==false);
									if($response===false){
										$result['data']++;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	$response=NewManager::toUTF8($response);
	echo json_encode($response);
?>