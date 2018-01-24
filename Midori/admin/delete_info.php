<?php 

include('dbcon.php');
$id=$_GET['id'];


mysql_query("delete  from tbl_info where Information_ID='$id'")or die(mysql_error());
header('location:info.php');
?>