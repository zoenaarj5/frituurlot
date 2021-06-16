$(document).ready(
	function(){
		var delay=10000;
		window.setInterval(
			function(){
				var container=$("#sldImgCont");
				var content=$("#sldImgCont>.sldImgElt");
				content.first().appendTo(container);
			},delay
		);
		window.setInterval(
			function(){
				$(".advert-pic-cont").each(function(){
					var id=$(this).attr("id");
				//	alert("hey! $(this).attr(\"id\") = "+$(this).attr("id"));
					$("#"+id+">img:first-child").appendTo($("#"+id));
				})
			},4000
		);
		$(".photo-gallery-block-title").click(function(){
//			alert('click!');
			$(".photo-gallery-block-cont").hide();
			$(this).next(".photo-gallery-block-cont").toggle("slow");
		});
	}
);