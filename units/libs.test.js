import {formatDate} from '../src/libs/tool.js';



test('测试formatDate时间戳转换为时间格式', () => {
    expect(formatDate(1612410364823,"Y-M-D h:m")).toBe("2021-02-04 11:46");
});


test('测试formatDate时间戳格式为字符串时转换为时间格式', () => {
    expect(formatDate('1612410364823',"Y-M-D h:m")).toBe("2021-02-04 11:46");
});