<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$attributes=array('fr-content','nl-content');
	$response=array('data'=>0,'result'=>array());
	$wrongData=array();
	foreach($attributes as $attr){
		if((!isset($_POST[$attr]) || empty($_POST[$attr])) && !in_array($attr,$optional)) {
			$wrongData[]=$attr;
		}
	}
	$response['result'][]=array('input-data-exists',count($wrongData)==0);
	if(!empty($wrongData)){
		$response['data']++;
	}else{
		$toBind=array();
		$languages=array('fr','nl');
		foreach($languages as $lang){
			$content=trim($_POST[$lang.'-content']);
			if($content){
				$toBind[':'.$lang.'-content']=$content;
			}
		}
		$response['result'][]=array('input-data-exists',count($wrongData)==0);
		$translatableId=KeyGenerator::generateKey();
		if(!empty($wrongData)){
			$response['data']++;
		}else{
			$result=NewManager::addElement('translatable',array(
				'id'=>$translatableId
			));
			$response['result'][]=array('translatable-added',$result!=0);
			if($result){
				$result=NewManager::addElement(
					'security_question',
					array(
						'translatable_id'=>$translatableId
					)
				);
				$response['result'][]=array('security-question-added',!empty($result));
				if($result){
					$notAdded=array();
					foreach($languages as $lang){
						$result=NewManager::addElement(
							'xs_translation',
							array(
								'translatable_id'=>$translatableId,
								'content'=>$_POST[$lang.'-content'],
								'language_code'=>$lang
							)
						);
						if(!$result){
							$notAdded[]=$lang;
						}
					}
					$response['result'][]=array('all-translations-added',empty($notAdded));
				//	echo '<div style="color:lightblue;">notAdded=<b>'.json_encode($notAdded).'</b></div>';
				}else{
					$response['data']++;
				}
			}
		}
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>