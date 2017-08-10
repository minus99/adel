<?php
	$kyw = (isset($_GET['kyw'])) ? $_GET['kyw'] : '';
	
	if( $kyw == 'kalem' )
		require_once('sugg.php');
	else
		echo '';	
?>