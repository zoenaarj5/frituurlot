<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array('language');
	$wrongData=array();
	$optional=array();
	foreach($attributes as $attr){
		if((!isset($_POST[$attr]) || empty($_POST[$attr])) && !in_array($attr,$optional)) {
			$wrongData[]=$attr;
		}
	}
	$response['result'][]=array('input-data-exists',empty($wrongData));
	if($wrongData){
		$response['data']++;
	}else{
		$result=NewManager::starSelect(
			'translatable',
			array(
				'fields'=>array(),
				'tables'=>array(
					'xs_translation'=>array(
						'key'=>'translatable_id',
						'foreign_key'=>'id',
						'fields'=>array('content')
					),
					'security_question'=>array(
						'key'=>'translatable_id',
						'foreign_key'=>'id',
						'fields'=>array('id')
					)
				)
			),
			array(array('xs_translation.language_code',$_POST['language'])),
			array()
		);
		$response['result'][]=array('security-questions-found',!empty($result));
		if($result){
			$response['data']=$result;
		}else{
			$response['data']++;
		}
	}
	if(is_array($response['data'])){
//		echo '<table>';
		for($i=0;$i<count($response['data']);$i++){
			for($j=0;$j<count($response['data'][$i])/2;$j++){
				unset($response['data'][$i][$j]);
			}
		}
/*		foreach($response['data'] as $line){
//			echo '<tr>';
//			unset($line[0]);
			foreach($line as $elt){
				echo '<td>';
				echo $elt;
				echo '</td>';
			}
			echo '</tr>';
		}
		echo '</table>';*/
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response/*,JSON_UNESCAPED_UNICODE*/);
	//echo 'JSON LAST ERROR = '. json_last_error().'<br/>';
?>