const inquirer = require('inquirer');
const {askQuery, tweets, spotifyThisSong, movieThis, doWhatItSays, addRandom, getRanEvNum} = require('./utils')

//--------------------------------------------------- //

// Run the program
const runProg = () => {
	inquirer.prompt([
			{
				type: "list",
				name: "command",
				message: "What command do you want to use?",
				choices: ["tweets=> search twitter for users/topics", "spotify-this-song=> search spotify for songs", "movie-this=> search imdb for movie information", "do-what-it-says=> run a random command/search", "add-command=> add a command/search to the do-what-it-says list"]
			},
	]).then((input) => {
		switch (input.command) {
			case "tweets=> search twitter for users/topics":
			  askQuery(tweets)
			  break;
			case "spotify-this-song=> search spotify for songs":
			  askQuery(spotifyThisSong);
			  break;
			case "movie-this=> search imdb for movie information":
			  askQuery(movieThis);
			  break;
			case "do-what-it-says=> run a random command/search":
			  doWhatItSays();
			  break;
			case "add-command=> add a command/search to the do-what-it-says list":
			  addRandom();
			  break
			default:
			  console.log("Invalid Request");
		};
	})
}

//--------------------------------------------------- //


runProg();