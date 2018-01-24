 <?php include('header.php'); ?>
 <?php
 include('dbcon.php');
 include('session.php');

 ?>
 </head>
 <div class="navbar navbar-inverse">
  <div class="navbar-inner">
    <ul class="nav"> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li>
  <li><a href="admin.php">Admin</a></li>  <li class="divider-vertical"></li>
    <li><a href="product.php">Products</a></li>  <li class="divider-vertical"></li>
    <li><a href="gallery_add.php">Gallery</a></li>  <li class="divider-vertical"></li>
  <li><a href="info.php">Update Information</a></li>  <li class="divider-vertical"></li>
  <li><a href="contacts.php">Messages</a></li>  <li class="divider-vertical"></li>
  <li class="active"><a href="#.php">Views</a></li>  <li class="divider-vertical"></li>
  <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li>

  </ul>
  </div>
</div>
<body>
  <div class="container">
  <br>


  
 <div class="row-fluid">
  <div class="span12">

    <div class="row-fluid">
      <div class="span12">
	 <div class="span9">
	

<div class="alert alert-success">
<h4>Admin List</h4>
	  </div>
<legend></legend>
 <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example">


  <caption></caption>
  <thead>
    <tr>
      <th>Total Number of Visitors</th>
      <th>Total Number of Visitors per day</th>
    </tr>
	
  </thead>
  <tbody>
    <?php
	$query=mysql_query("select * from tbl_admin")or die(mysql_error());
	while($row=mysql_fetch_array($query)){
	$id=$row['User_ID'];
	
	?>
    <tr>
      <td><?php echo $row['Username'];?></td>
      <td><?php echo $row['Password'];?></td>
    </tr>
	<?php } ?> 
  </tbody> 
</table>	  



	  </div>
	  

	  <?php
	  include('session_sidebar.php');
	  ?>
	  <div class="well">
	  <a button class="btn btn-block btn-success" type="button" href="#addadmin" role="button"  data-toggle="modal"><i class="icon-edit icon-large"></i> Add Admin</button></a>
		<?php include("modal_addadmin.php");?>
	  </div>
	  </div>
    </div>
    </div>
 
</div>
  </div>
</body>

<?php   include('footer.php'); ?>
  
  
 