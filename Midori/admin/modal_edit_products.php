
<!-- Modal -->
<div id="edit_products<?php echo  $id; ?>" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-header">
<div class="alert alert-gray">	
  Edit Product
  </div>

<div class="modal-body">
<hr>
                  <form class="form-horizontal" method="POST" enctype="multipart/form-data">
    <div class="control-group">
    <label class="control-label" for="inputEmail">Product Name:</label>
    <div class="controls">
    <input name="Product_ID" value="<?php echo $product['product_id']?>" type="hidden" id="inputEmail" placeholder="ID">
    <input name="name" value="<?php echo $product['product_title']; ?>" type="text" id="inputEmail" placeholder="Product Name">
    </div>
    </div>
	 <div class="control-group">
    <label class="control-label" for="inputPassword">Description:</label>
    <div class="controls">
	<textarea rows="2" class="span9" placeholder="Description" name="desc"><?php echo $product['product_desc']; ?></textarea>  
    </div>
    </div>
	 <div class="control-group">
    <label class="control-label" for="inputPassword">Price:</label>
    <div class="controls">
    <input name="price" value="<?php echo $product['product_price']; ?>" type="text" id="inputEmail" placeholder="Price">
    </div>
    </div>	
	
	<input type="hidden" value="<?php echo $product['product_image']; ?>"  name="Photo" id="inputEmail"  placeholder="Photo">
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
	$Product_ID = $_POST['product_id'];
	$nm = $_POST['product_title'];
	$descr = $_POST['product_desc'];
	$price = $_POST['product_price'];
	
								 $image = addslashes(file_get_contents($_FILES['image']['tmp_name']));
                                $image_name = addslashes($_FILES['image']['name']);
                                $image_size = getimagesize($_FILES['image']['tmp_name']);

                                move_uploaded_file($_FILES["image"]["tmp_name"], "upload/" . $_FILES["image"]["name"]);
                                $photo = "upload/" . $_FILES["image"]["name"];

	
	mysql_query("update products set product_title='$nm' , product_desc='$descr', product_price='$price', product_image='$photo' where product_id = '$Product_ID' ")or die(mysql_error());
	header('location:product.php');
	}
	?>
	
	
</div>

</div>