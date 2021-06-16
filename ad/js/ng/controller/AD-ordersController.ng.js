angular.module('AD-ordersController',[], function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

})
	.controller('ADOrdersController',function($window,$scope,GEOrderFactory,ADViewTranslationFactory){
		$scope.init=function(callBack){
//			console.log('init...');
			$scope.tranz=ADViewTranslationFactory.getTranslations('orders');
			$scope.orderz=[];
			if(callBack instanceof Function){
				callBack();
			}
		};
		$scope.initOrders=function(){
//			console.log('initOrders...');
			GEOrderFactory.getOrders(
				function(data){
					var myData=data.data;
//					console.log('myData = '+JSON.stringify(myData));
					if(typeof(myData)!='undefined'){
					 	$scope.orderz=myData;
//					 	alert('orderz = '+JSON.stringify($scope.orderz));
					 	for(var i=0;i<$scope.orderz.length;i++){
					 		$scope.fixOrder($scope.orderz[i]);
					 	}
//					 	console.log('orderz = '+JSON.stringify($scope.orderz));
					}
				},
				function(data){
					alert($scope.tranz.ordersAccessError+'DATA = '+JSON.stringify(data));
				}
			);
		}
		$scope.initOrdersByClient=function(){
//			console.log('initOrdersByClient...');
			if(typeof(sessionStorage.ordersClientId)=='undefined'){
				alert($scope.tranz.noClientSelected);
			}
			$scope.ordersClientId=sessionStorage.ordersClientId;
			GEOrderFactory.getOrdersByClient(
				$scope.ordersClientId,
				function(data){
					var myData=data.data;
//					console.log('myData = '+JSON.stringify(myData));
					if(typeof(myData)!='undefined'){
					 	$scope.orderz=myData;
					 	$scope.orderz=myData;
//					 	alert('orderz = '+JSON.stringify($scope.orderz));
					 	for(var i=0;i<$scope.orderz.length;i++){
					 		$scope.fixOrder($scope.orderz[i]);
					 	}
//					 	console.log('orderz = '+JSON.stringify($scope.orderz));
					}
				},
				function(data){
					alert($scope.tranz.ordersAccessError+'DATA = '+JSON.stringify(data));
				}
			);
		};
		$scope.getOrder=function(orderId){
			for(var i=0;i<$scope.orderz.length;i++){
				if($scope.orderz[i].order_id==orderId){
					return $scope.orderz[i];
				}
			}
			return null;
		};
		$scope.toOrderDetails=function(orderId){
//			sessionStorage.detailsOrderId=orderId;
			var order=$scope.getOrder(orderId);
			if(order!=null){
				sessionStorage.currentOrder=JSON.stringify(order);
				$window.location.href='#/orderDetails';
			}else{
				alert($scope.tranz.invalidOrderChoice);
			}
		};
		$scope.fixOrder=function(order){
			var date=new Date(order.order_date);
			order.fDate=''+date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
			order.fTime=''+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
//			alert('date & time = '+order.fDate+', '+order.fTime);
		}
	})
;