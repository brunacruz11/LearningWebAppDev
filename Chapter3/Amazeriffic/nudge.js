#!/usr/bin/env node

"use strict";

var http = require("http"),
    querystring = require("querystring"),
    child_process = require("child_process");

function writeCSS(res) {
    res.writeHead(200, {
        "Content-Type": "text/css"
    });

    res.write("/* style.css - this space intentionally left blank */");
    res.end();
}

function beginPage(res, title) {
    res.write("<!DOCTYPE html>\n");
    res.write("<html lang='en'>\n");
    res.write("<head>\n");
    res.write("<meta charset='utf-8'>\n");
    res.write("<title>"+ title + "</title>\n");
    res.write("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css'>\n");
    res.write("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css'>\n");
    res.write("<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js'></script>\n");
    res.write("<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js'></script>\n");
    res.write("</head>\n");
    res.write("<body>\n");
}

function endPage(res) {
    endMain(res);
    writeContainer(res);
    res.write("</body>\n");
    res.write("</html>\n");
    res.end();
}

function writeHeading(res, tag, title) {
    res.write("<" + tag + ">" + title + "</" + tag + ">\n");

}
function writeMenu(res) {
    res.write("<nav class='navbar navbar-inverse navbar-fixed-top'>\n");
    res.write("<div class='container'>\n");
    res.write("<div class='navbar-header'>\n");
    res.write("<a class='navbar-brand' href='#'>Nudge - Web Interface for Git Push</a>\n");
    res.write("</div>\n");
    res.write("</div>\n");
    res.write("</nav>\n");

}

function writeMain(res) {
    res.write("<div class='jumbotron'>\n");
    res.write("<div class='container'>\n");
    res.write("<h1>Nudge!</h1>\n");

}

function endMain(res) {
    res.write("</div>\n");
    res.write("</div>\n");

}

function writeContainer(res) {
    res.write("<div class='container'>\n");
    res.write("<div class='row'>\n");
    res.write("<div class='col-md-4'>\n");
    res.write("<h2>Github</h2>\n");
    res.write("<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n");
    res.write("<p><a class='btn btn-default' href='http://github.com/brunacruz11' role='button'>View details &raquo;</a></p>\n");
    res.write("</div>\n");
    res.write("<div class='col-md-4'>\n");
    res.write("<h2>CPSC 473</h2>\n");
    res.write("<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>\n");
    res.write("<p><a class='btn btn-default' href='https://sites.google.com/site/cpsc473/'  role='button'>View details &raquo;</a></p>\n");
    res.write("</div>\n");
    res.write("<div class='col-md-4'>\n");
    res.write("<h2>Assignment</h2>\n");
    res.write("<p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\n");
    res.write("<p><a class='btn btn-default' href='https://docs.google.com/a/csu.fullerton.edu/document/d/1ESiHyYyL1NRUDILRyHJPviitZJ5GNlfpRvohUumafHs/edit' role='button'>View details &raquo;</a></p>\n");
    res.write("</div>\n");
    res.write("</div>\n");
    res.write("<hr>\n");
    res.write("<footer>\n");
    res.write("<p>&copy; Bruna Cruz 2015</p>\n");
    res.write("</footer>\n");
    res.write("</div>\n"); /* /container --> */

}


function writePre(res, divClass, data) {
    var escaped = data.replace(/</, "&lt;").
                       replace(/>/, "&gt;");

    res.write("<div class='" + divClass + "_div'>\n");
    res.write("<pre>");
    res.write(escaped);
    res.write("</pre>\n");
    res.write("</div>\n");
}

function beginForm(res) {
    res.write("<form method='POST' action='/push' class='form-inline'>\n");
}

function endForm(res) {
    /*<p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>*/
    /*res.write("<div>\n");*/
    res.write("<input class='btn btn-primary' type='submit' value='Push'>\n");
    /*res.write("</div>\n");*/
    res.write("</form>\n");
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function beginSelect(res, what) {
    /*res.write("<div class='" + what + "_div'>\n");*/
    res.write("<div class='form-group'>\n");
    res.write("<label for='" + what + "_select'>" + capitalize(what) + "</label>\n");
    /*res.write("<div class='col-sm-6'>\n");*/
    res.write("<select class='form-control' id='" + what + "_select' name='" + what + "'>\n");
}

function writeOption(res, option) {
    res.write("<option value='" + option + "'>" + option + "</option>\n");
}

function endSelect(res) {
    res.write("</select>\n");
    res.write("</div>\n");
}

function gitRemote(res) {
    child_process.exec("git remote", function(err, stdout, stderr) {
        if (err) {
            writeHeading(res, "h2", "Error listing remotes");
            writePre(res, "error", stderr);
            endPage(res);
        } else {
            var output = stdout.toString(),
                remotes = output.split(/\n/);

            beginSelect(res, "remote");

            remotes.forEach(function(remoteName) {
                if (remoteName) {
                    writeOption(res, remoteName);
                }
            });

            endSelect(res);
            endForm(res);
            endPage(res);
        }
    });
}

function gitBranch(res) {
    child_process.exec("git branch", function(err, stdout, stderr) {
        if (err) {
            writeHeading(res, "h2", "Error listing branches");
            writePre(res, "error", stderr);
            endPage(res);
        } else {
            var output = stdout.toString(),
                branches = output.split(/\n/);

            beginForm(res);
            beginSelect(res, "branch");

            branches.forEach(function(branch) {
                var branchName = branch.replace(/^\s*\*?\s*/, "").
                                        replace(/\s*$/, "");

                if (branchName) {
                    writeOption(res, branchName);
                }
            });

            endSelect(res);
            gitRemote(res);
        }
    });
}

function gitStatus(res) {
    child_process.exec("git status", function(err, stdout, stderr) {
        if (err) {
            writeHeading(res, "h2", "Error retrieving status");
            writePre(res, "error", stderr);
            endPage(res);
        } else {
            writeHeading(res, "h2", "Git Status");
            writePre(res, "status", stdout);
            gitBranch(res);
        }
    });
}

function gitPush(req, res) {
    var body = "";

    req.on("data", function(chunk) {
        body += chunk;
    });

    req.on("end", function () {
        var form = querystring.parse(body);

        child_process.exec("git push " + form.remote + " " + form.branch, function(err, stdout, stderr) {
            if (err) {
                writeHeading(res, "h2", "Error pushing repository");
                writePre(res, "error", stderr);
            } else {
                writeHeading(res, "h2", "Git Push");
                writePre(res, "push", stdout);
            }
            gitStatus(res);
        });
    });
}

function frontPage(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    if (req.url === "/style.css") {
        writeCSS(res);
    } else {
        var title = "Nudge - Web Interface for Git Push";

        beginPage(res, title);
        /*writeHeading(res, "h1", title);*/
        writeMenu(res);
        writeMain(res);

        if (req.method === "POST" && req.url === "/push") {
            gitPush(req, res);
        } else {
            gitStatus(res);
        }

    }

}




var server = http.createServer(frontPage);
server.listen();
var address = server.address();
console.log("nudge is listening at http://localhost:" + address.port + "/");
