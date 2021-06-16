<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array('orderId','languageCode');
	$optional=array();
	$wrongData=array();
	foreach($attributes as $attr){
		if(empty($attr) && !in_array($attr,$optional)){
			$wrongData[]=$attr;
		}
	}
	$response['result'][]=array('input-data-exists',empty($wrongData));
	if($wrongData){
		$response['data']++;
	}else{
		$result=NewManager::starSelect(
			'order_line',
			array(
				'fields'=>array('quantity','price','reduction'),
				'tables'=>array(
					'product'=>array(
						'fields'=>array('id','price'),
						'tables'=>array(
							's_translation'=>array(
								'key'=>'translatable_id',
								'foreign_key'=>'translatable_id',
								'fields'=>array('name','description')
							)
						)
					),
					'order'=>array(
						'fields'=>array(
							'id','date','cancelled','delivered','paid'
						),
						'tables'=>array(
							'client'=>array('name','first_name','email','phone')
						)
					)
				)
			),
			array(
				array('`order`.`id`',$_POST['orderId']),
				array('`s_translation`.`language_code`',$_POST['languageCode'])
			),null
		);

/*		$result=NewManager::starSelect(
			'translatable',
			array(
				'fields'=>array(),
				'tables'=>array(
					's_translation'=>array(
						'key'=>'translatable_id',
						'foreign_key'=>'id',
						'fields'=>array('name','description')
					),
					'product'=>array(
						'key'=>'translatable_id',
						'foreign_key'=>'id',
						'fields'=>array('id','price'),
						'tables'=>array(
							'order_line'=>array(
								'key'=>'product_id',
								'foreign_key'=>'id',
								'fields'=>array('quantity'),
								'tables'=>array(
									'order'=>array(
										'fields'=>array(
											'id','date','cancelled','delivered','paid'
										),
										'tables'=>array(
											'client'=>array('name','first_name','email','phone')
										)
									)
								)
							)
						)
					)
				)
			),
			array(
				array('`order`.`id`',$_POST['orderId'])
			),null
		);*/
		$response['result'][]=array('order-lines-exist',!empty($result));
		if($result){
			$response['data']=$result;
		}
	}
/*	if(is_array($response['data'])){
		for($i=0;$i<count($response['data'])/2;$i++){
			unset($response['data'][$i]);
		}
	}*/
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>