 <?php include('header.php'); ?>
 <?php
 include('dbcon.php');
 include('session.php');

 ?>
 </head>
 <div class="navbar navbar-inverse">
  <div class="navbar-inner">
    <ul class="nav"> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li>
  <li  class="active"><a href="#">Admin</a></li>  <li class="divider-vertical"></li>
    <li><a href="product.php">Products</a></li>  <li class="divider-vertical"></li>
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
<h4>Admin List</h4>
	  </div>
<legend></legend>
 <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example">


  <caption></caption>
  <thead>
    <tr>
      <th>Username</th>
      <th>Password</th>
      <th>Full Name</th>
      <th width="180">Action</th>
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
      <td><?php echo $row['Full_Name'];?></td>
	     <td> <a href="#edit<?php  echo $id;?>"  data-toggle="modal"  class="btn btn-warning" ><i class="icon-pencil icon-large"></i>&nbsp; Edit</a>
		<?php include('modal_edit_admin.php');?>
	<a href="#delete<?php echo $id; ?>" a data-toggle="modal" class="btn btn-danger">  <i class="icon-trash icon-large"></i>&nbsp;Delete</a></td>
			<?php include('modal_delete_admin.php');?>

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
  
  
 