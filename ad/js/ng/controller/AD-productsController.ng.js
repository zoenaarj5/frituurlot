angular.module('AD-productsController',[], function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

})
	.controller('ADProductsController',function($window,$scope,GEProductFactory,ADViewTranslationFactory){
		$scope.init=function(callBack){
			$scope.tranz=ADViewTranslationFactory.getTranslations('products');
			$scope.productz=[];
			$scope.editProduct=null;
			GEProductFactory.getProducts(
				function(data){
					var myData=data.data;
					if(myData){
						$scope.productz=myData;
						for(var i=0;i<$scope.productz.length;i++){
							finalizeProduct($scope.productz[i]);
						}
					}
					if(callBack instanceof Function){
						callBack();
					}
				},
				function(data){
					alert($scope.tranz.productsAccessError);
				}
			);
		};
		$scope.sendProductEdition=function(){
			alert('sending product\'s new data...');
			var toSend=
			{
				name:$scope.editProduct.s_translation_name,
				description:$scope.editProduct.s_translation_description,
				active:$scope.editProduct.product_active
			};
//			alert('data to send = '+JSON.stringify(toSend));
			GEProductFactory.updateProduct(
				$scope.editProduct.product_id,
				toSend,
				function(data){
					var myData=data.data;
					if(typeof(myData!='undefined')){
						alert('product edit = ok. myData = '+JSON.stringify(myData));
					}else{
						alert('Data access error.');
					}
				},function(data){
					alert('Data access error.');
				}
			);
		};
		$scope.getProductById=function(productId){
			for(var i=0;i<$scope.productz.length;i++){
				if($scope.productz[i].product_id==productId){
					return $scope.productz[i];
				}
			}
			return null;
		};
		$scope.fetchEditProduct=function(){
			$scope.init(
				function(){
					if(typeof(sessionStorage.editProductId)!='undefined'){
						$scope.editProduct=$scope.getProductById(sessionStorage.editProductId);
//						alert('Edit product = '+JSON.stringify($scope.editProduct));
					}
				}
			);
		};
		$scope.setEditProduct=function(productId){
			for(var i=0;i<$scope.productz.length;i++){
				if($scope.productz[i].product_id==productId){
					$scope.editProduct=$scope.productz[i];
					sessionStorage.editProductId=$scope.productz[i].product_id;
					return true;
				}
			}
			return false;
		};
		$scope.optz=[{value:'0',img:'no'},{value:'1',img:'yes'}];
		$scope.toProductEdit=function(productId){
			if($scope.setEditProduct(productId)){
//				alert('product to edit = '+JSON.stringify($scope.editProduct));
				$window.location.href='#/productEdit';
			}else{
				alert(tranz.noEditProductId);
			}
		};
		//$scope.fetchEditProduct();
		function finalizeProduct(product){
			product.activeImg=product.product_active==0?'no':'yes';
		}
	})
;