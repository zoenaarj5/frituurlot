angular.module('AD-orderDetailsController',[], function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

})
	.controller('ADOrderDetailsController',function($window,$scope,ADViewTranslationFactory,GEMathFactory,GEOrderFactory){
		$scope.tranz=ADViewTranslationFactory.getTranslations('orderDetails');
		$scope.orderLinez=[];
		if(typeof(sessionStorage.currentOrder)=='undefined'){
			alert(tranz.noDetailsOrderId);
			$window.location.href='#/orders';
		}else{
			$scope.currentOrder=JSON.parse(sessionStorage.currentOrder);
			$scope.currentOrder.isConfirmed=$scope.currentOrder.order_confirmed==1;
			$scope.currentOrder.isDelivered=$scope.currentOrder.order_delivered==1;
			$scope.currentOrder.isPaid=$scope.currentOrder.order_paid==1;
			$scope.currentOrder.isCancelled=$scope.currentOrder.order_cancelled==1;
			GEOrderFactory.getOrderLines(
				$scope.currentOrder.order_id,
				function(data){
					var myData=data.data;
					if(typeof(myData)!='undefined'){
						$scope.orderLinez=myData;
						$scope.totalPrice=0;
						for(var i=0;i<$scope.orderLinez.length;i++){
							var totP=(
								parseFloat($scope.orderLinez[i].order_line_price)
									-parseFloat($scope.orderLinez[i].order_line_reduction)
							)*parseFloat($scope.orderLinez[i].order_line_quantity);
							$scope.orderLinez[i].total=GEMathFactory.roundNumber(
								totP,
								2
							);
							$scope.totalPrice+=totP;
						}
						$scope.totalPrice=parseFloat(GEMathFactory.roundNumber($scope.totalPrice,2));
					}
				},function(data){
					alert('Data access error.');
				}
			);
			$scope.updateOrder=function(){
				GEOrderFactory.updateOrder(
					$scope.currentOrder.order_id,
					{
						cancelled:$scope.currentOrder.isCancelled?1:0,
						paid:$scope.currentOrder.isPaid?1:0,
						confirmed:$scope.currentOrder.isConfirmed?1:0,
						delivered:$scope.currentOrder.isDelivered?1:0
					},
					function(data){
						alert('Order is updated.');
						$window.location.href='#/orders';
					},function(){
						alert('Order update error');
					}
				);
			};
			$scope.cancelOrder=function(){
				GEOrderFactory.updateOrder(
					$scope.currentOrder.order_id,
					{
						cancelled:1
					},
					function(data){
						alert('Order is cancelled.');
					},function(){
						alert('Order update error');
					}
				);
			};
		}
	});