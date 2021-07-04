import marked from 'marked'
const mdToJs = str => {
  const content = JSON.stringify(marked(str))
  return `export default ${content}`
}

export default function md() {
    return {
        name: 'md',
        transform(code, id) {
            let type = id.split('.')
            type = type[type.length-1]
            if(type==='md') {
                return mdToJs(code)
            }
            return code
        }
    };
}
