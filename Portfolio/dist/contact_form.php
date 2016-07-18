<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
//sanitizing email
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
//After sanitization Validation is performed
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $subject = 'Message Received From ' . $name;
    // To send HTML mail, the Content-type header must be set
    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= 'From:' . $email. "\r\n"; // Sender's Email
    // $headers .= 'Cc:' . $email. "\r\n"; // Carbon copy to Sender

    $emailmessage = '<div>';
    $emailmessage .= 'Name: ' . $name . '<br/>';
    $emailmessage .= 'Email: ' . $email . '<br/>';
    $emailmessage .= 'Date Sent: ' . date('Y-m-d H:i:s') . '</br>';
    $emailmessage .= 'Message: ' . $message . '<br/>';
    $emailmessage .= '</div>';

    $sendmessage = wordwrap($emailmessage, 70);

    // Send mail by PHP Mail Function
    mail("jakeholland@me.com", $subject, $sendmessage, $headers);
    echo "True";
} else {
    echo "False";
}
?>
