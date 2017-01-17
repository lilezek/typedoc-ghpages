# typedoc-ghpages

Fix your TypeDoc files for its use with Github Webpages. There is an alternative solution ignoring jekyll configuration: 

https://github.com/blog/572-bypassing-jekyll-on-github-pages

## Usage

Just clone this project and:

```
# Inside this project's folder.
npm install

# Inside your own project folder.
# Generate your documentation
typedoc --out documentation/ .
# Fix it
node <path to typedoc-ghpages project>/bin/app.js documentation/
```

This will generate `docs/` from `documentation/`

## TypeDoc

TypeDoc is a `documentation generator for TypeScript projects.`

[https://github.com/TypeStrong/TypeDoc](https://github.com/TypeStrong/TypeDoc)

## Naming problem

TypeDoc tool generates files whose name begins with _ (underscore). When using
github's pages tool, those files are ignored. 

## This (fix) tool

Renames every file and every reference removing the trailing underscore on each name.


## License

IDCWYDWTPBDBM 1.0.

I don't care what you do with this project but don't bother me. 
