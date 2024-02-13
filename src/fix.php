<?php

$passPhrase = 'IsmailIbrahim121';
$cartTotal = 5.00;
$data = [
    'merchant_id' => '21413576',
    'merchant_key' => 'ctaeyuhrxzeep',
    'return_url' => 'https://bootcamp.cibs.tech/index.php',
    'cancel_url' => 'https://bootcamp.cibs.tech/index.php',
    'notify_url' => 'https://bootcamp.cibs.tech/notify.php',
];

/**
 * @param array $data
 * @param null $passPhrase
 * @return string
 */
function generateSignature($data, $passPhrase = null)
{
    // Create parameter string
    $pfOutput = '';
    foreach ($data as $key => $val) {
        if ($val !== '') {
            $pfOutput .= $key . '=' . urlencode(trim($val)) . '&';
        }
    }
    // Remove last ampersand
    $getString = substr($pfOutput, 0, -1);
    if ($passPhrase !== null) {
        $getString .= '&passphrase=' . urlencode(trim($passPhrase));
    }
    return md5($getString);
}

function dataToString($dataArray)
{
    // Create parameter string
    $pfOutput = '';
    foreach ($dataArray as $key => $val) {
        if ($val !== '') {
            $pfOutput .= $key . '=' . urlencode(trim($val)) . '&';
        }
    }
    // Remove last ampersand
    return substr($pfOutput, 0, -1);
}

function generatePaymentIdentifier($pfParamString, $pfProxy = null)
{
    // Use cURL (if available)
    if (in_array('curl', get_loaded_extensions(), true)) {
        // Variable initialization
        $url = 'https://www.payfast.co.za/onsite/process';

        // Create default cURL object
        $ch = curl_init();

        // Set cURL options - Use curl_setopt for greater PHP compatibility
        // Base settings
        curl_setopt($ch, CURLOPT_USERAGENT, NULL);  // Set user agent
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);      // Return output as string rather than outputting it
        curl_setopt($ch, CURLOPT_HEADER, false);             // Don't include header in output
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

        // Standard settings
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $pfParamString);
        if (!empty($pfProxy))
            curl_setopt($ch, CURLOPT_PROXY, $pfProxy);

        // Execute cURL
        $response = curl_exec($ch);
        curl_close($ch);
        echo $response;
        $rsp = json_decode($response, true);
        if ($rsp['uuid']) {
            return $rsp['uuid'];
        }
    }
    return null;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootcamp Page</title>
    <link rel="stylesheet" type="text/css" href="./index.css?v=8">
    <script src="https://www.payfast.co.za/onsite/engine.js"></script>
</head>

<body>
    <div class="bootcamp-page-container">
        <a href="/" style="text-decoration: none;">
            <div class="back-button">Go back</div>
        </a>

        <div class="introduction">
            <div class="water-mark">
                Computer Skills <br /> Bootcamp
            </div>
            <div class="main-text">
                Take the first step towards your <span>cum laude honors!</span>
            </div>
            <div class="image">
                <img src="images/bootcamp-image-4.png" alt="">
            </div>

            <div class="description">
                <div>
                    As a student striving for distinctions, <span class="one">
                        mastering ITSKA (Basic Computer Skills) is your first stepping
                        stone towards academic excellence.
                    </span>
                </div>

                <div>
                    We will help you establish a solid foundation for your cum laude
                    whilst equipping you with essential computer skills!
                </div>

                <div>
                    At each bootcamp, we will guide you through the module work
                    ensuring that you get a distinction for each task. <span>Register today</span>
                    before seats run out!
                </div>
            </div>
        </div>

        <div class="bootcamp-dates">
            <!-- Bootcamp Dates content -->
            <div class="water-mark">Bootcamp Dates</div>

            <div class="tables">
                <div class="table">
                    <div class="icon-name">
                        <div class="container">
                            <div>
                                <img src='images/word-icon.png' alt="" />
                            </div>
                            <div class="info">
                                ITSKA Word <br />
                                <span>Fee: R 500</span>
                            </div>
                        </div>
                    </div>
                    <div class="bootcamp-info">
                        <table>
                            <tr>
                                <th class="remove-left-border">Content</th>
                                <th>Venue</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                            <tr>
                                
                                <td class="remove-left-border">
                                    Styling (Word week 1)
                                </td>
                                <td>Sat, 17-2-2024</td>
                                <td>Online (Teams)</td>
                                <td class="remove-right-border">8am-1pm</td>
                            </tr>

                            <tr>
                                <td class="remove-left-border">
                                    Borders and shading (Word week 2)
                                </td>
                                <td>Sat, 24-2-2024</td>
                                <td>Online (Teams)</td>
                                <td class="remove-right-border">8am-1pm</td>
                            </tr>

                            <tr>
                                <td class="remove-left-border">Tables (Word week 3)</td>
                                <td>Sat, 2-3-2024</td>
                                <td>Online (Teams)</td>
                                <td class="remove-right-border">8am-1pm</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="register-button">
                    <button onclick="scrollToRegistrationForm()">Register</button>
                </div>

                <div class="table">
                    <!-- ITSKA PowerPoint -->
                    <div class="icon-name">
                        <div class="container">
                            <div>
                                <img src="images/powerpoint-icon.png" />
                            </div>
                            <div class="info">
                                ITSKA Powerpoint <br />
                                <span>Fee: R 500</span>
                            </div>
                        </div>
                    </div>
                    <div class="bootcamp-info">
                        <table>
                            <tr>
                                <th class="remove-left-border">Content</th>
                                <th>Venue</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                            <tr>
                                <td class="remove-left-border">
                                    Styling (Word week 1)
                                </td>
                                <td>Sat, 9-3-2024</td>
                                <td>Online (Teams)</td>
                                <td class="remove-right-border">8am-1pm</td>
                            </tr>

                            <tr>
                                <td class="remove-left-border">
                                    Borders and shading (Word week 2)
                                </td>
                                <td>Sat, 16-3-2024</td>
                                <td>Online (Teams)</td>
                                <td class="remove-right-border">8am-1pm</td>
                            </tr>

                            <tr>
                                <td class="remove-left-border">Tables (Word week 3)</td>
                                <td>Sat, 23-3-2024</td>
                                <td>Online (Teams)</td>
                                <td class="remove-right-border">8am-1pm</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="register-button">
                    <button onclick="scrollToRegistrationForm()">Register</button>
                </div>

                <div class="table">
                    <!-- ITSKA Excel -->
                    <div class="icon-name">
                        <div class="container">
                            <div>
                                <img src="images/excel-icon.png" alt="" />
                            </div>
                            <div class="info">
                                ITSKA Excel <br />
                                <span>Fee: R 500</span>
                            </div>
                        </div>
                    </div>
                    <div class="bootcamp-info">
                        <table>
                            <tr>
                                <th class="remove-left-border">Content</th>
                                <th>Venue</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                            <tr>
                                <td class="remove-left-border">
                                    Styling (Word week 1)
                                </td>
                                <td>Sat, 30-3-2024</td>
                                <td>Online (Teams)</td>
                                <td class="remove-right-border">8am-1pm</td>
                            </tr>

                            <tr>
                                <td class="remove-left-border">
                                    Borders and shading (Word week 2)
                                </td>
                                <td>Sat, 6-4-2024</td>
                                <td>Online (Teams)</td>
                                <td class="remove-right-border">8am-1pm</td>
                            </tr>

                            <tr>
                                <td class="remove-left-border">Tables (Word week 3)</td>
                                <td>Sat, 13-4-2024</td>
                                <td>Online (Teams)</td>
                                <td class="remove-right-border">8am-1pm</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="register-button">
                    <button onclick="scrollToRegistrationForm()">Register</button>
                </div>
            </div>
        </div>

        <div class="past-students">
            <!-- Our Past Students content -->
            <div class="water-mark">Our Past Students</div>

            <div class="certificates">
                <div class="container">
                    <img src="images/certificate-ismael.png" alt="certificate-1" style="filter: grayscale(100%); transition: filter 0.5s;" onmouseover="addColor(this)" onmouseout="removeColor(this)" />
                    <div class="student-description">
                        Ismael obtained 86% for ITSKA in 2023 which contributed to him
                        achieving a distinction for his 1st year in BSc IT.
                        <br />
                        <br />
                        He is now on path to obtaining his <span>cum laude honours.</span>
                    </div>
                </div>

                <div class="container">
                    <img src="images/certificate-caeser.png" alt="certificate-2" style="filter: grayscale(100%); transition: filter 0.5s;" onmouseover="addColor(this)" onmouseout="removeColor(this)" />

                    <div class="student-description">
                        Caeser obtained 93% for ITSKA in 2023 which contributed to him
                        achieving a distinction for his 1st year in BSc IT.
                        <br />
                        <br />
                        He is now on path to obtaining his <span>cum laude honours.</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="registration-section">
            <!-- Registration Section content -->
            <div class="water-mark">Register today!</div>
            <div class="register-form" id="registrationForm">
                <div class="form-image">
                    <div>
                        <img src="images/form-icon.png" alt="" />
                    </div>
                </div>

                <div class="form-section">
                    <div class="water-mark">Registration</div>

                    <div class="header">ITSKA Skills Bootcamp</div>

                    <div class="note">
                        Kindly complete the registration form to reserve your spot in
                        our weekend bootcamps. Please note that <span>
                            immediate payment is necessary to finalize your registration.
                        </span> This ensures we can prepare the best possible experience for you
                        and all students.
                    </div>

                    <a id="form"></a>

                    <form action="#form" method="post">
                        <div class="name-surname">
                            <div class="name">
                                <label for="name">Name:</label>
                                <input type="text" name="name_first" id="name" placeholder="Please enter your name." required />
                            </div>
                            <div class="surname">
                                <label for="surname">Surname:</label>
                                <input type="text" name="name_last" id="surname" placeholder="Please enter your surname." required />
                            </div>
                        </div>

                        <label for="number">Phone Number</label>
                        <input type="text" name="number" id="cell_number" placeholder="Please enter your Whatsapp number" required />

                        <label for="email">Email</label>
                        <input type="email" name="email" id="email_address" placeholder="Please enter your email address (personal email)," required />

                        <label for="course">Course</label>
                        <input type="text" name="course" id="course" placeholder="Please enter the course you are currently studying." required />

                        <label for="bootcamp">Bootcamp</label>
                        <div class="custom-select" id="customSelect" onclick="toggleDropdown()">
                            Please select which bootcamp you would love to attend.
                        </div>

                        <div class="drop-down-options" id="dropdownOptions" style="display: none;">
                            <div class="option" onclick="handleOptionClick('All (Word, PowerPoint & Excel) - R1000')">All (Word, PowerPoint & Excel) - <span>R1 000</span></div>
                            <div class="option" onclick="handleOptionClick(' ITSKA Word - R500')"> ITSKA Word - <span>R500</span></div>
                            <div class="option" onclick="handleOptionClick('ITSKA PowerPoint - R500')">ITSKA PowerPoint - <span>R500</span></div>
                            <div class="option" onclick="handleOptionClick('ITSKA Excel - R500')">ITSKA Excel - <span>R500</span></div>
                        </div>

                        <input type="hidden" name="selected_bootcamp" id="selected_bootcamp_input" />
                        <input type="hidden" name="selected_bootcamp_price" id="selected_bootcamp_price_input" />

                        <div class="terms-and-conditions">
                            <label class="container" style="display: none;">
                                <input type="checkbox" name="checkbox" id="checkbox" />
                                <span class="checkmark"></span>
                            </label>

                            <div>
                                By submitting this form and completing the payment process,
                                you are acknowledging that you have read, understood, and
                                agree to our <span>terms and conditions.</span>
                            </div>
                        </div>

                        <!--<div class="error"> -->
                        <!--    Please enter your name-->
                        <!--</div>-->

                        <div class="button">
                            <button type='submit' name='paynow' id="submit">
                                Register
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>

        <img src="images/icon-1.png" alt="icon" class="icon" />


        <script>
            var selected_bootcamp = ""
            var selected_bootcamp_price = ""

            function toggleDropdown() {
                var dropdownOptions = document.getElementById('dropdownOptions');
                dropdownOptions.style.display = (dropdownOptions.style.display === 'block') ? 'none' : 'block';
            }

            function handleOptionClick(value) {
                var customSelect = document.getElementById('customSelect');
                customSelect.innerText = value;
                toggleDropdown(); // Hide dropdown after selection (you can adjust this behavior)
                selected_bootcamp = value
                selected_bootcamp_price = selected_bootcamp === "All (Word, PowerPoint & Excel) - R1000" ? "1000.00" : "500.00";
                document.getElementById('selected_bootcamp_input').value = selected_bootcamp;
                document.getElementById('selected_bootcamp_price_input').value = selected_bootcamp_price;
                console.log(selected_bootcamp_price)
            }


            window.addEventListener('beforeunload', function(event) {
                dropdownOptions.style.display = 'none'
            });


            function addColor(element) {
                element.style.filter = 'grayscale(0%)';
            }

            function removeColor(element) {
                element.style.filter = 'grayscale(100%)';
            }

            function scrollToRegistrationForm() {
                var registrationForm = document.getElementById('registrationForm');
                registrationForm.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            var mode = "production" // set to "production" if all changes are made ---> caution ---> please use development mode only if on wifi ---> 


            document.addEventListener('DOMContentLoaded', function() {
                function applyCacheBusting() {
                    var images = document.querySelectorAll('img');

                    images.forEach(function(image) {
                        var src = image.getAttribute('src');
                        if (src.indexOf('?') === -1) {
                            src += '?v=' + new Date().getTime();
                        } else {
                            src += '&v=' + new Date().getTime();
                        }
                        image.setAttribute('src', src);
                    });
                }

                var interval = mode === "development" ? 60000 : 72 * 60 * 60 * 1000;

                setInterval(applyCacheBusting, interval);
            });


            function sendEmail() {

                fetch('send-mail.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            'name_first': "Ismail",
                            'name_last': "Dlamini",
                            'email_address': "iii409475@gmail.com"
                        }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }



            var submitButton = document.getElementById('submit');
            var selected_bootcamp = document.getElementById('selected_bootcamp_input');

            submitButton.addEventListener('click', function(event) {
                var nameFirst = document.getElementById('name').value;
                var nameLast = document.getElementById('surname').value;
                var phoneNumber = document.getElementById('cell_number').value;
                var emailAddress = document.getElementById('email_address').value;
                var course = document.getElementById('course').value;

                if (nameFirst.trim() === '' || nameLast.trim() === '' || phoneNumber.trim() === '' || emailAddress.trim() === '' || course.trim() === '') {

                } else {
                    if (selected_bootcamp.value === "") {
                        event.preventDefault();
                        console.log("You are missing a value");
                        alert('Please select the Bootcamp you would love to attend');
                    } else {
                        // Continue with form submission or other actions
                    }
                }
            });
        </script>
    </div>

</body>

<?php


if (isset($_POST['paynow'])) {

    $selected_bootcamp = isset($_POST['selected_bootcamp']) ? $_POST['selected_bootcamp'] : '';
    $selected_bootcamp_price = isset($_POST['selected_bootcamp_price']) ?  '5.00' : '5.00';

    $data['name_first'] = $_POST['name_first'];
    $data['name_last'] = $_POST['name_last'];
    $data['email_address'] = $_POST['email'];
    // $data['cell_number'] = $_POST['number'];
    $data['m_payment_id'] = $randomNumber = rand(1, 1000);
    $data['amount'] = $selected_bootcamp_price;
    $data['item_name'] = $selected_bootcamp;
    $data['item_description'] = "This is registration for the computer skills bootcamp";
    // $data['custom_int1'] = $_POST['number'];
    $data['custom_str1'] = $_POST['course'];
    $data['custom_str2'] = $_POST['number'];
    $data['email_confirmation'] = "1";
    $data['confirmation_address'] = "iii409475@gmail.com";


    // Generate signature (see Custom Integration -> Step 2)
    $data["signature"] = generateSignature($data, $passPhrase);

    // Convert the data array to a string
    $pfParamString = dataToString($data);

    // Generate payment identifier
    $identifier = generatePaymentIdentifier($pfParamString);

    if ($identifier !== null) {

        echo '<script>';
        echo 'document.addEventListener("DOMContentLoaded", function() {';
        echo ' window.payfast_do_onsite_payment({"uuid":"' . $identifier . '", "return_url":"https://bootcamp.cibs.tech/index.php", "cancel_url":"https://bootcamp.cibs.tech/index.php"});';
        echo '});';
        echo '</script>';
    }
}

?>

</html>