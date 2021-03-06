var _ = require("lodash");
var Bacon = require("baconjs");

var Interact = module.exports;

Interact.ask = function (question) {
  var readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return Bacon.fromCallback(_.partial(readline.question.bind(readline), question)).doAction(readline.close.bind(readline));
};

Interact.confirm = function(question, rejectionMessage, answers) {
  var defaultAnswers = ["yes", "y"];
  var expectedAnswers = typeof answers === "undefined" ? defaultAnswers :  answers;
  return Interact.ask(question).flatMapLatest(function(answer) {
    if(_.includes(expectedAnswers, answer)) {
      return true;
    } else {
      return new Bacon.Error(rejectionMessage);
    }
  });
};
