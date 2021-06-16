angular.module("FE-photoGalleryController",[])
	.controller("FEPhotoGalleryController",function($scope,$window,FEViewTranslationFactory,GEPhotoGalleryFactory){
		var PAGE_NAME="gallery";
		$scope.tranz=FEViewTranslationFactory.getTranslations(PAGE_NAME);
		GEPhotoGalleryFactory.getGalleryPics(
			function(data){
				$scope.photoBlokz=data;
			},function(data){
				alert("Internal error.");
			}
		);
		$scope.tranz=
		$scope.moveAccordion=function(elementId){
			$(".photo-gallery-block-cont").hide();
			$("#photo-gallery-block-cont-"+elementId).show("slow");
		};
		$scope.focusOnImage=function(pictureName){
			if($("#gallery-block-image-"+pictureName).hasClass("focus-gallery-image")){
//				alert("removing class...");
				$("#gallery-block-image-"+pictureName).removeClass("focus-gallery-image");
			}else{
				$(".gallery-block-image").removeClass("focus-gallery-image");
//				alert("adding class...");
				$("#gallery-block-image-"+pictureName).prependTo($("#gallery-block-image-"+pictureName).parent())
				.addClass("focus-gallery-image");
			}
		};
	});