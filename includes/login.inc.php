<?php
if (isset($_POST["submit"])) {
    $UserName = $_POST["name"];
    $password = $_POST["password"];
    require_once 'db.inc.php';
    require_once 'functions.inc.php';
    if (EmptyInputLogin($UserName,$password)!== false){
        header("location: ../login.php?error=EmptyInputs");
        exit();  
    }
    loginUser($conn,$UserName,$password);
}
else{
    header("location: ../login.php");
        exit();
}
?>