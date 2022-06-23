<?php
if ( file_exists( 'db.php' ) ) {
    require_once 'db.php';
} else {
    throw new Exception( 'Update DB config', 1 );
}
$info      = json_decode( file_get_contents( 'php://input' ) );
$name      = $cn->real_escape_string( $info->name );
$check_in  = date( 'd/m/y', strtotime( $cn->real_escape_string( $info->check_in ) ) );
$check_out = date( 'd/m/y', strtotime( $cn->real_escape_string( $info->check_out ) ) );
$nid       = $cn->real_escape_string( $info->nid );
$room      = $cn->real_escape_string( $info->room );
$btn_name  = $info->btnName;
if ( $btn_name == 'Insert' ) {
    $query = sprintf( "INSERT INTO `bookings` (`name`, `check_in`, `check_out`, `nid`, room) VALUES('%s','%s','%s','%s','%s')", $name, $check_in, $check_out, $nid, $room );
    if ( $cn->query( $query ) ) {
        echo 'Data Inserted';
    } else {
        echo 'Data Not Inserted';
    }
}
if ( $btn_name == 'Update' ) {
    $id    = $info->id;
    $query = sprintf( "UPDATE `bookings` SET `name` = '%s', `check_in` = '%s',  `nid` = '%s', check_out = '%s', room='%s'  WHERE id =%s", $name, $check_in, $nid, $check_out, $room, $id );
    try {
        if ( $cn->query( $query ) ) {
            echo 'Data Updated';
        } else {
            echo 'Data Not Updated';
        }
    } catch ( \Throwable $th ) {
        throw $th;
    }

}
