var hasClass, addClass, removeClass;

function classReg( className ) {
	'use strict';
	return new RegExp('(^|\\s+)' + className + '(\\s+|$)');
}

function toggleClass( elem, c ) {
	'use strict';
	var fn = hasClass( elem, c ) ? removeClass : addClass;
	fn( elem, c );
}

$(document).ready(function ($) {
	'use strict';
	if(typeof $ !== 'undefined'){
		$(function() {
			// make the homepage slideshow
			if ($('.gallery').length > 0){
				var gallery = $('.gallery');
				gallery.responsiveSlides({
			        auto: true,
			        pager: true,
			        nav: false,
			        fade: 500,
			        maxwidth: 3000,
			        random: true
				});
				//control font-size in slideshow image caption
				if(($('.gallery .caption').length > 0) && (typeof $.fn.flowtype !== 'undefined')){
					$('.gallery .caption span').flowtype({
						minFont : 8,
						maxFont : 19,
						fontRatio : 20
					});
					//$( ".rslides_tabs" ).appendTo( ".caption" );
				}
			}
			//control font-size in highlight image caption
			if(($('.highlight .caption').length > 0) && (typeof $.fn.flowtype !== 'undefined')){
				$('.highlight .caption span').flowtype({
					minFont : 8,
					maxFont : 12,
					fontRatio : 15
				});
			}
			//control font-size in footer elements
			if(($('footer .element').length > 0) && (typeof $.fn.flowtype !== 'undefined')){
				$('footer .element').flowtype({
					minFont : 8,
					maxFont : 12,
					fontRatio : 16
				});
			}
			//control font-size in left-col caption
			if(($('.left-col .caption').length > 0) && (typeof $.fn.flowtype !== 'undefined')){
				$('.left-col .caption').flowtype({
					minFont : 8,
					maxFont : 12,
					fontRatio : 20
				});
			}
			//control font-size in left-col lists
			if(($('.left-col li').length > 0) && (typeof $.fn.flowtype !== 'undefined')){
				$('.left-col li').flowtype({
					minFont : 8,
					maxFont : 14,
					fontRatio : 20
				});
			}
			//make sticky nav
			//$('#sticky').sticky({topSpacing:0});
			 /**
			 * The nav stuff
			 */
		 
			// classList support for class management
			// altho to be fair, the api sucks because it won't accept multiple classes at once		
			if ( 'classList' in document.documentElement ) {
			  hasClass = function( elem, c ) {
			    return elem.classList.contains( c );
			  };
			  addClass = function( elem, c ) {
			    elem.classList.add( c );
			  };
			  removeClass = function( elem, c ) {
			    elem.classList.remove( c );
			  };
			}
			else {
			  hasClass = function( elem, c ) {
			    return classReg( c ).test( elem.className );
			  };
			  addClass = function( elem, c ) {
			    if ( !hasClass( elem, c ) ) {
			      elem.className = elem.className + ' ' + c;
			    }
			  };
			  removeClass = function( elem, c ) {
			    elem.className = elem.className.replace( classReg( c ), ' ' );
			  };
			}
			
			var classie = {
			  // full names
			  hasClass: hasClass,
			  addClass: addClass,
			  removeClass: removeClass,
			  toggleClass: toggleClass,
			  // short names
			  has: hasClass,
			  add: addClass,
			  remove: removeClass,
			  toggle: toggleClass
			};
			
			// transport
			//if ( typeof define === 'function' && define.amd ) {
			  // AMD
			//  define( classie );
			//} else {
			  // browser global
			  window.classie = classie;
			//}
	
	 
		 
			var body = document.body,
				mask = document.createElement('div'),
				togglePushTop = document.querySelector( '.toggle-push-top' ),
				toggleSlideBottom = document.querySelector( '.toggle-slide-bottom' ),
				slideMenuTop = document.querySelector( '.slide-push-top' ),
				slideMenuBottom = document.querySelector( '.slide-menu-bottom' ),
				activeNav
			;
			mask.className = 'mask';
		
			/* slide menu top */
			if(togglePushTop){
				togglePushTop.addEventListener( 'click', function(){
					classie.add( body, 'pmt-open' );
					$('main#wrapper').animate({
					    marginTop: '263',
					  }, 500, function() {
					    // Animation complete.
					  });
					document.body.appendChild(mask);
					activeNav = 'pmt-open';
				} );
			}
			
			if(toggleSlideBottom){
			/* slide menu bottom */
				toggleSlideBottom.addEventListener( 'click', function(){
					classie.add( body, 'smb-open' );
					document.body.appendChild(mask);
					activeNav = 'smb-open';
					$('.close-menu').toggle();
				} );
			}
			
			/* hide active menu if mask is clicked */
			mask.addEventListener( 'click', function(){
				classie.remove( body, activeNav );
				activeNav = '';
				document.body.removeChild(mask);
			} );
		
			/* hide active menu if close menu button is clicked */
			[].slice.call(document.querySelectorAll('.close-menu')).forEach(function(el,i){
				el.addEventListener( 'click', function(){
					$('.close-menu').toggle();
					classie.remove( body, activeNav );
					/* $('main#wrapper').animate({
					    top: "0",
					  }, 690, function() {
					    // Animation complete.
					  }); */
					  $('main#wrapper').css('margin-top', '0');
					activeNav = '';
					document.body.removeChild(mask);
				} );
			});
		});
	}
	
 }); //on load