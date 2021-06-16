angular.module('FE-contactController',[])
	.controller('FEContactController',function($scope,GELanguageFactory,FEViewTranslationFactory,FEUserLogFactory)
	{
		FEUserLogFactory.checkLog();
		var messages={
			'fr':[
//				{id:1,title:'Tél',content:'0493327542 / 0489044800'},
//				{id:2,title:'Fax',content:'02/3109717'},
//				{id:5,title:'Email',content:'immocelia2019@gmail.com'},
//				{id:3,title:'Livraison gratuite',content:'Pour les habitants de Lot'},
				{id:4,title:'Promos',content:'Commandes pour usines'}
			],
			'nl':[
//				{id:1,title:'Telefoon',content:'0493327542 / 0489044800'},
//				{id:2,title:'Fax',content:'02/3109717'},
//				{id:5,title:'Email',content:'immocelia2019@gmail.com'},
//				{id:3,title:'Gratis levering',content:'Voor Lot inwoners'},
				{id:4,title:'Promoties',content:'Bestellingen voor fabrieken'}
			]
		};
		var lflc=GELanguageFactory.getLanguage().code;
		$scope.messages=messages[lflc];
		var language=GELanguageFactory.getLanguage();
	    $scope.tranz=FEViewTranslationFactory.getTranslations('contact',language.code);
//		alert('$scope.messages = '+JSON.stringify($scope.messages));
/*		window.setInterval(
			function(){
				var id='contact-data-box-bis';
				$('#'+id+' > div:first-child').appendTo($('#'+id));
			},5000
		);*/
/*		function showError(error)
		{
			switch(error.code) 
			{
				case error.PERMISSION_DENIED:
					geo.innerHTML = "User denied the request for Geolocation."
					break;
				case error.POSITION_UNAVAILABLE:
					geo.innerHTML = "Location information is unavailable."
					break;
				case error.TIMEOUT:
					geo.innerHTML = "The request to get user location timed out."
					break;
				case error.UNKNOWN_ERROR:
					geo.innerHTML = "An unknown error occurred."
					break;
			}
		}
		$scope.shop={
			name:'FRITUUR',
			position:{latitude:'50.764090',longitude:'4.275984'}
		};
		$scope.bounds=new google.maps.LatLngBounds();
		var cooTar=new google.maps.LatLng($scope.shop.position.latitude,$scope.shop.position.longitude);
		$scope.bounds.extend(cooTar);
		//		alert('cooTar='+JSON.stringify(cooTar));
		var options = {
		//	zoom: 10,
			center: cooTar,
			mapTypeControl: false,
			navigationControlOptions: {
				style: google.maps.NavigationControlStyle.SMALL
			},
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		$scope.map = new google.maps.Map(document.getElementById("geo-bis"), options);
		$scope.map.fitBounds($scope.bounds);
//				alert('mapOptions='+JSON.encode($scope.map.options));
		var targetIcon=new google.maps.MarkerImage(
//			'img/snack.png',
			'img/snack_bis.png',
//			'img/snack_time-35-128.png',
			null,null,null,
			new google.maps.Size(55,55)
		);
		$scope.targetMarker = new google.maps.Marker({
		  position: cooTar,
		  map: $scope.map,
		  title:$scope.shop.name,
		  icon:targetIcon,
		  size:new google.maps.Size(240,240),
		  origin:new google.maps.Point(0,0)
		});
		if (navigator.geolocation)
		{
		//	alert('geolocation=ok!');
			navigator.geolocation.getCurrentPosition(
				function(position){
//							alert('position='+JSON.stringify(position));
			//				alert('latitude='+position.coords.latitude+', longitude='+position.coords.longitude);
					var cooUser=new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			//				alert('cooUser='+JSON.stringify(cooUser));
					var userIcon=new google.maps.MarkerImage(
						'img/me.png',
						null,null,null,
						new google.maps.Size(55,55)
					);
					$scope.userMarker=new google.maps.Marker({
						position:cooUser,
						icon:userIcon,
						map:$scope.map,
						title:'You are here.'
					});
					var cooCen=new google.maps.LatLng(
						($scope.userMarker.position.k+$scope.targetMarker.position.k)/2,
						($scope.userMarker.position.A+$scope.targetMarker.position.A)/2
					);
					$scope.bounds.extend(cooCen);
					//		alert('cooCen='+JSON.stringify(cooCen));
					
					var emptyIcon=new google.maps.MarkerImage(
						'img/empty.png',
//						map:$scope.map,
						null,null,null,
						new google.maps.Size(10,10)
					);
					var fullGreenIcon=new google.maps.MarkerImage(
						'img/full-empty.png',
						null,null,null,
						new google.maps.Size(10,10)
					);
					$scope.centerMarker=new google.maps.Marker({
						position:cooCen,
						title:'HALFWAY',
						icon:fullGreenIcon
					});
					$scope.map.setCenter(cooCen);
					var dlat=$scope.targetMarker.position.k-$scope.userMarker.position.k,
						dlon=$scope.targetMarker.position.A-$scope.userMarker.position.A;
					var dmax=(dlat>dlon/2)?dlat:dlon;

					var cooXtmOne=new google.maps.LatLng($scope.targetMarker.position.k+dlat/4,
						$scope.targetMarker.position.A+dlon/4
					);
					var cooXtmTwo=new google.maps.LatLng($scope.userMarker.position.k-dlat/4,
						$scope.userMarker.position.A-dlon/4
					);
					$scope.bounds.extend(cooXtmOne);
					$scope.bounds.extend(cooXtmTwo);
					$scope.map.fitBounds($scope.bounds);
					$scope.extremeMarkerOne=new google.maps.Marker({
						position:cooXtmOne,
						map:$scope.map,
						icon:emptyIcon,
						title:'XTM One'
					});
					$scope.extremeMarkerTwo=new google.maps.Marker({
						position:cooXtmTwo,
						map:$scope.map,
						icon:emptyIcon,
						title:'XTM Two'
					});
				},
				showError
			);
		}
		else{
			alert("Geolocation is not supported by this browser.");
  		}*/
	}
);