angular.module('AD-viewTranslationFactory',[])
	.factory('ADViewTranslationFactory',function(GELanguageFactory){
		var factory={};
		var translationz={
			fr:{
				home:{},
				language:{
					changeRequestConfirmation:'Voulez-vous vraiment changer la langue?'
				},
				orderDetails:{
					cancel:'Annuler',
					confirm:'Confirmer',
					confirmCancelled:'Annulé',
					confirmDelivered:'Livré',
					confirmOrdered:'Commandé',
					confirmPaid:'Payé',
					orderNr:'N° Commande',
					orderContent:'Plats commandés',
					orderDate:'Date',
					orderDetailsTitle:'Détails de la commande',
					orderClient:'Client',
					orderFirm:'Société',
					OLProductName:'Produit',
					OLPrice:'Prix',
					OLReduction:'Réduction',
					OLQuantity:'Quantité',
					OLTotalPrice:'Total'
				},
				orders:{
					invalidOrderChoice:'Choix de commande non valide.',
					noClientSelected:'Aucun client n\'est sélectionné.',
					orderId:'ID',
					orderDate:'date',
					ordersAccessError:'Erreur interne.',
					orderClientNames:'Client',
					orderClientFirm:'Société',
					orderIsCancelled:'Annulé',
					orderIsConfirmed:'Confirmé',
					orderIsDelivered:'Livré',
					orderIsPaid:'Payé'
				},
				products:{
					noEditProductId:'Aucun produit n\'a été choisi.',
					productsAccessError:'Erreur interne.',
					productId:'ID',
					productName:'Nom',
					productDescription:'Description',
					productPrice:'Prix',
					productRegistrationDate:'Date d\'enr.',
					productActive:'Actif',
					sendProductEdition:'Envoyer',
					updatePrice:'Modifier le prix'
				},
				promotions:{
					back:'Retour',
					confirmPromo:'Wil u echt de nieuwe promotie toevoegen?',
					editPromoActiveProduct:'Prod.Actif',
					editPromoProductName:'Produit',
					editPromoProductDescr:'Description',
					editPromoProductPrice:'Prix',
					editPromoValue:'Promo',
					editPromoStartDate:'Début',
					editPromoEndDate:'Fin',
					editPromoStopDate:'Interruption',
					newPromotion:'Nouvelle promotion',
					newPromoEndtDate:'Fin',
					newPromoStartDate:'Début',
					newPromoValue:'Valeur',
					noEditPromo:'Aucune promotion sélectionnée.',
					promotionsAccessError:'Erreur interne.',
					productActive:'Prod.Actif',
					productName:'Produit',
					productPrice:'Prix',
					promotionValue:'Promotion',
					promotionStartDate:'Début',
					promotionEndDate:'Fin',
					promotionStopDate:'Arrêt',
					sendPromo:'Envoyer',
					stopPromo:'Arrêter',
					toPromoAdd:'Ajouter'
				},
				clients:{
					clientId:'ID',
					clientContactName:'Nom',
					clientContactFirstName:'Prénom',
					clientContactEmail:'Email',
					clientContactGSM:'GSM',
					clientCompanyName:'Société',
					clientCompanyPhone:'Tél. Société',
					clientCompanyFax:'Fax Société',
					clientActive:'Actif'
				}
			},
			nl:{
				home:{},
				language:{
					changeRequestConfirmation:'Wil u de taal van de website echt veranderen?'
				},
				orderDetails:{
					cancel:'Annuleren',
					confirm:'Bevestigen',
					confirmCancelled:'Geannuleerd',
					confirmDelivered:'Geleverd',
					confirmOrdered:'Besteld',
					confirmPaid:'Betaald',
					orderNr:'Bestelling Nr',
					orderContent:'Bestelde gerechten',
					orderDate:'Datum',
					orderDetailsTitle:'Bestellingsdetails',
					orderClient:'Klant',
					orderFirm:'Bedrijf',
					OLProductName:'Product',
					OLPrice:'Prijs',
					OLReduction:'Afkorting',
					OLQuantity:'Hoeveelheid',
					OLTotalPrice:'Totaal'
				},
				orders:{
					invalidOrderChoice:'Geen geldige bestelling gekozen',
					noClientSelected:'Geen geselecteerde klant.',
					orderId:'ID',
					orderDate:'datum',
					ordersAccessError:'Interne fout.',
					orderClientNames:'Klant',
					orderClientFirm:'Bedrijf',
					orderIsCancelled:'Geannuleerd',
					orderIsConfirmed:'Bevestigd',
					orderIsDelivered:'Geleverd',
					orderIsPaid:'Betaald'
				},
				products:{
					noEditProductId:'Er werd geen product gekozen.',
					productsAccessError:'Interne fout.',
					productId:'ID',
					productName:'Naam',
					productDescription:'Beschrijving',
					productPrice:'Prijs',
					productRegistrationDate:'Registratiedatum',
					productActive:'Actief',
					sendProductEdition:'Verzenden',
					updatePrice:'Prijs veranderen'
				},
				promotions:{
					back:'Terug',
					confirmPromo:'Wil u echt de nieuwe promotie toevoegen?',
					editPromoActiveProduct:'Actief product',
					editPromoProductName:'Product',
					editPromoProductDescr:'Beschrijving',
					editPromoProductPrice:'Productprijs',
					editPromoValue:'Promotie',
					editPromoStartDate:'Start',
					editPromoEndDate:'Eind',
					editPromoStopDate:'Stop',
					newPromotion:'Nieuwe promotie',
					newPromoEndDate:'Eind',
					newPromoStartDate:'Start',
					newPromoValue:'Waard',
					noEditPromo:'Geen geselecteerde promotie.',
					promotionsAccessError:'Interne fout.',
					productActive:'Prod.Actief',
					productName:'Product',
					productPrice:'Prijs',
					promotionValue:'Promotiewaard',
					promotionStartDate:'Start',
					promotionEndDate:'Eind',
					promotionStopDate:'Stop',
					sendPromo:'Verzenden',
					stopPromo:'Stoppen',
					toPromoAdd:'Toevoegen'
				},
				clients:{
					clientId:'ID',
					clientContactName:'Naam',
					clientContactFirstName:'Voornaam',
					clientContactEmail:'Email',
					clientContactGSM:'GSM',
					clientCompanyName:'Bedrijf',
					clientCompanyPhone:'Tel Bedrijf',
					clientCompanyFax:'Fax Bedrijf',
					clientActive:'Active'
				}
			}
		};
		factory.getTranslations=function(page){
			var lang=GELanguageFactory.getLanguage();
			var tranz=translationz[lang.code][page];
			if(typeof(tranz)!='undefined'){
//				alert('tranzlation='+JSON.stringify(tranz));
				return tranz;
			}
			return {};
		};
		return factory;
	})
;