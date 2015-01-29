'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

function merge (source, newDependencies) {
    if (!(newDependencies instanceof Array)) {
        newDependencies = [newDependencies];
    }

    newDependencies.forEach(function (dependencies) {
        var key;
        for (key in dependencies.devDependencies) {
            if (dependencies.devDependencies.hasOwnProperty(key)) {
                source.devDependencies[key] = dependencies.devDependencies[key];
            }
        }
    });
}

var WdjAppGenerator = module.exports = function WdjAppGenerator (args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({
            skipInstall : false
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WdjAppGenerator, yeoman.generators.Base);

WdjAppGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    console.log(this.yeoman);

    var prompts = [{
        type : 'list',
        name : 'projectType',
        message : 'Which kind of project are u scaffolding?',
        choices : [{
            name : 'Typical Front-end project that running in browsers. ',
            value : 'browser'
        }, {
            name : 'Node.js project. ',
            value : 'node'
        }, {
            name : 'Sails project. ',
            value : 'sails'
        }, {
            name : 'Chrome Extension. ',
            value : 'crx'
        }]
    }];

    this.prompt(prompts, function (props) {
        this.projectType = props.projectType;

        cb();
    }.bind(this));
};

WdjAppGenerator.prototype.app = function app() {
    var packageJson = this.src.readJSON('_package_base.json');

    switch (this.projectType) {
    case 'browser':
    case 'crx':
        this.mkdir('app');

        // Make bower components dir
        this.mkdir('app/components');

        // Make images dir
        this.mkdir('app/images');

        // Make JavaScript dir
        this.mkdir('app/javascripts');

        // Make compass dir
        this.mkdir('app/compass');
        this.mkdir('app/compass/sass');
        this.mkdir('app/compass/images');

        // Make test dir
        this.mkdir('test/specs');

        // Copy public resources
        this.copy('bowerrc', '.bowerrc');
        this.copy('_bower.json', 'bower.json');
        this.copy('browser/_main.scss', 'app/compass/sass/main.scss');
        this.copy('browser/_main.js', 'app/javascripts/main.js');
        this.copy('browser/_karma.conf.js', 'test/karma.conf.js');
        this.copy('browser/_test-main.js', 'test/test-main.js');

        if (this.projectType === 'browser') {
            // Genertate `package.json`
            var packageJsonBrowserBase = this.src.readJSON('browser/_package.json');
            var packageJsonBrowserTypical = this.src.readJSON('browser/typical/_package.json');
            merge(packageJson, [packageJsonBrowserBase, packageJsonBrowserTypical]);

            this.copy('browser/_Gruntfile.js', 'Gruntfile.js');
            this.copy('browser/_index.html', 'app/index.html');
            this.directory('browser/grunt', 'grunt');
        } else {
            // Genertate `package.json`
            var packageJsonBrowserBase = this.src.readJSON('browser/_package.json');
            var packageJsonCrx = this.src.readJSON('browser/crx/_package.json');
            merge(packageJson, [packageJsonBrowserBase, packageJsonCrx]);

            this.copy('_Gruntfile_crx.js', 'Gruntfile.js');
            this.copy('browser/crx/_background.html', 'app/background.html');
            this.copy('browser/crx/_manifest.json', 'app/manifest.json');
            this.mkdir('app/dev');
            this.copy('browser/crx/_reload.js', 'app/dev/reload.js');
        }
        break;
    case 'node':
        // Genertate `package.json`
        var packageJsonNode = this.src.readJSON('_package_node.json');
        merge(packageJson, packageJsonNode);

        this.copy('_package_node.json', 'package.json');
        this.copy('_Gruntfile_node.js', 'Gruntfile.js');
        break;
    case 'sails':
        this.copy('_bower.json', 'bower.json');
        this.directory('sails', './');
        break;
    }

    this.dest.write('package.json', JSON.stringify(packageJson, null, 4));
};

WdjAppGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('_README.md', 'README.md');
    this.copy('gitignore', '.gitignore');
    this.copy('_travis.yml', '.travis.yml');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};
