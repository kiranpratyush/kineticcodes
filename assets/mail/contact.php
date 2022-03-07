<?php
ini_set("include_path", '/home/kinetic1/php:' . ini_get("include_path") );
require_once "Mail.php"; 
require_once "Mail/mime.php";

    header("Access-Control-Allow-Origin: *");
    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
		$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $subject = trim($_POST["subject"]);
        $message = trim($_POST["message"]);
        $tel = trim($_POST["tel"]);
        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($subject) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Please complete the form and try again.";
            exit;
        }
        try {
            // Set the recipient email address.
            // FIXME: Update this to your desired email address.
            // $recipient = "yashchaddha@kineticcodes.com";
            $recipient = "info@kineticcodes.com";

           $crlf = "\r\n";
            $headers = array (	'From' =>  $name." <".$email.">",
                                'Return-Path' => $email,
        					'To' => $recipient ,
        					'Subject' => $subject
        					);

        	 $email_content = "<style>p { margin: 0;  padding: 0; }</style> <p> Hi $name</p>
             <br/>
             <p>Thank you for contacting Kinetic Codes. Our experts will be contacting you shortly.</p><br/>
             <p>The details submitted to us were follows.</p>
             <p>Name - $name</p>
             <p>Email - $email </p>
             <p>Subject- $subject </p>
             <p>Message - $message </p>
             <p>Phone number- $tel </p>
             <br/>
             <p>Please feel free to reach out to us in case of any further queries.</p>
             <br/>
             <p>Email - info@kineticcodes.com</p>
             <p>Phone number - +918840633587</p>
             <br/>
             <p>Regards</p>
             <p>Kinetic Codes</p>
             <p>Let's unite for future</p>
             <img src='https://kineticcodes.com/assets/images/logo/logo.png' width='120' height='60'>";
              
             // Set the email subject.
             $subject = "A contact request from $name";
            // Creating the Mime message
            $mime = new Mail_mime($crlf);

            // Setting the body of the email
            $mime->setTXTBody($email_content);
            $email_content = "<html><body>".$email_content."</body></html>";
            $mime->setHTMLBody($email_content);

            $body = $mime->get();

            $headers = $mime->headers($headers);

            // $host = "mail.kineticcodes.com";
            // $username   = 'info@kineticcodes.com';
            // $password   = 'kineticcodes@2021';
                        //Enable implicit TLS encryption
            $host = 'mail.yashchaddha.com';
            $username   = 'info@yashchaddha.com';
            $password   = 'Yash@1997Chaddha';

            $port       = 465;
            $smtp = Mail::factory('smtp',
        	array ('host' => $host,
        	'auth' => true,
        	'username' => $username,
        	'password' => $password));
        	$mail = $smtp->send($recipient, $headers, $body);

        	if (PEAR::isError($mail)) {
        	    // Set a 500 (internal server error) response code.
                  http_response_code(500);
                echo "Oops! Something went wrong and we couldn't send your message.";

            } else {
                   // Set a 200 (okay) response code.
                    http_response_code(200);
                    echo "Thank You! Your message has been sent.";

            }

        } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                http_response_code(500);
        }

        } else {
            // Not a POST request, set a 403 (forbidden) response code.
            http_response_code(403);
            echo "There was a problem with your submission, please try again.";
        }

?>
