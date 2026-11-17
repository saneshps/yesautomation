<nav class="navbar navbar-default" role="navigation">
  <!-- Brand and toggle get grouped for better mobile display -->
  <div class="col-lg-4" style="padding:0">
    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
      <span class="sr-only">Toggle navigation</span>
      Menu
    </button>
   <h4 style="
    color: aliceblue;
    margin-left: 7%;
"><?php echo SITE?></h4>
  </div>
  <!-- Collect the nav links, forms, and other content for toggling -->
  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav navbar-right">
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" style="color:white">Welcome Admin <b class="caret"></b></a>
        <ul class="dropdown-menu">
		<li><a href="#">My Account</a></li>
		<li><a href="<?php echo MANAGE_TEAM.'setting' ?>">Settings</a></li>
          <li class="divider"></li>
          <li><a href="<?php echo MANAGE.'logout' ?>"><i class="fa fa-power-off"></i>Logout</a></li>
        </ul>
      </li>
    </ul>
    <div class="col-sm-6 col-lg-3 pull-right">
        <form class="navbar-form" role="search">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search" name="q">
            <div class="input-group-btn">
                <button class="btn btn-default" type="submit" style="border-color:white;height: 34px;"><i class="fa fa-search"></i></button>
            </div>
        </div>
        </form>
    </div>
    
  </div>
</nav>