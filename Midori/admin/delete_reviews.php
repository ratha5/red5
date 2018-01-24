<?php 

include('dbcon.php');
$id=$_GET['id'];


mysql_query("delete  from tbl_reviews where Review_ID='$id'")or die(mysql_error());
header('location:reviews.php');
?>