 <?php
 include('dbcon.php');
 ?>
<?php include('header.php'); ?>
<div class="navbar navbar-inverse navber-fixed-top" style="background-color:black;" >

</div>
 
     
   
  <div class="container" >
  <body>
    <div class="row-fluid">
  <div class="span12">
  
	<br>
   
      <div class="span3">

    </div>

      <div class="span6">
	  <br>
	  <br>
	  <div class="well">
	  <legend>
	 <div class="alert alert-success" style="color:red;"><h4>Sign In</h4> </div>
</legend>
<form class="form-horizontal" method="POST">
  <div class="control-group">
    <label class="control-label" for="inputEmail">Username</label>
    <div class="controls">
      <input type="text" id="inputEmail" name="Username" placeholder="Username" class="span8" required>
    </div>
  </div>
  <div class="control-group">
    <label class="control-label" for="inputPassword">Password</label>
    <div class="controls">
      <input type="password" id="inputPassword" name="Password" placeholder="Password" class="span8" required>
    </div>
  </div>
  <div class="control-group">
    <div class="controls">
      
 <button type="submit" name="login" class="btn btn-success"><i class="icon-signin"></i>&nbsp;Sign in</button>
    </div>
  </div>
 <?php 
 
  if (isset($_POST['login'])) {//condition kun e click ang button
$Username=$_POST['Username'];//variable ang $Username kag ang $_POST['UserName'] ay value sang textbox nga UserName
$Password=$_POST['Password'];//variable ang $Username kag ang $_POST['Password'] ay value sang textbox nga Password
$result=mysql_query("select * from tbl_admin where Username='$Username' and Password='$Password'")or die (mysql_error());//query sang database 
		
$count=mysql_num_rows($result);//isipon kn may tyakto sa query
$row=mysql_fetch_array($result);//ma return row sa database
		
		if ($count > 0){//kun may tyakto sa query e execute yah ang code sa dalom
		session_start();//para mag start ang session
		$_SESSION['User_ID']=$row['User_ID'];//kwaon ang id sang may tyakto nga username kag password ang ibotang sa $_SESSION['member_id']
		header('location:admin.php');
		}else{
									  
                                        ?>
                                      <br>
                                            <div class="alert alert-error">
											<button type="button" class="close" data-dismiss="alert">&times;</button>
											<strong>Warning!</strong> Please check your Username and Password!
											</div>
                                        <?php
                                    }
                                }
                                ?>
</form>
    </div>
    </div>
  </div>

</div>

</body>
  <?php
include('footer.php');
?>
  </div>