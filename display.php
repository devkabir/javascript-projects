<?php
if (file_exists('db.php')) {
    require_once 'db.php';
} else {
    throw new Exception("Update DB config", 1);
}
$output = array();
$query  = "SELECT * FROM bookings";
$result = $cn->query( $query );
if ( $result->num_rows > 0 ) {
    while ( $row = $result->fetch_assoc() ) {
        $output[] = $row;
    }
}
echo json_encode( $output );

