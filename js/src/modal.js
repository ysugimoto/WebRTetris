var Modal;
(function() {

    var tmpl = Retriever.make(document.getElementById("tetris-modal").innerHTML);

    Modal = function(type, msg, resolve, reject) {
        this.type = type;
        this.msg = msg;
        this.resolve = resolve;
        this.reject = reject;

        this.init();
    };

    Modal.prototype.init = function() {
        var div = document.createElement("div");
        var that = this;

        div.className = "modal-frame " + this.type;
        div.innerHTML = tmpl.parse(this.msg);

        Layer.show("");
        var ok = div.querySelector(".ok");
        var ng = div.querySelector(".ng");

        switch ( this.type ) {
            case "dialog":
                ok.style.display = "none";
                ng.style.display = "none";
                break;

            case "confirm":
                ok.addEventListener("click", function() {
                    that.resolve && that.resolve();
                    document.body.removeChild(div);
                });
                ng.addEventListener("click", function() {
                    that.reject && that.reject();
                    document.body.removeChild(div);
                });
                break;
            case "alert":
                ng.style.display = "none";
                ok.addEventListener("click", function() {
                    that.resolve && that.resolve();
                    document.body.removeChild(div);
                });
                break;
        }
        document.body.appendChild(div);
    };

    Modal.confirm = function(msg, resolve, reject) {
        return new Modal("confirm", msg, resolve, reject);
    };
    Modal.alert = function(msg, resolve, reject) {
        return new Modal("alert", msg, resolve, reject);
    };
    Modal.dialog = function(msg, resolve, reject) {
        return new Modal("dialog", msg, resolve, reject);
    };

    Modal.hideAll = function() {
        [].forEach.call(document.querySelectorAll(".modal-frame"), function(dialog) {
            document.body.removeChild(dialog);
        });
    };

    GameEvent.on("playerRejected", function() {
        [].forEach.call(document.querySelectorAll(".dialog"), function(dialog) {
            document.body.removeChild(dialog);
        });
        Modal.alert({
            msg: "Offser rejected"
        });
    });

})();
