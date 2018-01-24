<?php 

include('dbcon.php');
$id=$_GET['id'];


mysql_query("delete  from tbl_gallery where Photo_ID='$id'")or die(mysql_error());
header('location:gallery_add.php');
?>