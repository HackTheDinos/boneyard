Boneyard
============

UI to explore bones.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/HackTheDinos/boneyard)

Setup & Configuration
-----------
Prerequisites
* Ruby 2.2.3
* Bundler 1.10.6
* postgres

### Bundle up gems
```
bundle install
```

### Setup database
```
bundle exec rake db:create
bundle exec rake db:migrate
```

Running the application
------------
### Command line

```
bundle exec rails server
```

Contributing
------------
1. Fork the repo (https://github.com/HackTheDinos/boneyard)
2. Create a branch off master
2. Use RubyMine, TextEdit, Vim, Emacs, or whatever to edit files
3. Git commit and push to your forked repo
4. Issue a pull request against the HackTheDinos repo
