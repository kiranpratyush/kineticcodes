jQuery(document).ready(function ($) {
    jQuery(document).on('click', '.iconInner', function (e) {
        jQuery(this).parents('.botIcon').addClass('showBotSubject');
        $("[name='msg']").focus();
    });

    jQuery(document).on('click', '.closeBtn, .chat_close_icon', function (e) {
        jQuery(this).parents('.botIcon').removeClass('showBotSubject');
        jQuery(this).parents('.botIcon').removeClass('showMessenger');
    });

    jQuery(document).on('submit', '#botSubject', function (e) {
        e.preventDefault();

        jQuery(this).parents('.botIcon').removeClass('showBotSubject');
        jQuery(this).parents('.botIcon').addClass('showMessenger');
    });

    questions = {
        "1": {
            question_text: "Are you looking for ...?",
            options: [
                {
                    option_text: "Option 1",
                    follow_up: "2",
                    isEndNode: false
                },
                {
                    option_text: "Option 2",
                    follow_up: "2",
                    isEndNode: false
                },
                {
                    option_text: "Option 3",
                    follow_up: "2",
                    isEndNode: true
                }
            ]
        }
    }


    responses = [];



    /* Chatboat Code */
    $(document).on("submit", "#messenger", function (e) {
        e.preventDefault();

        var val = $("[name=msg]").val().toLowerCase();
        var mainval = $("[name=msg]").val();
        name = '';
        TimeNow = new Date();
        nowhour = TimeNow.getHours();

        function renderQuestion(question) {

        }
        function userMsg(msg) {
            $('.Messages_list').append('<div class="msg user"><span class="avtr"><img src="./assets/images/favicon.png" style="height:25px"/></span><span class="responsText">' + mainval + '</span></div>');
        };
        function appendMsg(msg) {
            $('.Messages_list').append('<div class="msg"><span class="avtr"><figure style="background-image: url (assets/images/favicon.png)"></figure></span><span class="responsText">' + msg + '</span></div>');
            $("[name='msg']").val("");
        };


        userMsg(mainval);
        if (val.indexOf("hello") > -1 || val.indexOf("hi") > -1 || val.indexOf("good morning") > -1 || val.indexOf("good afternoon") > -1 || val.indexOf("good evening") > -1 || val.indexOf("good night") > -1) {
            if (nowhour >= 12 && nowhour <= 16) {
                appendMsg('good afternoon');
            } else if (nowhour >= 10 && nowhour <= 12) {
                appendMsg('hi');
            } else if (nowhour >= 0 && nowhour <= 10) {
                appendMsg('good morning');
            } else {
                appendMsg('good evening');
            }

            appendMsg("what's your name?");

        } else if (val.indexOf("i have problem with") > -1) {
            if (val.indexOf("girlfriend") > -1 || val.indexOf("gf") > -1) {

                appendMsg("take out your girlfriend, for dinner or movie.");
                appendMsg("is it helpful? (yes/no)");

            } else if (val.indexOf("boyfriend") > -1 || val.indexOf("bf") > -1) {
                appendMsg("bye something for him.");
                appendMsg("is it helpful? (yes/no)");
            } else {
                appendMsg("sorry, i'm not able to get you point, please ask something else.");
            }
        } else if (val.indexOf("yes") > -1) {

            var TimeNow = new Date();
            var nowhour = TimeNow.getHours();
            appendMsg("it's my pleaser that i can help you");

            saybye();
        } else if (val.indexOf("no") > -1) {

            var TimeNow = new Date();
            var nowhour = TimeNow.getHours();
            appendMsg("it's my bad that i can't able to help you. please try letter");

            saybye();
        } else if (val.indexOf("my name is ") > -1 || val.indexOf("i am ") > -1 || val.indexOf("i'm ") > -1 || val.split(" ").length < 2) {/*|| mainval != ""*/
            // var name = "";
            if (val.indexOf("my name is") > -1) {
                name = val.replace("my name is", "");
            }

            else if (val.indexOf("i am") > -1) {
                name = val.replace("i am", "");
            }

            else if (val.indexOf("i'm") > -1) {
                name = val.replace("i'm", "");
            }

            else {
                name = mainval;
            }

            // appendMsg("hi " + name + ", how can i help you?");
            appendMsg("hi " + name + ", how can i help you?");
        } else {
            appendMsg("sorry i'm not able to understand what do you want to say");
        }

        function saybye() {
            if (nowhour <= 10) {
                appendMsg(" have nice day! :)");
            } else if (nowhour >= 11 || nowhour <= 20) {
                appendMsg(" bye!");
            } else {
                appendMsg(" good night!");
            }
        }

        var lastMsg = $('.Messages_list').find('.msg').last().offset().top;
        $('.Messages').animate({ scrollTop: lastMsg }, 'slow');
    });
    /* Chatbot Code */
})