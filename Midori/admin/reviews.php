 <?php
 include('dbcon.php');
 include('header.php');
 include('session.php');

 ?>
   <div class="navbar navbar-inverse">
  <div class="navbar-inner">
    <ul class="nav"> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li>
  <li><a href="admin.php">Admin</a></li>  <li class="divider-vertical"></li>
    <li><a href="product.php">Products</a></li>  <li class="divider-vertical"></li>
    <li><a href="gallery_add.php">Gallery</a></li>  <li class="divider-vertical"></li>
  <li class="active"><a href="info.php">Update Information</a></li>  <li class="divider-vertical"></li>
  <li><a href="contacts.php">Reviews</a></li>  <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li>
</ul>
  </div>
</div>
 
 
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


<div class="alert alert-gray">
<h4>Reviews</h4>
	  </div>
<legend></legend>
<table class="table table-hover table-striped table-bordered" id="example">




  <caption></caption>
  <thead>
    <tr>
      <th>Name</th>
      <th>Reviews</th>
      <th>Action</th>
    </tr>
	
  </thead>
  <tbody>
    <?php
	$query=mysql_query("select * from tbl_reviews ORDER by Review_ID DESC")or die(mysql_error());
	while($row=mysql_fetch_array($query)){
	$id=$row['Review_ID'];
	include('modal_delete_reviews.php');
	?>
    <tr>
      <td><?php echo $row['Name'];?></td>
      <td><?php echo $row['Review'];?></td>
     
	<td><a data-toggle="modal" href="#<?php echo $id; ?>" class="btn btn-danger">  <i class="icon-trash icon-large"></i>&nbsp;Delete</a></td>
	 
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
	  <a button class="btn btn-mini btn-block btn-success" type="button" href="#addreviews" role="button"  data-toggle="modal"><i class="icon-pencil"></i> Add Review</button></a>

	  </div>
	  </div>
    </div>
    </div>
 
</div>
  </div>
</body>

<?php include('header.php'); ?>
<?php   include('footer.php'); ?>
 <?php
  include('logout_modal.php');
  include('modal_addreviews.php');

  ?>
  
  