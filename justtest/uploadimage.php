
<?php
	
	@$con=mysql_connect("localhost","root","");
	
	
	@$image1=$_POST['image1'];
	
	
mysql_select_db("DATABASE",$con);
	  if (isset($_REQUEST['upload']))

	@ $name1=$_FILES['image1']['name'];
 @ $type=$_FILES['image1']['type'];
  @ $cname1=str_replace(" ","_",$name1);
  @ $tmp_name=$_FILES['image1']['tmp_name'];
   
	@ $target_path2="video/".$cname1;
	 
	 
 
   	if(move_uploaded_file($_FILES['image1']['tmp_name'],$target_path2))
    {
		
    
		$success="Your Request Has Been SuccessFully Submitted";
		//echo "<script type='text/javascript'>alert('Your Products have been submitted!')</script>";
	
	
	}	
		
		?>
		
		

<div class="site-content">



</div></div>
	</div>
		<section id="contact" style="">
            <div class="container">
               
                <div class="row">
                   
                    <div class="col-md-4">
                       
                                  <form  action="" name="sentMessage"  enctype="multipart/form-data" id="contactForm" method="post" novalidate="">  
									<div class="form-group">
                                        <input type="file" name="image1" >
                                      
                                    </div>
									
									
									<div class="col-lg-12 text-center">
                                    <div id="success"></div>
                                  
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			
			<input id="mc_signup_submit" value="Send" name="upload" class="button btn btn-primary" type="submit">
			
		
                                </div>
                               
                    </div>
                </div>
				 
            </div> </form><br/><br/><br/>
        </section>	

		
			
</body></html>
