angular.module('FE-shopController',[], function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

})
	.controller('FEShopController',function($scope,$http,$window,GELanguageFactory,GEMathFactory,GEDataTransformerFactory,FEUserLogFactory,FEViewTranslationFactory,GEOrderFactory,GEProductFactory,GEPromotionFactory)
	{
    function fetchLS(dataListName){
      $('body').addClass('busy');
      if(typeof(localStorage[dataListName])=='undefined'){
        localStorage[dataListName]=JSON.stringify([]);
      }
      switch(dataListName){
        case 'productGroups':
          $scope.productGroupz=JSON.parse(localStorage[dataListName]);
//          console.log('DATA FETCHED. $scope.productGroupz = '+JSON.stringify($scope.productGroupz));
          break;
        case 'productToGroupLinks':
          $scope.ptgLinkz=JSON.parse(localStorage[dataListName]);
//          console.log('DATA FETCHED. $scope.ptgLinkz = '+JSON.stringify($scope.ptgLinkz));
          break;
        case 'promotions':
          $scope.promotions=JSON.parse(localStorage[dataListName]);
//          console.log('DATA FETCHED. $scope.promotions = '+JSON.stringify($scope.promotions));
          break;
        case 'orderLines':
          $scope.orderLines=JSON.parse(localStorage[dataListName]);
 //         console.log('DATA FETCHED. $scope.orderLines = '+JSON.stringify($scope.orderLines));
          break;
      }
      $('body').removeClass('busy');
    }
    function saveLS(dataListName){
      var toCopy=[];
      switch(dataListName){
        case 'productGroups':
          toCopy=$scope.productGroupz;
          break;
        case 'productToGroupLinks':
          toCopy=$scope.ptgLinkz;
          break;
        case 'promotions':
          toCopy=$scope.promotions;
          break;
        case 'orderLines':
          toCopy=$scope.orderLines;
          break;
        default:
          return;
      }
      if(typeof(toCopy)!='undefined'){
        localStorage[dataListName]=JSON.stringify(toCopy);
   //     console.log('DATA SAVED. localStorage['+dataListName+'] = '+localStorage[dataListName]);
      }
    }
    FEUserLogFactory.checkLog();
    var language=GELanguageFactory.getLanguage();
    $scope.tranz=FEViewTranslationFactory.getTranslations('shop',language.code);
    $scope.promotions=[];
//    $scope.productGroupz=[];
//    $scope.ptgLinkz=[];
    fetchLS('productToGroupLinks');
    GEProductFactory.getProductToGroupLinks(
      function(data){
        var myData=data.data;
//        alert('ptgLinks = '+JSON.stringify(myData));
        $scope.ptgLinkz=myData;
        saveLS('productToGroupLinks');
      },
      function(data){
        alert('Internal error.');
      }
    );
    fetchLS('productGroups');
    GEProductFactory.getProductGroups(
      function(data){
        var myData=data.data;
        $scope.productGroupz=myData;
        saveLS('productGroups');
//        alert('Product groups = '+JSON.stringify(myData));
        $scope.pdtGroupId=myData[0].product_group_id;
/*        $('#group_selector').val('3');
        alert('group selector value = '+$('#group_selector').val());*/
      },function(data){
        alert('internal error.');
      }
    );
//    alert('tranz='+JSON.stringify($scope.tranz));
    fetchLS('orderLines');
    GEProductFactory.getProducts(
      function(data){
//        alert('success! data='+JSON.stringify(data));
        var products=data['data'];
        $scope.orderLines=[];
        for(var i=0;i<products.length;i++){
          var line={product:products[i],nextQuantity:1,cartQuantity:0,totalLinePrice:0};
          $scope.orderLines.push(line);
        }
        var cart=[];
        if(localStorage.lastCart){
           cart=JSON.parse(localStorage.lastCart);
        }
  //        alert('locally stored cart = '+localStorage.lastCart);
        for(var i=0;i<$scope.orderLines.length;i++){
          for(var j=0;j<cart.length;j++){
            if(cart[j].productId==$scope.orderLines[i].product.product_id){
              $scope.orderLines[i].cartQuantity=cart[j].quantity;
            }
          }
        }
        $scope.addGroupsToOrderLines();
//        alert('about to set currentOL...');
        setCurrentOL();
        $scope.getPromotions(
          function(data){
            $scope.calculateTotals();
          }
        );
  //        alert('new order lines = '+JSON.stringify($scope.orderLines));
  //      alert('Order lines added: '+JSON.stringify($scope.orderLines));
      },
      function(data){
        console.log('error getting products!'+(typeof(data[0])=='undefined')?data:JSON.stringify(data));
      }
    );
    $scope.totalPrice=0;
    $scope.calculateTotals=function(){
//      alert('calculating totals...')
      $scope.totalPrice=0;
      for(var i=0;i<$scope.orderLines.length;i++){
          var tlp=($scope.orderLines[i].product.product_price-$scope.orderLines[i].redux)*$scope.orderLines[i].cartQuantity;
          $scope.orderLines[i].totalLinePrice=GEMathFactory.roundNumber(tlp,2);
          $scope.totalPrice+=tlp;
          $scope.orderLines[i].fullRedux=GEMathFactory.roundNumber($scope.orderLines[i].redux*$scope.orderLines[i].cartQuantity,2);
      }
      $scope.totalPrice=GEMathFactory.roundNumber($scope.totalPrice,2);
      $scope.saveCart();
      saveLS('orderLines');
    };
    $scope.toShop1By1=function(productId){
      sessionStorage.currentOLID=productId;
//      alert('going to shop1By1. CurrentOLID = '+sessionStorage.currentOLID);
      $window.location.href='#/shop1By1';
    };
    function setCurrentOL(){
      $('body').addClass('busy');
      $scope.currentOL=null;
      if(sessionStorage.currentOLID){
        for(var i=0;i<$scope.orderLines.length;i++){
          if(sessionStorage.currentOLID==$scope.orderLines[i].product.product_id){
            $scope.currentOL=$scope.orderLines[i];
    //        alert('currentOL = '+JSON.stringify($scope.currentOL));
            $scope.initSaucez($scope.currentOL);
            break;
          }
        }
      }
      $('body').removeClass('busy');
    }
    $scope.saveCart=function(){
//      alert('saving cart...');
      var cart=[];
      for(var i=0;i<$scope.orderLines.length;i++){
        if($scope.orderLines[i].cartQuantity>0){
          var cartLine={};
//          alert('cart quantity='+$scope.orderLines[i].cartQuantity+', cart product id='+$scope.orderLines[i].product.product_id);
          cartLine.productId=$scope.orderLines[i].product.product_id;
          cartLine.price=$scope.orderLines[i].product.product_price;
          cartLine.redux=$scope.orderLines[i].redux;
          cartLine.quantity=$scope.orderLines[i].cartQuantity;
          cartLine.total=($scope.orderLines[i].product.product_price-$scope.orderLines[i].redux)*$scope.orderLines[i].cartQuantity;
          cart.push(cartLine);
        }
      }
//      console.log('cart='+JSON.stringify(cart));
      localStorage.lastCart=JSON.stringify(cart);
    };
    $scope.printCart=function(clientId){
      if(typeof(localStorage.lastCart)!='undefined'){
        var cart=JSON.parse(localStorage.lastCart);
        var ls=FEUserLogFactory.getLastSession();
        if(typeof(cart)=='undefined'||typeof(ls)=='undefined'){
          return;
        }
  //      alert('ls.  clientId = '+ls.clientId);
        GEOrderFactory.printOrder(
          ls.client_id,
          function(data){
//            console.log('Order is printed. data = '+JSON.stringify([data]));
          },function(data){
            alert('Order print failed. data = '+JSON.stringify([data]));
          }
        );
      }
    };
    $scope.addSauce=function(sauce,quantity,minus){
      var m=typeof(minus)=='undefined'?0:parseInt(minus);
      sauce.quantity=parseInt(sauce.quantity)+quantity*((m==0)?1:-1);
      if(sauce.quantity<0){
        sauce.quantity=0;
      }
      sauce.totalPrice=parseFloat(sauce.product.product_price)*parseInt(sauce.quantity);
    };
    $scope.addToCart=function(orderLine){
 //     alert('adding to cart...');
      if(orderLine.nextQuantity>0){
          orderLine.cartQuantity+=orderLine.nextQuantity;
          orderLine.prevQuantity=orderLine.nextQuantity;
          orderLine.nextQuantity=1;
          $scope.calculateTotals();
      }
    };
    $scope.hasUsableQuantity=function(orderLine){
        return orderLine.cartQuantity>0;
    };
    $scope.initSaucez=function(orderLine){
//      alert('initSaucez. ptgLinkz = '+JSON.stringify($scope.ptgLinkz));
      if(typeof(orderLine.sauceAddz)=='undefined'){
        orderLine.sauceAddz=[];
      }
      for(var i=0;i<$scope.ptgLinkz.length;i++){
        if($scope.ptgLinkz[i].product_group_code=='SAU'){
          orderLine.sauceAddz.push({product:$scope.ptgLinkz[i],quantity:0,nextQuan:1,totalPrice:0});
//          orderLine.saucez.push({product:$scope.ptgLinkz[i],quantity:0});
        }
      }
//      alert('saucez = '+JSON.stringify(orderLine.sauceAddz)+' Length = '+$scope.ptgLinkz.length);
    };
    $scope.resetAllSaucez=function(orderLine){
      for(var i=0;i<orderLine.sauceAddz.length;i++){
        orderLine.sauceAddz[i].quantity=0;
        $scope.resetSauce(orderLine.sauceAddz[i]);
      }
    };
    $scope.resetSauce=function(sauce){
      sauce.quantity=0;
      sauce.nextQuan=1;
      sauce.totalPrice=0;
    };
/*    $scope.initSaucez=function(orderLine){
      alert('initSaucez. ptgLinkz = '+JSON.stringify($scope.ptgLinkz));
      if(typeof(orderLine.sauceAddz)=='undefined'){
        orderLine.sauceAddz={};
      }
      for(var i=0;i<$scope.ptgLinkz.length;i++){
        if($scope.ptgLinkz[i].product_group_code=='SAU'){
          orderLine.sauceAddz[$scope.ptgLinkz[i].product_id]={product:$scope.ptgLinkz[i],quantity:0};
//          orderLine.saucez.push({product:$scope.ptgLinkz[i],quantity:0});
        }
      }
      alert('saucez = '+JSON.stringify(orderLine.sauceAddz)+' Length = '+$scope.ptgLinkz.length);
    };*/
    function resetOrderLine(orderLine){
        orderLine.cartQuantity=0;
        orderLine.nextQuantity=1;
        $scope.resetPrevQuantity(orderLine);
    };
    $scope.subtractFromCart=function(orderLine){
//      alert("subtracting...");
      if(orderLine.nextQuantity && orderLine.nextQuantity<=orderLine.cartQuantity){
          orderLine.cartQuantity-=orderLine.nextQuantity;
          orderLine.prevQuantity=-orderLine.nextQuantity;
          orderLine.nextQuantity=1;
          $scope.calculateTotals();
 //         alert('...subtracted.');
      }
    };
    $scope.resetCartQuantity=function(orderLine){
        orderLine.cartQuantity=0;
        $scope.resetPrevQuantity(orderLine);
        $scope.calculateTotals();
    };
    $scope.resetPrevQuantity=function(orderLine){
      orderLine.prevQuantity=0;
    };
    $scope.resetSearchCrit=function(){
      $scope.searchCrit='';
    };
    $scope.undoAddToCart=function(orderLine){
      if(orderLine.prevQuantity){
        orderLine.cartQuantity-=orderLine.prevQuantity;
        orderLine.nextQuantity=Math.abs(orderLine.prevQuantity);
        orderLine.prevQuantity=0;
        $scope.calculateTotals();
      }
    };
    $scope.resetCart=function(confirmation){
      var conf=(typeof(confirmation)=='undefined')?false:confirmation;
      if(!conf || (conf && confirm($scope.tranz.confirmEmptyOrder))){
        for(var i=0;i<$scope.orderLines.length;i++){
            resetOrderLine($scope.orderLines[i]);
        }
      }
      $scope.calculateTotals();
    };
    $scope.cartIsEmpty=function(){
      for(var i=0;i<$scope.orderLines.length;i++){
        if($scope.orderLines[i].cartQuantity>0){
          return false;
        }
      }
      return true;
    };
    $scope.sendCart=function(){
      if($scope.cartIsEmpty()){
        alert($scope.tranz.emptyCartMessage);
      }else{
        if(confirm($scope.tranz.confirmSendOrder)){
          $scope.toBeSent=[];
          for(var i=0;i<$scope.orderLines.length;i++){
            if($scope.orderLines[i].cartQuantity>0){
              $scope.toBeSent.push($scope.orderLines[i]);
            }
          }
  //      alert('order to be sent='+JSON.stringify($scope.toBeSent));
          var ls=FEUserLogFactory.getLastSession();
          if(typeof(ls)=='undefined'){
            if(confirm($scope.tranz.noSession)){
              $window.location.href='#/userLog';
            }else{
              $window.location.href='#/home';
            }

          }else{
   //         alert('ls='+JSON.stringify(ls));
            $('body').addClass('busy');
            GEOrderFactory.addOrder(ls.client_id,$scope.cartComment,function(data){2
                var ola=0;
                var myData=data.data;
//                alert('ORDER ADD = SUCCESS. myData='+JSON.stringify(myData));
                if(''+parseInt(myData)==myData && parseInt(myData)!=0){
                  alert('Internal error. Please retry or contact the website administrator.');
                }else{
            //      alert('Data OK.'+JSON.stringify(myData));
                  var orderId=myData.order_id;
                  var orderAdding=function(i){
  //                    console.log('to be sent ['+i+'] = '+JSON.stringify($scope.toBeSent[i]));
                      var productId=$scope.toBeSent[i].product.product_id,
                        productPrice=$scope.toBeSent[i].product.product_price,
                        quantity=$scope.toBeSent[i].cartQuantity,
                        reduction=$scope.toBeSent[i].redux;
              //        alert('orderId='+orderId+',productId='+productId+',productPrice='+productPrice+',cartQuantity='+quantity);
                      GEOrderFactory.addOrderLine(orderId,productId,productPrice,reduction,quantity,
                        function(data){
  //                         console.log('SUCCESS. data='+JSON.stringify(data));
                            ola++;
                          if(++i<$scope.toBeSent.length){
   //                         console.log('ORDER LINE ADDING PROCESS GOES ON. ola='+ola);
                            orderAdding(i);
                          }else{
                            GEOrderFactory.sendOrderMail(orderId,
                              function(data){
//                                console.log('Sending mail: result = OK. data = '+JSON.stringify(data));
                              },function(data){
                                console.log('Sending mail: result = NOK. data = '+JSON.stringify(data));
                              }
                            )
  //                          alert('tranz='+JSON.stringify($scope.tranz));
                            $('body').removeClass('busy');
                            alert($scope.tranz.orderSent);
                            sessionStorage.orderCart=JSON.stringify($scope.toBeSent);
                            $scope.resetCart();
                            $window.location.href='#/cardView';
                          }
                        },
                        function(data){
                          console.log('ERROR. data='+JSON.stringify(data));
                        }
                      );
                  };
                  orderAdding(0);
                }
//                alert('order lines added='+ola);
              },function(data){
                alert('ERROR adding orders.');
              }
            );
          }
        }
      }
    };
    $scope.isValidOrderLine=function(orderLine){
      return orderLine.cartQuantity>0;
    };
    $scope.viewCart=function(element,showTimeout,hideTimeout){
      var obj=$('#'+element);
      if(obj.is(':visible')){
        $('#'+element).hide(hideTimeout);
        $('.'+element+'-shower').show();
        $('.'+element+'-hider').hide();
      }else{
        $('#'+element).show(showTimeout);
        $('.'+element+'-shower').hide();
        $('.'+element+'-hider').show();
      }
//      window.location.href='#/cartConfirm';
    };
    $scope.getProductGroup=function(productGroupId){
      for(var i=0;i<$scope.productGroupz.length;i++){
        if($scope.productGroupz[i].product_group_id==productGroupId){
          return $scope.productGroupz[i];
        }
      }
      return null;
    };
    $scope.getPromotions=function(callBack){
//      alert('getting promotions...');
      fetchLS('promotions');
      GEPromotionFactory.getPromotions(
          function(data){
   //         alert('after getting promotions: data='+JSON.stringify(data));
            if(''+parseInt(data)==''+data && parseInt(data)!=0){
    //          alert('promotions data is integer.');
              $scope.promotions=[];
            }else{
    //          alert('promotions data is not integer.');
              $scope.promotions=data;
              saveLS('promotions');
    //          alert('$scope.promotions = '+JSON.stringify($scope.promotions));
              $scope.addPromotionsToOrderLines();
              $scope.calculateTotals();
              if(callBack instanceof Function){
                callBack();
              }
            }
          },
          function(data){
            alert('ERROR getting promotions.');
          }
      );
    };
    $scope.addPromotionsToOrderLines=function(){
      var reduced=[];
      for(var i=0;i<$scope.orderLines.length;i++){
        $scope.orderLines[i].redux=0;
  //      alert('$scope.orderLines['+i+'].redux = '+$scope.orderLines[i].redux);
        for(var j=0;j<$scope.promotions.length;j++){
          if(reduced.indexOf($scope.promotions[j].product_id)==-1 && $scope.orderLines[i].product.product_id==$scope.promotions[j].product_id){
            switch($scope.promotions[j].promotion_type){
              case 'PC':
  //              alert('PC!');
                $scope.orderLines[i].redux=parseFloat($scope.orderLines[i].product.product_price*$scope.promotions[j].promotion_value/100);
                break;
              case 'MI':
  //              alert('MI!');
                $scope.orderLines[i].redux=$scope.promotions[j].promotion_value;
                break;
            }
            reduced.push($scope.orderLines[i].product.product_id);
            break;
          }
        }
        $scope.orderLines[i].fullRedux=GEMathFactory.roundNumber($scope.orderLines[i].redux*$scope.orderLines[i].cartQuantity,2);
      }
//      alert('reduced='+JSON.stringify(reduced));
    //  alert('orderLines='+JSON.stringify($scope.orderLines));
    };
    $scope.addGroupsToOrderLines=function(){
      for(var i=0;i<$scope.orderLines.length;i++){
        $scope.orderLines[i].groups=[];
        for(var j=0;j<$scope.ptgLinkz.length;j++){
          if($scope.ptgLinkz[j].product_id==$scope.orderLines[i].product.product_id){
            $scope.orderLines[i].groups.push($scope.ptgLinkz[j].product_group_code);
          }
        }
//        console.log('For product '+$scope.orderLines[i].product.s_translation_name+', groups = '+JSON.stringify($scope.orderLines[i].groups));
      }
    };
    $scope.toggleDescriptions=function(){
      $('.prod-descr-box').toggle('slow');
    };
    $scope.toShop=function(){
      $window.location.href='#/shop';
    };
    $scope.toCard=function(){
      $window.location.href='#/card';
    };
    $scope.toCardView=function(){
      $window.location.href='#/cardView';
    };
    $scope.toMyOrders=function(){
      $window.location.href='#/myOrders';
    };
    $scope.accordionMove=function(productGroupCode){
      $('.product-list>table').hide();
      $('#product-list-'+productGroupCode+'>table').show(1000
        );
    };
    $scope.initAccordion=function(){
/*      $('.product-list>table').hide();
      $('.product-list:first-child>table').hide();*/
      $('#product-list-DRI>h3:first-child').trigger('click');
    };
	}
);