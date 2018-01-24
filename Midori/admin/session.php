<?php
include('dbcon.php');
session_start();
if (!isset($_SESSION['User_ID'])){
header('location:index.php');
}
?>