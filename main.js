// JS global variables used in Exercise page
var lessonKP = 0;
var correctKUinTU = 0;
var isMsgAdded = false;
var closureAnimationTimeLine = anime.timeline({}); // global closure anime timem line to allow pause 

var totalLessonSeconds = null;
var timer = null;
var timePaused = null;
var isPausedLesson = false;

var isSchoolStudent;
var lessonStartTimeUTC = 0; // in server time
var lessonEndTimeUTC = 0;   // in server time
var serverClientTimesDiff = 0; // server time minus client time

var JSisUsertup = false;
var JSisTestPrep = false;
var JSisDemoAccount = false;
var isCreatingTUsForMachsan = false;

var allowNTUtimeout = true;
var JSComputeNextTUNeeded = true;

var TUindexOfCurClientTUTUindexOfCurClientTU = -1;
var clientTUs = new Array();
var lastUsedClientTU = -1;
var JSCurClilTU = 0;
var displayTUTimeoutId = -1;
var displayTUstage = "";

var JSLastAjaxCall = { name: "", time: 0, length: 0 };

var skipAnimation = false;

var expFormated = [];

// time to wait for audio loading, in miliseconds. 
// We expect the audio to start after less than 4 seconds, and to end after less than 12 seconds.
// If this does not happen, we conclude that the audio is stuck, and we do F5 (or reload the audio tag).
var audioExpEndTime = 12000;
var audioExpStartTimeShort = 2000;
var audioExpStartTimeLong = 4000;
//var JSaudioFormat = BrowserShouldUseMpeg() ? ".mp3" : ".ogg";
var JSaudioFormat = ".mp3";
var timeAudioShouldStarPlay = -1;
var audioCheckStartShortTimeoutId = -1;
var audioCheckStartLongTimeoutId = -1;
var audioCheckEndTimeoutId = -1;
var waitForTUAudioIntervalId = -1;
var audioTagReloaded = false;
var dictatePlaybackRate = 0.85;
var normalPlaybackRate = 1;
var tssPlaybackRateFactor = 1.1;
var lastTSAudio = 0;

var JSCurTU = { TUindex: 0, TUtype: "", TS: "", isTryIt: false, icon: "", mustHaveImage: false, newAward: "", translationForFeedback: "", L1: "", normalRate: normalPlaybackRate, dictateRate: dictatePlaybackRate, normalRateTSS: [], wasInFeedbackPage: false, isDialogTSS: false };
var JSRCPlaceholderTU;
var JSFWPlaceholderTU;
var TSlength = -1;
var isSecondChance = "NoHelp";
var correctType = "None";
var KPforThisTU = 0;
var isTextTU = false;
var isTSwithAudio = false;
var isTSSwithAudio = false;
var img = null;
var isTooShortScreen = false;

//for dialogue
var isDialogue = false;
var recorderGender1 = "M";
var recorderGender2 = "F";
var currentTSS = [];

//for grammar TU
var grammarParams = { textDir: "", header: "", explanation: "", example: "", bank: "" };

var JS_MAX_NUM_OF_TUS_IN_USERTUP = 0;
var JS_LAST_TU_IN_CLIL_TRIAL = 0;
var JS_LAST_TU_IN_DEMONSTRATION = 0;
var usertupJapaneseSecName = "春花ちゃん";
var usertupKoreanSecName = "박지훈";
var usertupHebrewSecName = "נועה";
var changeTupNameAfterTU = -1;

var checkBtnPressedCanCall = true;
var checkBtnPressedWaitTimer = 2500;

/* track emptyAnswer 
 * we need to track empty answer to enable or disable the check button
 */
var emptyAnswer = true;

/* current audio*/
var currentAudio = {
    playRate: 1
}

/* timer */

var hours = minutes = seconds = milliseconds = "0" + 0;
var startTime = null;
var elapsed = 0;
var pauseTime = null;
var chronometer = null;
var isRunning = true;
var lastPauseTime = null;
var TUWorkingSeconds = 0;
var TotalWorkingSeconds = 0;
var TUWorkSecondsBetweenPause = 0;
var TUWorkTime = null;
var rollBackTime = 0;


var EXERCISE_PARTS = {
    EXERCISE: 0,
    FEEDBACK: 1,
    CLOSURE: 2,
    PROGRESS_ANIMATION: 3,
    CHECK_ANSWER: 4
};
var curExercisePart = EXERCISE_PARTS.EXERCISE;

var CQWordNumHintPattern = /\([0-9].*\)$/; // brackets with any text inside, the text starts with a digit


var JS_TIME_BETWEEN_PROGRESS_REPORT = 300000; // in milliseconds

var hintButtonPressed = false; //flag used to not show secound chance tooltip

function JSTimeNowInServer() {
    return Date.now() + serverClientTimesDiff;
}

var JSisQuizDemo = false;
var isQuizTime = false;
var isTracingUser = false;
var JSLessonType = 1;

//demonstration mode

var JSCurDemonstrationTU = 0;
var JSnextDemonstrationTU = 0;

var JSDemonstrationLA = { correctLA: "", incorrectLA: "", answerType: "" };

// azure
var SpeechSDK;
var recognizer;
var SpeechSubscriptionKey;

var bullet = `<span class='bullet'> <img id='bullet_img' src='${s3ExerciseImages}/blue_bullet.svg' alt='' /></span>`;
var bullet_old = "<span class='bullet'>•</span>";
//trial account popups
var newUserPopUpMsg = "";

var FirstTextSBPopUpLbl = "";
var FirstTextSBPopUpMsg = "";

var firstTUOnOldKULbl = "";
var firstTUOnOldKUMsg = "";

var personalizedLearningLbl = "";
var personalizedLearningMsg = "";

var correctKUsLbl = "";
var corectKUsMsg = "";

var speakTULbl = "";
var speakTUMsg = "";

var clilStartLessonLbl = "";
var clilStartLessonMsg = "";


var demonstrationFirstLessonLbl = "";
var demonstrationFirstLessonMsg = "";


var clilFirstTextSBPopUpLbl = "";
var clilFirstTextSBPopUpMsg = "";

var clilNewSubjectPopUpLbl = "";
var clilNewSubjectPopUpMsg = "";

//varibles for tracing log that are sending to S3. 
//The log, logTextStr,  based on tracingLogArray is sent when any exit from JSExercise is occured or after EXERCISE_COUNT_TO_SEND_LOG times
var EXERCISE_COUNT_TO_SEND_LOG = 10;
var tracingCount = EXERCISE_COUNT_TO_SEND_LOG;
var tracingLogArray = new Array();
var logTextStr = "";
var logSentBeforeEndOfLesson = false;
var almostFactor = 90000; //90 seconds in milliseconds

var isBindEnterInExercise = true;

var userL1;

var motivationMsgs = ["Well done!", "Fantastic work!", "Terrific job!", "Awesome!", "Unbelievable!", "Amazing job!",
    "Beautiful job!", "Fantastic!", "Fabulous!", "Great job!", "Wonderful!", "Keep it up!", "Awesome job!", "Terrific!"];

var hideHintDomain = ["Speak", "DialogSpeak", "TextSpeak", "SORT", "GrammarSORT", "CQ", "RepeatLKU", "Dictate"];

var hideSkipDomain = ["GrammarSB", "GrammarSORT"];

// for preventing using keyboard suggestions on tablets
var tbxStrln = 0;
var prevTbxVal = "";

//second chance msg
var second_chance_msg = '';

//mobile keyboard watcher
//save the screen size
let fullWindowHeight = window.innerHeight;
let keyboardIsProbablyOpen = false;

// lesson type enum
const LessonType = {
    School: "1",
    Trial: "2",
    UserTUP: "3",
    Demonstration: "4",
    Assessment: "5",
    LFA: "6",
    AssessmentPractice: "7",
    TrialLesson: "8"
}

Object.freeze(LessonType);

var JSSchoolIndex = -1;
var JSNetworkId = -1;

var JSIsWhiteLabel = false;

// Pauses and length in long speak exercsies
var allowPauseInRecord = false;
var allowLongerRecordingTime = false;
const recordingTime = 25000;

// AWS Configuration
var bucketRegion = "us-west-2";

var quizSummaryText = "";

window.addEventListener("resize", function () {
    if (window.innerHeight >= fullWindowHeight) {
        keyboardIsProbablyOpen = false;
        JSShowExerciseHeader();
        $('.exercise-info img').css('width', '100%');
    } else if (window.innerHeight < fullWindowHeight * 0.9) {
        keyboardIsProbablyOpen = true;


        setTimeout(function () { document.activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' }) }, 700);



        //resize image on keyboard openning only if it's not srinked yet
        if ($('.exercise-info img').width() > 100 && window.innerWidth < 768) {
            //hide the exercise header
            JSHideExerciseHeader();
            $('.exercise-info img').css('width', '100px');
        }

    }
});


function SetPopUpsText() {
    //trial account popups
    newUserPopUpMsg = bullet + "  " + GetInUILang(UILang, "We’re just getting to know you. As you learn, MagniLearn learns!") + "\n"
        + bullet + "  " + GetInUILang(UILang, "We have sped up the process so that you can experience our product's capabilities.") + "\n"
        + GetInUILang(UILang, "As you progress, our algorithms adapt and create unique and complex exercises.");

    FirstTextSBPopUpLbl = GetInUILang(UILang, "We teach vocabulary and grammar in context!");
    FirstTextSBPopUpMsg = bullet + "  " + GetInUILang(UILang, "A single exercise targets several language items.") + "\n\n"
        + bullet + "  " + GetInUILang(UILang, "Don’t worry if your answers are not perfect!") + " \n " + GetInUILang(UILang, "Keep Going! We will make sure to repeat materials that were not mastered.");

    firstTUOnOldKULbl = GetInUILang(UILang, "Let’s practice some things we have already learned!");
    firstTUOnOldKUMsg = bullet + "  " + GetInUILang(UILang, "Practicing makes a difference! This is the way your language abilities are strengthened in your brain.") + "\n\n"
        + bullet + " " + GetInUILang(UILang, "Using your Personal Knowledge Map, our algorithms optimize the review of each vocabulary word, expression, and grammatical pattern.");

    personalizedLearningLbl = GetInUILang(UILang, "100% Personalized Learning!");
    personalizedLearningMsg = bullet + "  " + GetInUILang(UILang, "This lesson was created especially for you!")
        + " \n" + GetInUILang(UILang, "Exercises are generated in real-time according to each student's needs.") + "\n\n" +
        bullet + "  " + GetInUILang(UILang, "Lessons for two students are never identical!");

    correctKUsLbl = GetInUILang(UILang, "Together we are learning from mistakes");
    corectKUsMsg = bullet + "  " + GetInUILang(UILang, "It is not just about “right” or “wrong”. We analyze each piece of the learner’s response to provide personalized feedback.") + "\n\n" +
        bullet + "  " + GetInUILang(UILang, "We learn from your mistakes and near misses to speed up your improvement!");

    speakTULbl = GetInUILang(UILang, "Speaking is essential when learning a language!");
    speakTUMsg = bullet + "  " + GetInUILang(UILang, "Voice exercises include recording, listening, and receiving pronunciation feedback. Our students love it!");

    clilStartLessonLbl = GetInUILang(UILang, "Let’s learn about the environment!");
    clilStartLessonMsg = GetInUILang(UILang, "MagniLearn CLIL teaches language at the same time as it teaches content from a different subject.") +
        "\n\n" + GetInUILang(UILang, "We will now enhance the learning of English and biology!");


    demonstrationFirstLessonLbl = GetInUILang(UILang, "Demo Mode For Partners!");
    demonstrationFirstLessonMsg = bullet + " " + GetInUILang(UILang, "This account was built for potential partners only, to illustrate a real lesson scenario in demo mode.You can choose correct or incorrect answers and see how the lesson dynamically evolves accordingly.") +
        "\n\n" + bullet + " " + GetInUILang(UILang, "This account was developed to provide you with a quick glance at some of the product’s features. Students in real lessons compose their own answers.");


    clilFirstTextSBPopUpLbl = GetInUILang(UILang, "Contextual English teaching");
    clilFirstTextSBPopUpMsg = bullet + " " + GetInUILang(UILang, "MagniLearn promotes the acquisition of an extensive, varied vocabulary while simultaneously teaching scientific concepts to make your learning more effective!") +
        "\n\n" + bullet + " " + GetInUILang(UILang, "Practice makes a difference!") +
        "\n" + GetInUILang(UILang, "Language and content-based teaching strengthens your brain's natural ability to absorb the knowledge.");

    clilNewSubjectPopUpLbl = GetInUILang(UILang, "Let’s learn about the chemistry!");
    clilNewSubjectPopUpMsg = GetInUILang(UILang, "MagniLearn can integrate any subject into its English language learning lessons.")
        + "\n\n" + GetInUILang(UILang, "Let's now learn some chemistry!");

}

/////////////////////////////////////////////////////////////////////////////////////////
// JSStartLesson
// Called when a new lesson starts: creates the ringtone element, and gets the first TU.
/////////////////////////////////////////////////////////////////////////////////////////
function JSStartLesson(isTrialFirstLesson) {
    var timeBeforeCall = Date.now();
    var istr = "type=start_lesson&audioFormat=" + JSaudioFormat;
    istr += JSAddLACParams();
    $.ajax({
        type: "POST",
        url: "UpdateLMStartLesson.aspx",
        data: istr,
        async: false,
        success: function (data) {
            if (JSisDemonstrationMode && !isQaLoadMode) {
                JSupdatePopupsTable("trial_new_user", 1);
                JSGotItPopup(demonstrationFirstLessonLbl, demonstrationFirstLessonMsg, function () { JSResetPopupDirection(); JSGetFirstTU(data, timeBeforeCall); });
            }
            else if (isTrialFirstLesson || ((JSLessonType == LessonType.School || JSLessonType == LessonType.Trial) && JSisGETAccount && JSisAssessmentAccount)) {
                // update menu - now that the lesson starts, add "End Lesson" item
                $('#end_lesson_item').show();
                JSupdatePopupsTable("trial_new_user", 1);
                JSGotItPopup(GetInUILang(UILang, "Keep in mind!"), newUserPopUpMsg, function () { JSResetPopupDirection(); JSGetFirstTU(data, timeBeforeCall); });
            }
            else if (JSisClilTrial && !isQaLoadMode) {
                JSupdatePopupsTable("trial_new_user", 1);
                JSGotItPopup(clilStartLessonLbl, clilStartLessonMsg, function () { JSResetPopupDirection(); JSGetFirstTU(data, timeBeforeCall); });
            }
            else
                JSGetFirstTU(data, timeBeforeCall);
        },
        error: function (xhr, status, error) {
            JSSendLogToS3("start_lesson failed error: " + error);
            JSHandleAjaxError(xhr, status, error);
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSShowProductVideoBeforeLesson
// shows the product video if needed - if it's the first lesson (no TUs were given yet)
// (called only in trial accounts)
/////////////////////////////////////////////////////////////////////////////////////////
function JSShowProductVideoBeforeLesson() {
    var istr = "type=get_user_num_of_tu";
    $.ajax({
        type: "POST",
        url: "UpdateLMInfo.aspx",
        data: istr,
        async: false,
        success: function (data) {
            if (parseInt(data) == 0) {
                JSLoadVideoByLang(userL1);
                // The video plays before lesson starts. Ending lesson in this stage has no logic
                $('#end_lesson_item').hide();
                $('#product_video_popup').show();
                $('#product_video_popup_overlay').show();
                $("#product_video").prop("disabled", false);
                if (JSIsSupportedBrowser() == "safariOnMac" ||
                    JSIsSupportedBrowser() == "ipad" ||
                    isAndroid())
                    $('.video-play').hide();
                JSupdatePopupsTable("trial_product_video", 1);
                JSSetContentHeight();
            }
            else
                JSStartLesson(false);
        },
        error: function (xhr, status, error) {
            JSSendLogToS3("next_ex ajax reached error: " + error);
            JSHandleAjaxError(xhr, status, error);
        }
    });

}

/////////////////////////////////////////////////////////////////////////////////////////
// JSLoadVideoByLang
// closes the product video popup and starts a lesson
/////////////////////////////////////////////////////////////////////////////////////////
function JSLoadVideoByLang(userL1) {

    var videoSource = "https://d1iqyql2sq5e3i.cloudfront.net/Videos/2022-07/The%20Product%20English%20Subs.mp4";

    switch (userL1) {
        case "K":
            videoSource = "https://d1iqyql2sq5e3i.cloudfront.net/Videos/2022-07/The%20Product%20Korean%20Subs.mp4";
            break;
        case "H":
            videoSource = "https://d1iqyql2sq5e3i.cloudfront.net/Videos/2022-07/The%20Product%20Hebrew%20Subs.mp4";
            break;
        case "J":
            videoSource = "https://d1iqyql2sq5e3i.cloudfront.net/Videos/2022-07/The%20Product%20Japanese%20Subs.mp4";
            break;
        case "M":
            videoSource = "https://d1iqyql2sq5e3i.cloudfront.net/Videos/TrialProductVideos/The%20Product%20Mandarin%20Subs.mp4";
            break;
    }

    if (JSNetworkPromotionalVideoUrl) {
        videoSource = JSNetworkPromotionalVideoUrl;
    }

    var video = $("#product_video");
    video.find("source").attr("src", videoSource);

    video[0].load();
    video[0].play();
}
/////////////////////////////////////////////////////////////////////////////////////////
// JScloseProductVideo
// closes the product video popup and starts a lesson
/////////////////////////////////////////////////////////////////////////////////////////
function JScloseProductVideo() {
    $('#product_video').get(0).pause();
    $("#product_video").prop("disabled", true);
    $('#product_video_popup').hide();
    $('#product_video_popup_overlay').hide();
    JSSetContentHeight();
    JSStartLesson(true);
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSGetFirstTU
// When returning from start_lesson:
// 1. Write problem report if it is a result of an F5.
// 2. Display the PI.
// 3. Save client TUs.
// 4. Get first TU.
///////////////////////////////////////////////////////////////////////////////////////////
function JSGetFirstTU(data, timeBeforeCall) {
    JSUpdateLastAjaxCall("start_lesson", timeBeforeCall);
    JSClearDisplayTUInterval();
    if ((data == null) || (data.indexOf("Internal error:") != -1) ||
        (data.indexOf("Operation failed:") != -1) || (data.indexOf(JSSorryMsg) != -1)) {
        JSMessagePopup(true, GetInUILang(UILang, "Alert!"), data);
        return;
    }

    if (data.indexOf("Your session has expired") != -1) {
        JSMessagePopup(true, GetInUILang(UILang, "Alert!"), data, function () {
            window.location.assign("Login.aspx");
        });
    }

    var lesson_jv_object = JSSecureJsonEval(data);

    var isPageLoadedByF5 = (lesson_jv_object.is_new_lesson == "False");
    if (isPageLoadedByF5) // page loaded by F5
        JSSaveProblemForDebug("JSDisplayPIFromHistory: Learning page reloaded.", true);

    JSUpdateKPInFooter(lesson_jv_object.lesson_kp);
    lessonKP = parseInt(lesson_jv_object.lesson_kp);
    // update the S3 data after it was created in StartLesson
    S3Token = lesson_jv_object.S3Token;
    S3IdentityId = lesson_jv_object.S3IdentityId;

    // there might be difference between the time of the client and of the server,
    // we must always work with server time (since we might loose client variables in F5)
    // therefore whenever the page is loaded, we compute the difference between the server and client time,
    // and then if we need to know the current time, we ask the client, and add to it this delta.
    // This assumes that there might be difference between the time of the client and of the server,
    // but this delta is constant during the lesson.
    lessonStartTimeUTC = lesson_jv_object.lesson_start_time_utc;
    lessonEndTimeUTC = lesson_jv_object.lesson_end_time_utc;
    serverClientTimesDiff = lesson_jv_object.current_time_utc - Date.now();

    // start the time progress bar
    $('#time-progress-bar-chart').easyPieChart({
        size: 180,
        barColor: '#FFFFFF',
        scaleColor: 'transparent',
        scaleLenght: 5,
        lineWidth: 18,
        trackColor: "#828282"
    });

    window.addEventListener('resize', function () {
        JSUpdateProgressChart();
    }, true);


    var distance = lessonEndTimeUTC - Date.now();
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    totalLessonSeconds = (minutes * 60) + seconds;

    //timer = JSSetHeaderClock(0);
    if (lesson_jv_object.time_diff) {
        let newTimeInMinutes = lesson_jv_object.time_diff / 60;
        let newTimeMinutes = Math.trunc(newTimeInMinutes);
        let newTimeSeconds = Math.trunc(Number((newTimeInMinutes - newTimeMinutes).toFixed(2)) * 60);

        TotalWorkingSeconds = (lesson_jv_object.time_diff * 100);

        JSSetTimer(newTimeMinutes, newTimeSeconds);
    } else {
        JSGetReset();
    }


    JSGetStart();


    $('#progress_indicator').show();


    isCreatingTUsForMachsan = (lesson_jv_object.is_creating_tus_for_machsan == "True");
    // The cases that we do need TUs in the client are (1) when we create TUs for Machsan (2)  JSComputeNextTUNeeded = false
    // JSComputeNextTUNeeded is false when we do not want to prepare a TU before NextTU. 
    // This is the case when debugging, or in accounts where the TUs are predefined (e.g. usertup).
    //  Clil-Trial accounts are exception, since the TUs are predefined, but we give these accounts out, so we must have client TUs.
    // In this case the Client-TUs=pre-defined TUs (in clil_tus table).
    if ((!isCreatingTUsForMachsan && JSComputeNextTUNeeded) || JSisClilTrial)
        JSSaveClientTUs(lesson_jv_object);
    else
        allowNTUtimeout = false;

    // we keep the current clil TUindex in the client to be able to bring it from the client if needed
    if (JSisClilTrial)
        JSCurClilTU = lesson_jv_object.ClilTUIndex;
    if (JSisDemonstrationMode) {
        JSCurDemonstrationTU = lesson_jv_object.DemonstrationTUIndex;
        JSnextDemonstrationTU = lesson_jv_object.TUDemonstrationNextindex
    }


    JSGetNextTU(" JSGetFirstTU");
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSSaveClientTUs
// Saves in the JS array the TUs brought from the client, and set lastUsedClientTU to -1.
////////////////////////////////////////////////////////////////////////////////////////
function JSSaveClientTUs(lesson_jv_object) {
    var TUnum = lesson_jv_object.TUs_num;
    if (TUnum > 0) {
        clientTUs.length = 0;
        for (i = 0; i < TUnum; i++) {
            clientTUs.push(lesson_jv_object.TUs[i]);
            //alert("saving TU " + lesson_jv_object.TUs[i].TUindex);
        }
        lastUsedClientTU = -1;
    }
    else {
        allowNTUtimeout = false;
        JSSaveProblemForDebug("Failed to bring TUs from Macsan, not using timeout in NTU.", false);
    }
}

function removeHintsFromPartialAnswer(string) {
    return string.replace(/_\d+/g, '');
}

checkWaitTime = parseFloat(prompt("How long should the bot wait before checking?"));
continueMinWaitTime = parseInt(prompt("What is the mimimum wait time to continue after checking?"));
continueMaxWaitTime = parseInt(prompt("What is the maximum wait time to continue after checking?"));

function oldSolve(answer, partial) {
    if((!answer) || (!partial))
        return
    console.log("Partial:", partial);
    partial = removeHintsFromPartialAnswer(partial);
    answer = answer.split(" ");
    var placementCount = 0;
    for (var i = 0; i < answer.length; i++) {
        if (partial.indexOf(answer[i]) === -1) {
            $('input[type=text]').eq(placementCount).val(answer[i]).trigger('input');
            placementCount++;
        }
    }
    setTimeout(function() {
        JSCheckUserAnswer(false, false);
    }, checkWaitTime * 1000)
}

function solve(answer, partial) {
    const originalAnswer = answer;
    const originalPartial = partial;

    if((!answer) || (!partial))
        return
    answer = answer.split(" ");
    partial = partial.split(" ");

    let wordsContainingUnderscore = partial.filter(word => /_/.test(word));
    if((wordsContainingUnderscore.length == 1) && wordsContainingUnderscore[0] < 5) {
        oldSolve(originalAnswer, originalPartial);
        return
    }
    
    let lastAnswerIndex = 0;
    let mone = 0;

    for(let i = 0; i < partial.length; i++) {
        let partialWord = partial[i];
        
        if(!/_/.test(partialWord)) {
            lastAnswerIndex++;
            continue;
        }
        
        let nextPartialWord = partial[i + 1];
        let build = [];
        
        while (answer[lastAnswerIndex] !== nextPartialWord && lastAnswerIndex < answer.length) {
            let word = answer[lastAnswerIndex];
            // Removing commas and dots
            word = word.replace(/[.,!?]/g, '');
            build.push(word);
            lastAnswerIndex++;
        }
        
        $('input[type=text]').eq(mone).val(build.join(" ")).trigger('input');
        mone++;
    }
    $('input[type="text"]').each(function(index) {
        if($(this).val() == "") {
            console.log("the bot could not succuessfully fill all of the textboxes");
            JSGetNextTU();
            return;
        }
    });

    setTimeout(function() {
        JSCheckUserAnswer(false, false);
    }, checkWaitTime * 1000)
}

// if the practice is over, stimulate the button press in order to continue it.
function simulateButtonClick() {
    // Select the button using its class
    var button = document.querySelector('.sc-idiyUo.idEbqi');

    // Check if the button is found
    if (button) {
        // Simulate a click event on the button
        button.click();
        console.log("Button pressed.");
    } else {
        console.log('Button not found.');
    }
}

// Run the code every minute (60 seconds)
setInterval(simulateButtonClick, 60000); // 60000 milliseconds = 60 seconds

function getWorkingMinutes() {
    return fetch("https://learning.magnilearn.com/api/student/customGoal?initialDate=2023-09-03T00:00:00%2B03:00&endDate=2025-05-12T11:51:32%2B03:00", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Chromium\";v=\"124\", \"Opera\";v=\"110\", \"Not-A.Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://learning.magnilearn.com/Student.aspx",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data; // Return the parsed data
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}

function sendWebhookMessage(webhookUrl, message) {
    // Construct the request payload
    const payload = {
        content: message
    };

    // Make the POST request to the webhook URL
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send webhook message');
        }
        console.log('Webhook message sent successfully');
    })
    .catch(error => {
        console.error('Error sending webhook message:', error);
    });
}
function fetchStudentData() {
    const url = "https://learning.magnilearn.com/api/student/data";

    return fetch(url, {
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Chromium\";v=\"124\", \"Opera\";v=\"110\", \"Not-A.Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        referrer: "https://learning.magnilearn.com/Student.aspx",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch student data');
        }
        return response.json(); // Return the parsed JSON data
    })
    .catch(error => {
        console.error('Error fetching student data:', error);
    });
}

const webhookUrl = 'https://discord.com/api/webhooks/1228292507553501244/OHex7EbTyK1Taw0OZgRvvy4D35aNvSGP-GNvCpkoIKxk9kG7cmae4tY3JcjaCenEFggy';

function convertToMinutes(timeString) {
    // Split the string into hours and minutes
    const [hours, minutes] = timeString.split(':').map(Number);
    
    // Convert hours to minutes and add to the total
    const totalMinutes = hours * 60 + minutes;
    
    return totalMinutes;
}

goalHours = prompt("Enter the hours you want to reach (HH:MM) (EXAMPLE: 5:30)")
console.log(convertToMinutes(goalHours));

setInterval(function() {
    getWorkingMinutes().then((minutes) => {
        console.log("Returned data:", minutes);
        const workingMinutes = convertToMinutes(goalHours);
        if(workingMinutes < minutes) {
            location.href = "https://www.google.com";
        }
    });    
}, 60 * 1000);

const blacklistedTUTypes = ["TextSpeak", "DialogSpeak", "DialogText", "RC_word_bank", "RC_multiple_choice", "RC_highlight", "Speak"];

/////////////////////////////////////////////////////////////////////////////////////////
// JSGetNextTU
//param skipExercise will save that the current exercise was skiped in l_lh
/////////////////////////////////////////////////////////////////////////////////////////
function JSGetNextTU(caller, skipExercise) {
    TUWorkSecondsBetweenPause = 0;
    TUWorkingSeconds = 0;
    TUWorkingTime = Date.now();
    JSDisableNextButton();
    JSDisableClosureContinueButton();
    if (isTracingUser && JSIsAlmostEndOfLesson()) {
        JSSendLogToS3("almost end of lesson");
    }

    // TODO: fix issue here
    if (!JSisUsertup && JSIsEndOfLessonV2() && caller !== " JSGetFirstTU") { // if it's usertup, we don't end lesson because of lesson-time, only when the TUs end
        JSBeforeEndOfLesson();
        return;
    }
    // get next TU
    if (displayTUTimeoutId != -1)
        JSReportDisplayTUProblem("and we're again in JSGetNextTU " + caller);
    displayTUstage = "before_next_ex";
    displayTUTimeoutId = self.setTimeout(function () { JSReportDisplayTUProblem("after 1 minute") }, 60000);
    var istr = "type=next_ex";
    istr += "&clientUserName=" + UserName;
    istr += JSAddLACParams();

    if (skipExercise) {
        istr += "&skipExercise=true";
    } else {
        istr += "&skipExercise=false";
    }

    JSTracingLog("before next_ex caller: " + caller);
    var timeBeforeNTU = Date.now();
    // allowNTUtimeout = false; for debug only
    if (allowNTUtimeout) {
        $.ajax({
            type: "POST",
            url: "UpdateLMNext.aspx",
            data: istr,
            async: true,
            success: function (data) {
                console.log("success");
                
                JSBackFromNextTU(data, timeBeforeNTU, caller); 
                newData = JSON.parse(data);

                if(blacklistedTUTypes.indexOf(newData.task_type) != -1) {
                    JSGetNextTU();
                }
                console.log(newData);
                let taskType = newData["task_type"];
                let crackedAnswer;
                try {
                    crackedAnswer = atob(newData["TS"]);
                } catch (error) {
                    JSGetNextTU();
                }

                let partialAnswer = newData["partial_answer"];

                if (Array.isArray(newData["TS"])) {
                    // If newData["TS"] is an array
                    newData["TS"].forEach(function(item) {
                        console.log(atob(item));
                        console.log(newData["partial_answer"]);
                        if((taskType == "SORT") || (taskType == "CQ")) {
                            console.log("old solve");
                            oldSolve(crackedAnswer, partialAnswer);
                        } else {
                            solve(crackedAnswer, partialAnswer);
                        }
                    });
                } else {
                    // If newData["TS"] is a single value
                    console.log(atob(newData["TS"]));
                    console.log(newData["partial_answer"]);
                    if((taskType == "SORT") || (taskType == "CQ")) {
                        console.log("old solve");
                        oldSolve(crackedAnswer, partialAnswer);
                    } else {
                        solve(crackedAnswer, partialAnswer);
                    }
                }
            },
            //success: function (data) { JSTestNTUError(timeBeforeNTU); },
            error: function (xhr, status, error) {
                console.log("Error:", error);
                JSGetNextTU();
                //JSSendLogToS3("next_ex ajax reached error: " + error);
                //JSHandleNTUAjaxError(xhr, status, error, timeBeforeNTU);
            },
            timeout: 10 * 1000  // 5000
        });
    }
    else {
        $.ajax({
            type: "POST",
            url: "UpdateLMNext.aspx",
            data: istr,
            async: true,
            success: function (data) { JSBackFromNextTU(data, timeBeforeNTU, caller); },
            error: function (xhr, status, error) {
                JSSendLogToS3("next_ex ajax reached error: " + error);
                JSHandleAjaxError(xhr, status, error);
            }
        });
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSHandleNTUAjaxError
// We get here if NTU ajax call returned with error.
// We log the problem, and bring a client TU.
////////////////////////////////////////////////////////////////////////////////////////
function JSHandleNTUAjaxError(xhr, status, error, timeBeforeNTU) {
    displayTUstage = "JSHandleNTUAjaxError";
    var isExpectedErr = (error == "timeout");
    JSSaveProblemForDebug("Ajax failed for next_ex: error code = " + xhr.status + " status=" + status + "  error=" + error, isExpectedErr);
    JSUpdateLastAjaxCall("next_ex", timeBeforeNTU);
    JSTracingLog("after next_ex with error");
    JSHandleNTUError();
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSHandleNTUError
// We get here if NTU returned with error.
// We bring a client TU, i.e. a TU from the machsan that is already in the client.
////////////////////////////////////////////////////////////////////////////////////////
function JSHandleNTUError() {
    if (!isCreatingTUsForMachsan && allowNTUtimeout) {
        var jv_object = (JSisClilTrial || JSisDemonstrationMode) ? JSGetHCTUInClient() : JSGetTUInClient();
        if (isQuizTime) {
            jv_object.isQuizTime = "True";
        }
        TUindexOfCurClientTU = jv_object.TUindex;
        curExercisePart = EXERCISE_PARTS.EXERCISE;
        JSDisplayNextTU(jv_object);

        $('#exercise-monitor, #grammar-pre-info').animate(
            { bottom: '0%' },
            1000,
            function () {
                if (rollBackTime !== 0 && !JSisAssessmentAccount) {
                    JSTimerRollBack(rollBackTime);
                }
            }
        );
        if (screen.width < 580) {
            $('#user_feedback_toggle').animate(
                { opacity: '1' },
                1000,
                function () {
                }
            );
        }
        if (JSisAssessmentAccount && screen.width >= 1200) {
            $('.timer-minutes').parent().delay(850).animate({ opacity: '1' }, 250);
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSHandleNTUJsonError
// We get here if the Json returned from the NTU is invalid.
// We log the problem, and bring a client TU.
////////////////////////////////////////////////////////////////////////////////////////
function JSHandleNTUJsonError(jsonData) {
    displayTUstage = "JSHandleNTUJsonError";
    JSSaveProblemForDebug("JSSecureJsonEval() returned null for next_ex. jsonData = " + jsonData, false);
    JSHandleNTUError();
}


/////////////////////////////////////////////////////////////////////////////////////////
// JSGetTUInClient
// Return a client TU. It is the first one of clientTUs that was not used.
// If it is the last one that was not used, we bring new ones.
////////////////////////////////////////////////////////////////////////////////////////
function JSGetTUInClient() {
    var clientTUToUse = lastUsedClientTU + 1;
    if (clientTUToUse >= clientTUs.length) // this should not happen, since we bring new client TUs when we used them all
        clientTUToUse = 0;
    lastUsedClientTU = clientTUToUse;
    var TUtoUse = clientTUs[clientTUToUse];
    //alert("using TU " + TUtoUse.TUindex + " clientTUToUse = " + clientTUToUse);
    if (clientTUToUse == clientTUs.length - 1 || clientTUs.length == 0)
        JSBringNewClientTUs();
    return TUtoUse;
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSGetHCTUInClient
// Return a client TU for the Hard coded accounts: clil and demonstration.
// invariant: if is not clil mode then we are in demonstration mode
// It is TU number JSCurClilTU.
////////////////////////////////////////////////////////////////////////////////////////
function JSGetHCTUInClient() {
    var clientTUToUse = (JSisClilTrial) ? JSCurClilTU : JSnextDemonstrationTU - 1;
    if ((clientTUToUse >= clientTUs.length) || (clientTUToUse < 0)) // this should not happen
        clientTUToUse = 0;
    var TUtoUse = clientTUs[clientTUToUse];
    //alert("using TU " + TUtoUse.TUindex + " clientTUToUse = " + clientTUToUse);
    if (JSisClilTrial)
        JSCurClilTU++;
    else {

        JSCurDemonstrationTU = TUtoUse.TUindex;
        JSnextDemonstrationTU = TUtoUse.TUDemonstrationNextindex;
    }
    return TUtoUse;
}


/////////////////////////////////////////////////////////////////////////////////////////
// JSBringNewClientTUs
// Called when we used the last client TU.
////////////////////////////////////////////////////////////////////////////////////////
function JSBringNewClientTUs() {
    var istr = "type=get_client_tus";
    $.ajax({
        type: "POST",
        url: "UpdateLMStartLesson.aspx",
        data: istr,
        async: true,
        success: function (data) { JSBackFromGetClientTUs(data); }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSBackFromGetClientTUs
////////////////////////////////////////////////////////////////////////////////////////
function JSBackFromGetClientTUs(data) {
    if ((data == null) || (data.indexOf("Internal error:") != -1) ||
        (data.indexOf("Operation failed:") != -1) || (data.indexOf(JSSorryMsg) != -1))
        return;
    if (data.indexOf("Your session has expired") != -1) {
        JSMessagePopup(true, GetInUILang(UILang, "Alert!"), data, function () {
            window.location.assign("Login.aspx");
        });
    }
    var tus_jv_object = JSSecureJsonEval(data);
    if (tus_jv_object == null) {
        JSSaveProblemForDebug("JSSecureJsonEval() returned null for get_client_tus. jsonData = " + data, false);
        return;
    }
    JSSaveClientTUs(tus_jv_object);
    JSHandleNTUError();
}


/////////////////////////////////////////////////////////////////////////////////////////
// JSIsEndOfLessonV2
// 1. Returns whether it's end of lesson.
////////////////////////////////////////////////////////////////////////////////////////
function JSIsEndOfLessonV2() {
    if (JSisClilTrial)
        return (JSCurClilTU == JS_LAST_TU_IN_CLIL_TRIAL);
    if (JSisDemonstrationMode)
        return (JSCurDemonstrationTU == JS_LAST_TU_IN_DEMONSTRATION);

    var totalLessonTime = lessonEndTimeUTC - lessonStartTimeUTC;
    var isEndOfLesson = (TotalWorkingSeconds >= totalLessonTime);

    const isRCTU = JSIsRCTU(JSCurTU.type);
    if (isRCTU && isEndOfLesson && JSRCPlaceholderTU && JSRCPlaceholderTU.current_tu_in_block < JSRCPlaceholderTU.total_tus_in_block) {
        console.debug("In an RC sequence");
        return false;
    }

    return isEndOfLesson;
}


/////////////////////////////////////////////////////////////////////////////////////////
// JSIsAlmostEndOfLesson
// Returns whether it's alomost end of lesson.
// means that there left about almostFactor seconds to the end of lesson
////////////////////////////////////////////////////////////////////////////////////////
function JSIsAlmostEndOfLesson() {
    var timeNowInServer = JSTimeNowInServer();
    return timeNowInServer + almostFactor >= lessonEndTimeUTC;
}



function JSBackFromNextTU(data, timeBeforeNTU, caller) {
    JSChangeNextButtonToCheck();
    displayTUstage = "JSBackFromNextTU";
    JSUpdateLastAjaxCall("next_ex", timeBeforeNTU);
    JSTracingLog("after next_ex");
    if ((data == null) || (data.indexOf("Internal error:") != -1) ||
        (data.indexOf("Operation failed:") != -1) || (data.indexOf(JSSorryMsg) != -1)) {
        if (data.indexOf("No more TUs for QA.") != -1)
            JSShowEndOfQAPopup();
        else
            JSMessagePopup(true, GetInUILang(UILang, "Alert!"), data);
    }
    else if (data.indexOf("We detected that two users are using the same browser") == 0) {
        /*JSMessagePopup(true, GetInUILang(UILang, "Alert!"), GetInUILang(UILang, "We detected that two users are using the same browser"), function () {
            window.location.assign("Login.aspx");
        });*/
    }
    else if (data.indexOf("Your session has expired") != -1) {
        JSMessagePopup(true, GetInUILang(UILang, "Alert!"), data, function () {
            window.location.assign("Login.aspx");
        });
    }

    else {
        curExercisePart = EXERCISE_PARTS.EXERCISE;
        TUindexOfCurClientTU = -1;
        var jv_object = JSSecureJsonEval(data);
        if (jv_object == null)
            JSHandleNTUJsonError(data);
        else {
            if (jv_object.next_op == "END_OF_LESSON")
                JSBeforeEndOfLesson();
            else {
                JSTrackProgress(jv_object);

                JSDisplayNextTU(jv_object);

                if (JSCurTU.TUtype != "Speak" && JSCurTU.TUtype != "TextSpeak" && JSCurTU.TUtype != "DialogSpeak") {
                    JSEnableNextButton();
                }

                $('#exercise-monitor, #grammar-pre-info').animate(
                    { bottom: '0%' },
                    1000,
                    function () {
                        if (rollBackTime !== 0 && !JSisAssessmentAccount) {
                            JSTimerRollBack(rollBackTime);
                        }
                    }
                );
                if (screen.width < 580) {
                    $('#user_feedback_toggle').animate(
                        { opacity: '1' },
                        1000,
                        function () {
                        }
                    );
                }
                if (JSisAssessmentAccount && screen.width >= 1200) {
                    $('.timer-minutes').parent().delay(850).animate({ opacity: '1' }, 250);
                }
            }
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSClearExerciseScreen
// Clear the exercise screen to default
/////////////////////////////////////////////////////////////////////////////////////////
function JSClearExerciseScreen(jv_object) {

    //reset Empty Answer flag
    emptyAnswer = true;

    //resert audio transcription
    transcription = '';

    //remove dialog Marker
    isDialogue = false;
    $('[dialog="true"]').removeAttr('dialog');

    //show exercise header
    JSShowExerciseHeader();


    //show hide Hint button acordingly with the TUType
    if (hideHintDomain.includes(jv_object.task_type)) {
        $('#hint-button').hide();
    } else {
        if (jv_object.isDialogueTSS) {
            $('#hint-button').hide();
        } else {
            JSEnableHintButton();
        }

    }

    //clear your_awser
    $('#your_answer').empty();

    //clear grammar info
    $('#grammar-pre-info').remove();

    //clear grammar instruction
    $('#grammarSB-instruction').html('');

    //clear hint toast 
    $('#second-chance-toast').fadeOut(500);

    //clear exercise and feedback scrool
    document.getElementById('exercise').scrollTop = 0;
    document.getElementById('exercise_feedback').scrollTop = 0;


    //adjust exercise columns
    $('.exercise-content').removeClass('col-lg-8').addClass('col-xl-6');
    $('.exercise-info').removeClass('col-lg-4').addClass('col-xl-6').show();
    $('.exercise-content').css({ "width": "", "margin-bottom": "0" });

    //reset CUE
    $('#cue').empty();
    $('#cue').css('border-bottom', '');

    $('#sort_cue').empty();
    $('#your_answer').empty();
    $('#ex_image_div').empty();

    $('#grammar_word_bank_content').empty();
    $('#grammar_word_bank').hide();

    $('.ex_grammarSB_example').empty();
    $('#ex_grammarSB_example').hide();
    $('.ex_grammarSB_content').empty();
    $('#ex_grammarSB').hide();

    $('#skip-button').show();
    hintButtonPressed = false;

    $('.check_button').removeAttr('onclick');

}

function JSDisplayNextTU(jv_object) {

    //We don't want to display guides and popups on test mode
    if (!isQaLoadMode && !(JSisUsertup && !JSisQuizDemo)) {
        JSDisplayPopUpsIfNeeded(jv_object);
    }

    const isRCTU = JSIsRCTU(jv_object.task_type);
    if (isRCTU) {
        JSRCPlaceholderTU = shallowCopy(jv_object);
        JSDisplayRCTU(jv_object);
        return;
    }

    const isFWTU = JSIsFWTU(jv_object.task_type);
    if (isFWTU) {
        JSFWPlaceholderTU = shallowCopy(jv_object);
        JSDisplayFWTU(jv_object);
        return;
    }


    if (jv_object.TS) {
        if (typeof jv_object.TS === 'string') jv_object.TS = JSDecryptData(jv_object.TS);
        if (Array.isArray(jv_object.TS)) jv_object.TS = jv_object.TS.map(item => JSDecryptData(item));
    }

    JSClearExerciseScreen(jv_object);

    // remove the translation tooltip from cue if exists
    if ($('#cue').hasClass('exercise-tooltip'))
        $('#cue').removeClass('exercise-tooltip');

    img = null;
    if ((jv_object.imageUrl != null) && (jv_object.imageUrl != "") && !isLoadTestingUser)
        JSBLSetImg(jv_object);
    else {
        if (jv_object.task_type != "GrammarSB")
            $('.exercise-info').hide();
    }

    // if we have more images to show, show them (happens in QA mode)
    if (jv_object.imagesUrls != null && jv_object.imagesAuthors != null) {
        for (i = 0; i < jv_object.imagesUrls.length; i++) {
            JSaddImage(jv_object.imagesUrls[i], jv_object.imagesAuthors[i]);
        }
    }

    isSecondChance = "NoHelp";
    allowLongerRecordingTime = false;
    JSUpdateTask(jv_object);

    if ($('#cue').html() == '') {
        $('#cue').hide();
    } else {
        $('#cue').show();
    }

    if ($('#sort_cue').html() == '') {
        $('#sort_cue').hide();
    } else {
        $('#sort_cue').show();
    }

    // change exercise
    JSUpdateExerciseDashboardTheme(jv_object);

    // check if exercise is a dialog
    JSUpdateExerciseDialog(jv_object);

    // reset exercise body
    JSResetExerciseBody();

    // reset audio expceted end time
    JSResetEndTime();

    // TU UI changes
    JSTUDisaplyChanges(jv_object);

    // preview new naterial icon if current exercise is new for the user
    if ((jv_object.icon == "NewMaterialTU" || JSisAssessmentAccount) && jv_object.task_type !== "RepeatLKU") {
        $("#exercise-new-material-icon").show();
        $("#skip-button").hide();
        $("#exercise").attr('isnewmaterial', true);

        // hide header icon if mobile 
        if (window.matchMedia("(max-width: 1200px)").matches) {
            $("#exercise-new-material-icon").hide();
        }

    } else {
        $("#exercise").attr('isnewmaterial', false);
        $("#exercise-new-material-icon").hide();
        $("#skip-button").show();
    }

    if (jv_object.icon === "TryAgainTU" || jv_object.task_type === "RepeatLKU") {
        $("#exercise").attr('istryagain', true);
        $("#exercise-try-again").show();
        if (jv_object.task_type === "RepeatLKU") {
            $("#exercise-try-again > p").text("Try Again")
        } else {
            $("#exercise-try-again > p").text("Second Chance")
        }
    } else {
        $("#exercise").attr('istryagain', false);
        $("#exercise-try-again").hide();
    }

    // hide material icon if assessment mode
    if (JSisAssessmentAccount) {
        $("#exercise-new-material-icon").hide();
    }

}

function JSDisplayRCTU(jv_object) {
    JSCurTU.TUindex = jv_object.TUindex;
    JSCurTU.TUtype = jv_object.task_type;

    const rctu = new CustomEvent("storerctu", {
        detail: {
            ...jv_object
        },
    });
    window.dispatchEvent(rctu);
    JSClearDisplayTUInterval();
    return;
}

function JSDisplayFWTU(jv_object) {
    JSCurTU.TUindex = jv_object.TUindex;
    JSCurTU.TUtype = jv_object.task_type;

    const fwtu = new CustomEvent("storefwtu", {
        detail: {
            ...jv_object
        },
    });
    window.dispatchEvent(fwtu);
    JSClearDisplayTUInterval();
    return;
}

function JSTUDisaplyChanges(jv_object) {
    if (jv_object.task_type == "GrammarSB") {
        $("div#ex_image_div").hide();
        $(".exercise-info").css({ "justify-content": "space-evenly" });
        if ($(window).width() > 1200) {
            $(".exercise-info").css("height", "100%");
            $(".exercise-content").css({ "height": "100%" });
        }
        if ($(window).width() < 1200) {
            $(".exercise-content").css({ "padding-top": "0" });
            $("#your_answer").css({ "padding-top": "0" });
        }
        $(".exercise-content").addClass('col-xl-8');
        $(".exercise-info").addClass('col-xl-4');
        if (jv_object.grammarMachsan !== "")
            $(".exercise-content").css({ "display": "flex", "gap": "1rem", "justify-content": "flex-start" });
    }
    if (jv_object.task_type == "Translate") {
        $(".exercise-content").css({ "padding-top": "0", "margin-bottom": "1rem" });
    }
    if (jv_object.task_type == "Dictate") {
        $("#ex_image_div").css({ "padding-top": "1.5rem" });
    }
    if (jv_object.task_type == "DialogDictate") {
        $(".left_message").css({ "padding-top": "6rem" });
        $(".right_message").css({ "padding-top": "6rem" });
    }

}

function JSResetExerciseBody() {
    $(".exercise-content").removeClass("col-xl-8")
    $(".exercise-content").css({ "display": "unset", "height": "", "justify-content": "center", "margin-bottom": "0" });
    $(".exercise-info").css({ "display": "unset", "height": "" });
    $(".exercise-info").removeClass("col-xl-4")
    $("div#ex_image_div").show();
}

function JSResetEndTime() {
    audioExpEndTime = 12000;
}

function JSUpdateExerciseDashboardTheme(jv_object) {
    if (jv_object.must_have_image == "True") {
        $("#exercise").attr('exerciseType', 'ImageLKU');
    } else {
        $("#exercise").attr('exerciseType', jv_object.task_type);
    }

}

function JSUpdateExerciseDialog(jv_object) {
    if (jv_object.isDialogueTSS == "True") {
        $("#exercise-monitor").attr('dialog', true);
        $("#exercise").attr('dialog', true);
        JSSetRecordsGender(jv_object);
        $("#exercise").attr('dialog-gender', recorderGender1);
    } else {
        $("#exercise").attr('dialog', false);
        $("#exercise-monitor").attr('dialog', false);
    }
}
/////////////////////////////////////////////////////////////////////////////////////////
// JSBLSetImg
// Set img params 
/////////////////////////////////////////////////////////////////////////////////////////
function JSBLSetImg(jv_object) {
    img = new Image();
    img.onerror = function () {
        JSImageNotLoaded(jv_object.must_have_image);
    };
    img.setAttribute('id', 'img');
    img.setAttribute('width', '100%');
    if ((jv_object.imageAuthor == null) || (jv_object.imageAuthor == ""))
        img.setAttribute('alt', "");
    else {
        var authorTitle = (jv_object.imageAuthor == "Google search") ? "Google search preview" : "By " + jv_object.imageAuthor;
        img.setAttribute('alt', authorTitle);
    }
    img.src = jv_object.imageUrl;
    $('#ex_image_div, #ex_image_div img').show();
    $('#ex_image_div').append(img);
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSaddImage
// adds another image to the exercise (called In QA mode)
/////////////////////////////////////////////////////////////////////////////////////////
function JSaddImage(imgUrl, imgAuthor) {
    img = new Image();

    img.setAttribute('id', 'img');
    img.setAttribute('width', '100%');
    if ((imgAuthor == null) || (imgAuthor == ""))
        img.setAttribute('alt', "");
    else {
        var authorTitle = (imgAuthor == "Google search") ? "Google search preview" : "By " + imgAuthor;
        img.setAttribute('alt', authorTitle);
    }
    img.src = imgUrl;
    $('#ex_image_div, #ex_image_div img').show();
    $('#ex_image_div').append(img);
    // label under image containing credit
    if (img.alt != "") {
        var str = "<div class=\"imgAuthor\">" + "Credit: " + img.alt + "</div>";
        AddToDOM(str, "APPEND", '#ex_image_div');
    }
}





/////////////////////////////////////////////////////////////////////////////////////////
// JSUpdateTask
// Creates the audio elements, and calls JSDisplayTU() to dipslay the TU.
/////////////////////////////////////////////////////////////////////////////////////////
function JSUpdateTask(jv_object) {
    displayTUstage = "JSUpdateTask_started";

    JSCurTU.TUindex = jv_object.TUindex;
    JSCurTU.TUtype = jv_object.task_type;
    JSCurTU.TS = jv_object.TS;
    //JSCurTU.isTryIt = jv_object.is_test_TU;
    JSCurTU.icon = jv_object.icon;
    JSCurTU.isDialogTSS = jv_object.isDialogueTSS == "True";
    JSCurTU.mustHaveImage = jv_object.must_have_image;
    JSCurTU.task = jv_object.task;
    JSCurTU.newAward = "";
    JSCurTU.translationForFeedback = "";
    JSCurTU.L1 = jv_object.L1;
    JSCurTU.normalRate = normalPlaybackRate;
    JSCurTU.dictateRate = dictatePlaybackRate;
    JSCurTU.normalRateTSS = [];
    JSCurTU.wasInFeedbackPage = false;
    if (JSCurTU.TUtype == "GrammarSB" || JSCurTU.TUtype == "GrammarSORT") {
        grammarParams.bank = jv_object.grammarMachsan;
        grammarParams.example = jv_object.grammarExample;
        grammarParams.explanation = jv_object.grammarExplanation;
        grammarParams.header = jv_object.grammarHeader;
        grammarParams.textDir = jv_object.ExpLangtextDir;
    }

    //update the last tracing log's TUindex, suppose to edit "after next_ex" item 
    if (isTracingUser && tracingLogArray.length > 0) {
        var curTracingLog = tracingLogArray.pop();
        curTracingLog.TUindex = JSCurTU.TUindex; //we can add check if its -1 before
        curTracingLog.TUtype = JSCurTU.TUtype;
        tracingLogArray.push(curTracingLog);
    }

    if (jv_object.translationForFeedback)
        JSCurTU.translationForFeedback = jv_object.translationForFeedback;

    // Fill audio first, since it may take time to load audio
    // Fill TS/TSS audio src, or hide play button if there is no audio
    isTextTU = (jv_object.task_type == "TextSB" || jv_object.task_type == "GrammarSB" || jv_object.task_type == "GrammarSORT" || jv_object.task_type == "DialogDictate");
    timeAudioShouldStarPlay = -1;
    audioTagReloaded = false;
    JSRemoveAudio();
    if (isLoadTestingUser)
        jv_object.audio = "";

    var audioUrl = jv_object.audio;

    JSPassAudiosToReact(jv_object);

    isTSwithAudio = (audioUrl != "");
    isTSSwithAudio = ((isTextTU || JSCurTU.TUtype == "DialogDictate" || JSCurTU.TUtype == "DialogSpeak" || JSCurTU.TUtype == "TextSpeak") && jv_object.audios.length > 0);
    if (isTSwithAudio && !isTextTU) {
        // create an audio tag 
        str = "<audio id=\"TSaudio\" class=\"sentence_audio\" preload=\"auto\">";
        //var typeStr = BrowserShouldUseMpeg() ? "mpeg" : "ogg";
        var typeStr = "mp3";
        str += "<source id=\"audio_src\" src=\"" + audioUrl + "\" type=\"audio/" + typeStr + "\" />";
        str += "Your browser does not support the audio element.";
        str += "</audio>";
        AddToDOM(str, "APPEND", '#exercise-audios');
        JSCurTU.normalRate = jv_object.audioNormalRate;
        JSCurTU.dictateRate = jv_object.audioDictateRate;
    } else if ((isTextTU || JSCurTU.TUtype == "DialogDictate" || JSCurTU.TUtype == "DialogSpeak" || JSCurTU.TUtype == "TextSpeak") && !isLoadTestingUser && isTSSwithAudio) {
        // create a div with the audio tags
        str = "<div id=\"text_audio\">";
        for (i = 0; i < jv_object.panswer_size; i++) {
            var audioId = "TSaudio" + i;
            var audioSrcId = "audio_src" + i;
            str += "<audio id=\"" + audioId + "\" class=\"sentence_audio\" preload=\"auto\">";
            //var typeStr = BrowserShouldUseMpeg() ? "mpeg" : "ogg";
            var typeStr = "mp3";
            str += "<source id=\"" + audioSrcId + "\" src=\"" + jv_object.audios[i].audioURL + "\" type=\"audio/" + typeStr + "\" />";
            str += "Your browser does not support the audio element.";
            str += "</audio>";
            JSCurTU.normalRateTSS.push(jv_object.audios[i].audioNormalRate);
        }
        str += "</div>";
        AddToDOM(str, "APPEND", '#exercise-audios');
    }

    JSDisplayTU(jv_object);

    displayTUstage = "JSUpdateTask_completed";
    JSClearDisplayTUInterval();

    if (JSisDemonstrationMode) {
        var answerType = JSGetAnswerTypeByTUType(jv_object);
        JSDemonstrationLA.correctLA = jv_object.TU_answer;
        JSDemonstrationLA.incorrectLA = jv_object.incorrectLA;
        JSDemonstrationLA.answerType = answerType;
        $('#answer_area input').attr('readonly', 'readonly');
        JSDisableNextButton();
        if (JSCurTU.TUtype == "Speak" || JSCurTU.TUtype == "TextSpeak")
            $('.demonstration_btn').hide();
        else
            $('.demonstration_btn').show();
    }

    // If we have an answer to fill-in (QA-load mode or debug mode), 
    // we wait for the audio to finish, and then fill-in the answer.
    if ((jv_object.nextOp != "END_OF_LESSON") && (isQaLoadMode || (jv_object.TU_answer != "")) && !JSisDemonstrationMode)
        waitForTUAudioIntervalId = self.setInterval(function () { JSWaitForAudio(jv_object, isQaLoadMode) }, 500);

    JSSetContentHeight();

}

function JSPassAudiosToReact(jv_object) {
    const audios = jv_object.audios;
    if (!audios || audios.length === 0) return;
    const audiosUrls = audios.map(audio => audio.audioURL);
    const jsonStr = JSON.stringify(audiosUrls);
    $("#exercise").attr('audios', jsonStr);
}

function JSGetAndSetAudioUrlFromReact(audioUrl, audioLength) {
    // Creating audio tag
    const typeStr = "mp3";
    const str = `
        <audio id="TSaudio" class="sentence_audio" preload="auto">
            <source id="audio_src" src="${audioUrl}" type="audio/${typeStr}"/>
            Your browser does not support the audio element.
        </audio>
    `;
    AddToDOM(str, "APPEND", '#exercise-audios');

    JSAudioProgress();
    AttachAudioToPlayRate();

    const breathingTime = 8000;
    const updatedExpTime = audioLength + breathingTime;
    audioExpEndTime = updatedExpTime;
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayTU
// Display a TU: TSS, instruction, cue, and answer area.
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayTU(jv_object) {
    JSRestoreSpeakerButtons();

    $('#instruction').remove();
    if ($('#add_cue').size() > 0)
        $("#add_cue").remove();
    if ($('#grammar_example').size() > 0)
        $('#grammar_example').remove();
    if ($('#grammar_explanation').size() > 0)
        $('#grammar_explanation').remove();
    if ($('#grammar_bank').size() > 0)
        $('#grammar_bank').remove();

    if (JSisUsertup && jv_object.video_url) {
        $("#tu_video_modal_close").on("click", () => {
            var video = $("#tu_video_modal_video")[0];
            video.pause();
            video.currentTime = 0;
            $("#tu_video_modal").hide()

            $("button#next_button.check_button").show()
            $("#hint-button").show()
            $("#skip-button").show()
            $("button#back-to-home").show()
            $("#play-pause-btn").show()
            $("#stop-btn").show()
            $("#profile").show()

            $("#user_feedback_toggle").show();
        });


        $("#tu_video_modal").show();
        $("#tu_video_modal_video > source").attr("src", jv_object.video_url);
        $("#tu_video_modal_video").load();

        setTimeout(() => {
            $("button#next_button.check_button").hide()
            $("#hint-button").hide()
            $("#skip-button").hide()
            $("button#back-to-home").hide()
            $("#play-pause-btn").hide()
            $("#stop-btn").hide()
            $("#profile").hide()

            $("#user_feedback_toggle").hide();

        }, [2000]);
    }

    if (isTextTU)
        JSCurTU.TS = JSMergeTextAfterJson(JSCurTU.TS, true);
    isTooShortScreen = ((img != null) && ($(document).height() < DOCUMENT_HEIGHT_THRESHOLD));

    JSDisplayInstruction(jv_object);

    if (jv_object.isDialogueTSS == "True") {
        handleCurrentTSS(jv_object);
    }

    if (JSCurTU.TUtype == "FITB")
        JSDisplayFitbTU(jv_object);
    else if (JSCurTU.TUtype == "SORT" && jv_object.isDialogueTSS == "True")
        JSDisplayDialogSortTU(jv_object);
    else if (JSCurTU.TUtype == "SORT")
        JSDisplaySortTU(jv_object);
    else if (JSCurTU.TUtype == "Speak")
        JSDisplaySpeakTU(jv_object);
    else if (JSCurTU.TUtype == "DialogSpeak")
        JSDisplayDialogSpeakTU(jv_object);
    else if (JSCurTU.TUtype == "DialogDictate") {
        JSDisplayDialogDictateTU(jv_object);
    }
    else if (JSCurTU.TUtype == "Dictate" && jv_object.isDialogueTSS == "True") {
        JSDisplayDialogTUDialogMode(jv_object);
    }
    else if (JSCurTU.TUtype == "GrammarSB") {
        JSDisplayGrammarSBTU(jv_object);
    }
    else if (JSCurTU.TUtype == "GrammarSORT") {
        JSDisplayGrammarSORTTU(jv_object);
    }
    else if (JSCurTU.TUtype == "ImageLKU" && jv_object.isDialogueTSS == "True") {
        JSDisplayDialogImageTU(jv_object);
    }
    else if (JSCurTU.TUtype == "TextSB" && jv_object.isDialogueTSS == "True" && jv_object.must_have_image !== "False") {
        JSDisplayDialogTextSBWithImageTU(jv_object);
    }
    else if (JSCurTU.TUtype == "TextSB" && jv_object.isDialogueTSS == "True" || JSCurTU.TUtype == "ImageLKU" && jv_object.isDialogueTSS == "True") {
        JSDisplayDialogTextSB(jv_object);
    }
    else if (JSCurTU.TUtype == "Translate" && jv_object.isDialogueTSS == "True" || JSCurTU.TUtype == "SB" && jv_object.isDialogueTSS == "True") {
        JSDisplayDialogTranslateTU(jv_object);
    }
    else if (JSCurTU.TUtype == "TextSpeak") {
        JSDisplayTextSpeakTU(jv_object);
    }
    else {
        JSDisplayCue(jv_object);
        JSDisplayAnswerArea(jv_object);
    }
    if (JSCurTU.TUtype != "Speak" && JSCurTU.TUtype != "DialogSpeak" && JSCurTU.TUtype != "TextSpeak") {
        $('.check_button').show();
        $('#speak_tu_next_button').hide();
        JSCleanSpeakDivs();
    }


    JSShowExercisePage();
    JSDisplaySpeakerInExercise(jv_object);
    focusOnFirstInput();

    if (!isQuizTime && (JSCurTU.TUtype == "GrammarSB" || JSCurTU.TUtype == "GrammarSORT") && (JSCurTU.icon != "TryAgainTU")) {
        isBindEnterInExercise = false;
        //var title = "It's time to practice " + grammarParams.header + ".";
        var title = GetInUILang(UILang, "It's time to practice");

        // For usertup show only the explanation on the right (and not the popup)
        // to prevent wasting demonstration time
        // when user is Quiz and TUP don't show explanation and example
        if (JSisUsertup) {
            if (!JSisQuizDemo)
                JSShowGrammarExplanation();

        }
        else {
            // Grammar popup overrides all popups except of quiz
            // On Quiz time we don't display grammat instruction (not on popup and not to the right of the exercise)
            JSGrammarExplanation(title, grammarParams, jv_object);
        }




        // Display grammar explanation on the right of the exercise explanation popup close
        // Can't move the onClick to Excercise.aspx document ready, because the button does not exist there.
        $("#popup_ok").click(function () {
            JSShowGrammarExplanation();
        });
    }



    if (JSisQuizDemo && $('#grammar_example').size() > 0)
        $('#grammar_example').remove();

    if (JSisUsertup || isQaLoadMode || (JSCurTU.TUtype != "DialogDictate" && JSCurTU.TUtype != "DialogSpeak" && JSCurTU.TUtype != "Speak" && JSCurTU.TUtype != "TextSpeak"))
        JSEnableNextButton();
    if (isBindEnterInExercise && window.innerWidth > 570) // if we don't have an open popup
        JSFocusOnUserResponseField();
    if (jv_object.isDialogueTSS == "True" || JSCurTU.TUtype == "Speak" || JSCurTU.TUtype == "TextSpeak") {
        JSDisableNextButton();
    }

    if ((JSCurTU.TUtype == "Dictate" && jv_object.isDialogueTSS != "True") ||
        (JSCurTU.TUtype == "CQ" && jv_object.isDialogueTSS != "True") ||
        (JSCurTU.TUtype == "SB" && jv_object.isDialogueTSS != "True") ||
        JSCurTU.TUtype == "RepeatLKU" ||
        (document.getElementById("TSaudio") && !currentAudio === null)
    ) {
        AttachAudioToPlayRate();
    }
}

function JSShowGrammarExplanation() {
    if (JSCurTU.TUtype == "GrammarSB" || JSCurTU.TUtype == "GrammarSORT") {
        // $('#exercise_with_margins').css("opacity", "initial");
        $('#grammar_explanation').show(800);
    }
}

function JSDisableHintButton() {
    $('#hint-button').attr('disabled', true);
    $('#hint-button:disabled > svg > path:first-of-type').css({ "fill": "#c3c3c3" });
    $('#hint-button:disabled > svg > path:last-of-type').css({ "stroke": "#c3c3c3" });
}

function JSEnableHintButton() {
    $('#hint-button').show();
    $('#hint-button').removeAttr('disabled');
    $('#hint-button > svg > path:first-of-type').css({ "fill": "#ffffff " });
    $('#hint-button > svg > path:last-of-type').css({ "stroke": "#ffffff" });
    $('#hint-button').off();
    $('#hint-button').click(function () { JSCheckBtnPressed(true); });

}
/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayPopUpsIfNeeded
// displays the guide popups / clil popups / Trial popups if needed
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayPopUpsIfNeeded(jv_object) {

    if (JSisAssessmentAccount || (JSisUsertup && !JSisQuizDemo))
        return;

    if (!JSisQuizDemo && JSisDemoAccount && jv_object.isFirstTextSB == "true") {
        isBindEnterInExercise = false;
        JSSmallGotItPopup(FirstTextSBPopUpLbl, FirstTextSBPopUpMsg, JSrefocusOnExercise);
    }
    else if (!JSisQuizDemo && JSisDemoAccount && jv_object.isFirstTUOnOldKU == "true" && !JSisDemonstrationMode) {
        isBindEnterInExercise = false;
        JSSmallGotItPopup(firstTUOnOldKULbl, firstTUOnOldKUMsg, JSrefocusOnExercise);

    }
    else if (!JSisQuizDemo && JSisDemoAccount && jv_object.isPersonalizedPopupTime == "true") {
        isBindEnterInExercise = false;
        JSSmallGotItPopup(personalizedLearningLbl, personalizedLearningMsg, JSrefocusOnExercise);
    }
    else if (!JSisQuizDemo && JSisDemoAccount && jv_object.isSpeakTUPopupTime == "true") {
        isBindEnterInExercise = false;
        JSSmallGotItPopup(speakTULbl, speakTUMsg, JSrefocusOnExercise);

    }
    else if (!JSisQuizDemo && JSisClilTrial && jv_object.isFirstTextSB == "true") {
        isBindEnterInExercise = false;
        JSSmallGotItPopup(clilFirstTextSBPopUpLbl, clilFirstTextSBPopUpMsg, JSrefocusOnExercise);
    }

    else if (!JSisQuizDemo && JSisClilTrial && !isQaLoadMode && JSCurClilTU == 17) {
        JSupdatePopupsTable("clil_new_subject", 1);
        isBindEnterInExercise = false;
        JSSmallGotItPopup(clilNewSubjectPopUpLbl, clilNewSubjectPopUpMsg, JSrefocusOnExercise);
    }
    else {
        if (isSchoolStudent || JSisQuizDemo) {
            JSUpdateIsQuiz(jv_object);
        }
    }
}


function JSrefocusOnExercise() {
    isBindEnterInExercise = true;
    JSFocusOnUserResponseField();
}



function JSDisplaySpeakerInExercise(jv_object) {
    if (JSIsHearingTU(jv_object)) {
        // display speaker_in_exercise
        if (JSIsRtlLanguage(jv_object.task_instruction_lang))
            $('#speaker_in_exercise').css({ 'float': 'right' });
        else
            $('#speaker_in_exercise').css({ 'float': 'left' });
        $('#speaker_in_exercise').show();
        $('#speaker_in_exercise').unbind().click(function () {
            JSHighlightAudioIcon(true);
            JSTSAudioPlay(true);
        });

        if (jv_object.task_type == "RepeatLKU") {
            $('#slow_speaker_in_exercise').hide();
            $('#speaker_in_exercise').hide();
        }
    }
    else {
        $('#speaker_in_exercise').hide();
        $('#slow_speaker_in_exercise').hide();
    }

    if (JSCurTU.TUtype == "Dictate" && jv_object.isDialogueTSS != "True" || jv_object.task_type == "CQ") {
        $('#slow_speaker_in_exercise').hide();
        $('#speaker_in_exercise').hide();
        JSAudioProgress();

        var str = `
            <div class="speak-original-header">
                <div class="speak-control-panel" >
                <button id="speak-hear-audio" class="speak-play-resume" onclick=\"JSPlayCorrectAudio(this)\" > <img id="speak-play-resume" src='${s3ExerciseImages}/speak_play.svg' alt=\"\" /></button>
                <div class="speak-playbar">
                <div class="speak-playbar-progress" />
                    <span> 00:00 </span>
                </div>
                <button class="speak-speed" onclick=\"JSAudioUpdatePlayRate()\" >1 x</button>
                </div>
            </div>
            `;
        $('#cue').html(str);
    }

    if (jv_object.task_type == "DialogDictate" || jv_object.task_type == "DialogSpeak") {
        $('#speaker_in_exercise').replaceWith(`<div id="speaker_in_exercise" id="TS-audio-normal" class="speaker-circular-button big" style="background-image:url(${s3ExerciseImages}/speaker-in-exercise_dark.svg)"></div>`);

        $('#slow_speaker_in_exercise').replaceWith(`<div id="slow_speaker_in_exercise" id="TS-audio-slow" class="speaker-circular-button big" style="background-image:url(${s3ExerciseImages}/slow_speaker_in_exercise_dark.svg)"></div>`);


        $('#speaker_in_exercise').unbind().click(function () {
            JSHighlightAudioIcon(true);
            JSTextAudioPlay(true, false, false);
        });

        $('#slow_speaker_in_exercise').css("margin-right", "24px").unbind().click(function () {
            JSHighlightSlowAudioIcon(true);
            JSTextAudioPlay(true, false, true);
        });
    }

    if (JSCurTU.TUtype == "Dictate" && jv_object.isDialogueTSS == "True") {
        JSAudioProgress();

    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayTSSContext
// Display TSS context related data
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayTSSContext(jv_object) {
    var TSSsize = jv_object.tss_size;
    if (TSSsize == 0)
        return;
    var tss_str = "";
    var beforeTS = "";
    var afterTS = "";
    if (jv_object.isDialogueTSS == "True") {
        var beforeTS = "&minus; ";
        var afterTS = "<br />";
    }
    for (i = 0; i < TSSsize; i++) {
        tss_str += beforeTS + jv_object.tss[i] + afterTS;
        if (i != (TSSsize - 1))
            tss_str += " ";
    }
    var str = "<div id=\"tss_context\">" + tss_str + "</div>";
    AddToDOM(str, "APPEND", '#answer_area');
    if ((JSCurTU.TUtype == "Translate") || (JSCurTU.TUtype == "Dictate"))
        $('#tss_context').css("font-size", "16px");
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayInstruction
// Display the TU instruction with the appropriate text direction.
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayInstruction(jv_object) {


    var inst = jv_object.task_instruction;
    if (JSCurTU.TUtype == "CQ") {
        // remove the hint regarding number of words, we will show it in the answer area
        var wordHintMatch = inst.match(CQWordNumHintPattern);
        if (wordHintMatch)
            inst = inst.replace(wordHintMatch[0], '');
    }




    if (JSCurTU.TUtype == "GrammarSB" || JSCurTU.TUtype == "GrammarSORT") {
        var str = '';
        var subtitle = '';

        var instructionsSentences = inst.split('.');

        var str = '<div id="instruction">' + instructionsSentences.splice(0, 1) + '</div>';
        if (instructionsSentences) {
            subtitle = '<div id="instruction-subtitle">';
            subtitle += instructionsSentences.join('. ');
            subtitle += '</div>';
        }
        $('#instruction-container').html(str);
        $('#grammarSB-instruction').html(subtitle).find('br').remove();
    } else {
        $('#instruction-container').html('<div id="instruction">' + inst + '</div>');
    }

}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayCue
// Display the TU cue according to TU type.
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayCue(jv_object) {
    // add one empty line to cue in TUs where the cue is empty.
    // we do not do it in short screens, in order to save space
    // in Dictate and CQ we do it also for short screens, so that the speaker will be displayed
    // in a separate row.
    if (((jv_object.task_type == "Dictate") || (jv_object.task_type == "CQ")) ||
        (!isTooShortScreen && (jv_object.task_type == "ImageLKU") || (jv_object.task_type == "SB") ||
            (jv_object.task_type == "TRANSFORM") || (jv_object.task_type == "TextSB") ||
            (jv_object.task_type == "GrammarSB") || (jv_object.task_type == "GrammarSORT"))) {
    } else if (jv_object.task_type == "RepeatLKU") {
        JSAudioProgress();

        var str = `
            <div class="speak-original-header">
                <div>
                <span class="speak-original-header-sentence" >${jv_object.TS}</span>
                </div>
                <div class="speak-control-panel" >
                <button id="speak-hear-audio" class="speak-play-resume" onclick=\"JSPlayCorrectAudio(this)\" > <img id="speak-play-resume" src='${s3ExerciseImages}/speak_play.svg' alt=\"\" /></button>
                <div class="speak-playbar">
                <div class="speak-playbar-progress" />
                    <span> 00:00 </span>
                </div>
                <button class="speak-speed" onclick=\"JSAudioUpdatePlayRate()\" >1 x</button>
                </div>
            </div>
            `;
        $('#cue').html(str);

    } else {
        $("#cue").unbind("click");
        $('#cue').empty();
        var cueContent = jv_object.task;
        $('#cue').html(cueContent);
        $('#cue').attr('unselectable', 'on').css('UserSelect', 'none').css('MozUserSelect', 'none');
    }
    // cue_tbx is left to right, unless it is a translate TU from Hebrew
    $('#cue').attr('dir', "ltr");
    if ((jv_object.task_type == "Translate") || (jv_object.task_type == "SMA")) {
        if (JSIsRtlLanguage(jv_object.L1))
            $('#cue').attr('dir', "rtl");
    }

    if ((jv_object.task_type == "RepeatLKU") && (jv_object.add_cue != null)) {
        $('#cue').addClass("exercise-tooltip");
        $('#cue').css({ 'margin-left': '0px', 'padding': '0px' }); // so the tooltip won't be on the speaker
        $("#cue > .speak-original-header > div:first-of-type").append("<span class='tooltiptext'>" + jv_object.add_cue + "</span>");

        if (JSIsRtlLanguage(jv_object.L1))
            $('.tooltiptext').attr('dir', "rtl");
    }
    else
        $('#cue').css({ 'margin-left': '' });

    // add translation (in SB TRY IT TUs)
    if (jv_object.translation) { // ask Michal if it can be repeat LKU and TRY IT
        $("#cue").unbind("click");
        $('#cue').empty();
        var cueTransContent = jv_object.translation;
        $('#cue').html(cueTransContent);
        $('#cue').attr('unselectable', 'on').css('UserSelect', 'none').css('MozUserSelect', 'none');
        if (JSIsRtlLanguage(jv_object.L1))
            $('#cue').attr('dir', "rtl");
    }

    if ($('#cue').html() == '') {
        $('#cue').hide();
    } else {
        $('#cue').show();
    }
}



/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayAnswerArea
// Creates the answer area according to the answer-type of the TU: 
// PartialAnswer/MultiplePartialAnswers/FullAnswer/NoAnswer
/////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayAnswerArea(jv_object) {
    JSInitYourAnswerDiv();
    var isGS = jv_object.task_type == "GrammarSORT" ? true : false;
    var str = "<div id=\"answer_area\" " + (isGS ? "style=\"padding: 0;\"" : "") + "></div>";
    AddToDOM(str, "APPEND", '#your_answer');
    if (JSCurTU.TUtype != "CQ")
        JSDisplayTSSContext(jv_object);
    var answerType = JSGetAnswerTypeByTUType(jv_object);

    isDialogue = false;
    // Initial add class col class from exercise-content class element
    $(".exercise-content").addClass("col-xl-6")
    // Initial answer area padding
    $("#answer_area").css("padding-top", "0");
    // Intial Hide Dialouge header
    $("#dialogue-header").hide();
    if (jv_object.isDialogueTSS == 'True') {
        isDialogue = true;
        JSSetRecordsGender(jv_object);
        // Remove class col class from exercise-content class element
        $(".exercise-content").removeClass("col-xl-6")
        // Add padding top to answer area
        $("#answer_area").css("padding-top", "6.25rem");
        // Show Dialouge header
        $("#dialogue-header").show();
    }
    if (answerType == "PartialAnswer")
        JSDisplayPartialAnswer(jv_object.partial_answer, isDialogue);
    else if (answerType == "MultiplePartialAnswers") {
        JSDisplayPartialAnswers(jv_object.panswer_size, jv_object.panswers, isDialogue);
    }
    else if (answerType == "FullAnswer") {
        JSDisplayFullAnswer();
    }
    else // NoAnswer
        $('#your_answer').hide();

    $('#answer_area').keypress(function (event) {
        if (event.keyCode == '13') {
            if (isDialogue) {
                JSDisplayNextBubble();
            }
            else if (isBindEnterInExercise) {
                JSCheckBtnPressed();
                return false;
            }
        }
    });

    if (JSCurTU.TUtype == "CQ") {
        // add the hint regarding number of words
        var correctNumOfWords = 1;
        var inst = jv_object.task_instruction;
        var wordHintMatch = inst.match(CQWordNumHintPattern);
        if (wordHintMatch) {
            var str = "<label class=\"cq_word_num\">" + wordHintMatch[0] + "</label>";
            AddToDOM(str, "APPEND", '#response_parts');

            // extract answerNumOfWords from the hint string
            var hintParts = wordHintMatch[0].split(" ");
            correctNumOfWords = parseInt(hintParts[0].split("(")[1]);

            // adjust exercise body to CQ mode
            JSExerciseBodyCQOrDictate();
        }

        // alert the user if he types more words than necessary
        $('#response_0_tbx').keyup(function () {
            var answerWords = this.value.split(" ");
            if (answerWords.length > correctNumOfWords && answerWords[answerWords.length - 1] != "") {

                var msg = "The answer should only contain " + correctNumOfWords;
                if (correctNumOfWords == 1)
                    msg += " word";
                else
                    msg += " words";
                msg += ". Please check your answer.";
                JSMessagePopup(false, GetInUILang(UILang, "Attention"), msg, function () {
                    $('#response_0_tbx').unbind("keyup");
                });
            }
        });


    }

    if (JSCurTU.TUtype == "Dictate") {
        JSExerciseBodyCQOrDictate()
    }
    // TODO: Check here for TextSB Image
}

/////////////////////////////////////////////////////////////////////////////////////////
// focusOnFirstInput
// Focuses on first input element
/////////////////////////////////////////////////////////////////////////////////////////
function focusOnFirstInput() {
    // Get the first element with the class name "p_answer_tbx_cl"
    const firstElement = document.querySelector('.p_answer_tbx_cl');

    // Check if the element exists
    if (firstElement) {
        // Focus on the element
        firstElement.focus();
        firstElement.click();
    }
}
function JSExerciseBodyCQOrDictate() {
    $(".exercise-content").css({ "display": "flex", "flex-flow": "column", "justify-content": "center" });
    $(".exercise_info").css({ "display": "flex", "flex-flow": "column", "justify-content": "center" });
    if (JSCurTU.TUtype == "Dictate") {
        $(".exercise-content").css({ "margin-bottom": "1rem" })
    }
}

function JSGetAnswerTypeByTUType(jv_object) {
    if (jv_object.task_type == "TextSB" || jv_object.task_type == "GrammarSB" || jv_object.task_type == "GrammarSORT" || jv_object.task_type == "DialogDictate")
        return "MultiplePartialAnswers";
    if (jv_object.task_type == "SMA")
        return "NoAnswer";
    if ((jv_object.partial_answer != "") || (jv_object.task_type == "CQ"))
        return "PartialAnswer";
    return "FullAnswer";
}

function JSIsHearingTU(jv_object) {
    if (jv_object.audio = "")
        return false;
    if ((jv_object.task_type == "Dictate") || (jv_object.task_type == "RepeatLKU") || (jv_object.task_type == "CQ") || (jv_object.task_type == "DialogDictate"))
        return true;
    return false;
}

function JSIsHearingTUType() {
    if ((JSCurTU.TUtype == "Dictate") || (JSCurTU.TUtype == "RepeatLKU") || (JSCurTU.TUtype == "CQ"))
        return true;
    return false;
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayFullAnswer
// Displays the textarea for the answer in case of TUs with no blanks.
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayFullAnswer() {
    var str = "<textarea id=\"response_tbx\" rows=\"2\"></textarea>";
    AddToDOM(str, "APPEND", '#answer_area');

    $('#response_tbx').keypress(function (event) {
        if (event.keyCode == '13') {
            if (isBindEnterInExercise) {
                JSCheckBtnPressed();
                return false;
            }
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayPartialAnswer
// Displays the partial answer in case of single-TS TUs with blanks.
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayPartialAnswer(pAnswer, isDialogue = false) {
    //alert(pAnswer);
    var str = "<div id=\"response_parts\">";
    str += "</div>";
    AddToDOM(str, "APPEND", '#answer_area');
    var isDialogueContext = false;
    //if (isDialogue) // if its dialogue and we have only one partial answer so its a normal TU with dialogue context - the UI is diffrent in this case
    //    isDialogueContext = true;
    JSDisplayOnePartialAnswer(pAnswer, false, isDialogue, isDialogueContext, 1);
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayOnePartialAnswer
// Used by the two functions that display the partial answer (both for Text TUs and single-TS TUs).
// It creates the DOM tree of the partial-answer of one TS.
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayOnePartialAnswer(pAnswer, isTextTU, isDialogue = false, isDialogueContext = false, TSindex = 0, parent_div = null) {
    var nonWhiteCharsRegex = /\S/; // means "non white characters"
    var blankRegex = /\_[0-9]+$/;
    var blankWithPMRegex = /\_[0-9]+\W+$/;
    var blankWithPosessiveRegex = /\_[0-9]+'s\W*$/;
    var PMRegex = /\W+$/;
    var PMRegexAtStart = /^\W/;
    var blankIndex = 0;
    var answerParts = pAnswer.split(/[\s-]/);
    var nextLocInPatialAnswer = 0;
    var str = "";
    for (i = 0; i < answerParts.length; i++) {
        //alert(answerParts[i]);
        if (answerParts[i].match(nonWhiteCharsRegex) != null) { // if not empty
            nextLocInPatialAnswer += answerParts[i].length;
            // check if there are one or more letters before the underscore
            var fl = "";
            var flPM = "";
            var iundersc = answerParts[i].indexOf("_");
            if (iundersc > 0) {
                fl = answerParts[i].substr(0, iundersc);
                if (isSecondChance == "LettersHints") {
                    $('#hint-button').attr('disabled', true);
                    // number of chracters in addition to the supplied hint
                    var expectedInputLen = null;
                    // check for punctuation mark
                    flPM = answerParts[i].match(PMRegex);
                    var pm = "";
                    // if punctuation mark found
                    if (flPM != null) {
                        const flPmIndex = (flPM.length > 0 ? flPM["index"] : answerParts[i].length);
                        expectedInputLen = answerParts[i].substr(iundersc + 1, flPmIndex);
                        // get the punctuation mark
                        pm = flPM.length > 0 ? flPM[0] : "";
                    } else {
                        // if no PM
                        expectedInputLen = answerParts[i].substr(iundersc + 1);
                    }
                    var possessionStr = (answerParts[i].match(blankWithPosessiveRegex)) ? "'s" : "";
                    var size = parseInt(expectedInputLen) + fl.length; // The length of the expected input + the length of the hint
                    answerParts[i] = "_" + size + possessionStr + pm;
                    flPM = "";
                } else {
                    answerParts[i] = answerParts[i].replace(fl, "");
                }

                if (fl.match(PMRegexAtStart)) {
                    flPM = fl.match(PMRegexAtStart);
                    fl = fl.replace(flPM, "");
                }
            }
            if (answerParts[i].match(blankRegex)) { // if a regular blank (_<num>)
                var blankLength = parseInt(answerParts[i].replace("_", "")) + 2;
                //console.log(answerParts[i]); TEMP blanks too short
                if (flPM != "")
                    str += "<label class=\"p_answer_lbl_cl\">" + flPM + "</label>";
                str += JSDisplayBlankInPartialAnswer(fl, blankIndex, blankLength, parent_div ? TSindex : null);
                blankIndex++;
            }
            // There is a problem that the PM after the blank might appear in the next line.
            // It can be solved by uniting the blank DOM and the PM DOM in a span of class "no_break_span".
            // We didn't do that because it will change the DOM tree structure, and thus the traverse functions
            // have to be changed. Note also that it should be solved also in the function: JSHighlightWrongWords().
            else if (answerParts[i].match(blankWithPMRegex)) { // if a blank with PM (_<num><PM>)                
                var blankLength = parseInt(answerParts[i].replace(PMRegex, "").replace("_", "")) + 2;
                if (flPM != "")
                    str += "<label class=\"p_answer_lbl_cl\">" + flPM + "</label>";
                str += JSDisplayBlankInPartialAnswer(fl, blankIndex, blankLength, parent_div ? TSindex : null);
                blankIndex++;
                var PM = answerParts[i].match(PMRegex);
                str += "<label class=\"p_answer_lbl_cl\">" + PM + "</label>";
            }
            else if (answerParts[i].match(blankWithPosessiveRegex)) { // if a blank with 's (_<num><'s>)
                var blankLength = parseInt(answerParts[i].replace("'s", "").replace("_", "")) + 2;
                if (flPM != "")
                    str += "<label class=\"p_answer_lbl_cl\">" + flPM + "</label>";
                str += JSDisplayBlankInPartialAnswer(fl, blankIndex, blankLength, parent_div ? TSindex : null);
                blankIndex++;
                str += "<label class=\"p_answer_lbl_cl\">'s</label>";
                var PMafterPosessive = answerParts[i].match(PMRegex);
                if (PMafterPosessive)
                    str += "<label class=\"p_answer_lbl_cl\">" + PMafterPosessive + "</label>";
            }
            else { // sentence word, not blank
                // if there is a punctuation mark at the start, separate it from word
                var word = answerParts[i];
                var PMatStart = null;
                if (answerParts[i].match(PMRegexAtStart)) {
                    PMatStart = answerParts[i].match(PMRegexAtStart);
                    word = answerParts[i].substr(1);
                }
                // if there is a punctuation mark at the end, separate it from word
                //var PM = null;
                //if (word.match(PMRegex)) {
                //    PM = answerParts[i].match(PMRegex);
                //    word = word.replace(PM, "");
                //}
                // if there is a 's at the end of the word and it's NOT a contraction, separate it from word
                var posession = null;
                var posRegex = /\'s$/;
                if (word.match(posRegex) && (!JSIsContraction(word))) {
                    posession = "'s";
                    word = word.replace("'s", "");
                }
                if (PMatStart != null) {
                    str += "<label class=\"p_answer_lbl_cl\">" + PMatStart + "</label>";
                }
                str += "<label class=\"p_answer_lbl_cl\">" + word + "</label>";
                if (posession != null) {
                    str += "<label class=\"p_answer_lbl_cl\">" + posession + "</label>";
                }
                //if (PM != null) {
                //    str += "<label class=\"p_answer_lbl_cl\">" + PM + "</label>";
                //}
            }
            if ((nextLocInPatialAnswer < pAnswer.length) && (pAnswer[nextLocInPatialAnswer] == "-"))
                str += "<span class=\"span_cl\">-</span>";
            else
                str += "<span class=\"span_cl\"></span> ";
            nextLocInPatialAnswer++
        }
    }
    var pos = str.lastIndexOf(' ');
    str = str.substring(0, pos);

    var isDialogueWithImage = isDialogue && !isDialogueContext && (JSCurTU.mustHaveImage == "True");
    var isDialogueWithoutImage = isDialogue && !isDialogueContext && (JSCurTU.mustHaveImage == "False");

    $('#instruction').removeClass('dialog-speak');
    // if this TS is part a dialogue TextSB exercise put the TS in a dialogue bubble
    if (isDialogue) {
        if (isDialogueWithoutImage || JSCurTU.TUtype == "TextSB") {
            if (JSCurTU.TUtype == "DialogDictate") {
                str = JSGetDialogDictateBubble(TSindex, str);
            }
            else if (JSCurTU.TUtype == "Dictate") {
                str = JSGetDialogWithDictateBubble(TSindex, str);
            }
            else if (JSCurTU.TUtype == "DialogSpeak") {
                str = JSGetDialogSpeakBubble(TSindex, str);
            }
            else if (JSCurTU.TUtype == "SORT") {
                str = JSGetDialogSORTBubble(TSindex, str);
            } else {
                str = JSGetDialogBubble(TSindex, str);
            }

            $('#instruction').addClass('dialog-speak');

        }
        // if this TS has a dialogue CONTEXT (not full dialogue TU - not Text SB) or a dialogue that must have image - start the TS with "-" and end line after TS text
        else if ((isDialogue && isDialogueContext) || isDialogueWithImage) {
            //str = "<label class=\"dialogue_pre\">&minus; </label>" + str + "<br class=\"dialogue_new_line\" />";
            if (JSCurTU.TUtype == "ImageLKU") {
                str = JSGetImageDialogBubble(TSindex, str);
            }
        }
    }


    if (parent_div) { // Grammar sort: Wrap each answer section (including word bank) with an id
        str = "<div id='" + parent_div + "' class='gs_input_wrapper'><div class='gs_input'>" + str + "</div></div>";
    }
    AddToDOM(str, "APPEND", '#response_parts');

    if (JSCurTU.TUtype == "DialogSpeak") {
        // inital hide listen to record panel
        $(".right_bubble .listen-to-record-panel").hide();
    }

    if (TSindex > 0) {
        $(`#ts-${TSindex}`).hide();
    }

    // for blanks with hint, the name is the hint.
    // here we force the input of the blanked element to start with the hint, i.e. avoid the removal of the hint.
    $('.p_answer_tbx_cl').each(function () {
        $(this).attr("autocapitalize", "off");

        //disable paste
        if (!JSisClilTrial && !JSisUsertup) {
            $(this).on('paste', function (e) {
                e.preventDefault();
            });
        }

        var name = $(this).attr('name');
        if (name != "") {
            $(this).on('input', function () {

                JSDynamicInputWidth(this);

                if ($(this).val().indexOf(name) !== 0) {
                    $(this).val(name);
                }
            });
        } else {
            $(this).on('input', function () {

                JSDynamicInputWidth(this);

            });
        }


        var screenWidth = window.screen.width;

        // we want to prevent the user from using the keyboard suggestions since it moves the hint to the right when using it.
        if (!isIPad() && (screenWidth >= 481 && screenWidth <= 991) && !JSisUsertup) {

            // don't allow inserting multiple chars at once -> will prevent inserting the keyboard suggestions

            $(this).keydown(function () {
                tbxStrln = $(this).val().length;
                prevTbxVal = $(this).val();
            });

            $(this).keyup(function () {
                var newLen = $(this).val().length;
                var diff = newLen - tbxStrln;
                if (diff > 1) {
                    $(this).val(prevTbxVal);
                }
            });
        }
    });
    // when we focus on the blank in the user-answer, we put the cursor at the end of the text
    // (needed in blanks with hints).
    $('.p_answer_tbx_cl').on("focus", function () {
        $(this).putCursorAtEnd();

        //define original width of the field on first focus
        if ($(this).attr('data-original-width') == undefined) {
            $(this).attr('data-original-width', $(this).width());
        }
    });

    // Deal with overflow in bubbles
    $('.p_answer_tbx_cl').on('blur', function () {
        $(this).parent('.bubble-text').scrollLeft(0);
    });

    // we assume here that p_answer_tbx_cl which are with hint match only one word, and therefore we jump to next blank when the user 
    // presses space. this is to avoid writing parts of the sentence that are already displayed.
    $('.p_answer_tbx_cl').keyup(function (event) {
        JSDetectTextAnswer();
        if (event.keyCode == '32') { // space
            var name = $(this).attr('name');
            if (name != "") { // there is a hint, so only one word is expected, and space is regarded as tab
                var ind = $('.p_answer_tbx_cl').index(this);
                $('.p_answer_tbx_cl').eq(ind + 1).focus();
            }
        }
    });

    if (JSIsRtlLanguage(UILang)) {
        $('p.translation-text').css("direction", "rtl")
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSGetDialogueIcons
// returns the dialog's speakers icons according to the recordes' gender
////////////////////////////////////////////////////////////////////////////////////////
function JSGetDialogueIcons() {
    if (recorderGender1 == "M" && recorderGender2 == "F")
        return ["male_manga_grey.svg", "female_manga_blue.svg"];
    if (recorderGender1 == "F" && recorderGender2 == "M")
        return ["female_manga_grey.svg", "male_manga_blue.svg"];
    if (recorderGender1 == "M" && recorderGender2 == "M")
        return ["male_manga_grey.svg", "male_manga_blue.svg"];
    else // "F" & "F"
        return ["female_manga_grey.svg", "female_manga_blue.svg"];
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSGetNewDialogueIcons
// returns the dialog's speakers icons according to the recordes' gender
////////////////////////////////////////////////////////////////////////////////////////
function JSGetNewDialogueIcons() {
    if (recorderGender1 == "M" && recorderGender2 == "F")
        return ["male_manga.svg", "female_manga.svg"];
    if (recorderGender1 == "F" && recorderGender2 == "M")
        return ["female_manga.svg", "male_manga.svg"];
    if (recorderGender1 == "M" && recorderGender2 == "M")
        return ["male_manga.svg", "male_manga.svg"];
    else // "F" & "F"
        return ["female_manga.svg", "female_manga.svg"];
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSGetDialogDictateBubble
// returns the dialog's dictate bubble
////////////////////////////////////////////////////////////////////////////////////////
function JSGetDialogDictateBubble(TSindex, bubbleText) {
    var str = '';
    var bubbleClass = "";
    var icons = JSGetNewDialogueIcons();
    var tsId = `ts-${TSindex}`
    if (TSindex % 2 == 0) {
        bubbleClass = "left_bubble bubble";
        str = `
                <div class="left_ts" id=${tsId}>
                    <div class="left_message dialog-dictate">
                        <div class="audio-container">
                                <button id="speak-hear-audio" class="speak-play-resume" onClick="JSAudioPlayTSIndex(${TSindex}, true, false, false);" > <img id="speak-play-resume_${TSindex}" src='${s3ExerciseImages}/speak_play.svg' alt=\"\" /></button>
            <div class="speak-playbar speak-playbar-${TSindex}">
            <div class="speak-playbar-progress speak-playbar-progress-${TSindex}" />
                <span> 00:00 </span>
            </div>
            <button class="speak-speed speak-speed-${TSindex}" onclick=\"JSAudioUpdatePlayRateDictateDialogue(${TSindex})\" >1 x</button>
                       </div>
                        <div class="${bubbleClass}">
                            <div class="bubble-text">${bubbleText}</div>
                        </div>
                        <div class="submit-message-container">
                        <button class="submit-message ${isSecondChance == "NoHelp" ? '' : 'disabled'}" onclick="JSDisplayNextBubble(${TSindex})" ><img src="${s3ExerciseImages}/send_button.svg"  /></button>
                        </div>
                    </div>
                </div>
`;
    }
    else {
        bubbleClass = "right_bubble bubble";
        str = `
                <div class="right_ts" id=${tsId}>
                    <div class="right_message dialog-dictate">
                          <div class="audio-container">
                                <button id="speak-hear-audio" class="speak-play-resume" onClick="JSAudioPlayTSIndex(${TSindex}, true, false, false);" > <img id="speak-play-resume_${TSindex}" src='${s3ExerciseImages}/speak_play.svg' alt=\"\" /></button>
            <div class="speak-playbar speak-playbar-${TSindex}">
            <div class="speak-playbar-progress speak-playbar-progress-${TSindex}" />
                <span> 00:00 </span>
            </div>
            <button class="speak-speed speak-speed-${TSindex}" onclick=\"JSAudioUpdatePlayRateDictateDialogue(${TSindex})\" >1 x</button>
                       </div>
                        <div class="${bubbleClass}">    
                            <div class="bubble-text">${bubbleText}</div>
                        </div>
                        <div class="submit-message-container">
                        <button class="submit-message ${isSecondChance == "NoHelp" ? '' : 'disabled'}" onclick="JSDisplayNextBubble(${TSindex})" ><img src="${s3ExerciseImages}/send_button.svg"  /></button>
                        </div>
                    </div>
                </div>`;
    }
    JSAudioProgressDictateDialog(TSindex);

    return str;
}


function JSGetDialogWithDictateBubble(TSindex, bubbleText) {
    var str = '';
    var bubbleClass = "";
    var icons = JSGetNewDialogueIcons();
    var hasInput = bubbleText.indexOf('<input') != -1;
    var tsId = `ts-${TSindex}`;

    var audioContainer = `
                        <div class="audio-container">
                            <button id="speak-hear-audio" class="speak-play-resume" onClick="JSPlayCorrectAudio(this)" > <img id="speak-play-resume_${TSindex}" src='${s3ExerciseImages}/speak_play.svg' alt=\"\" /></button>
                            <div class="speak-playbar speak-playbar-${TSindex}">
                                <div class="speak-playbar-progress speak-playbar-progress-${TSindex}" />
                                <span> 00:00 </span>
                            </div>
                            <button class="speak-speed speak-speed-${TSindex}" onclick=\"JSAudioUpdatePlayRateDictateDialogue(${TSindex})\" >1 x</button>
                        </div>
        `;

    if (TSindex % 2 == 0) {
        bubbleClass = "left_bubble bubble";
        str = `
                <div class="left_ts" id=${tsId}>
                    <div class="left_message ${hasInput ? 'dialog-dictate' : ''}">
                        ${hasInput ? audioContainer : ''}
                        <div class="${bubbleClass}">
                            <div class="bubble-text">${bubbleText}</div>
                        </div>
                        <div class="submit-message-container">
                        <button class="submit-message ${isSecondChance == "NoHelp" ? '' : 'disabled'}" onclick="JSDisplayNextBubble(${TSindex})" ><img src="${s3ExerciseImages}/send_button.svg"  /></button>
                        </div>
                    </div>
                </div>
`;

    }
    else {
        bubbleClass = "right_bubble bubble";

        str = `
                <div class="right_ts" id=${tsId}>
                    <div class="right_message ${hasInput ? 'dialog-dictate' : ''}">
                        ${hasInput ? audioContainer : ''}
                        <div class="${bubbleClass}">    
                            <div class="bubble-text">${bubbleText}</div>
                        </div>
                         <div class="submit-message-container">
                        <button class="submit-message ${isSecondChance == "NoHelp" ? '' : 'disabled'}" onclick="JSDisplayNextBubble(${TSindex})" ><img src="${s3ExerciseImages}/send_button.svg"  /></button>
                        </div>
                    </div>
                </div>`;

    }
    JSAudioProgressDictateDialog(TSindex);
    return str;
}
/////////////////////////////////////////////////////////////////////////////////////////
// JSGetDialogSpeakBubble
// returns the dialog's speak bubble
////////////////////////////////////////////////////////////////////////////////////////
function JSGetDialogSpeakBubble(TSindex, bubbleText) {
    var str = '';
    var bubbleClass = "";
    var icons = JSGetNewDialogueIcons();
    var tsId = `ts-${TSindex}`
    if (TSindex % 2 == 0) {
        bubbleClass = "left_bubble bubble";
        str = `
                <div class="left_ts" id=${tsId}>
                    <div class="left_message dialog-speak">
 <div class="audio-container">
                                <button id="speak-hear-audio" class="speak-play-resume" onClick="JSAudioPlayTSIndex(${TSindex}, true, false, false);" > <img id="speak-play-resume_${TSindex}" src='${s3ExerciseImages}/speak_play.svg' alt=\"\" /></button>
            <div class="speak-playbar speak-playbar-${TSindex}">
            <div class="speak-playbar-progress speak-playbar-progress-${TSindex}" />
                <span> 00:00 </span>
            </div>
            <button class="speak-speed speak-speed-${TSindex}" onclick=\"JSAudioUpdatePlayRateDictateDialogue(${TSindex})\" >1 x</button>
                       </div>
                        <div class="${bubbleClass}">                      
                            <div class="bubble-text"><div class="display-block">${bubbleText.trim()}</div></div>
                        </div>
                         <div class="submit-message-container">
                        <button class="submit-message ${isSecondChance == "NoHelp" ? '' : 'disabled'}" onclick="JSDisplayNextBubble(${TSindex})" ><img src="${s3ExerciseImages}/send_button.svg"  /></button>
                        </div>
                    </div>
                </div>`;
    }
    else {
        bubbleClass = "right_bubble bubble";
        str = `
                <div class="right_ts" id=${tsId}>
                    <div class="right_message dialog-speak">
<div class="audio-container">
                                <button id="speak-hear-audio" class="speak-play-resume" onClick="JSAudioPlayTSIndex(${TSindex}, true, false, false);" > <img id="speak-play-resume_${TSindex}" src='${s3ExerciseImages}/speak_play.svg' alt=\"\" /></button>
            <div class="speak-playbar speak-playbar-${TSindex}">
            <div class="speak-playbar-progress speak-playbar-progress-${TSindex}" />
                <span> 00:00 </span>
            </div>
            <button class="speak-speed speak-speed-${TSindex}" onclick=\"JSAudioUpdatePlayRateDictateDialogue(${TSindex})\" >1 x</button>
                       </div>
                        <div class="${bubbleClass}">
<div class="speak-original-attempts">
    <img src='${s3ExerciseImages}/speak-attempt.svg' alt=\"\"  />
    <img src='${s3ExerciseImages}/speak-attempt.svg' alt=\"\"  />
    <img src='${s3ExerciseImages}/speak-attempt.svg' alt=\"\"  />
</div>
                            <div class="bubble-text"><div id="speak_ts_lbl">${bubbleText.trim()}</div></div>
<div class="speak-original-speaking-control-body" >
    <div id="speaking-waves"  />
    <button  class="speak-original-speaking-control" onclick=\"JSstartRecording()\" >
        <img id="record" src='${s3ExerciseImages}/speaker.svg'   alt=\"\"  />
<audio id=recordedAudio></audio></div>
    </button>
<div class="listen-to-record-panel">
 <p>Listen to the recording</p>
<div>
<button class="listen-play-resume" > <img  src='${s3ExerciseImages}/speak_play.svg' alt=\"\" />  </button>
<div class="listen-playbar">
            <div class="listen-playbar-progress" />
                <span> 00:00 </span>
            </div>
<button class="listen-speed" onclick=\"JSRecordedAudioUpdatePlayRate()\" >1 x</button>
<button class="re-record" onclick=\"JSstartRecording()\"> <img  src='${s3ExerciseImages}/speaker_re_record.svg' alt=\"\" />  </button>
</div>
</div>
                        </div>
                         <div class="submit-message-container">
                        <button class="submit-message ${isSecondChance == "NoHelp" ? '' : 'disabled'}" onclick="JSDisplayNextBubble(${TSindex})" ><img src="${s3ExerciseImages}/send_button.svg"  /></button>
                        </div>
                    </div>

                </div>`;



    }

    return str;
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSGetDialogBubble
// returns the dialog's speak bubble
////////////////////////////////////////////////////////////////////////////////////////
function JSGetDialogBubble(TSindex, bubbleText) {
    var str = '';
    var bubbleClass = "";
    var icons = JSGetDialogueIcons();
    var tsId = `ts-${TSindex}`
    if (TSindex % 2 == 0) {
        bubbleClass = "left_bubble bubble";
        str = `
                <div class="left_ts" id=${tsId} >
                    <div id="TS${TSindex}-avatar" class="avatar left" style="background-image: url(${s3ExerciseImages}/${icons[0]});"></div>
                    <div class="left_message">
                        ${(JSCurTU.TUtype == 'Translate' && bubbleText.indexOf('<input') != -1 ? '<p class="translation-text">' + JSCurTU.task + '</p>' : '')}
                        <div class="${bubbleClass}">                            
                            <div class="bubble-text">
                                ${bubbleText}
                            </div>
                        </div>
                        <div class="submit-message-container">
                        <button class="submit-message ${isSecondChance == "NoHelp" ? '' : 'disabled'}" onclick="JSDisplayNextBubble(${TSindex})" ><img src="${s3ExerciseImages}/send_button.svg"  /></button>
                        </div>
                    </div>
                </div>`;
    }
    else {
        bubbleClass = "right_bubble bubble";
        str = `
                <div class="right_ts" id=${tsId}>
                    <div id="TS${TSindex}-avatar" class="avatar right" style="background-image: url(${s3ExerciseImages}/${icons[1]});"></div>                    
                    <div class="right_message">
                        ${(JSCurTU.TUtype == 'Translate' && bubbleText.indexOf('<input') != -1 ? '<p class="translation-text">' + JSCurTU.task + '</p>' : '')}
                        <div class="${bubbleClass}">                            
                            <div class="bubble-text">
                                ${bubbleText}
                            </div>
                        </div>
                        <div class="submit-message-container">
                        <button class="submit-message ${isSecondChance == "NoHelp" ? '' : 'disabled'}"  onclick="JSDisplayNextBubble(${TSindex})" ><img src="${s3ExerciseImages}/send_button.svg" /></button>
                        </div>
                    </div>
                </div>`;
    }

    return str;
}

function JSGetImageDialogBubble(TSindex, bubbleText) {
    var str = '';
    var bubbleClass = "";
    var icons = JSGetDialogueIcons();
    var tsId = `ts-${TSindex}`
    if (TSindex % 2 == 0) {
        bubbleClass = "left_bubble bubble";
        str = `
                <div class="left_ts" id=${tsId} >
                    <div id="TS${TSindex}-avatar" class="avatar left" style="background-image: url(${s3ExerciseImages}/${icons[0]});"></div>
                    <div class="left_message">
                        <div class="${bubbleClass}">
                            <div class="bubble-image">
                                <img src=""  alt=""/>
                            </div>
                            <div class="bubble-text">
                                ${bubbleText}
                            </div>
                        </div>
                        <div class="submit-message-container">
                        <button class="submit-message ${isSecondChance == "NoHelp" ? '' : 'disabled'}" onclick="JSDisplayNextBubble(${TSindex})" ><img src="${s3ExerciseImages}/send_button.svg"  /></button>
                        </div>
                    </div>
                </div>`;
    }
    else {
        bubbleClass = "right_bubble bubble";
        str = `
                <div class="right_ts" id=${tsId}>
                    <div id="TS${TSindex}-avatar" class="avatar right" style="background-image: url(${s3ExerciseImages}/${icons[1]});"></div>                    
                    <div class="right_message">
                        <div class="${bubbleClass}">
                            <div class="bubble-image">
                                <img src=""  alt=""/>
                            </div>
                            <div class="bubble-text">
                                ${bubbleText}
                            </div>
                        </div>
                        <div class="submit-message-container">
                        <button class="submit-message ${isSecondChance == "NoHelp" ? '' : 'disabled'}" onclick="JSDisplayNextBubble(${TSindex})" ><img src="${s3ExerciseImages}/send_button.svg" /></button>
                        </div>
                    </div>
                </div>`;
    }

    return str;
}

function JSGetDialogSORTBubble(TSindex, bubbleText) {
    var str = '';
    var bubbleClass = "";
    var icons = JSGetDialogueIcons();
    var tsId = `ts-${TSindex}`
    if (TSindex % 2 == 0) {
        bubbleClass = "left_bubble bubble";
        str = `
                <div class="left_ts" id=${tsId} >
                    <div id="TS${TSindex}-avatar" class="avatar left" style="background-image: url(${s3ExerciseImages}/${icons[0]});"></div>
                    <div class="left_message">
                        <div class="${bubbleClass}">                            
                            <div class="bubble-text">
                                ${bubbleText}
                            </div>
                        </div>
                        <div class="submit-message-container">
                        <button class="submit-message ${isSecondChance == "NoHelp" ? '' : 'disabled'}" onclick="JSDisplayNextBubble(${TSindex})" ><img src="${s3ExerciseImages}/send_button.svg"  /></button>
                        </div>
                    </div>
                </div>`;
    }
    else {
        bubbleClass = "right_bubble bubble";
        str = `
                <div class="right_ts" id=${tsId}>
                    <div id="TS${TSindex}-avatar" class="avatar right" style="background-image: url(${s3ExerciseImages}/${icons[1]});"></div>                    
                    <div class="right_message">
                        <div class="${bubbleClass}">                            
                            <div class="bubble-text">
         
                                ${bubbleText}
                            </div>
                        </div>
                        <div class="submit-message-container">
                        <button class="submit-message ${isSecondChance == "NoHelp" ? '' : 'disabled'}"  onclick="JSDisplayNextBubble(${TSindex})" ><img src="${s3ExerciseImages}/send_button.svg" /></button>
                        </div>
                    </div>
                </div>`;
    }

    return str;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayNextBubble
// Displays the next bubble
//////////////////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayNextBubble(TSindex) {

    if (!TSindex) {
        TSindex = $('.left_ts:visible').length + $('.right_ts:visible').length - 1;
        if ($('.left_ts:visible').length + $('.right_ts:visible').length < $('.left_ts').length + $('.right_ts').length) {
            $('#ts-' + (TSindex + 1)).show();
        } else {
            if (JSCurTU.TUtype == "DialogSpeak") {
                JSSpeakCheckBtnPressed();
            } else {
                JSCheckBtnPressed();
            }
        }
    } else {
        // show next ts bubble
        if ($(`#ts-${TSindex + 1}`).length == 1) {
            $(`#ts-${TSindex + 1}`).show();
        } else {
            if (JSCurTU.TUtype == "DialogSpeak") {
                JSSpeakCheckBtnPressed();
            } else {
                JSCheckBtnPressed();
            }
            return;
        }
    }

    // hide or disable current button (current only disable)
    //if ($(`#ts-${TSindex}`).find('input').length > 0)
    $(`#ts-${TSindex} .submit-message`).addClass('disabled').attr('disabled');


    // animate scroll down
    // sum 63 to compensate the chat header
    if ($(`#ts-${TSindex + 1}`).length > 0) {
        $(`#exercise`).animate({
            scrollTop: $(`#ts-${TSindex + 1}`).offset().top - $(`#ts-${TSindex + 1}`).parent().offset().top + 40
        }, 800)
    }

    if (
        !hideHintDomain.includes(JSCurTU.TUtype) &&
        $("[class$='left_ts']:hidden").length + $("[class$='right_ts']:hidden").length == 0
    ) {
        JSEnableNextButton();
        JSEnableHintButton();
    }


}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayBlankInPartialAnswer
// Displays the blank text-box, i.e. the textbox where the user fill the word(s).
// If fl != "", then there is a hint. The hint is the name of the input element.
// The name is used to force the the element value to start with the hint, i.e. avoid removal of the hint.
//////////////////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayBlankInPartialAnswer(fl, blankIndex, blankLength, answer_idx) {
    var grammarsort_class = answer_idx != null ? "blank_grp_" + answer_idx : "";
    var fieldSize = blankLength;

    //we need to delimit the width for input field in DialogDictate on small devices
    if (JSCurTU.TUtype == "DialogDictate" && $(window).width() < 1270) {
        fieldSize = (blankLength > 20 ? 20 : blankLength);
    }

    var str = "";
    str += "<span class=\"hidden-field-value\" data-input-id=\"response_" + blankIndex + "_tbx\"></span><input data-hj-allow type=\"text\" id=\"response_" + blankIndex + "_tbx" + (answer_idx != null ? "_" + answer_idx : "") + "\" class=\"" + grammarsort_class + "p_answer_tbx_cl\" name=\"" + fl + "\"";
    str += " size=\"" + fieldSize + "\" value=\"" + fl + "\" autocomplete=\"off\" \/>";
    return str;
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayPartialAnswers
// Displays the partial answers in case of Text TUs with blanks.
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayPartialAnswers(panswer_size, panswers, isDialogue = false) {
    $('#response_parts').remove();
    var str = "<div id=\"response_parts\">";
    str += "</div>";
    AddToDOM(str, "APPEND", '#answer_area');
    if (isDialogue && (JSCurTU.mustHaveImage == 'False')) {
        $('#ex_image_div').empty();
        $('#answer_area').css("border", "0px");
        $('#answer_area').css("overflow", "auto");
        $('#answer_area').css({ "padding-left": "0px", "padding-right": "0px" });

        // Add date
        var today = new Date();
        var timeStr = `
            <p>Today ${today.getHours()}:${today.getMinutes()}</p>
        `;
        AddToDOM(timeStr, "APPEND", '#response_parts');
    }
    for (TSindex = 0; TSindex < panswer_size; TSindex++) {


        JSDisplayOnePartialAnswer(panswers[TSindex], true, isDialogue, false, TSindex, JSCurTU.TUtype == "GrammarSORT" ? "panswer_" + TSindex : null);

        if (JSCurTU.TUtype == "GrammarSORT" || JSCurTU.TUtype == "GrammarSB") {
            str = "<input type=\"hidden\" id=\"grammar_sort_response_" + TSindex + "\"  class=\"grammar_sort_response\" value=\" " + TSindex + "\" />";
            AddToDOM(str, "APPEND", '#response_parts');
        }

        if (TSindex != (panswer_size - 1)) {
            str = "<span class=\"text_tu_sep_cl\"></span>";
            if (JSCurTU.TUtype == "TextSB")
                str = "<span class=\"text_tu_sep_cl\">&nbsp</span>";
            if (JSCurTU.TUtype == "GrammarSB")
                str = "<span class=\"text_tu_sep_cl\">&nbsp <br/> </span>";
            AddToDOM(str, "APPEND", '#response_parts');
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSCheckUserAnswer
// Get LA, according to TU type, and send it to server to check it.
/////////////////////////////////////////////////////////////////////////////////////////
function JSCheckUserAnswer(isIDontKnow, isHint = false) {
    if (curExercisePart != EXERCISE_PARTS.EXERCISE) {
        return;
    }

    JSDisableNextButton();
    var resp_str = "";
    var user_resp = "";
    var PaTU = false;
    var isMCTU = $('input:radio:checked').size() > 0;

    // if response label ("Your answer") is visible, TU type is NOT SMA
    if ($('#your_answer').is(":visible")) {
        // if response text box exists (it is a response to a translation task)
        if ($('#response_tbx').size() > 0)
            user_resp = resp_str = $('#response_tbx').val();
        else if (($('#response_parts').size() > 0) || (isSecondChance != "NoHelp")) {
            var respEl = (isSecondChance != "NoHelp") ? "#answer_area" : "#response_parts";
            $(respEl).find('input[type=text]').each(function () {
                // change many apostrophes types to be 'this char legal apostrophe'
                var wval = $(this).val();
                if ((wval.indexOf("´") != -1) || (wval.indexOf("`") != -1) || (wval.indexOf("‘") != -1) || (wval.indexOf("‛") != -1) || (wval.indexOf("’") != -1))
                    $(this).val(wval.replace(/[\´\`\‘\’\‛]/g, "'"));
                user_resp += $(this).val();
            });
            //if ((user_resp != "") || JSIsTUTypeWith2ndChance(JSCurTU.TUtype)) {
            $('.p_sort_answer_tbx_cl').each(function () {
                $(this).attr('class', 'p_answer_tbx_cl');
            });
            resp_str = JSGetUserAnswerWhenPartial(false);
            PaTU = true;
            //}
        }

        if (resp_str == null)
            user_resp = resp_str = "";
        // verify validity of resp_str:
        // 1. contains only expected characters: alphanumeric characters, hyphens, spaces and PMs.
        // 2. Not too long.
        if (resp_str != "") {
            // change many apostrophes types to be 'this char legal apostrophe'
            if ((resp_str.indexOf("´") != -1) || (resp_str.indexOf("`") != -1) || (resp_str.indexOf("‘") != -1) || (resp_str.indexOf("‛") != -1) || (resp_str.indexOf("’") != -1))
                resp_str = resp_str.replace(/[\´\`\‘\’\‛]/g, "'");
            if (resp_str.indexOf("$") != -1)
                resp_str = resp_str.replace(/\$/g, " DOLLAR_SIGN ");
            if (!isMCTU) {
                var invalidChar = /[^-\w\s\.,;:\?\!\']/;
                var hasInvalidChar = invalidChar.test(resp_str);
                if (hasInvalidChar == true) {
                    JSMessagePopup(true, GetInUILang(UILang, "Alert!"), GetInUILang(UILang, "Sentence has invalid character. Please remove it."));
                    JSEnableNextButton();
                    window.scrollTo(0, 0);
                    return;
                }
                if (!isQaLoadMode && JSIsTooLongLA(resp_str)) {
                    JSMessagePopup(true, GetInUILang(UILang, "Alert!"), GetInUILang(UILang, "Sentence is too long. Please fix it."));
                    JSEnableNextButton();
                    window.scrollTo(0, 0);
                    return;
                }
            }
        }
    }
    // We're checking the user's answer, so we avoid the answer from being modified.

    if ($('#user_answer') && $('#user_answer').val()) {
        resp_str = $('#user_answer').val();
    }

    $('#speaker_in_exercise').hide();
    $('#slow_speaker_in_exercise').hide();
    $('#answer_area input').attr('readonly', 'readonly');

    // In SORT, we cancel the option to select words from the response area and the machsan milim 
    if (JSCurTU.TUtype == "SORT" && !JSisDemonstrationMode)
        JSDeactivateSortTU();

    var LAtoServer;
    if (JSIsRCTU(JSCurTU.TUtype) || JSIsFWTU(JSCurTU.TUtype)) {
        LAtoServer = resp_str;
    } else {
        if (resp_str == null) resp_str = "";
        LAtoServer = resp_str != "" ? JSFormatLAToServer(resp_str, PaTU) : "";
    }

    // before we sent the LA to the server, we replace $ by "DOLLAR_SIGN".
    // the $ is a special character; it might be insecure to pass it to the server
    if (LAtoServer.indexOf("$") != -1)
        LAtoServer = LAtoServer.replace(/\$/g, " DOLLAR_SIGN ");

    var istr = "type=check_ex&uresp=" + LAtoServer;
    istr += "&clientUserName=" + UserName;
    istr += "&TUindex=" + JSCurTU.TUindex;

    // if it's the 2nd time we're checking this TU, no need to update again this TU
    if (isSecondChance == "NoHelp") {
        istr += "&curClientTU=" + TUindexOfCurClientTU;
        JSTracingLog("before check_ex");
    }
    else {
        istr += "&curClientTU=-1";
        JSTracingLog("before check_ex second chance");
    }

    if (isIDontKnow) {
        istr += '&isIDontKnow=' + isIDontKnow;
    }

    if (isHint) {
        istr += '&isHint=' + isHint;
    }

    istr += JSAddLACParams();
    var timeBeforeAA = Date.now();

    //workingTime
    lastPauseTime = new Date();
    TUWorkingSeconds += parseInt((lastPauseTime.getTime() - TUWorkTime) / 1000);
    istr += "&TUWorkingSeconds=" + TUWorkingSeconds;

    //set exercise part to flag the checking phase
    curExercisePart = EXERCISE_PARTS.CHECK_ANSWER;

    $.ajax({
        type: "POST",
        url: "UpdateLMCheck.aspx",
        data: istr,
        async: true,
        success: function (data) {
            if (!isIDontKnow) {
                JSBackFromAA(data, timeBeforeAA, isSecondChance);
                const waitingTime = continueMinWaitTime + Math.floor(Math.random() * continueMaxWaitTime + 1);
                console.log("waiting " + waitingTime + " seconds");
                
                setTimeout(function() {
                    JSGetNextTU();
                    console.log("waited");
                }, waitingTime * 1000); // Wait for 2 minutes
                
            } else {
                // if I Don't Know, we call the Next TU check the current as Skipped.
                JSGetNextTU(null, true);
            }
            //set exercise part to flag to exercise after checking
            if (curExercisePart == EXERCISE_PARTS.CHECK_ANSWER) {
                curExercisePart = EXERCISE_PARTS.EXERCISE;
            }

        },
        error: function (xhr, status, error) {
            JSSendLogToS3("check_ex ajax reached error: " + error);
            JSHandleAAError(xhr, status, error, timeBeforeAA, isSecondChance);
        },
        timeout: 5000
    });
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSFormatLAToServer
// Gets the user answer and makes from it a string in a pre defined format expected 
// by the server: each word in enclosed by JSLASepStr and preceeded by either a B in 
// case of blankified word, or an L in case of non blankified word (label).
////////////////////////////////////////////////////////////////////////////////////////
function JSFormatLAToServer(resp_str, PaTU) {
    var LAtoServer = "";
    if (!PaTU) { // answer is complete sentence, all is blanked
        var answerParts = resp_str.split(" ");
        for (i = 0; i < answerParts.length; i++) {
            LAtoServer += JSLASepStr + "B" + answerParts[i] + JSLASepStr;
            if (i != (answerParts.length - 1))
                LAtoServer += " ";
        }
    }
    else  // partial answer with blanks
        LAtoServer = JSGetUserAnswerWhenPartial(true);

    return LAtoServer;
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSGetUserAnswerWhenPartial
// Gets the user answer in case of TUs with blanks.
// Creates the string of the LA, by concatenating the different DOM elements.
////////////////////////////////////////////////////////////////////////////////////////
function JSGetUserAnswerWhenPartial(formatToServer) {
    var str = "";

    var child = (isSecondChance != "SpellingSecondChance") ? $('#response_parts').children().first() :
        $('#answer_area').children().first();

    // In grammer sort, each answer is wrapped in a div, together with its word bank
    // To identify grammar sort data, we check if its wrapper div, "#panswer_"+idx, exists. 
    if (child.attr('id') && child.attr('id').startsWith("panswer_")) {
        // repair "#response_parts" by removing the wrapping divs
        JSRemoveAnswerWrappers('response_parts', 'g_sort_response_parts');
        // re-fetch first child after fixing #response_parts structure
        child = $('#g_sort_response_parts').children().first();
        // remove temporary cloned element (Hamutal: Is it too soon to remove the clone here?)
        $('#g_sort_response_parts').remove();
    }

    if ($(child).attr('id') == "tss_context")
        child = $(child).next();
    var numOfBubbles = $("[class$='left_ts']").length + $("[class$='right_ts']").length;
    if (numOfBubbles > 0) { // dialogue
        var bubbleNum = 0;
        if (JSCurTU.TUtype == "TextSB" || JSCurTU.TUtype == "GrammarSB" || JSCurTU.TUtype == "GrammarSORT" | JSCurTU.TUtype == "DialogDictate" || JSCurTU.TUtype == "DialogSpeak") {
            $("[class='left_ts'], [class='right_ts']").each(function () {
                child = $(this).find('.bubble-text').children().first();
                while ((child != null) && (child.length > 0)) {
                    str += JSGetUserAnswerOfOneChild(child, formatToServer);
                    child = $(child).next();
                }
                bubbleNum++;

                if (bubbleNum != numOfBubbles)
                    str += "\n"; // end of sentence
            });
        } else {
            let responseContainer = $("input[type='text'].p_answer_tbx_cl").parent().parent().parent().parent();
            $(responseContainer).each(function () {
                child = $(this).find('.bubble-text').children().first();
                while ((child != null) && (child.length > 0)) {
                    str += JSGetUserAnswerOfOneChild(child, formatToServer);
                    child = $(child).next();
                }
                bubbleNum++;

                if (bubbleNum != numOfBubbles)
                    str += "\n"; // end of sentence
            });
        }
    }
    else {
        if (isSecondChance != "SpellingSecondChance") {
            while ((child != null) && (child.length > 0)) {
                str += JSGetUserAnswerOfOneChild(child, formatToServer);
                child = $(child).next();
            }
        } else {
            if (JSCurTU.TUtype != "GrammarSB") {
                while ((child != null) && (child.length > 0)) {
                    var parseChield = child;
                    if ($(child).attr("class").indexOf("secound-chance-container") != -1) {
                        parseChield = $(child).children().first();
                    }
                    str += JSGetUserAnswerOfOneChild(parseChield, formatToServer);
                    child = $(child).next();
                }
            } else {
                while ((child != null) && (child.length > 0)) {
                    var subChild = $(child).children().first();
                    if (subChild.length == 0) {
                        str += '\n';
                    }
                    while ((subChild != null) && (subChild.length > 0)) {
                        var parseChield = subChild;
                        if ($(subChild).attr("class").indexOf("secound-chance-container") != -1) {
                            parseChield = $(subChild).children().first();
                        }
                        str += JSGetUserAnswerOfOneChild(parseChield, formatToServer);
                        subChild = $(subChild).next();
                    }
                    child = $(child).next();
                }
            }

        }
    }

    return str;
}

///////////////////////////////////////////////////////////
// For each couple of answer and word bank there is a wrapper 
// These wrappers are not required at this stage and they prevent correct 
// parsing of the answer
///////////////////////////////////////////////////////////
function JSRemoveAnswerWrappers(parent_id, parent_clone_id) {
    //var answer_wrapper = $(parent_id).children().first();
    if ($('#' + parent_clone_id).length > 0) {
        $('#' + parent_clone_id).remove();
    }
    // We clone "respon
    var answer_wrapper = $('#' + parent_id).clone().prop("id", parent_clone_id).appendTo($('#' + parent_id).parent());
    answer_wrapper = answer_wrapper.children().first();
    //answer_wrapper_org.clone().attr("id", "input_clone").detach();
    while ((answer_wrapper != null) && (answer_wrapper.length > 0)) {
        // current wrapper id
        var wrapper_id = answer_wrapper.attr('id');
        // we keep next wrapper before we remove the current one
        var next_wrapper = answer_wrapper.next();

        if (wrapper_id && wrapper_id.startsWith("panswer_")) {
            /** 
             *  the wrapper has 2 childrean: the filled answer form and the ward bank
             *  We want to get rid of the bank and keep only re relevant part of the form (which inside 'gs_input')
             * **/
            // remove bank
            answer_wrapper.children().last().remove();
            // replace the wrapper with 'gs_input' content
            answer_wrapper.replaceWith(function () { return answer_wrapper.children().first().contents(); });
        }
        answer_wrapper = next_wrapper;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSGetUserAnswerOfOneChild
// Used by JSGetUserAnswerWhenPartial() to get the user answer in case of TUs with blanks.
// It reads one part of the LA, from its corresponding DOM element.
////////////////////////////////////////////////////////////////////////////////////////
function JSGetUserAnswerOfOneChild(child, formatToServer) {
    var str = "";
    //var temp = $(child).html();
    //console.log($(child));
    if ($(child).html() == "<br />")
        str += "\n";
    else if ($(child).attr('class').indexOf("p_answer_lbl") != -1) {
        if (formatToServer)
            str += JSLASepStr + "L" + $(child).text() + JSLASepStr;
        else
            str += $(child).text();
    }
    else if ($(child).attr("class").indexOf("p_answer_tbx_") != -1) {
        if (formatToServer) {
            var val = $(child).val();

            // In sort - capitalized every word that starts a sentence since we don't do it when dragging the word from the machsan
            if (JSCurTU.TUtype == "SORT" || JSCurTU.TUtype == "GrammarSORT") {
                var endOfSentenceP = [".", "?", "!"];
                var prevChildType = (JSCurTU.TUtype == "GrammarSORT") ? $(child).prev().prev().prev().val() : $(child).prev().prev().val();
                var prevChildText = (JSCurTU.TUtype == "GrammarSORT") ? $(child).prev().prev().prev().prev().text() : $(child).prev().prev().text();

                // capitalized if its the first word or if the weord brfore ended with one of the endOfSentenceP
                if ((typeof prevChildType == "undefined") || endOfSentenceP.indexOf(prevChildText) != -1)
                    val = val.substr(0, 1).toUpperCase() + val.substr(1);
            }

            str += JSLASepStr + "B" + val + JSLASepStr;
        }
        else
            str += $(child).val();
    }
    // second_chance_corr is for a correct answer that the user gave before spelling second chance.
    // for bug fix: these answer didn't appeared as user answer in that case only the word with the spelling mistake.
    else if ($(child).attr("class") == "second_chance_corr") {
        if (formatToServer)
            str += JSLASepStr + "B" + $(child).text() + JSLASepStr;
        else
            str += $(child).text();
    }
    else if ($(child).attr("class").indexOf("text_tu_sep_cl") != -1)
        str += "\n";
    else if ($(child).html() == "")
        str += " ";
    else if ($(child).html() == "-")
        str += "-";
    return str;
}

function JSIsTooLongLA(resp_str) {
    if (TSlength <= 0)
        return false; // occurs only in TextTUs. in these TUs, we should check it for each TS
    var LAlength = resp_str.length;
    maxLALength = TSlength + 20;
    return (LAlength > maxLALength);
}

function JSBackFromAA(data, timeBeforeAA, secondChanceCaller) {

    JSEnableNextButton();


    JSUpdateLastAjaxCall("check_ex " + secondChanceCaller, timeBeforeAA);
    JSTracingLog("after check_ex");
    if ((data == null) || (data.indexOf("Internal error:") != -1) ||
        (data.indexOf("Operation failed:") != -1) || (data.indexOf(JSSorryMsg) != -1)) {
        JSHandleAAError(timeBeforeAA, true);
        return;
    }

    if (data.indexOf("We detected that two users are using the same browser") == 0) {
        /*JSMessagePopup(true, GetInUILang(UILang, "Alert!"), GetInUILang(UILang, "We detected that two users are using the same browser"), function () {
            window.location.assign("Login.aspx");
        });*/
        return;
    }
    /*
    if (data.indexOf("Your session has expired") != -1) {
        JSMessagePopup(true, GetInUILang(UILang, "Alert!"), data, function () {
            window.location.assign("Login.aspx");
        });
        return;
    }
    */
    var jv_object = JSSecureJsonEval(data);

    if (jv_object == null) {
        JSHandleAAJsonError(data);
        return;
    }

    //check for rollBackTime 
    if (jv_object && jv_object.rollBackTime > 0) {
        rollBackTime = jv_object.rollBackTime;
    } else {
        rollBackTime = 0;
    }


    //JSUpdateKPInFooter(jv_object.lesson_kp, jv_object.total_kp);

    isSecondChance = (isQaLoadMode || JSIsRCTU(JSCurTU.TUtype) || JSIsFWTU(JSCurTU.TUtype)) ? "NoHelp" : jv_object.with_help;
    correctType = jv_object.correct_type;
    KPforThisTU = 0;

    if (isSecondChance !== "" && !JSIsRCTU(JSCurTU.TUtype) && !JSIsFWTU(JSCurTU.TUtype)) {
        $('#hint-button').attr('disabled', true);
        $('#hint-button:disabled > svg > path:first-of-type').css({ "fill": "#c3c3c3" });
        $('#hint-button:disabled > svg > path:last-of-type').css({ "stroke": "#c3c3c3" });
    }

    //KPforThisTU = jv_object.KPforThisTU;


    // if we're using a machsan TU, then its TUindex is the machsan TU index, until we get the real TUindex, returned from AA.
    if (TUindexOfCurClientTU != -1)
        JSCurTU.TUindex = jv_object.TUindex;

    if (isSecondChance != "NoHelp") {
        var isNumInDigitErr = (isSecondChance == "NumInDigitsSecondChance");
        if (isNumInDigitErr)
            isSecondChance = "SpellingSecondChance";
        JSDisplaySecondChance(jv_object, isNumInDigitErr);
        return;
    }

    if (isQuizTime) {
        $('#exercise-monitor').animate({ bottom: '-200%' }, 1000, function () {
            JSGetNextTU();
        });
        if (screen.width < 580) {
            $('#user_feedback_toggle').animate(
                { opacity: '0' },
                250,
                function () {
                }
            );
        }
        return
    }

    // If is quiz time or test time or free writing tu we want to move straight to next TU after the user answer the TU
    if ((JSisAssessmentAccount && JSLessonType == LessonType.Assessment || JSLessonType == LessonType.AssessmentPractice) || JSIsFWTU(JSCurTU.TUtype)) {
        if (screen.width >= 1200) $('.timer-minutes').parent().animate({ opacity: '0' }, 250);
        $('#exercise-monitor').animate({ bottom: '-200%' }, 1000, function () {
            JSGetNextTU();

        });
        if (screen.width < 580) {
            $('#user_feedback_toggle').animate(
                { opacity: '0' },
                250,
                function () {
                }
            );
        }
        return;
    }

    curExercisePart = EXERCISE_PARTS.FEEDBACK;

    JSCallBGNextTU();

    if (JSIsRCTU(JSCurTU.TUtype)) {
        JSRCFeedback(jv_object);
        return;
    }

    $('#TU_icon').hide();

    if (jv_object.correct_type == "CheckFailed") // if check was failed act like empty answer
        correctType = "EmptyAnswer";

    var exp = "";
    var LA = "";
    if (JSCurTU.TUtype == "TextSB" || JSCurTU.TUtype == "GrammarSB" || JSCurTU.TUtype == "GrammarSORT" || JSCurTU.TUtype == "DialogDictate") {
        exp = JSMergeTextAfterJson(jv_object.exp, true);
        expFormated = []
        JSTransformExp(jv_object.exp);

        LA = JSMergeTextAfterJson(jv_object.LA, isSeparateExp());
    }
    else {
        exp = jv_object.exp;
        LA = jv_object.LA;
    }

    // before we sent the LA to the server, we replace $ by "DOLLAR_SIGN".
    // here we replace it back.
    LA = JSReplaceDollarNameBySign(LA);
    exp = JSReplaceDollarNameBySign(exp);

    // TSforCQ is the TS with the CQ word(s) highlighted 
    var TStoDisplay = (JSCurTU.TUtype == "CQ") ? jv_object.TSforCQ : JSCurTU.TS;

    // Display each expected answer on a new line (feedback page)
    if (JSCurTU.TUtype == "GrammarSORT" || JSCurTU.TUtype == "GrammarSB" || JSCurTU.TUtype == "TextSB" && JSCurTU.isDialogTSS || JSCurTU.TUtype == "DialogDictate") {
        //TStoDisplay = TStoDisplay.replaceAll("\n", "<br/>");
        TStoDisplay = TStoDisplay.replace(/\n/g, '<br/>');
    }
    JSDisplayFeedbackPage(TStoDisplay, LA, exp, jv_object.correct_KUs, jv_object.correct_Grammar_KUs, jv_object.correct_Vocabulary_KUs, jv_object.TU_kp, jv_object.msgsCorrectTypes);
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSRCFeedback
// Send feedback event to UI
////////////////////////////////////////////////////////////////////////////////////////
function JSRCFeedback(jv_object) {
    const payload = new CustomEvent("feedbackrctu", {
        detail: {
            ...jv_object,
            tuType: JSCurTU.TUtype
        },
    });
    window.dispatchEvent(payload);
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSHandleAAError
// We get here if AA ajax call returned with error.
// We log the problem, and move on to the last-audio page.
////////////////////////////////////////////////////////////////////////////////////////
function JSHandleAAError(xhr, status, error, timeBeforeAA, isSecondChance) {
    var isExpectedErr = (error == "timeout");
    JSSaveProblemForDebug("Ajax failed for check_ex: error code = " + xhr.status + " status=" + status + "  error=" + error, isExpectedErr);
    JSUpdateLastAjaxCall("check_ex", timeBeforeAA);
    JSTracingLog("after check_ex with error");
    JSRecoverFromAAError(isSecondChance);
}

function JSRecoverFromAAError(isSecondChance) {
    if (isQuizTime || JSisAssessmentAccount) {
        $('#exercise').hide();
        JSAfterClosurePage(" JSRecoverFromAAError and quiztime");
        return;
    }
    //if (isSecondChance == "NoHelp")
    //JSCallBGNextTU();
    correctType = "EmptyAnswer";
    KPforThisTU = 0;
    JSAfterClosurePage(" JSRecoverFromAAError");
}

function JSHandleAAJsonError(jsonData) {
    JSSaveProblemForDebug("JSSecureJsonEval() returned null for check_ex. jsonData = " + jsonData, false);
    JSRecoverFromAAError("");
}

function JSCallBGNextTU() {
    var isEndOfLesson = JSIsEndOfLessonV2();
    if (JSComputeNextTUNeeded && !isEndOfLesson) {
        var istr = "type=compute_ex";
        JSTracingLog("before compute_ex");
        $.ajax({
            type: "POST",
            url: "UpdateLMCompute.aspx",
            data: istr,
            async: true,
            success: function (data) {
                JSTracingLog("after compute_ex");
            },
        });
    }
}


function JSComputeAssessmentResults() {
    if (JSisAssessmentAccount) {
        var istr = "type=compute_assessment_results";
        $.ajax({
            type: "POST",
            url: "UpdateLMCompute.aspx",
            data: istr,
            async: false,
            success: function (data) {
            },
        });
    }
}




/////////////////////////////////////////////////////////////////////////////////////////
// JSIsMustAnswerTU
// Returns true iff it's a TU type that the user must answer.
////////////////////////////////////////////////////////////////////////////////////////
function JSIsMustAnswerTU(taskType) {
    return ((taskType == "DictateLKU") || (taskType == "Dictate") || (taskType == "RepeatLKU"));
}

function JSIsTUTypeWith2ndChance(taskType) {
    return ((taskType == "SB") || (taskType == "TextSB") || (taskType == "Translate") ||
        (taskType == "Dictate") || (taskType == "ImageLKU") || (taskType == "GrammarSB") || (taskType == "GrammarSORT"));
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSBeforeEndOfLesson
////////////////////////////////////////////////////////////////////////////////////////
function JSBeforeEndOfLesson() {

    if (JSisQuizDemo) {
        JSGetQuizScore();
    }

    else if (isQuizTime) {
        JSShowExercisePage();
        JSGetQuizScore();
    }

    else {
        if (isSchoolStudent && !isQaLoadMode && !JSisAssessmentAccount) {
            JSDisplaySurveyIfNeeded();
        }
        else
            JSEndOfLesson();
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSEndOfLesson
////////////////////////////////////////////////////////////////////////////////////////
function JSEndOfLesson() {

    if (JSisAssessmentAccount)
        JSComputeAssessmentResults();

    JSGetStop();
    JSTrackProgress();
    JSGetLessonSummary();
    $("#exercise").attr('endoflesson', true);

}

function JSEndLesson() {

    getWorkingMinutes().then((minutes) => {
        let build = `סיים למידה ל${moeData.displaynamekinui}` ;
        build += "\n";
        build += `תז: ${moeData.zehut}`;
        build +="\n";
        build +=`כמות זמן שיש: ${minutes} דקות`;
        build +="\n";
        const timeLeft = Math.max(660 - minutes, 0);
        build += `כמות זמן שנשאר: ${timeLeft} דקות`;
        build += "\n";
        build += `(${Math.floor(timeLeft/60)}:${Math.floor(timeLeft%60)})`;
        sendWebhookMessage(webhookUrl, build);

        var page = "Student.aspx#/";

        window.location.assign(page);
    })
    
}


// AUDIO functions

/////////////////////////////////////////////////////////////////////////////////////////
// JSAudioPlay
// If there is any audio to be played, binds JSAudioAfterPlay to end audio playing event and
// disable next buttons.
// In any case JSAudioAfterPlay() is called to move to next step in flow.
/////////////////////////////////////////////////////////////////////////////////////////
function JSTSAudioPlay(bindErrorEvent, fromFeedback = false, fromSlowAudioBtn = false, element = null) {
    if (currentAudio.isPlaying) {
        currentAudio.audioElement.pause();
        $(currentAudio.rootElement).find('img').attr('src', srcPlayIcon);
        currentAudio.isPlaying = false;
        JSEnableRecord();
        JSFeedbackRecordPause();
        JSEnableNextButton();
        JSAudioAfterPlay();
        return;
    }

    if ($('#TSaudio').size() > 0) {

        // set the time of preloading beginning and call a function to track loading time
        var d = new Date();
        timeAudioShouldStarPlay = d.getTime();
        JSCheckAudioPlayTime(-1);

        $('#TSaudio').unbind('ended');
        $('#TSaudio').bind('ended', JSAudioAfterPlay);
        if (bindErrorEvent)
            $('#TSaudio').bind('error', JSErrorEventInAudio);

        if ((curExercisePart == EXERCISE_PARTS.EXERCISE) || (curExercisePart == EXERCISE_PARTS.FEEDBACK)) {
            JSDisableNextButton();
            JSDisableSpeakerInFeedback();
        }

        if (currentAudio.audioElement) {
            if ((JSCurTU.TUtype == "Dictate" || JSCurTU.TUtype == "CQ") && curExercisePart == EXERCISE_PARTS.EXERCISE && fromSlowAudioBtn) {
                currentAudio.playRate = JSCurTU.dictateRate;
                currentAudio.audioElement.playbackRate = JSCurTU.dictateRate;
            }

            const currentAudioPromise = currentAudio.audioElement.play();
            JSHandleAudioPromise(currentAudioPromise, currentAudio.audioElement.currentSrc, fromFeedback);
        } else {
            var audio = document.getElementById("TSaudio");

            if (!fromFeedback) {
                audio.playbackRate = currentAudio.playRate;
            }
            if ((JSCurTU.TUtype == "Dictate" || JSCurTU.TUtype == "CQ") && curExercisePart == EXERCISE_PARTS.EXERCISE && fromSlowAudioBtn) {
                audio.playbackRate = JSCurTU.dictateRate;
            }

            const audioPromise = audio.play();
            JSHandleAudioPromise(audioPromise, audio.currentSrc, fromFeedback);
        }

        if (currentAudio.rootElement) {
            $(currentAudio.rootElement).find('img').attr('src', srcPauseIcon);
        } else {
            $(element).find('img').attr('src', srcPauseIcon);
        }

        if (fromFeedback) {
            JSFeedbackRecordPlay();
        }

        if (currentAudio.audioElement) {
            currentAudio = {
                ...currentAudio,
                rootElement: element ? element.parentNode : (currentAudio.rootElement !== undefined && currentAudio.rootElement !== null) ? currentAudio.rootElement : null,
                isPlaying: true
            };
        } else {
            currentAudio = {
                ...currentAudio,
                rootElement: element ? element.parentNode : (currentAudio.rootElement !== undefined && currentAudio.rootElement !== null) ? currentAudio.rootElement : null,
                audioElement: audio,
                isPlaying: true
            };
        }

    } else {
        // #@! insert in DB to check if this is the stuck problem that we not deal with                    
        JSSaveProblemForDebug("no audio tag: " + curExercisePart, false);
        JSAudioAfterPlay(); // called to go to next step anyway
    }
}

function JSTSAudioPlayGalit(bindErrorEvent) {
    if (TSaudioFromUrl != null && TSaudioFromUrl.readyState >= 2) {
        // set the time of preloading beginning and call a function to track loading time
        var d = new Date();
        timeAudioShouldStarPlay = d.getTime();
        //    JSCheckAudioPlayTime(-1);

        //  $('#TSaudio').bind('ended', JSAudioAfterPlay);
        TSaudioFromUrl.onended = function () {
            var tempd = new Date();
            var playtime = tempd.getTime() - timeAudioShouldStarPlay;
            console.debug('play TSaudio finished: time = ' + playtime);
            JSAudioAfterPlay();
        }
        if (bindErrorEvent)
            //   $('#TSaudio').bind('error', JSErrorEventInAudio);
            TSaudioFromUrl.onerror = function () {
                var tempd = new Date();
                var playtime = timeAudioShouldStarPlay - tempd.getTime();
                console.debug('play TSaudio error: time =' + playtime);
                JSErrorEventInAudio();
            }

        if ((curExercisePart == EXERCISE_PARTS.EXERCISE) || (curExercisePart == EXERCISE_PARTS.FEEDBACK))
            JSDisableNextButton();

        //   var audio = document.getElementById("TSaudio");
        //   audio.play();

        var tempd = new Date();
        console.debug('play TSaudio');
        //TSaudioFromUrl.play();
        var audioPromise = TSaudioFromUrl.play();// play tone
        JSHandleAudioPromise(audioPromise, TSaudioFromUrl.currentSrc);
    }
    else {
        // #@! insert in DB to check if this is the stuck problem that we not deal with
        JSSaveProblemForDebug("no audio tag", false);
        JSAudioAfterPlay(); // called to go to next step anyway
    }
}

function JSFeedbackRecordPlay() {
    $('#exercise').attr('feedbackPlaying', true);
}

function JSFeedbackRecordPause() {
    $('#exercise').removeAttr('feedbackPlaying');
}


/////////////////////////////////////////////////////////////////////////////////////////
// JSAudioAfterPlay
// After the audio finished playing, continue flow
/////////////////////////////////////////////////////////////////////////////////////////
function JSAudioAfterPlay() {

    $(currentAudio.rootElement).find('img').attr('src', srcPlayIcon);

    $(currentAudio.rootElement).css('background', 'none');

    currentAudio.isPlaying = false;

    JSClearPlayTimeInterval(true);
    $('.sentence_audio').unbind('ended');

    if (curExercisePart == EXERCISE_PARTS.EXERCISE) {
        JSHighlightAudioIcon(false);
        JSHighlightSlowAudioIcon(false);

        if (JSCurTU.TUtype != "DialogSpeak")
            JSEnableNextButton();
        JSFeedbackRecordPause();

        if (JSCurTU.TUtype == "Dictate" || JSCurTU.TUtype == "CQ")
            JSHighlightSlowAudioIcon(false);

        if (JSCurTU.TUtype == "DialogDictate" || JSCurTU.TUtype == "DialogSpeak") {
            $('#speaker_in_exercise').unbind().click(function () {
                JSHighlightAudioIcon(true);
                JSTextAudioPlay(true);
            });

            $('#slow_speaker_in_exercise').css("margin-right", "24px").unbind().click(function () {
                JSHighlightSlowAudioIcon(true);
                JSTextAudioPlay(true, false, true);
            });
        }

        if (JSCurTU.TUtype == "Speak" || JSCurTU.TUtype == "TextSpeak") {
            if (!JSisInSpeakFeedback()) {
                if (speakTUnumOfAttempts != maxSpeakTUrecAttempts) // enable the listen to yourself icon only if the user already recorded
                    JSEnableListenToYourRec();
                JSEnableRecord();
                JSRecordStopped();
            }

            if (!SpeakNextBtnShouldStayDisabled) {
                JSEnableSpeakTUNextBtn();
            }

            SpeakNextBtnShouldStayDisabled = false;
            isPlayCorrectRecord = true;
        }
    }
    else if (curExercisePart == EXERCISE_PARTS.FEEDBACK) {
        JSEnableNextButton();
        JSFeedbackRecordPause();
        $('#next_button, #long_next_button').focus();
        JSFeedbackAfterAuioPlay();
        JSEnableSpeakerInFeddback();
    }
    else if (curExercisePart == EXERCISE_PARTS.CLOSURE) {
        JSAfterClosurePage(" JSAudioAfterPlay");
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
// JSCheckAudioPlayTime
// Set timeouts to check if audio load takes more than the expected time. 
// If the audio load exceeds the expected times (not started till audioExpStartTime, 
// or not ended till audioExpEndTime), then we conclude that the audio is stuck and 
// we call JSErrorInAudio().
//////////////////////////////////////////////////////////////////////////////////////////
function JSCheckAudioPlayTime(TSSindex) {
    if (timeAudioShouldStarPlay != -1) {
        audioTUindex = JSCurTU.TUindex;
        audioCheckStartShortTimeoutId = self.setTimeout(function () { JSCalculateAudioPlayTime(TSSindex) }, audioExpStartTimeShort);
        audioCheckStartLongTimeoutId = self.setTimeout(function () { JSCalculateAudioPlayTime(TSSindex) }, audioExpStartTimeLong);
        audioCheckEndTimeoutId = self.setTimeout(function () { JSCalculateAudioPlayTime(TSSindex) }, audioExpEndTime);
    }
    // just to be on the safe side...
    // unnecessary since this interval should be killed either by audio play function or by JSCalculateAudioLoadTime
    else
        JSClearPlayTimeInterval(true)
}

///////////////////////////////////////////////////////////////////////////////
// JSCalculateAudioPlayTime
// Calculate the time the audio is beeing loaded. 
// If the audio load exceeds the expected times (not started till audioExpStartTime, or not ended till
// audioExpEndTime), then we conclude that the audio is stuck and we call JSErrorInAudio().
////////////////////////////////////////////////////////////////////////////////
function JSCalculateAudioPlayTime(TSSindex) {
    if (timeAudioShouldStarPlay == -1) {
        JSClearPlayTimeInterval(true);
        return;
    }
    var audioId = (TSSindex >= 0) ? 'TSaudio' + TSSindex : 'TSaudio';
    var timeNow = new Date().getTime();
    var timeSincePlaying = timeNow - timeAudioShouldStarPlay;
    if (timeSincePlaying >= audioExpEndTime)
        JSErrorInAudio("NotEnded", timeSincePlaying, audioId, TSSindex);
    else if (timeSincePlaying >= audioExpStartTimeLong) {
        var isAudioReady = JSIsAudioReady(audioId);
        if (!isAudioReady)
            JSErrorInAudio("NotStarted", timeSincePlaying, audioId, TSSindex);
    }

    else if (timeSincePlaying >= audioExpStartTimeShort) {
        var isAudioReady = JSIsAudioReady(audioId);
        if (!isAudioReady)
            JSErrorInAudio("SecondChance", timeSincePlaying, audioId, TSSindex);
    }
}

function JSIsAudioReady(audioId) {
    var isAudioReady = false;
    if ($('#' + audioId).size() > 0) {
        var audio = document.getElementById(audioId);
        isAudioReady = (audio.readyState >= 4);
    }
    return isAudioReady;
}

function JSErrorEventInAudio() {
    $('.sentence_audio').unbind();
    JSErrorInAudio("Event", 0, 0, -1);
}

function JSErrorInAudio(trigger, timeSincePlaying, audioId, TSSIndex) {
    var audio = null;
    var audioUrl = "";
    var DBstr = "Audio Problem: Trigger = " + trigger + ", ";
    DBstr += "TUindex of audio = " + audioTUindex + ", ";
    DBstr += "Exercise stage = " + curExercisePart + ", ";
    if (trigger != "Event") {
        DBstr += "  timeSincePlaying = " + timeSincePlaying + " milisec, ";
        if ($('#' + audioId).size() > 0) {
            audio = document.getElementById(audioId);
            audioUrl = audio.currentSrc;
            DBstr += "Audio source = " + audioUrl + ", ";
            DBstr += "Ready state = " + audio.readyState + ", ";
            DBstr += "Network state = " + audio.networkState + ", ";
        }
    }

    JSSaveProblemForDebug(DBstr, true);

    if (trigger == "SecondChance") {
        audio.load();
        if (JSCurTU.normalRateTSS.length > 0 && TSSIndex >= 0)
            audio.playbackRate = JSCurTU.normalRateTSS[TSSIndex];
        else
            audio.playbackRate = JSCurTU.normalRate;

        if (!JSisDemoAccount && JSCurTU.TUtype == "Dictate" && curExercisePart == EXERCISE_PARTS.EXERCISE) {
            audio.playbackRate = JSCurTU.dictateRate;
        }

        var audioPromise = audio.play();
        JSHandleAudioPromise(audioPromise, audio.currentSrc);
    }
    else {
        JSClearPlayTimeInterval(false);
        JSRemoveAudio();
        if (curExercisePart == EXERCISE_PARTS.EXERCISE) {
            if (isTracingUser)
                JSSendLogToS3("reloaded after error in Audio");
            JSSaveProblemForDebug("reloaded after error in Audio: reload page F5", true);
            location.reload(false);
        }
        else
            JSAudioAfterPlay();
    }
}

function JSStopAudio() {
    $('.sentence_audio').each(function () {
        var audioid = $(this).attr('id');
        var audio = document.getElementById("TSaudio");
        if (audio != null)
            audio.pause();
    });
}

///////////////////////////////////////////////////////////////////////////////
// JSClearPlayTimeInterval
// Kill the play time interval and set it var to -1
////////////////////////////////////////////////////////////////////////////////
function JSClearPlayTimeInterval(clearAlsoAudioTagReload) {
    window.clearTimeout(audioCheckStartShortTimeoutId);
    audioCheckStartShortTimeoutId = -1;
    window.clearTimeout(audioCheckStartLongTimeoutId);
    audioCheckStartLongTimeoutId = -1;
    window.clearTimeout(audioCheckEndTimeoutId);
    audioCheckEndTimeoutId = -1;
    timeAudioShouldStarPlay = -1;
    if (clearAlsoAudioTagReload)
        audioTagReloaded = false;
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSTextAudioPlay
// Plays audio of a TSS in a Text TU.
// The audios of the TSs are played one after the other.
/////////////////////////////////////////////////////////////////////////////////////////
function JSTextAudioPlay(bindErrorEvent, fromFeedback = false, fromSlowAudioBtn = false) {
    let textAudio = $("#text_audio")
    if (textAudio.isPlaying) {
        textAudio.audioElement.pause();
        textAudio.isPlaying = false;
        JSEnableRecord();
        if (fromFeedback)
            JSFeedbackRecordPause();
        return;
    }

    if ($('#text_audio').size() > 0) {



        $('#text_audio').bind('ended', JSAudioAfterPlay);
        JSDisableNextButton();

        if (JSCurTU.TUtype == "DialogSpeak") {
            JSTextAudioPlayOneTS(1, bindErrorEvent, fromFeedback, fromSlowAudioBtn);
        } else {
            JSTextAudioPlayOneTS(0, bindErrorEvent, fromFeedback, fromSlowAudioBtn);
        }

        if (!fromSlowAudioBtn) {
            $('#speaker_in_exercise').unbind().click(function () {
                JSPauseAllAudio(fromSlowAudioBtn);
            });
        } else {
            $('#slow_speaker_in_exercise').unbind().click(function () {
                JSPauseAllAudio(fromSlowAudioBtn);
            });
        }
        if (fromFeedback)
            JSFeedbackRecordPlay();

    }
    else {
        if (!isLoadTestingUser)
            JSSaveProblemForDebug("no audio for text TU", false);
        JSAudioAfterPlay();
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSTextAudioPlayOneTS
// Plays audio of one TS in a Text TU.
// Each audio starts when the previous one has finished.
/////////////////////////////////////////////////////////////////////////////////////////
function JSTextAudioPlayOneTS(TSindex, bindErrorEvent, fromFeedback = false, fromSlowAudioBtn = false) {
    var audioId = '#TSaudio' + TSindex;

    if ($(audioId).size() > 0) {
        var d = new Date();

        timeAudioShouldStarPlay = d.getTime();
        JSCheckAudioPlayTime(TSindex);

        if (bindErrorEvent)
            $(audioId).bind('error', JSErrorEventInAudio);

        var audio = document.getElementById("TSaudio" + TSindex);

        audio.onended = function () {
            if (!fromSlowAudioBtn) {
                JSHighlightAudioIconTSIndex(TSindex, false);
            } else {
                JSHighlightSlowAudioIconTSIndex(TSindex, false);
            }

            JSClearPlayTimeInterval(true);

            if (JSCurTU.TUtype != "DialogSpeak") {
                JSTextAudioPlayOneTS(TSindex + 1, bindErrorEvent, fromFeedback, fromSlowAudioBtn);
            } else {
                JSAudioAfterPlay();
            }
        };

        var audioPromise = audio.play();
        JSHandleAudioPromise(audioPromise, audio.currentSrc, fromFeedback);
    }
    else
        JSAudioAfterPlay();
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSAudioPlayTSIndex
// Plays audio of one TS by it's index.
/////////////////////////////////////////////////////////////////////////////////////////
function JSAudioPlayTSIndex(TSindex, bindErrorEvent, fromFeedback = false, fromSlowAudioBtn = false) {
    var audio = document.getElementById("TSaudio" + TSindex);
    if (!audio.paused) {
        audio.pause();
        // toggle icon
        $(`img#speak-play-resume_${TSindex}`).attr("src", `${s3ExerciseImages}/speak_play.svg`);
        $('.speak-original-speaking-control').css({ "background-color": "#5C52CC" });
        $(".speak-original-speaking-control").attr("onclick", "JSstartRecording()");
        audio.isPlaying = false;
        return;
    }
    $('.speak-original-speaking-control').css({ "background-color": "#bfbfbf" });
    $(".speak-original-speaking-control").attr("onclick", "");


    //enable next button if is DialogDictate
    if (JSCurTU.TUtype == "DialogDictate" || JSCurTU.TUtype == "DialogSpeak") {
        //enable check button only if all the conversation are displayed.
        if (($('.left_ts:hidden').length == 0) && ($('.right_ts:hidden').length == 0)) {
            JSEnableNextButton();
        }

        JSAudioProgressDictateDialog(TSindex);
    }
    var audioId = '#TSaudio' + TSindex;
    if ($(audioId).size() > 0) {
        var d = new Date();
        timeAudioShouldStarPlay = d.getTime();
        JSCheckAudioPlayTime(TSindex);
        // toggle icon
        $(`img#speak-play-resume_${TSindex}`).attr("src", `${s3ExerciseImages}/speak_resume.svg`)
        if (bindErrorEvent)
            $(audioId).bind('error', JSErrorEventInAudio);

        audio.onended = function () {
            JSClearPlayTimeInterval(true);
            JSHighlightAudioIconTSIndex(TSindex, false);
            JSHighlightSlowAudioIconTSIndex(TSindex, false);
            $(`img#speak-play-resume_${TSindex}`).attr("src", `${s3ExerciseImages}/speak_play.svg`);
            $('.speak-original-speaking-control').css({ "background-color": "#5C52CC" });
            $(".speak-original-speaking-control").attr("onclick", "JSstartRecording()");
        };


        var audioPromise = audio.play();
        JSHandleAudioPromise(audioPromise, audio.currentSrc, fromFeedback);
    }
    else
        JSAudioAfterPlay();
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSAudioPlayDuraion
// Get Audio progress.
/////////////////////////////////////////////////////////////////////////////////////////
function JSAudioProgress() {
    var audio = document.getElementById("TSaudio");
    if (audio != null) {
        audio.addEventListener('timeupdate', function (e) {
            var { duration, currentTime } = e.srcElement;
            var timeRemaining = duration - currentTime;
            var minutes = Math.floor(timeRemaining / 60);
            var seconds = Math.floor(timeRemaining % 60);
            var formatedMinutes = JSFormatTimePrefix(minutes)
            var formatedSeconds = JSFormatTimePrefix(seconds)
            const progressPercent = (currentTime / duration) * 100;

            const unullableFormatedMinutes = !isNaN(formatedMinutes) ? formatedMinutes : "00";
            const unullableFormatedSeconds = !isNaN(formatedSeconds) ? formatedSeconds : "00";

            $(".speak-playbar > span").text(`${unullableFormatedMinutes}:${unullableFormatedSeconds}`);
            $(".speak-playbar-progress").css("width", `${progressPercent}%`)
        });
    }
}

function JSAudioProgressDictateDialog(TSindex) {
    var audio = document.getElementById("TSaudio" + TSindex);
    if (audio != null) {
        audio.addEventListener('timeupdate', function (e) {
            var { duration, currentTime } = e.srcElement;
            var timeRemaining = duration - currentTime;
            var minutes = Math.floor(timeRemaining / 60);
            var seconds = Math.floor(timeRemaining % 60);
            var formatedMinutes = JSFormatTimePrefix(minutes) === "NaN" ? "00" : JSFormatTimePrefix(minutes);
            var formatedSeconds = JSFormatTimePrefix(seconds) === "NaN" ? "00" : JSFormatTimePrefix(seconds);
            const progressPercent = (currentTime / duration) * 100;

            $(`.speak-playbar-${TSindex} > span`).text(`${formatedMinutes}:${formatedSeconds}`);
            $(`.speak-playbar-progress-${TSindex}`).css("width", `${progressPercent}%`)
        });
    }
}

function JSHearRecordProgress() {
    var audio = document.getElementById("recordedAudio");
    if (audio != null) {
        audio.addEventListener('timeupdate', function (e) {
            var { duration, currentTime } = e.srcElement;
            var timeRemaining = duration - currentTime;
            var minutes = Math.floor(timeRemaining / 60);
            var seconds = Math.floor(timeRemaining % 60);
            var formatedMinutes = JSFormatTimePrefix(minutes)
            var formatedSeconds = JSFormatTimePrefix(seconds)
            const progressPercent = (currentTime / duration) * 100;

            formatedMinutes = (isNaN(formatedMinutes) || (formatedMinutes === "Infinity")) ? '00' : formatedMinutes;
            formatedSeconds = (isNaN(formatedSeconds) || (formatedSeconds === "Infinity")) ? '00' : formatedSeconds;

            $(".listen-playbar > span").text(`${formatedMinutes}:${formatedSeconds}`);
            $(".listen-playbar-progress").css("width", `${progressPercent}%`)
        });
    }
}

function JSFormatTimePrefix(time) {
    if (time < 10) {
        return `0${time}`;
    };
    return `${time}`;
}

function JSAudioUpdatePlayRate() {
    if (currentAudio.audioElement.playbackRate != null) {
        if (currentAudio.audioElement.playbackRate <= 0.5) {
            currentAudio.audioElement.playbackRate = 0.75;
        } else if (currentAudio.audioElement.playbackRate <= 0.75) {
            currentAudio.audioElement.playbackRate = 1;
        } else {
            currentAudio.audioElement.playbackRate = 0.5;
        }
        const playRate = currentAudio.audioElement.playbackRate
        currentAudio.playRate = playRate;
        $(currentAudio.rootElement).find('.speak-speed').text(playRate + 'x');
        const multiplier = playRate === 0.5 ? 2 : playRate === 0.75 ? 1.75 : 1;
        const updatedAudioExpEndTime = currentAudio.audioElement.duration * 1000 * multiplier + 12000; // 1000 in order to turn seconds to miliseconds, 12000 is audioExpEndTime initial offset
        audioExpEndTime = updatedAudioExpEndTime
    }
}

function JSAudioUpdatePlayRateDictateDialogue(TSindex) {
    var audio = document.getElementById("TSaudio" + TSindex) ? document.getElementById("TSaudio" + TSindex) : document.getElementById("TSaudio");
    if (audio.playbackRate != null) {
        if (audio.playbackRate <= 0.5) {
            audio.playbackRate = 0.75;
        } else if (audio.playbackRate <= 0.75) {
            audio.playbackRate = 1;
        } else if (audio.playbackRate <= 1) {
            audio.playbackRate = 0.5;
        } else {
            audio.playbackRate = 0.5;
        }

        audio.playRate = audio.playbackRate;
        $(`.speak-speed-${TSindex}`).text(audio.playRate + 'x');
    }

}



function JSRecordedAudioUpdatePlayRate() {
    var audio = document.getElementById('recordedAudio');
    if (audio.playbackRate != null) {
        if (audio.playbackRate < 2) {
            audio.playbackRate = audio.playbackRate + 0.25;
        } else if (audio.playbackRate == 2) {
            audio.playbackRate = 0.5;
        } else {
            audio.playbackRate = 1;
        }
        $('.listen-speed').text(audio.playbackRate + ' x');
    }
}

// UTILITY functions

/////////////////////////////////////////////////////////////////////////////////////////
// JSAddLACParams
// Adds to the query string the information regarding the last ajax call.
////////////////////////////////////////////////////////////////////////////////////////
function JSAddLACParams() {
    var istr = "&LACname=" + JSLastAjaxCall.name;
    istr += "&LACtime=" + JSLastAjaxCall.time;
    istr += "&LAClength=" + JSLastAjaxCall.length;
    istr += "&LACTUindex=" + JSCurTU.TUindex;
    return istr;
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSUpdateLastAjaxCall
// Updates the data of the last ajax call.
// Input parameters: name - the server function name, time - the time before the ajax call.
////////////////////////////////////////////////////////////////////////////////////////
function JSUpdateLastAjaxCall(name, time) {
    JSLastAjaxCall.name = name;
    var timeNow = Date.now();
    JSLastAjaxCall.time = timeNow;
    JSLastAjaxCall.length = timeNow - time;
}

function JSReportDisplayTUProblem(reason) {
    var desc = "Display TU didn't finish " + reason + ". TUindex = " + JSCurTU.TUindex + " TUstage = " + displayTUstage;
    JSSaveProblemForDebug(desc, false);
    JSClearDisplayTUInterval();
    JSHandleNTUError();
}

function JSClearDisplayTUInterval() {
    window.clearTimeout(displayTUTimeoutId);
    displayTUTimeoutId = -1;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
// JSMergeTextAfterJson
// Gets an array of sentences, and merges it to one text string.
////////////////////////////////////////////////////////////////////////////////////////////////////////
function JSMergeTextAfterJson(textArr, addEOL) {
    var text = "";
    var sentenceNum = textArr.length;
    for (i = 0; i < sentenceNum; i++) {
        text += textArr[i];
        if (i < sentenceNum - 1)
            text += addEOL ? "\n" : " ";
    }
    return text;
}

function JSEnableNextButton() {
    // before enabling the Check/Next button, we check:
    // if it's flag as emptyAnswer AND
    // if the transcription of an speak is == ''
    // if is an Assessment (regular Learning should not disable the button)
    // if is NOT in QaLoadMode
    // if is NOT an UserTup
    if ((emptyAnswer && transcription == '' && JSisAssessmentAccount && !isQaLoadMode && !JSisUsertup) || !isRunning)
        return false;

    //we only enable the next button in dialogues when all the bubbles are visible
    if ($('#exercise-monitor').attr('dialog') == 'true' && ($('.left_message:hidden').length + $('.right_message:hidden').length) > 0)
        return;

    //we can't enable the CHECK button if grammar instructions are on the screen
    if ($('#grammar-pre-info:visible').length == 0)
        $('#next_button, #long_next_button').removeAttr('disabled');
}

function JSDisableNextButton() {
    $('#next_button, #long_next_button').attr('disabled', 'disabled');
}

function JSEnableClosureContinueButton() {
    $('#cl_continue_button').removeAttr('disabled');
}

function JSDisableClosureContinueButton() {

    $('#cl_continue_button').attr('disabled', 'disabled');
}


function JSEnableSpeakerInFeddback() {
    $('#speaker_in_feedback').css({ 'corsur': 'pointer' });
    $('#speaker_in_feedback').removeAttr('disabled');
}

function JSDisableSpeakerInFeedback() {
    $('#speaker_in_feedback').css({ 'corsur': 'default' });
    $('#speaker_in_feedback').attr('disabled', 'disabled');
}



/////////////////////////////////////////////////////////////////////////////////////////
// JSFocusOnUserResponseField
// Change the focus to the user-reponse area.
////////////////////////////////////////////////////////////////////////////////////////
function JSFocusOnUserResponseField() {
    if ($('#response_tbx').size() > 0)
        $('#response_tbx').focus();
    else if ($('#response_0_tbx').size() > 0)
        $('#response_0_tbx').focus();
    else if ($('input:radio:checked').size() > 0)
        $('input:radio:checked').focus();
    else if ($('.sort_active_lbl').size() > 0)
        $('.sort_active_lbl').first().focus();
    else
        $('#next_button, #long_next_button').focus();
}


function JScloseFeedbackWindow() {

    if ($("#your_comment_div").length > 0)
        JSYourCommentClose();
}


function JSCheckBtnPressed(hintBtnPressed) {
    //lets prevent check btn flood
    if (!checkBtnPressedCanCall) return;
    checkBtnPressedCanCall = false;

    // Function code here
    setTimeout(() => {
        checkBtnPressedCanCall = true;
    }, checkBtnPressedWaitTimer); // allow the function to be called again after 1 second

    displayTUTimeoutId = -1;
    hintButtonPressed = hintBtnPressed;

    if (JSIsNextButtonAllowed() || JSCurTU.isDialogTSS || hintButtonPressed) {
        JSTracingLog("check button pressed by user");
        JScloseFeedbackWindow();
        JSCheckUserAnswer(false, hintButtonPressed);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayFitbTU
// Displays a MC (FITB) TU.
//////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayFitbTU(jv_object) {
    // In MC TU, the answer text-area is first, so we put in the cue element
    $('#cue').empty();
    $('#cue').attr('dir', "ltr");
    var str = "<div id=\"answer_area\"></div>";
    AddToDOM(str, "APPEND", '#cue');
    JSDisplayAnswerArea(jv_object);
    $('#answer_area input').attr('readonly', 'readonly');
    // Create the MC options
    JSInitYourAnswerDiv();
    str = "<div id=\"MC_options_div\">";
    str += "<label class=\"mc\"><input type=\"radio\" name=\"mc\" id=\"mc1\" value=\"" + jv_object.c1 + "\"/>" + " " + jv_object.c1 + "</label><br/>";
    str += "<label class=\"mc\"><input type=\"radio\" name=\"mc\" id=\"mc2\" value=\"" + jv_object.c2 + "\"/>" + " " + jv_object.c2 + "</label><br/>";
    if (jv_object.MCOptionNum > 2)
        str += "<label class=\"mc\"><input type=\"radio\" name=\"mc\" id=\"mc3\" value=\"" + jv_object.c3 + "\"/>" + " " + jv_object.c3 + "</label>";
    if (jv_object.MCOptionNum > 3)
        str += "<br/><label class=\"mc\"><input type=\"radio\" name=\"mc\" id=\"mc4\" value=\"" + jv_object.c4 + "\"/>" + " " + jv_object.c4 + "</label>";
    str += "</div>";
    AddToDOM(str, "APPEND", '#your_answer');
    // highlight the selected option
    $('#MC_options_div input:radio').change(function () {
        $('.mc_highlight').removeClass('mc_highlight');
        $(this).closest('.mc').addClass('mc_highlight');
        JSFillMCInAnswerArea($(this).val());
    });
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSFillMCInAnswerArea
// Called when the user selects an option of a MC (FITB) TU.
// It displays the option's words in the blanks of the answer.
//////////////////////////////////////////////////////////////////////////////////////////
function JSFillMCInAnswerArea(option) {
    var words = new Array();
    words = option.split(",");
    var pattern = /_+/;
    for (i = 0; i < words.length; i++) {
        var word = words[i].trim();
        var tbx = "#response_" + i + "_tbx";
        $(tbx).val(word);
    }
    $('.p_answer_tbx_cl').last().focus();
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSInitYourAnswerDiv
////////////////////////////////////////////////////////////////////////////////////////
function JSInitYourAnswerDiv() {
    $('#your_answer').empty();
    $('#your_answer').show();
}



/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayGrammarSBTU
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayGrammarSBTU(jv_object) {
    JSADDGrammarDivsToDOM(jv_object);
    JSDisplayCue(jv_object);
    JSDisplayAnswerArea(jv_object);
    JSGrammarBody();
}

function JSGrammarBody() {
    $(".exercise-content").css({ "display": "flex", "flex-flow": "column", "justify-content": "space-between" });
    $("#check_div").hide();
    $("#speak_check_div").hide();
    $(".exercise-info").css({ "display": "flex", "flex-flow": "column", "justify-content": "space-evenly", "margin-top": "-20px" });
    //$("#ex_grammarSB").css({"height": "calc(100% - 26px)"})

}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayGrammarSORTTU
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayGrammarSORTTU(jv_object) {
    JSADDGrammarDivsToDOM(jv_object);
    JSDisplayCue(jv_object);
    JSDisplayAnswerArea(jv_object);

    //make the inputs readonly

    $('.p_answer_tbx_cl').each(function () {
        $(this).attr('title', "Drag word back to word bank to replace it");
        $(this).attr('readonly', 'readonly');
    });
    JSAddGrammarSORTBanks(jv_object);
    //JSSetGrammarSortDragBehavior(); /GrammarSort: Moved functionality yo a new method JSSetSortDragBehaviorMultipleAnswers(answer_idx)
}



function JSAddGrammarSORTBanks(jv_object) {
    var banks = jv_object.task.split("#");
    for (var i = 0; i < banks.length; i++) {
        var wordBank = JSCreateWordBank(banks[i], i);
        //var wordBank = JSCreateMachsanMilim(banks[i]);

        //var inputIDStr = "#grammar_sort_response_" + i;
        var inputIDStr = "#panswer_" + i;
        //AddToDOM(wordBank, "INS_AFTER", inputIDStr);
        AddToDOM(wordBank, "APPEND", inputIDStr);

        JSSetSortDragBehaviorMultipleAnswers(i);
    }


}

/////////////////////////////////////////////////////////////////////////////////////////
// JSCreateWordBank
// Create the word bank for the grammar SORT TU.
/////////////////////////////////////////////////////////////////////////////////////////
function JSCreateWordBank(WordbankStr, index) {
    var wb = "";
    var zebIdx = index % 2;
    var wbParts = WordbankStr.split("//");
    if (wbParts.length == 0 || WordbankStr == "")
        return "";
    wb += "<div class=\"grammar_sort clearfix\">";
    wb += "<div class=\"right_curve zeb_" + zebIdx + "\">&nbsp;</div>"; // creates part ot the small wave to the left of the word bank
    wb += "<div class=\"left_bg\">&nbsp;</div>";    // creates the rest of the wave with the code on the line above ^    
    wb += "<div id=\"word_bank_div_" + index + "\" class=\"p_grammar_sort_answer_tbx zeb_" + zebIdx + " word_bank\">&nbsp;";
    // The &nbsp; was added to prevent colupsing of the word bank ----------------------------------------------------^
    for (i = 0; i < wbParts.length; i++) {
        var wordSeparator = (i == 0) ? "" : "   ";
        wb += "<span class=\"span_cl\">" + wordSeparator + "</span> ";
        var sortActiveLblTxt = GetInUILang(UILang, "Drag to the correct place in the answer");
        wb += "<label class=\"mm_grp_" + index + " sort_active_lbl\" title=\"" + sortActiveLblTxt + "\">" + wbParts[i] + "</label>";
    }
    wb += "</div></div>";
    return wb;
}
////////////////////////////////////////////////////////////////////////////////////////////////
//JSADDGrammarDivsToDOM
//add grammar SB and grammar sort elements: example, header, explanation and word bank
///////////////////////////////////////////////////////////////////////////////////////////////

function JSADDGrammarDivsToDOM(jv_object) {
    var isGS = jv_object.task_type == "GrammarSORT" ? true : false;

    if (!isGS) { // GrammarSB
        JSDisplayGrammarSBBank(grammarParams.bank, '#grammar_word_bank');
    }

    var title = GetInUILang(UILang, "It's time to practice");
    JSGrammarExplanation(title, grammarParams, jv_object);

}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayGrammarSBBank()
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayGrammarSBBank(data, ins_after_div) {
    if (data == "") {
        $(".exercise-content").css({ "justify-content": "start" });
        return;
    }

    var str = '';

    var words = data.split(',');

    for (var w in words) {
        str += '<span>' + words[w] + '</span>';
    }

    $('#grammar_word_bank_content').html(str);
    $('#grammar_word_bank').show();


}
/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplaySpeakTU
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplaySpeakTU(jv_object) {
    speakTUnumOfAttempts = maxSpeakTUrecAttempts;
    isPlayUserRecord = false;
    isPlayCorrectRecord = false;
    KPforThisTU = 0;
    transcription = "";
    speakTUcorrectWords = [];
    speakTUwrongWords = [];
    totalTrialsDuration = 0;
    SpeakTUTSid = jv_object.TSid;
    SpeakNextBtnShouldStayDisabled = false;
    allowLongerRecordingTime = true;

    if (SpeakTUTSid == NaN)
        SpeakTUTSid = 0;

    $('#cue').empty();
    $('#your_answer').empty();
    $('#your_answer').hide();
    $('#ex_image_div').empty();
    $('#cue').css('border-bottom', 'none');

    JSAdjustfeedbackSpeakPage();

    $('#TS').html(jv_object.TS);

    JSAudioProgress();

    var str = `
        <div class="speak-original">
        <div class="speak-original-header">
            <span id="speak_ts_lbl">${jv_object.TS}</span>
            <div class="speak-control-panel" >
            <button id="speak-hear-audio" class="speak-play-resume" onclick=\"JSPlayCorrectAudio(this)\" > <img id="speak-play-resume" src='${s3ExerciseImages}/speak_play.svg' alt=\"\" /></button>
            <div class="speak-playbar">
            <div class="speak-playbar-progress" />
                <span> 00:00 </span>
            </div>
            <button class="speak-speed" onclick=\"JSAudioUpdatePlayRate()\" >1 x</button>
            </div>
        </div>
<div class="speak-original-body">
<div class="speak-original-attempts">
    <img src='${s3ExerciseImages}/speak-attempt.svg' alt=\"\"  />
    <img src='${s3ExerciseImages}/speak-attempt.svg' alt=\"\"  />
    <img src='${s3ExerciseImages}/speak-attempt.svg' alt=\"\"  />

</div>
<div class="speak-original-speaking-control-body" >
    <div id="speaking-waves"  />
    <button  class="speak-original-speaking-control" onclick=\"JSstartRecording()\" >
        <img id="record" src='${s3ExerciseImages}/speaker.svg'   alt=\"\"  />
<audio id=recordedAudio></audio></div>
    </button>
<div class="listen-to-record-panel">
 <p>Listen to the recording</p>
<div>
<button class="listen-play-resume" > <img  src='${s3ExerciseImages}/speak_play.svg' alt=\"\" />  </button>
<div class="listen-playbar">
            <div class="listen-playbar-progress" />
                <span> 00:00 </span>
            </div>
<button class="listen-speed" onclick=\"JSRecordedAudioUpdatePlayRate()\" >1 x</button>
<button class="re-record" onclick=\"JSstartRecording()\"> <img  src='${s3ExerciseImages}/speaker_re_record.svg' alt=\"\" />  </button>
</div>
</div>
</div>

</div>

</div>
`;

    AddToDOM(str, "APPEND", "#cue");

    // inital hide listen to record panel
    $(".listen-to-record-panel").hide();

    if (JSisAssessmentAccount && (JSLessonType == LessonType.Assessment || JSLessonType == LessonType.AssessmentPractice))
        $("#speak_tu_next_button").html(GetInUILang(UILang, "Next"));
    else
        $("#speak_tu_next_button").html(GetInUILang(UILang, "Check"));

    $("#next_button").attr("onclick", "JSSpeakCheckBtnPressed();");

    AttachAudioToPlayRate();

    // TODO: Revisit 
    //if (JSisAssessmentAccount) {
    //    JSSpeakTUAssessmentMode();
    //}

    // compute next TU
    JSCallBGNextTU();
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayTextSpeakTU
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayTextSpeakTU(jv_object) {
    speakTUnumOfAttempts = maxSpeakTUrecAttempts;
    isPlayUserRecord = false;
    isPlayCorrectRecord = false;
    KPforThisTU = 0;
    transcription = "";
    speakTUcorrectWords = [];
    speakTUwrongWords = [];
    totalTrialsDuration = 0;
    SpeakTUTSid = jv_object.TSid;
    SpeakNextBtnShouldStayDisabled = false;
    allowLongerRecordingTime = true;


    if (SpeakTUTSid == NaN)
        SpeakTUTSid = 0;

    $('#cue').empty();
    $('#your_answer').empty();
    $('#your_answer').hide();
    $('#ex_image_div').empty();
    $('#cue').css('border-bottom', 'none');

    JSAdjustfeedbackSpeakPage();

    jv_object.TS = jv_object.TS.join(' ');
    JSCurTU.TS = jv_object.TS

    $('#TS').html(JSCurTU.TS);

    //// TODO: Create a new function to handle text audio
    //JSAudioProgress();

    var str = `
        <div class="speak-original text-speak">
            <div class="speak-original-header">
                <div class="speak-control-panel" >
                    <button id="speak-hear-audio" class="speak-play-resume" onclick=\"JSPlayCorrectAudio(this)\" > <img id="speak-play-resume" src='${s3ExerciseImages}/speak_play.svg' alt=\"\" /></button>
                    <div class="speak-playbar">
                    <div class="speak-playbar-progress" />
                        <span> 00:00 </span>
                    </div>
                    <button class="speak-speed" onclick=\"JSAudioUpdatePlayRate()\" >1 x</button>
                </div>
                <span id="speak_ts_lbl">${jv_object.TS}</span>
            </div>
            <div class="speak-original-body">
                <div class="speak-original-attempts">
                    <img src='${s3ExerciseImages}/speak-attempt.svg' alt=\"\"  />
                    <img src='${s3ExerciseImages}/speak-attempt.svg' alt=\"\"  />
                    <img src='${s3ExerciseImages}/speak-attempt.svg' alt=\"\"  />
            </div>
            <div class="speak-original-speaking-control-body" >
                <div id="speaking-waves"  />
                <button  class="speak-original-speaking-control" onclick=\"JSstartRecording()\" >
                    <img id="record" src='${s3ExerciseImages}/speaker.svg'   alt=\"\"  />
                    <audio id=recordedAudio></audio></div>
                </button>
                <div class="listen-to-record-panel">
                    <p>Listen to the recording</p>
                    <div>
                        <button class="listen-play-resume" > <img  src='${s3ExerciseImages}/speak_play.svg' alt=\"\" />  </button>
                        <div class="listen-playbar">
                            <div class="listen-playbar-progress" />
                                <span> 00:00 </span>
                            </div>
                            <button class="listen-speed" onclick=\"JSRecordedAudioUpdatePlayRate()\" >1 x</button>
                            <button class="re-record" onclick=\"JSstartRecording()\"> <img  src='${s3ExerciseImages}/speaker_re_record.svg' alt=\"\" />  </button>
                        </div>
                    </div>
                </div>
           </div>
        </div>
`;

    AddToDOM(str, "APPEND", "#cue");

    // inital hide listen to record panel
    $(".listen-to-record-panel").hide();

    if (JSisAssessmentAccount && (JSLessonType == LessonType.Assessment || JSLessonType == LessonType.AssessmentPractice))
        $("#speak_tu_next_button").html(GetInUILang(UILang, "Next"));
    else
        $("#speak_tu_next_button").html(GetInUILang(UILang, "Check"));

    $("#next_button").attr("onclick", "JSSpeakCheckBtnPressed();");

    // compute next TU
    JSCallBGNextTU();
}


function JSSpeakTUAssessmentMode() {
    $('.speak-control-panel').hide();
    $('#speak_ts_lbl').css('margin-right', '0');
}

function AttachAudioToPlayRate() {
    var element = $('.speak-control-panel');
    var audio = document.getElementById("TSaudio");

    if (audio) {
        audio.playbackRate = 1;
    }

    currentAudio = {
        ...currentAudio,
        rootElement: element,
        audioElement: audio,
        isPlaying: false
    };
    return;
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayDialogDictateTU
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayDialogDictateTU(jv_object) {
    speakTUnumOfAttempts = maxSpeakTUrecAttempts;
    isPlayUserRecord = false;
    isPlayCorrectRecord = false;
    KPforThisTU = 0;
    transcription = "";
    speakTUcorrectWords = [];
    speakTUwrongWords = [];
    totalTrialsDuration = 0;
    SpeakTUTSid = jv_object.TSid;
    SpeakNextBtnShouldStayDisabled = false;

    JSEnableNextButton();

    if (SpeakTUTSid == NaN)
        SpeakTUTSid = 0;

    $('#cue').empty();
    $('#your_answer').empty();
    $('#your_answer').hide();
    $('#ex_image_div').empty();
    $('#cue').attr('dir', "ltr");

    var str = "<div id=\"answer_area\"></div>";
    AddToDOM(str, "APPEND", '#your_answer');

    // adjust body to dictate
    $(".exercise-content").css({ "width": "100%", "padding-top": "2rem" })


    isDialogue = true;
    JSSetRecordsGender(jv_object);

    JSDisplayPartialAnswers(jv_object.panswer_size, jv_object.panswers, isDialogue);

    $('#your_answer').show();

    // scroll to chat head
    $('#your_answer').animate({ scrollTop: "0" });

    if (recorderGender1 == "M") {
        $('#male_avatar').show();
    } else {
        $('#female_avatar').show();
    }
}

function JSDisplayDialogTUDialogMode(jv_object) {
    speakTUnumOfAttempts = maxSpeakTUrecAttempts;
    isPlayUserRecord = false;
    isPlayCorrectRecord = false;
    KPforThisTU = 0;
    transcription = "";
    speakTUcorrectWords = [];
    speakTUwrongWords = [];
    totalTrialsDuration = 0;
    SpeakTUTSid = jv_object.TSid;
    SpeakNextBtnShouldStayDisabled = false;

    JSEnableNextButton();

    if (SpeakTUTSid == NaN)
        SpeakTUTSid = 0;

    $('#cue').empty();
    $('#your_answer').empty();
    $('#your_answer').hide();
    $('#ex_image_div').empty();
    $('#cue').attr('dir', "ltr");

    var str = "<div id=\"answer_area\"></div>";
    AddToDOM(str, "APPEND", '#your_answer');

    // adjust body to dictate
    $(".exercise-content").css({ "width": "100%", "padding-top": "2rem" })


    isDialogue = true;
    JSSetRecordsGender(jv_object);

    let content;

    content = [...jv_object.tss, jv_object.partial_answer]
    if (jv_object.partial_answer == "") {
        content.pop();
    }

    JSDisplayPartialAnswers(content.length, content, isDialogue);

    $('#your_answer').show();
}
/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayDialogDictateTU
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayDialogSpeakTU(jv_object) {
    speakTUnumOfAttempts = maxSpeakTUrecAttempts;
    isPlayUserRecord = false;
    isPlayCorrectRecord = false;
    KPforThisTU = 0;
    transcription = "";
    speakTUcorrectWords = [];
    speakTUwrongWords = [];
    totalTrialsDuration = 0;
    SpeakTUTSid = jv_object.TSid;
    SpeakNextBtnShouldStayDisabled = false;
    allowLongerRecordingTime = true;

    if (SpeakTUTSid == NaN)
        SpeakTUTSid = 0;

    $('#cue').empty();
    $('#your_answer').empty();
    $('#your_answer').hide();
    $('#ex_image_div').empty();
    $('#cue').attr('dir', "ltr");

    var str = "<div id=\"answer_area\"></div>";
    str += "<audio id=recordedAudio></audio></div>";
    AddToDOM(str, "APPEND", '#your_answer');

    $(".exercise-content").css({ "width": "100%", "padding-top": "2rem" })

    isDialogue = true;
    JSSetRecordsGender(jv_object);

    JSDisplayPartialAnswers(jv_object.panswer_size, jv_object.panswers, isDialogue);

    $('#your_answer').show();

    $("#next_button").attr("onclick", "JSSpeakCheckBtnPressed();");

    str = "<div id='speak_well_done_div'></div>'";
    AddToDOM(str, "INS_AFTER", '#speak_check_div');

    // TODO: Revisit
    //if (JSisAssessmentAccount) {
    //    $('.audio-container').hide();
    //}

    // compute next TU
    JSCallBGNextTU();

}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplaySortTU
// Displays a SORT TU.
//////////////////////////////////////////////////////////////////////////////////////////
function JSDisplaySortTU(jv_object) {

    $('#exercise').unbind('touchmove');

    // In SORT TU, the answer text-area is first, so we put it in the cue element
    $('#sort_cue').empty();
    $('#sort_cue').attr('dir', "ltr");

    //SORT TU do not have hints
    $('#hint-button').hide();

    var str = "<div id=\"answer_area\"></div>";
    AddToDOM(str, "APPEND", '#sort_cue');
    JSDisplayAnswerArea(jv_object);
    $('.p_answer_tbx_cl').each(function () {
        $(this).attr('class', "p_sort_answer_tbx_cl");
        $(this).attr('title', "Drag word back to word bank to replace it");
        $(this).attr('readonly', 'readonly');
    });
    // Create the instruction of the machsan milim
    $('#your_answer').empty();
    $('#your_answer').show();


    // Create the machsan milim
    str = JSCreateMachsanMilim(jv_object.task);
    AddToDOM(str, "APPEND", '#your_answer');
    // set SORT drag behavior
    if (!JSisDemonstrationMode)
        JSSetSortDragBehavior();

    $('#sort_cue').show();
}

function JSDisplayDialogSortTU(jv_object) {

    $('#exercise').unbind('touchmove');
    // clear image
    $('#ex_image_div').empty();
    // hide hint button
    $('#hint-button').hide();

    var str = "<div id=\"answer_area\"></div>";
    AddToDOM(str, "APPEND", '#your_answer');

    $(".exercise-content").css({ "width": "100%", "padding-top": "2rem" })

    isDialogue = true;

    var content = [...jv_object.tss, jv_object.partial_answer];
    if (jv_object.partial_answer == "") {
        content.pop();
    }

    JSDisplayPartialAnswers(content.length, content, isDialogue);
    $('#your_answer').show();

    $('.p_answer_tbx_cl').each(function () {
        $(this).attr('class', "p_sort_answer_tbx_cl");
        $(this).attr('title', "Drag word back to word bank to replace it");
        $(this).attr('readonly', 'readonly');
    });

    $("#response_0_tbx").parent().addClass("sort-bubble");

    let draggableBank = JSCreateMachsanMilim(jv_object.task);
    $(draggableBank).insertAfter(".sort-bubble");

    // add click event to check 
    $("#machsan_milim_div").parent().parent().addClass('final-sort-bubble');
    $(".final-sort-bubble .submit-message-container .submit-message").attr('onclick', "JSCheckBtnPressed()")

    if (!JSisDemonstrationMode)
        JSSetSortDragBehavior();
}

function JSDisplayDialogTranslateTU(jv_object) {
    // clear image
    $('#ex_image_div').empty();

    // add padding top to exercise content
    $("#your_answer").css({ "padding-top": "3rem" });

    JSEnableNextButton();

    var str = "<div id=\"answer_area\"></div>";
    AddToDOM(str, "APPEND", '#your_answer');

    $(".exercise-content").css({ "width": "100%", "padding-top": "2rem" })

    isDialogue = true;

    var content = [...jv_object.tss, jv_object.partial_answer];

    if (jv_object.partial_answer == "") {
        content.pop();
    }

    JSDisplayPartialAnswers(content.length, content, isDialogue);
    $('#your_answer').show();

    // Insert translation
    if (JSCurTU.TUtype == "Translate") {
        // add click event
        $(".translate-bubble .submit-message-container .submit-message").unbind().attr('onclick', "JSDisplayNextBubble()")
    }
}

function JSDisplayDialogImageTU(jv_object) {
    // clear image
    $('#ex_image_div').empty();

    // add padding top to exercise content
    $("#your_answer").css({ "padding-top": "3rem" });

    JSEnableNextButton();

    var str = "<div id=\"answer_area\"></div>";
    AddToDOM(str, "APPEND", '#your_answer');

    $(".exercise-content").css({ "width": "100%", "padding-top": "2rem" })

    isDialogue = true;

    var content = [...jv_object.tss, jv_object.partial_answer];

    if (jv_object.partial_answer == "") {
        content.pop();
    }

    JSDisplayPartialAnswers(content.length, content, isDialogue);
    $('#your_answer').show();

    $("#response_0_tbx").parent().parent().first().addClass("image-container");
    $(".image-container img").attr("src", jv_object.imageUrl);
    $(".image-container img").css({ "width": "100%", "margin-top": ".5rem", "margin-bottom": "2rem" });

    $('.bubble-image').find('img[src=""]').parent().remove();
}

function JSDisplayDialogTextSBWithImageTU(jv_object) {
    // clear image
    $('#ex_image_div').empty();

    // add padding top to exercise content
    $("#your_answer").css({ "padding-top": "3rem" });

    JSEnableNextButton();

    var str = "<div id=\"answer_area\"></div>";
    AddToDOM(str, "APPEND", '#your_answer');

    $(".exercise-content").css({ "width": "100%", "padding-top": "2rem" })

    isDialogue = true;

    var content = [...jv_object.panswers, jv_object.partial_answer];

    if (jv_object.partial_answer == "") {
        content.pop();
    }

    JSDisplayPartialAnswers(content.length, content, isDialogue);
    $('#your_answer').show();

    // Image Dialouge
    let imageBubble = ` 
              <img id="textsb-image" alt="" />`;

    $('#response_parts').append(imageBubble);
    $("#textsb-image").attr("src", jv_object.imageUrl)
}

function JSDisplayDialogTextSB(jv_object) {
    // clear image
    $('#ex_image_div').empty();

    // add padding top to exercise content
    $("#your_answer").css({ "padding-top": "3rem" });

    JSEnableNextButton();

    var str = "<div id=\"answer_area\"></div>";
    AddToDOM(str, "APPEND", '#your_answer');

    $(".exercise-content").css({ "width": "100%", "padding-top": "2rem" })

    isDialogue = true;

    var content = [...jv_object.panswers, jv_object.partial_answer];

    if (jv_object.partial_answer == "") {
        content.pop();
    }

    JSDisplayPartialAnswers(content.length, content, isDialogue);
    $('#your_answer').show();

}
/////////////////////////////////////////////////////////////////////////////////////////
// JSCreateMachsanMilim
// Create the machsan-milim for the SORT TU.
/////////////////////////////////////////////////////////////////////////////////////////
function JSCreateMachsanMilim(mmFromServer) {
    var mm = "";
    var mmParts = mmFromServer.split("//");
    if (mmParts.length == 0)
        return "";
    mm += "<div id=\"machsan_milim_div\">";
    for (i = 0; i < mmParts.length; i++) {
        var wordSeparator = (i == 0) ? "" : "   ";
        mm += "<span class=\"span_cl\">" + wordSeparator + "</span> ";
        //mm += "<label class=\"sort_active_lbl\" title=\"Click to move it to your answer\">" + mmParts[i] + "</label>";
        var sortActiveLblTxt = GetInUILang(UILang, "Drag to the correct place in the answer");

        mm += "<label class=\"sort_active_lbl\" title=\"" + sortActiveLblTxt + "\">" + mmParts[i] + "</label>";
    }
    mm += "</div>";
    return mm;
}




////////////////////////////////////////////////////////////////
// JSSetSortDragBehaviorMultipleAnswers
// Grammar Sort
// Make word bank word draggable to their relevant unput fields
// Make blank input fields droppable for the relevant word bank words
//////////////////////////////////////////////////////////////
function JSSetSortDragBehaviorMultipleAnswers(answer_idx) {
    //JSBindDragOperationToMMWords();
    JSBindDragOperationToWBWordsGS(answer_idx);
    $("input").draggable({ cancel: "textarea,button,select,option" });
    $('.blank_grp_' + answer_idx).draggable({
        containment: '#panswer_' + answer_idx,
        cursor: 'move',
        helper: JSDragHelper,
        start: JSHandleDragStartInAnswer,
        stop: JSHandleDragStopInAnswer,
        revert: true
    });

    $('#word_bank_div_' + answer_idx).droppable({
        accept: '.blank_grp_' + answer_idx,
        drop: JSHandleDropEventInWB
    });
    $('.blank_grp_' + answer_idx).droppable({
        accept: '.mm_grp_' + answer_idx + ', .blank_grp_' + answer_idx + ', #word_bank_div_' + answer_idx,
        //accept: '.mm_grp_' + answer_idx + ', .blank_grp_' + answer_idx,
        drop: JSHandleDropEventInAnswerGrammarSORT,
        activate: function () {
            $('.ui-draggable-dragging').css({ color: "#fff" });
        },
        deactivate: function () {
            $('.ui-draggable-dragging').css({ color: "#091742" });
        },
    });
}


/////////////////////////////////////////////////////////////////////////////////////////
// JSSetGrammarSortDragBehavior
// this function set the draggable feature to grammar sort
// based on JSSetSortDragBehavior
////////////////////////////////////////////////////////////////////////////////////////
function JSSetGrammarSortDragBehavior() { // GrammarSort: Method not in use. remove before commit to master
    JSBindDragOperationToWBWords();
    $("input").draggable({ cancel: "textarea,button,select,option" });
    $('.p_answer_tbx_cl').draggable({
        containment: '#exercise',
        cursor: 'move',
        helper: JSDragHelper,
        start: JSHandleDragStartInAnswer,
        stop: JSHandleDragStopInAnswer,
        revert: true
    });
    $('.p_grammar_sort_answer_tbx').droppable({
        accept: '.p_answer_tbx_cl',
        drop: JSHandleDropEventInWB
    });
    $('.p_answer_tbx_cl').droppable({
        accept: '.sort_active_lbl, .p_answer_tbx_cl',
        drop: JSHandleDropEventInAnswerGrammarSORT

    });


}






/////////////////////////////////////////////////////////////////////////////////////////
// JSSetSortDragBehavior
////////////////////////////////////////////////////////////////////////////////////////
function JSSetSortDragBehavior() {

    JSBindDragOperationToMMWords();

    $("input").draggable({
        cancel: "textarea,button,select,option",

    });
    $('.p_sort_answer_tbx_cl').draggable({
        containment: '#exercise',
        cursor: 'move',
        helper: JSDragHelper,
        cursorAt: { top: 5, left: 5 },
        start: JSHandleDragStartInAnswer,
        stop: JSHandleDragStopInAnswer,
        revert: true
    });
    $('#machsan_milim_div').droppable({
        accept: '.p_sort_answer_tbx_cl',
        drop: JSHandleDropEventInMM
    });
    $('.p_sort_answer_tbx_cl').droppable({
        accept: '.sort_active_lbl, .p_sort_answer_tbx_cl',
        drop: JSHandleDropEventInAnswer
    });
}

function JSBindDragOperationToMMWords() {
    $('.sort_active_lbl').draggable({
        containment: '#exercise',
        cursor: 'move',
        //snap: '.p_sort_answer_tbx_cl',
        revert: true
    });
}

function JSBindDragOperationToWBWords() {
    $('.sort_active_lbl').draggable({
        containment: '#exercise',
        cursor: 'move',
        //snap: '.p_answer_tbx_cl',
        revert: true
    });
}

/*
 * Grammar sort version 
 */
function JSBindDragOperationToWBWordsGS(answer_idx) {
    $('.mm_grp_' + answer_idx).draggable({
        containment: '#panswer_' + answer_idx,
        cursor: 'move',
        snap: '.blank_grp_' + answer_idx + '.p_answer_tbx_cl',
        revert: true
    });
}
function JSDragHelper(event) { // GrammarSort: Called when drag from blank to blank
    var word = $(this).val();
    var id = $(this).attr("id");
    return "<span class=\"sort_active_lbl\" id=\"helper" + id + "\">" + word + "</span>";
}

/*
 * remove value of dragged word from input field 
 */
function JSHandleDragStartInAnswer(event, ui) {
    ui.helper.data('dropped', false);
    var helperId = ui.helper.attr('id');
    var originalId = helperId.substr(6);
    $("#" + originalId).val("");
    $('#' + originalId).removeClass('answered');
    $(this).css("min-width", "102px");
}

/* GrammarSort: set destination input field with the dragged word*/
function JSHandleDragStopInAnswer(event, ui) {
    var word = ui.helper.text();
    if (word == "")
        return;
    var helperId = ui.helper.attr('id');
    var originalId = helperId.substr(6);
    if (ui.helper.data('dropped') == false) {
        $("#" + originalId).val(word);
        $('#' + originalId).addClass('answered');
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSHandleDropEventInAnswer
// Handles the 'drop' event in the answer area.
// There are 2 cases:
// 1. The dropped word was dragged from the MM. In this case the draggable itself has the text, 
//    and should be removed.
// 2. The dropped word was dragged from another blank. In this case the helper has the text, 
//    and the helper should be removed.
////////////////////////////////////////////////////////////////////////////////////////
function JSHandleDropEventInAnswer(event, ui) {
    emptyAnswer = false;
    JSDetectTextAnswer();
    var draggable = ui.draggable;
    draggable.draggable('option', 'revert', false);
    var isFromMM = draggable.hasClass("sort_active_lbl");
    if (isFromMM) { // The dropped word was dragged from the MM
        var newVal = draggable.text();
        // remove the point between words in the MM
        if ((draggable.next() != null) && (draggable.next().html() != null))
            draggable.next().remove();
        else if ((draggable.prev() != null) && (draggable.prev().html() != null))
            draggable.prev().remove();
        draggable.remove();
    }
    else // The dropped word was dragged from another blank
    {
        var newVal = ui.helper.text();
        var helperId = ui.helper.attr('id');
        var originalId = helperId.substr(6);
        $("#" + originalId).val("");
        ui.helper.remove();
    }
    var oldVal = $(this).val();
    const sizeOffset = isMacOS() ? 3 : 0;

    if (newVal.length > 7)
        $(this).attr('size', newVal.length + sizeOffset);
    else
        $(this).attr('size', 6 + sizeOffset);

    if (newVal != '')
        $('#' + event.target.id).addClass('answered');

    $(this).val(newVal);
    if (oldVal != "") // return the old word back to the MM
        JSAddOneWordToMM(oldVal)
    else {
        // if no more words, set focus on last word of response field, to be able to catch the 
        // return key to instead of pressing Next button
        if ($('.sort_active_lbl').size() == 0)
            $('.p_sort_answer_tbx_cl').last().focus();
    }
}


/////////////////////////////////////////////////////////////////////////////////////////
// JSGetnswerIdMultupleAnswers
// Use class name to extract answer id
////////////////////////////////////////////////////////////////////////////////////////
function JSGetnswerIdMultupleAnswers(draggable) {
    var className = draggable.attr("class").split(' ')[0];
    var id = JSGetnswerIdx(className);
    return id;
}

function JSGetnswerIdx(classOrId) {
    var startIdPs = classOrId.lastIndexOf('_');
    var id = classOrId.substring(startIdPs + 1);
    return id;
}
/////////////////////////////////////////////////////////////////////////////////////////
// JSHandleDropEventInAnswerGrammarSORT
// Based on JSHandleDropEventInAnswer
//TODO- documantation
////////////////////////////////////////////////////////////////////////////////////////
function JSHandleDropEventInAnswerGrammarSORT(event, ui) {
    var draggable = ui.draggable;
    //draggable.draggable('option', 'revert', false);
    var answerId = JSGetnswerIdMultupleAnswers(draggable);
    var isFromMM = draggable.hasClass("sort_active_lbl");
    if (isFromMM) { // The dropped word was dragged from the MM
        var newVal = draggable.text();
        // remove the point between words in the MM
        if ((draggable.next() != null) && (draggable.next().html() != null))
            draggable.next().remove();
        else if ((draggable.prev() != null) && (draggable.prev().html() != null))
            draggable.prev().remove();
        draggable.remove();
    }
    else // The dropped word was dragged from another blank
    {
        var newVal = ui.helper.text();
        var helperId = ui.helper.attr('id');
        var originalId = helperId.substr(6);
        $("#" + originalId).val("");
        ui.helper.remove();
    }
    var oldVal = $(this).val();

    if (newVal.length >= 7)
        $(this).attr('size', newVal.length);
    else
        $(this).attr('size', 6);

    $(this).val(newVal);
    if (oldVal != "") // return the old word back to the MM
        JSAddOneWordToWB(oldVal, "word_bank_div_" + answerId); // Use the answer id when moving word back to bank
    else {
        // if no more words, set focus on last word of response field, to be able to catch the 
        // return key to instead of pressing Next button
        if ($('.sort_active_lbl').size() == 0)
            $('.p_answer_tbx_cl').last().focus();
    }
}


function JSHandleDropEventInMM(event, ui) {
    ui.draggable.draggable('option', 'revert', false);
    var word = ui.helper.text();

    //prevent blank add to bank
    if (word == "")
        return;

    ui.helper.data('dropped', true);
    ui.draggable.val("");
    JSAddOneWordToMM(word);
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSHandleDropEventInWB
// TODO-  documantation 
//based on JSHandleDropEventInMM
////////////////////////////////////////////////////////////////////////////////////////

function JSHandleDropEventInWB(event, ui) {
    ui.draggable.draggable('option', 'revert', false);
    var word = ui.helper.text();
    //var bankDivID= ui.helper.parent.id;    

    ui.helper.data('dropped', true);
    ui.draggable.val("");
    var answer_id = JSGetnswerIdMultupleAnswers(ui.draggable);
    JSAddOneWordToWB(word, "word_bank_div_" + answer_id);
}



function JSAddOneWordToWB(word, bankDivID) {
    var str = "";
    if ($('.mm_grp_' + JSGetnswerIdx(bankDivID)).size() > 0)
        str += "<span class=\"span_cl\">  </span>";

    var sortActiveLblTxt = GetInUILang(UILang, "Drag to the correct place in the answer");
    str += "<label class=\"mm_grp_" + JSGetnswerIdx(bankDivID) + " sort_active_lbl\" title=\"" + sortActiveLblTxt + "\">";
    str += word + "</label>";
    srtID = "#" + bankDivID;
    AddToDOM(str, "APPEND", srtID);
    JSBindDragOperationToWBWordsGS(JSGetnswerIdx(bankDivID));
}



function JSAddOneWordToMM(word) {
    var str = "";
    if ($('.sort_active_lbl').size() > 0)
        str += "<span class=\"span_cl\">  </span>";

    var sortActiveLblTxt = GetInUILang(UILang, "Drag to the correct place in the answer");

    str += "<label class=\"sort_active_lbl\" title=\"" + sortActiveLblTxt + "\">";
    str += word + "</label>";
    AddToDOM(str, "APPEND", '#machsan_milim_div');
    JSBindDragOperationToMMWords();
}

////////////////////////////////////////////////////////////////////////////////////////////
// JSDeactivateSortTU
// When we check the user's answer, we avoid the answer from being modified.
// In SORT, we cancel the option to select words from the response area and the machsan milim 
/////////////////////////////////////////////////////////////////////////////////////////////

function JSDeactivateSortTU() {
    $('.p_sort_answer_tbx_cl').each(function () {
        $(this).draggable('disable');
        $(this).removeAttr("title");
    });
    $('.sort_active_lbl').each(function () {
        $(this).removeAttr("title");
        $(this).draggable('disable');
    });
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSShowExercisePage
////////////////////////////////////////////////////////////////////////////////////////
function JSShowExercisePage() {
    skipAnimation = false;
    window.scrollTo(0, 0);
    $('#exercise').scrollTop(0, 0);
    JSAdjustExerciseToScreenHeight();
    $('#exercise_feedback').hide();
    $('#exercise_closure').hide();
    $('#progress_animation').hide();
    $('#exercise').css('display', 'flex');
    $('#second_chance_msg').hide();
    $('#second_chance_msg_dialog').hide();
    JSChangeNextButtonToCheck();
}

function JSHideExecrcisePage() {
    JSShowExercisePage();
    $('#speaker_in_exercise').hide();
    $('#slow_speaker_in_exercise').hide();
    $('#check_div').hide();
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSShowFeedbackPage
////////////////////////////////////////////////////////////////////////////////////////
function JSShowFeedbackPage() {
    curExercisePart = EXERCISE_PARTS.FEEDBACK;
    window.scrollTo(0, 0);
    $('#exercise').hide();
    $('#exercise_closure').hide();
    $('#grammar_explanation').hide();
    //JSHideFeedbackContent();
    $('#answer_highlight_div').show();
    if (correctType == "EmptyAnswer") {
        $('#answer_highlight_div').hide();
    }
    $('#exercise_feedback').show();
    $('#speaker_in_feedback').show();
    $('.brain-bg').css("opacity", "1");
    // remove feedback magnichat 
    $("#exercise").removeAttr('dialog')

    // add class name to dashboard container
    $("#root > main > div:first-of-type").addClass('feedback-mode')
    $("#root > main > img").addClass('feedback-mode')
    $("#root > main > div:nth-of-type(2)").addClass('feedback-mode')
    $("#root > main > div:nth-of-type(3)").addClass('feedback-mode')
    $("#root > main > div:nth-of-type(3) > div:nth-of-type(2)").hide();

    //tooltips 
    $('.exercise-tooltip').hover(function () { $('.tooltiptext').css({ 'visibility': 'visible', 'opacity': '1' }) });
    $('.exercise-tooltip').mouseleave(function () { $('.tooltiptext').css({ 'visibility': 'hidden', 'opacity': '0' }) });

    // height changes for safari chrome
    $("#exercise").attr("feedbackMode", "true");
    //JSSetContentHeight();
    JSEnableSpeakerInFeddback();
    //JSEnableNextButton();
    JSChangeNextButtonToContinue();
    // hide instruction
    $("#instruction").hide();

    // Change check answer font size according to Language
    JSFeedbackFontSizes();

    JSResetFeedbackPlayback();

    if (isQaLoadMode)
        JSAutomaticContinueFeedback();
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSResetFeedbackPlayback
////////////////////////////////////////////////////////////////////////////////////////
function JSResetFeedbackPlayback() {
    if (currentAudio.audioElement) {
        if (currentAudio.audioElement.playbackRate != 1) {
            currentAudio.audioElement.playbackRate = 1;
        }
        const tempAudio = currentAudio.audioElement;
        tempAudio.currentTime = 0;
        currentAudio.audioElement = tempAudio;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSFeedbackFontSizes
////////////////////////////////////////////////////////////////////////////////////////
function JSFeedbackFontSizes() {
    if (UILang === 'H') {
        $("#expected_answer_label").css('font-size', '16px');
        $("#your_answer_label_in_feedback").css('font-size', '16px');
        $("#disagree_button button").css('font-size', '16px !important');
        $("#well_done_label").css('font-size', '16px');
        $("#worth_reading_label").css('font-size', '16px');
        return;
    }
    $("#expected_answer_label").css('font-size', '14px');
    $("#your_answer_label_in_feedback").css('font-size', '14px');
    $("#my-answer-is-correct-btn").css('font-size', '14px');
    $("#well_done_label").css('font-size', '14px');
    $("#worth_reading_label").css('font-size', '14px');

}
/////////////////////////////////////////////////////////////////////////////////////////
// JSHideFeedbackContent
////////////////////////////////////////////////////////////////////////////////////////
function JSHideFeedbackContent() {
    $('#answer_highlight_words').children().css({ opacity: "0.0" });
    if (isSeparateExp())
        $('#worth_reading_list').children().hide();
    else
        $('#worth_reading_list').children().css({ opacity: "0.0" });
    $('.well_done_KU_lbl').css({ opacity: "0.0" });
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSFadeFeedbackPage
////////////////////////////////////////////////////////////////////////////////////////
function JSFadeFeedbackPage() {
    $('#answer_highlight_div').css({ opacity: "0.4" });
    $('#worth_reading_div').css({ opacity: "0.4" });
    $('#well_done_div').css({ opacity: "0.4" });
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSContinueBtnPressed
////////////////////////////////////////////////////////////////////////////////////////
function JSContinueBtnPressed() {
    if (JSIsNextButtonAllowed()) {
        JSDisableNextButton();
        JSTracingLog("Continue Btn Pressed");

        $('#exercise-monitor').animate({ bottom: '-200%' }, 1000, function () {
            JSGetNextTU();
        });
        if (screen.width < 580) {
            $('#user_feedback_toggle').animate(
                { opacity: '0' },
                250,
                function () {
                }
            );
        }
        if (JSisAssessmentAccount && screen.width >= 1200) {
            $('.timer-minutes').parent().animate({ opacity: '0' }, 250)
        }

        // Return control panel and dashboard to normal mode
        $("#root > main > div:first-of-type").removeClass('feedback-mode')
        $("#root > main > img").removeClass('feedback-mode')
        $("#root > main > div:nth-of-type(2)").removeClass('feedback-mode')
        $("#root > main > div:nth-of-type(3)").removeClass('feedback-mode')
        $("#root > main > div:nth-of-type(3) > div:nth-of-type(2)").show()

        $("#exercise").removeAttr('feedbackmode');
        //JScloseFeedbackWindow();
        //JSRemoveMarginOfWorthReadingDiv();

    }
}


function JSFeedbackAnimation() {
    const windowWidth = window.innerWidth;

    skipAnimation = true;
    if (windowWidth >= 580) {
        // scroll to animation
        $("#exercise_feedback").animate({
            scrollTop: $(this).height() - $("#well_done_div").height()
        }, 'slow');

        var brainBGcY = $('.brain-bg').height() / 2;

        let animateWidthVolcabulary, animateWidthGrammar;
        var exerciseScreen = $("#exercise_feedback").width();
        var vocabularyListWidth = $('.weel-done-category.vocabulary').width();
        var grammarListWidth = $('.weel-done-category.grammar').width();
        if (grammarListWidth) {
            animateWidthVolcabulary = vocabularyListWidth + (exerciseScreen - 20 - (exerciseScreen * 1 / 3) + 16) / 2; // 56 is the distance of .brain-bg from the border
        } else {
            animateWidthVolcabulary = vocabularyListWidth + (exerciseScreen - 20 - (exerciseScreen * 1 / 10) + 16) / 2; // 56 is the distance of .brain-bg from the border
        }

        $('.weel-done-category.vocabulary ul li').each(function (index) {

            $(this).css("position", "absolute");
            $(this).animate({
                opacity: 0,
                left: animateWidthVolcabulary,
                top: brainBGcY
            }, 450, '', function () {
                $(this).remove();
            })

        });


        // Grammer section animation
        animateWidthGrammar = grammarListWidth + (exerciseScreen - 20 - (exerciseScreen * 1 / 10) + 16) / 2; // 56 is the distance of .brain-bg from the border
        $('.weel-done-category.grammar ul li').each(function (index) {

            $(this).css("position", "absolute");
            $(this).animate({
                opacity: 0,
                position: 'absolute',
                left: animateWidthGrammar,
                top: brainBGcY
            }, 350, '', function () {
                $(this).remove();
            })

        });
        $("#exercise").attr('feedbackanimation', true);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSContinueAnimationBtnPressed
// continue button in closure animation pressed
// if the user already saw the message then continue, else let him see the msg and continue after 1 second
////////////////////////////////////////////////////////////////////////////////////////
function JSContinueAnimationBtnPressed() {
    JSDisableClosureContinueButton();
    closureAnimationTimeLine.pause();
    JSAfterClosurePage(" ContinueAnimationBtnPressed");
}


/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayFeedbackPage
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayFeedbackPage(TStoDisplay, LA, exp, correct_KUs, correct_Grammar_KUs, correct_Vocabulary_KUs, TU_kp, msgsCorrectTypes) {
    $('#hint-button').hide();
    $('#skip-button').hide();

    //remove dialog attribute from exercise
    //this is need due to remove specific dialog CSS side effects
    $('[dialog="true"]').removeAttr('dialog');

    JSCurTU.wasInFeedbackPage = true;
    JShideExerciseGuides();
    //TODO highlight blank part
    //var str = JSCreateRecommendedAwswerStr(LA, false);
    if (isEncoded(TStoDisplay)) {
        const problem = `TS wasn't decoded, TS: ${TStoDisplay}, Type: ${JSCurTU.TUtype}. JSCUR State: ${JSCurTU.toString()}.`;
        JSSaveProblemForDebug(problem)
        TStoDisplay = JSDecryptData(TStoDisplay);
    }
    $('#TS').html(TStoDisplay);

    if (correctType != "EmptyAnswer") {
        // Start each answer on a new line, using div wrap (expected answer is highlighted with yellow and blue underlines)
        if (isSeparateExp()) {
            const explanationsPointers = JSExplanationsPointers(exp);
            const explanations = JSGetFormattedExplanations(exp);
            JSDisplaySeparateMarkedAnswer(LA, explanationsPointers, explanations);
        }
        else {
            JSDisplayMarkedAnswer(LA);
        }
    }

    $('#worth_reading_container').hide();
    $('#worth_reading_div').empty();
    if ((correctType != "EmptyAnswer") && !JSIsCorrectAnswerWoMsg(correctType) && (exp != "")) {
        JSDisplayWorthReading(exp, msgsCorrectTypes);
        $('#worth_reading_list').css('min-height', '0px');
        JSSetWorthReadingHeight(exp);
        $('#worth_reading_container').show();
        if (isSeparateExp()) {
            // for grammar sort and grammar SB we show each time only the explanation that corresponds
            // to the hovered wrong answer
            JSDisplayOneExplanation('worth_reading_list');
            $('#worth_reading_list').children().show();
        }
    }


    // remove the translation tooltip if exists
    if ($('#TS').hasClass('exercise-tooltip'))
        $('#TS').removeClass('exercise-tooltip');

    // Add translation tooltip if needed
    if (JSCurTU.translationForFeedback != "")
        JSDisplayTranslationInFeedback(JSCurTU.translationForFeedback, JSCurTU.L1);

    $('#well_done_container').hide();
    $('#well_done_div').empty();
    if ((correct_KUs != null) && (correct_KUs.length > 0)) {
        JSDisplayWellDone(correct_KUs, correct_Grammar_KUs, correct_Vocabulary_KUs, TU_kp, false, false);
        $('#well_done_container').show();
        correctKUinTU = correct_KUs.length;
    }

    // if it's trial account and it's the first time that the user got correct KUs and worth reading - show popup
    if ((JSisDemoAccount || JSisClilTrial || JSisDemonstrationMode) && !JSisUsertup && !isQaLoadMode && !JSisAssessmentAccount && $('#worth_reading_div').children().length != 0
        && (correct_KUs != null && correct_KUs.length > 0)) {
        var isAllMsgsCorrect = false;
        // check if all the msgs in worth reading are with green check mark to avoid giving the correctKUs popup in this case
        if (msgsCorrectTypes != null && msgsCorrectTypes.length > 0) {
            isAllMsgsCorrect = true;
            for (i = 0; i < msgsCorrectTypes.length; i++) {
                if (msgsCorrectTypes[i] != "CorrectWithMessage")
                    isAllMsgsCorrect = false;
            }
        }

        // check if the user got the correctKUs popup
        if (!isAllMsgsCorrect && !JSisUserGotPopup("trial_correct_kus")) {
            JSDisplayCorrectKUsPopup();
            return;
        }
    }
    if (correctType == "EmptyAnswer") {
        JSDisplayEmptyAnswerFeedback();
    }
    else {
        JSAdjustfeedbackPage();
    }

    JSShowFeedbackPage();
    JSPlayAnswerAudio(correctType);
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSTrasnformExp
////////////////////////////////////////////////////////////////////////////////////////
function JSTransformExp(exp) {
    for (var i = 0; i < exp.length; i++) {
        let item = exp[i];
        let generetedExplenations = item.split(/[#\n]/)

        for (var j = 0; j < generetedExplenations.length; j++) {
            const formatedItem = i + 1;
            expFormated.push(formatedItem);
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayCorrectKUsPopup
// displays the CorrectKUs popup and then displays the feedback page
////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayCorrectKUsPopup() {
    $('#exercise').hide();
    JSupdatePopupsTable("trial_correct_kus", 1);
    JSSmallGotItPopup(correctKUsLbl, corectKUsMsg, function () {
        JSShowFeedbackPage();
        JSPlayAnswerAudio(correctType);
    });
}


function isSeparateExp() {
    return JSCurTU.TUtype == "GrammarSORT" || JSCurTU.TUtype == "GrammarSB" || JSCurTU.TUtype == "TextSB" && JSCurTU.isDialogTSS || JSCurTU.TUtype == "DialogDictate";
}


function JSSetWorthReadingHeight(exp) {
    if (isSeparateExp()) {
        var maxWorthSize = 1;
        var exparray = exp.split("\n");
        for (var i = 0; i < exparray.length; i++) {
            var TSWorthSize = exparray[i].split("#").length;
            if (TSWorthSize > maxWorthSize)
                maxWorthSize = TSWorthSize;
        }
        var minhieght = (((maxWorthSize - 1) * 75) + 125) + 'px';
        $('#worth_reading_list').css('min-height', minhieght);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSPlayAnswerAudio
////////////////////////////////////////////////////////////////////////////////////////
function JSPlayAnswerAudio(correctType, forcePlay) {
    var hasAudio = (($('#TSaudio').size() > 0) || (isTextTU && $('#text_audio').size() > 0) || ((JSCurTU.TUtype == "DialogSpeak" || JSCurTU.TUtype == "TextSpeak") && $('#text_audio').size() > 0));
    var shouldPlayAudio = !(JSisUsertup || JSCurTU.TUtype == "GrammarSB" || JSCurTU.TUtype == "GrammarSORT");
    if (hasAudio) {
        if (shouldPlayAudio || forcePlay) {
            if ($('#TSaudio').size() > 0) {
                JSTSAudioPlay(true, fromFeedback = true);
            }
            else { // isTextTU
                JSTextAudioPlay(true, fromFeedback = true);
            }
        }
        else {
            JSEnableNextButton();
            $('#next_button, #long_next_button').focus();
        }
    }
    else {
        JSEnableNextButton();
        $('#speaker_in_feedback').hide();
        $('#next_button, #long_next_button').focus();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayWellDone
// Display the part of the exercise feedback, in which the correct KUs are displayed
////////////////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayWellDone(correct_KUs, correct_Grammar_KUs, correct_Vocabulary_KUs, TU_kp, isClosure, isSpeak) {
    $('#well_done_list').remove();

    var KPForThisTUdouble = 0.0;

    KPForThisTUdouble = TU_kp;

    if (!isClosure) {
        $('#well_done_label').html(GetInUILang(UILang, "Here's what you've just practiced!"));
        if (JSIsRtlLanguage(UILang)) {
            $('#well_done_label').css({ "direction": "rtl" });
        }
    }

    str = "<div id=\"well_done_list\" class=\"row\">";
    str += "<div id=\"\KP_earned_container\" class='col-sm-12 col-md-3'>";
    str += "<div class=\"KP_earned\">";
    str += "<span class=\"points_number\">+" + Math.ceil(KPForThisTUdouble) + "</span><div class=\"line-break\"></div>";
    str += "points";
    str += "</div>";
    str += "</div>";

    if (!isSpeak) {
        //check if there is vocabulary KUs to display
        if (correct_Vocabulary_KUs) {
            str += "<div class=\"col-sm-12 col-md-2 weel-done-category vocabulary\">";
            str += "<h1>Vocabulary</h1>";
            str += "<ul>";
            for (i = 0; i < correct_Vocabulary_KUs.length; i++) {
                var KUdata = correct_Vocabulary_KUs[i];
                var KUlabel = "<label class=\"well_done_KU_lbl\">" + KUdata + "</label>";
                var liId = isClosure ? "cl_well_done_line_" + i : "well_done_line_" + i;
                var KPstr = "<input type='hidden' class='KU_KP_num' value='" + KPForThisTUdouble + "' \/>";
                str += "<li   id=\"" + liId + "\" class=\"well_done_line\" >" + KUlabel + KPstr + "</li>";
            }
            str += "</ul>";
            str += "</div>";
        }

        //check if there is grammar KUs to display
        if (correct_Grammar_KUs) {
            str += "<div class=\"col-sm-12 col-md-2 weel-done-category grammar\">";
            str += "<h1>Grammar</h1>";
            str += "<ul>";
            for (i = 0; i < correct_Grammar_KUs.length; i++) {
                var KUdata = correct_Grammar_KUs[i];
                var KUlabel = "<label class=\"well_done_KU_lbl\">" + KUdata + "</label>";
                var liId = isClosure ? "cl_well_done_line_" + i : "well_done_line_" + i;
                var KPstr = "<input type='hidden' class='KU_KP_num' value='" + KPForThisTUdouble + "' \/>";
                str += "<li   id=\"" + liId + "\" class=\"well_done_line\" >" + KUlabel + KPstr + "</li>";
            }
            str += "</ul>";
            str += "</div>";
        }
    } else {
        str += "<div class=\"col-md-2 weel-done-category vocabulary\">";
        str += "<h1>Vocabulary</h1>";
        str += "<ul>";
        for (i = 0; i < correct_KUs.length; i++) {
            var KUdata = correct_KUs[i];
            var KUlabel = "<label class=\"well_done_KU_lbl\">" + KUdata + "</label>";
            var liId = isClosure ? "cl_well_done_line_" + i : "well_done_line_" + i;
            var KPstr = "<input type='hidden' class='KU_KP_num' value='" + KPForThisTUdouble + "' \/>";
            str += "<li   id=\"" + liId + "\" class=\"well_done_line\" >" + KUlabel + KPstr + "</li>";
        }
        str += "</ul>";
        str += "</div>";
    }

    str += "</div>";
    var div = isClosure ? '#cl_well_done_div' : '#well_done_div';
    if (isSpeak)
        div = '#well_done_div';

    AddToDOM(str, "APPEND", div);
    JSUpdateKPInFooter(Math.ceil(KPForThisTUdouble));

}

function JSFeedbackAfterAuioPlay() {
    if (isQaLoadMode) {
        var explanationSize = $("#worth_reading_list li").length;
        var timeToReadWorthReading = Math.min(4000, explanationSize * 2000);
        setTimeout(function () {
            JSContinueBtnPressed();
        }, timeToReadWorthReading + 1000);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayOneExplanation
// for grammar sort we show each time only the explanation that corresponds
// to the hovered wrong answer
////////////////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayOneExplanation(list_id) {
    // instructions on how to view the wrong answer explanations
    //incase of Japanese or Korean the icon should be within the message. thus, the origin message spillited in abnormal place (cut the word sceern in the middle).
    if (UILang == "J" || UILang == "K") {
        var msg1 = GetInUILang(UILang, "To get the explanation, touch the scre");
        var msg2 = GetInUILang(UILang, "en or move the mouse cursor over the");
        //var textDir = (msgLang == 'H' || msgLang == 'A') ? "rtl" : "ltr";
        var str = "<div style=\"text-align: center; display: inherit;\" id=\"instructions\">" + msg1 +
            "&nbsp;" + msg2 + "<div class=\"infoiconclass\"><img src=\"https://d1iqyql2sq5e3i.cloudfront.net/Assets/images/exercise/hint-icon.svg\" alt=\"Explanation\" title=\"Explanations\"></div>" + "</div>";

    }
    else {
        var msg = GetInUILang(UILang, "To get the explanation, touch the screen or click on the");
        //var textDir = (msgLang == 'H' || msgLang == 'A') ? "rtl" : "ltr";
        var str = "<div style=\"text-align: center; display: inherit;\" id=\"instructions\">" + msg +
            "&nbsp;<div class=\"infoiconclass\"><img src=\"" + s3ExerciseImages + "/hint-icon.svg\" alt=\"Explanation\" title=\"Explanations\"></div></div>";
    }
    AddToDOM(str, "PREPEND", '#worth_reading_list ul'); // append instruction message the list child
    // for each explanation: 
    listItems = $("#" + list_id).find("li").each(function (index) {
        $(this).css("display", "none");
        $(this).attr("class", "exp" + expFormated[index]);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// JSUnfadeFeedbackPage
////////////////////////////////////////////////////////////////////////////////////////////////////
function JSUnfadeFeedbackPage() {
    $('#answer_highlight_div').css({ opacity: "1.0" });
    var timeToReadLA = (correctType == "EqualToTS") ? 1000 : 1500;
    setTimeout(function () { JSUnfadeWorthReading(); }, timeToReadLA);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// JSUnfadeWorthReading
////////////////////////////////////////////////////////////////////////////////////////////////////
function JSUnfadeWorthReading() {
    $('#worth_reading_div').css({ opacity: "1.0" });
    var explanationSize = $("#worth_reading_list li").length;
    var timeToReadWorthReading = Math.min(4000, explanationSize * 2000);
    setTimeout(function () { JSUnfadeWellDone(); }, timeToReadWorthReading);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// JSUnfadeWellDone
// Before unfading the well-done section, we scroll the scroll-bar of the exercise-feedback to the bottom,
// so that the well-done items are shown completely.
////////////////////////////////////////////////////////////////////////////////////////////////////
function JSUnfadeWellDone() {
    var worth_reading_div = document.getElementById('main');
    var hasVerticalScrollbar = worth_reading_div.scrollHeight > worth_reading_div.clientHeight;
    if (hasVerticalScrollbar)
        $('#main').scrollTop($('#main').height());
    $('#well_done_div').css({ opacity: "1.0" });
    JSKPAnimation();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// JSAnimateWellDoneBullet
// We emphasize the well-done items by blinking the bullets, and rotating the KP coin.
// The bullets are blinking one after the other.
// After each bullet finishes blinking, there is one rotation of the KP coin.
////////////////////////////////////////////////////////////////////////////////////////////////////
function JSAnimateWellDoneBullet(curBullet, total, lessonKPBeforeTU, totalKPBeforeTU) {
    if (curBullet < total) {
        var bulletId = '#bullet_' + curBullet;
        $(bulletId).addClass('bullet_with_animation');
        $(bulletId).siblings('.well_done_KU_lbl').css({ opacity: "1.0" });
        var KUKPnum = parseFloat($(bulletId).siblings('.KU_KP_num').val());
        $(bulletId).on('webkitAnimationEnd', function () {
            JSUpdateKPInFooter(Math.ceil(lessonKPBeforeTU + KUKPnum));
            JSRotateKPCoin(curBullet, total, lessonKPBeforeTU, totalKPBeforeTU);
        });
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////
// JSRotateKPCoin
// We emphasize the well-done items by blinking the bullets, and rotating the KP coin.
// The bullets are blinking one after the other.
// After each bullet finishes blinking, there is one rotation of the KP coin.
////////////////////////////////////////////////////////////////////////////////////////////////////
function JSRotateKPCoin(curBullet, total, lessonKPBeforeTU, totalKPBeforeTU) {
    $('#kp_coin').addClass('KP_with_rotation');
    $('#kp_coin').on('webkitAnimationEnd', function () {
        $('#kp_coin').removeClass('KP_with_rotation');
        $('#kp_coin').off('webkitAnimationEnd');
        JSAnimateWellDoneBullet(curBullet + 1, total, lessonKPBeforeTU, totalKPBeforeTU);
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// JSDisagreeBtnPressed
// In case the "I think my answer is correct" button is pressed, saves the TUindex in the DB
////////////////////////////////////////////////////////////////////////////////////////////////////
function JSDisagreeBtnPressed() {
    $('#disagree_button button').attr('disabled', true);
    var istr = "type=saveMyAnswerWasCorrect";
    istr += "&TUindex=" + JSCurTU.TUindex;
    var baseMessage = "We will carefully check your answer and update the system if necessary.";
    var message = (JSCurTU.TUtype == "Dictate") ? baseMessage + "\nNote that in a dictate activity like this one, you are requested to write the exact sentence that you hear."
        : baseMessage;
    $.ajax({
        type: "POST",
        url: "UpdateLMInfo.aspx",
        data: istr,
        async: true,
        success: function (data) {
            JSMessagePopup(false, GetInUILang(UILang, "Thank you!"), GetInUILang(UILang, message));
        },
        error: function (xhr, status, error) {
            JSSendLogToS3("saveMyAnswerWasCorrect failed. error: " + error);
            JSHandleAjaxError(xhr, status, error);
        }
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// JSIsCorrectAnswer
////////////////////////////////////////////////////////////////////////////////////////////////////
function JSIsCorrectAnswer(correct_type) {
    if (correct_type == "EqualToTS")
        return true;
    if (correct_type == "NotEqToTSButCorrectNoMessage")
        return true;
    if (correct_type == "NotEqToTSButCorrect")
        return true;
    return false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// JSDisplaySecondChance
// Change the Exercise page, to give a second chance to answer the exercise:
// 1. Shows a red line at the beginning of the page, with the 2nd chance message.
// 2. Change the answer area in order to highlight the error, and give additional hints.
////////////////////////////////////////////////////////////////////////////////////////////////////
function JSDisplaySecondChance(jv_object, isNumInDigitErr) {
    if ((JSCurTU.TUtype == "Dictate" && jv_object.isDialogueTSS != "True" || JSCurTU.TUtype == "CQ")) { // show speaker
        $('#speaker_in_exercise').show();
        $('#slow_speaker_in_exercise').show();
    }
    $('#answer_area').children().not("#tss_context").remove();
    if (isSecondChance == "LettersHints") {
        second_chance_msg = GetInUILang(UILang, "﻿﻿Please try again. Now you have a hint. Use one word for each blank.");
        $('#second_chance_msg').text(GetInUILang(UILang, "﻿﻿Please try again. Now you have a hint. Use one word for each blank."));
        $('#second-chance-toast').text(GetInUILang(UILang, "﻿﻿Please try again. Now you have a hint. Use one word for each blank."));

        if (!hintButtonPressed) {
            if ($('#root').width() > 768) {
                $('#second_chance_msg').show();
            } else {
                $('#second-chance-toast')
                    .css({ top: -58, display: 'flex' })
                    .animate({ top: '.5rem' }, { duration: 800, easing: 'easeOutCubic' })
                    .delay(5000)
                    .animate({ top: -58, display: 'none' }, { duration: 800, easing: 'easeInCubic' });
            }
        }

        isDialogue = false;
        if (jv_object.isDialogueTSS == "True") {
            isDialogue = true;
            $('#second_chance_msg').hide();
            JSDisableNextButton();
            $('#second_chance_msg_dialog').text(GetInUILang(UILang, "﻿﻿Please try again. Now you have a hint. Use one word for each blank."));
            if ($('#root').width() > 768) {
                $('#second_chance_msg_dialog').show();
            } else {
                $('#second-chance-toast')
                    .css({ top: -58, display: 'flex' })
                    .animate({ top: '.5rem' }, { duration: 800, easing: 'easeOutCubic' })
                    .delay(5000)
                    .animate({ top: -58, display: 'none' }, { duration: 800, easing: 'easeInCubic' });
            }

        }

        // display the partial answer with additional hints.
        if (isTextTU) {
            JSDisplayPartialAnswers(jv_object.new_partial_answer.length, jv_object.new_partial_answer, isDialogue);
        }
        else if (jv_object.isDialogueTSS == "True" && currentTSS.length > 0) {
            const answers = [...currentTSS, jv_object.new_partial_answer];
            const answersLength = answers.length;
            JSDisplayPartialAnswers(answersLength, answers, isDialogue);
            clearCurrentTSS();
        } else {
            JSDisplayPartialAnswer(jv_object.new_partial_answer, isDialogue);
        }

        $("[class$='left_ts'], [class$='right_ts']:hidden").show();

        $('.p_answer_tbx_cl').first().focus();
    }
    else { // SpellingSecondChance
        if (isNumInDigitErr)
            second_chance_msg = GetInUILang(UILang, 'Please write the number in words.');
        else
            second_chance_msg = GetInUILang(UILang, 'Please check your spelling ...');
        var str = "";
        // mark the answer the user gave, like after AA, to show him where the spelling error is
        if (isTextTU) {
            for (i = 0; i < jv_object.LA.length; i++) {
                JSReplaceDollarNameBySign(jv_object.LA[i]);

                if (JSCurTU.TUtype == "GrammarSB") {
                    str += '<span class="line-break">';
                    str += JSCreateMarkedAnswerStr(jv_object.LA[i], true);
                    str += '</span>';
                } else {
                    str += JSCreateMarkedAnswerStr(jv_object.LA[i], true);
                }

                if (i < jv_object.LA.length - 1)
                    str += "<span class=\"text_tu_sep_cl\">&nbsp</span>";
            }
        }
        else {
            JSReplaceDollarNameBySign(jv_object.LA);
            str += JSCreateMarkedAnswerStr(jv_object.LA, true);
        }
        AddToDOM(str, "APPEND", '#answer_area');
        if ($('#root').width() > 768) {
            $('.second_chance_msg').show();
        } else {
            $('#second-chance-toast').text(second_chance_msg);
            $('.second_chance_msg').hide();
            $('#second-chance-toast')
                .css({ top: -58, display: 'flex' })
                .animate({ top: '.5rem' }, { duration: 800, easing: 'easeOutCubic' })
                .delay(5000)
                .animate({ top: -58, display: 'none' }, { duration: 800, easing: 'easeInCubic' });
        }

        $('.p_answer_tbx_second_chance').fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(1000);
        $('.p_answer_tbx_second_chance').first().focus();
        // since here the the text-box is already with content, we should verify that the focus is after the text
        var val = $('.p_answer_tbx_second_chance').first().val();

        // If isNumInDigitErr change the size of the txb to be the size of the number in words
        if (isNumInDigitErr) {
            var numInWords = Number(val).numberToWords();
            $('.p_answer_tbx_second_chance').attr('size', numInWords.length);
        }

        if (val != '') {
            $('.p_answer_tbx_second_chance').first().val('');
            $('.p_answer_tbx_second_chance').first().val(val);
        }
    }

    JSTUDisaplyChanges(jv_object);

    JSSetContentHeight();
    JSEnableNextButton();
}

function JSReplaceDollarNameBySign(text) {
    return text.replace(/DOLLAR_SIGN/g, "$");
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// JSSetRecordsGender
//////////////////////////////////////////////////////////////////////////////////////////////////////
function JSSetRecordsGender(jv_object) {
    if (jv_object.RecorderGender1 != undefined && jv_object.RecorderGender2 != undefined) {
        recorderGender1 = jv_object.RecorderGender1;
        recorderGender2 = jv_object.RecorderGender2;
    }
    else {
        recorderGender1 = "M";
        recorderGender2 = "F";
    }

    setTimeout(function () {
        if (window.screen.width < 570 && isDialogue)
            JSHideExerciseHeader()
    }, 5000);


}

///////////////////////////////////////////////////////////////////////////////
//JSgetAbsolutePosition(element)
//return the absolute position (top left) of an element
///////////////////////////////////////////////////////////////////////////////
function JSgetAbsolutePosition(el) {
    // yay readability
    var lx = 0, ly = 0;
    for (var lx = 0, ly = 0;
        el != null;
        lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return { x: lx, y: ly };
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayNewClosurePage
//prepare and display the new closure page including animation. when ends- move to JSAfterClosurePage()
//////////////////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayNewClosurePage(oldLessonKP, newLessonKP) {

    $('#cl_lesson_kp_number').text(oldLessonKP);

    $('#cl_msg_div').css({ opacity: "0.0" }); //hide message
    isMsgAdded = false;
    $('#closure_wrapper').show();

    $('#cl_well_done_div').show();
    $('.well_done_KU_lbl').css({ opacity: "1.0" });

    JSEnableClosureContinueButton();
    $('#exercise_closure').show();
    $('#cl_continue_button').focus();
    window.scrollTo(0, 0);
    JSAnimateClosure(oldLessonKP, newLessonKP);

}

////////////////////////////////////////////////////////
//JSGetMidAbsolutebyId(id)
//return an object {x: , y: } with the absolute middle point of an elemnt id
////////////////////////////////////////////////////////
function JSGetMidAbsolutebyId(id) {


    var targetElement = document.getElementById(id);
    var targetTopLeft = JSgetAbsolutePosition(targetElement);
    var midTargetHeight = $('#' + id).height() / 2;
    var midTargetWidth = $('#' + id).width() / 2;
    var targetPoint = {
        x: targetTopLeft.x + midTargetWidth,
        y: targetTopLeft.y + midTargetHeight
    }

    return targetPoint;
}




///////////////////////////////////////////////////////////////////////
//JSAnimateClosure
// the animation of the closure page. 
//works with anime.js library and use timeline to add elements in the timeline. 
//each well done line is trigered to move to the middle of the brain
//every interval includes: move the elemnt, glow in, glow out, play sound.
// in order to understand the animation and the timeline params see
//https://animejs.com/documentation/
///////////////////////////////////////////////////////////////////////
function JSAnimateClosure(oldLessonKP, newLessonKP) {


    var targetPoint = JSGetMidAbsolutebyId('cl_brain_img');
    var coinAudio = document.getElementById('coin_audio');

    const kpPoints = document.getElementById("cl_lesson_kp_number");



    animateValue(kpPoints, oldLessonKP, newLessonKP, 350 * correctKUinTU); //set the running number on the side



    closureAnimationTimeLine = anime.timeline({});  //reset the time line for this specific animation

    for (var index = 0; index < correctKUinTU; index++) { // add an anmation for each welldone line 


        var lineStr = 'cl_well_done_line_' + index;
        var lineObj = document.getElementById(lineStr);
        var linePosition = JSgetAbsolutePosition(lineObj);
        var xDelta = targetPoint.x - linePosition.x;
        var yDelta = targetPoint.y - linePosition.y;

        var itemOffcet = index == 0 ? '0' : '-=650'; //set the offcet between 2 loops



        closureAnimationTimeLine.add({ // move line animation
            targets: '#' + lineStr,
            translateX: xDelta,
            translateY: yDelta,
            easing: 'easeInQuart',
            duration: 800,
            opacity: {
                value: 0.0001,
                delay: 600,
                duration: 200

            },


        }, itemOffcet)

            .add({
                targets: '#cl_brain_glow_img', //glow in animation
                duration: 1,
                complete: function (anim) {
                    coinAudio.play();
                }
            }, '-=70')

            .add({ //alow out animation
                targets: '#cl_brain_glow_img',
                opacity: [0, 1],
                duration: 100,
            }, '-=50')
            .add({
                targets: '#cl_brain_glow_img',
                opacity: [1, 0],
                duration: 50,
            }, '+=100');




        if (!isMsgAdded && ((index / correctKUinTU) >= 0.45)) { //show message after time, duration and offcet solud be together 0 so no effect 

            closureAnimationTimeLine.add({
                targets: '#cl_msg_div',
                opacity: [0, 1],
                duration: 500,
            }, '-=500');
            isMsgAdded = true;

        }

        if (index == correctKUinTU - 1) { //show msg if didn't shown yet, move to after closure page 
            var opcityfrom = isMsgAdded ? 1 : 0;
            var offcet = isMsgAdded ? 0 : 1000;
            closureAnimationTimeLine.add({
                targets: '#cl_msg_div',
                opacity: [opcityfrom, 1],
                duration: 300,
                complete: function (anim) {
                    if (isQaLoadMode) {
                        setTimeout(function () { JSAfterClosurePage(" end of animation for qaload"); }, offcet);
                    }
                }
            }, '+=100');

        }


    }

}


///////////////////////////////////////////////
//animateValue 
//external fuction that make the nombers run from start to end in the object within "duration" time
///////////////////////////////////////////////
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// JSSetClosurePageColor
// The bg color of the closure page depends on the correct-type.
//////////////////////////////////////////////////////////////////////////////////////////////////////
function JSSetClosurePageColor() {
    var color = "transparent";
    if (JSCurTU.TUtype == "Speak") {
        color = "rgba(230, 0, 126, 1)";
    }
    $('#exercise_closure').css("background-color", color);
}

function JSShowConfetti() {
    $('#confetti_top').show();
    $('#confetti_bottom').show();
}

function JSHideConfetti() {
    $('#confetti_top').hide();
    $('#confetti_bottom').hide();
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// JSShowClosurePage
//////////////////////////////////////////////////////////////////////////////////////////////////////
function JSShowSpeakClosurePage() {
    //  $('#cl_well_done_div').empty();  //in case speakTU, well done div is not empty
    $('#exercise_closure_TS_label').text(GetInUILang(UILang, "Expected answer"));
    $('#exercise_closure_TS_text').text(JSCurTU.TS);
    $('#exercise_closure_msg').show();


    $('#cl_msg_div').css({ opacity: "0.0" });
    $('#closure_wrapper').hide();
    $('#cl_well_done_div').hide();

    $('#exercise_closure').show();
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSHighlightAudioIcon
// Called with:
// 1. highlight=true when the user pressed the audio icon, in order to highlight the the audio-icon
//    when the audio is playing
// 2. highlight=false when the audio finished playing in order to return to normal display
////////////////////////////////////////////////////////////////////////////////////////
function JSHighlightAudioIcon(highlight) {
    if (highlight) {
        // in reapet lku add a smaller speaker icon
        if (JSCurTU.TUtype == "RepeatLKU")
            $("#speaker_in_exercise").attr("src", `${s3ExerciseImages}/speaker-in-repeat-exercise-Active-pink.svg`);
        else if (JSCurTU.TUtype == "Speak")
            $("#listen_to_correct_record_icon").attr("src", `${s3ExerciseImages}/hear_pronounciation_pressed.png`);
        else if (JSCurTU.TUtype == "DialogDictate" || JSCurTU.TUtype == "DialogSpeak")
            $("#speaker_in_exercise").css("background-image", `url(${s3ExerciseImages}/audio_pause.svg)`);
        else
            $("#speaker_in_exercise").attr("src", `${s3ExerciseImages}/speaker-in-exercise-Active-pink.svg`);
    }
    else {
        // in reapet lku add a smaller speaker icon
        if (JSCurTU.TUtype == "RepeatLKU")
            $("#speaker_in_exercise").attr("src", `${s3ExerciseImages}/speaker-in-repeat-exercise.svg`);
        else if (JSCurTU.TUtype == "Speak")
            $('#listen_to_correct_record_icon').attr('src', `${s3ExerciseImages}/hear_pronounciation.svg`);
        else if (JSCurTU.TUtype == "DialogDictate" || JSCurTU.TUtype == "DialogSpeak")
            $("#speaker_in_exercise").css("background-image", `url(${s3ExerciseImages}/speaker-in-exercise_dark.svg)`);
        else
            $('#speaker_in_exercise').attr('src', `${s3ExerciseImages}/speaker-in-exercise.svg`);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSHighlightAudioIconTSIndex
// Highlight a specific audio icon based on TSIndex
// Called with:
// 1. highlight=true when the user pressed the audio icon, in order to highlight the the audio-icon
//    when the audio is playing
// 2. highlight=false when the audio finished playing in order to return to normal display
////////////////////////////////////////////////////////////////////////////////////////
function JSHighlightAudioIconTSIndex(TSindex, highlight) {
    if (highlight) {
        $("#TS" + TSindex + "-avatar").hide();
        $("#TS" + TSindex + "-avatar-playing").show();
        $("#TS" + TSindex + "-audio-normal").attr("src", `${s3ExerciseImages}/speaker-in-exercise-Active-pink.svg`);
    }
    else {
        $("#TS" + TSindex + "-avatar").show();
        $("#TS" + TSindex + "-avatar-playing").hide();

        if (!$("#TS" + TSindex + "-audio-normal").hasClass('right'))
            $("#TS" + TSindex + "-audio-normal").attr('src', `${s3ExerciseImages}/speaker-in-exercise_dark.svg`);
        else
            $("#TS" + TSindex + "-audio-normal").attr('src', `${s3ExerciseImages}/speaker-in-exercise.svg`);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// JSHighlightSlowAudioIcon
// Called with:
// 1. highlight=true when the user pressed the slow audio icon, in order to highlight the the audio-icon
//    when the audio is playing
// 2. highlight=false when the slow audio finished playing in order to return to normal display
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function JSHighlightSlowAudioIcon(highlight) {
    if (highlight) {
        if (JSCurTU.TUtype == "DialogDictate" || JSCurTU.TUtype == "DialogSpeak") {
            $("#slow_speaker_in_exercise").css("background-image", `url(${s3ExerciseImages}/audio_pause.svg)`);
        } else {
            $("#slow_speaker_in_exercise").attr("src", `${s3ExerciseImages}/slow_speaker_in_exercise_active.svg`);
            $("#slow_speaker_in_exercise img").attr("src", `${s3ExerciseImages}/slow_speaker_in_exercise_active.svg`);
        }


    } else {
        if (JSCurTU.TUtype == "DialogDictate" || JSCurTU.TUtype == "DialogSpeak") {
            $("#slow_speaker_in_exercise").css("background-image", `url(${s3ExerciseImages}/slow_speaker_in_exercise_dark.svg)`);
        } else {
            $("#slow_speaker_in_exercise").attr("src", `${s3ExerciseImages}/slow_speaker_in_exercise.svg`);
            $("#slow_speaker_in_exercise img").attr("src", `${s3ExerciseImages}/slow_speaker_in_exercise_dark.svg`);
        }

    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSHighlightSlowAudioIconTSIndex
// Highlight a specific audio icon based on TSIndex
// Called with:
// 1. highlight=true when the user pressed the audio icon, in order to highlight the the audio-icon
//    when the audio is playing
// 2. highlight=false when the audio finished playing in order to return to normal display
////////////////////////////////////////////////////////////////////////////////////////
function JSHighlightSlowAudioIconTSIndex(TSindex, highlight) {
    if (highlight) {
        $("#TS" + TSindex + "-avatar").hide();
        $("#TS" + TSindex + "-avatar-playing").show();
        $("#TS" + TSindex + "-audio-slow").attr("src", `${s3ExerciseImages}/slow_speaker_in_exercise_active.svg`);
    }
    else {
        $("#TS" + TSindex + "-avatar").show();
        $("#TS" + TSindex + "-avatar-playing").hide();

        if (!$("#TS" + TSindex + "-audio-slow").hasClass('right'))
            $("#TS" + TSindex + "-audio-slow").attr('src', `${s3ExerciseImages}/slow_speaker_in_exercise_dark.svg`);
        else
            $("#TS" + TSindex + "-audio-slow").attr('src', `${s3ExerciseImages}/slow_speaker_in_exercise.svg`);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// JSPauseAudio
// Pause all audios 
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function JSPauseAllAudio(fromSlowAudioBtn = false) {
    var sounds = [];

    if (document.getElementById('text_audio') && !currentAudio && !currentAudio.audioElement)
        sounds = document.getElementById('text_audio').getElementsByTagName('audio');

    if (sounds.length > 0) {
        for (i = 0; i < sounds.length; i++) {
            if (sounds[i].duration > 0 && !sounds[i].paused) {
                lastTSAudio = i;
                //Its playing...do your job

                sounds[i].pause();
                JSHighlightAudioIcon(false);
                JSHighlightAudioIconTSIndex(lastTSAudio, false);
                JSHighlightSlowAudioIcon(false);
                JSHighlightSlowAudioIconTSIndex(lastTSAudio, false);

                $('#speaker_in_exercise').unbind().click(function () {
                    JSTextAudioPlayOneTS(lastTSAudio, true, false, false);
                    JSHighlightAudioIcon(true);
                    JSHighlightAudioIconTSIndex(lastTSAudio, true);
                    $('#speaker_in_exercise').unbind().click(function () {
                        JSPauseAllAudio(false);
                    });
                });

                $('#slow_speaker_in_exercise').unbind().click(function () {
                    JSTextAudioPlayOneTS(lastTSAudio, true, false, true);
                    JSHighlightSlowAudioIcon(true);
                    JSHighlightSlowAudioIconTSIndex(lastTSAudio, true);
                    $('#slow_speaker_in_exercise').unbind().click(function () {
                        JSPauseAllAudio(true);
                    });
                });
            } else {

                //Not playing...maybe paused, stopped or never played.

            }
        }
    } else {
        currentAudio.audioElement.pause();
    }
}



/////////////////////////////////////////////////////////////////////////////////////////
// JSWatchQuestionBtnPressed
// Called when the user pressed the "watch question" button.
////////////////////////////////////////////////////////////////////////////////////////
function JSWatchQuestionBtnPressed() {
    var tss = $('#tss_context').html();
    var exWithTSS = (tss != "") && (tss != "<br />");
    if (exWithTSS) {
        $('#question_tss_context').html(tss);
        $('#question_tss_context').show();
    }
    else
        $('#question_tss_context').hide();
    $('#question_instruction').html($('#instruction').html());
    var cue = $('#cue').html();
    var exWithCue = (cue != "") && (cue != "<br />");
    if (exWithCue) {
        $('#question_cue').html(cue);
        var cueDir = $('#cue').attr('dir');
        $('#question_cue').attr('dir', cueDir);
        $('#question_cue').show();
    }
    else
        $('#question_cue').hide();
    if (JSCurTU.TUtype != "CQ") {
        if (JSCurTU.TUtype == "FITB") {
            $('#question_your_answer').html($('#MC_options_div').html());
            $('#question_your_answer .mc_highlight').removeClass('mc_highlight');
        }
        else if (JSCurTU.TUtype == "SORT") {
            $('#question_your_answer').html($('#machsan_milim_div').html());
            $('#response_parts .p_answer_tbx_cl').each(function () {
                if ($(this).val() != "") {
                    var str = "";
                    if ($('#question_your_answer .sort_active_lbl').size() > 0)
                        str += "<span class=\"span_cl\">  </span>";
                    str += "<label class=\"sort_active_lbl\">";
                    str += $(this).val() + "</label>";
                    AddToDOM(str, "APPEND", '#question_your_answer');
                }
            });
        }
        else {
            $('#question_your_answer').html($('#answer_area').html());
            $('#question_your_answer .p_answer_tbx_wrong').each(function () {
                $(this).attr('class', 'p_answer_tbx_cl');
                $(this).val('');
            });
        }
    }
    if (JSCurTU.mustHaveImage == "True") {
        $('#question_image_div').html($('#ex_image_div').html());
        $('#question_image_div').show();
    }
    else
        $('#question_image_div').hide();
    $('#exercise_feedback').fadeTo('fast', 0.3);
    $('#watch_question_div').css({
        top: $('#exercise_feedback').offset().top,
        left: $('#exercise_feedback').offset().left
    });
    $('#watch_question_div').show();
    JSDisableNextButton();
    $('#watch_question_ok').focus();
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSWatchQuestionOKBtnPressed
// Called when the user pressed the OK button in the "watch question" window.
////////////////////////////////////////////////////////////////////////////////////////
function JSWatchQuestionOKBtnPressed() {
    $('#watch_question_div').hide();
    $('#exercise_feedback').fadeTo('fast', 1.0);
    JSEnableNextButton();
}

// In cases where we fill also the answer (QA-load mode or debug mode), 
// we wait for the audio to finish, and then fill-in the answer.
function JSWaitForAudio(jv_object, pressNext) {
    if (timeAudioShouldStarPlay == -1) { // audio has finished or not started
        JSAutomaticTUAnswer(jv_object, pressNext);
        window.clearInterval(waitForTUAudioIntervalId);
        waitForTUAudioIntervalId = -1;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSAutomaticTUAnswer
// In qa-load mode, fills in the answer, then wait a little, and press the next-button.
// If the qaload user is also in LoadTest UG, the time to change press check button is 40000
////////////////////////////////////////////////////////////////////////////////////////
function JSAutomaticTUAnswer(jv_object, pressNext) {
    //set the default wait for qaload users and loadTest for 5 seconds
    const QA_LOAD_WAIT_TIME = 5000;
    let waitTime = QA_LOAD_WAIT_TIME;

    // if loadTestWaitTime is present in the web.config, this value will 
    // replace the default value.
    if (typeof (loadTestWaitTime) != 'undefined' && !isNaN(loadTestWaitTime)) {
        waitTime = loadTestWaitTime;
    }

    //alert(jv_object.TU_answer);
    var ansLength = 1;

    if ((jv_object.task_type == "Speak" || jv_object.task_type == "DialogSpeak" || jv_object.task_type == "TextSpeak") && pressNext) {
        setTimeout(function () { JSSpeakCheckBtnPressed(); }, waitTime);
        return;
    }

    var answerType = JSGetAnswerTypeByTUType(jv_object);

    ansLength = JSFillTUAnswer(answerType, jv_object.TU_answer);

    // wait a little before pressing the "Check" button.
    // we wait 5000 for qaload user and 40000 to LoadTestUsers 
    if (pressNext)
        setTimeout(function () { JSCheckBtnPressed(); }, waitTime);
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSAutomaticTUAnswer
// In qa-load mode, automaticaly click Continue button in feedback page.
////////////////////////////////////////////////////////////////////////////////////////
function JSAutomaticContinueFeedback(jv_object, pressNext) {
    //set the default wait for qaload users and loadTest for 5 seconds
    const QA_LOAD_WAIT_TIME = 5000;
    let waitTime = QA_LOAD_WAIT_TIME;

    // if loadTestWaitTime is present in the web.config, this value will 
    // replace the default value.
    if (typeof (loadTestWaitTime) != 'undefined' && !isNaN(loadTestWaitTime)) {
        waitTime = loadTestWaitTime;
    }


    setTimeout(function () { JSContinueBtnPressed(); }, waitTime);
}

/////////////////////////////////////////////////////////////////////////////////////////////
//JSFillTUAnswer
//gets the answertype and the TU's answer to fill and fill in #response_tbx 
//return the awswer length
///////////////////////////////////////////////////////////////////////////////////////////// 

function JSFillTUAnswer(answerType, TU_answer) {
    var ansLength = 1;
    if (answerType == "FullAnswer") {
        $('#response_tbx').val(TU_answer);
        ansLength = TU_answer.length;
    }
    else if (answerType == "PartialAnswer") {
        var LAwords = TU_answer.split("&");
        for (i = 0; i < LAwords.length; i++) {
            var word = $('#response_' + i + '_tbx').val() + LAwords[i];
            $('#response_' + i + '_tbx').val(word);
        }
        ansLength = TU_answer.length;
    }
    else if (answerType == "MultiplePartialAnswers") {
        var LAwords = TU_answer.split("&");
        var i = 0;
        $('.p_answer_tbx_cl').each(function () {
            var word = $(this).val() + LAwords[i];
            $(this).val(word);
            i++;
        });
        ansLength = TU_answer.length;

    }
    return ansLength;
}



/////////////////////////////////////////////////////////////////////////////////////////
// JSCleanExtraBlanks
// clean all blanks after the last word
/////////////////////////////////////////////////////////////////////////////////////////
function JSCleanExtraBlanks(str) {
    // clean blanks after blanks
    var index = 0;
    while (index != -1) {
        index = str.lastIndexOf(" ");
        if (index == str.length - 1)
            str = str.substr(0, index);
        else
            index = -1;
    }
    return str.replace(/\s\s+/g, ' ');;
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSGetCommentFormParentElement
// returns the DOM element in which the comment-form should be added.
// the comment-form is the form the user can fill when he wants to send us his comments.
/////////////////////////////////////////////////////////////////////////////////////////
function JSGetCommentFormParentElement() {
    if ($('#product_video_popup').is(":visible")) return '#product_video_popup';
    else if (curExercisePart == EXERCISE_PARTS.EXERCISE) return '#exercise';
    else if (curExercisePart == EXERCISE_PARTS.FEEDBACK) return '#exercise_feedback';
    else return '';
}

function JSChangeNextButtonToContinue() {
    $('#next_button, #long_next_button').text(GetInUILang(UILang, "Continue"));
    //$('#next_button').attr('title', 'Press to continue');
    //$('#next_button, #long_next_button').removeClass().addClass('continue_button');
    $('#next_button, #long_next_button').off('click');
    $('#next_button, #long_next_button').click(function () {
        if (!isQaLoadMode) {
            const windowWidth = window.innerWidth;
            const isWorthReadingVisible = !$("#well_done_div").is(":hidden");
            if (windowWidth >= 580 && !skipAnimation && isWorthReadingVisible) {
                JSFeedbackAnimation();
                setTimeout(function () {
                    if (!$("#exercise_feedback").is(":hidden")) {
                        if (skipAnimation) {
                            JSContinueBtnPressed()
                        }
                    }
                }, 2000);
                return;
            }
        }
        skipAnimation = false
        JSContinueBtnPressed()
    });
}

function JSChangeNextButtonToCheck() {
    $('#next_button, #long_next_button').text('Check');
    if (JSisAssessmentAccount && (JSLessonType == LessonType.Assessment || JSLessonType == LessonType.AssessmentPractice)) {
        $('#next_button, #long_next_button').text('Next');
    }

    //$('#next_button').attr('title', 'Press to check exercise');
    //$('#next_button, #long_next_button').removeClass().addClass('check_button');
    $('#next_button, #long_next_button').off('click');
    $('#next_button, #long_next_button').click(function () {
        if (JSCurTU.TUtype != 'Speak' && JSCurTU.TUtype != 'TextSpeak' && JSCurTU.TUtype != 'DialogSpeak')
            JSCheckBtnPressed();
        else
            JSSpeakCheckBtnPressed();
    });
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSIsContraction
// Check if word is contraction case
/////////////////////////////////////////////////////////////////////////////////////////
function JSIsContraction(word) {
    var contraction = false;
    var partword = word.replace("'s", "");
    partword = partword.toLowerCase();
    switch (partword) {
        case "he":
        case "she":
        case "it":
        case "let":
        case "there":
        case "what":
        case "that":
        case "who":
        case "name":
        case "here":
        case "where":
            contraction = true;
    }
    return contraction;
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSIsNextButtonAllowed
// If the comments form is open, then we ask the user to close it before we go on.
/////////////////////////////////////////////////////////////////////////////////////////
function JSIsNextButtonAllowed() {
    var isDisable = $('#next_button, #long_next_button').is('[disabled=disabled]');
    return !isDisable;
    //MessagePopup(true, GetInUILang(UILang, "Alert!"), "Please close the comment window before going on.");
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSAdjustExerciseToScreenHeight
// Applied when displaying the exercise: if the document is short and the exercise includes an image,
// then we shrink the vertical margins and padding to avoid scrolling as much as possible.
/////////////////////////////////////////////////////////////////////////////////////////
function JSAdjustExerciseToScreenHeight() {
    if (isTooShortScreen) {
        $('#exercise_with_margins').css("padding-top", "20px");
        $('.p_grammar_sort_answer_tbx').css("padding-top", "10px");
        $('.p_grammar_sort_answer_tbx').css("padding-bottom", "10px");
        $('.imgAuthor').css("margin-top", "2px");
        $('#MC_options_div').css("margin-top", "5px");
        if (JSIsHearingTUType()) // to make the speaker_in_exercise be alone in the row
        {
            if (JSCurTU.TUtype == "RepeatLKU")
                $('#cue').css("margin-top", "12.5px"); // to make the speaker in the same line of the tu text
            else
                $('#cue').css("margin-top", "20px");
        }
        else if (JSCurTU.TUtype == "SMA")
            $('#cue').css("margin-top", "10px");
        else
            $('#cue').css("margin-top", "5px");
    }
    else {
        if (curExercisePart != EXERCISE_PARTS.FEEDBACK) {
            $('#exercise_with_margins').css("padding-top", "30px");
        }
        $('.p_grammar_sort_answer_tbx').css("padding-top", "10px");
        $('.p_grammar_sort_answer_tbx').css("padding-bottom", "10px");
        $('.imgAuthor').css("margin-top", "10px");
        $('#MC_options_div').css("margin-top", "10px");
        $('#cue').css("margin-top", "20px");
    }
    $("#machsan_milim_div").css({ "padding-top": "10px", "padding-bottom": "10px", "min-height": "70px", "width": "100%" });
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSSetContentHeight
// Applied when the page is loaded or resized: sets the height of main (body)
// to be the size of the window minus the sizes of the header and the footer.
// If we do not set the size of exercise_with_margins then it won't have scrollbar when 
// needed.
// If the there is a TU img displayed and its legend's bottom coordinate is lower than the document height, 
// hide footer to try to avoid or at least minimize scrolling
// *** We assume that if there is no img, probably there will be no scrolling
/////////////////////////////////////////////////////////////////////////////////////////
function JSSetContentHeight() {
    var decorationSpace = 40;
    var nextBtnObj = document.getElementById('next_button'); // in case long_next_button is enabled- this line had to change to include #next_button and #long_next_button
    var nextBtnPosition = JSgetAbsolutePosition(nextBtnObj);
    var contentHeight = nextBtnPosition - $('#magnilearn_header').height() + decorationSpace;

    if ($('.imgAuthor').is(":visible")) {
        var imgBottom = 0;
        //var imgAuthorObj = document.getElementById('imgAuthor');
        var imgAuthors = document.getElementsByClassName("imgAuthor");
        var imgAuthorObj = imgAuthors[imgAuthors.length - 1];

        imgBottom = JSgetAbsolutePosition(imgAuthorObj);
        contentHeight = imgBottom + decorationSpace;
    }

    /*    if (curExercisePart == EXERCISE_PARTS.FEEDBACK) {
            var endoffeedback = document.getElementById('feedback_footer_div');
            var position = JSgetAbsolutePosition(endoffeedback);
            contentHeight = position.y + decorationSpace;
        }*/

    $('#main').height(contentHeight);
    //JSSetOverFlow();
    window.scrollTo(0, 0);
}

function JSUpdateKPInFooter(lessonKPnum) {
    lessonKP = lessonKP + parseFloat(lessonKPnum);
    $('#lesson_kp_number').text(lessonKP);
}

function JSIsRtlLanguage(lang) {
    return (lang == "H" || lang == "A");
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSAfterClosurePage
// After closure page: if it's time for the progress animation, do it.
// Otherwise, get next TU.
/////////////////////////////////////////////////////////////////////////////////////////
function JSAfterClosurePage(caller) {
    if (JSCurTU.newAward != "" && !isQaLoadMode && !JSisUsertup && !JSisClilTrial && !isQuizTime && !JSisAssessmentAccount)
        JSDisplayAwardPopUp(JSCurTU.newAward);
    else
        JSGetNextTU(null, caller);
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplayAwardPopUp
// displays the award pop up.
//  Display pop up in exercise - In case that the user won the award during a quiz
/////////////////////////////////////////////////////////////////////////////////////////
function JSDisplayAwardPopUp(awardName) {
    // Display pop up in closure
    if (curExercisePart == EXERCISE_PARTS.CLOSURE) {
        $('#exercise_closure').children().not(":hidden").fadeTo('fast', 0.1);
    }

    // Display pop up in exercise - In case that the user won the award during a quiz
    if (curExercisePart == EXERCISE_PARTS.EXERCISE) {
        $('#exercise').children().not(":hidden").fadeTo('fast', 0.1);
    }
    if (typeof confetti !== 'undefined')
        confetti.start();
    var applause = document.getElementById('applause');
    applause.loop = true;
    var audioPromise = applause.play();// play tone
    JSHandleAudioPromise(audioPromise, applause.currentSrc);
    $(".award_wrraper_div").fadeTo('slow', 1);
}


/////////////////////////////////////////////////////////////////////////////////////////
// JSShouldShowProgressAnimation
//////////////////////////////////////////////////////////////////////////////////////////
/*function JSShouldShowProgressAnimation(timeSinceLastKUreport) {
    // return the code below when we start working with longer lessons. 
    // then take care not to show this middle-lesson report when it is too close to end of lesson.
    if (timeSinceLastKUreport < JS_TIME_BETWEEN_PROGRESS_REPORT)
        return false;
    if (isQaLoadMode)
        return false;
    return JSHasRecentExposedKUs(false);

}*/


function JSRemoveAudio() {
    $('.sentence_audio').remove();
    $('#text_audio').remove();
    currentAudio = {
        playRate: 1
    };
    if (curExercisePart == EXERCISE_PARTS.FEEDBACK)
        $('#speaker_in_feedback').hide();
}

// We get here if the TU was displayed, but the image is not loaded yet.
// *** We don't expect it to happen on regular use.
// In this case we don't display the image, and report it to the log.
// if it's image TU, we do F5
function JSImageNotLoaded(TUmustHaveImage) {
    var problem = "Image not loaded: " + img.src;
    problem += " TUindex=" + JSCurTU.TUindex;
    problem += " img.src = " + img.src;
    if (TUmustHaveImage == "True")
        problem += "  TU that must have image: reload page F5";
    JSSaveProblemForDebug(problem, true);
    if (TUmustHaveImage == "True") {
        if (isTracingUser)
            JSSendLogToS3("reloaded after JSImageNotLoaded");
        location.reload(false);
    }
    else
        img = null;
}

/////////////////////////////////////////////////////////////////////////////////////
// JSDisplaySpeakerGuide
// Displays the speaker guide at the first time the user gets a dictate TU
/////////////////////////////////////////////////////////////////////////////////////
function JSDisplaySpeakerGuide(jv_object) {
    //JSPositionSpeakerGuide();
    // show the guide only at the first time the user gets a dictate TU
    if (jv_object.isFirstDictate == "true") {
        $("#exercise").children(':not(#speaker_in_exercise):not(#slow_speaker_in_exercise):not(#second_chance_msg):not(.quiz_popup):not(.test_popup)').fadeTo('fast', 0.3);
        $("#speaker_guide").show();

        // Hide sticker because its in the same position as the guide window
        if ($("#TU_icon").is(":visible"))
            $("#TU_icon").hide();
        isBindEnterInExercise = false; // to avoid focusing on he "next" btn.
        $('#speaker_guide_button').focus();
    }
}

/////////////////////////////////////////////////////////////////////////////////////
// JSSpeakerGuideBtnPressed
// close the speaker guide window
/////////////////////////////////////////////////////////////////////////////////////
function JSSpeakerGuideBtnPressed() {
    $("#speaker_guide").hide();
    $("#exercise").children(':not(#speaker_in_exercise):not(#slow_speaker_in_exercise):not(#second_chance_msg):not(.quiz_popup):not(.test_popup)').fadeTo('fast', 1);
    JSrefocusOnExercise();
}


/////////////////////////////////////////////////////////////////////////////////////
// JSDisplayCqGuide
// Displays the cq guide at the first time the user gets a CQ TU
/////////////////////////////////////////////////////////////////////////////////////
function JSDisplayCqGuide(jv_object) {
    if (jv_object.task_type != "CQ")
        return;

    JSPositionAnswerAreaGuide("#cq_guide");

    $("#exercise").children(':not(#instruction):not(#your_answer):not(#second_chance_msg):not(.quiz_popup):not(.test_popup)').fadeTo('fast', 0.3);
    $("#cq_guide").show();

    // Hide sticker because its in the same position as the guide window
    if ($("#TU_icon").is(":visible"))
        $("#TU_icon").hide();
    isBindEnterInExercise = false; // to avoid focusing on he "next" btn.
    $('#cq_guide_button').focus();
}


/////////////////////////////////////////////////////////////////////////////////////
// JSCqGuideBtnPressed
// close the cq guide window
/////////////////////////////////////////////////////////////////////////////////////
function JSCqGuideBtnPressed() {
    $("#cq_guide").hide();
    $("#exercise").children(':not(#instruction):not(#your_answer):not(#second_chance_msg):not(.quiz_popup):not(.test_popup)').fadeTo('fast', 1);
    JSrefocusOnExercise();
}

/////////////////////////////////////////////////////////////////////////////////////
// JSDisplayQuizPopUp
/////////////////////////////////////////////////////////////////////////////////////
function JSDisplayQuizPopUp() {
    isBindEnterInExercise = false;
    $("#exercise").attr("quizstart", true);
    $('#main').css('height', 'calc(100% - 52px - 148px)');
}

/////////////////////////////////////////////////////////////////////////////////////
// JSUpdateIsQuiz
// updates isQuizTime and displays the quiz popup if needed
/////////////////////////////////////////////////////////////////////////////////////
function JSUpdateIsQuiz(jv_object) {
    if (jv_object.isQuizTime == "True" || JSisQuizDemo) {
        if (isQuizTime == false)
            JSDisplayQuizPopUp();
        isQuizTime = true;
        $("#exercise").attr("quizmode", true); // activate quiz mode;
    }
    else if (isQuizTime && jv_object.isQuizTime != "True") {
        JSGetQuizScore();
    }
    else {
        isQuizTime = false;
    }

}

/////////////////////////////////////////////////////////////////////////////////////
// JSStartQuizBtnPressed
// close the quiz popup window
/////////////////////////////////////////////////////////////////////////////////////
function JSStartQuizBtnPressed() {
    JSrefocusOnExercise();

    //  start quiz 
    $("#exercise").removeAttr("quizstart");
    $("#exercise").attr("quizMode", true);

}

/////////////////////////////////////////////////////////////////////////////////////
// JSDisplayEndQuizPopUp
// Displays end quiz pop up
/////////////////////////////////////////////////////////////////////////////////////
function JSDisplayEndQuizPopUp(num_of_quiz_TUs, num_of_correct_ans) {

    //end quiz
    $("#exercise").attr("quizend", true);

    $('#exercise-monitor, #grammar-pre-info').animate(
        { bottom: '0%' },
        1000,
        function () {
            //clear exercise and feedback scrool
            document.getElementById('exercise').scrollTop = 0;
            document.getElementById('exercise_feedback').scrollTop = 0;

            if (rollBackTime !== 0 && !JSisAssessmentAccount) {
                JSTimerRollBack(rollBackTime);
            }
        }
    );
    $('#user_feedback_toggle').animate(
        { opacity: '1' },
        1000,
        function () {
        }
    );

    if (num_of_correct_ans > 0) {
        var scoreStr = "You answered " + num_of_correct_ans + "/" + num_of_quiz_TUs + " questions correctly";
        var onlyCorrectStr = "You answered " + num_of_correct_ans + " questions correctly";

        // show "well done" and the score in scoreStr format only if the user answered correctly on
        // at least half of the quiz
        if (num_of_correct_ans > (num_of_quiz_TUs / 2)) {
            quizSummaryText = scoreStr;
        }
        else
            quizSummaryText = onlyCorrectStr;
    } else {
        $("#quiz-end-summary").hide();
    }
}

/////////////////////////////////////////////////////////////////////////////////////
// JSEndQuizBtnPressed
// if popup is in end_of_lesson go to endLesson pages after click
/////////////////////////////////////////////////////////////////////////////////////
function JSEndQuizBtnPressed() {
    JSrefocusOnExercise();

    $("#exercise").removeAttr("quizend");
    $("#exercise").removeAttr("quizmode");

    isQuizTime = false;

    if (JSIsEndOfLessonV2())
        JSEndOfLesson();
}


/////////////////////////////////////////////////////////////////////////////////////
// JSDisplayTranslateGuide
// Displays the translate guide at the first time the user gets a translate TU
/////////////////////////////////////////////////////////////////////////////////////
function JSDisplayTranslateGuide(jv_object) {

    // set translate_guide window relative to the answer_area
    JSPositionTranslateGuide();

    // show the guide only at the first time the user gets a translate TU
    if (jv_object.isFirstTranslate == "true") {
        $("#exercise").children(':not(#cue):not(#second_chance_msg):not(.quiz_popup):not(.test_popup):not(#speaker_in_exercise):not(#slow_speaker_in_exercise)').fadeTo('fast', 0.3);
        $("#translate_guide").show();

        // Hide sticker because its in the same position as the guide window
        if ($("#TU_icon").is(":visible"))
            $("#TU_icon").hide();
        isBindEnterInExercise = false; // to avoid focusing on he "next" btn.
        $('#translate_guide_button').focus();
    }
}

/////////////////////////////////////////////////////////////////////////////////////
// JSTranslateGuideBtnPressed
// close the translate guide window
/////////////////////////////////////////////////////////////////////////////////////
function JSTranslateGuideBtnPressed() {
    $("#translate_guide").hide();
    $("#exercise").children(':not(#cue):not(#second_chance_msg):not(.quiz_popup):not(.test_popup):not(#speaker_in_exercise):not(#slow_speaker_in_exercise)').fadeTo('fast', 1);
    JSrefocusOnExercise();
}


/////////////////////////////////////////////////////////////////////////////////////////
// JSGetQuizScore
// gets the quiz score and calls JSDisplayEndQuizPopUp
////////////////////////////////////////////////////////////////////////////////////////
function JSGetQuizScore() {

    var istr = "type=get_quiz_score";
    $.ajax({
        type: "POST",
        url: "UpdateLMInfo.aspx",
        data: istr,
        async: true,
        success: function (data) {
            if ((data == null) || (data.indexOf("Internal error:") != -1) || (data.indexOf("Operation failed:") != -1)) {
                JSDisplayEndQuizPopUp(0, 0);
                return;
            }
            /*
            if (data.indexOf("Your session has expired") != -1) {
                JSMessagePopup(true, GetInUILang(UILang, "Alert!"), data, function () {
                    window.location.assign("Login.aspx");
                });
            }
            */
            var jv_object = JSSecureJsonEval(data);
            if (jv_object == null) {
                JSSaveProblemForDebug("JSSecureJsonEval() returned null for get_quiz_score. jsonData = " + data, false);
                return;
            }
            var numOfQuizTUs = Number(jv_object.num_of_quiz_TUs);
            if (numOfQuizTUs > 0)
                JSDisplayEndQuizPopUp(numOfQuizTUs, Number(jv_object.num_of_correct_ans));
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////
// JSShowEndOfQAPopup
/////////////////////////////////////////////////////////////////////////////////////
function JSShowEndOfQAPopup() {
    $("#end_of_qa_popup").show();
}

/////////////////////////////////////////////////////////////////////////////////////
// JSQAPopupBtnPressed
// called when clicking the "Got it" button in the end of QA popup 
////////////////////////////////////////////////////////////////////////////////////
function JSQAPopupBtnPressed() {
    if (isTracingUser) {
        JSSendLogToS3("end of lesson in QA");
    }
    $("#end_of_qa_popup").hide();
    JSEndOfLesson();
}

/////////////////////////////////////////////////////////////////////////////////////
// JSDisplayStartTestPopUp
/////////////////////////////////////////////////////////////////////////////////////
function JSDisplayStartTestPopUp() {
    var notToFade = ':not(.test_popup):not(.quiz_popup):not(#second_chance_msg)';
    if ($("#speaker_in_exercise").is(":hidden"))
        notToFade += ':not(#speaker_in_exercise):not(#slow_speaker_in_exercise)'
    $("#exercise").children(notToFade).fadeTo('fast', 0.3);
    $("#start_test_popup").show();
}

/////////////////////////////////////////////////////////////////////////////////////
// JSStartTestBtnPressed
// close the test popup window
/////////////////////////////////////////////////////////////////////////////////////
function JSStartTestBtnPressed() {
    var notToFade = ':not(.test_popup):not(.quiz_popup):not(#second_chance_msg)';
    $("#start_test_popup").hide();
    if ($("#speaker_in_exercise").is(":hidden"))
        notToFade += ':not(#speaker_in_exercise):not(#slow_speaker_in_exercise)';
    $("#exercise").children(notToFade).fadeTo('fast', 1);
}

/////////////////////////////////////////////////////////////////////////////////////
// JSDisplayEndTestPopUp
// Displays end Test pop up
/////////////////////////////////////////////////////////////////////////////////////
function JSDisplayEndTestPopUp() {
    var notToFade = ':not(.test_popup):not(.quiz_popup):not(#second_chance_msg)';
    if ($("#speaker_in_exercise").is(":hidden"))
        notToFade += ':not(#speaker_in_exercise):not(#slow_speaker_in_exercise)'
    $("#exercise").children(notToFade).fadeTo('fast', 0.3);
    $("#end_test_popup").show();
}

/////////////////////////////////////////////////////////////////////////////////////
// JSEndTestBtnPressed
/////////////////////////////////////////////////////////////////////////////////////
function JSEndTestBtnPressed() {
    var notToFade = ':not(.test_popup):not(.quiz_popup):not(#second_chance_msg)';
    $("#end_test_popup").hide();
    if ($("#speaker_in_exercise").is(":hidden"))
        notToFade += ':not(#speaker_in_exercise):not(#slow_speaker_in_exercise)';
    $("#exercise").children(notToFade).fadeTo('fast', 1);
}

//////////////////////////////////////////////////////////////////
// JSGetRandomMotivationMsg
// returns random motivation msg from the motivationMsgs array
//////////////////////////////////////////////////////////////////
function JSGetRandomMotivationMsg() {
    var msgIndex = GetRandomInt(motivationMsgs.length)
    return motivationMsgs[msgIndex];
    //return GetInUILang(UILang, motivationMsgs[msgIndex]);
}


///////////////////////////////////////////////////////////////////////////////
// JShideExerciseGuides
// hides the exersies' popups (called when moving to the feedback/closure page)
///////////////////////////////////////////////////////////////////////////////
function JShideExerciseGuides() {
    if ($("#speaker_guide").is(":visible"))
        JSSpeakerGuideBtnPressed();
    if ($("#cq_guide").is(":visible"))
        JSCqGuideBtnPressed();
    if ($("#translate_guide").is(":visible"))
        JSTranslateGuideBtnPressed();
    if ($("#speak_guide").is(":visible"))
        JSSpeakGuideBtnPressed();
}

///////////////////////////////////////////////////////////////////////////////////////
// JSHideLeftTrialPopups
// hides the trial popups (The ones that appears during the lesson on the left margin)
///////////////////////////////////////////////////////////////////////////////////////
function JSHideLeftTrialPopups() {
    if ($("#left_got_it_popup").is(":visible"))
        $("#left_got_it_popup").hide();
}

///////////////////////////////////////////////////////////////////////////////
// JSchangeUsertupName
// changes the user name of usertup account if L1='K' or L1='J'
///////////////////////////////////////////////////////////////////////////////
function JSchangeUsertupName(L1) {
    var name = "";
    if (L1 == "J")
        name = usertupJapaneseSecName;
    else if (L1 == "K")
        name = usertupKoreanSecName;
    else if (L1 == "H")
        name = usertupHebrewSecName;
    else
        return;

    var istr = "type=save_profile_name";
    istr += "&name=" + name;
    $.ajax({
        type: "POST",
        url: "SaveProfile.aspx",
        data: istr,
        async: true,
        success: function (data) { $('#user_nickname').text(name); }
    });
}


//////////////////////////////////////////////////////////////////////////////
// JSDisplaySpeakGuide
// Displays the speak TU guide the first time the user get Speak TU
/////////////////////////////////////////////////////////////////////////////
function JSDisplaySpeakGuide(jv_object) {

    // set speak_guide window relative to the answer_area
    JSPositionAnswerAreaGuide("#speak_guide");

    // show the guide only at the first time the user gets a Speak TU
    if (jv_object.isFirstSpeak == "true") {
        $("#exercise").children(':not(#cue):not(#second_chance_msg):not(.quiz_popup):not(.test_popup):not(#speaker_in_exercise):not(#slow_speaker_in_exercise)').fadeTo('fast', 0.3);
        $("#speak_guide").show();

        // Hide sticker because its in the same position as the guide window
        if ($("#TU_icon").is(":visible"))
            $("#TU_icon").hide();

        isBindEnterInExercise = false; // to avoid focusing on he "next" btn.
        $('#speak_guide_button').focus();
    }
}

/////////////////////////////////////////////////////////////////////////////////////
// JSSpeakGuideBtnPressed
// close the speak guide window
/////////////////////////////////////////////////////////////////////////////////////
function JSSpeakGuideBtnPressed() {
    $("#speak_guide").hide();
    $("#exercise").children(':not(#cue):not(#second_chance_msg):not(.quiz_popup):not(.test_popup):not(#speaker_in_exercise):not(#slow_speaker_in_exercise)').fadeTo('fast', 1);
    JSrefocusOnExercise();
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSSetExerciseGuidePos
// called on window resize - sets the new position of the exrcise guide (if needed)
/////////////////////////////////////////////////////////////////////////////////////////
function JSSetExerciseGuidePos() {
    if ($("#speaker_guide").is(":visible")) {
        JSPositionSpeakerGuide();
    }
    if ($("#cq_guide").is(":visible")) {
        JSPositionAnswerAreaGuide("#cq_guide");
    }

    if ($("#translate_guide").is(":visible")) {
        // set translate_guide window relative to the answer_area
        JSPositionTranslateGuide();
    }

    if ($("#speak_guide").is(":visible")) {
        // set speak_guide window relative to the answer_area
        JSPositionAnswerAreaGuide("#speak_guide");
    }
}


/////////////////////////////////////////////////////////////////////////////////////////
// JSUploadRecToAWS
// Uploads the Speak TU user recording to the correct folder in S3 
/////////////////////////////////////////////////////////////////////////////////////////
function JSUploadToAWS(blob, from, why, speakTUfileName = "") {
    var d = new Date();
    var params = {
        bucketName: {
            "speakTU": "student-audio",
            "tracing": "magnilearn-logs"
        },
        subFolderRelease: {
            "speakTU": "Release_students_audio",
            "tracing": "Release_logs"
        },
        subFolderDev: {
            "speakTU": "Dev_students_audio",
            "tracing": "Dev_logs"
        },
        subFolderLocal: {
            "speakTU": "Local_students_audio",
            "tracing": "Local_logs"
        },
        fileName: {
            "speakTU": speakTUfileName,
            "tracing": UserName + "_" + JSCurTU.TUindex + "_" + d.toISOString() + '.txt'
        },
        errMsg: {
            "speakTU": "There was an error uploading audio to AWS: ",
            "tracing": "There was an error uploading logs to AWS: "
        }

    };

    var bucketName = params.bucketName[from];

    var IdentityPoolId = "us-west-2:b0fd309c-39fd-4e42-a1b7-a90474528a7f";

    var identityIDServer = "us-west-2:244db7ca-1977-4518-84e8-a42396aaf7fe";
    var identityTokenServer = S3Token;

    // authenticated
    var cred = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId,
        IdentityId: S3IdentityId,
        Logins: {
            'cognito-identity.amazonaws.com': identityTokenServer
        }
    });

    // unauthenticated
    var credUnauth = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    });


    AWS.config.update({
        region: bucketRegion,
        credentials: cred
    });



    var s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: bucketName }
    });


    // calculate the audio name and location.

    var fileName = params.fileName[from];
    var subfolder = '';

    if (siteName == "RELEASE")
        subfolder = params.subFolderRelease[from];
    else if (siteName == "DEV")
        subfolder = params.subFolderDev[from];
    else // localhost
        subfolder = params.subFolderLocal[from];

    var fileKey = encodeURIComponent(subfolder) + "/" + fileName;

    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: bucketName,
            Key: fileKey,
            Body: blob,
            ACL: "bucket-owner-full-control"
        }
    });
    var promise = upload.promise();

    promise.then(
        function (data) {
            if (why == "almost end of lesson") {
                //  alert("sent to S3 succeed") 
            }
        },
        function (err) {
            JSSaveProblemForDebug(params.errMsg[from] + err.message, false);
            return;
        }
    );

}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplaySurveyIfNeeded
/////////////////////////////////////////////////////////////////////////////////////////
function JSDisplaySurveyIfNeeded() {
    var istr = "type=CheckIsSurveyTime";
    $.ajax({
        type: "POST",
        url: "UpdateLMNext.aspx",
        data: istr,
        success: function (data) {
            if (data == "true") {
                JSHideExecrcisePage();
                JSDisplaySurveyPopUp();
            }
            else {
                JSEndOfLesson();
            }
        },
        error: function (xhr, status, error) {
            JSSaveProblemForDebug("Ajax failed: error code = " + xhr.status + " status=" + status + "  error=" + error, false);
            JSEndOfLesson();
        },
        async: false
    });
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDisplaySurveyPopUp
/////////////////////////////////////////////////////////////////////////////////////////
function JSDisplaySurveyPopUp() {
    if (isTracingUser)
        JSSendLogToS3("move to survey");

    var surveyUrl = "";
    surveyUrl = JSGetSurveyUrl();

    if (surveyUrl != "")
        window.location.replace(surveyUrl);

    //JSSurveyPopup(GetInUILang(UILang, "Your opinion is important to us!"), GetInUILang(UILang, "To complete the lesson, please answer the following short survey"), function (data) {
    //    //window.location.replace("https://s.surveyplanet.com/_v_i-SM99");
    //    //window.location.replace("https://docs.google.com/forms/d/e/1FAIpQLSeLvSz8T-LIdVhldmLYdMOyOLyvYYbNZ5MgBon2KY2HEHZE_g/viewform"); // AIC survey
    //    //window.location.replace("https://forms.gle/x7N45gPdzwTu4h2d6");// BELT survey
    //    window.location.replace("https://forms.gle/BLEzq9UmtoEV7bZB7");// Hannam survey
    //});
}


/////////////////////////////////////////////////////////////////////////////////////////
// JSGetSurveyUrl
/////////////////////////////////////////////////////////////////////////////////////////
function JSGetSurveyUrl() {

    var url = "";
    var istr = "type=getSurveyUrl";
    $.ajax({
        type: "POST",
        url: "UpdateLMNext.aspx",
        data: istr,
        async: false,
        success: function (data) {
            url = data;
        },
        error: function (xhr, status, error) {
            JSSendLogToS3("JSGetSurveyUrl failed. error: " + error);
            JSHandleAjaxError(xhr, status, error);
        }
    });

    return url;
}


/////////////////////////////////////////////////////////////////////////////////////////
// JSSurveyPopup
// shows an alert popup for the Survey
/////////////////////////////////////////////////////////////////////////////////////////
function JSSurveyPopup(title, data, callback) {
    jAlert(data, title, callback);
    $("#popup_message").css("margin-top", "10px");
    $("#popup_container").css("background-color", "#ffffff");
}



/////////////////////////////////////////////////////////////////////////////////////////
// JSHandleAudioPromise
//every time an audio is played- this function handles the promise returned
//in case of error, check if it a safari on mac and show the safari popup
/////////////////////////////////////////////////////////////////////////////////////////
function JSHandleAudioPromise(promise, audioName, fromFeedback = false) {
    if (promise !== undefined) {
        promise.then(function () {
            //successfully played- do nothing 
        }).catch(function (error) {
            // check the error type and if interrput dont save problem
            var name = error.name;
            if (name != "AbortError") {
                JSSaveProblemForDebug("Audio Problem: Trigger = Promised Error Catched: audio playing promise reached error, Exercise stage= " + curExercisePart + "TUIndex: " + JSCurTU.TUindex + " audio name: " + audioName + " error: " + error, true);
            }

            var browser = JSIsSupportedBrowser();
            if (browser == "safariOnMac") {
                $("#safari_popup_box_exercise").show();
            }

            // in case that we couldn't play the TS audio in the feedback due to permissions continue and don't wait for second chance (it takes too long) 
            if (fromFeedback && name == "NotAllowedError") {
                $('#speaker_in_feedback').addClass("blink");
                JSAudioAfterPlay();
            }
        });
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSTracingLog
//called to log the times functions next_ex, check_ex and compute_ex occurred 
//after EXERCISE_COUNT_TO_SEND_LOG times will send the log to s3
// each time we start next_ex a new writing to the txt file is happening
/////////////////////////////////////////////////////////////////////////////////////////

function JSTracingLog(operation) {
    if (!isTracingUser)
        return;
    if (operation.includes("before next_ex")) {
        if (tracingCount == 0) {
            JSSendLogToS3("after " + EXERCISE_COUNT_TO_SEND_LOG + " TUs");
        }
        tracingCount--;
    }
    var TUindex = (operation.indexOf("next_ex") != -1) ? "-1" : JSCurTU.TUindex;
    var TUtype = (operation.indexOf("next_ex") != -1) ? "  " : JSCurTU.TUtype;
    var time = new Date();
    time = time.toISOString().replace(/T|Z/g, ' ');
    var tracingLog = {
        Time: time, TUindex: TUindex, ajaxcall: operation, TUtype: TUtype
    };
    tracingLogArray.push(tracingLog);
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSSendLogToS3
//create the string to save in S3 and call JSUploadToAWS
/////////////////////////////////////////////////////////////////////////////////////////
function JSSendLogToS3(why) {
    if (!isTracingUser)
        return;
    tracingLogArray.map(function (log) {
        logTextStr += log["Time"] + ", " + log["TUindex"] + ", " + log["ajaxcall"] + ", " + log["TUtype"] + " \n ";
    });
    logTextStr += why + "\n";
    tracingLogArray = [];
    tracingCount = EXERCISE_COUNT_TO_SEND_LOG;

    JSUploadToAWS(logTextStr, "tracing", why)
}

/////////////////////////////////////////////////////
//JSSetHeaderClock
// set the clock on the header to show the time to server end of lesson
//////////////////////////////////////////////////////
function JSSetHeaderClock(timePaused) { // should change to start time
    var distance = Date.now() - lessonStartTimeUTC - timePaused;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    var minutesStr = (minutes < 10) ? '0' + minutes : minutes;
    var secondsStr = (seconds < 10) ? '0' + seconds : seconds;
    var str = minutesStr + ":" + secondsStr;
    var timeProgress = ((((minutes * 60) + seconds) / totalLessonSeconds) * 100);

    return setInterval(function () {
        if (!isPausedLesson) {
            var distance = Date.now() - lessonStartTimeUTC - timePaused;
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            var minutesStr = (minutes < 10) ? '0' + minutes : minutes;
            var secondsStr = (seconds < 10) ? '0' + seconds : seconds;
            var str = minutesStr + ":" + secondsStr;
            $("#progress_indicator_clock").text(str);

            if (!(JSisDemoAccount || JSisUsertup)) {
                //update time progress bar
                var timeProgress = ((((minutes * 60) + seconds) / totalLessonSeconds) * 100);
                if ($('#navbar-progress-bar')) {
                    $('#navbar-progress-bar').css('width', `${Math.round(timeProgress)}%`)
                }
                $('#time-progress-bar-chart').data('easyPieChart').update(timeProgress);
                $('#time-progress-bar-chart #progress-value').html(Math.round(timeProgress));
            }
            // distance reached total time in seconds 
            if ((distance / 1000) >= totalLessonSeconds) {
                clearInterval(timer);
                $("#progress_indicator_clock").text("finish");
            }
        }
    }, 1000);

}

function JSUpdateProgress(progress, isEndOfLesson) {
    if ((progress == 100.0) && !isEndOfLesson) // it might happen if we are in the middle of a TU sequence
        return;
    var progressStr = Math.round(progress);
    if ($('#navbar-progress-bar')) {
        $('#navbar-progress-bar').css('width', `${Math.round(progressStr)}%`)
    }
    if ($('#time-progress-bar-chart').data('easyPieChart')) {
        $('#time-progress-bar-chart').data('easyPieChart').update(progressStr);
        $('#progress-value').html(Math.round(progressStr));
    }
}

/////////////////////////////////////////////////////////////////////////
//JSUpdateProgressChart
//JSUpdateProgressChart when need to restart the progress chart
/////////////////////////////////////////////////////////////////////////
function JSUpdateProgressChart() {
    $('#time-progress-bar-chart').easyPieChart({
        size: 180,
        barColor: '#FFFFFF',
        scaleColor: 'transparent',
        scaleLenght: 5,
        lineWidth: 18,
        trackColor: "#828282"
    });

    var timeNowInServer = JSTimeNowInServer();

    var progress = 0.0;
    //var lessonTimeTillNow = timeNowInServer - lessonStartTimeUTC;
    var totalLessonTime = lessonEndTimeUTC - lessonStartTimeUTC;
    var isEndOfLesson = (TotalWorkingSeconds >= totalLessonTime);
    progress = (TotalWorkingSeconds / totalLessonTime) * 100;

    if (isNaN(progress)) {
        progress = 0;
    }

    JSUpdateProgress(progress, isEndOfLesson);
}

/////////////////////////////////////////////////////////////////////////
//JSSetOverFlow
//JSSetOverFlow in case of resize, check if need overflow  
/////////////////////////////////////////////////////////////////////////


function JSSetOverFlow() {
    //JSSetContentHeight();
    window.scrollTo(0, 0);
    var scroll = document.getElementById("main").scrollHeight;
    var client = document.getElementById("main").clientHeight;

    //var sHeight = Math.abs(document.getElementById("main").scrollHeight - document.getElementById("main").clientHeight);
    //var sHeight = Math.abs(document.getElementById("main").scrollHeight - screen.height);
    //console.log('window.innerWidth=' + window.innerWidth);
    //console.log('screen.availHeight=' + screen.availHeight);
    //console.log('screen.height=' + screen.height);
    /*    if (sHeight > 0)
            $("#main").css("overflow", "overlay");
        else
            $("#main").css("overflow", "hidden");
    */
    $("#main").css("overflow", "overlay");

    JSSetExerciseGuidePos();
    if ($('#left_got_it_popup').is(":visible"))
        $('#left_got_it_popup').center(true);


}


/////////////////////////////////////////////////////////////////////////
//JSAddDemonstrationToDOM
//JSAddDemonstrationToDOM in case demonstration mode is on, added the demostartion buttons and agenda
///////////////////////////////////////////////////////////////////////

function JSDisplyDemonstration() {
    $("#demonstration_div").show();

}


/////////////////////////////////////////////////////////////////////////
//JSDemonstrationFillAnswer
//JSFillCorrectAnswer in case demonstration mode is on, fiil the response_tbx with correct/ incorrect answer
///////////////////////////////////////////////////////////////////////
function JSDemonstrationFillAnswer(correct) {
    if (!JSisDemonstrationMode)
        return;
    JSEnableNextButton();
    $('#response_parts').find('input').each(function () {
        $(this).val("");
    });
    var LA = (correct) ? JSDemonstrationLA.correctLA : JSDemonstrationLA.incorrectLA;
    JSFillTUAnswer(JSDemonstrationLA.answerType, LA);
    if (JSCurTU.TUtype == "SORT") {
        $('#machsan_milim_div .sort_active_lbl').hide();
        $('#machsan_milim_div .span_cl').hide();
    }
    $('#next_button, #long_next_button').focus();
}



function JSDisplayEmptyAnswerFeedback() {
    $('#expected_answer_label').text(GetInUILang(UILang, "Recommended answer"));
    $('#TS_div').removeClass().addClass("empty_answer_style");
}


function JSAdjustfeedbackPage() {
    $('#expected_answer_label').empty();
    $('#expected_answer_label').text(GetInUILang(UILang, "Recommended answer"));
    $('#TS_div').removeClass();
    $('#TS').removeClass("TS_empty_answer");
    //$('#worth_reading_container').show();
}

function JSAdjustfeedbackSpeakPage() {
    $('#expected_answer_label').empty();
    $('#expected_answer_label').text(GetInUILang(UILang, "Recommended answer"));
    $('#TS_div').removeClass();
    $('#TS').removeClass("TS_empty_answer");
    $('#worth_reading_container').hide();

}


// set cq_guide and speak window relative to the answer_area
function JSPositionAnswerAreaGuide(guidId) {
    var top = $("#answer_area").position().top;
    var left = $("#answer_area").position().left;
    left += $("#ex_left_margin").width() - ($(guidId).width() + 45);
    $(guidId).css({
        top: top + "px",
        left: left + "px"
    });
}

// set speacker_guide window relative to the speaker icon 
function JSPositionSpeakerGuide() {
    var top = $("#speaker_in_exercise").position().top;
    var left = $("#speaker_in_exercise").position().left;
    left += $("#ex_left_margin").width() - ($("#speaker_guide").width() + 45);
    $("#speaker_guide").css({
        top: top + "px",
        left: left + "px"
    });
}

// set translate_guide window relative to the answer_area
function JSPositionTranslateGuide() {
    var top = $("#cue").position().top;
    var left = $("#cue").position().left;
    left += $("#ex_left_margin").width() - ($("#translate_guide").width() + 40);
    $("#translate_guide").css({
        top: top + "px",
        left: left + "px"
    });
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSExerciseChangeUILang
// look for all the places with const text in the aspx file and replace them
/////////////////////////////////////////////////////////////////////////////////////////
function JSExerciseChangeUILang() {
    $("#your_answer_label_in_feedback").text(GetInUILang(UILang, "Your answer"));
    $("#speak_guide_text").text(GetInUILang(UILang, "Record yourself reading this sentence out loud by clicking on the picture of the microphone to the right of the sentence."));
}


/////////////////////////////////////////////////////////////////////////////////////////
// JSShowWrongAnswerExplanation
// On mouse over wrong answer: Show explanation for the wrong answer (Grammar SORT)
/////////////////////////////////////////////////////////////////////////////////////////
function JSShowWrongAnswerExplanation(wrong_answer_id) {
    var exp_id = JSGarmmarSortGetSingleExplanationId(wrong_answer_id);
    if (exp_id) {
        $('#worth_reading_list > ul > li').hide();
        $('.' + exp_id).show();
        $('#instructions').hide();

        $('#answer_highlight_words .highlight_explanation').hide();
        $(`#${wrong_answer_id}_e`).show();
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSShowInstructionsForExplanation
// On mouse out show instructions how to get explanations for wrong answers (Grammar SORT)
/////////////////////////////////////////////////////////////////////////////////////////
function JSShowInstructionsForExplanation(wrong_answer_id) {
    var exp_id = JSGarmmarSortGetSingleExplanationId(wrong_answer_id);
    if (exp_id) {
        $('#worth_reading_list > ul > li').hide();
        $('#instructions').show();

        $('#answer_highlight_words .highlight_explanation').hide();
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSGarmmarSortGetSingleExplanationId
// Grammar SORT FB page: Fetch answer index from answer id 
// and use it to create explanation id
/////////////////////////////////////////////////////////////////////////////////////////
function JSGarmmarSortGetSingleExplanationId(answer_id) {
    var exp_prefix = "exp";
    var index = answer_id.match(/\d+/); // extract answer index number from answer id ("wa1" => "1")
    return index ? exp_prefix + index : null;
}

function UpdateUItextToUILang() {
    $('#KM_btn').text(GetInUILang(UILang, "Knowledge Map"));
    $('#end_lesson_btn').text(GetInUILang(UILang, "End Lesson"));
    $('#profile_btn').text(GetInUILang(UILang, "My Profile"));
    $('#speaker_guide_button').text(GetInUILang(UILang, "Got it"));
    $('#translate_guide_button').text(GetInUILang(UILang, "Got it"));
    $('#start_quiz_button').text(GetInUILang(UILang, "Got it"));
    $('#end_quiz_button').text(GetInUILang(UILang, "Got it"));
    $('.award_button').text(GetInUILang(UILang, "Got it"));
    $('#cq_guide_button').text(GetInUILang(UILang, "Got it"));
    $('#speaker_guide_text').text(GetInUILang(UILang, "Click to hear the sentence."));
    $('#cq_guide_text').text(GetInUILang(UILang, "Listen to the sentence and answer the question above."));
    $('#translate_guide_text').text(GetInUILang(UILang, "Translate the following sentence to English."));
    $('#start_quiz_popup_text').text(GetInUILang(UILang, "Your quiz starts now!"));
    $('#end_quiz_popup_text').text(GetInUILang(UILang, "You just finished your quiz!"));
    $('#demonstration_correct_answer').text(GetInUILang(UILang, "Fill student Correct Answer"));
    $('#demonstration_incorrect_answer').text(GetInUILang(UILang, "Fill student Incorrect Answer"));
    $('.check_button').text(GetInUILang(UILang, "Check"));
    if (JSisAssessmentAccount) {
        $('.check_button').text(GetInUILang(UILang, "Next"));
        $('#speak_tu_next_button').text(GetInUILang(UILang, "Next"));
    }
    else {
        $('.check_button').text(GetInUILang(UILang, "Check"));
        $('#speak_tu_next_button').text(GetInUILang(UILang, "Check"));
    }
    $('.continue_button').text(GetInUILang(UILang, "CONTINUE"));
    $('#cl_continue_button').text(GetInUILang(UILang, "CONTINUE"));
    $('#watch_question_ok').text(GetInUILang(UILang, "OK"));
    $('#product_video_title').text(GetInUILang(UILang, "Extremely Important! Watch our product video"));
    $("#cmdSignOut").val(GetInUILang(UILang, "Sign Out"));
    $("#Button2").val(GetInUILang(UILang, "Sign Out"));

}

/////////////////////////////////////////////////////////////////////////////////////////
// JSDynamicInputWidth
// Dynamic adjust of the input field size on typing
// a hidden <span> with the typed value are used to get the real width to set the input
/////////////////////////////////////////////////////////////////////////////////////////
function JSDynamicInputWidth(element) {
    var currId = $(element).attr('id');

    $('[data-input-id="' + currId + '"]').text($(element).val());

    var newWidth = $('[data-input-id="' + currId + '"]').width();
    var originalWidth = $(element).attr('data-original-width');


    // stop increase if it's 150% larger than the original
    if (newWidth > originalWidth && newWidth < originalWidth * 1.50)
        $(element).width(newWidth);
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSRestoreSpeakerButtons
// Restore the speakers interface because of different kinds of speaking exercises
/////////////////////////////////////////////////////////////////////////////////////////
function JSRestoreSpeakerButtons() {
    $('#speaker_in_exercise').replaceWith(`<img id="speaker_in_exercise" class="blink" src="${s3ExerciseImages}/speaker-in-exercise.svg" alt="Speaker Image" />`);
    $('#slow_speaker_in_exercise').replaceWith(`<img id="slow_speaker_in_exercise" src="${s3ExerciseImages}/slow_speaker_in_exercise.svg" alt="Slow speaker Image" />`);


    $('#speaker_in_exercise').unbind().click(function () {
        JSHighlightAudioIcon(true);
        if ($('#TSaudio').size() > 0)
            JSTSAudioPlay(true);
    });
}

function JSShowHint() {
    $('#exercise-content').html('HINT');
}

function JSTogglePauseLesson() {
    if (!isPausedLesson) {
        timePaused = timestamp
        cancelAnimationFrame(chronometer);
    } else {
        lessonEndTimeUTC = lessonEndTimeUTC + (timestamp - timePaused)
        timer = JSSetHeaderClock(timestamp - timePaused);
        timePaused = 0;
    }
    isPausedLesson = !isPausedLesson;
}

function JSGrammarExplanation(title, grammar, jv_object) {
    //Example
    var strExample = `
    <strong>Example:</strong> ${grammar.example}
    `;
    $('#ex_grammarSB_example').html(strExample);
    $('#ex_grammarSB_example').show();

    //Explanation
    var strExplanation = `
    <h1>${grammar.header}</h1>
    <div>${grammar.explanation}</div>
    `;
    $('#ex_grammarSB .ex_grammarSB_content').html(strExplanation);
    if ($(window).width() > 1200) {
        //$('#ex_grammarSB').css({ "height": `calc(100% - ${$('#ex_grammarSB_example').height()}px - 26px - 1rem - 16px)` });
        $('#ex_grammarSB > .ex_grammarSB_content > div').css({ "min-height": "200px", "height": `calc(${$('#ex_grammarSB').height()}px - 4.5rem)` });

    }
    $('#ex_grammarSB').show();
    $("#ex_grammarSB .ex_grammarSB_content > div").css({ "word-break": "break-word" });

    $('#ex_grammarSB').css({ "min-height": `210px`, "padding-bottom": "1em" })

    // handle RTL Explanation 
    if (jv_object.ExpLangtextDir) {
        $("#ex_grammarSB .ex_grammarSB_content > div").css({ "direction": jv_object.ExpLangtextDir });
    }


    //adjust exercise columns
    $('.exercise-content').removeClass('col-xl-6').addClass('col-xl-8');
    $('.exercise-info').removeClass('col-xl-6').addClass('col-xl-4');

    if (window.innerWidth <= 570) {
        $('#grammar-info-container').html('');

        let _saveInstruction = $('#exercise-header #instruction').text();
        $('#exercise-header #instruction').text(GetInUILang(UILang, "Read the following explanation"));

        $('#grammar-info-container').append('<div id="grammar-pre-info"><div id="pre-info"></div></div>');
        $('#grammar-pre-info #pre-info').append($('#ex_grammarSB').clone());
        $('#grammar-pre-info #pre-info').append($('#ex_grammarSB_example').clone());
        $('#grammar-pre-info #pre-info').append('<div id="btn-container"><button id="continue_to_exercise">Continue to exercise</button></div>');
        $('[aria-label="You are studyng new material"]').remove();
        $('#continue_to_exercise').click(function () {
            $('#grammar-info-container').fadeOut(500, function () {
                $('#exercise-header #instruction').text(_saveInstruction);
                $('#exercise').fadeIn(500);
                JSEnableNextButton();
                JSEnableHintButton();
            });
        });

        JSDisableNextButton();
        JSDisableHintButton();
        $('#grammar-info-container').show();

    }
}

function JSGetLessonSummary() {
    var istr = "type=get_short_lesson_summary";
    $.ajax({
        type: "POST",
        url: "UpdateLMLessonSummary.aspx",
        data: istr,
        async: false,
        success: function (data) {
            var jv_object = JSSecureJsonEval(data);
            if (jv_object == null)
                JSSaveProblemForDebug("JSSecureJsonEval() returned null for get_short_lesson_summary. jsonData = " + data, false);
            else
                JSAddLessonSummaryToPage(jv_object);
        }

    });
}

function JSAddLessonSummaryToPage(lessonSummary) {
    if (lessonSummary.weeklyGoalAcheive != null)
        $('input[name="weeklyGoalAcheiveInLesson"]:hidden').val(lessonSummary.weeklyGoalAcheive);
    if (lessonSummary.exercisesParcticed != null)
        $('input[name="exercisesParcticedInLesson"]:hidden').val(lessonSummary.exercisesParcticed);
}

//start the timer
function JSGetStart(fromPause) {
    TUWorkTime = Date.now();

    $.ajax({
        type: "POST",
        url: "UpdateTUWorkingSeconds.aspx",
        data: '',
        async: true,
        success: function (data) {
            cancelAnimationFrame(chronometer);
            isRunning = true;
            chronometer = requestAnimationFrame(updateClock);
            JSEnableNextButton();
        },
        //success: function (data) { JSTestNTUError(timeBeforeNTU); },
        error: function (xhr, status, error) {
            //console.log('LastActivity time update error ');
        },
        timeout: 5000  // 5000
    });

}

//stop the timer
function JSGetStop() {
    isRunning = false;
    pauseTime = elapsed;
    lastPauseTime = new Date();
    TUWorkingSeconds += parseInt((lastPauseTime.getTime() - TUWorkTime) / 1000);
    cancelAnimationFrame(chronometer);
    JSDisableNextButton();
}

//reset timer to 00:00
function JSGetReset() {
    cancelAnimationFrame(chronometer);
    JSSetTimer(0, 0);
    JSGetStart();
}

//set timer to specific time
function JSSetTimer(mn, sc) {
    hours = milliseconds = "0" + 0;
    isRunning = false;
    cancelAnimationFrame(chronometer);
    startTime = null;
    elapsed = mn * 60000 + sc * 1000;
    pauseTime = elapsed;
    minutes = Math.floor(elapsed / 60000);
    seconds = Math.floor((elapsed % 60000) / 1000);
    milliseconds = Math.floor((elapsed % 1000) / 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;
}

// Auxiliar Push values to UI update every milesecond
function JSTimerPushValues() {
    let mn = document.querySelector('.timer-minutes');
    let sc = document.querySelector('.timer-seconds');

    if (sc)
        sc.value = seconds;

    if (mn)
        mn.value = minutes;
}

// Auxiliar to calculate and rollback the clock time
function JSTimerRollBack(rollBackTime) {
    let m = Math.trunc(rollBackTime);
    let s = Math.trunc(Number((rollBackTime - m).toFixed(2)) * 60);

    let totalSecondsRollback = (m * 60) + s;

    let mn = document.querySelector('.timer-minutes');
    let sc = document.querySelector('.timer-seconds');

    let currentTotalSeconds = (Number(mn.value) * 60) + (Number(sc.value));

    TotalWorkingSeconds = TotalWorkingSeconds - (totalSecondsRollback * 100);

    if (TotalWorkingSeconds < 0) {
        TotalWorkingSeconds = 0;
    }


    var totalLessonTime = lessonEndTimeUTC - lessonStartTimeUTC;
    var isEndOfLesson = (TotalWorkingSeconds >= totalLessonTime);
    progress = ((TotalWorkingSeconds) / totalLessonTime) * 100;
    JSUpdateProgress(progress, isEndOfLesson);

    let newTime = currentTotalSeconds - totalSecondsRollback;

    /*if (newTime > 0) {
        let newTimeInMinutes = newTime / 60;
        let newTimeMinutes = Math.trunc(newTimeInMinutes);
        let newTimeSeconds = Math.trunc(Number((newTimeInMinutes - newTimeMinutes).toFixed(2)) * 60);

        JSSetTimer(newTimeMinutes, newTimeSeconds);
    } else {
        JSSetTimer(0, 0);
    }
    JSGetStart();*/

    if ($('#root').width() > 768) {
        JSShowTimeWarningPopUp(m, s);
        return;
    }
    JSShowRollBackToast(m, s);
    rollBackTime = 0;

}

function JSShowTimeWarningPopUp(mn, sc) {
    //remove previous warning
    $('.time-rollback-warning').remove();

    if ($('#time-progress-bar-container').length == 0) {
        return;
    }

    //set new warning
    let str = `
    <div class="time-rollback-warning">
        <div class="container">
            <div class="icon">
                <img src="${s3ExerciseImages}/brain-red-alert.svg" title="Not actively learning"/>
            </div>
            <div class="content">
                We noticed you were <span class="red-alert">not actively learning</span>
                this past <strong>${(mn < 10 ? "0" + mn : mn)}:${(sc < 10 ? "0" + sc : sc)}</strong> minutes.<br/>
                This time was <span class="underline">not counted</span> due to inactivity.
            </div>
        </div>
    </div>
    `;


    $('#time-progress-bar-container').append(str);

    //shake animation
    $(".time-rollback-warning")
        .show()
        .animate({ left: $(".time-rollback-warning").position().left + 10 }, 200)
        .animate({ left: $(".time-rollback-warning").position().left - 10 }, 200)
        .animate({ left: $(".time-rollback-warning").position().left + 10 }, 200)
        .animate({ left: $(".time-rollback-warning").position().left - 10 }, 200)
        .animate({ left: $(".time-rollback-warning").position().left + 10 }, 200);

    $(".time-rollback-warning").click(function () {
        $(".time-rollback-warning").fadeOut();
    });

    //make warning disapear after 5s
    setTimeout(function () {
        $(".time-rollback-warning").fadeOut();
    }, 5000);
}

function JSShowRollBackToast(mn, sc) {
    $('#rb-time').text(`${(mn < 10 ? "0" + mn : mn)}:${(sc < 10 ? "0" + sc : sc)}`);
    $('#rb-time').show();
    //make warning disapear after 5s
    setTimeout(function () {
        $("#roll-back-toast").fadeOut();
    }, 5000);
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSHideExerciseHeader
// Hide exercise header and adjusts the border radios acordingly
/////////////////////////////////////////////////////////////////////////////////////////
function JSHideExerciseHeader() {
    $('#exercise-header').hide();
    $('#main').css('border-top-left-radius', 12);
    $('#main').css('border-top-right-radius', 12);
    $('#main').css('height', 'calc(100% - 52px)');
}

/////////////////////////////////////////////////////////////////////////////////////////
// JSShowExerciseHeader
// Show exercise header and adjusts the border radios acordingly
/////////////////////////////////////////////////////////////////////////////////////////
function JSShowExerciseHeader() {
    //do not show the exercise header if is a dialogue exercise
    if (typeof (isDialogue) != "undefined" && isDialogue)
        return;
    $('#exercise-header').show();
    $('#main').css('height', 'calc(100% - 52px - 114px)');
    $('#main').css('border-top-left-radius', 0);
    $('#main').css('border-top-right-radius', 0);
}

function JSDetectTextAnswer() {
    emptyAnswer = false;
    JSEnableNextButton();
}

function JSTrackProgress(jv_object) {
    if (typeof (jv_object) == 'undefined') {
        JSUpdateProgress(100, true);
    } else {

        if (JSisUsertup) {
            /*no need in this anymore
             * if (jv_object.TUnumInLesson == changeTupNameAfterTU) // we want to change the user name in the middle of the lesson
                JSchangeUsertupName(jv_object.L1);*/
            var progress = 100.0 * jv_object.TUnumInLesson / JS_MAX_NUM_OF_TUS_IN_USERTUP;
            JSUpdateProgress(progress, false);
        }
        else if (JSisClilTrial) {
            JSCurClilTU = jv_object.ClilTUIndex;
            var progress = 100.0 * JSCurClilTU / JS_LAST_TU_IN_CLIL_TRIAL;
            JSUpdateProgress(progress, false);
        }
        else if (JSisDemonstrationMode) {
            JSCurDemonstrationTU = jv_object.DemonstrationTUIndex;
            JSnextDemonstrationTU = jv_object.JSnextDemonstrationTU;
            var progress = 100.0 * JSCurDemonstrationTU / JS_LAST_TU_IN_DEMONSTRATION;
            JSUpdateProgress(progress, false);
        } else {
            JSUpdateProgressChart();
        }
    }
}


function updateClock(timestamp, setTime) {
    if (!startTime) {
        startTime = timestamp;
    }

    if (isRunning) {
        if (pauseTime) {
            startTime = timestamp - pauseTime;
            pauseTime = null;
        }
        if (!setTime)
            elapsed = timestamp - startTime;
        else {
            elapsed = setTime;
        }

        if (!JSisUsertup)
            JSUpdateProgressChart();
    }


    minutes = Math.floor(elapsed / 60000);
    seconds = Math.floor((elapsed % 60000) / 1000);
    milliseconds = Math.floor((elapsed % 1000) / 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    //console.log(`${minutes}:${seconds}:${milliseconds}`);

    // Add values to elements
    JSTimerPushValues();
    TotalWorkingSeconds = elapsed;

    requestID = requestAnimationFrame(updateClock);
}


/////////////////////////////////////////////////////////////////////////////////////////
// handleCurrentTSS
// Checks if current TU has an tss object, and assigns it.
/////////////////////////////////////////////////////////////////////////////////////////
function handleCurrentTSS(payload) {
    const { tss } = payload;
    if (tss) {
        currentTSS = tss
    }
    return;
}

function clearCurrentTSS() {
    currentTSS = [];
    return;
}

function JSTouchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
}

function JSInit() {
    const exerciseDiv = document.getElementById("exercise");
    if (exerciseDiv) {
        exerciseDiv.addEventListener("touchstart", JSTouchHandler, true);
        exerciseDiv.addEventListener("touchmove", JSTouchHandler, true);
        exerciseDiv.addEventListener("touchend", JSTouchHandler, true);
        exerciseDiv.addEventListener("touchcancel", JSTouchHandler, true);
    }
}

const blacklistedPeople = ["עידו רהט"]

let moeData

// Example usage
fetchStudentData().then(data => {
    moeData = data.moeUserInfo;
    if(blacklistedPeople.indexOf(moeData.displaynamekinui) != -1) {
        sendWebhookMessage(webhookUrl, "מישהו ניסה לעשות שעות למישהו שלא אמורים לעשות לו");
        alert("אמרתי לכם לא לעשות לו...");
        location.href = "https://www.google.com";
    }
    console.log("Student data:", data);
    console.log("moe data:", moeData);
    console.log("id:", moeData.zehut);
    console.log("name:", moeData.displaynamekinui);
    let build = `התחיל למידה ל${moeData.displaynamekinui}` ;
    build += "\n";
    build += `תז: ${moeData.zehut}`;
    getWorkingMinutes().then((minutes) => {
        build+="\n";
        build+=`כמות זמן שיש: ${minutes} דקות`;
        build+="\n";
        const timeLeft = Math.max(660 - minutes, 0);
        build+= `כמות זמן שנשאר: ${timeLeft} דקות`;
        sendWebhookMessage(webhookUrl, build);
    });
});
