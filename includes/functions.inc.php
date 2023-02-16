<?php
function EmptyInputSignup($name,$LastName,$UserName,$Email,$password,$repeatPwd){
    $result;
if(empty($name)||empty($LastName)||empty($UserName)||empty($Email)||empty($password)||empty($repeatPwd)){
$result=true;

}
else{
    $result=false;
}
return $result;
}
function invalidUid($UserName){
    $result;
if(!preg_match("/^[a-zA-Z0-9]*$/",$UserName)){
$result=true;

}
else{
    $result=false;
}
return $result;
}
function invalidEmail($Email){
    $result;
if(!filter_var($Email,FILTER_VALIDATE_EMAIL)){
$result=true;

}
else{
    $result=false;
}
return $result;
}
function PwdMatch($password,$repeatPwd){
    $result;
if($password!==$repeatPwd){
$result=true;

}
else{
    $result=false;
}
return $result;
}
function UidExists($conn,$UserName,$Email){
    $sql= "SELECT * FROM users WHERE Uid = ? OR Email = ?;";
    $stmt= mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt,$sql)){
        header("location: ../signup.php?error=UserExist");
        exit();
    }
    mysqli_stmt_bind_param($stmt,"ss",$UserName,$Email);
    mysqli_stmt_execute($stmt);
    $resultData = mysqli_stmt_get_result($stmt);
    if ($row = mysqli_fetch_assoc($resultData)) {
        return $row;
    }
    else{
    $result=false;
    return $result;
}
mysqli_stmt_close($stmt);
}


function createUser($conn,$name,$LastName,$UserName,$Email,$password){
    $sql= "INSERT INTO users (name,LastName,Uid,Email,PWD) VALUES (?,?,?,?,?);";
    $stmt= mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt,$sql)){
        header("location: ../signup.php?error=stmtfailed");
        exit();
    }
    
    $hashedPassword=password_hash($password,PASSWORD_DEFAULT);
    mysqli_stmt_bind_param($stmt,"sssss",$name,$LastName,$UserName,$Email,$hashedPassword);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    header("location: ../main.html?error=none");
    exit();
}
function loginUser($conn,$UserName,$password){
    $uidexist = UidExists($conn,$UserName,$UserName);
    if ($uidexist === false) {
    header("location: ../login.php?error=WrongLogin");
    exit();
    }
    function EmptyInputLogin($UserName,$password){
        $result;
    if(empty($name)||empty($password)){
    $result=true;
    header("location: ../login.php?error=EmptuInputs");
    exit();
    
    }
    else{
        $result=false;
    }
    return $result;
    }
   
    $pwdhashed = $uidexist["PWD"];
    $checkPWD= password_verify($password,$pwdhashed);
    if ($checkPWD === false) {
        header("location: ../test2.php");
        exit();
    }elseif ($checkPWD === true) {
       session_start();
       $_SESSION["userid"] = $uidexist["id"];
       $_SESSION["UserName"] = $uidexist["Uid"];
       header("location: ../test.php"); 
    }
}
?>