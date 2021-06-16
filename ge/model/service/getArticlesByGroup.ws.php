<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array(
		'articleGroupTheme',
		'articleSize',
		'languageCode'
	);
	$optional=array();
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
	}else{
		$translationFields=null;
		switch($_POST['articleGroupTheme']){
			case 'xs':
				$translationFields=array('name','content','language_code');
				break;
			case 's':
			case 'm':
				$translationFields=array('name','description','date','language_code');
				break;
			case 'l':
				$translationFields=array('title','content','date','language_code');
				break;
		}
		$translationTable=$_POST['articleSize'].'_translation';
		$result=NewManager::starSelect(
			'translatable',
			array(
				'tables'=>array(
					$translationTable=>array(
						'key'=>'translatable_id',
						'foreign_key'=>'id',
						'fields'=>$translationFields
					),
					'article'=>array(
						'key'=>'translatable_id',
						'foreign_key'=>'id',
						'tables'=>array(
							'article_group'=>array(
								'fields'=>array('theme')
							)
						)
					)
				)
			),
			array(
				array('`article_group`.`theme`',$_POST['articleGroupTheme']),
				array('`'.$translationTable.'`.`language_code`',$_POST['languageCode'])
			),null
		);
		$response['result'][]=array('theme-added',!empty($result));
		if($result){
			$response['data']=$result;
		}
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response);
?>