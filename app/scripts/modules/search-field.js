define(
  [
    'jquery',
    'signals',
    'tweenmax'
  ],

  function(
    $,
    signals,
    TweenMax
  ) {

    'use strict';

    function SearchField(app, el) {

      var _this = this;
      _this.app = app;

      // Global app elements
      _this.els = {};
      _this.els.$window = $(window);
      _this.els.$html = $('html');
      _this.els._$parent = el;
      _this.els.$form = $('#searchform');

      // Signals
      _this.signals = {};
      _this.signals.resultsFetched = new signals.Signal();

      // Vars
      _this.jsonFile = 'data/search.json';
      _this.data = [];
      _this.cachedResults = [];

/////////////
//////////////// PRIVATE METHODS
///
      function _init() {
        _loadData();
      };

      function _loadData() {
        $.getJSON(_this.jsonFile, function(data) {
          _this.data = data;

          if(!_this.app.supportsTouch()) {
            _this.els._$parent.on('keyup', _onKeyUp);
          } else {
            _this.els.$form.on('submit', _onSubmit);
          }
        });
      };

      function _onKeyUp(e) {
        _search();
      };

      function _onSubmit(e) {
        e.preventDefault();
        _search();
      }

      function _search() {
        _this.regex = new RegExp(_this.els._$parent.val().toLowerCase());

        var results = [];
        for(var i = 0; i < _this.data.length; i++) {
          var key = _this.data[i].title.toLowerCase();
          if(_this.regex.test(key)) {
            results.push(_this.data[i]);
          }
        }

        if(!results.length) {
          results = 'The computer says no...';
        }
        
        if(_this.cachedResults.length != results.length) {
          _this.cachedResults = results;
          _this.signals.resultsFetched.dispatch(results);
        }
      }

      // Self initialising
      $(_init());
    }

    return SearchField;
  }
);