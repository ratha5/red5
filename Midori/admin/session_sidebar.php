<div class="span3">  

	  <div class="alert alert-success">
	     Welcome:
	    <?php 
 $User_ID=$_SESSION['User_ID'];
$result=mysql_query("select * from tbl_admin where User_ID='$User_ID'")or die(mysql_error);
$row=mysql_fetch_array($result);

$Full_Name=$row['Full_Name'];

echo $Full_Name; 
  
  ?>
	  </div>
	   <div class="well">
	   <a button class="btn btn-block btn-danger" type="button" href="#myModal" role="button"  data-toggle="modal"><i class="icon-signout icon-large"></i> Sign Out</button></a>
	<?php include("logout_modal.php");?>
	  </div>