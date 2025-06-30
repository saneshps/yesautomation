<section id="main" class="column">
    <?php if (isset($this->status)): ?>
        <?php if ($this->status == 'success'): ?>
            <h4 class="alert_success">Updated successfully.You may ask to login to continue </h4> 
        <?php endif; ?>
        <?php if ($this->status == 'mismatch'): ?>
            <h4 class="alert_warning ">Password Mismatch</h4> 
        <?php endif; ?>
        <?php if ($this->status == 'invalid'): ?>
            <h4 class="alert_error">Invalid current password</h4> 
        <?php endif; ?>

    <?php endif; ?>
    <article class="module width_full">
        <form name="frmchangePassword" enctype="multipart/form-data" id="frmaddNewPlace" method="post" action="" class="list">
            <header><h3>Change User Password</h3></header>
            <div class="module_content">
                <fieldset>
                    <label>User Name</label>
                    <input type="text" name="userName"  required="true" value="<?php echo $this->loginUser['username'] ?>">
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
                    <input type="submit" name="logUser" value="Save Changes" >
                </div>
            </footer>
        </form>
    </article>
</section>