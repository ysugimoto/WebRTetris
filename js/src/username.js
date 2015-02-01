var UserName;
(function() {

    UserName = function(callback) {
        this.selfUser = document.querySelector(".user-self");
        this.others   = document.getElementById("players");
        this.callback = callback;

        this.init();
    }

    UserName.prototype.init = function() {
        var u = localStorage.getItem("tetris_user");
        if ( u ) {
            var json = JSON.parse(u);
            this.selfUser.innerHTML= '<img src="' + json.profile_image_url + '" width="200" height="200">';
            this.callback(json);
            return;
        }

        var that = this;
        window.authCallback = function(user) {
            that.selfUser.innerHTML= '<img src="' + user.profile_image_url + '" width="200" height="200">';
            that.callback(user);
            localStorage.setItem("tetris_user", JSON.stringify(user));
            window.authCallback = null;
        };
        var signin = document.querySelector(".signin");
        if ( signin ) {
            signin.addEventListener("click", function(evt) {
                evt.preventDefault();
                window.open(signin.href, "signin", "width=500,height=500,resizable=no,status=no,scrollbars=no");
            });
        }
    }

    UserName.create = function(callback) {
        var users = document.getElementById("users");

        users.style.display = "block";
        new UserName(callback);

    };

    UserName.hide = function() {
        var users = document.getElementById("users");

        users.style.display = "none";
    };



})();
