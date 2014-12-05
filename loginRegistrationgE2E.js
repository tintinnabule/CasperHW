casper.test.begin('Login and Registration End to End Test', function suite(test) {
    var waitTime = 3000;
    var varscreenshotNow = new Date();
    var viewports = [
            {
              'name': 'smartphone-portrait',
              'viewport': {width: 320, height: 480}
            },
            {
              'name': 'smartphone-landscape',
              'viewport': {width: 480, height: 320}
            },
            {
              'name': 'tablet-portrait',
              'viewport': {width: 768, height: 1024}
            },
            {
              'name': 'tablet-landscape',
              'viewport': {width: 1024, height: 768}
            },
            {
              'name': 'desktop-standard',
              'viewport': {width: 1280, height: 1024}
            }
          ];

    var environment = casper.cli.get("env");
    if (!environment){
        // If the environment is not passed in, then use prod by default
        var urlPrefix = 'http://www';
        environment = "prod";
    }
    else {
      if(environment == 'test'){var urlPrefix = 'http://www.test';}
      else if(environment == 'stage'){var urlPrefix = 'http://www.stg';}
      else if (environment == 'prod'){var urlPrefix = 'http://www';}
      else { casper.echo("I do not recognize your environment argument. Acceptable options are 'test', 'stage', 'prod'."); return; }
    }

    //load the landing page and verify it is correct
    casper.start( urlPrefix + ".rocketlawyer.com", function() {
        this.echo("======= Beginning Test Suite =======");
        this.echo("======= Environment is " + environment);
        test.assertHttpStatus(200, 'Connected to Landing page');
        test.assertTitle("Affordable Legal Services, Free Legal Documents, Advice & Ask a Lawyer | Rocket Lawyer", 'Title is correct');
    });

    casper.thenClick(".rlHeaderTopRightLink[href='/login-register.rl#/register?hd=navreg']", function(){
    	this.echo("Sign up has been clicked");
    	test.assertHttpStatus(200, 'Reg page loaded')
    });

    //registration time

	casper.waitForUrl("/login-register.rl", function () {
		this.fillSelectors("form#registerForm", {
    	"form#registerForm #email"  : userName,
    	"form#registerForm #pass"   : userName
	}, true);

	this.echo("Made user called:  " + userName + "\n");
    });

    //make sure you're on dashboard

    casper.waitForUrl("/dashboard.rl", function() {
    	test.assertHttpStatus(200, "The Dashboard loaded");
  		test.assertUrlMatch("/dashboard.rl", "confirm that you're really on the dashboard");
	});

	//log the user out via log out button

	casper.thenClick("a[href='/secure/registration/logout.aspx'].rlMenuPopupGenericItemLink", function() {
  		this.echo("Logging the user out");
	});

	casper.waitForUrl("rocketlawyer.com", function() {
 		test.assertUrlMatch(/\/$/, "back at the homepage");
	});

	//cliking sign in

	casper.thenClick(".rlHeaderTopRightLink[href='/login-register.rl#/login?hd=navreg']", function(){
    	this.echo("clicking on sign in");
    	test.assertHttpStatus(200, "Sign in page loaded");

    });

	//filling in form and signing in

	casper.waitForUrl("/login-register.rl", function () {
		this.fillSelectors("form#loginForm", {
    	"form#loginForm #email"  : userName,
    	"form#loginForm #pass"   : userName
	}, true);

	this.echo("Signed in with the same user:  " + userName + "\n");
    });

    //dashboard landing verification

    casper.waitForUrl("/dashboard.rl", function() {
    	test.assertHttpStatus(200, "The Dashboard loaded");
  		test.assertUrlMatch("/dashboard.rl", "confirm that you're really on the dashboard");
	});

    casper.run(function() {
        test.done();
    });
});
