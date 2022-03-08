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

    jQuery(document).on('click','.chat_reset_icon', function (e) {
        resetChat();
        $(".Messages_list").fadeOut(150).fadeIn(150);
        renderQuestion("1");
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
        let value = jQuery(this).parent().siblings('.finalInputField').val();
        const mailString = encodeURI(`mailto:contact@kineticcodes.com?subject=Query Regarding Kinetic Codes&body=${value}\n\n\n\n\nTrace - \n${generateTrace()}`);
        window.open(mailString);
    });

    function resetChat() {
        $('.Messages_list').empty();
    }

    function playNotificationSound() {
        const audio = new Audio ("./assets/notification.mp3")
        audio.play();
    }

    questions = {
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


    responses = [];

    function generateTrace() {
        trace = '';
        responses.forEach((response, index)=>  {
            trace+=`${index+1}. ${response.question} - ${response.option}\n`;
        });
        console.log(trace);
        return trace;
    }

    function optionSelectHandler(question_id, option_id) {
        playNotificationSound();
        userMsg(questions[question_id].options[option_id].option_text);
        responses.push({question: questions[question_id].question_text,option:questions[question_id].options[option_id].option_text});
        console.log(responses);
        if (questions[question_id].options[option_id].isEndNode) {
            appendMsg(questions[question_id].options[option_id].final_answer);
            writeThankYouMessage();
            generateTrace();
        } else {
            renderQuestion(questions[question_id].options[option_id].follow_up);
        }
    }

    function writeThankYouMessage() {
        $('.Messages_list').append('<div class="msg"><span class="avtr"><img src="./assets/images/favicon.png" style="height:25px"/></span><span class="responsText">Thank you for contacting us. If this didn\'t resolve your query then please write your query below - <div><textarea class="finalInputField" id="t11" name="finalInput"></textarea><div class="sendButtonDiv"><button class="sendButton">Send</button></div></div></span>')
    }

    function userMsg(msg) {
        $('.Messages_list').append('<div class="msg user"><span class="avtr"><img src="./assets/images/user/user.png" style="height:25px"/></span><span class="responsText">' + msg + '</span></div>');
    };

    function appendMsg(msg) {
        $('.Messages_list').append('<div class="msg"><span class="avtr"><img src="./assets/images/favicon.png" style="height:25px"/></span><span class="responsText">' + msg + '</span></div>');
        $("[name='msg']").val("");
    };

    function appendQuestion(question_text) {
        $('.Messages_list').append('<div class="msg"><span class="avtr"><img src="./assets/images/favicon.png" style="height:25px"/></span><span class="responsText">' + question_text + '</span></div>');
    }

    function appendOption(option_text, question_id, option_id) {
        $('.Messages_list').append(`<div class="msg"><span class="responsText botOption" id='${question_id}-${option_id}'>${option_text}</span></div>`);
    }
    function renderQuestion(id) {
        appendQuestion(questions[id].question_text);
        questions[id].options.forEach((option, index) => {
            appendOption(option.option_text, id, index);
        })
    }


    /* Chatboat Code */
    // $(document).on("submit", "#messenger", function (e) {
    //     e.preventDefault();

    //     var val = $("[name=msg]").val().toLowerCase();
    //     var mainval = $("[name=msg]").val();
    //     name = '';
    //     TimeNow = new Date();
    //     nowhour = TimeNow.getHours();

    //     function renderQuestion(question) {

    //     }
    //     function userMsg(msg) {
    //         $('.Messages_list').append('<div class="msg user"><span class="avtr"><img src="./assets/images/favicon.png" style="height:25px"/></span><span class="responsText">' + mainval + '</span></div>');
    //     };
    //     function appendMsg(msg) {
    //         $('.Messages_list').append('<div class="msg"><span class="avtr"><figure style="background-image: url (assets/images/favicon.png)"></figure></span><span class="responsText">' + msg + '</span></div>');
    //         $("[name='msg']").val("");
    //     };


    //     userMsg(mainval);
    //     if (val.indexOf("hello") > -1 || val.indexOf("hi") > -1 || val.indexOf("good morning") > -1 || val.indexOf("good afternoon") > -1 || val.indexOf("good evening") > -1 || val.indexOf("good night") > -1) {
    //         if (nowhour >= 12 && nowhour <= 16) {
    //             appendMsg('good afternoon');
    //         } else if (nowhour >= 10 && nowhour <= 12) {
    //             appendMsg('hi');
    //         } else if (nowhour >= 0 && nowhour <= 10) {
    //             appendMsg('good morning');
    //         } else {
    //             appendMsg('good evening');
    //         }

    //         appendMsg("what's your name?");

    //     } else if (val.indexOf("i have problem with") > -1) {
    //         if (val.indexOf("girlfriend") > -1 || val.indexOf("gf") > -1) {

    //             appendMsg("take out your girlfriend, for dinner or movie.");
    //             appendMsg("is it helpful? (yes/no)");

    //         } else if (val.indexOf("boyfriend") > -1 || val.indexOf("bf") > -1) {
    //             appendMsg("bye something for him.");
    //             appendMsg("is it helpful? (yes/no)");
    //         } else {
    //             appendMsg("sorry, i'm not able to get you point, please ask something else.");
    //         }
    //     } else if (val.indexOf("yes") > -1) {

    //         var TimeNow = new Date();
    //         var nowhour = TimeNow.getHours();
    //         appendMsg("it's my pleaser that i can help you");

    //         saybye();
    //     } else if (val.indexOf("no") > -1) {

    //         var TimeNow = new Date();
    //         var nowhour = TimeNow.getHours();
    //         appendMsg("it's my bad that i can't able to help you. please try letter");

    //         saybye();
    //     } else if (val.indexOf("my name is ") > -1 || val.indexOf("i am ") > -1 || val.indexOf("i'm ") > -1 || val.split(" ").length < 2) {/*|| mainval != ""*/
    //         // var name = "";
    //         if (val.indexOf("my name is") > -1) {
    //             name = val.replace("my name is", "");
    //         }

    //         else if (val.indexOf("i am") > -1) {
    //             name = val.replace("i am", "");
    //         }

    //         else if (val.indexOf("i'm") > -1) {
    //             name = val.replace("i'm", "");
    //         }

    //         else {
    //             name = mainval;
    //         }

    //         // appendMsg("hi " + name + ", how can i help you?");
    //         appendMsg("hi " + name + ", how can i help you?");
    //     } else {
    //         appendMsg("sorry i'm not able to understand what do you want to say");
    //     }

    //     function saybye() {
    //         if (nowhour <= 10) {
    //             appendMsg(" have nice day! :)");
    //         } else if (nowhour >= 11 || nowhour <= 20) {
    //             appendMsg(" bye!");
    //         } else {
    //             appendMsg(" good night!");
    //         }
    //     }

    //     var lastMsg = $('.Messages_list').find('.msg').last().offset().top;
    //     $('.Messages').animate({ scrollTop: lastMsg }, 'slow');
    // });
    /* Chatbot Code */
})