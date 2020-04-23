Team Members:
>Erik Lipsky || 889876454
>Reeder Loveland || 

Erik:
Project was a lot harder than I anticipated.
I couldn't figure out how to take input data from index.html form,
and input it into an array to output with the images in uploads/ directory.
I spent over 30 hours trying to figure it out, so I never progressed to use case (1) and (3)
I probably could have figured it out if I could use a database and SQL queries.

// gallery.php

<html>

<head>
    <title>Assignment 1</title>
    <link rel="stylesheet" href="src/style.css">
</head>
<body>

    <!-- Navbar -->
    <ul>
        <li style="float:left"><a class="active" href="Home.html">Home</a></li>
        <li><a href="index.html">Upload</a></li>
        <li><a href="gallery.php">Gallery</a></li>        
    </ul>
    
    <div class="galleryBox">
        <p>View All Photos</p>
        
        <!-- 3) Sorting not implemented -->
        
        <!--
            <div class="dropdown">
            <button class="dropbtn" >Sort By</button></p>
            <div class="dropdown-content">
                <a href="#">Name</a>
                <a href="#">Date</a>
                <a href="#">Photographer</a>
                <a href="#">Location</a>
            </div> 
        -->

        <?php
        
        // declare variables
        $metaName = $metaDate = $metaPhotographer = $metaLocation = "";
        
        // initialize the count
        $count = 1;
        
        // Supported image extensions
        $image_extensions = array("png","jpg","jpeg");
                
        // Directory for uploaded files
        $directory = 'uploads/';
        
        // If a file was uploaded.
        if ($_SERVER["REQUEST_METHOD"] == "POST")
        {
            // required for CSUF server.
            move_uploaded_file($_FILES["fileToUpload"]["tmp_name"],"uploads/".$_FILES["fileToUpload"]["name"]); 
            
            // grab data from form
            $metaName = $_POST["metaName"];
            $metaDate = $_POST["metaDate"];
            $metaPhotographer = $_POST["metaPhotographer"];
            $metaLocation = $_POST["metaLocation"];
        }

        // if valid directory
        if (is_dir($directory)) {
            
            // open directory
            if ($dh = opendir($directory)) {
                     
                // Read files
                while (($file = readdir($dh)) !== false) {
                    
                    if($file != '' && $file != '.' && $file != '..') { 
                
                    // Thumbnail image path + extension
                    $thumbnail_path = "uploads/".$file;
                    $thumbnail_ext = pathinfo($thumbnail_path, PATHINFO_EXTENSION);

                    // Image path + extension
                    $image_path = "uploads/".$file;
                    $image_ext = pathinfo($image_path, PATHINFO_EXTENSION);
                
                    // Check its not folder and it is image file
                    if(!is_dir($image_path) && in_array($thumbnail_ext,$image_extensions) && in_array($image_ext,$image_extensions)) {
                    
                        ?>
                        <!--  Display Image -->
                        <a href="<?php echo $image_path; ?>">
                        <img src="<?php echo $thumbnail_path; ?>" height="200" width="200" alt="" title=""/>
                        </a>
                        
                        <?php
                        
                        // Output metadata
                        echo "<br> Name:";
                        echo "$metaName";
                        echo "<br> Date:";
                        echo "$metaDate";
                        echo "<br> Photographer: ";
                        echo "$metaPhotographer";
                        echo "<br> Location:";
                        echo "$metaLocation";
                        echo "<br>";
                                        
                        // Break
                        if( $count%4 == 0)
                        {
                            ?>
                            <div class="clear"></div>
                            <?php 
                        }
                        
                        // Increment the count
                        $count++;
                        }
                    }
                }
                closedir($dh);
            }
        }
        ?>
        </div>
    </div>
</body>
</html>