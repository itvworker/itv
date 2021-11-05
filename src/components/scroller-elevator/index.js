Component({
    relations: {
        '../scroller/index': {
          type: 'parent', // 关联的目标节点应为父节点
          linked: function(target) {
            // 每次被插入到custom-ul时执行，target是custom-ul节点实例对象，触发在attached生命周期之后
            this.init();
          },
          linkChanged: function(target) {
            // 每次被移动后执行，target是custom-ul节点实例对象，触发在moved生命周期之后
          },
          unlinked: function(target) {
            // 每次被移除时执行，target是custom-ul节点实例对象，触发在detached生命周期之后
          }
        }
    },
    properties: {
       
    },
    data: {
       reload: 0
    },
    created() {
        
    },
    ready() {
        this.setData({
            reload: this.data.reload++
        })  
    },
    methods: {
      init() {
        this.top = this.$el.offsetTop;
        this.height = this.$el.clientHeight;
        this.header = render(this.$el.children[0]);
        this.headerHeight = this.$el.children[0].clientHeight;
        this.maxY = this.height - this.headerHeight;
      }
  }
  
})