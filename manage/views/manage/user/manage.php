<section id="main" class="column">
    <article class="module width_full">
        <header><h3 class="tabs_involved">Content Manager</h3>
            <div style="padding: 4px 4px 0px 0px;float: right;">
                Search <input type="text" placeholder="Enter the keyword"/>
                <input type="image" src="<?php echo IMAGE . 'search.jpeg' ?>" width="16" />
            </div>
        </header>
        <table class="tablesorter" cellspacing="0"> 
            <thead> 
                <tr> 
                    <th>ID</th> 
                    <th>Name</th> 
                    <th>Location</th> 
                    <th>Email</th> 
                    <th>Status</th> 
                    <th>Actions</th> 
                </tr> 
            </thead> 
            <tbody> 
                <?php foreach ($this->users as $user): ?>
                    <tr> 
                        <td><?php echo $user['userId'] ?></td> 
                        <td><?php echo $user['name'] ?></td> 
                        <td><?php echo $user['location'] ?></td> 
                        <td><?php echo $user['email'] ?></td> 
                        <td><a class="<?php echo ($user['status'] == 1) ? 'enable' : 'disable'; ?>" data-type="user" data-id="<?php echo $user['userId'] ?>"></a></td>
                        <td>
                            <a href="<?php echo MANAGE . 'user/' . $user['userId'] ?>" title="Edit"><img  src="<?php echo IMAGE ?>icn_edit.png" ></a>
                            <a href="<?php echo MANAGE . 'user/' . $user['userId'] ?>" title="Delete"><img  src="<?php echo IMAGE ?>icn_trash.png" ></a>
                        </td> 
                    </tr> 
                <?php endforeach; ?>  
            </tbody> 
        </table>
    </article>
</section>