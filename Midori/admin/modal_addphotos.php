<div id="addphotos" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
  <div class="alert alert-gray">
  Add Photos to Gallery
  </div>
  <div class="modal-body">
  <hr>
 <form class="form-horizontal" method="POST" enctype="multipart/form-data">
  
  
								
								 <div class="control-group">
                                    <label class="control-label" for="input01">Image:</label>
                                    <div class="controls">
                                        <input type="file" name="image" class="font" required> 
                                    </div>
                                </div>
  
   
 

  </div>
  <div class="modal-footer">
    <button name="save" type="submit" class="btn btn-success"><i class="icon-pencil"></i>&nbsp;Post</button>
      <button class="btn" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i>&nbsp;Close</button>
    </form>  
  </div>
</div>

    <?php
                            if (isset($_POST['save'])) {
                           
                                $image_save = addslashes(file_get_contents($_FILES['image']['tmp_name']));
                                $image_name = addslashes($_FILES['image']['name']);
                                $image_size = getimagesize($_FILES['image']['tmp_name']);

                                move_uploaded_file($_FILES["image"]["tmp_name"], "upload/" . $_FILES["image"]["name"]);
                                $location = "upload/" . $_FILES["image"]["name"];

                                mysql_query("insert into tbl_gallery (Photo) values ('$location')") or die(mysql_error());
                                header('location:gallery_add.php');
                            }
                            ?>
