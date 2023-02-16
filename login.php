<?php
session_start();
$error = '';

if (isset($_POST['submit'])) {
    if (empty($_POST['username']) || empty($_POST['password'])) {
        $error = "Wprowadź nazwę użytkownika i hasło";
    }
    else {
        $username = $_POST['username'];
        $password = $_POST['password'];

        $conn = mysqli_connect("localhost", "root", "", "project");
        $query = "SELECT PWD FROM users WHERE Uid = '$username'";
        $result = mysqli_query($conn, $query);
        if ($row = mysqli_fetch_assoc($result)) {
        $hashed_password_from_database = $row["PWD"];
        }
        if (password_verify($password, $hashed_password_from_database)) {
        }  
        $username = stripslashes($username);
        $username = mysqli_real_escape_string($conn, $username);
        $password = mysqli_real_escape_string($conn, $password);

        $query = "SELECT * FROM users WHERE Uid='$username'";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) == 1 && password_verify($password, $hashed_password_from_database)) {
            $_SESSION['login_user'] = $username;
            header("location: main.html");
        } else {
            $error = "Nazwa użytkownika lub hasło są nieprawidłowe";
        }

        mysqli_close($conn);
    }
}
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
            <form action="" method="post">
            <h1>Witaj w GAMELAND </h1><br>
             <input type="text" name="username" placeholder="username..."><br>
             <input type="password" name="password" placeholder="password..."><br>
             <button type="submit" name="submit">Zaloguj się</button>
            </form>
        </div>

    </body>
</html>