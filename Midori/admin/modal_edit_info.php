
<!-- Modal -->
<div id="edit_blog<?php echo  $id; ?>" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-header">
<div class="alert alert-gray">
  Edit Blog
  </div>

<div class="modal-body">
<hr>
                  <form class="form-horizontal" method="POST" enctype="multipart/form-data">
    <div class="control-group">
    <label class="control-label" for="inputEmail">Blog Title:</label>
    <div class="controls">
    <input name="id" value="<?php echo $row['Information_ID']; ?>" type="hidden" id="inputEmail" placeholder="ID">
    <input name="title" value="<?php echo $row['Title']; ?>" type="text" id="inputEmail" placeholder="Blog Title">
    </div>
    </div>
    <div class="control-group">
    <label class="control-label" for="inputPassword">Content:</label>
    <div class="controls">
	<textarea rows="7" class="span8" placeholder="Write your blogs here..!" name="content"><?php echo $row['Content']; ?></textarea>  
    </div>
    </div>
	
		
	<input type="hidden" value="<?php echo $row['Photo']; ?>"  name="Photo" id="inputEmail"  placeholder="Photo" required>
	<div class="control-group">
      <label class="control-label" for="input01">Photo:</label>
     <div class="controls">
     <input type="file" name="image" class="font"> 
      </div>
      </div>
  
   
	 <div class="modal-footer">
	<button name="edit" type="submit" class="btn btn-large btn-warning"><i class="icon-save"></i>&nbsp;Save</button>
	<button class="btn btn-large" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i>&nbsp;No</button>
    </div>
    </form>
	
	
			<?php
	if (isset($_POST['edit'])){
	$id = $_POST['id'];
	$title = $_POST['title'];
	$con = $_POST['content'];
	
	
								 $image = addslashes(file_get_contents($_FILES['image']['tmp_name']));
                                $image_name = addslashes($_FILES['image']['name']);
                                $image_size = getimagesize($_FILES['image']['tmp_name']);

                                move_uploaded_file($_FILES["image"]["tmp_name"], "upload/" . $_FILES["image"]["name"]);
                                $photo = "upload/" . $_FILES["image"]["name"];

	
	mysql_query("update tbl_blogs set Blog_Title = '$title' , Blog_Content = '$con', Photo='$photo' where Blog_ID = '$id' ")or die(mysql_error());
	header('location:blogs.php');
	
	}
	?>
	
	
</div>

</div>