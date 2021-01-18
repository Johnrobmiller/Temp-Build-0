var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var redCircle = './reaction-time-test/images/redCircle.png';
var greenCircle = './reaction-time-test/images/greenCircle.png';
var greenCircleStart = './reaction-time-test/images/greenCircleStart.png';
var noCircle = './reaction-time-test/images/noCircle.png';
var pauseCircle = './reaction-time-test/images/pauseCircle.png';
var starEmpty = './reaction-time-test/images/starEmpty.png';
var logo = './reaction-time-test/images/logo.png';
var starFilled = './reaction-time-test/images/starFilled.png';

var targetImages = [noCircle, redCircle, greenCircle, greenCircleStart, pauseCircle];
var reactionTimeString = React.createElement(
   'span',
   null,
   '\u2013'
);

// Left Panel Variables
var totalAttempts = 0;
var n = 0;
var misses = 0;
var avgTotal = 0;
var avg10Attempts = 0;
var varTotal = 0;
var var10Attempts = 0;
var missRateString = '';

var attempts10 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var attemptsAll = [];

var ReactionTimePresenter = function (_React$Component) {
   _inherits(ReactionTimePresenter, _React$Component);

   function ReactionTimePresenter(props) {
      _classCallCheck(this, ReactionTimePresenter);

      var _this = _possibleConstructorReturn(this, (ReactionTimePresenter.__proto__ || Object.getPrototypeOf(ReactionTimePresenter)).call(this, props));

      _this.state = {
         mouseOverTarget: false
      };

      _this.handleMouseDown = _this.handleMouseDown.bind(_this);
      _this.handleMouseMove = _this.handleMouseMove.bind(_this);
      return _this;
   }

   _createClass(ReactionTimePresenter, [{
      key: 'calcNewAvgTotal',
      value: function calcNewAvgTotal(newValue) {
         return (avgTotal * (n - 1) + newValue) / n;
      }
   }, {
      key: 'calcNewVarTotal',
      value: function calcNewVarTotal() {
         var epsilon = 0;
         for (var i = 0; i < n; i++) {
            epsilon += Math.pow(attemptsAll[i] - avgTotal, 2);
         }
         return epsilon / (n - 1);
      }
   }, {
      key: 'calcNewAvg10Attempts',
      value: function calcNewAvg10Attempts(newValue) {
         var total = avg10Attempts * 10;
         total -= attempts10[9];
         total += newValue;
         return total / 10;
      }
   }, {
      key: 'calcNewVar10Attempts',
      value: function calcNewVar10Attempts() {
         var epsilon = 0;
         for (var i = 0; i < 10; i++) {
            epsilon += Math.pow(attempts10[i] - avg10Attempts, 2);
         }return epsilon / 9;
      }
   }, {
      key: 'handleMouseDown',
      value: function handleMouseDown() {

         if (this.state.mouseOverTarget) {

            if (this.props.phase === 2) {
               totalAttempts++;
               n++;
               var diff = Date.now() - this.props.startTime;
               attemptsAll.push(diff);
               reactionTimeString = diff.toString();
               var passOrFail = diff <= this.props.currentScore ? true : false;
               this.props.updateData(passOrFail);

               if (n <= 10) {
                  attempts10[n - 1] = diff;

                  if (n === 10) {
                     var total = 0;
                     for (var i = 0; i < 10; i++) {
                        total += attempts10[i];
                     }avg10Attempts = total / 10;

                     var10Attempts = this.calcNewVar10Attempts();
                  }
               } else {
                  avg10Attempts = this.calcNewAvg10Attempts(diff);

                  var newAttempts10 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                  newAttempts10[0] = diff;
                  for (var _i = 1; _i < 10; _i++) {
                     newAttempts10[_i] = attempts10[_i - 1];
                  }
                  attempts10 = newAttempts10;

                  var10Attempts = this.calcNewVar10Attempts();
               }

               avgTotal = this.calcNewAvgTotal(diff);
               if (n <= 2) {
                  if (n === 2) {
                     var a = Math.pow(attempts10[0] - avgTotal, 2);
                     var b = Math.pow(attempts10[1] - avgTotal, 2);
                     varTotal = a + b;
                  }
               } else {
                  varTotal = this.calcNewVarTotal(diff);
               }

               if (missRateString) {
                  var missRateTemp = 100 * misses / totalAttempts;
                  missRateString = Math.round(missRateTemp).toString() + '%';
               }
            } else if (this.props.phase === 1) {
               totalAttempts++;
               misses++;
               var _missRateTemp = 100 * misses / totalAttempts;
               if (_missRateTemp !== 0) {
                  missRateString = Math.round(_missRateTemp).toString() + '%';
               }
               reactionTimeString = 'MISS!';
               this.props.cancelClickPhase();
               this.props.updateData();
            } else if (this.props.phase === 3) {
               this.props.reloadingPhase();
            }
         }
      }
   }, {
      key: 'handleMouseMove',
      value: function handleMouseMove(event) {
         var targetElement = document.getElementById('target');
         var targetRect = targetElement.getBoundingClientRect();
         var radius = (targetRect.right - targetRect.left) / 2;
         var centerX = targetRect.left + radius;
         var centerY = targetRect.top + radius;

         var clickDistX = centerX - event.clientX;
         var clickDistY = centerY - event.clientY;
         var clickDistTotal = Math.sqrt(Math.pow(clickDistX, 2) + Math.pow(clickDistY, 2));

         if (clickDistTotal <= radius && !this.state.mouseOverTarget) {
            targetElement.style.cursor = "pointer";
            this.setState({ mouseOverTarget: true });
         } else if (clickDistTotal >= radius && this.state.mouseOverTarget) {
            targetElement.style.cursor = "default";
            this.setState({ mouseOverTarget: false });
         }
      }
   }, {
      key: 'render',
      value: function render() {
         return React.createElement(
            'div',
            null,
            React.createElement(
               'div',
               { id: 'gameHolder' },
               React.createElement(
                  'div',
                  { id: 'leftDataHolder' },
                  React.createElement(
                     'p',
                     { className: 'gameMarginLeft' },
                     'Total attempts: ',
                     React.createElement(
                        'b',
                        null,
                        totalAttempts ? totalAttempts : React.createElement(
                           'span',
                           null,
                           '\u2013'
                        )
                     )
                  ),
                  React.createElement(
                     'p',
                     { className: 'gameMarginLeft' },
                     'Avg. (total): ',
                     React.createElement(
                        'b',
                        null,
                        avgTotal ? Math.round(avgTotal) : React.createElement(
                           'span',
                           null,
                           '\u2013'
                        )
                     )
                  ),
                  React.createElement(
                     'p',
                     { className: 'gameMarginLeft' },
                     'Avg. (10 attempts): ',
                     React.createElement(
                        'b',
                        null,
                        avg10Attempts ? Math.round(avg10Attempts) : React.createElement(
                           'span',
                           null,
                           '\u2013'
                        )
                     )
                  ),
                  React.createElement(
                     'p',
                     { className: 'gameMarginLeft' },
                     'Std. Dev. (total): ',
                     React.createElement(
                        'b',
                        null,
                        varTotal ? Math.round(Math.sqrt(varTotal)) : React.createElement(
                           'span',
                           null,
                           '\u2013'
                        )
                     )
                  ),
                  React.createElement(
                     'p',
                     { className: 'gameMarginLeft' },
                     'Std. Dev. (10 attempts): ',
                     React.createElement(
                        'b',
                        null,
                        var10Attempts ? Math.round(Math.sqrt(var10Attempts)) : React.createElement(
                           'span',
                           null,
                           '\u2013'
                        )
                     )
                  ),
                  React.createElement(
                     'p',
                     { className: 'gameMarginLeft' },
                     'Miss Rate: ',
                     React.createElement(
                        'b',
                        null,
                        missRateString ? missRateString : React.createElement(
                           'span',
                           null,
                           '\u2013'
                        )
                     )
                  )
               ),
               React.createElement(
                  'div',
                  { id: 'actualGame' },
                  React.createElement('img', { src: targetImages[this.props.phase],
                     id: 'target',
                     alt: 'Reaction Time Target',
                     onMouseDown: this.handleMouseDown,
                     onMouseMove: this.handleMouseMove
                  }),
                  React.createElement(
                     'span',
                     { id: 'displayedTime' },
                     reactionTimeString
                  ),
                  React.createElement(
                     'span',
                     { className: 'currentGoalText' },
                     'CURRENT GOAL:',
                     React.createElement('br', null),
                     this.props.currentScore,
                     'ms'
                  ),
                  React.createElement(
                     'span',
                     { className: 'currentGoalText',
                        style: {
                           position: 'absolute',
                           opacity: this.props.scoreOpacity,
                           transition: this.props.scoreTransition
                        } },
                     React.createElement(
                        'b',
                        null,
                        'CURRENT GOAL:',
                        React.createElement('br', null),
                        this.props.currentScore,
                        'ms'
                     )
                  ),
                  React.createElement(
                     'span',
                     { className: 'lowestGoalText' },
                     'LOWEST GOAL:',
                     React.createElement('br', null),
                     this.props.highScore,
                     'ms'
                  ),
                  React.createElement(
                     'span',
                     { className: 'lowestGoalText',
                        style: {
                           position: 'absolute',
                           opacity: this.props.highScoreOpacity,
                           transition: this.props.highScoreTransition
                        } },
                     React.createElement(
                        'b',
                        null,
                        'LOWEST GOAL:',
                        React.createElement('br', null),
                        this.props.highScore,
                        'ms'
                     )
                  ),
                  React.createElement(
                     'div',
                     { className: 'starHolder' },
                     React.createElement('img', { src: starEmpty,
                        className: 'star',
                        alt: 'Reaction Time Star'
                     }),
                     React.createElement('img', { src: starEmpty,
                        className: 'star',
                        alt: 'Reaction Time Star'
                     }),
                     React.createElement('img', { src: starEmpty,
                        className: 'star',
                        alt: 'Reaction Time Star'
                     })
                  ),
                  React.createElement(
                     'div',
                     { className: 'starHolder',
                        style: { position: 'absolute' } },
                     React.createElement('img', { src: starFilled,
                        className: 'star',
                        alt: 'Reaction Time Star',
                        style: {
                           opacity: this.props.star0,
                           transition: this.props.starTransition
                        }
                     }),
                     React.createElement('img', { src: starFilled,
                        className: 'star',
                        alt: 'Reaction Time Star',
                        style: {
                           opacity: this.props.star1,
                           transition: this.props.starTransition
                        }
                     }),
                     React.createElement('img', { src: starFilled,
                        className: 'star',
                        alt: 'Reaction Time Star',
                        style: {
                           opacity: this.props.star2,
                           transition: this.props.starTransition
                        }
                     })
                  )
               ),
               React.createElement(
                  'div',
                  { id: 'previousAttemptsHolder' },
                  React.createElement(
                     'p',
                     { className: 'gameMarginRight' },
                     React.createElement(
                        'b',
                        null,
                        '1 \u2013 ',
                        attempts10[0] ? attempts10[0] : ''
                     )
                  ),
                  React.createElement(
                     'p',
                     { className: 'gameMarginRight' },
                     React.createElement(
                        'b',
                        null,
                        '2 \u2013 ',
                        attempts10[1] ? attempts10[1] : ''
                     )
                  ),
                  React.createElement(
                     'p',
                     { className: 'gameMarginRight' },
                     React.createElement(
                        'b',
                        null,
                        '3 \u2013 ',
                        attempts10[2] ? attempts10[2] : ''
                     )
                  ),
                  React.createElement(
                     'p',
                     { className: 'gameMarginRight' },
                     React.createElement(
                        'b',
                        null,
                        '4 \u2013 ',
                        attempts10[3] ? attempts10[3] : ''
                     )
                  ),
                  React.createElement(
                     'p',
                     { className: 'gameMarginRight' },
                     React.createElement(
                        'b',
                        null,
                        '5 \u2013 ',
                        attempts10[4] ? attempts10[4] : ''
                     )
                  ),
                  React.createElement(
                     'p',
                     { className: 'gameMarginRight' },
                     React.createElement(
                        'b',
                        null,
                        '6 \u2013 ',
                        attempts10[5] ? attempts10[5] : ''
                     )
                  ),
                  React.createElement(
                     'p',
                     { className: 'gameMarginRight' },
                     React.createElement(
                        'b',
                        null,
                        '7 \u2013 ',
                        attempts10[6] ? attempts10[6] : ''
                     )
                  ),
                  React.createElement(
                     'p',
                     { className: 'gameMarginRight' },
                     React.createElement(
                        'b',
                        null,
                        '8 \u2013 ',
                        attempts10[7] ? attempts10[7] : ''
                     )
                  ),
                  React.createElement(
                     'p',
                     { className: 'gameMarginRight' },
                     React.createElement(
                        'b',
                        null,
                        '9 \u2013 ',
                        attempts10[8] ? attempts10[8] : ''
                     )
                  ),
                  React.createElement(
                     'p',
                     { className: 'gameMarginRight' },
                     React.createElement(
                        'b',
                        null,
                        '10 \u2013 ',
                        attempts10[9] ? attempts10[9] : ''
                     )
                  )
               )
            ),
            React.createElement(
               'a',
               { href: '' },
               React.createElement('img', { src: logo,
                  id: 'logoLink',
                  alt: 'Executive Functioning Trainer Logo' })
            ),
            React.createElement(
               'div',
               { id: 'lowerTextHolder' },
               React.createElement(
                  'p',
                  { id: 'howToPlayHeader' },
                  'HOW TO PLAY: '
               ),
               React.createElement(
                  'ul',
                  { id: 'howToPlayListHolder' },
                  React.createElement(
                     'li',
                     { className: 'listSetting' },
                     'Click on the button once it turns green.'
                  ),
                  React.createElement(
                     'li',
                     { className: 'listSetting' },
                     'Get a reaction time better than your "current goal" to earn a star.  Gain three stars to lower your "current goal" by 10ms.  Your "lowest goal" is the lowest "current goal" you\'ve had so far while playing the game.'
                  ),
                  React.createElement(
                     'li',
                     { className: 'listSetting' },
                     'If you react slower than your "current goal", you lose ALL of your stars. Also, your "current goal" is raised by 10ms. Hitting the button too early will have the same effect.'
                  ),
                  React.createElement(
                     'li',
                     { className: 'listSetting' },
                     'Press the "Escape" key to pause the game or take a break (pausing will also restart any attempt, so you don\'t have to worry about pausing when the button is red or green).'
                  )
               ),
               React.createElement(
                  'p',
                  { className: 'otherHeader' },
                  'ABOUT THIS GAME: '
               ),
               React.createElement(
                  'ul',
                  { className: 'otherListHolder' },
                  React.createElement(
                     'li',
                     { className: 'listSetting' },
                     'You might notice that your reaction times in this test are somewhat slower than in other reaction time tests.  This is for two reasons. First, this reaction time test uses a wider, less predictable time-window than usual (between 1-6 seconds).  Second, it gives you very little rest in-between attempts. Thus, it requires you to sustain attention over long periods of time with few breaks, thereby practicing your sustained attention capabilities alongside reaction speed.'
                  ),
                  React.createElement(
                     'li',
                     { className: 'listSetting' },
                     'It should be warned that reaction times can only be improved to a limited degree.  Furthermore, for many people, the best way to improve reaction times is NOT by training, but instead by fixing an unhealthy lifestyle via exercise, nutrition, and sleep.'
                  ),
                  React.createElement(
                     'li',
                     { className: 'listSetting' },
                     'This reaction time test has been "gamified" to make it more fun to play, and earning and losing "stars" is an example of ',
                     React.createElement(
                        'a',
                        { target: '_blank', rel: 'noreferrer', href: 'https://en.wikipedia.org/wiki/Operant_conditioning' },
                        'operant conditioning'
                     ),
                     '. However, operant conditioning will not improve your reaction times any better than regular practice would. Instead, it ONLY increases motivation to play the game.'
                  ),
                  React.createElement(
                     'li',
                     { className: 'listSetting' },
                     'The accuracy of this Reaction Time Trainer is limited by your monitor\'s refresh rate.  For example, a monitor with a refresh rate of 60hz and an input lag of 6ms would record reaction times with a latency randomly varying from 6-22.667ms (via a uniform distribution).'
                  )
               ),
               React.createElement(
                  'p',
                  { className: 'otherHeader' },
                  'ABOUT OUR SERVICES: '
               ),
               React.createElement(
                  'ul',
                  { className: 'otherListHolder' },
                  React.createElement(
                     'li',
                     { className: 'listSetting' },
                     'This website is in construction.  Stop by later when it is finished to learn more about how you can train your executive functioning through our services!'
                  )
               )
            )
         );
      }
   }]);

   return ReactionTimePresenter;
}(React.Component);

export default ReactionTimePresenter;