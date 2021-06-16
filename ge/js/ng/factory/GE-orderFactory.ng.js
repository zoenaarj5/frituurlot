angular.module('GE-orderFactory',[])
	.factory('GEOrderFactory',function($http,GEDataTransformerFactory,GELanguageFactory){
		var factory={};
		factory.getOrders=function(callBackSuccess,callBackError){
			var inputData={};
//			alert('inputData = '+JSON.stringify(inputData));
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform(inputData),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/getOrders.ws.php'
			})
			.success(function(data,status,headers,config){
//				alert('getOrders = success! data = '+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
//				alert('getOrders=error! data='+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			});
		};
		factory.getOrdersByClient=function(clientId,callBackSuccess,callBackError){
			var inputData={clientId:clientId};
//			alert('inputData = '+JSON.stringify(inputData));
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform(inputData),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/getOrdersByClient.ws.php'
			})
			.success(function(data,status,headers,config){
//				alert('getOrdersByClient = success! data = '+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
//				alert('getOrders=error! data='+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			});
		};
		factory.getOrderLines=function(orderId,callBackSuccess,callBackError){
			var lang=GELanguageFactory.getLanguage().code;
			var inputData={orderId:orderId,languageCode:lang};
//			alert('input data = '+JSON.stringify(inputData));
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform(inputData),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/getOrderLines.ws.php'
			})
			.success(function(data,status,headers,config){
//				alert('getOrderLines=success! data='+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
//				alert('getOrderLines=error! data='+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			});
		};
		factory.addOrder=function(clientId,comment,callBackSuccess,callBackError){
//			alert('getting order lines...');
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform({clientId:clientId,comment:comment}),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/addOrder.ws.php'
			})
			.success(function(data,status,headers,config){
	//			alert('getOrderLines=success! data='+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
//				alert('getOrderLines=error! data='+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			});
		};
		factory.addCommentToOrder=function(orderId,content,callBackSuccess,callBackError){
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform({orderId:orderId,content:content}),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/addOrderComment.ws.php'
			})
			.success(function(data,status,headers,config){
//				alert('sendOrderMail=success! data='+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
//				alert('sendOrderMail=error! data='+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			});
		}
		factory.sendOrderMail=function(orderId,callBackSuccess,callBackError){
			var lang=GELanguageFactory.getLanguage().code;
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform({orderId:orderId,languageCode:lang}),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/sendOrderMail.ws.php'
			})
			.success(function(data,status,headers,config){
//				alert('sendOrderMail=success! data='+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
//				alert('sendOrderMail=error! data='+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			});
		};
		factory.addOrderLine=function(orderId,productId,productPrice,reduction,quantity,callBackSuccess,callBackError){
	//		alert('orderId='+orderId+',productId='+productId+',productPrice='+productPrice+',reduction='+reduction+',quantity='+quantity);
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform({
					orderId:orderId,
					productId:productId,
					price:productPrice,
					reduction:reduction,
					quantity:quantity
				}),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/addOrderLine.ws.php'
			})
			.success(function(data,status,headers,config){
//				alert('addOrderLines=success! data='+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
//				alert('getOrderLines=error! data='+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			});
		};
		factory.printOrder=function(clientId,callBackSuccess,callBackError){
			if(typeof(localStorage.lastCart)=='undefined'){
				alert('No order found.');
				return;
			}
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform({
					clientId:clientId,
					orderLines:JSON.parse(localStorage.lastCart)
				}),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/printOrder.ws.php'
			})
			.success(function(data,status,headers,config){
//				alert('getOrderLines=success! data='+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
//				alert('getOrderLines=error! data='+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			});
		};
		factory.updateOrder=function(orderId,orderData,callBackSuccess,callBackError){
			var fields=['confirmed','paid','delivered','cancelled'];
			var inputData={orderId:orderId},size=0;
			for(var i=0;i<fields.length;i++){
				if(typeof(orderData[fields[i]])!='undefined'){
					inputData[fields[i]]=orderData[fields[i]];
					size++;
				}
			}
			if(size==0){
				alert('No data to change.');
				return;
			}
//			alert('inputData = '+JSON.stringify(inputData));
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform(inputData),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/updateOrder.ws.php'
			})
			.success(function(data,status,headers,config){
//				alert('updateOrder=success! data='+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
//				alert('updateOrderLines=error! data='+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			});
		};
		return factory;
	})
;