
<div id="edit_photo<?php  echo $id;?>" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
  <div class="alert alert-gray">
  Edit Photos from Gallery
  </div>
  <div class="modal-body">
  <hr>
 <form class="form-horizontal" method="POST" enctype="multipart/form-data">
  
  
								
								<input type="hidden" value="<?php echo $row['Photo_ID']; ?>"  name="Photo_ID" id="inputEmail"  placeholder="Username" required>

								
								
								 <div class="control-group">
                                    <label class="control-label" for="input01">Image:</label>
                                    <div class="controls">
                                        <input type="file" name="image" class="font" required> 
                                    </div>
                                </div>
  
   
      <?php

                            if (isset($_POST['edit_photo'])) {
							
							$Photo_ID = $_POST['Photo_ID'];

							
								 $image = addslashes(file_get_contents($_FILES['image']['tmp_name']));
                                $image_name = addslashes($_FILES['image']['name']);
                                $image_size = getimagesize($_FILES['image']['tmp_name']);

                                move_uploaded_file($_FILES["image"]["tmp_name"], "upload/" . $_FILES["image"]["name"]);
                                $location = "upload/" . $_FILES["image"]["name"];

                                mysql_query("UPDATE tbl_gallery SET Photo='$location' WHERE Photo_ID = '$Photo_ID'") or die(mysql_error());
                               header("Location:gallery_add.php");	
                            }
                            ?>
 

  </div>
  <div class="modal-footer">
    <button name="edit_photo" type="submit" class="btn btn-success"><i class="icon-pencil"></i>&nbsp;Save</button>
      <button class="btn" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i>&nbsp;Close</button>
    </form>  
  </div>
</div>

 
