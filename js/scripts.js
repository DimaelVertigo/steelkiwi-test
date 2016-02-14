$(document).ready(function(){

	/*=======================================
	=            FEATURES SLIDER            =
	=======================================*/
	$(".owl-carousel").owlCarousel();

	
	/*==========================================
	=            Tabs and accordion            =
	==========================================*/
	var mq = window.matchMedia('(min-width: 767px)');
	if (mq.matches) {
		$('.partners__content').append($('.partners-list'));
		$('.partners-list').eq(0).addClass('active')
		$('.partners-tabs__item').eq(0).addClass('active')
		
		$('.partners-tabs__item').on('click', function() {
			var tabIndex = $(this).index();
			$('.partners-list').eq(tabIndex).fadeIn();
			$('.partners-list').eq(tabIndex).siblings('.partners-list').hide();
			$(this).addClass('active').siblings('.partners-tabs__item').removeClass('active')
		});
	} else {
			$('.partners-tabs__item').on('click', function() {
				var tabIndex = $(this).index();
				$(this).toggleClass('active').siblings('.partners-tabs__item').removeClass('active');
				$(this).find('.partners-list').toggleClass('active');
				$(this).siblings('.partners-tabs__item').find('.partners-list').removeClass('active');
			});
	};

});