var bdy = $('body'),
	win = $( window ),
	doc = $( document ),
	wt = parseFloat( win.width() ),
	ht = parseFloat( win.height() ),
	wst = parseFloat( win.scrollTop() ),
	sRatio,
	isMobile = mobile.detect(),
	protocols = window.location.protocol,
	uty = {
		speed: 666,
		easing: 'easeInOutExpo',
		ani: function( o, callback ){
			var _t = this, ID = o['el'];
			if( _t.detectEl( ID ) ){
				ID.stop().animate(o['prop'], o['speed'] || _t.speed, o['easing'] || _t.easing);
				setTimeout(function(){
					if( typeof callback !== 'undefined' )
						callback();
				}, ( o['speed'] || _t.speed ) + 1);
			}
		},
		setAttr: function( o ){
			o['el'].attr( o['prop'], o['val'] || '' );
		},
		detectEl: function( ID ){
			return ID.length > 0 ? true : false;
		},
		ajx: function( o, callback ){
			$.ajax({
				type: o['type'] || 'GET',
				dataType: o['dataType'] || 'html',
				url: o['uri'] || '',
				data : o['param'] || {},
				contentType: o['contentType'] || '',
				error: function( e ){ 
					if( typeof callback !== 'undefined' ) 
						callback({ type: 'error' }); 
				},
				timeout: 30000,
				success:function( d ){ 
					if( typeof callback !== 'undefined' ) 
						callback({ type: 'success', val: d });
				}
			});
		},
		getScript: function( o, callback ){
			$.getScript(o['uri'], function(){
				if( typeof callback !== 'undefined' ) 
					callback();
			});
		},
		cssClass: function( o, callback ){
			var _t = this, ID = $( o['ID'] ), k = o['delay'], type = o['type'], cls;
			if( _t.detectEl( ID ) ){
				if( type == 'add' ){
					cls = o['cls'] || ['ready', 'animate'];
					ID.addClass( cls[ 0 ] ).delay( k ).queue('fx', function(){ $( this ).dequeue().addClass( cls[ 1 ] ); if( typeof callback !== 'undefined' ) callback(); });
				}else{
					cls = o['cls'] || ['animate', 'ready'];
					ID.removeClass( cls[ 0 ] ).delay( k ).queue('fx', function(){ $( this ).dequeue().removeClass( cls[ 1 ] ); if( typeof callback !== 'undefined' ) callback(); });
				}
			}
		},
		scrollTop: function( k ){
			win.scrollTop( k );
		},
		pageScroll: function( o, callback ){
			var _t = this;
			$('html, body').stop().animate({ scrollTop: o['scrollTop'] || 0 }, o['speed'] || _t.speed, o['easing'] || 'easeInOutExpo', function(){ 
				if( typeof callback !== 'undefined' )
					callback();  
			});
		},
		lazyLoad: function( o, callback ){
			var _t = this, ID = $( o['ID'] );
			if( _t.detectEl( $('.lazy', ID) ) )
				$('.lazy', ID).lazyload({ effect: 'fadeIn', container: o['container'] || window, load: function(){ 
					$( this )
					.removeClass('lazy')
					.addClass('loaded'); 
				}});
		},
		unVeil: function( ID ){
			var _t = this;
			if( _t.detectEl( $('img.lazyload', ID) ) )
				$('img.lazyload', ID).unveil().trigger('unveil');
		},
		clearScriptTag: function( k ){
			var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
			while( SCRIPT_REGEX.test( k ) )
				k = k.replace(SCRIPT_REGEX, '');	
			return k;
		},
		trimText: function( k ){
			return k.replace(/(^\s+|\s+$)/g,'');
		},
		cleanText: function( k ){
			return k.replace(/\s+/g, '');
		},
		cleanLineBreak: function( k ){
			return k.replace(/\n|\r/g, '');
		},
		diff: function( arr1, arr2 ){
			var newArr = [];
			var arr = arr1.concat(arr2);
		
			for (var i in arr) {
				var f = arr[i];
				var t = 0;
				for (j = 0; j < arr.length; j++) {
					if (arr[j] === f) {
						t++;
					}
				}
				if (t === 1)
					newArr.push(f);
				
			}
			return newArr;
		},
		isVisible: '.nav-menu-mobile',
		visibleControl: function(){
			var _t = this, b = false;
			if( _t.isVisible !== '' ){
				var e = $( _t.isVisible );
				if( uty.detectEl( e ) )
					if( e.is(':visible') )
						b = true;	
			}
			return b;
		},
		Cookies: function( o ){ 
			var typ = o['typ'] || '', name = o['name'] || '';
			if( typ == 'set' ){ 
				var date = new Date(), minutes = o['minutes'] || 5;
					date.setTime( date.getTime() + ( minutes * 60 * 1000 ) );
				$.cookie(name, o['value'] || '', { expires: date, path: '/' });
			}else if( typ == 'get' )
				return $.cookie( name ) || '';
		},
		convertHttps: function( k ){
			if( protocols == 'https:' ) 
				k = k.replace(/http:/g, 'https:'); 
			return k;
		},
		getObject: function( k ){
			/* html object prop */
			k = k.replace(/\'/g, '"');
			k = JSON.parse( k );
			return k;
		}
	},
	management = {
		append: {
			arr: [
				{ main: '<div class="mobile-user-wrp"></div>', target: '.menu-wrapper', add: 'append' },
				{ main: '.account', target: '.mobile-user-wrp', add: 'append', clone: true },
				{ main: '.dealers', target: '.mobile-user-wrp', add: 'append', clone: true },
				{ main: '.pagination .pag-count', target: '.mobile-filter-wrp', add: 'append', clone: true },
				{ main: '.prd-list-ranking .list-ranking', target: '.mobile-filter-wrp', add: 'append', clone: true },
			],
			set: function( o ){
				var main = $( o['main'] || '' ), target = $( o['target'] || '' ), clone = o['clone'] || '', type = o['add'] || '';
				if( uty.detectEl( main ) && uty.detectEl( target ) ){ 
					main = main.eq( 0 );
					var e = clone != '' ? main.clone() : main;
					if( type == 'prepend' ) target.prepend( e );
					else if( type == 'before' ) target.before( e );
					else if( type == 'after' ) target.after( e );
					else if( type == 'html' ) target.html( e.html() );
					else if( type == 'wrapAll' ) target.wrapAll( o['template'] || '' );
					else target.append( e );
				}
			},	
			init: function(){
				var _t = this, arr = _t.arr;
				for( var i = 0; i < arr.length; ++i )
					_t.set( arr[ i ] );	
			}
		},
		
		
		init: function(){
			var _t = this;
				_t.append.init();
		}
    },
    plugin = {
        cls: { active: 'plugins-active' },
        menu: {
			arr: [
				{ 'ID': '.menu-wrapper', 'prop': { 'bdyClicked': true, 'eventType': isMobile ? 'click' : 'hover', 'isVisible': uty.isVisible, 'overlay': true, 'bdyCls': 'uk-navbar-nav-opened', 'items': 'ul > li' } }
			],
			set: function( o ){
				var _t = this, ID = $( o['ID'] ), b = o['unbind'] || '', s = o['selectionFirst'] || ''; 
				if( uty.detectEl( ID ) ){
					if( !ID.hasClass( plugin['cls']['active'] ) ){
						ID.addClass( plugin['cls']['active'] );
						ID.minusMenu( o['prop'] || {} ); 
						if( b != '' ) 
							$(b, ID).unbind('mouseleave')
						
						if( s != '' )	
							$(s, ID).each(function(){ $( this ).find('> li:eq( 0 )').addClass('selected'); });
					}
				}
			},
			init: function(){
				var _t = this;
				for( var i = 0; i < _t.arr.length; ++i )
					_t.set( _t.arr[ i ] );
			}
        },
		zoomGallery: {
			el: '[data-zoom]',
			set: function( ID ){
				var _t = this; 
				if( !ID.hasClass( plugin['cls']['active'] ) ){
					ID.addClass( plugin['cls']['active'] );
					ID.minusZoomGallery();
				}
			},
			init: function(){
				var _t = this, el = $( _t.el );
				if( uty.detectEl( el ) ){
					el.each(function(){ 
						var ths = $( this );
						_t.set( ths );
					});
				}
			}
		},
		dropDown: {			
			el: '.dropdown, .dropdown-mobi',
			init: function(){
				var _t = this, el = $( _t.el );
				if( uty.detectEl( el ) ){
					el.each(function(){ 
						var ths = $( this );
						if( !ths.hasClass( plugin['cls']['active'] ) ){
							ths.addClass( plugin['cls']['active'] );
							ths.minusCustomDropDown(); 
						}
					});
				}
			}
		},
		counter: {
			arr: [				
				{ 'ID': '.inp .inp-piece' }
			],
			set: function( o ){
				var _t = this, ID = $( o['ID'] ); 
				if( uty.detectEl( ID ) ){
					ID.each(function(){
						var ths = $( this );
						if( !ths.hasClass( plugin['cls']['active'] )  ){
							ths.addClass( plugin['cls']['active'] );
							ths.minusCounter( o['prop'] || {} );
						}		
					})
				}
			},
			init: function(){
				var _t = this;
				for( var i = 0; i < _t.arr.length; ++i )
					_t.set( _t.arr[ i ] );
			}
		},
        init: function(){
            var _t = this;
                _t.menu.init();
				_t.zoomGallery.init();
				_t.dropDown.init();
				_t.counter.init();
        }    
	},
	modules = {
		mobiMenu: {
			el: { btn: '.nav-menu-mobile', closeBtn: '.nav-menu-mobile-close' },
			cls: { ready: 'mobi-menu-ready', animate: 'mobi-menu-animate' },
			animate: function( k ){
				var _t = this;
				if( k == 'opened' )
					uty.cssClass({ 'ID': 'body', 'delay': 100, 'type': 'add', 'cls':[_t.cls['ready'], _t.cls['animate']] });
				else
					uty.cssClass({ 'ID': 'body', 'delay': 444, 'type': 'remove', 'cls':[_t.cls['animate'], _t.cls['ready']] });		
			},
			addEvents: function(){
				var _t = this;
				$( _t.el.btn )
				.bind('click', function(){
					var ths = $( this );
					if( bdy.hasClass( _t.cls['ready'] ) )
						_t.animate('closed');
					else
						_t.animate('opened');	
				});	
				$( _t.el.closeBtn )
				.bind('click', function(){
					_t.animate('closed');
				});	
			},
			init: function(){
				var _t = this;
					_t.addEvents();	
			}
		},
		customSearch: {
			cls: {
				focused: 'search-focused',
				keyup: 'search-keyup',
				loading: 'search-ajx-loading',
				ready: 'mobi-search-ready'
			},
			el: {
				wrp: '.search-bar-wrapper',
				input: '#search',
				suggContent: '.suggestion-wrapper',
				mobiBtn: '.mobile-search',
				closeBtn: '.mod-mini-search-footer'
			},
			begin: 3,
			delay: 333,
			stm: null,
			clearTm: function() {
				var _t = this;
				if (_t.stm !== null)
					clearTimeout(_t.stm);
			},
			uri: {
				kyw: $('[id="search"]').attr('data-uri') || 'sugg/prd-sugg-ajx.php?kyw={{val}}'
			},
			getURI: function(o) {
				var _t = this
				, val = o['val'] || ''
				, typ = o['typ'] || '';
				return _t.uri[typ].replace(/{{val}}/g, val);
			},
			loading: function(k) {
				var _t = this;
				if (k == 'add')
					bdy.addClass(_t.cls['loading']);
				else
					bdy.removeClass(_t.cls['loading']);
			},
			addEvent: function() {
				var _t = this
				, wrp = $(_t.el.wrp)
				, input = wrp.find(_t.el.input)
				, suggContent = wrp.find(_t.el.suggContent);
				input.bind('focus', function() {
					var ths = $(this)
					, val = uty.trimText(ths.val() || '');
					if (val.length > 0)
						bdy.addClass(_t.cls['keyup']);
					bdy.addClass(_t.cls['focused']);
				}).bind('keyup paste', function() {
					var ths = $(this)
					, val = uty.trimText(ths.val() || '');
					if (val.length > 0) {
						bdy.addClass(_t.cls['keyup']);
						_t.clearTm();
						if (val.length >= _t.begin)
							_t.stm = setTimeout(function() {
								_t.loading('add');
								uty.ajx({
									uri: _t.getURI({
										val: val,
										typ: 'kyw'
									})
								}, function(d) {
									if (d['type'] == 'success') {
										var k = uty.trimText(d['val'] || '');
										suggContent.html(k);
									} else
										suggContent.html('');
									_t.loading('remove');
								});
							}, _t.delay);
					} else
						bdy.removeClass(_t.cls['keyup']);
				}).bind('blur', function() {
					var ths = $(this)
					, val = uty.cleanText(ths.val() || '');
					if (val.length == 0)
						bdy.removeClass(_t.cls['focused']).removeClass(_t.cls['keyup']).removeClass(_t.cls['ready']);
				});
				$(_t.el.mobiBtn).bind('click', function() {
					if (bdy.hasClass(_t.cls['ready']))
						bdy.removeClass(_t.cls['ready']);
					else {
						bdy.addClass(_t.cls['ready']);
						setTimeout(function() {
							input.focus();
						}, 333);
					}
				});
				$(_t.el.closeBtn).bind('click', function() {
					input.val('').blur();
				});
			},
			destroy: function() {
				var _t = this;
				if (bdy.hasClass(_t.cls['focused']))
					bdy.removeClass(_t.cls['focused']).removeClass(_t.cls['keyup']).removeClass(_t.cls['ready']);
			},
			init: function() {
				var _t = this;
				if (uty.detectEl($(_t.el.wrp)))
					_t.addEvent();
			}
		},
		viewType: {
			btn: '.list-grid ul li',
			cls: { selected: 'selected' }, 
			addEvent: function(){
				var _t = this, btn = $( _t.btn ), cls = '', wrp = $('.prd-list-wrp');
				btn
				.each(function(){
					var ths = $( this ), rel = ths.attr('data-rel') || '';
					if( rel != '' )
                    	cls += rel + ' '; 
                })
				.unbind('click')
				.bind('click', function(){
					var ths = $( this ), rel = ths.attr('data-rel') || '';
						ths.addClass( _t.cls['selected'] ).siblings('li').removeClass( _t.cls['selected'] );
					wrp.removeClass( cls ).addClass( rel );
					uty.Cookies({ typ: 'set', value: rel, name: 'view-type' });
					setTimeout(function(){ win.resize() }, 10);
				});
				
				var k = uty.Cookies({ typ: 'get', name: 'view-type' }), ind = $( _t.btn + '.' + _t.cls['selected'] ).index();

				if( k != '' ){
					k = $( _t.btn + '[data-rel="'+ k +'"]');
					if( uty.detectEl( k ) )
						ind = k.index();	
				}

				if( ind < 0 ) ind = 0;

				btn
				.eq( ind )
				.click();
			},
			init: function(){
				var _t = this;
				if( uty.detectEl( $( _t.btn ) ) )
					_t.addEvent();
			}
		},
		init: function(){
			var _t = this;
				_t.mobiMenu.init();
				_t.customSearch.init();
				_t.viewType.init();
		}
	},
    resetDom = {
		k: true,
		onResize: function(){
			var _t = this;
			if( !_t.k && uty.visibleControl() ){
				// mobi
				_t.k = true;
			}else if( _t.k && !uty.visibleControl() ){
				// pc
				_t.k = false;
			}
		},
		init: function(){
			var _t = this;
			if( uty.visibleControl() )
				_t.k = false;
		}
	},
	events = {
		clicked: {
			allTabGroup: function( k ){
				var ths = $( k ); 
				setTimeout(function() {
					var prop = ths.parents('ul').eq( 0 ).data() || {};
						prop = prop['switcher']['connect']['selector'] || '';
					if( prop != '' ){
						$( prop )
						.find('li')
						.attr('aria-expanded', 'false')
						.addClass('uk-active');
					}
				}, 1);
			}
		},
		bdyClicked: function(){
			$('body, html').bind('click touchstart', function( e ){
				var m = $('.dropdown, .dropdown-mobi'); 
				if( !m.is( e.target ) && m.has( e.target ).length === 0 )
					m.removeClass('opened');

				m = $('.mod-mini-search');
				if (!m.is(e.target) && m.has(e.target).length === 0)
					modules.customSearch.destroy();
			
			});	
		},
		loaded: function(){
			uty.lazyLoad( { ID: 'body' } );
		},
		ready: function(){
		},
		onResize: function(){
			wt = parseFloat( win.width() );
            ht = parseFloat( win.height() );
            
			resetDom.onResize();
		},
		onScroll: function(){
			wst = parseFloat( win.scrollTop() );
			//sRatio = wst / ( doc.height() - ht );
		},
		init: function(){
			var _t = this;
				_t.bdyClicked();
			win.load( _t.loaded );
			win.resize( _t.onResize ).resize();
			win.scroll( _t.onScroll ).scroll();
			doc.ready( _t.ready );	
		}
	},
	initialize = function(){
        management.init();
		plugin.init();
		modules.init();
		events.init();
	};
	
	initialize();