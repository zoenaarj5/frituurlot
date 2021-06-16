<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array('language');
	$optional=array();
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
		$result=NewManager::starSelect(
			'group_has_product',
			array(
				'tables'=>array(
					'product'=>array(
						'fields'=>array('id','price','active','registration_date','translatable_id','promotable_id'),
						'tables'=>array(
							's_translation'=>array(
								'alias'=>'product_translation',
								'key'=>'translatable_id',
								'foreign_key'=>'translatable_id',
								'fields'=>array('name','description')
							)
						)
					),
					'product_group'=>array(
						'fields'=>array('id','code','registration_date','translatable_id','promotable_id')/*,
						'tables'=>array(
							's_translation'=>array(
								'alias'=>'group_translation',
								'key'=>'translatable_id',
								'foreign_key'=>'translatable_id',
								'fields'=>array('name','description')
							)
						)*/
					)
				)
			),
			array(
//				array('`group_translation`.`language_code`',$_POST['language']),
				array('`product_translation`.`language_code`',$_POST['language'])
			),
			array(
				array('product','id')
			)
		);
//		var_dump($result);
		$response['result'][]=array('groups-found',!empty($result));
		if($result===false){
			$response['data']++;
		}else{
			$response['data']=$result;
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