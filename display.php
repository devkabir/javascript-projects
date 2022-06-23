<?php
$cn        = new mysqli( 'localhost', 'root', '', 'node' );
$output = array();
$query  = "SELECT * FROM bookings";
$result = $cn->query( $query );
if ( $result->num_rows > 0 ) {
    while ( $row = $result->fetch_assoc() ) {
        $output[] = $row;
    }
}
echo json_encode( $output );

