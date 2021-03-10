import {formatDate, compressHtmlStr, humpToFront } from '../../../src/libs/tool.js';



test('src/libs/tool测试formatDate时间戳转换为时间格式', () => {
    expect(formatDate(1612410364823,"Y-M-D h:m")).toBe("2021-02-04 11:46");
});


test('src/libs/tool测试formatDate时间戳格式为字符串时转换为时间格式', () => {
    expect(formatDate('1612410364823',"Y-M-D h:m")).toBe("2021-02-04 11:46");
});


test('src/libs/tool测试compressHtmlStr', () => {
    let str = `
      <div class="row-a5">    
            <div class="t1"> 125454 </div>
      </div>
    `
    expect(compressHtmlStr(str)).toBe('<div class="row-a5"><div class="t1"> 125454 </div></div>');
});


test('src/libs/tool测试humpToFront', () => {
    expect(humpToFront("ContextAlertPop")).toBe('context-alert-pop');
});