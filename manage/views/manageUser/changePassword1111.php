<section id="main" class="column">
     
    <article class="module width_full">
        <form name="frmchangePassword" enctype="multipart/form-data" id="frmaddNewPlace" method="post" action="" class="list">
            <header><h3>Change Password</h3></header>
            <div class="module_content">
                <fieldset>
                    <label>User Name</label>
                    <input type="text" name="userName"  required="true" value="<?php echo $this->adminUser['UserName'] ?>">
                </fieldset>
                <fieldset>
                    <label>Current Password</label>
                    <input type="password" name="current" required="true" value="">
                </fieldset>
                <fieldset>
                    <label>New Password</label>
                    <input type="password" name="new" required="true" value="">
                </fieldset>
                <fieldset>
                    <label>Retype Password</label>
                    <input type="password" name="confirm" required="true" value="">
                </fieldset>
            </div>
            <footer>
                <div class="submit_link">
                    <input type="submit" name="subUser" value="Save Changes" >
                </div>
            </footer>
        </form>
    </article>
</section>