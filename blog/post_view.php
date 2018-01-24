<?php
include 'mysql.php';
$result = mysql_safe_query('SELECT * FROM posts WHERE id=%s LIMIT 1', $_GET['id']);

if(!mysql_num_rows($result)) {
	echo 'Post #'.$_GET['id'].' not found';
	exit;
}

$row = mysql_fetch_assoc($result);
echo '<h2>'.$row['title'].'</h2>';
echo '<em>Posted '.date('F j<\s\up>S</\s\up>, Y', $row['date']).'</em><br/>';
echo nl2br($row['body']).'<br/>';
?>
<?php $pp=$row['image']; 
$pp="WIN_20171126_165318.JPG";
?>
<img src="video/WIN_20171126_165318.JPG" width="100px">
<?php
echo '<br/><a href="index.php">View All</a>';


$result = mysql_safe_query('SELECT * FROM comments WHERE post_id=%s ORDER BY date ASC', $_GET['id']);
echo '<ol id="comments">';
while($row = mysql_fetch_assoc($result)) {
	echo '<li id="post-'.$row['id'].'">';
	echo (empty($row['website'])?'<strong>'.$row['name'].'</strong>':'<a href="'.$row['website'].'" target="_blank">'.$row['name'].'</a>');
	echo ' (<a href="comment_delete.php?id='.$row['id'].'&post='.$_GET['id'].'">Delete</a>)<br/>';
	echo '<small>'.date('j-M-Y g:ia', $row['date']).'</small><br/>';
	echo nl2br($row['content']);
	echo '</li>';
}
echo '</ol>';

?>
