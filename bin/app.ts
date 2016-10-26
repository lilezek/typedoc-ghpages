/// <reference path="../typings/index.d.ts"/>

import fs = require("fs");
import path = require("path");
import ncp = require("ncp");
import spawn = require('child_process');

if (process.argv.length <= 2) {
  console.log("Usage: " + process.argv[0] + " " + process.argv[1] + " <documentation folder>");
  console.log("Note: docs/ folder will be path and overwrite.");
}

var dir = path.join(process.cwd(), process.argv[2]);

function recursiveFix(source: string) {
  if (fs.existsSync(source) && fs.lstatSync(source).isDirectory()) {
    var files = fs.readdirSync(source);
    files.forEach((x) => recursiveFix(source + "/" + x));
  } else {
    if (/\.html$/i.test(source) || /\.js$/i.test(source)) {
      var content = fs.readFileSync(source);
      var sc = content.toString();
      sc = sc.replace(/modules\/_([^"]+)\.html/ig, function(match, group) {
        console.log(source);
        console.log(match);
        return "modules/" + group + ".html";
      }).replace(/href="_([^"]+)\.html/ig, function(match, group) {
        console.log(source);
        return "href=\"" + group + ".html";
      }).replace(/classes\/_([^"]+)\.html/ig, function(match, group) {
        console.log(source);
        return "/classes\/" + group + ".html";
      });
      fs.writeFileSync(source, sc);
      var newname = source.replace(/\/_/, "/");
      spawn.spawn('mv', [source, newname]);
    }
  }
}

var rm = spawn.spawn('rm', ['-rf', 'docs/'])
  .on('close', () => {
  var cp = spawn.spawn('cp', ['-r', dir, 'docs/']);
  cp.on('close', () => {
    recursiveFix('docs/');
  })
});
