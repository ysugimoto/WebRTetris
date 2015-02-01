<!doctype html>
<html><head>
    <meta charset="UTF-8">
    <script type="text/javascript">
        if ( window.opener && window.opener.authCallback ) {
            window.opener.authCallback(<?php echo $json;?>);
        } else {
            alert("Unexpcted process.");
        }
        window.close();
    </script>
</head></html>
