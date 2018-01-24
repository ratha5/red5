 <?php
 include('dbcon.php');
 include('session.php');

 ?>
<?php include('header.php'); ?> 

</head>
  <div class="navbar navbar-inverse">
  <div class="navbar-inner">
    <ul class="nav"> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li>
  <li><a href="admin.php">Admin</a></li>  <li class="divider-vertical"></li>
    <li><a href="product.php">Products</a></li>  <li class="divider-vertical"></li>
    <li><a href="gallery_add.php">Gallery</a></li>  <li class="divider-vertical"></li>
  <li class="active"><a href="info.php">Update Information</a></li>  <li class="divider-vertical"></li>
  <li><a href="contacts.php">Messages</a></li>  <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li> <li class="divider-vertical"></li>
</ul>
  </div>
</div>
<body>
  <div class="container">
  <br>
 <div class="row-fluid">

    <div class="row-fluid">
      <div class="span12">
	 <div class="span9">

<div class="alert alert-success">
<h4>Update Information</h4>
	  </div>

<table class="table table-bordered" id="example">
  <caption></caption>
   <thead>
    <tr>
      <th>Title</th>
      <th>Content</th>
      <th>Photo</th>
      <th width="180">Action</th>
    </tr>
  </thead>
 
  <tbody>
    <?php
	$query=mysql_query("select * from tbl_info")or die(mysql_error());
	while($row=mysql_fetch_array($query)){
	$id=$row['Information_ID'];
	 include('modal_delete_info.php');
	?>
	
  
    <tr>
      <td><?php echo $row['Title']; ?></td>
      <td><?php echo $row['Content']; ?></td>
      <td><img src="<?php echo $row['Photo']; ?>"  width="180"/></td>
     	<td> <a href="#edit_blog<?php  echo $id;?>"  data-toggle="modal"  class="btn btn-warning" ><i class="icon-pencil icon-large"></i>&nbsp; Edit</a>
	<a data-toggle="modal" href="#delete_info<?php echo $id; ?>" class="btn btn-danger">  <i class="icon-trash icon-large"></i>&nbsp;Delete</a>
	 <?php include('modal_edit_info.php'); ?>
	</td>
    </tr>
	 <?php } ?>	
  </tbody>

</table>

	  </div> 
	  
	  
	  <?php
	  include('session_sidebar.php');
	  ?>
	   <div class="well">
	  <a button class="btn btn-block btn-success" type="button" href="#addinfo" role="button"  data-toggle="modal"><i class="icon-pencil"></i> Add Information</button></a>

 <?php
    include('modal_addinfo.php');

  ?>
	  </div>
	  
	  </div>
    </div>
  </div>
</div>
  </div>
   
</body>
</html>
<?php   include('footer.php'); ?>

  
  
  
  