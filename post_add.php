<?php
if(!empty($_POST)) {
	
	include 'mysql.php';
		@$image1=$_POST['image1'];
		@ $name1=$_FILES['image1']['name'];
 @ $type=$_FILES['image1']['type'];
  @ $cname1=str_replace(" ","_",$name1);
  @ $tmp_name=$_FILES['image1']['tmp_name'];
   
	@ $target_path2="video/".$cname1;
		if(move_uploaded_file($_FILES['image1']['tmp_name'],$target_path2))
    {
	if(mysql_safe_query('INSERT INTO posts (title,body,date,image) VALUES (%s,%s,%s,%s)', $_POST['title'], $_POST['body'], time(),$cname1))
		echo 'Entry posted. <a href="post_view.php?id='.mysql_insert_id().'">View</a>';
	else
		echo mysql_error();
}}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">
  <h2>RED 5 BLOG</h2>
  <p>The form below contains two input elements; one of type text and one of type password:</p>
  <form  action="" name="sentMessage"  enctype="multipart/form-data" id="contactForm" method="post" novalidate="">  
    <div class="form-group">
     
    
    </div>
    <div class="form-group">
      <label for="pwd">Insert The title of Post</label>
      <input type="text" class="form-control" name="title" id="title" >
    </div>
	 
    <div class="form-group">
      <label for="comment">Insert The Body of Post</label>
      <textarea class="form-control" rows="5" id="comment" name="body" id="body"></textarea>
    </div>
	 <div class="form-group">
     <input type="file" name="image1" >
   
    </div>
<input type="submit" value="Post" />
  </form>
</div>

</body>
</html>




