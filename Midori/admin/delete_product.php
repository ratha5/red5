<?php 

include('dbcon.php');
$id=$_GET['dessert'];


mysql_query("delete  from products where product_id='$id'")or die(mysql_error());
header('location:product.php');
?>