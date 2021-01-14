var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import ReactionTimePresenter from './reactionTimePresenter.js';

var waitRange = 5000;
var waitMin = 1000;

var startTime = void 0;

var ReactionTimeContainer = function (_React$Component) {
   _inherits(ReactionTimeContainer, _React$Component);

   function ReactionTimeContainer(props) {
      _classCallCheck(this, ReactionTimeContainer);

      var _this = _possibleConstructorReturn(this, (ReactionTimeContainer.__proto__ || Object.getPrototypeOf(ReactionTimeContainer)).call(this, props));

      _this.state = {

         // the 'phase' of the target:
         // 0 is reloading
         // 1 is 'don't click'
         // 2 is 'click'
         // 3 is the "start" prompt
         // 4 is 'pause'
         phase: 0,

         // Main area variables
         currentScore: 300,
         highScore: 300,
         totalStars: 0,
         starTransition: 'opacity 0.1s',
         scoreTransition: 'opacity 0s',
         scoreOpacity: 0,
         highScoreTransition: 'opacity 0s',
         highScoreOpacity: 0,

         // 0 is empty star
         // 1 is full star
         star0: 0,
         star1: 0,
         star2: 0
      };

      _this.pause = _this.pause.bind(_this);
      _this.reloadingPhase = _this.reloadingPhase.bind(_this);
      _this.doNotClickPhase = _this.doNotClickPhase.bind(_this);
      _this.cancelClickPhase = _this.cancelClickPhase.bind(_this);
      _this.clickPhase = _this.clickPhase.bind(_this);
      _this.updateData = _this.updateData.bind(_this);
      _this.resetStars = _this.resetStars.bind(_this);
      _this.transitionScoreBoldness = _this.transitionScoreBoldness.bind(_this);
      return _this;
   }

   _createClass(ReactionTimeContainer, [{
      key: 'componentDidMount',
      value: function componentDidMount() {

         this.setState({
            phase: 0
         });

         this.setState({
            phase: 1
         });

         this.setState({
            phase: 2
         });

         this.setState({
            phase: 3
         });

         document.addEventListener('keydown', this.pause);
      }
   }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
         document.removeEventListener('keydown', this.pause);
      }
   }, {
      key: 'pause',
      value: function pause(event) {
         if (event.key === 'Escape' && this.state.phase !== 3) {
            if (this.state.phase === 4) {
               this.reloadingPhase();
            } else {
               this.setState({
                  phase: 4
               });
               clearTimeout(this.doNotClickTimer);
               clearTimeout(this.reloadingTimer);
            }
         }
      }
   }, {
      key: 'reloadingPhase',
      value: function reloadingPhase() {
         this.setState({
            phase: 0
         });

         this.doNotClickPhase();
      }
   }, {
      key: 'doNotClickPhase',
      value: function doNotClickPhase() {
         this.reloadingTimer = setTimeout(function () {
            this.setState({
               phase: 1
            });
            this.clickPhase();
         }.bind(this), 600);
      }
   }, {
      key: 'clickPhase',
      value: function clickPhase() {
         var randomInterval = Math.floor(Math.random() * waitRange) + waitMin;
         this.doNotClickTimer = setTimeout(function () {
            startTime = Date.now();
            this.setState({
               phase: 2
            });
         }.bind(this), randomInterval);
      }
   }, {
      key: 'cancelClickPhase',
      value: function cancelClickPhase() {
         clearTimeout(this.doNotClickTimer);
      }
   }, {
      key: 'updateData',
      value: function updateData(passOrFail) {
         var _this2 = this;

         var currentScore = this.state.currentScore;
         var scoreTransition = this.state.scoreTransition;
         var scoreOpacity = this.state.scoreOpacity;
         var highScore = this.state.highScore;
         var highScoreTransition = this.state.highScoreTransition;
         var highScoreOpacity = this.state.highScoreOpacity;
         var totalStars = this.state.totalStars;
         var star0 = this.state.star0;
         var star1 = this.state.star1;
         var star2 = this.state.star2;

         if (passOrFail) {
            switch (totalStars) {
               case 0:
                  star0 = 100;
                  totalStars++;
                  break;
               case 1:
                  star1 = 100;
                  totalStars++;
                  break;
               case 2:
                  star2 = 100;
                  totalStars = 0;

                  scoreTransition = 'opacity 0s';
                  scoreOpacity = 100;
                  this.transitionScoreBoldness();

                  currentScore -= 10;
                  if (currentScore < highScore) {
                     highScore = currentScore;
                     highScoreTransition = 'opacity 0s';
                     highScoreOpacity = 100;
                     this.transitionHighScoreBoldness();
                  }

                  setTimeout(function () {
                     _this2.resetStars();
                  }, 300);

                  break;
               default:
                  break;
            }
         } else {
            currentScore += 10;
            scoreTransition = 'opacity 0s';
            scoreOpacity = 100;
            this.transitionScoreBoldness();
            star0 = 0;
            star1 = 0;
            star2 = 0;
            totalStars = 0;
         }

         this.setState({
            starTransition: 'opacity 0.1s',
            scoreTransition: scoreTransition,
            scoreOpacity: scoreOpacity,
            highScoreTransition: highScoreTransition,
            highScoreOpacity: highScoreOpacity,
            star0: star0,
            star1: star1,
            star2: star2,
            currentScore: currentScore,
            highScore: highScore,
            totalStars: totalStars
         });

         this.reloadingPhase();
      }
   }, {
      key: 'resetStars',
      value: function resetStars() {
         this.setState({
            starTransition: 'opacity 1.5s',
            star0: 0,
            star1: 0,
            star2: 0
         });
      }
   }, {
      key: 'transitionScoreBoldness',
      value: function transitionScoreBoldness() {
         var _this3 = this;

         setTimeout(function () {
            _this3.setState({
               scoreTransition: 'opacity 1s',
               scoreOpacity: 0
            });
         }, 200);
      }
   }, {
      key: 'transitionHighScoreBoldness',
      value: function transitionHighScoreBoldness() {
         var _this4 = this;

         setTimeout(function () {
            _this4.setState({
               highScoreTransition: 'opacity 1s',
               highScoreOpacity: 0
            });
         }, 200);
      }
   }, {
      key: 'render',
      value: function render() {
         return React.createElement(ReactionTimePresenter, {
            phase: this.state.phase,
            startTime: startTime,
            reloadingPhase: this.reloadingPhase,
            cancelClickPhase: this.cancelClickPhase,

            updateData: this.updateData,
            currentScore: this.state.currentScore,
            highScore: this.state.highScore,
            star0: this.state.star0,
            star1: this.state.star1,
            star2: this.state.star2,
            scoreTransition: this.state.scoreTransition,
            scoreOpacity: this.state.scoreOpacity,
            highScoreTransition: this.state.highScoreTransition,
            highScoreOpacity: this.state.highScoreOpacity,
            starTransition: this.state.starTransition
         });
      }
   }]);

   return ReactionTimeContainer;
}(React.Component);

ReactDOM.render(React.createElement(ReactionTimeContainer, null), document.getElementById('game'));
