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

          _this.els._$parent.on('keyup', _onKeyUp);
        });
      };

      function _onKeyUp(e) {
        _this.regex = new RegExp(_this.els._$parent.val().toLowerCase());

        var results = [];
        for(var i = 0; i < _this.data.length; i++) {
          var key = _this.data[i].title.toLowerCase();
          if(_this.regex.test(key)) {
            results.push(_this.data[i]);
          }
        }

        if(!results.length) {
          results = 'We don\'t have that one :(';
        }
        
        if(_this.cachedResults.length != results.length) {
          _this.cachedResults = results;
          _this.signals.resultsFetched.dispatch(results);
        }
      };

      // Self initialising
      $(_init());
    }

    return SearchField;
  }
);