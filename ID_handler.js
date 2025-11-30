//The purpose of this file is to handle the data being sent to pavlovia from completing the videogames and n-back task.

//get an html/url variable 
//store it in local storage so we can access it when we get all the data

//https://www.sitepoint.com/get-url-parameters-with-javascript/ 

const queryString = window.location.search; //gets entire query string
console.log(queryString); //prints it

const urlParams = new URLSearchParams(queryString); //makes the query string searchable 

const user_id = urlParams.get('id')
console.log(user_id);
localStorage.setItem("UserID", user_id)

//initializes jsPsych
const jsPsych = initJsPsych();

function sendData(gameType) {
    //takes most recent version of data to send 
    var totalDeaths = localStorage.getItem("totalDeaths")
    var totalTime = localStorage.getItem("totalTime")
    var control_deaths = localStorage.getItem("Deaths")
    var control_highscore = localStorage.getItem("HighScore")

    var oneback_tp = localStorage.getItem("oneback_tp")
    var oneback_fn = localStorage.getItem("oneback_fn")
    var oneback_fp = localStorage.getItem("oneback_fp")
    var oneback_avgRT_TP = localStorage.getItem("oneback_avgRT_TP")
    var oneback_avgRT_FP = localStorage.getItem("oneback_avgRT_FP")

    var twoback_tp = localStorage.getItem("twoback_tp")
    var twoback_fn = localStorage.getItem("twoback_fn")
    var twoback_fp = localStorage.getItem("twoback_fp")
    var twoback_avgRT_TP = localStorage.getItem("twoback_avgRT_TP")
    var twoback_avgRT_FP = localStorage.getItem("twoback_avgRT_FP")

  // Current date, year, and format it
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = date.getFullYear();
    const formattedDate = dd + '-' + mm + '-' + yyyy;

  // Current time, and format it (just to see when something was submitted)
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedTime = hours + ":" + minutes + ":" + seconds;

  // Process data for Pavlovia
    jsPsych.data.get().trials = []

    const delimiter = ";" // This determines how multiple values in one cell are separated from each other.

  //saves the data in pavlovia
    roundData = {
        ext_id:                     user_id ? user_id: undefined,
        date:                       formattedDate,
        time:                       formattedTime,
        avg_deaths:                 totalDeaths, //avg deaths
        avg_totaltime:              totalTime, //avg total time
        control_highscore:          control_highscore, //tetris highscore
        control_deaths:             control_deaths, //tetris deaths

        oneback_tp:                 oneback_tp, //1back correct scores
        oneback_fn:                 oneback_fn,
        oneback_fp:                 oneback_fp,
        oneback_avgRT_TP:           oneback_avgRT_TP,
        oneback_avgRT_FP:           oneback_avgRT_FP,

        twoback_tp:                 twoback_tp, //2back scores
        twoback_fn:                 twoback_fn, 
        twoback_fp:                 twoback_fp,
        twoback_avgRT_TP:           twoback_avgRT_TP,
        twoback_avgRT_FP:           twoback_avgRT_FP

        }
    jsPsych.data.get().trials.push(roundData)


  // Connect to Pavlovia
  let timeline = []
  var pavlovia_init = {
    type: jsPsychPavlovia,
    command: "init"
  }
  timeline.push(pavlovia_init)

  // Send data
  var pavlovia_finish = {
    type: jsPsychPavlovia,
    command: "finish",
    participantId: user_id,
    gameType: gameType
  };
  timeline.push(pavlovia_finish);

  // Execute timeline (connecting and sending)
  jsPsych.run(timeline);
}
