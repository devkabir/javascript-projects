<?php
$cn        = new mysqli( 'localhost', 'root', '', 'node' );
$data    = json_decode(file_get_contents("php://input"));
$id   	= 	$data->id;
$query 	= sprintf("DELETE FROM bookings WHERE id='%s'", $id);
if ($cn->query($query)) {
    echo 'Data Deleted';
} else {
    echo 'Data Not Deleted';
}

