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
                        obj[key] = obj[key] || {};
                        obj[key][deeperKey] = source[key][deeperKey];
                    }
                }
            }
        }
    });
};

var WdjAppGenerator = module.exports = function WdjAppGenerator (args, options, config) {
    this.projectName = args[0];

    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({
            skipInstall: options['skip-install'],
            skipMessage: options['skip-install-message']
        });
    });

    this.pkg = JSON.parse(require('html-wiring').readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WdjAppGenerator, yeoman.generators.Base);

WdjAppGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    if (!this.options['skip-welcome-message']) {
        this.log(require('yeoman-welcome'));
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
    var packageJson = this.fs.readJSON(this.templatePath('_package.json'));
    var bowerJson = this.fs.readJSON(this.templatePath('_bower.json'));

    switch (this.projectType) {
    case 'browser':
        var packageJsonBrowserBase = this.fs.readJSON(this.templatePath('browser/_package.json'));

        // Copy public resources
        this.fs.copy(this.templatePath('bowerrc'), this.destinationPath('.bowerrc'));

        this.fs.copy(this.templatePath('browser/_main.scss'), this.destinationPath('app/compass/sass/main.scss'));
        this.fs.copy(this.templatePath('browser/_main.js'), this.destinationPath('app/javascripts/main.js'));
        this.fs.copy(this.templatePath('browser/_karma.conf.js'), this.destinationPath('test/karma.conf.js'));
        this.fs.copy(this.templatePath('browser/_test-main.js'), this.destinationPath('test/test-main.js'));
        this.fs.copy(this.templatePath('browser/_Gruntfile.js'), this.destinationPath('Gruntfile.js'));
        this.fs.copy(this.templatePath('browser/grunt'), this.destinationPath('grunt'));

        switch (this.projectSubType) {
        case 'typical':
            // Genertate `package.json`
            var packageJsonBrowserTypical = this.fs.readJSON(this.templatePath('browser/typical/_package.json'));
            merge(packageJson, [packageJsonBrowserBase, packageJsonBrowserTypical]);

            this.fs.copy(this.templatePath('browser/typical/_index.html'), this.destinationPath('app/index.html'));
            this.fs.copy(this.templatePath('browser/typical/grunt'), this.destinationPath('grunt'));
            break;
        case 'crx':
            // Genertate `package.json`
            var packageJsonCrx = this.fs.readJSON(this.templatePath('browser/crx/_package.json'));
            merge(packageJson, [packageJsonBrowserBase, packageJsonCrx]);

            this.fs.copy(this.templatePath('browser/crx/_background.html'), this.destinationPath('app/background.html'));
            this.fs.copy(this.templatePath('browser/crx/_manifest.json'), this.destinationPath('app/manifest.json'));
            this.fs.copy(this.templatePath('browser/crx/_reload.js'), this.destinationPath('app/dev/reload.js'));

            this.fs.copy(this.templatePath('browser/crx/grunt'), this.destinationPath('grunt'));
            break;
        case 'polymer':
            // Genertate `package.json`
            var packageJsonPolymer = this.fs.readJSON(this.templatePath('browser/polymer/_package.json'));
            merge(packageJson, [packageJsonBrowserBase, packageJsonPolymer]);

            // Generate `bower.json`
            var bowerJsonPolymer = this.fs.readJSON(this.templatePath('browser/polymer/_bower.json'));
            merge(bowerJson, [bowerJsonPolymer]);

            this.fs.copy(this.templatePath('browser/polymer/_index.html'), this.destinationPath('app/index.html'));
            this.fs.copy(this.templatePath('browser/polymer/elements/_elements.html'), this.destinationPath('app/elements/elements.html'));

            this.fs.copy(this.templatePath('browser/typical/grunt'), this.destinationPath('grunt'));
            this.fs.copy(this.templatePath('browser/polymer/grunt'), this.destinationPath('grunt'));
            break;
        }
        break;
    case 'node':
        // Genertate `package.json`
        var packageJsonNode = this.fs.readJSON(this.templatePath('_package_node.json'));
        merge(packageJson, packageJsonNode);

        this.fs.copy(this.templatePath('_package_node.json'), this.destinationPath('package.json'));
        this.fs.copy(this.templatePath('_Gruntfile_node.js'), this.destinationPath('Gruntfile.js'));
        break;
    case 'sails':
        this.copy('_bower.json', 'bower.json');
        this.directory('sails', './');
        break;
    }

    this.fs.write(this.destinationPath('bower.json'), JSON.stringify(bowerJson, null, 4));
    this.fs.write(this.destinationPath('package.json'), JSON.stringify(packageJson, null, 4));
};

WdjAppGenerator.prototype.projectfiles = function projectfiles() {
    this.fs.copy(this.templatePath('_README.md'), this.destinationPath('README.md'));
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('_travis.yml'), this.destinationPath('.travis.yml'));
    this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('jshintrc'), this.destinationPath('.jshintrc'));
};
