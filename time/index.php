<?php
$timezone = 'Europe/London';
$now = new DateTime('now', new DateTimeZone($timezone));

if (isset($_GET['format'])) {
    if ($_GET['format'] === 'json') {
        header('Content-Type: application/json');
        echo json_encode(array('time' => $now));
    }
} else {
    ?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link href="/css/style.css" rel="stylesheet">
    <title>User:TheresNoTime</title>
  </head>
  <body>
    <div class='container text-center'>
        <div class='row'>
            <div class='col-sm pt-5'>
                <h1 class='display-2'>It's <?php echo $now->format('H:i'); ?> where I am</h1>
                <p class='lead'>That's <u><?php echo $timezone; ?></u> if you were wondering</p>
            </div>
        </div>
        <div class='row'>
            <div class='col'>
                <p>
                    [[<a href='https://www.theresnotime.co.uk'>Home</a>]]
                </p>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  </body>
</html>
    <?php
}

?>