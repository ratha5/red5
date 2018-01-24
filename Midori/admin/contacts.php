  <?php
 include('dbcon.php');
 include('session.php');

 ?>
 <?php include('header.php'); ?>
 
   <div class="navbar navbar-inverse">
  <div class="navbar-inner">
    <ul class="nav"> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li>
  <li><a href="admin.php">Admin</a></li>  <li class="divider-vertical"></li>
    <li><a href="product.php">Products</a></li>  <li class="divider-vertical"></li>
    <li><a href="gallery_add.php">Gallery</a></li>  <li class="divider-vertical"></li>
  <li><a href="info.php">Update Information</a></li>  <li class="divider-vertical"></li>
  <li class="active"><a href="contacts.php">Messages</a></li>  <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li>
</ul>
  </div>
</div>
  <div class="container">
  <br>

 <div class="row-fluid">
  <div class="span12">

    <div class="row-fluid">
      <div class="span12">
	 <div class="span9">
	  


<div class="alert alert-gray">
<h4>Messages</h4>
	  </div>	
<legend></legend>
 <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example">




  <caption></caption>
  <thead>
    <tr>
      <th>Name</th>
      <th>Subject</th>
      <th>Email</th>
	   <th width="200">Message</th>
      <th>Date and Time</th>
      <th>Action</th>
    </tr>
	
  </thead>
  <tbody>
    <?php
	$query=mysql_query("select * from tbl_contacts")or die(mysql_error());
	while($row=mysql_fetch_array($query)){
	$id=$row['Name_ID'];
	
	?>
    <tr>
      <td><?php echo $row['Name'];?></td>
      <td><?php echo $row['Subject'];?></td>
      <td><?php echo $row['Email'];?></td>
	  <td><?php echo $row['Message'];?></td>
	  <td width="100"><?php echo $row['Date_and_Time'];?></td>
	  <td width="100">
	<a data-toggle="modal" href="#<?php echo $id; ?>" class="btn btn-danger">  <i class="icon-trash icon-large"></i>&nbsp;Delete</a></td>
	
    </tr>
		<?php include('modal_delete_contacts.php');
	?>
	<?php } ?> 

  </tbody> 
  
</table>	  
	


	  </div> 

	  

	  <?php
	  include('session_sidebar.php');
	  ?>
	  
	  </div>
    </div>
    </div>
 
</div>
  </div>
</body>
</html>
<?php   include('footer.php'); ?>

  