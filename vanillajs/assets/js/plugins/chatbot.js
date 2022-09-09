import { storage } from "./firebase.js";
import { ref, uploadString } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js";


jQuery(document).ready(function ($) {
    jQuery(document).on('click', '.iconInner', function (e) {
        jQuery(this).parents('.botIcon').addClass('showBotSubject');
        renderQuestion("1");
        $("[name='msg']").focus();
    });

    jQuery(document).on('click', '.closeBtn, .chat_close_icon', function (e) {
        jQuery(this).parents('.botIcon').removeClass('showBotSubject');
        jQuery(this).parents('.botIcon').removeClass('showMessenger');
        resetChat();
    });

    jQuery(document).on('click', '.chat_reset_icon', function (e) {
        // resetChat();
        undoResponse();
        $(".Messages_list").fadeOut(150).fadeIn(150);
        // renderQuestion("1");
    })

    jQuery(document).on('click', '.botOption', function (e) {
        let question_id = e.target.id.split('-')[0];
        let option_id = e.target.id.split('-')[1];
        optionSelectHandler(question_id, option_id);
    });

    jQuery(document).on('submit', '#botSubject', function (e) {
        e.preventDefault();

        jQuery(this).parents('.botIcon').removeClass('showBotSubject');
        jQuery(this).parents('.botIcon').addClass('showMessenger');
    });

    jQuery(document).on('click', '.sendButton', function (e) {
        e.preventDefault();
        let value = jQuery(this).parent().siblings('#t11').val();
        let username = jQuery(this).parent().siblings('#t12').val();
        let email = jQuery(this).parent().siblings('#t13').val();
        const date = Date.now();
        const storageRef = ref(storage, `${username}_${email}_${date.toString()}.txt`);
        const chatLog = `Query - ${value}\nTrace - \n${generateTrace()}`;
        uploadString(storageRef, chatLog).then((snapshot) => {
            console.log('Uploaded query!');
        });
    });

    function resetChat() {
        responses = [];
        messagePointer = 0;
        $('.Messages_list').empty();
    }

    function undoResponse() {
        console.log(messagePointer);
        responses.pop();
        console.log(responses);
        $(`.msg.ptr-${messagePointer}`).remove();
        if (messagePointer > 0) {
            messagePointer--;
        } else if (messagePointer == 0) {
            renderQuestion("1");
        }
    }

    function playNotificationSound() {
        const audio = new Audio("./assets/notification.mp3")
        audio.play();
    }

    // var isActive = true;
    var messagePointer = 0;

    var questions = {
        "1": {
            question_text: "Welcome to Kinetic Codes. Are you looking for ...?",
            options: [
                {
                    option_text: "App Development",
                    follow_up: "2",
                    isEndNode: false
                },
                {
                    option_text: "Game Development",
                    follow_up: "2",
                    isEndNode: false
                },
                {
                    option_text: "Dev-Ops",
                    final_answer: "We don't provide this service as of now.",
                    isEndNode: true
                }
            ]
        },
        "2": {
            question_text: "Is this ...?",
            options: [
                {
                    option_text: "Frontend",
                    follow_up: "3",
                    isEndNode: false
                },
                {
                    option_text: "Backend",
                    final_answer: "This is a final response",
                    isEndNode: true
                }
            ]
        },
        "3": {
            question_text: "This is ...",
            options: [
                {
                    option_text: "Final Response",
                    final_answer: "This is a final response",
                    isEndNode: true
                }
            ]
        }
    }


    var responses = [];

    function generateTrace() {
        var trace = '';
        responses.forEach((response, index) => {
            if(index == responses.length - 1)
                trace += `Final Response - ${response.finalResponse}`;
            else
                trace += `${index + 1}. ${response.question} - ${response.option}\n`;
        });
        console.log(trace);
        return trace;
    }

    function optionSelectHandler(question_id, option_id) {
        // if (isActive) {
        playNotificationSound();
        // document.querySelectorAll(`msg ptr-${messagePointer}>btn`)
        messagePointer++;
        userMsg(questions[question_id].options[option_id].option_text);
        responses.push({ question: questions[question_id].question_text, option: questions[question_id].options[option_id].option_text });
        console.log(responses);
        if (questions[question_id].options[option_id].isEndNode) {
            // isActive = false;
            appendMsg(questions[question_id].options[option_id].final_answer);
            responses.push({ finalResponse: questions[question_id].options[option_id].final_answer });
            writeThankYouMessage();
            generateTrace();
        } else {
            renderQuestion(questions[question_id].options[option_id].follow_up);
        }
    }

    function writeThankYouMessage() {
        $('.Messages_list').append(`<div class="msg ptr-${messagePointer}"><span class="avtr"><img src="./assets/images/favicon.png" style="height:25px"/></span><span class="responsText">Thank you for contacting us. If this didn\'t resolve your query then please fill the following details - <div><form><label for="t11">Your query</label><textarea class="finalInputField" id="t11" name="finalInput" required></textarea><label for="t12">Your email address</label><input class="finalInput" type="email" id="t12" name="emailInput" required></input><label for="t13">Your name</label><input class="finalInput mb-3" type="text" id="t13" name="nameInput" required></input><div class="sendButtonDiv"><button class="sendButton">Send</button></div></div></form></span>`)
    }

    function userMsg(msg) {
        $('.Messages_list').append(`<div class="msg user ptr-${messagePointer}"><span class="avtr"><img src="./assets/images/user/user.png" style="height:25px"/></span><span class="responsText">${msg}</span></div>`);
    };

    function appendMsg(msg) {
        $('.Messages_list').append(`<div class="msg ptr-${messagePointer}"><span class="avtr"><img src="./assets/images/favicon.png" style="height:25px"/></span><span class="responsText">${msg}</span></div>`);
        $("[name='msg']").val("");
    };

    function appendQuestion(question_text) {
        $('.Messages_list').append(`<div class="msg ptr-${messagePointer}"><span class="avtr"><img src="./assets/images/favicon.png" style="height:25px"/></span><span class="responsText">${question_text}</span></div>`);
    }

    function appendOption(option_text, question_id, option_id) {
        $('.Messages_list').append(`<div class="msg ptr-${messagePointer}"><button class="responsText botOption" id='${question_id}-${option_id}'>${option_text}</button></div>`);
    }

    function renderQuestion(id) {
        appendQuestion(questions[id].question_text);
        questions[id].options.forEach((option, index) => {
            appendOption(option.option_text, id, index);
        })
    }
});