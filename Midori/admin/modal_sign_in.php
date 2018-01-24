


<div id="#signin" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-header">
</div>						
				
								    <form class="form-horizontal" method="POST" >
	<div class="modal-body">
    <div class="control-group">
    <label class="control-label" for="inputEmail">Username</label>
    <div class="controls">
    <input type="text" name="username" id="inputEmail" placeholder="Username">
    </div>
    </div>
    <div class="control-group">
    <label class="control-label" for="inputPassword">Password</label>
    <div class="controls">
    <input type="password" name = "password" id="inputPassword" placeholder="Password">
    </div>
    </div>
    <div class="control-group">
    <div class="controls">
    <button type="submit" name="login" class="btn btn-warning btn-large"></i>&nbsp;Login</button>
    </div>
	<div class="modal-footer">
<button class="btn btn-large" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i>&nbsp;Close</button>
</div>
</div>

				
    </div>
   
	


	
    </form>
								<?php
								include('admin/dbcon.php');
								if (isset($_POST['login'])){
					
								$username = $_POST['username'];
								$password = $_POST['password'];
								$query = "SELECT * FROM alumni WHERE username='$username' AND password='$password' and status = 'Registered' ";
								$result = mysql_query($query)or die(mysql_error());
								$num_row = mysql_num_rows($result);
									$row=mysql_fetch_array($result);
									if( $num_row > 0 ) { ?>
											
											<script>
						
							window.location ="dasboard.php";
							</script>
										<?php
													session_start();
								$_SESSION['id']=$row['alumni_id'];
									}
									else{ ?>
							<script>
						/* 	alert('Access Denied');
							window.location ="index.php"; */
							</script>
							<br>
							<br>
							<div class="login-error">
								Username or Password is invalid!
							</div>
								<?php
								}}
								?>	
    </div>
						
							</div>
						</div>