<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());
	$attributes=array(
		'articleGroupTheme',
		'translationData'
	);
	$optional=array();
	$wrongData=array();
	$toAdd=array();
	foreach($attributes as $attr){
		if(empty($_POST[$atrt])){
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
				$translationFields=array('articleContent'=>'content');
				break;
			case 's':
			case 'm':
				$translationFields=array('articleName'=>'name','articleDescription'=>'description');
				break;
			case 'l':
				$translationFields=array('articleTitle'=>'title','articleContent'=>'content');
				break;
		}
		$requestFields=array();
		foreach($languageCodez as $languageCode){
			foreach($translationFields as $input=>$field){
				$requestFields[$languageCode.'-'.$field]=$_POST[$languageCode.'-'.$input];
			}
		}
		$wrongData=array();
		$languageCodez=array('fr','nl');
		$translationOK=true;
		foreach($languageCodez as $languageCode){
			$wrongData[$languageCode]=array();
			foreach($translationFields as $key=>$field){
				if(empty($_POST['translationData'][$languageCode.'-'.$field])){
					$wrongData[$languageCode][]=$field;
				}
			}
			$response['result'][]=array($languageCode.'-translation-data-exists',!empty($wrongData[$languageCode]));
			if(!empty($wrongData[$languageCode])){
				$translationOK=false;
				break;
			}
		}
		if($translationOK){
			$key=KeyGenerator::generateKey();
			$result=NewManager::addElement(
				'translatable',
				array(
					'id'=>$key
				)
			);
			$response['result'][]=array('translatable-added',!empty($result));
			if($result){
				$result=NewManager::addElement(
					'article',
					array(
						'translatable_id'=>$key,
						'article_group_theme'=>$_POST['articleGroupTheme']
					)
				);
				$response['result'][]=array('article-added',!empty($result));
				if($result){
					$result=NewManager::starSelect(
						'article_group',
						array(
							'fields'=>array('article_size')
						),
						array(
							array('`article_group`.`theme`',$_POST['articleGroupTheme'])
						)
					);
					$response['result'][]=array('article-added',!empty($result));
					if(!empty($result)){
						$articleSize=$result[0]['article_group_article_size'];
						foreach($languageCodez as $languageCode){
							$result=NewManager::addElement(
								$articleSize.'_translation',
								$_POST['translationData']
							);
							$response['result'][]=array($language_code.'-translation-data-added',!empty($result));
							if($result){

							}
						}
					}
				}
			}
		}
	}
	$response=newManager::toUTF8($response);
	echo json_encode($response?>);
