 <?php
 include('dbcon.php');
 include('session.php');

 ?>
<?php include('header.php');
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
  <li><a href="drinks.php">Drinks</a></li>
  <li><a href="contacts.php">Reviews</a></li>
  <li><a href="reviews.php">Contacts</a></li>
  </ul>
 
	  </div> 
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
<?php include('header.php'); ?>
<?php include('footer.php'); ?>
 <?php
  include('logout_modal.php');
  ?>