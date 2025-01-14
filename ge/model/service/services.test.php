<?php
	$service=$_GET['service'];
	$serviceFields=array(
		'addArticleToXSGroup'=>array(
			'request'=>array('articleGroupTheme','articleContent')
		),
		'addArticleToSGroup'=>array(
			'request'=>array('articleGroupTheme','articleName','articleDescription')
		),
		'addArticleToMGroup'=>array(
			'request'=>array('articleGroupTheme','articleName','articleDescription')
		),
		'addArticleToLGroup'=>array(
			'request'=>array('articleGroupTheme','articleTitle','articleContent')
		),
		'addClient'=>array(
			'request'=>array(
				'contactEmail','contactGSM',
				'contactName','contactFirstName',
				'firmName','firmPhone',
				'firmFax',
				'addressStreet','addressNumber',
				'addressBox','addressZipCode',
				'addressCity','password',
				'securityQuestionId','securityAnswer'
			),
			'response'=>array()
		),
		'addLanguage'=>array(
			'request'=>array('code','name'),
			'response'=>array()
		),
		'addOrderComment'=>array(
			'request'=>array(
				'orderId','content'
			),
			'response'=>array()
		),'addOrderLine'=>array(
			'request'=>array(
				'orderId','productId','quantity','reduction','names'
			),
			'response'=>array()
		),
		'addPasswordChange'=>array(
			'request'=>array('clientId','languageCode'),
			'response'=>array()
		),
		'addProduct'=>array(
			'request'=>array(
				'fr-name',
				'fr-description',
				'nl-name',
				'nl-description',
				'price'
			),
			'response'=>array()
		),
		'addProductToGroup'=>array(
			'request'=>array(
				'productId',
				'productGroupId'
			),
			'response'=>array()
		),
		'addProductGroup'=>array(
			'request'=>array(
				'code',
				'fr-name',
				'fr-description',
				'nl-name',
				'nl-description'
			),
			'response'=>array()
		),
		'addPromotion'=>array(
			'request'=>array(
				'promotableId','type','value','startDate','endDate'
			),
			'response'=>array()
		),
		'addSecurityQuestion'=>array(
			'request'=>array('fr-content','nl-content'),
			'response'=>array()
		),
		'addOrder'=>array(
			'request'=>array('clientId','comment'),
			'response'=>array()
		),
		'deleteProduct'=>array(
			'request'=>array('productId'),
			'response'=>array()
		),
		'getClient'=>array(
			'request'=>array(
				'contactEmail',
				'firmName',
				'firmPhone',
				'contactGSM',
				'firmFax',
				'password'
			),
			'response'=>array()
		),
		'getClients'=>array(
			'request'=>array(),
			'response'=>array()
		),
		'getLanguages'=>array(
			'request'=>array(),
			'response'=>array()
		),
		'getOrderComments'=>array(
			'request'=>array(
				'orderId'
			),
			'response'=>array()
		),
		'getOrderLines'=>array(
			'request'=>array(
				'orderId',
				'languageCode'
			),
			'response'=>array()
		),
		'getOrders'=>array(
			'request'=>array(),
			'response'=>array()
		),
		'getOrdersByClient'=>array(
			'request'=>array('clientId'),
			'response'=>array()
		),
		'getProductGroups'=>array(
			'request'=>array('language'),
			'response'=>array()
		),
		'getProductToGroupLinks'=>array(
			'request'=>array('language'),
			'response'=>array()
		),
		'getProducts'=>array(
			'request'=>array('language'),
			'response'=>array()
		),
		'getPromotions'=>array(
			'request'=>array('language'),
			'response'=>array()
		),
		'getSecurityQuestions'=>array(
			'request'=>array('language'),
			'response'=>array()
		),
		'logClient'=>array(
			'request'=>array(
				'contactEmail',
				'firmName',
				'firmPhone',
				'contactGSM',
				'firmFax',
				'password'
			),
			'response'=>array()
		),
		'printOrder'=>array(
			'request'=>array(
				'orderId'
			),
			'response'=>array()
		),
		'removeProductFromGroup'=>array(
			'request'=>array(
				'productId',
				'productGroupId'
			),
			'response'=>array()
		),
		'sendOrderMail'=>array(
			'request'=>array(
				'orderId',
				'languageCode'
			),
			'response'=>array()
		),
		'stopPromotion'=>array(
			'request'=>array('promotionId','stopDate'),
			'response'=>array()	
		),
		'updateClient'=>array(
			'request'=>array(
				'clientId',
				'contactName',
				'contactFirstName',
				'contactGSM',
				'firmName',
				'firmPhone',
				'firmFax',
				'addressStreet',
				'addressNumber',
				'addressBox',
				'addressZipCode',
				'addressCity',
				'password',
				'registrationDate',
				'suspended'
			),
			'response'=>array()
		),
		'updateOrder'=>array(
			'request'=>array(
				'orderId',
				'confirmed',
				'delivered',
				'paid',
				'cancelled'
			),
			'response'=>array()
		),
		'updateProduct'=>array(
			'request'=>array(
				'productId',
				'fr-name',
				'fr-description',
				'nl-name',
				'nl-description',
				'active'
			),
			'response'=>array()
		),
		'updateProductPrice'=>array(
			'request'=>array(
				'productId',
				'newPrice'
			),
			'response'=>array()
		)
	);
	echo '<h2>'.$service.'</h2>';
	echo '<form action="'.$service.'.ws.php" method="post">';
	foreach($serviceFields[$service]['request'] as $field){
		echo '<div>';
			echo '<input type="text" name="'.$field.'" value="" placeholder="'.$field.'"/>';
		echo '</div>';
	}
	echo '<input type="submit" value="Go"/>';
	echo '</form>';
?>