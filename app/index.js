'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var merge = function (obj, sources) {
    if (!(sources instanceof Array)) {
        sources = [sources];
    }

    sources.forEach(function (source) {
        var key;
        var deeperKey;
        for (key in source) {
            if (source.hasOwnProperty(key)) {
                for (deeperKey in source[key]) {
                    if (source[key].hasOwnProperty(deeperKey)) {
                        obj[key][deeperKey] = source[key][deeperKey];
                    }
                }
            }
        }
    });
}

var WdjAppGenerator = module.exports = function WdjAppGenerator (args, options, config) {
    this.projectName = args[0];

    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({
            skipInstall: options['skip-install'],
            skipMessage: options['skip-install-message']
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WdjAppGenerator, yeoman.generators.Base);

WdjAppGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    if (!this.options['skip-welcome-message']) {
        console.log(this.yeoman);
    }

    var prompts = [{
        type : 'list',
        name : 'projectType',
        message : 'Which kind of project are u scaffolding? ',
        choices : [{
            name : 'Browser-based project. ',
            value : 'browser'
        }, {
            name : 'Node.js project. ',
            value : 'node'
        }, {
            name : 'Sails project. ',
            value : 'sails'
        }]
    }];

    var promptsSubType = [{
        type : 'list',
        name : 'projectSubType',
        message : 'It\'s a ...',
        choices : [{
            name : 'Typical browser-based project. ',
            value : 'typical'
        }, {
            name : 'Chrome extension project. ',
            value : 'crx'
        }, {
            name : 'Polymer project. ',
            value : 'polymer'
        }]
    }];

    this.prompt(prompts, function (props) {
        this.projectType = props.projectType;

        if (props.projectType === 'browser') {
            this.prompt(promptsSubType, function (props) {
                this.projectSubType = props.projectSubType;
                cb();
            }.bind(this));
        } else {
            cb();
        }
    }.bind(this));
};

WdjAppGenerator.prototype.app = function app() {
    var packageJson = this.src.readJSON('_package.json');
    var bowerJson = this.src.readJSON('_bower.json');

    switch (this.projectType) {
    case 'browser':
        var packageJsonBrowserBase = this.src.readJSON('browser/_package.json');

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

        this.copy('browser/_main.scss', 'app/compass/sass/main.scss');
        this.copy('browser/_main.js', 'app/javascripts/main.js');
        this.copy('browser/_karma.conf.js', 'test/karma.conf.js');
        this.copy('browser/_test-main.js', 'test/test-main.js');
        this.copy('browser/_Gruntfile.js', 'Gruntfile.js');
        this.directory('browser/grunt', 'grunt');

        switch (this.projectSubType) {
        case 'typical':
            // Genertate `package.json`
            var packageJsonBrowserTypical = this.src.readJSON('browser/typical/_package.json');
            merge(packageJson, [packageJsonBrowserBase, packageJsonBrowserTypical]);

            this.copy('browser/typical/_index.html', 'app/index.html');
            this.directory('browser/typical/grunt', 'grunt');
            break;
        case 'crx':
            // Genertate `package.json`
            var packageJsonCrx = this.src.readJSON('browser/crx/_package.json');
            merge(packageJson, [packageJsonBrowserBase, packageJsonCrx]);

            this.copy('browser/crx/_background.html', 'app/background.html');
            this.copy('browser/crx/_manifest.json', 'app/manifest.json');
            this.mkdir('app/dev');
            this.copy('browser/crx/_reload.js', 'app/dev/reload.js');

            this.directory('browser/crx/grunt', 'grunt');
            break;
        case 'polymer':
            // Genertate `package.json`
            var packageJsonPolymer = this.src.readJSON('browser/polymer/_package.json');
            merge(packageJson, [packageJsonBrowserBase, packageJsonPolymer]);

            // Generate `bower.json`
            var bowerJsonPolymer = this.src.readJSON('browser/polymer/_bower.json');
            merge(bowerJson, [bowerJsonPolymer]);

            this.copy('browser/polymer/_index.html', 'app/index.html');
            this.mkdir('app/elements');
            this.copy('browser/polymer/elements/_elements.html', 'app/elements/elements.html');

            this.directory('browser/typical/grunt', 'grunt');
            this.directory('browser/polymer/grunt', 'grunt');
            break;
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

    this.dest.write('bower.json', JSON.stringify(bowerJson, null, 4));
    this.dest.write('package.json', JSON.stringify(packageJson, null, 4));
};

WdjAppGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('_README.md', 'README.md');
    this.copy('gitignore', '.gitignore');
    this.copy('_travis.yml', '.travis.yml');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};
