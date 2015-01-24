define(
	[
		'jquery',
		'signals',
		'fastclick',
		'tweenmax',
		'modules/menu',
		'modules/search-field',
		'modules/thumbnails',
		'modules/youtube-player',
		'modules/disqus'
	],

	function(
		$,
		signals,
		fastclick,
		TweenMax,
		Menu,
		SearchField,
		Thumbnails,
		YoutubePlayer,
		Disqus
	) {

		'use strict';

		function App() {

			// Initialising FastClick
			fastclick.attach(document.body);

			var _this = this;

			// Global app elements
			_this.els = {};
			_this.els.$window = $(window);
			_this.els.$html = $('html');

			// Signals
			_this.signals = {};
			_this.signals.appResized = new signals.Signal();

/////////////
//////////////// PRIVATE METHODS
///
			function _init() {
				if(_this.supportsTouch()) {
					_this.els.$html.addClass('is-touch');
				}

				// Handle the app resizing
				_this.els.$window.on('resize', _onWindowResized);
				setTimeout(function() {_onWindowResized();}, 100);

				$.ajaxSetup({
				  cache: true
				});

				_this.menu = new Menu(_this, $('.container-header'));

				if($('.postlist').length) {
					_this.thumbnails = new Thumbnails(_this, $('.postlist'));
				}

				if($('#searchfield').length) {
					_this.searchField = new SearchField(_this, $('#searchfield'));
					_this.searchField.signals.resultsFetched.add(_onSearchResultsFetched);
				}

				if($('#yt-player').length) {
					_this.youtubePlayer = new YoutubePlayer(_this, $('#yt-player'));
				}

				if($('#disqus_thread').length) {
					_this.disqus = new Disqus(_this, $('#disqus_thread'));
				}
			};

			/**
		     * Handle the window resize event
		    */
			function _onWindowResized() {
				_this.signals.appResized.dispatch();
			};

			function _onSearchResultsFetched(results) {
				_this.thumbnails.reload(results);
			};

			this.supportsTouch = function supportsTouch() {
        return  !!('ontouchstart' in window) ||
                (!!('onmsgesturechange' in window) && !!window.navigator.maxTouchPoints);
    	};

    	// Self initialising
			$(_init());
		}

		return App;
	}
);