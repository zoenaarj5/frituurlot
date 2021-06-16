angular.module('AD-clientsController',[], function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

})
	.controller('ADClientsController',function($window,$scope,ADViewTranslationFactory,GEClientFactory){
		$scope.tranz=ADViewTranslationFactory.getTranslations('clients');
		$scope.clientz=[];
		GEClientFactory.getClients(
			function(data){
				var myData=data.data;
//				alert('data = '+JSON.stringify(data));
				if(typeof(myData)!='undefined'){
					$scope.clientz=myData;
					for(var i=0;i<$scope.clientz.length;i++){
						finalizeClient($scope.clientz[i]);
					}
				}else{
					alert($scope.tranz.clientsAccessError);
				}
			}
		);
		$scope.toOrders=function(clientId){
			sessionStorage.ordersClientId=clientId;
			$window.location.href='#/orders';
		};
		function finalizeClient(client){
			client.activeImg=client.client_suspended==0?'yes':'no';
		}
	})
;