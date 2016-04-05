# MIchan imageboard script
 Built on nodejs using express, MySQL and jQuery

---

## General information
### What is MIchan?
Simply put, it's an imageboard/4chan clone/kind-of-forum
### Why? Can't I just use other imagebaords?
This is a school project.
It's also for my classmates so we can all bundle up on my obscure site and share obscure memes.
### Are there any differences?
Due to the simplicity of imageboards the requirements for a database aren't exactly complicated, that's why I was required to add users.

---

## Installation
### Manual
First clone the repo
```
git clone https://github.com/Sebskyo/michan.git
```
then cd to the new dir
```
cd michan
```
create the necessary directories
```
mkdir ./public/images
mkdir ./public/images/emote
```
now copy the configuration file and configure it
```
cp conf.default.js conf.js
vim conf.js
```
if you're an emacs guy, simply use
```
alias emacs=vim
emacs conf.js
```
the "emotes" section is for any emotes you want on the site, and can be accessed with :emote:, be sure that these images are 20x20 pixels and are png images, you also have to put them in the /public/images/emote folder.
Now run the sql to create the database, make sure to drop any existing database named "michan"
```
cat michan_create.sql | mysql -u USER -p
```
remember to use the mysql options that apply to you.
Now to install the node modules, remember that this script runs on version 4, I recommend using nvm
```
nvm use 4
npm install
```
and you're good to go! Start the server with
```
node bin/www
```
Note that the server will run in *debug* and *print stack traces* if NODE_ENV isn't set to "production"!

---

## License
> MIchan - an imageboard | Copyright (C) 2016  Sebastian Vikkelsø Elleholm
>
> This program is free software: you can redistribute it and/or modify
> it under the terms of the GNU General Public License as published by
> the Free Software Foundation, either version 3 of the License, or
> (at your option) any later version.
>
> This program is distributed in the hope that it will be useful,
> but WITHOUT ANY WARRANTY; without even the implied warranty of
> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
> GNU General Public License for more details.
>
> You should have received a copy of the GNU General Public License
> along with this program.  If not, see <http://www.gnu.org/licenses/>.

License found in the LICENSE file.