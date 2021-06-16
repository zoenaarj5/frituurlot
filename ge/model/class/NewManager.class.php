<?php
require_once('Connexion.class.php');
class NewManager{
	public static function getDBName(){
		return 'frituurlot2015';
	}
	public static function removeIntKeys($array){
		foreach($array as $key=>$elt){
			if(is_numeric($key)){
				unset($array[$key]);
			}
		}
	}
	public static function date4SQL($date){
		//echo '<div>'.$date.'</div>';
		if(!preg_match('#^[0-9]{2}\/[0-9]{2}/[0-9]{4}$#',$date)){
			return /*'0000-00-00'*/null;
		}
		$xpl=explode('/',$date);
		
		$day=$xpl[0];
		$month=$xpl[1];
		$year=$xpl[2];
		if(checkdate($month,$day,$year)===false){
			return null;
		}
//		return '\"'.$year.'-'.$month.'-'.$day.'\"';
		return ''.$year.'-'.$month.'-'.$day.'';
	}
	public static function dateForSQL($date){
		if(!preg_match('#^\d\d\/\d\d\/\d\d\d\d$#',$date)){
			return /*'0000-00-00'*/null;
		}
		$day=substr($date,0,2);
		$month=substr($date,2,2);
		$year=substr($date,4,4);
		if(checkdate(intval($month),intval($day),intval($year))===false){
			return null;
		}
		return '\"'.$year.'-'.$month.'-'.$day.'\"';
	}
	public static function addToStarSelect($tableName,$data){
		$select='';
		$from='';
		if(isset($data['fields'])){
			foreach($data['fields'] as $field){
				$select.='`'.$tableName.'`.`'.$field.'` as '.$tableName.'_'.$field.',';
			}
		}
		$joinOptions=array('left','inner','right');
		if(isset($data['tables'])){
//			self::removeIntKeys($data['tables']);
			foreach($data['tables'] as $tName=>$subData){
//				echo '<div>tName=<b>'.$tName.'</b></div>';
				$alias=empty($subData['alias'])?$tName:$subData['alias'];
				$jOption=null;
				if(isset($subData['join'])){
					if(in_array($subData['join'],$joinOptions)){
						$jOption=$subData['join'];
					}else if(array_key_exists($subData['join'],$joinOptions)){
						$jOption=$joinOptions[$subData['join']];
					}
				}else{
					$jOption='inner';
				}
				$plusIfAlias=$alias==$tName?'':' '.$alias;
				$from.=' '.$jOption.' join `'.$tName.'`'.$plusIfAlias;
				$myKey=(isset($subData['key']))?$subData['key']:'id';
//				echo '<div>myKey=<b>'.$myKey.'</b></div>';
				$myForeignKey=(isset($subData['foreign_key']))?$subData['foreign_key']:$tName.'_'.$myKey;
//				echo '<div>myForeignKey=<b>'.$myForeignKey.'</b></div>';
				$from.=' on `'.$tableName.'`.`'.$myForeignKey.'`=`'.$alias.'`.`'.$myKey.'`';
//				echo '<div>from=<b>'.$from.'</b></div>';
				$result=self::addToStarSelect($alias,$subData);
				$from.=$result['from'];
				$select.=$result['select'];
			}
		}
		return array('select'=>$select,'from'=>$from);
	}
	public static function starSelect($firstTableName,$data,$criteria,$order){

		$firstAlias=empty($data['alias'])?$firstTableName:$data['alias'];

		$select='';
		$from='`'.$firstTableName.'`';
		$from.=$firstAlias==$firstTableName?'':' "'.$firstAlias.'"';
		$orderBy='';
		$where='';
		if(!empty($order)){
			foreach($order as $fieldData){
				$orderBy.=$fieldData[0].'_'.$fieldData[1];
				if(!empty($fieldData[2])){
					$orderBy.=' desc';
				}
				$orderBy.=',';
			}
			if(!empty($orderBy)){
				$orderBy=substr($orderBy,0,strlen($orderBy)-1);
			}
		}
		$comparisonSigns=array('<','=','>','<=','>=',' like ');
		if(!empty($criteria)){
			foreach($criteria as $criterium){
				$compar='';
				$wrap=empty($criterium[3])?'"':'';
				if(isset($criterium[2])){
					if(in_array($criterium[2],$comparisonSigns)){
							$compar=$criterium[2];
					}else if(array_key_exists($criterium[2],$comparisonSigns)){
						$compar=$comparisonSigns[$criterium[2]];
					}
				}else{
					$compar='=';
				}
				$where.=' '.$criterium[0].$compar.' '.$wrap.$criterium[1].$wrap.' and';
			}
			$where=' where'.substr($where,0,strlen($where)-strlen(' and'));
		}
		if(isset($data['fields'])){
			foreach($data['fields'] as $field){
				$select.='`'.$firstAlias.'`.`'.$field.'` as '.$firstAlias.'_'.$field.',';
			}
		}
		if(isset($data['tables'])){
	//		self::removeIntKeys($data['tables']);
			foreach($data['tables'] as $tName=>$subData){
				$alias=empty($subData['alias'])?$tName:$subData['alias'];
				$joinOptions=array('left','inner','right');
				$jOption=null;
				if(isset($subData['join'])){
					if(in_array($subData['join'],$joinOptions)){
						$jOption=$subData['join'];
					}else if(array_key_exists($subData['join'],$joinOptions)){
						$jOption=$joinOptions[$subData['join']];
					}
				}else{
					$jOption='inner';
				}
				$plusIfAlias=$alias==$tName?'':' '.$alias;
				$from.=' '.$jOption.' join `'.$tName.'`'.$plusIfAlias;
				$myKey=(isset($subData['key']))?$subData['key']:'id';
				$myForeignKey=(isset($subData['foreign_key']))?$subData['foreign_key']:$tName.'_'.$myKey;
				$from.=' on `'.$firstAlias.'`.`'.$myForeignKey.'`=`'.$tName.'`.`'.$myKey.'`';
				$result=self::addToStarSelect($alias,$subData);
				$select.=$result['select'];
				$from.=$result['from'];
			}
		}
		if(empty($select)){
			return 0;
		}
		$select='select '.substr($select,0,strlen($select)-1);
		$from=' from '.$from;
		if(!empty($orderBy)){
			$orderBy=' order by '.$orderBy;
		}
/*		echo '<div>Select:<b>'.$select.'</b></div>';
		echo '<div>From:<b>'.$from.'</b></div>';
		echo '<div>Where:<b>'.$where.'</b></div>';
		echo '<div>OrderBy:<b>'.$orderBy.'</b></div>';*/
		$req=$select.$from.$where.$orderBy;
//		echo '<div>Request: <b>'.$req.'</b></div>';
		try{
			$pdo=new Connexion(self::getDBName());
//			echo '<div>Résultat:</div>';
			$res=$pdo->query($req);
//			var_dump($res);
			if($res===false){
//				echo '<div>False!!!</div>';
				return $res;
			}
			$reponse=$res->fetchAll();
//			echo '<div>Réponse:</div>';
//			var_dump($reponse);
			return $reponse;
		}catch(PDOException $e){
//			echo $e->getMessage();
			return FALSE;
		}
	}
	public static function addElement($tableName,$data){
		$sFields='';
		$sBoundValues='';
		$sValues='';
		$separator=',';
		foreach($data as $field=>$value){
			$sFields.=$field.$separator;
			$sBoundValues.=':'.$field.$separator;
			$sValues.=$value.$separator;
		}
		if(!empty($sFields)){
			$sFields=substr($sFields,0,strlen($sFields)-strlen($separator));
		}if(!empty($sValues)){
			$sValues=substr($sValues,0,strlen($sValues)-strlen($separator));
		}if(!empty($sBoundValues)){
			$sBoundValues=substr($sBoundValues,0,strlen($sBoundValues)-strlen($separator));
		}
		$req='insert into `' . $tableName . '`('. $sFields . ') values(' . $sBoundValues . ')';
//		echo '<div>req=<b>'.$req.'</b></div>';
		try{
			$pdo=new Connexion(self::getDBName());
		//	echo '<div>$req=<b>'.$req.'</b></div>';
			$request=$pdo->prepare($req);
		/*	echo '<div style="color:green">';
			var_dump($data);
			echo '</div>';*/
			foreach ($data as $field => $value) {
				$request->bindValue(':'.$field,''.$value);
			}
			$res=$request->execute();
			return $res;
		}catch(PDOException $e){
//			echo $e->getMessage();
			return FALSE;
		}
	}
	public static function updateElement($tableName,$newData,$criteria){//NOT COMPLETE
//		echo '<div>Updating element. newData = '.json_encode($newData).'</div>';
		if(empty($newData)){
			return 0;
		}
		$set='';
		$toBind=array();
		foreach($newData as $field=>$value){
			$set.=$field.'=:'.$field.',';
			$toBind[':'.$field]=$value;
		}
		$set='set '.substr($set,0,strlen($set)-1);
		$where='';
		if(!empty($criteria)){
			foreach($criteria as $criterium){
				$compar='';
				if(isset($criterium[2])){
					if(in_array($criterium[2],$comparisonSigns)){
							$compar=$criterium[2];
					}else if(array_key_exists($criterium[2],$comparisonSigns)){
							$compar=$comparisonSigns[$criterium[2]];
					}
				}else{
					$compar='=';
				}
				$where.=' '.$criterium[0].$compar.' "'.$criterium[1].'" and';
			}
			$where=' where'.substr($where,0,strlen($where)-strlen(' and'));
		}
		$req='update `'.$tableName.'` '.$set.$where;
//		echo '<div>request=<b>'.$req.'</b></div>';
		try{
			$pdo=new Connexion(self::getDBName());
			$request=$pdo->prepare($req);
			foreach($newData as $field=>$value){
				$request->bindValue(':'.$field,''.$value);
			}
			$res=$request->execute();
			return $res;
		}catch(PDOException $e){
//			echo $e->getMessage();
			return FALSE;
		}
	}
	public static function getQueryResult($req){
		try{
			echo '<div style="color:red;">'.$req.'</div>';
			$pdo=new Connexion(self::getDBName());
			$res=$pdo->query($req);
			if($res===false){
				return $res;
			}
			$reponse=$res->fetchAll();
			return $reponse;
		}catch(PDOException $e){
		//	echo ($e->getMessage());
			return FALSE;
		}
	}
	public static function removeElement($tableName,$data){
		try{
			$pdo=new Connexion(self::getDBName());
			$where='';
			$conj=' and ';
			$compz=array('>','<','=');
			foreach($data as $line){
				if(is_array($line) && count($line)>1){
					$comp='=';
					if(count($line)>2){
						if(in_array($line[2],$compz)){
							$comp=$line[2];
						}else if(array_key_exists($line[2],$compz)){
							$comp=$compz[$line[2]];
						}
					}
					$where.=$conj.$line[0].$comp.$line[1];
				}
			}
			if(!empty($where)){
				$where=' where '.substr($where,strlen($conj),strlen($where)-strlen($conj));
			}
			$sReq='delete from '.$tableName.$where;
//			echo '<div>Request = <b>'.$sReq.'</b></div>';
			$req=$pdo->prepare($sReq);
			$res=$req->execute();
			return $res;
		}catch(PDOException $e){
			echo $e->getMessage();
			return false;
		}
	}
	public static function getExecutionResult($request,$boundValues,$associativeBinding=false){
		try{
		//	echo '<div style="color:red;">'.$request.'</div>';
			$pdo=new Connexion(self::getDBName());
		/*	echo '<div>request=<b>'.$request.'</b></div>';
			echo '<div>Bound values = <b>'.json_encode($boundValues).'</b></div>';*/
			$req=$pdo->prepare($request);
			$res=false;
			if($associativeBinding){
				foreach($boundValues as $key=>$value){
					$req->bindValue($key,$value);
				}
				$res=$req->execute();
			}else{
				$res=$req->execute($boundValues);
			}
			return $res;
		}catch(PDOException $e){
		//	echo ($e->getMessage());
			return FALSE;
		}
	}
	public static function fromUTF8($data){
		$newData=null;
		if(is_array($data)){
			$newData=array();
			foreach($data as $key=>$line){
				$newData[$key]=self::fromUTF8($line);
			}
		}else{
			$newData=utf8_decode($data);
		}
		return $newData;
	}
	public static function toUTF8($data){
		$newData=null;
		if(is_array($data)){
			$newData=array();
			foreach($data as $key=>$line){
				$newData[$key]=self::toUTF8($line);
			}
		}else{
			$newData=utf8_encode($data);
		}
		return $newData;
	}
}
?>