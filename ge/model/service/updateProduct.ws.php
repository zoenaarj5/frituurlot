<?php
	session_start();
	require_once('../class/KeyGenerator.class.php');
	require_once('../class/NewManager.class.php');
	$response=array('data'=>0,'result'=>array());

	$attributes=array(
		'productId',
		'fr-name',
		'fr-description',
		'nl-name',
		'nl-description',
		'active'
	);
	$optional=array(
		'fr-name',
		'fr-description',
		'nl-name',
		'nl-description',
		'active' 
	);

	$wrongData=array();
	$toChange=array();
	$response['inputData']=array();
	foreach($attributes as $attr){
		if(empty($_POST[$attr])){
			if(!in_array($attr,$optional)){
				$wrongData[]=$attr;
			}
		}else{
			if(!empty(trim($_POST[$attr]))){
				$toChange[]=$attr;
				$response['inputData'][$attr]=$_POST[$attr];
			}
		}
	}
	$response['inputData']=NewManager::fromUTF8($response['inputData']);
	$response['wrongData']=$wrongData;
	$response['result'][]=array('required-update-data-exists',empty($wrongData));
	if(empty($wrongData)){
		$response['result'][]=array('update-data-to-change-exists',!empty($toChange));
		if($toChange) {
			$languages=array('fr','nl');
			$errors=array();
			foreach($languages as $lang){
				$s='';
				$toBind=array();
				foreach(array('name','description') as $field){
					if(in_array($lang.'-'.$field,$toChange)){
						$s.=' '.$field.'=:'.$field.',';
						$toBind[':'.$field]=$_POST[$lang.'-'.$field];
					}
				}
				if(!empty($s)){
					$s=substr($s,0,strlen($s)-1);
					$requ='update s_translation set '.$s.
					' where language_code="'.$lang.'" and translatable_id in (
						select translatable_id from `product` where id='
						.$_POST['productId'].')';
					$result=NewManager::getExecutionResult($requ,$toBind,true);
					if(!$result){
						$errors[]=$lang;
					}
				}
			}
			$response['result'][]=array('all-translations-changed',empty($errors));
			if(empty($errors)){
//				echo '<div><b>active=</b>'.$_POST["active"].'</div>';
				if(isset($_POST['active']) && $_POST['active']!==''){
					$result=NewManager::updateElement(
						'product',
						array(
							'active'=>!empty($_POST['active'])
						),
						array(array('id',$_POST['productId']))
					);
					$response['result'][]=array('product-activity-updated',!empty($result));
					if(empty($result)){
						$response['data']++;
					}
				}
			}else{
				$response['data']++;
			}
		}else{
			$response['data']++;
		}
	}else{
		$response['data']++;
	}
	echo json_encode($response);
?>