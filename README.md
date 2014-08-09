CPUI Module Generator
=====================

Custom code generator for Creator Platform Angular modules

![](http://i.imgur.com/ga4IKmt.png)

## Opinions
- Uses coffeescript and the `.coffee` extension by default (*not* `.js.coffee`)
- Encourages module creation for code separation (and makes it easy)
- Assumes your Angular application file is named `app.coffee`
- Require scripts as-needed in `application.html.erb` using the built-in Rails asset pipeline
	- Opening and closing syntax for loading scripts via sprockets: 
	```
	#== Requiring our modules
	#/= Requiring our modules
	```
	
	- Opening and closing syntax for loading modules into Angular's DI: 
	```
	#== Our modules
	#/= Our modules
	```
- Never use `#= require tree .`

## Usage

1. Install yoeman: `npm install -g yo`
2. Install the generator: `npm install -g generator-cpui`
3. `yo:cpui` to get a menu of possible generators

### Naming Conventions
These generators use some nice string helpers to make naming your files an afterthought. For instance, a common convention for Angular controllers is to append 'Ctrl' to the controller name. When using these generators, it will append that automatically to the controller's name, but not the file name. In fact, don't even worry about casing, or spaces for that matter. This works best with an example.

In the old days, you would name your controller something like `MyFavoriteCtrl`. And your file's name would be something similar. If we run the controller generator, it will ask us what we want to name our controller. Just type it in as english. Naming it `my favorite` will create a controller name of `MyFavoriteCtrl`. The file's name will be `my-favorite.coffee`, and inside a `controllers` directory. Try it out.

## Configuration
If you don't have a `.yo-rc.json` file at the root of your repo, **don't worry**. Running `yo cpui` will detect that and walk you through creating one. You can always create a config file at any point by choosing it from the list of generators.

![](http://cl.ly/Wyx0/Image%202014-08-08%20at%202.01.29%20PM.png)

*Note: There are separators used so that we know where to inject items into files. It's unlikely that you'll need to change them. If you do, you can tweak them manually in the `.yo-rc.json` file that gets created for you.*
