<?php
	ob_start();
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
	$cont=ob_get_clean();
	require_once('../ge/model/html2pdf_v4.03/html2pdf.class.php');
	try{
		$pdf=new HTML2PDF('P','A4','fr');
		$pdf->writeHTML($cont);
		$pdf->output('pdf/html2pdf-test.pdf');
	}catch(HTML2PDF_exception $e){
		die($e);
	}
?>