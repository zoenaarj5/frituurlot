<?php
	require_once '../ge/model/class/NewManager.class.php';
	$attributes=array('orderId','clientId','language');
	$wrongData=array();
	foreach($attributes as $attr){
		if(empty($_GET[$attr])){
			$wrongData[]=$attr;
		}
	}
	if(!empty($wrongData)){
		die('Incomplete data.<br/><a href="..">Back to main page</a>');
	}
	$result=NewManager::starSelect(
		'order',
		array(
			'fields'=>array('id','date','paid','delivered','cancelled','confirmed'),
			'tables'=>array(
				'client'=>array(
					'fields'=>array('id','contact_name','contact_first_name','contact_email','firm_name')
				)
			)
		),array(
			array('`order`.`id`',$_GET['orderId'])
		),null
	);
	$com_result=NewManager::starSelect(
		'order_comment',
		array(
			'fields'=>array('date','content')
		),
		array(
			array('order_id',$_GET['orderId'])
		),
		null
	);
	if(!empty($result)){
		$tranz=array(
			'fr'=>array(
				'client'=>'Client',
				'nota'=>'Notes (important)',
				
				'details'=>'Détails',
				'orderNr'=>'Commande N°',

				'yes'=>'oui',
				'no'=>'non',

				'nameColumn'=>'Nom',
				'firmColumn'=>'Société',

				'dateColumn'=>'Date',
				'cancelledColumn'=>'Annulé',
				'confirmedColumn'=>'Confirmé',
				'deliveredColumn'=>'Livré',
				'paidColumn'=>'Payé',

				'quantityColumn'=>'Quantité',
				'productColumn'=>'Produit',
				'priceColumn'=>'Prix',
				'reductionColumn'=>'Réduction',
				'totalColumn'=>'Total'
			),
			'nl'=>array(
				'client'=>'Klant',
				'nota'=>'Noten (belangrijk)',
				'details'=>'Gegevens',
				'orderNr'=>'Bestelling Nr',

				'yes'=>'ja',
				'no'=>'no',

				'nameColumn'=>'Naam',
				'firmColumn'=>'Bedrijf',

				'dateColumn'=>'Datum',
				'cancelledColumn'=>'Geannuleerd',
				'confirmedColumn'=>'Bevestigd',
				'deliveredColumn'=>'Geleverd',
				'paidColumn'=>'Betaald',

				'quantityColumn'=>'Hooeveelheid',
				'productColumn'=>'Product',
				'priceColumn'=>'Prijs',
				'reductionColumn'=>'Afkorting',
				'totalColumn'=>'Totaal'
			)
		);
		$s='';
		$order=NewManager::toUTF8($result[0]);
		if($order['client_id']!=$_GET['clientId']){
			die('the client is not the order\'s author.');
		}
		$boolz=array();
		foreach(array('confirmed','paid','cancelled','delivered') as $field){
			$boolz[$field]=$order['order_'.$field] ? $tranz[$_GET['language']]['yes'] : $tranz[$_GET['language']]['no'];
		} 
		$s.='<p id="top-line">Frituur Lot - <i>www.frituurlot.be</i> - Tel:<strong>02/310.80.16</strong> - Fax:<strong>02/310.97.17</strong></p>';
		$s.='<h3 id="clientDataTitle">'.$tranz[$_GET['language']]['client'].': '.$order['client_contact_first_name'].' '.$order['client_contact_name'].'</h3>';
		$s.='<table id="clientData">
			<tr><th>'.$tranz[$_GET['language']]['nameColumn'].'</th><th>Email</th><th>'.$tranz[$_GET['language']]['firmColumn'].'</th></tr>
			<tr><td class="m">'.$order['client_contact_name'].' '.$order['client_contact_first_name'].'</td>
			<td class="m">'.$order['client_contact_email'].'</td>
			<td class="m">'.$order['client_firm_name'].'</td></tr>
		</table>';
		$s.='<h2 id="orderDataTitle">'.$tranz[$_GET['language']]['orderNr'].' '.$order['order_id'].'</h2>';
		$s.='<table id="orderData">';
		$s.='<tr>
			<th>'.$tranz[$_GET['language']]['dateColumn'].'</th>
			<th>'.$tranz[$_GET['language']]['confirmedColumn'].'</th>
			<th>'.$tranz[$_GET['language']]['paidColumn'].'</th>
			<th>'.$tranz[$_GET['language']]['deliveredColumn'].'</th>
			<th>'.$tranz[$_GET['language']]['cancelledColumn'].'</th>
		</tr>';
		$s.='<tr>
			<td class="m">'.$order['order_date'].'</td>
			<td class="s">'.$boolz['confirmed'].'</td>
			<td class="s">'.$boolz['paid'].'</td>
			<td class="s">'.$boolz['delivered'].'</td>
			<td class="s">'.$boolz['cancelled'].'</td>
		</tr>';
	/*	foreach($order as $field=>$value){
			if(!is_numeric($field)){
				$s.='<tr><th>'.$field.'</th><td>'.$value.'</td></tr>';
			}
		}*/
		$s.='</table>';
		if(!empty($com_result)){
//			print_r(json_encode($com_result));
			$order['comments']=$com_result;
			$s.='<h3>'.$tranz[$_GET['language']]['nota'].'</h3>';
			$s.='<table id="orderComments">';
			foreach($order['comments'] as $com){
				$s.='<tr><td>'.$com['order_comment_content'].'</td></tr>';
			}
			$s.='</table>';
		}else{
			$order['comments']=array();
		}
//		var_dump($order);
		$result=NewManager::starSelect(
			'order_line',
			array(
				'fields'=>array('price','reduction','quantity','names','order_id'),
				'tables'=>array(
					'product'=>array(
						'fields'=>array('price'),
						'tables'=>array(
							's_translation'=>array(
								'key'=>'translatable_id',
								'foreign_key'=>'translatable_id',
								'fields'=>array('name','description')
							)
						)
					)
				)
			),array(
				array('`order_line`.`order_id`',$order['order_id']),
				array('`s_translation`.`language_code`',$_GET['language'])
			),null
		);
//		var_dump($result);
		if(!empty($result)){
			$rez=NewManager::toUTF8($result);
			$s.='<h2 id="orderLinesTitle">'.$tranz[$_GET['language']]['details'].'</h2>';
			$s.='<table id="orderLines"><tr><th>'.$tranz[$_GET['language']]['productColumn'].'</th><th>'.$tranz[$_GET['language']]['priceColumn'].'</th><th>'.$tranz[$_GET['language']]['reductionColumn'].'</th><th>'.$tranz[$_GET['language']]['quantityColumn'].'</th>'/*.'<th>Names</th>'*/.'<th>'.$tranz[$_GET['language']]['totalColumn'].'</th></tr>';
			$grandTotal=0;
			foreach($rez as $orderLine){
				$total=($orderLine['order_line_price']-$orderLine['order_line_reduction'])*$orderLine['order_line_quantity'];
				$grandTotal+=$total;
				$s.='<tr><td class="m">'.$orderLine['s_translation_name'].'</td><td class="s">'.$orderLine['order_line_price'].'</td><td class="s">'.$orderLine['order_line_reduction'].'</td><td class="s">'.$orderLine['order_line_quantity'].'</td>'/*.'<td class="l">'.$orderLine['order_line_names']
				.'</td>'*/.'<td class="s">'.$total.'</td></tr>';
			}
			$s.='<tr><td colspan="4">TOTAL</td><td><strong>'.$grandTotal.'</strong></td></tr>';
			$s.='</table>';
//			echo json_encode(NewManager::toUTF8($result));
		}
		$s.='<style>
			h3{
				text-align:center;
			}
			table{
				border-collapse:collapse;
				text-align:center;
			}
			table td,table th{
				border:solid 1px black;
				padding:5px;
			}
			#clientData{
				margin-left:135px;
			}
			#clientData th{
				background-color:#DEF;
			}
			#clientDataTitle{
				text-align:center;
			}
			#orderComments{
				margin-left:115px;
			}
			#orderComments td{
				background-color:lightgreen;
				margin-left:200px;
				text-align:center;
				width:500px;
			}
			#orderData{
				font-size:15px;
				margin-left:150px;
			}
			#orderData th{
				background-color:#DDF;
			}
			#orderDataTitle{
				text-align:center;
			}
			#orderLines{
				font-size:15px;
				margin-left:170px;
			}
			#orderLines th{
				background-color:#FEF;
			}
			#orderLines td,#orderLines th{
				padding:5px;
			}
			#top-line{
				text-align:center;
			}
			table .l{
				width:250px;
			}
			table .m{
				width:140px
			}
			table .s{
				width:30px;
			}
			#orderLinesTitle{
				text-align:center;
			}
		</style>';
		ob_start();
		echo $s;
		/*
		?>
		<style type="text/css">
			table{
				background-color:lightgray;
				border-collapse: collapse;
				margin-left: auto;
				margin-right: auto;
				width:50%;
			}
			table td,table th{
				border: solid 1px magenta;
				width:50%;
			}
		</style>
		<page backcolor="lightblue">
			<table>
				<tr>
					<th>Column 1</th>
					<th>Column 2</th>
				</tr>
				<tr>
					<td>Element 11</td>
					<td>Element 12</td>
				</tr>
				<tr>
					<td>Element 21</td>
					<td>Element 22</td>
				</tr>
			</table>
		</page>
		<?php
*/
		$cont=ob_get_clean();
		require_once('../ge/model/html2pdf_v4.03/html2pdf.class.php');
		try{
			$pdf=new HTML2PDF('P','A4','fr');
			$pdf->writeHTML($cont);
			$pdf->output('pdf/html2pdf-test-oid'.$order['order_id'].'.pdf');
		}catch(HTML2PDF_exception $e){
			die($e);
		}
	}
?>