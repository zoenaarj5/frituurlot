<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array('fr-name','nl-name','fr-description','nl-description','price','image','active');
	$optional=array('image','active');
	$wrongData=array();
	foreach($attributes as $attr){
		if((!isset($_POST[$attr]) || empty($_POST[$attr])) && !in_array($attr,$optional)) {
			$wrongData[]=$attr;
		}
	}
	$response['result'][]=array('input-data-exists',count($wrongData)==0);
	if($wrongData){
		$response['data']++;
	}else{
		$translatableId=KeyGenerator::generateKey();
		$result=NewManager::addElement(
			'translatable',
			array(
				'id'=>$translatableId
			)
		);
		$response['result'][]=array('translatable-added',!empty($result));
		if($result){
			$wrongRes=array();
			$langz=array('nl','fr');
			foreach($langz as $lang){
				if(!NewManager::addElement(
					's_translation',
					array(
						'translatable_id'=>$translatableId,
						'name'=>$_POST[$lang.'-name'],
						'description'=>$_POST[$lang.'-description'],
						'language_code'=>$lang
					)
				) ) {
					$wrongRes[]=$lang;
				}
			}
//			echo '<div>wrongRes=<b>'.json_encode($wrongRes).'</b></div>';
			$response['result'][]=array('translations-added',!count($wrongRes));
			if(!$wrongRes){
				$promotableId=KeyGenerator::generateKey();
				$prom_res=NewManager::addElement(
					'promotable',
					array(
						'id'=>$promotableId
					)
				);
				$response['result'][]=array('promotable-added',$prom_res>0);
				if($prom_res){
					$prod_res=NewManager::addElement(
						'product',
						array(
							'translatable_id'=>$translatableId,
							'promotable_id'=>$promotableId,
							'image'=>(isset($_POST['image'])?$_POST['image']:null),
							'price'=>($_POST['price'])/*,
							'registration_date'=>time()*/
						)
					)>0;
					$response['result'][]=array('product-added',$prod_res>0);
					if(!$prod_res){
						$response['data']++;
					}else{
						$prod_found_res=NewManager::starSelect(
							'product',
							array(
								'fields'=>array('id')
							),
							array(array('`product`.`translatable_id`',$translatableId)),
							null
						);
						$response['result'][]=array('product-found',!empty($prod_found_res));
						if($prod_found_res){
							$regDat=date('Y-m-d H:i:s');
						//	echo json_encode($prod_found_res);
							$productId=$prod_found_res[0]['product_id'];
							$price_res=NewManager::addElement(
								'price_change',
								array(
									'product_id'=>$productId,
									'new_price'=>$_POST['price'],
									'date'=>$regDat
								)
							);
							$response['result'][]=array('price-change-added',!empty($price_res));
							if($price_res){
								$price_upd_res=NewManager::updateElement(
									'product',
									array(
										'price'=>$_POST['price'],
										'registration_date'=>$regDat
									),
									array(array('id',$productId))
								);
								$response['result'][]=array('price-updated',!empty($price_upd_res));
								if($price_upd_res){
									$pg_res=NewManager::starSelect(
										'product_group',
										array('fields'=>array('id','code','active')
										),
										array(
											array('`product_group`.`code`','ALL')
										),array()
									);
									$response['result'][]=array('global-group-found',!empty($pg_res));
									if($pg_res===false){
										$response['data']++;
									}else{
										var_dump($pg_res);
										if(!empty($pg_res)){
											$allGroupId=$pg_res[0]['product_group_id'];
											$gr_add_res=NewManager::addElement(
												'group_has_product',
												array(
													'product_group_id'=>$allGroupId,
													'product_id'=>$productId
												)
											);
											$response['result'][]=array('global-group-addition-done',!empty($gr_add_res));
											if(empty($gr_add_res)){
												$response['data']++;
											}
										}
									}
								}else{
									$response['data']++;
								}
							}
						}else{
							$response['data']++;
						}

					}
				}else{
					$response['data']++;
				}
			}
		}else{
			$response['data']++;
		}
	}
//	echo '<div>response data=<b>'.$response['data'].'<b></div>';
/*	echo '<table style="border-collapse:collapse">';
	foreach($response['result'] as $line){
		echo '<tr>';
		foreach($line as $val){
			echo '<td style="border:solid 1px black">'.$val.'</td>';
		}
		echo '</tr>';
	}
	echo '</table>';*/
	$response=newManager::toUTF8($response);
	echo json_encode($response);
//	var_dump($response);
?>