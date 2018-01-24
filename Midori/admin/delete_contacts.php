<?php 

include('dbcon.php');
$id=$_GET['id'];


mysql_query("delete  from tbl_contacts where Name_ID='$id'")or die(mysql_error());
header('location:contacts.php');
?>