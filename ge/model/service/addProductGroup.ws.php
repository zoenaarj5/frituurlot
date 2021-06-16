<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array('code','fr-name','nl-name','fr-description','nl-description','image','active');
	$optional=array('image','active');
	$wrongData=array();
	foreach($attributes as $attr){
		if((!isset($_POST[$attr]) || empty($_POST[$attr])) && !in_array($attr,$optional)) {
			$wrongData[]=$attr;
		}
	}
	$response['result'][]=array('input-data-exists',count($wrongData)==0);
	$response['wrongData']=$wrongData;
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
					$regDat=date('Y-m-d H:i:s');
					$prod_res=NewManager::addElement(
						'product_group',
						array(
							'translatable_id'=>$translatableId,
							'promotable_id'=>$promotableId,
							'image'=>(isset($_POST['image'])?$_POST['image']:null),
							'registration_date'=>$regDat,
							'code'=>$_POST['code']
						)
					);
					$response['result'][]=array('product-group-added',$prod_res>0);
					if(!$prod_res){
						$response['data']++;
					}else{
						$prod_gr_found_res=NewManager::starSelect(
							'product_group',
							array(
								'fields'=>array('id')
							),
							array(array('`product_group`.`translatable_id`',$translatableId)),
							null
						);
						$response['result'][]=array('product-group-found',!empty($prod_gr_found_res));
						if($prod_gr_found_res){
							$response['data']=$prod_gr_found_res[0];
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