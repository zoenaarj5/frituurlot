<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array('language','startDate','endDate');
	$optional=array('startDate','endDate');
	$wrongData=array();
	$toAdd=array();
	foreach($attributes as $attr){
		if(empty($_POST[$attr])){
			if(!in_array($attr,$optional)){
				$wrongData[]=$attr;
			}
		}else{
			$toAdd[$attr]=$_POST[$attr];
		}
	}
	$response['result'][]=array('input-data-exists',empty($wrongData) && !empty($toAdd));
	if($wrongData){
		$response['data']++;
		$response['wrongData']=$wrongData;
	}else{
		$rightNow=date('Y-m-d H:i:s');
		$dateLimits=array();
//		$rightNow=date(time());
		foreach(array('startDate','endDate') as $date){
			$dateLimits[$date]=empty($_POST[$date])?'now()':$_POST[$date];
		}
		$result=NewManager::starSelect(
			'promotable',
			array(
				'fields'=>array('id'),
				'tables'=>array(
					'promotion'=>array(
						'key'=>'promotable_id',
						'foreign_key'=>'id',
						'fields'=>array(
							'id','type','value','start_date','end_date','stop_date'
						)
					),
					'product'=>array(
						'key'=>'promotable_id',
						'foreign_key'=>'id',
						'fields'=>array('id','price','active'),
						'tables'=>array(
							's_translation'=>array(
								'key'=>'translatable_id',
								'foreign_key'=>'translatable_id',
								'fields'=>array(
									'name','description'
								)
							)
						)
					)
				)
			),
			array(
				array('`s_translation`.`language_code`',$_POST['language']),
				array('`promotion`.`start_date`',$dateLimits['startDate'],'<',1),
				array('`promotion`.`end_date`',$dateLimits['endDate'],'>',1)/*,
				array('`promotion`.`start_date`',''.$rightNow,'<'),
				array('`promotion`.`end_date`',''.$rightNow,'>'),
				array('`promotion`.`stop_date`',null,'<')
*/			),
			array(array('promotion','start_date','desc'))
		);
		$response['result'][]=array('promotions-found',!empty($result));
		if(!empty($result)){
			$response['data']=$result;
		}
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>