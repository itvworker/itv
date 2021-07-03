
let reg = /import(\s+)\{[A-Za-z0-9,\s]+\}\s+from\s+('|")itv('|")/ig  //正则，itv import查找
export default function itv() {
    return {
        name: 'itv', // this name will show up in warnings and errors
        resolveId ( source, importer ) {
          console.log(importer);
          return source;
        },
        resolveDynamicImport(str) {
            sole.log('================++++++++++++++=');
            console.log(str);
        },
        transform(code, id) {
            console.log(id);
            return code
        }
      };
}