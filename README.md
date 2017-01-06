# AladinLite

> an SSL-enabled fork of [CDS](http://cds.u-strasbg.fr/)'s [AladinLite](http://aladin.u-strasbg.fr/AladinLite)

## About

This is a copy of AladinLite, a totally awesome telescope imagery viewer developed by the [Centre de Données astronomiques de Strasbourg](http://cds.u-strasbg.fr/) (CDS). I corresponded with them about serving the images over an https protocol, and although they plan on implementing it in the near future, currently, the easy, plug-and-play AladinLite viewer is only available over http. However, they did provide me with links to https images ([JSON](http://alasky.unistra.fr/MocServer/query?hips_service_url*=https*&fields=ID,obs_collection,hips_service_url*&fmt=json) & [human-readable](http://alasky.unistra.fr/MocServer/query?hips_service_url*=https*&fields=ID,obs_collection,hips_service_url*)), so I intend to implement SSL here.

When it's done, you should be able to just take the minimized js and minimized css and use them on an https site without annoying Mixed Content errors.

## Building

### With gulp

Clone this repository and install the node dependencies for building:
```
git clone https://github.com/PirtleShell/AladinLite.git
cd AladinLite
npm install
```

Now you can build it by running `gulp build`. To live update on changes, just run `gulp`.

### With original build script

Compiling the js and css files requires that you have [uglifyjs2](https://github.com/mishoo/UglifyJS2) and [less](https://github.com/less/less.js). These can be installed with `npm`:
```sh
npm i -g uglify-js less
```

Then run `./build.sh`. The new files will be replace those in `/dist`.

## License

This and the original are licensed under [GNU GPLv3](http://choosealicense.com/licenses/gpl-3.0/). The original license file can be found [here](https://github.com/PirtleShell/AladinLite/blob/master/COPYING) and [here is the original source code](http://aladin.u-strasbg.fr/AladinLite/doc/#source-code). It is copyrighted by the CDS.
