  <!DOCTYPE html>
<html>
<link rel="icon" href="images/logo.png" type="image" />
<head>
</head>

<body>
 <?php
 include('dbcon.php');
 include('session.php');

 ?>

  <div class="container">
  <br>
<div class="alert alert-info">

  <a href="#"> Welcome:
<strong>
 
  </strong></a> <a href="#"><i class="icon-heart"></i></a>
 
  <br>
</div>  
 <div class="row-fluid">
  <div class="span12">

    <div class="row-fluid">
      <div class="span12">
	 <div class="span9">
	   <div class="hero-unit-white1">
      <ul class="nav nav-tabs">
  <li><a href="admin.php">Admin</a></li>
  <li><a href="blogs.php">Blogs</a></li>
  <li><a href="gallery_add.php">Gallery</a></li>
  <li><a href="product.php">Desserts</a></li>
  <li class="active"><a href="drinks.php">Drinks</a></li>
  <li><a href="contacts.php">Reviews</a></li>
  <li><a href="reviews.php">Contacts</a></li>
</ul>
<div class="alert alert-gray">
<h4>Drinks</h4>
	  </div>
	  
 <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example">
 
  <thead>
    <tr>
      <th width="120">Drinks Name</th>
      <th>Description</th>
      <th>Price</th>
      <th>Photo</th>
      <th width="180">Action</th>
    </tr>
  </thead>
  <tbody>
  
  <?php
	$query=mysql_query("select * from tbl_drinks")or die(mysql_error());
	while($drinks=mysql_fetch_array($query)){
	$id=$drinks['Drinks_ID'];
	include('modal_delete_drinks.php');	
	?>
    <tr>
      <td><?php echo $drinks['Name']; ?></td>
	  <td width=""><?php echo $drinks['Description']; ?></td>
      <td width="50">&#8369;<?php echo $drinks['Price']; ?></td>
      <td width="100"><img class="img-rounded" src="<?php echo $drinks['Photo']; ?>" width="100"></td>
	<td width="90"> <a href="#edit_drinks<?php  echo $id;?>"  data-toggle="modal"  class="btn btn-warning" ><i class="icon-pencil icon-large"></i>&nbsp; Edit</a>
	<a data-toggle="modal" href="#<?php echo $id; ?>" class="btn btn-danger">  <i class="icon-trash icon-large"></i>&nbsp;Delete</a></td>
      <?php include('modal_edit_drinks.php')  ?>
	  
    </tr>
	  <?php } ?>
  </tbody>

  </table>

	  </div> 
	  </div>
	  
	  
	  <?php
	  include('session_sidebar.php');
	  ?>
	   <div class="hero-unit-white1">
	  <a button class="btn btn-mini btn-block btn-success" type="button" href="#adddrinks" role="button"  data-toggle="modal"><i class="icon-pencil"></i> Add Drinks</button></a>
	  </div>
	  
	   
	  </div>
    </div>
  </div>
</div>
  </div>
</body>
</html>
<?php include('header.php'); ?>
 <?php
  include('logout_modal.php');
  include('modal_adddrinks.php');
  ?>