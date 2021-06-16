angular.module('FE-menuFactory',[])
	.factory('FEMenuFactory',function(GELanguageFactory){
		var factory={};
		var menuItemz={
			'fr':[
				{text:'Accueil',page:'home'},
				{text:'Carte',page:'cardView'},
				{text:'Galerie',page:'gallery'},
//				{text:'Commander',page:'shop'},
//				{text:'Mes commandes',page:'myOrders'},
//				{text:'S\'inscrire',page:'registration'},
//				{text:'Promotions',page:'promotionAdverts'},
				{text:'Contact',page:'contact'}
			],
			'nl':[
				{text:'Start',page:'home'},
				{text:'Kaart',page:'cardView'},
				{text:'Galerij',page:'gallery'},
//				{text:'Bestellen',page:'shop'},
//				{text:'Mijn bestellingen',page:'myOrders'},
//				{text:'Registreren',page:'registration'},
//				{text:'Promoties',page:'promotionAdverts'},
				{text:'Contact',page:'contactBis'}
			]
		};
		factory.getMenuItems=function(){
			var lang=GELanguageFactory.getLanguage();
			var itz=menuItemz[lang.code];
			if(typeof(itz)!='undefined'){
				return itz;
			}
			return {};
		};
		return factory;
	})
;