var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var articles = [React.createElement(
  'article',
  { id: 'page1' },
  React.createElement(
    'h6',
    null,
    'WHAT IS WORKING MEMORY?'
  ),
  'What is working memory? We will answer this question by first exploring what it is ',
  React.createElement(
    'em',
    null,
    'not.'
  ),
  React.createElement('br', null),
  React.createElement('br', null),
  'A common misconception is that working memory is the same thing as short-term-memory. However, this is like saying that a car\'s engine is the same thing as the car itself, and it makes the mistake of confusing a part for a whole.  With this said, short-term-memory is but one of several components that make up working memory. These components include:',
  React.createElement(
    'ul',
    null,
    React.createElement(
      'li',
      null,
      'Your short-term-memory'
    ),
    React.createElement(
      'li',
      null,
      'The ability to manipulate/re-arrange the content of your short-term-memory'
    ),
    React.createElement(
      'li',
      null,
      'An "executive functioning" component that allows you to exert voluntary control over what goes in/out of your working memory'
    )
  ),
  'Short-term-memory is not very useful without these other components to help it out. Try the exercise on the left to see for yourself! Later on, we will see what happen when the other components are added on top of it!'
), React.createElement(
  'article',
  null,
  'PAGE 2'
), React.createElement(
  'article',
  null,
  'PAGE 3'
), React.createElement(
  'article',
  null,
  'PAGE 4'
), React.createElement(
  'article',
  null,
  'PAGE 5'
), React.createElement(
  'article',
  null,
  'PAGE 6'
)];

var gridColors = ['rgb(48, 114, 54)', // green
'rgb(122, 110, 96)'];
var gameHeaderText = ['CLICK "GO" TO PLAY', 'REMEMBER THE SEQUENCE...', 'YOUR TURN! CLICK IN THE CORRECT SEQUENCE...', 'CORRECT! LET\'S MAKE IT HARDER NOW...', 'YOU GOT ', ' CORRECT. LET\'S TRY AGAIN...'];
console.log(gameHeaderText[4]);
var gridItemsElements = [];
var centerItemElement = React.createElement('div', null);

var Game1 = function (_React$Component) {
  _inherits(Game1, _React$Component);

  function Game1(props) {
    _classCallCheck(this, Game1);

    var _this = _possibleConstructorReturn(this, (Game1.__proto__ || Object.getPrototypeOf(Game1)).call(this, props));

    _this.state = {

      gameHeaderText: '',

      sequenceCount: 3,
      clickCount: 0,
      clickedCorrectly: true,
      numberCorrect: 0,
      sequence: [],

      // phase 0: game has not started yet
      // phase 1: encoding phase
      // phase 2: retrieval phase
      // phase 3: post-task phase
      phase: 0,

      clickingOnGridItem: false,

      gridItemsStyles: [{ backgroundColor: gridColors[1], transition: '0.2s' }, { backgroundColor: gridColors[1], transition: '0.2s' }, { backgroundColor: gridColors[1], transition: '0.2s' }, { backgroundColor: gridColors[1], transition: '0.2s' }, { backgroundColor: gridColors[0], transition: '0.2s' }, { backgroundColor: gridColors[1], transition: '0.2s' }, { backgroundColor: gridColors[1], transition: '0.2s' }, { backgroundColor: gridColors[1], transition: '0.2s' }, { backgroundColor: gridColors[1], transition: '0.2s' }],
      goTextStyle: { opacity: '100', transition: '0.2s' },
      gridItemWidthSmall: '',
      gridItemWidthBig: '',
      gridItemMarginSmall: '',
      gridItemMarginBig: '',
      goTextMarginSmall: 0,
      goTextMarginBig: 0,
      screenScale: 0.0
    };

    _this.setStyleVariables = _this.setStyleVariables.bind(_this);
    _this.setJsxStyles = _this.setJsxStyles.bind(_this);
    _this.startGame = _this.startGame.bind(_this);
    _this.encodingPhase = _this.encodingPhase.bind(_this);
    _this.mouseOverGridItem = _this.mouseOverGridItem.bind(_this);
    _this.mouseLeavesGridItem = _this.mouseLeavesGridItem.bind(_this);
    _this.clickGridItem = _this.clickGridItem.bind(_this);
    _this.mouseDownOverGridItem = _this.mouseDownOverGridItem.bind(_this);
    return _this;
  }

  _createClass(Game1, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ gameHeaderText: gameHeaderText[0] });

      this.setStyleVariables();
      window.addEventListener('resize', this.setStyleVariables);

      gridItemsElements = document.getElementsByClassName('gridItem');
      centerItemElement = document.getElementById('4');

      centerItemElement.style.cursor = 'pointer';
      for (var i = 0; i < gridItemsElements.length; i++) {
        gridItemsElements[i].style.cursor = 'default';
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.setStyleVariables);
    }
  }, {
    key: 'setStyleVariables',
    value: function setStyleVariables() {
      var _this2 = this;

      if (window.innerWidth <= 1250 && this.state.screenScale !== 1.0) {
        this.setState({
          screenScale: 1.0,
          gridItemWidthSmall: '70px',
          gridItemWidthBig: '76px',
          gridItemMarginSmall: '15px',
          gridItemMarginBig: '12px',
          goTextMarginSmall: '17px',
          goTextMarginBig: '20px'

        }, function () {
          _this2.setJsxStyles();
        });
      } else if (window.innerWidth > 1250 && this.state.screenScale !== 1.25) {
        this.setState({
          screenScale: 1.25,
          gridItemWidthSmall: '89px',
          gridItemWidthBig: '99px',
          gridItemMarginSmall: '18px',
          gridItemMarginBig: '13px',
          goTextMarginSmall: '21px',
          goTextMarginBig: '26px'
        }, function () {
          _this2.setJsxStyles();
        });
      }
    }
  }, {
    key: 'setJsxStyles',
    value: function setJsxStyles() {
      var newGridItemsStyles = [].concat(_toConsumableArray(this.state.gridItemsStyles));
      var newGoTextStyle = Object.assign({}, this.state.goTextStyle, {
        marginTop: this.state.goTextMarginSmall
      });
      for (var i = 0; i < 9; i++) {
        newGridItemsStyles[i] = Object.assign({}, newGridItemsStyles[i], {
          width: this.state.gridItemWidthSmall,
          height: this.state.gridItemWidthSmall,
          marginTop: this.state.gridItemMarginSmall,
          marginBottom: this.state.gridItemMarginSmall
        });
      }
      this.setState({
        gridItemsStyles: newGridItemsStyles,
        goTextStyle: newGoTextStyle
      });
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      var _this3 = this;

      if (this.state.phase === 0) {

        var newGoTextStyle = Object.assign({}, this.state.goTextStyle, {
          opacity: '0'
        });
        var newGridItemsStyles = [].concat(_toConsumableArray(this.state.gridItemsStyles));
        newGridItemsStyles[4] = Object.assign({}, newGridItemsStyles[4], {

          backgroundColor: gridColors[1],

          width: this.state.gridItemWidthSmall,
          height: this.state.gridItemWidthSmall,
          marginTop: this.state.gridItemMarginSmall,
          marginBottom: this.state.gridItemMarginSmall
        });
        this.setState({
          go: 1,
          phase: 1,
          goTextStyle: newGoTextStyle,
          gridItemsStyles: newGridItemsStyles
        }, function () {
          centerItemElement.style.cursor = 'default';
          setTimeout(function () {
            _this3.encodingPhase();
            _this3.setState({ gameHeaderText: gameHeaderText[1] });
          }, 200);
        });
      }
    }
  }, {
    key: 'encodingPhase',
    value: function encodingPhase() {
      var _this4 = this;

      var sequence = [];
      sequence.push(Math.floor(Math.random() * 9));
      for (var _i = 1; _i < this.state.sequenceCount; _i++) {
        var newInt = 0;
        do {
          newInt = Math.floor(Math.random() * 9);
        } while (newInt === sequence[_i - 1]);
        sequence.push(newInt);
      }
      this.setState({ sequence: sequence });

      var inBetweenDelay = 600;
      var timeOnScreen = 600;
      var pauseBeforeRecall = 800;

      var i = 0;
      var iMax = this.state.sequenceCount;
      var sequenceLoop = function sequenceLoop(i) {

        setTimeout(function () {

          var newGridItemsStyles = [].concat(_toConsumableArray(_this4.state.gridItemsStyles));
          newGridItemsStyles[sequence[i]] = Object.assign({}, newGridItemsStyles[sequence[i]], {

            backgroundColor: gridColors[0],

            width: _this4.state.gridItemWidthBig,
            height: _this4.state.gridItemWidthBig,
            marginTop: _this4.state.gridItemMarginBig,
            marginBottom: _this4.state.gridItemMarginBig
          });
          _this4.setState({
            gridItemsStyles: newGridItemsStyles
          }, function () {

            setTimeout(function () {

              newGridItemsStyles = [].concat(_toConsumableArray(_this4.state.gridItemsStyles));
              newGridItemsStyles[sequence[i]] = Object.assign({}, newGridItemsStyles[sequence[i]], {

                backgroundColor: gridColors[1],

                width: _this4.state.gridItemWidthSmall,
                height: _this4.state.gridItemWidthSmall,
                marginTop: _this4.state.gridItemMarginSmall,
                marginBottom: _this4.state.gridItemMarginSmall
              });
              _this4.setState({
                gridItemsStyles: newGridItemsStyles
              }, function () {
                i++;
                if (i < iMax) {

                  sequenceLoop(i);
                } else {
                  setTimeout(function () {

                    _this4.setState({
                      phase: 2,
                      clickedCorrectly: true,
                      numberCorrect: 0,
                      clickCount: 0,
                      gameHeaderText: gameHeaderText[2]
                    }, function () {
                      centerItemElement.style.cursor = 'pointer';
                      for (var _i2 = 0; _i2 < gridItemsElements.length; _i2++) {
                        gridItemsElements[_i2].style.cursor = 'pointer';
                      }
                    });
                  }, pauseBeforeRecall);
                }
              });
            }, timeOnScreen);
          });
        }, inBetweenDelay);
      };
      sequenceLoop(i);
    }
  }, {
    key: 'mouseOverGridItem',
    value: function mouseOverGridItem(event) {
      var _this5 = this;

      var index = parseInt(event.currentTarget.id);

      var makeNewGridStyles = function makeNewGridStyles() {
        var newGridItemsStyles = [].concat(_toConsumableArray(_this5.state.gridItemsStyles));
        newGridItemsStyles[index] = Object.assign({}, newGridItemsStyles[index], {

          width: _this5.state.gridItemWidthBig,
          height: _this5.state.gridItemWidthBig,
          marginTop: _this5.state.gridItemMarginBig,
          marginBottom: _this5.state.gridItemMarginBig
        });
        _this5.setState({ gridItemsStyles: newGridItemsStyles });
      };
      var makeNewGoTextStyle = function makeNewGoTextStyle() {
        var newGoTextStyle = Object.assign({}, _this5.state.goTextStyle, {
          marginTop: _this5.state.goTextMarginBig
        });
        _this5.setState({ goTextStyle: newGoTextStyle });
      };

      if (this.state.phase === 2) {
        makeNewGridStyles();
      } else if (this.state.phase === 0 && index === 4) {
        makeNewGridStyles();
        makeNewGoTextStyle();
      }
    }
  }, {
    key: 'mouseLeavesGridItem',
    value: function mouseLeavesGridItem(event) {
      var _this6 = this;

      var index = parseInt(event.currentTarget.id);

      var makeNewGridStyles = function makeNewGridStyles() {
        var newGridItemsStyles = [].concat(_toConsumableArray(_this6.state.gridItemsStyles));
        newGridItemsStyles[index] = Object.assign({}, newGridItemsStyles[index], {

          width: _this6.state.gridItemWidthSmall,
          height: _this6.state.gridItemWidthSmall,
          marginTop: _this6.state.gridItemMarginSmall,
          marginBottom: _this6.state.gridItemMarginSmall
        });
        _this6.setState({ gridItemsStyles: newGridItemsStyles });

        if (_this6.state.clickingOnGridItem) {
          newGridItemsStyles[index] = Object.assign({}, newGridItemsStyles[index], {
            backgroundColor: gridColors[1]
          });
          _this6.setState({
            gridItemsStyles: newGridItemsStyles,
            clickingOnGridItem: false
          });
        }
      };

      var makeNewGoTextStyle = function makeNewGoTextStyle() {
        var newGoTextStyle = Object.assign({}, _this6.state.goTextStyle, {
          marginTop: _this6.state.goTextMarginSmall
        });
        _this6.setState({ goTextStyle: newGoTextStyle });
      };

      if (this.state.phase === 2) {
        makeNewGridStyles();
      } else if (this.state.phase === 0 && index === 4) {
        makeNewGridStyles();
        makeNewGoTextStyle();
      }
    }
  }, {
    key: 'clickGridItem',
    value: function clickGridItem(event) {
      var _this7 = this;

      var index = parseInt(event.currentTarget.id);

      switch (this.state.phase) {
        case 0:
          if (index === 4) this.startGame();
          break;
        case 1:
          break;
        case 2:

          var endRecallPhase = function endRecallPhase() {
            if (_this7.state.clickedCorrectly) {
              _this7.setState({
                gameHeaderText: gameHeaderText[3],
                sequenceCount: _this7.state.sequenceCount + 1
              });
            } else {

              var newSequenceCount = _this7.state.sequenceCount - _this7.state.numberCorrect === 1 ? _this7.state.sequenceCount : _this7.state.sequenceCount - 1;
              var numberMissedString = '(' + _this7.state.numberCorrect + '/' + _this7.state.sequenceCount + ')';
              _this7.setState({
                gameHeaderText: gameHeaderText[4] + numberMissedString + gameHeaderText[5],
                sequenceCount: newSequenceCount
              });
            }

            var newGoTextStyle = Object.assign({}, _this7.state.goTextStyle, {
              opacity: '100',
              marginTop: _this7.state.goTextMarginSmall
            });
            var newGridItemsStyles = [].concat(_toConsumableArray(_this7.state.gridItemsStyles));
            for (var i = 0; i < 9; i++) {
              newGridItemsStyles[i] = Object.assign({}, newGridItemsStyles[i], {

                backgroundColor: gridColors[1],

                width: _this7.state.gridItemWidthSmall,
                height: _this7.state.gridItemWidthSmall,
                marginTop: _this7.state.gridItemMarginSmall,
                marginBottom: _this7.state.gridItemMarginSmall
              });
            }
            newGridItemsStyles[4] = Object.assign({}, newGridItemsStyles[4], {
              backgroundColor: gridColors[0]
            });

            setTimeout(function () {
              _this7.setState({
                phase: 0,
                goTextStyle: newGoTextStyle,
                gridItemsStyles: newGridItemsStyles,
                clickingOnGridItem: false
              });
            }, 250);
          };

          var targetGridItem = this.state.sequence[this.state.clickCount];
          if (targetGridItem === index) {
            this.setState({
              numberCorrect: this.state.numberCorrect + 1,
              clickCount: this.state.clickCount + 1
            }, function () {
              if (_this7.state.clickCount === _this7.state.sequenceCount) endRecallPhase();
            });
          } else {
            this.setState({
              clickedCorrectly: false,
              clickCount: this.state.clickCount + 1
            }, function () {
              if (_this7.state.clickCount === _this7.state.sequenceCount) endRecallPhase();
            });
          }

          var newGridItemsStyles = [].concat(_toConsumableArray(this.state.gridItemsStyles));
          newGridItemsStyles[index] = Object.assign({}, newGridItemsStyles[index], {
            backgroundColor: gridColors[1]
          });
          setTimeout(function () {
            _this7.setState({ gridItemsStyles: newGridItemsStyles });
          }, 100);

          break;
      }
    }
  }, {
    key: 'mouseDownOverGridItem',
    value: function mouseDownOverGridItem(event) {
      if (this.state.phase === 2) {

        var newGridItemsStyles = [].concat(_toConsumableArray(this.state.gridItemsStyles));
        var index = parseInt(event.currentTarget.id);
        newGridItemsStyles[index] = Object.assign({}, newGridItemsStyles[index], {
          backgroundColor: gridColors[0]
        });
        this.setState({
          gridItemsStyles: newGridItemsStyles,
          clickingOnGridItem: true
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          'h4',
          null,
          this.state.gameHeaderText
        ),
        React.createElement(
          'div',
          { id: 'gridHolder' },
          React.createElement('div', { style: this.state.gridItemsStyles[0],
            id: '0',
            className: 'gridItem',
            onMouseMove: this.mouseOverGridItem,
            onMouseLeave: this.mouseLeavesGridItem,
            onClick: this.clickGridItem,
            onMouseDown: this.mouseDownOverGridItem }),
          React.createElement('div', { style: this.state.gridItemsStyles[1],
            id: '1',
            className: 'gridItem',
            onMouseMove: this.mouseOverGridItem,
            onMouseLeave: this.mouseLeavesGridItem,
            onClick: this.clickGridItem,
            onMouseDown: this.mouseDownOverGridItem }),
          React.createElement('div', { style: this.state.gridItemsStyles[2],
            id: '2',
            className: 'gridItem',
            onMouseMove: this.mouseOverGridItem,
            onMouseLeave: this.mouseLeavesGridItem,
            onClick: this.clickGridItem,
            onMouseDown: this.mouseDownOverGridItem }),
          React.createElement('div', { style: this.state.gridItemsStyles[3],
            id: '3',
            className: 'gridItem',
            onMouseMove: this.mouseOverGridItem,
            onMouseLeave: this.mouseLeavesGridItem,
            onClick: this.clickGridItem,
            onMouseDown: this.mouseDownOverGridItem }),
          React.createElement(
            'div',
            { id: '4',
              style: Object.assign({}, this.state.gridItemsStyles[4]),
              onMouseMove: this.mouseOverGridItem,
              onMouseLeave: this.mouseLeavesGridItem,
              onClick: this.clickGridItem,
              onMouseDown: this.mouseDownOverGridItem },
            React.createElement(
              'p',
              { id: 'goText', style: this.state.goTextStyle },
              'GO'
            )
          ),
          React.createElement('div', { style: this.state.gridItemsStyles[5],
            id: '5',
            className: 'gridItem',
            onMouseMove: this.mouseOverGridItem,
            onMouseLeave: this.mouseLeavesGridItem,
            onClick: this.clickGridItem,
            onMouseDown: this.mouseDownOverGridItem }),
          React.createElement('div', { style: this.state.gridItemsStyles[6],
            id: '6',
            className: 'gridItem',
            onMouseMove: this.mouseOverGridItem,
            onMouseLeave: this.mouseLeavesGridItem,
            onClick: this.clickGridItem,
            onMouseDown: this.mouseDownOverGridItem }),
          React.createElement('div', { style: this.state.gridItemsStyles[7],
            id: '7',
            className: 'gridItem',
            onMouseMove: this.mouseOverGridItem,
            onMouseLeave: this.mouseLeavesGridItem,
            onClick: this.clickGridItem,
            onMouseDown: this.mouseDownOverGridItem }),
          React.createElement('div', { style: this.state.gridItemsStyles[8],
            id: '8',
            className: 'gridItem',
            onMouseMove: this.mouseOverGridItem,
            onMouseLeave: this.mouseLeavesGridItem,
            onClick: this.clickGridItem,
            onMouseDown: this.mouseDownOverGridItem })
        ),
        React.createElement(
          'h5',
          null,
          'SEQUENCE LENGTH: ',
          this.state.sequenceCount
        )
      );
    }
  }]);

  return Game1;
}(React.Component);

var Game2 = function (_React$Component2) {
  _inherits(Game2, _React$Component2);

  function Game2() {
    _classCallCheck(this, Game2);

    return _possibleConstructorReturn(this, (Game2.__proto__ || Object.getPrototypeOf(Game2)).apply(this, arguments));
  }

  _createClass(Game2, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'h1',
        null,
        'IN CONSTRUCTION'
      );
    }
  }]);

  return Game2;
}(React.Component);

var Game3 = function (_React$Component3) {
  _inherits(Game3, _React$Component3);

  function Game3() {
    _classCallCheck(this, Game3);

    return _possibleConstructorReturn(this, (Game3.__proto__ || Object.getPrototypeOf(Game3)).apply(this, arguments));
  }

  _createClass(Game3, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'h1',
        null,
        'IN CONSTRUCTION'
      );
    }
  }]);

  return Game3;
}(React.Component);

var Game4 = function (_React$Component4) {
  _inherits(Game4, _React$Component4);

  function Game4() {
    _classCallCheck(this, Game4);

    return _possibleConstructorReturn(this, (Game4.__proto__ || Object.getPrototypeOf(Game4)).apply(this, arguments));
  }

  _createClass(Game4, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'h1',
        null,
        'IN CONSTRUCTION'
      );
    }
  }]);

  return Game4;
}(React.Component);

var Game5 = function (_React$Component5) {
  _inherits(Game5, _React$Component5);

  function Game5() {
    _classCallCheck(this, Game5);

    return _possibleConstructorReturn(this, (Game5.__proto__ || Object.getPrototypeOf(Game5)).apply(this, arguments));
  }

  _createClass(Game5, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'h1',
        null,
        'IN CONSTRUCTION'
      );
    }
  }]);

  return Game5;
}(React.Component);

var Game6 = function (_React$Component6) {
  _inherits(Game6, _React$Component6);

  function Game6() {
    _classCallCheck(this, Game6);

    return _possibleConstructorReturn(this, (Game6.__proto__ || Object.getPrototypeOf(Game6)).apply(this, arguments));
  }

  _createClass(Game6, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'h1',
        null,
        'IN CONSTRUCTION'
      );
    }
  }]);

  return Game6;
}(React.Component);

var games = [React.createElement(Game1, null), React.createElement(Game2, null), React.createElement(Game3, null), React.createElement(Game4, null), React.createElement(Game5, null), React.createElement(Game6, null)];

var WorkingMemoryInteractive = function (_React$Component7) {
  _inherits(WorkingMemoryInteractive, _React$Component7);

  function WorkingMemoryInteractive(props) {
    _classCallCheck(this, WorkingMemoryInteractive);

    var _this13 = _possibleConstructorReturn(this, (WorkingMemoryInteractive.__proto__ || Object.getPrototypeOf(WorkingMemoryInteractive)).call(this, props));

    _this13.state = {
      page: 1
    };

    _this13.clickNext = _this13.clickNext.bind(_this13);
    _this13.clickPrev = _this13.clickPrev.bind(_this13);
    return _this13;
  }

  _createClass(WorkingMemoryInteractive, [{
    key: 'clickNext',
    value: function clickNext() {
      var newPage = this.state.page === 6 ? 6 : this.state.page + 1;
      this.setState({
        page: newPage
      });
    }
  }, {
    key: 'clickPrev',
    value: function clickPrev() {
      var newPage = this.state.page === 1 ? 1 : this.state.page - 1;
      this.setState({
        page: newPage
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'appHolder' },
        React.createElement(
          'h1',
          { className: 'header', id: 'headerTitle' },
          'WORKING MEMORY'
        ),
        React.createElement(
          'h3',
          { className: 'header', id: 'headerSubTitle' },
          'AN INTERACTIVE, HANDS-ON EXPLANATION'
        ),
        React.createElement(
          'div',
          { className: 'contentHolder', id: 'contentLeft' },
          React.createElement(
            'div',
            { id: 'game' },
            games[this.state.page - 1]
          )
        ),
        React.createElement(
          'div',
          { className: 'contentHolder', id: 'contentRight' },
          articles[this.state.page - 1]
        ),
        React.createElement(
          'p',
          { id: 'pageDisplay' },
          'PAGE (',
          this.state.page,
          '/6)'
        ),
        React.createElement(
          'div',
          { id: 'buttonsHolder' },
          React.createElement(
            'button',
            { id: 'buttonPrev', onClick: this.clickPrev },
            'PREV'
          ),
          React.createElement(
            'button',
            { id: 'buttonNext', onClick: this.clickNext },
            'NEXT'
          )
        )
      );
    }
  }]);

  return WorkingMemoryInteractive;
}(React.Component);

ReactDOM.render(React.createElement(WorkingMemoryInteractive, null), document.getElementById('reactRendersHere'));