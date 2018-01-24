<!DOCTYPE html>
<html>
<head>
<?php include("header.php");?>
 <?php
 include('dbcon.php');
 include('session.php');

 ?>

</head>
  <div class="navbar navbar-inverse">
  <div class="navbar-inner">
    <ul class="nav"> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li>
  <li><a href="admin.php">Admin</a></li>  <li class="divider-vertical"></li>
    <li  class="active"><a href="product.php">Products</a></li>  <li class="divider-vertical"></li>
    <li><a href="gallery_add.php">Blog</a></li>  <li class="divider-vertical"></li>
 
  
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
<h4>Products</h4>
	  </div>
	  
 <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example">
 
  <thead>
    <tr>
      <th>Food Name</th>
      <th>Description</th>
      <th>Price</th>
      <th>Photo</th>
      <th width="180">Action</th>
    </tr>
  </thead>
  <tbody>
  
  <?php
	$query=mysql_query("select * from products")or die(mysql_error());
	while($product=mysql_fetch_array($query)){
	$id=$product['product_id'];

	?>
	
    <tr>
      <td><?php echo $product['product_title']; ?></td>
	  <td><?php echo $product['product_desc']; ?></td>
      <td><?php echo $product['product_price']; ?></td>
      <td width="100"><img class="img-rounded" src="../../justtest/product_images/<?php echo $product['product_image'];?>" width="100"></td>
	  
      <td> <a href="#edit_products<?php  echo $id;?>"  data-toggle="modal"  class="btn btn-warning" ><i class="icon-pencil icon-large"></i>&nbsp; Edit</a>
	<a href="#delete<?php echo $id; ?>" a data-toggle="modal" class="btn btn-danger">  <i class="icon-trash icon-large"></i>&nbsp;Delete</a></td>
	
	<?php 
	include('modal_delete_product.php');
	?>
	<?php 
	include('modal_edit_products.php');
	?>
	
	
	  <?php } 
	  
?>
    </tr>
	
  </tbody>
  </table>

	  </div> 

	  
	  
	  <?php
	  
	  include('session_sidebar.php');
	  ?>
	   <div class="well">
	  <a button class="btn btn-block btn-success" type="button" href="#adddessert" role="button"  data-toggle="modal"><i class="icon-pencil"></i> Add Products</button></a>
	   <?php
  include('modal_addproduct.php');
  ?>
	  </div>
	  
	  </div>
    </div>
  </div>
</div>
  </div>
</body>
</html>
<?php include('footer.php'); ?>