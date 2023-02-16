<?php
session_start();
?>
<!Doctype html>
<html>
    <head>
        <meta charset="utf-8">  
        <title>GameLand</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <div id="container"> 
        <div id="header">
            <div id="menu">
            <div class="button"><br><a href="login.php">Zaloguj się</a></div>
            <div class="button"><br><a href="signup.php">Zarejestruj się</a></div>
</div>
        </div>
        <div id="main">
            <div id="form">
                
            <form action="includes/signup.inc.php" method="post"><br>
            <h1>Załóż konto </h1><br>
                <input type="text" name="name" placeholder="name..."><br>
                <input type="text" name="LastName" placeholder="last name..."><br>
                <input type="text" name="UserName" placeholder="username..."><br>
                <input type="text" name="email" placeholder="email"><br>
                <input type="password" name="password" placeholder="password"><br>
                <input type="password" name="RepeatPwd" placeholder="repeat password"><br>
                <button type="submit" name="submit" id="przycisk">zarejestruj się</button>
            </form>
</div>
            <?php
    if (isset($_GET["error"])) {
        if ($_GET["error"]=="emptyinput") {
            echo "<p> Wypełnij wszystkie pola! </p>";
        }
        else if ($_GET["error"]=="InvalidUid") {
            echo "<p> Niepoprawny nick </p>";
        }
        else if ($_GET["error"]=="InvalidEmail") {
            echo "<p> Niepoprawny email </p>";
        }
        else if ($_GET["error"]=="PasswordsDontMatch") {
            echo "<p> Hasło się nie zgadza </p>";
        }
        else if ($_GET["error"]=="UsernameTaken") {
            echo "<p> Nazwa jest już zajęta </p>";
        }
        elseif ($_GET["error"]=="none") {
            echo "<p>udało ci się zarejestrować</p>";
        }
    }
    
    ?>


    </body>
</html>