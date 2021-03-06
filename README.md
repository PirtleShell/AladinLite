# AladinLite

> an SSL-enabled fork of [CDS](http://cds.u-strasbg.fr/)'s [AladinLite](http://aladin.u-strasbg.fr/AladinLite)

## About

This is a copy of AladinLite, a totally awesome telescope imagery viewer developed by the [Centre de Données astronomiques de Strasbourg](http://cds.u-strasbg.fr/) (CDS). I corresponded with them about serving the images over an https protocol, and although they plan on implementing it in the near future, currently, the easy, plug-and-play AladinLite viewer is only available over http. However, they did provide me with links to https images ([JSON](http://alasky.unistra.fr/MocServer/query?hips_service_url*=https*&fields=ID,obs_collection,hips_service_url*&fmt=json) & [human-readable](http://alasky.unistra.fr/MocServer/query?hips_service_url*=https*&fields=ID,obs_collection,hips_service_url*)), so I have implemented an SSL version here.

## Usage

It works just like the original. The CSS and JS files can be found in the `/dist` directory, so either host them yourself, or use rawgit CDN. The CSS hasn't been modified, so feel free to use [the original](http://aladin.u-strasbg.fr/AladinLite/api/v2/latest/aladin.min.css).

Modified from the [original documentation](http://aladin.u-strasbg.fr/AladinLite/doc/):

```html
<!-- include Aladin Lite CSS file in the head section of your page -->
<link rel="stylesheet" href="https://cdn.rawgit.com/PirtleShell/AladinLite/master/dist/aladin.min.css" />

<!-- you can skip the following line if your page already integrates the jQuery library -->
<script type="text/javascript" src="https://code.jquery.com/jquery-1.9.1.min.js" charset="utf-8"></script>

<!-- insert this snippet where you want Aladin Lite viewer to appear and after the loading of jQuery -->
<div id="aladin-lite-div" style="width:400px;height:400px;"></div>
<script type="text/javascript" src="https://cdn.rawgit.com/PirtleShell/AladinLite/master/dist/aladin.min.js" charset="utf-8"></script>
<script type="text/javascript">
    var aladin = A.aladin('#aladin-lite-div', {survey: "P/DSS2/color", fov:60});
</script>
```

## Building

### With gulp

Clone this repository and install the node dependencies for building:
```
git clone https://github.com/PirtleShell/AladinLite.git
cd AladinLite
npm install
```

Now you can build it by running `gulp build`. To live update and compile on changes, just run `gulp`.

### With original build script

Compiling the js and css files requires that you have [uglifyjs2](https://github.com/mishoo/UglifyJS2) and [less](https://github.com/less/less.js). These can be installed with `npm`:
```sh
npm i -g uglify-js less
```

Then run `./build.sh`. The new files will be replace those in `/dist`.

## License

This and the original are licensed under [GNU GPLv3](http://choosealicense.com/licenses/gpl-3.0/). The original license file can be found [here](https://github.com/PirtleShell/AladinLite/blob/master/COPYING) and [here is the original source code](http://aladin.u-strasbg.fr/AladinLite/doc/#source-code). It is copyrighted by the CDS.

---

## Currently needed Shims

- [X] `Sesame.resolve`. Original uses [this url](http://cds.u-strasbg.fr/cgi-bin/nph-sesame.jsonp?). New live SSL mirror available [here](https://laniakean.com/api/v1/resolveNames/?) through the [Laniakean API](https://laniakean.com/api#resolve-names-api).

- [X] `nph-aladin.pl` which retrieves available surveys. [The original list](http://aladin.u-strasbg.fr/java/nph-aladin.pl?frame=aladinLiteDic). A live SSL version is available [here](https://laniakean.com/data/nph-aladin.json).

- [X] default surveys in `HpxImageSurvey.js`

- [X] logging? [Current logging endpoint](http://alasky.u-strasbg.fr/cgi/AladinLiteLogger/log.py). I think it's available over SSL [here](https://alaskybis.unistra.fr/cgi/AladinLiteLogger/log.py). Need to confirm.
