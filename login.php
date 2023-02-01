<?php
session_start();
?>
<!Doctype html>
<html>
    <head>
        <meta charset="utf-8">  
        <title>Super strona</title>
        <link rel="stylesheet" href="css/style1.css">
    </head>
    <body>
        <div id="container"> 
        <div id="header">
            <a href="signup.php">zarejestruj sie</a>
        </div>
        <div id="main">
            <form action="includes/login.inc.php" method="post">
             <input type="text" name="name" placeholder="Username/Email...">
             <input type="password" name="password" placeholder="password...">
             <button type="submit" name="login">Zaloguj się</button>
            </form>
            <?php
            require_once 'includes/db.inc.php';
            require_once 'includes/functions.inc.php';
    if (isset($_GET["error"])) {
        if ($_GET["error"]=="EmptyInputs") {
            echo "<p> Wypełnij wszystkie pola! </p>";
        }
        else if ($_GET["error"]=="WrongLogin") {
            echo "<p> Niepoprawny Login </p>";
        }
        else if ($_GET["error"]=="InvalidEmail") {
            echo "<p> Niepoprawny email </p>";
        }
    }
    if (isset($_SESSION["UserName"])) {
        # code...
        echo "dziala";
    }else{
        echo "niedziala";
    }
    ?>
        </div>
        <div id="footer">AS</div>
    </div>
    </body>
</html>