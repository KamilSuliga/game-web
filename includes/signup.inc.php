<?php
if(isset($_POST["submit"])){
    $name=$_POST["name"];
    $LastName=$_POST["LastName"];
    $UserName=$_POST["UserName"];
    $Email=$_POST["email"];
    $password=$_POST["password"];
    $repeatPwd=$_POST["RepeatPwd"];
    
    require_once 'db.inc.php';
    require_once 'functions.inc.php';
    if(EmptyInputSignup($name,$LastName,$UserName,$Email,$password,$repeatPwd)!==false){
        header("location: ../signup.php?error=emptyinput");
        exit();
    }
    if(invalidUid($UserName)!==false){
        header("location: ../signup.php?error=InvalidUid");
        exit();  
    }
    if(invalidEmail($Email)!==false){
        header("location: ../signup.php?error=InvalidEmail");
        exit();  
    }
    if(PwdMatch($password,$repeatPwd)!==false){
        header("location: ../signup.php?error=PasswordsDontMatch");
        exit();  
    }
    if(UidExists($conn,$UserName,$Email)!==false){
        header("location: ../signup.php?error=UsernameTaken");
        exit();  
    }
    createUser($conn,$name,$LastName,$UserName,$Email,$password);
}
else{
header("location: ../signup.php");
}
?>