angular.module('FE-myOrdersController',[],function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

})
	.controller('FEMyOrdersController',function($window,$scope,GEDateFactory,GELanguageFactory,GEMathFactory,GEOrderFactory,FEViewTranslationFactory){
		$scope.init=function(callBack){
			fetchLS('orders');
			$scope.tranz=FEViewTranslationFactory.getTranslations('myOrders');
			if(localStorage.lastSession){
				var ls=JSON.parse(localStorage.lastSession);
				GEOrderFactory.getOrdersByClient(ls.client_id,
					function(data){
						var myData=data.data;
						$scope.orderz=myData;
//						alert('orderz = '+JSON.stringify($scope.orderz));
//						var datz=[];
						for(var i=0;i<$scope.orderz.length;i++){
							var date=new Date(GEDateFactory.getCorrectDateString($scope.orderz[i].order_date)),
								year=''+date.getFullYear();
//								console.log('year for '+i+'='+year);
							var data={
								year:""+date.getFullYear(),
								month:""+(parseInt(date.getMonth())+1),
								date:""+date.getDate(),
								hour:""+date.getHours(),
								min:""+date.getMinutes(),
								sec:""+date.getSeconds()
							};
							data.month=parseInt(data.month)<10?"0"+parseInt(data.month)+1:data.month;
							data.date=parseInt(data.date)<10?"0"+data.date:data.date;
							data.hour=parseInt(data.hour)<10?"0"+data.hour:data.hour;
							data.min=parseInt(data.min)<10?"0"+data.min:data.min;
							data.sec=parseInt(data.sec)<10?"0"+data.sec:data.sec;
 							$scope.orderz[i].fDate=data.date+'/'+data.month+'/'+year.substr(year.length-2,2)+'';
							$scope.orderz[i].fTime=data.hour+':'+data.min+':'+data.sec+'';
							$scope.orderz[i].fDateTime=date;//$scope.orderz[i].fDate+' '+$scope.orderz[i].fTime+'';
//							console.log('$scope.orderz['+i+'].fDate = '+$scope.orderz[i].fDate);
//							console.log('$scope.orderz['+i+'].fTime = '+$scope.orderz[i].fTime);
//							console.log('$scope.orderz['+i+'].fDateTime = '+$scope.orderz[i].fDateTime);
/*							datz.push({
								fDate:$scope.orderz[i].fDate,
								fTime:$scope.orderz[i].fTime,
								fDateTime:$scope.orderz[i].fDateTime
							});*/

 /*							$scope.orderz[i].fDate=GEMathFactory.showDateY2(date);
							$scope.orderz[i].fTime=GEMathFactory.showTime(date);
							$scope.orderz[i].fDateTime=$scope.orderz[i].fDate+' '+$scope.orderz[i].fTime;*/
//							alert('fDate = '+$scope.orderz[i].fDate+',fTime = '+$scope.orderz[i].fTime+',fDateTime = '+$scope.orderz[i].fDateTime);
						}
//						alert('datz = '+JSON.stringify(datz));
						saveLS('orders');
						if(callBack instanceof Function){
							callBack();
						}
					},
					function(data){
						alert('data access error.');
					}
				);
			}else{
				if(confirm($scope.tranz.noSessionMessage)){
					$window.location.href='#/userLog';
				}else{
					$window.location.href='#/home';
				}
			}
		};
	    function fetchLS(dataListName){
	      $('body').addClass('busy');
	      if(typeof(localStorage[dataListName])=='undefined'){
	        localStorage[dataListName]=JSON.stringify([]);
	      }
	      switch(dataListName){
	        case 'orders':
	          $scope.orderz=JSON.parse(localStorage[dataListName]);
	    //      alert('DATA FETCHED. $scope.productGroupz = '+JSON.stringify($scope.orderz));
	          break;
	        case 'currentOrders':
	        	$scope.usedOrderLinez=JSON.parse(localStorage[dataListName]);
	        	var found=false;
	        	for(var i=0;i<$scope.usedOrderLinez.length;i++){
	        		if($scope.usedOrderLinez[i][0].order_id==sessionStorage.currentOrderId){
	        			$scope.usedOrderLinez[i]=$scope.orderLinez;
	        			found=true;
	        			break;
	        		}
	        	}
	        	if(!found){
	        		$scope.usedOrderLinez.push($scope.orderLinez);
	        	}
	        	break;
	      }
	      $('body').removeClass('busy');
	    }
	    function saveLS(dataListName,extra){
	      var toCopy=[];
	      switch(dataListName){
	        case 'orders':
	          toCopy=$scope.orderz;
	          break;
	        case 'currentOrders':
	          if(typeof(extra)!='undefined'){
	          	if(typeof(extra['orderId'])!='undefined'){
	          		if(typeof($scope.usedOrderLinez)!='undefined'){
	          			for(var i=0;i<$scope.usedOrderLinez.length;i++){
          					if($scope.usedOrderLinez[i][0].order_id==sessionStorage.currentOrderId){
          						$scope.usedOrderLinez[i]=$scope.orderLinez;
          						break;
	          				}
	          			}
	          		}else{
	          			$scope.usedOrderLinez=[$scope.orderLinez];
	          		}
         			toCopy=$scope.usedOrderLinez;
	          	}
	          }
	        default:
	          return;
	      }
	      if(typeof(toCopy)!='undefined'){
	        localStorage[dataListName]=JSON.stringify(toCopy);
	//        console.log('DATA SAVED. localStorage['+dataListName+'] = '+localStorage[dataListName]);
	      }
	    }
		function getOrder(orderId){
			for(var i=0;i<$scope.orderz.length;i++){
				if($scope.orderz[i].order_id==orderId){
				//	alert('eureka; order = '+JSON.stringify($scope.orderz[i]));
					return $scope.orderz[i];
				}
			}
			return null;
		}
		$scope.toMyOrderDetails=function(orderId){
	//		alert('orderId='+orderId);
			var order=getOrder(orderId);
			if(order!=null){
				sessionStorage.currentOrderId=orderId;
				$window.location.href='#/myOrderDetails';
			}
		};
		$scope.fetchCurrentOrderLines=function(){
			if(sessionStorage.currentOrderId){
				$scope.currentOrder=getOrder(sessionStorage.currentOrderId);
//				alert('currentOrder = '+JSON.stringify($scope.currentOrder.comments));
				GEOrderFactory.getOrderLines(sessionStorage.currentOrderId,
					function(data){
//						alert('data = '+JSON.stringify(data));
						var myData=data.data;
						if(''+parseInt(myData)==''+myData){
							alert('Order is empty or does not exist!');
							$window.location.href='#/myOrders';
						}
						if(typeof(myData)!='undefined'){
							if(myData.length<1){
								alert('Empty order!');
								$window.location.href='#/myOrders';
							}
							$scope.orderLinez=myData;
							$scope.orderLinesTotal=0;
							for(var i=0;i<$scope.orderLinez.length;i++){
								$scope.orderLinez[i].total=GEMathFactory.roundNumber(($scope.orderLinez[i].order_line_price-$scope.orderLinez[i].order_line_reduction)*$scope.orderLinez[i].order_line_quantity,2);
								$scope.orderLinesTotal+= parseFloat($scope.orderLinez[i].total);
//								alert('order lines total = '+$scope.orderLinesTotal);
							}
							$scope.orderLinesTotal=GEMathFactory.roundNumber($scope.orderLinesTotal,2);
//							alert('order lines total = '+$scope.orderLinesTotal);
							saveLS('currentOrders',{orderId:sessionStorage.currentOrderId});
						}else{
							alert('Order is empty or does not exist!');
							$window.location.href='#/myOrders';
						}
					},
					function(data){
						alert('Data access error.');
					}
				);
			}
		};
		$scope.printMyOrder=function(orderId){
//	    	alert('printing order');
	    	var ls=localStorage.lastSession;
	    	if(typeof(ls)!='undefined' && typeof(orderId) !='undefined'){
	    		ls=JSON.parse(ls);
		    	var lc=GELanguageFactory.getLanguage().code;
		    	var url='../fe/order2pdf.php?orderId='+orderId+'&language='+lc+'&clientId='+ls.client_id;
//		    	alert('url = '+url);
		      	window.open(url);
	    	}
      	};
	    $scope.printOrder=function(){
//	    	alert('printing order');
	    	var oi=sessionStorage.currentOrderId;
	    	var ls=localStorage.lastSession;
	    	if(typeof(ls)!='undefined' && typeof(oi) !='undefined'){
	    		ls=JSON.parse(ls);
		    	var lc=GELanguageFactory.getLanguage().code;
		    	var url='../fe/order2pdf.php?orderId='+oi+'&language='+lc+'&clientId='+ls.client_id;
//		    	alert('url = '+url);
		      	window.open(url);
	    	}
	    };
	    $scope.toMainPage=function(){
	    	$window.location.href='#/home';
	    };
	    $scope.toCardView=function(){
	      $window.location.href='#/cardView';
	    };
		$scope.toMyOrders=function(){
			$window.location.href='#/myOrders';
		};
	})
;