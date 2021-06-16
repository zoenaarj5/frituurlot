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
	$response['wrongData']=$wrongData;
	$response['result'][]=array('input-data-exists',count($wrongData)==0);
	//var_dump($wrongData);
	if($wrongData){
		$response['data']++;
	}else{
		$res=NewManager::starSelect(
			'product_group',
			array(
				'fields'=>array('id','code'),
				'tables'=>array(
					's_translation'=>array(
						'fields'=>array('name','description'),
						'foreign_key'=>'translatable_id',
						'key'=>'translatable_id'
					)
				)
			),
			array(
				array('`s_translation`.`language_code`',$_POST['language'])
			),
			array(array('s_translation','name'))
		);
		$response['result'][]=array('data-found',!empty($res));
		if($res===false){
			$response['data']++;
		}else{
			$response['data']=$res;
		}
	}
//	header('Content-Type: text/html; charset=utf-8');
//	var_dump($response);
	$response=newManager::toUTF8($response);
	echo json_encode($response/*,JSON_UNESCAPED_UNICODE*/);
//	echo 'JSON LAST ERROR = '. json_last_error().'<br/>';
/*	$xml=new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><root/>');
	if(is_array($response['data'])){
		foreach($response['data'] as $dataLine){
			$xl=$xml->addChild('product');
			foreach($dataLine as $key=>$value){
				echo '<div>key='.$key.',value='.$value.'</div>';
				$xl->addChild($key,$value);
			}
		}
		echo($xml->asXML());
	}*/
?>
