<?php
if (file_exists('db.php')) {
    require_once 'db.php';
} else {
    throw new Exception("Update DB config", 1);
}
$data    = json_decode(file_get_contents("php://input"));
$id   	= 	$data->id;
$query 	= sprintf("DELETE FROM bookings WHERE id='%s'", $id);
if ($cn->query($query)) {
    echo 'Data Deleted';
} else {
    echo 'Data Not Deleted';
}

